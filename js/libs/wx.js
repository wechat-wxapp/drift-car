import UTIL from '../modules/util';

/**
 * 微信类
 * */
export default class WX extends UTIL {
    size = {
        width: winWidth,
        height: winHeight
    };

    shareObj = {
        title: '昨晚我输给一辆AE86，他用惯性漂移过弯，是你吗？',
        imageUrl: 'images/share.png'
    };

    isLogin = false;
    tapLock = false;

    constructor() {
        super();

        this.init();
        this.createStartBtn();
        this.onNetworkStatusChange();
    }

    init() {
        openDataContext = wx.getOpenDataContext();
        // 默认关闭转发按钮, 需要等待openid配置
        wx.hideShareMenu();

        const { shareTicket, query: { shareOpenid } } = wx.getLaunchOptionsSync();

        this.shareTicket = shareTicket || 'noShareTicket';
        this.shareOpenid = shareOpenid;

        openDataContext.postMessage({
            command: 'init',
            data: {
                winWidth,
                winHeight
            }
        });

        // wx.onHide(() => {
        // });

        wx.onShow(() => {
            timerKey = false;
            this.playBgm();
        });

        wx.onAudioInterruptionEnd(function () {
            timerKey = false;
            this.playBgm();
        });
    }

    onShareAppMessage() {
        const { title, imageUrl } = this.shareObj;
        const { openid } = $cache.getCache('accessToken');

        // 开启转发配置
        wx.showShareMenu({ withShareTicket: true });

        wx.onShareAppMessage(() => ({ title, imageUrl, query: `shareOpenid=${openid}` }))
    }

    sendMessage(command, data) {
        openDataContext.postMessage({ command, data })
    }

    /**
     * 跳转到小程序
     * */
    navigateToMiniProgram() {
        const appid = 'wxd89b0def414d9163';
        wx.navigateToMiniProgram({
            appId: appid,
            path: 'pages/news/news?page=pyds01',
            success: () => {},
            fail: (err) => {},
            complete: () => {}
        });
    }

    /**
     * 创建开始按钮
     * */
    createStartBtn() {
        this.startBtn = wx.createUserInfoButton({
            type: 'text',
            text: '',
            style: {
                opacity: 0,
                left: this.computedSizeW(102),
                top: this.computedSizeH(525),
                width: this.computedSizeW(210),
                height: this.computedSizeW(50)
            }
        });

        this.startBtn.hide();

        this.startBtn.onTap((res) => {
            if (this.tapLock) return false;
            this.tapLock = true;
            this.wxUnionId(res);
        });
    }

    /**
     * 判断KEY是否有效
     * */
    checkLogin() {
        return new Promise((resolve, reject) => {
            const { openid, session_key } = $cache.getCache('accessToken');
            if (!openid || !session_key) {
                this.wxLogin()
                    .then(() => {
                        resolve();
                    });
            } else {
                console.log('当前openid: ', { openid, session_key });
                this.updateDate()
                    .then(e => {
                        const { payload: { unknow } } = e;
                        console.log('是否需要重新授权: ', unknow);
                        if (unknow) {
                            this.wxLogin()
                                .then(() => {
                                    resolve();
                                });
                        } else {
                            this.isLogin = true;
                            resolve();
                        }
                    });
            }
        });
    }

    /**
     * 更新每日
     * */
    updateDate() {
        return new Promise((resolve, reject) => {
            const accessToken = localStorage.getItem('accessToken');

            console.log('分享者openid: ', this.shareOpenid);

            // 配置普通分享信息
            this.onShareAppMessage();

            if (accessToken) {
                $io.unlockCar({
                    shareOpenid: this.shareOpenid,
                    day: true
                }).then(e => {
                    console.log('提交每日次数: ', e);
                    const { payload: { hasNew } } = e;
                    $cache.setGameData('hasNew', hasNew);
                    startPage && startPage.setTexture();

                    resolve(e);
                }).catch(err => {
                    console.log('提交每日次数报错: ', err);

                    $loader.showInternetError({
                        confirmCb: () => {
                            loadingPage.init();
                        }
                    });
                    reject();
                });
                return false;
            }
            reject();
        });
    }

    /**
     * 登录操作
     * */
    wxLogin() {
        $loader.show();

        return new Promise((resolve, reject) => {
            wx.login({
                success: (res) => {
                    const { code } = res;
                    if (code) {
                        this.code = code;

                        this.getAccessToken()
                            .finally(() => {
                                $loader.hide();

                                resolve();
                            });

                    } else {
                        $loader.hide();

                        console.log('登录失败: ' + res.errMsg);
                        reject();
                    }
                },
                fail: () => {
                    console.log('登录失败error: ' + res.errMsg);
                    reject();
                },
                complete: () => {
                }
            });
        });
    }

    /**
     * 获取openid, session_key
     * */
    getAccessToken() {
        console.log('当前wx.code: ', this.code);

        return new Promise((res, rej) => {
            $io.getAccessToken(this.code)
                .then(token => {
                    const { code, payload: { data } } = token;

                    console.log('成功获取openid: ', data);

                    if (code === '0') {
                        const { session_key, openid } = data;

                        if (session_key && openid) {
                            // 缓存openid, session_key
                            localStorage.setItem('accessToken', data);
                            this.updateDate();

                            res(data);
                        } else {
                            rej();
                        }
                    } else {
                        console.log('getAccessToken接口出错: ', token);
                        rej();
                    }
                });
        })
    }

    /**
     * 获取UnionId
     * */
    wxUnionId(data) {
        const { encryptedData, iv, rawData, signature } = data;
        $loader.show();

        const { openid, session_key } = localStorage.getItem('accessToken');

        $io.getUnionId({ openid, session_key, encryptedData, iv, rawData, signature })
            .then(e => {
                const { code } = e;
                if (code === '0') {
                } else {
                    console.log('获取UnionId失败: ', e);
                }

                // 开始游戏
                gamePage.startGame();
                this.isLogin = true;
                $loader.hide();
            });
    }

    /**
     * 触发分享
     * @params title {String} 分享标题
     * @params imageUrl {String} 分享图片
     * */
    shareAppMessage(title, imageUrl) {
        const { openid } = $cache.getCache('accessToken');

        const shareTitle = title || this.shareObj.title;
        const shareImg = imageUrl || this.shareObj.imageUrl;

        wx.shareAppMessage({
            title: shareTitle,
            imageUrl: shareImg,
            query: `shareOpenid=${openid}`
        })
    }

    /**
     * 初始化广告对象
     * */
    createRewardedVideoAd() {
        const adUnitId = 'adunit-722f9ea4aab7122d';
        return wx.createRewardedVideoAd({ adUnitId });
    }

    /**
     * 长震动效果
     * */
    vibrateLong() {
        wx.vibrateLong();
    }

    /**
     * 获取设备目前网络情况
     * */
    onNetworkStatusChange() {
        wx.onNetworkStatusChange(({ isConnected, networkType }) => {
            connected = isConnected;
        });
    }
}