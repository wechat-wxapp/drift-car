import Init from './init';

/**
 * 开始页函数
 */
export default class Loader extends Init {
    constructor() {
        super();
        this.a = true;
    }

    /**
     * 更新页面内容
     * */
    setTexture({ score }) {
        this.clearCvs(true);

        if (score >= 5 && this.a) {
            this.a = false;
            const btn = wx.createImage();
            btn.src = 'images/car-pane.png';
            this.cvs.drawImage(btn, 0, 0, btn.width, btn.height, 0, 0, this.computedSizeW(80 * 2), this.computedSizeH(80 * 2));

            this.cvs.font = `bold ${this.computedSizeW(32)}px Arial`;
            this.cvs.fillStyle = "#fff";
            this.cvs.textAlign = "center";
            this.cvs.fillText('超越好友', 40, this.computedSizeH(80 * 2 + 40));

            setTimeout(() => {
                this.clearCvs(true);
            }, 1000)
        }
    }
}
