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
        openDataContext = wx.getOpenDataContext();

        wx.showShareMenu({ withShareTicket: true });

        this.shareTicket = 'noStareTicket';
        wx.onShow(res => {
            this.shareTicket = res.shareTicket;
            console.log('shareTicket: ', res, this.shareTicket);
        });

        this.wxLogin();
        this.createStartBtn();
        
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
            // // 关闭按钮
            // wxConfig.startBtn.hide();
            //
            // // 初始化分数空间
            // scorePage.setTexture();
            //
            // // 清除其余2d画布
            // pageClass.clear2d();
            //
            // // 开始游戏
            // this.restart();
            //
            // // 设置页面target
            // currentPage = 'gamePage';

            const { encryptedData, iv, rawData, signature } = res;

            console.log(this.code);

            IO.getAccessToken(this.code)
                .then(token => {
                    const { code, payload: { data } } = token;
                    if (code === '0') {
                        const { openid, session_key } = data;

                        return {
                            openid,
                            session_key
                        }
                    }
                })
                .then(e => {
                    console.log('eqwe: ', e);
                    // IO.getUnionId({ ...e, encryptedData, iv, rawData, signature });
                });
        })
    }

    /**
     * 登录操作
     * */
    wxLogin() {
        wx.login({
            success: (res) => {
                const { code } = res;
                if (code) {
                    this.wxUserInfo(code);
                    this.code = code;
                } else {
                    console.log('登录失败！' + res.errMsg)
                }
            }
        });
    }

    /**
     * 获取用户信息
     * */
    wxUserInfo(code) {
        wx.checkSession({
            success: () => {
                console.log('asd');
            },
            fail: () => {
                console.log('fail');
            }
        });

        wx.getUserInfo({
            success: (e) => {
                const { encryptedData, iv, rawData, signature } = e;

                IO.getAccessToken(code)
                    .then(token => {
                        const { code, payload: { data } } = token;
                        if (code === '0') {
                            const { openid, session_key } = data;

                            return {
                                openid,
                                session_key
                            }
                        }
                    })
                    .then(e => {
                        IO.getUnionId({ ...e, encryptedData, iv, rawData, signature });
                    });
            },
            fail: (e) => {
                console.log('获取用户信息失败: ', e);
            }
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