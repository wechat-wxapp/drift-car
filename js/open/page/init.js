/**
 * 初始化函数
 */
export default class Index {
    constructor() {
        this.winWidth = wx.getSystemInfoSync().screenWidth;
        this.winHeight = wx.getSystemInfoSync().screenHeight;

        const sharedCanvas = wx.getSharedCanvas();
        this.cvs = sharedCanvas.getContext('2d');

        this.themeBule = `rgba(73,116,235,1)`;
    }

    /**
     * 计算当前屏幕相对于 375 * 667 的结果
     * */
    computedSizeW(size) {
        return size * this.winWidth / 375 / 2;
    }

    computedSizeH(size) {
        return size * this.winHeight / 667 / 2;
    }

    /**
     * 清除画布内容
     * */
    clearCvs(noTransBg) {
        this.cvs.clearRect(0, 0, this.winWidth, this.winHeight);
        if(noTransBg) return;
        this.cvs.fillStyle = "rgba(0, 0, 0, .8)";
        this.cvs.fillRect(0, 0, this.winWidth, this.winHeight);
    }

    /**
     * 圆角矩形
     * */
    drawRoundRect(cxt, x, y, width, height, radius, color, lineWidth) {
        cxt.beginPath();
        cxt.arc(x + radius, y + radius, radius, Math.PI, Math.PI * 3 / 2);
        cxt.lineTo(width - radius + x, y);
        cxt.arc(width - radius + x, radius + y, radius, Math.PI * 3 / 2, Math.PI * 2);
        cxt.lineTo(width + x, height + y - radius);
        cxt.arc(width - radius + x, height - radius + y, radius, 0, Math.PI * 1 / 2);
        cxt.lineTo(radius + x, height + y);
        cxt.arc(radius + x, height - radius + y, radius, Math.PI * 1 / 2, Math.PI);
        if (!lineWidth) {
            cxt.fillStyle = color;
            cxt.lineWidth = 0;
            cxt.fill();
        } else {
            cxt.strokeStyle = color;
            cxt.lineWidth = lineWidth;
            cxt.stroke()
        }
        cxt.closePath();
    }
}