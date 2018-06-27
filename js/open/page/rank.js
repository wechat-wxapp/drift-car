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
    this.cvs.fillStyle = "rgba(0, 0, 0, .8)";
    this.cvs.fillRect(0, 0, this.winWidth, this.winHeight);

    // this.drawRoundRect(this.cvs, this.winWidth / 2 - this.computedSizeW(54), this.computedSizeH(81), this.computedSizeW(108), this.computedSizeH(35), this.computedSizeW(17.5) ,'rgba(73,116,235,1)');
    // this.cvs.fillText('群排行榜', this.winWidth / 2, this.computedSizeH(104));

    this.drawRoundRect(this.cvs, this.computedSizeW(60.5), this.computedSizeH(81), this.computedSizeW(108), this.computedSizeH(35), this.computedSizeW(17.5) ,'rgba(73,116,235,1)');
    this.drawRoundRect(this.cvs, this.computedSizeW(242), this.computedSizeH(81), this.computedSizeW(108), this.computedSizeH(35), this.computedSizeW(17.5) ,'#fff', 2);
    this.cvs.fillStyle = "#fff";
    this.cvs.font = `bold ${this.computedSizeW(16)}px Arial`;
    this.cvs.textAlign = "center";
    this.cvs.fillText('好友排行', this.winWidth / 2 -  this.computedSizeW(91), this.computedSizeH(104));
    this.cvs.fillText('世界排行', this.winWidth / 2 +  this.computedSizeW(91), this.computedSizeH(104));

    this.cvs.fillStyle = "#e7e7e7";
    this.cvs.fillRect(this.winWidth / 2 - this.computedSizeW(291) / 2, this.computedSizeH(135), this.computedSizeW(291), this.computedSizeH(25));
    this.cvs.fillStyle = "#808080";
    this.cvs.font = `${this.computedSizeW(10)}px Arial`;
    this.cvs.textAlign = "left";
    this.cvs.fillText('排行榜：每周一凌晨更新', this.computedSizeW(75), this.computedSizeH(152));
    
    this.cvs.fillStyle = "#fff";
    this.cvs.fillRect(this.winWidth / 2 - this.computedSizeW(291) / 2, this.computedSizeH(160), this.computedSizeW(291), this.computedSizeH(310));

    this.cvs.fillStyle = this.themeBule;
    this.cvs.fillRect(this.winWidth / 2 - this.computedSizeW(291) / 2, this.computedSizeH(482.5), this.computedSizeW(291), this.computedSizeH(51));

    const btn = wx.createImage();
    btn.src = 'images/btn.png';
    this.cvs.drawImage(btn, 0, 0, btn.width, btn.height, this.computedSizeW(245), this.computedSizeH(580), this.computedSizeW(106.5), this.computedSizeH(43.5));

    this.cvs.fillStyle = "#fff";
    this.cvs.textAlign = "center";
    this.cvs.font = `bold ${this.computedSizeW(16)}px Arial`;
    this.cvs.fillText('再玩一局', this.computedSizeW(298), this.computedSizeH(604));
  }

}
