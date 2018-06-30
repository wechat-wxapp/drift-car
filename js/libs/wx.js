/**
 * 微信类
 * */
export default class WX {
    size = {
        width: winWidth,
        height: winHeight
    };

    openDataContext = wx.getOpenDataContext();

    constructor() {
        openDataContext = wx.getOpenDataContext();
        sharedCanvas = this.openDataContext.canvas;

        this.initCanvas(this.size);

        wx.showShareMenu({ withShareTicket: true });

        wx.onShow(res => {
            let shareTicket = res.shareTicket;
            console.log('shareTicket: ', res, shareTicket);
        });

        this.openDataContext.postMessage({
            command: 'init',
            data: {
                winWidth,
                winHeight,
            }
        })
    }

    initCanvas({ width, height }) {
        sharedCanvas.width = width * window.devicePixelRatio;
        sharedCanvas.height = height * window.devicePixelRatio;

        const sharedCanvas2d = sharedCanvas.getContext("2d");

        sharedCanvas2d.scale(window.devicePixelRatio, window.devicePixelRatio);
    }

    sendMessage(command, data) {
        this.openDataContext.postMessage({ command, data })
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

    setSize(size) {
        const { width, height } = size;
        const { width: currentWidth, height: currentHeight } = this.size;

        if (currentWidth === width && currentHeight === height) return false;

        this.size = size;

        this.initCanvas(this.size);
    }
}