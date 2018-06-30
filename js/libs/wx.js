/**
 * 微信类
 * */
export default class WX {
    size = {
        width: winWidth,
        height: winHeight
    };

    constructor() {
        openDataContext = wx.getOpenDataContext();

        wx.showShareMenu({ withShareTicket: true });

        wx.onShow(res => {
            let shareTicket = res.shareTicket;
            console.log('shareTicket: ', res, shareTicket);
        });

        openDataContext.postMessage({
            command: 'init',
            data: {
                winWidth,
                winHeight,
            }
        })
    }

    sendMessage(command, data) {
        openDataContext.postMessage({ command, data })
    }

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