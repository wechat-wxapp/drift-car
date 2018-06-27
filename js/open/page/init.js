/**
 * 初始化函数
 */
export default class Index {
    constructor() {
        this.winWidth = wx.getSystemInfoSync().screenWidth;
        this.winHeight = wx.getSystemInfoSync().screenHeight;

        const sharedCanvas = wx.getSharedCanvas();
        this.cvs = sharedCanvas.getContext('2d');
    }

    /**
     * 计算当前屏幕相对于 414 * 736 的结果
     * */
    computedSizeW(size) {
        return size * this.winWidth / 414;
    }

    computedSizeH(size) {
        return size * this.winHeight / 736;
    }

    /**
     * 清除画布内容
     * */
    clearCvs() {
        this.cvs.clearRect(0, 0, this.winWidth, this.winHeight);
    }
}
