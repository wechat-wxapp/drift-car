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
        imageUrl: 'https://static.cdn.24haowan.com/24haowan/test/js/share.png?v=1.0.0'
    };

    isLogin = false;
    tapLock = false;

    constructor() {
        super();

        this.init();
        this.createStartBtn();
    }

    init() {
        openDataContext = wx.getOpenDataContext();
        wx.showShareMenu({ withShareTicket: true });

        this.shareTicket = wx.getLaunchOptionsSync().shareTicket || 'noStareTicket';

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

        const { title, imageUrl } = this.shareObj;
        wx.onShareAppMessage(() => ({ title, imageUrl }))
    }

    sendMessage(command, data) {
        openDataContext.postMessage({ command, data })
    }

    /**
     * 创建开始按钮
     * */
    createStartBtn() {
        this.startBtn = wx.createUserInfoButton({
            type: 'image',
            image: 'https://static.cdn.24haowan.com/24haowan/test/js/start-btn.png?v=123',
            style: {
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
                this.updateDate()
                    .then(e => {
                        const { payload: { unknow } } = e;

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

            if (accessToken) {
                $io.unlockCar({ day: true })
                    .then(e => {
                        console.log('提交每日次数: ', e);
                        const { payload: { hasNew } } = e;
                        $cache.setGameData('hasNew', hasNew);
                        startPage && startPage.setTexture();

                        resolve(e);
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
                        console.log('接口出错: ', token);
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
     * */
    shareAppMessage(title, imageUrl) {
        const shareTitle = title || this.shareObj.title;
        const shareImg = imageUrl || this.shareObj.imageUrl;

        wx.shareAppMessage({
            title: shareTitle,
            imageUrl: shareImg
        })
    }

    /**
     *
     * */
}