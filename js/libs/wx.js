import UTIL from '../modules/util';

/**
 * 微信类
 * */
export default class WX extends UTIL {
    size = {
        width: winWidth,
        height: winHeight
    };

    constructor() {
        super();

        this.init();
        this.wxLogin();
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
        })
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
            image: 'https://static.cdn.24haowan.com/24haowan/test/js/start-btn.png',
            style: {
                left: this.computedSizeW(132.5),
                top: this.computedSizeH(250),
                width: this.computedSizeW(149),
                height: this.computedSizeW(60)
            }
        });

        this.startBtn.hide();

        this.startBtn.onTap((res) => {
            this.wxUnionId(res);
        });
    }

    /**
     * 判断KEY是否有效
     * */
    checkLogin(data) {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            gamePage.startGame();
        } else {
            // this.wxLogin(data);
        }

        // wx.checkSession({
        //     success: () => {
        //         console.log('登录状态: 已登录');
        //         gamePage.startGame();
        //         this.isLogin = true;
        //     },
        //     fail: () => {
        //         console.log('登录状态: 已过期');
        //         this.isLogin = false;
        //         this.wxLogin(data);
        //     }
        // });
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
                            console.log('3');
                            $loader.hide();
                        });

                } else {
                    $loader.hide();

                    console.log('登录失败: ' + res.errMsg);
                }
            },
            fail: () => {
                $loader.hide();
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
        return new Promise((res, rej) => {
            $io.getAccessToken(this.code)
            .then(token => {
                const { code, payload: { data } } = token;
                console.log('2', code, token);
                if (code === '0') {
                    console.log('1token', token);
                    // 缓存openid, session_key
                    localStorage.setItem('accessToken', data);

                    res(data);
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
     * 保存用户分数
     * */
    // setWxScore() {
    //     return new Promise((res, rej) => {
    //         wx.setUserCloudStorage({
    //             KVDataList: [{ key: "score", value: String(score) }],
    //             success: (e) => {
    //                 console.log('score: ', e, score)
    //                 res();
    //             },
    //             fail: () => {
    //                 rej();
    //             },
    //             complete: () => {}
    //         })
    //     })
    // }
}