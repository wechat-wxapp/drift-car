import Init from './init';

/**
 * 开始页函数
 */
export default class Loader extends Init {
    constructor() {
        super();
    }

    /**
     * 更新页面内容
     * */
    setTexture(data) {
        this.cvs.clearRect(0, 0, this.winWidth, this.winHeight);

        this.cvs.fillStyle = "rgba(0, 0, 0, .8)";
        this.cvs.fillRect(0, 0, this.winWidth, this.winHeight);

        this.cvs.fillStyle = "#fff";
        this.cvs.font = `bold ${this.computedSizeW(16)}px Arial`;
        this.cvs.textAlign = "center";
        this.cvs.fillText('本次得分', this.winWidth / 2, this.computedSizeH(120));

        this.cvs.font = `bold ${this.computedSizeW(80)}px Arial`;
        this.cvs.fillText('160', this.winWidth / 2, this.computedSizeH(220));

        this.cvs.font = `bold ${this.computedSizeW(14)}px Arial`;
        this.cvs.fillText('历史最高分: 208', this.winWidth / 2, this.computedSizeH(250));

        // 世界排行
        this.cvs.fillStyle = "#4973eb";
        this.cvs.fillRect(this.winWidth / 2 - this.computedSizeW(330) / 2, this.computedSizeH(280), this.computedSizeW(330), this.computedSizeH(38));

        this.cvs.fillStyle = "#fff";
        this.cvs.font = `bold ${this.computedSizeW(12)}px Arial`;
        this.cvs.fillText('世界排行', this.computedSizeW(95), this.computedSizeH(303));

        this.cvs.fillStyle = "#fdd724";
        this.cvs.font = `bold ${this.computedSizeW(14)}px Arial`;
        this.cvs.fillText('45456', this.computedSizeW(320), this.computedSizeH(303));

        // 好友排行
        this.cvs.fillStyle = "#fff";
        this.cvs.fillRect(this.winWidth / 2 - this.computedSizeW(330) / 2, this.computedSizeH(340), this.computedSizeW(330), this.computedSizeH(170));

        this.cvs.fillStyle = "#e7e7e7";
        this.cvs.fillRect(this.winWidth / 2 - this.computedSizeW(330) / 2, this.computedSizeH(510), this.computedSizeW(330), this.computedSizeH(40));






        this.cvs.fillStyle = "#a8a8a8";
        this.cvs.fillText('43', this.computedSizeW(100), this.computedSizeH(370));





        this.cvs.fillStyle = "#888";
        this.cvs.font = `${this.computedSizeW(12)}px Arial`;
        this.cvs.fillText('世界排行榜: 每周一凌晨更新', this.computedSizeW(140), this.computedSizeH(535));

        this.cvs.fillStyle = "#5079eb";
        this.cvs.fillText('查看全部排行 >', this.computedSizeW(310), this.computedSizeH(535));

        const btn = wx.createImage();
        btn.src = 'images/btn.png';
        this.cvs.drawImage(btn, 0, 0, btn.width, btn.height, this.computedSizeW(60), this.computedSizeH(580), this.computedSizeW(106.5), this.computedSizeH(43.5));
        this.cvs.drawImage(btn, 0, 0, btn.width, btn.height, this.computedSizeW(245), this.computedSizeH(580), this.computedSizeW(106.5), this.computedSizeH(43.5));

        this.cvs.fillStyle = "#fff";
        this.cvs.font = `bold ${this.computedSizeW(16)}px Arial`;
        this.cvs.fillText('炫耀一下', this.computedSizeW(112), this.computedSizeH(604));

        this.cvs.fillText('再玩一局', this.computedSizeW(298), this.computedSizeH(604));

        this.cvs.fillText('返回首页', this.computedSizeW(210), this.computedSizeH(670));
        this.cvs.fillRect(this.computedSizeW(176), this.computedSizeH(680), this.computedSizeW(67), 2);
    }
}
