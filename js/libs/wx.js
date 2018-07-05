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
        title: '漂移大师',
        imageUrl: 'https://static.cdn.24haowan.com/24haowan/test/js/share.png'
    };

    isLogin = false;
    tapLock = false;

    constructor() {
        super();

        this.init();
        this.checkLogin();
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

        wx.onHide(() => {
            startKey = false;
        });

        wx.onShow(() => {
            if (onGame) {
                startKey = true;
                // 继续更新分数
                this.updateScore();
            }
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
        const { openid, session_key } = $cache.getCache('accessToken');
        if (!openid || !session_key) {
            this.wxLogin();
        } else {
            this.isLogin = true;
        }
    }

    /**
     * 登录操作
     * */
    wxLogin() {
        $loader.show();
        wx.login({
            success: (res) => {
                const { code } = res;
                if (code) {
                    this.code = code;

                    this.getAccessToken()
                        .then(e => {
                            $loader.hide();
                        });

                } else {
                    $loader.hide();

                    console.log('登录失败: ' + res.errMsg);
                }
            },
            fail: () => {
                console.log('登录失败error: ' + res.errMsg);
            },
            complete: () => {
            }
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

                console.log('接口返回openid', data);

                if (code === '0') {

                    const { session_key, openid } = data;

                    if (session_key && openid) {
                        // 缓存openid, session_key
                        localStorage.setItem('accessToken', data);
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
}