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
        this.clearCvs();

        this.cvs.fillStyle = "#fff";
        this.cvs.font = `bold ${this.computedSizeW(26)}px xszt`;
        this.cvs.textAlign = "center";
        this.cvs.fillText('本次得分', this.winWidth / 2, this.computedSizeH(216));

        this.cvs.font = `bold ${this.computedSizeW(102)}px xszt`;
        this.cvs.fillText('160', this.winWidth / 2, this.computedSizeH(332));
        
        this.cvs.font = `bold ${this.computedSizeW(26)}px xszt`;
        this.cvs.fillText(`历史最高得分：200`, this.winWidth / 2, this.computedSizeH(425));
        // 世界排行
        this.cvs.fillStyle = this.themeBule;
        this.cvs.fillRect(this.winWidth / 2 - this.computedSizeW(582) / 2, this.computedSizeH(496), this.computedSizeW(582), this.computedSizeH(76));

        this.cvs.fillStyle = "#fff";
        this.cvs.textAlign = "left";
        this.cvs.font = `bold ${this.computedSizeW(22)}px xszt`;
        this.cvs.fillText('世界排行', this.computedSizeW(136), this.computedSizeH(544));

        this.cvs.fillStyle = "#fdd724";
        this.cvs.textAlign = "center";
        this.cvs.font = `bold ${this.computedSizeW(22)}px xszt`;
        this.cvs.fillText('45456', this.winWidth / 2, this.computedSizeH(544));

        this.cvs.font = `bold ${this.computedSizeW(22)}px xszt`;
        this.cvs.fillStyle = "#fff";
        this.cvs.textAlign = "left";
        this.cvs.fillText('354', this.computedSizeW(544), this.computedSizeH(544));

        // // 好友排行
        this.cvs.fillStyle = "#fff";
        this.cvs.fillRect(this.winWidth / 2 - this.computedSizeW(582) / 2, this.computedSizeH(616), this.computedSizeW(582), this.computedSizeH(298));

        this.cvs.fillStyle = "#e7e7e7";
        this.cvs.fillRect(this.winWidth / 2 - this.computedSizeW(582) / 2, this.computedSizeH(914), this.computedSizeW(582), this.computedSizeH(72));

        //名次
        this.cvs.font = `${this.computedSizeW(18)}px xszt`;
        this.cvs.fillStyle = "#a8a8a8";
        this.cvs.fillText('43', this.computedSizeW(160), this.computedSizeH(678));
        this.cvs.fillText('45', this.computedSizeW(550), this.computedSizeH(678));
        this.cvs.fillStyle = this.themeBule;
        this.cvs.fillText('44', this.computedSizeW(355), this.computedSizeH(678));

        //分割线
        this.cvs.beginPath();
        this.cvs.strokeStyle = '#ededed';
        this.cvs.moveTo(this.computedSizeW(280), this.computedSizeH(666));
        this.cvs.lineTo(this.computedSizeW(280), this.computedSizeH(856));
        this.cvs.moveTo(this.computedSizeW(470), this.computedSizeH(666));
        this.cvs.lineTo(this.computedSizeW(470), this.computedSizeH(856));
        this.cvs.stroke();
        this.cvs.closePath();

        //头像
        this.cvs.fillStyle = 'green';
        this.cvs.beginPath();
        this.cvs.arc(this.computedSizeW(178), this.computedSizeH(764), this.computedSizeH(42), 0, 2 * Math.PI);
        this.cvs.arc(this.computedSizeW(374), this.computedSizeH(764), this.computedSizeH(42), 0, 2 * Math.PI);
        this.cvs.arc(this.computedSizeW(572), this.computedSizeH(764), this.computedSizeH(42), 0, 2 * Math.PI);
        this.cvs.closePath();
        this.cvs.fill();

        this.cvs.font = `${this.computedSizeW(20)}px xszt`;
        this.cvs.fillStyle = "#666";
        this.cvs.textAlign = "center";
        this.cvs.fillText('Youche1', this.computedSizeW(178), this.computedSizeH(840));
        this.cvs.fillText('Youche2', this.computedSizeW(374), this.computedSizeH(840));
        this.cvs.fillText('Youche3', this.computedSizeW(572), this.computedSizeH(840));
        
        this.cvs.font = `bold ${this.computedSizeW(24)}px xszt`;
        this.cvs.fillStyle = "#000";
        this.cvs.fillText('188', this.computedSizeW(178), this.computedSizeH(875));
        this.cvs.fillText('160', this.computedSizeW(374), this.computedSizeH(875));
        this.cvs.fillText('134', this.computedSizeW(572), this.computedSizeH(875));
        
        this.cvs.fillStyle = "#808080";
        this.cvs.font = `${this.computedSizeW(20)}px xszt`;
        this.cvs.textAlign = "left";
        this.cvs.fillText('排行榜：每周一凌晨更新', this.computedSizeW(130), this.computedSizeH(960));
        
        this.cvs.fillStyle = "#5079eb";
        this.cvs.textAlign = "left";
        this.cvs.fillText('查看全部排行 >', this.computedSizeW(480), this.computedSizeH(960));

        const btn = wx.createImage();
        btn.src = 'images/btn.png';
        this.cvs.drawImage(btn, 0, 0, btn.width, btn.height, this.computedSizeW(120), this.computedSizeH(1044), this.computedSizeW(218), this.computedSizeH(78));
        this.cvs.drawImage(btn, 0, 0, btn.width, btn.height, this.computedSizeW(415), this.computedSizeH(1044), this.computedSizeW(218), this.computedSizeH(78));

        this.cvs.fillStyle = "#fff";
        this.cvs.font = `bold ${this.computedSizeW(32)}px xszt`;
        this.cvs.fillText('炫耀一下', this.computedSizeW(164), this.computedSizeH(1087));
        this.cvs.fillText('再玩一局', this.computedSizeW(460), this.computedSizeH(1087));

        this.cvs.font = `${this.computedSizeW(26)}px xszt`;
        this.cvs.textAlign = "center";
        this.cvs.fillText('返回首页', this.winWidth / 2, this.computedSizeH(1215));
        // this.cvs.fillRect(this.computedSizeW(312), this.computedSizeH(1234), this.computedSizeW(116), 2);
        this.cvs.fillRect(this.computedSizeW(316), this.computedSizeH(1234), this.computedSizeW(116), 2);


        this.drawRoundRect(this.cvs, this.winWidth / 2 - this.computedSizeW(160) / 2, this.computedSizeH(182), this.computedSizeW(160), this.computedSizeH(50), this.computedSizeW(25) ,'rgba(255,255,255,0.3)');
    }
}
