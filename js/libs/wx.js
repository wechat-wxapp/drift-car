import IO from './io';
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
        this.checkLogin();
        this.createStartBtn();

        // IO.getunlock();
    }

    init() {
        openDataContext = wx.getOpenDataContext();
        wx.showShareMenu({ withShareTicket: true });

        this.shareTicket = 'noStareTicket';
        wx.onShow(res => {
            this.shareTicket = res.shareTicket;
            console.log('shareTicket: ', res, this.shareTicket);
        });

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
        wxConfig.startBtn = wx.createUserInfoButton({
            type: 'image',
            image: 'https://static.cdn.24haowan.com/24haowan/test/js/start-btn.png',
            style: {
                left: this.computedSizeW(132.5),
                top: this.computedSizeH(250),
                width: this.computedSizeW(149),
                height: this.computedSizeW(60)
            }
        });

        wxConfig.startBtn.hide();

        wxConfig.startBtn.onTap((res) => {
            this.wxUnionId(res);
        });
    }

    /**
     * 判断KEY是否有效
     * */
    checkLogin() {
        wx.checkSession({
            success: () => {
                wxConfig.isLogin = true;
            },
            fail: () => {
                wxConfig.isLogin = false;
                this.wxLogin();
            }
        });
    }

    /**
     * 登录操作
     * */
    wxLogin() {
        wx.login({
            success: (res) => {
                const { code } = res;
                if (code) {
                    this.code = code;
                } else {
                    console.log('登录失败！' + res.errMsg);
                }
            }
        });
    }

    /**
     * 获取UnionId
     * */
    wxUnionId(data) {
        const { encryptedData, iv, rawData, signature } = data;
        $loader.show();

        IO.getAccessToken(this.code)
        .then(token => {
            const { code, payload: { data } } = token;
            if (code === '0') {
                const { openid, session_key } = data;

                // 缓存openid, session_key
                localStorage.setItem('accessToken', data);

                return {
                    openid,
                    session_key
                }
            } else {
                console.log('接口出错: ', token);
            }
        })
        .then(e => {
            IO.getUnionId({ ...e, encryptedData, iv, rawData, signature })
            .then(e => {
                const { code } = e;
                if (code === '0') {
                } else {
                    console.log('获取UnionId失败: ', e);
                }

                // 开始游戏
                gamePage.startGame();
                wxConfig.isLogin = true;
                $loader.hide();
            });
        });
    }

    /**
     * 保存用户分数
     * */
    setWxScore() {
        return new Promise((res, rej) => {
            wx.setUserCloudStorage({
                KVDataList: [{ key: "score", value: String(score) }],
                success: () => {
                    res();
                },
                fail: () => {
                    rej();
                },
                complete: () => {}
            })
        })
    }
}