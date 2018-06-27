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
    this.cvs.fillText('本次得分', this.winWidth / 2, this.computedSizeH(101));

    this.cvs.font = `bold ${this.computedSizeW(80)}px Arial`;
    this.cvs.fillText('160', this.winWidth / 2, this.computedSizeH(180));

    this.cvs.font = `${this.computedSizeW(16)}px Arial`;
    this.cvs.textAlign = "right";
    this.cvs.fillText(`还差18分超越：`, this.computedSizeW(216), this.computedSizeH(230));
    this.cvs.arc(this.computedSizeW(235), this.computedSizeH(226), this.computedSizeH(21), 0, 2 * Math.PI);
    this.cvs.textAlign = "left";
    this.cvs.fillText(`Youchef`, this.computedSizeW(264), this.computedSizeH(230));
    this.cvs.fill();

    const btn = wx.createImage();
    btn.src = 'images/btn.png';
    this.cvs.drawImage(btn, 0, 0, btn.width, btn.height, this.winWidth / 2 - this.computedSizeW(74.5), this.computedSizeH(330), this.computedSizeW(149), this.computedSizeW(60));
    this.cvs.fillStyle = "#fff";
    this.cvs.font = `bold ${this.computedSizeW(18)}px Arial`;
    this.cvs.textAlign = "center";
    this.cvs.fillText('看视频复活', this.winWidth / 2, this.computedSizeH(360));
    
    this.cvs.font = `${this.computedSizeW(16)}px Arial`;
    this.cvs.fillText(`点击跳过`, this.winWidth / 2, this.computedSizeH(422));
    this.cvs.fillRect(this.computedSizeW(174), this.computedSizeH(430), this.computedSizeW(65), 2);

    // this.cvs.fillStyle = "#000";
    // this.cvs.fillRect(0,0,180,140);
    // this.cvs.strokeStyle = 'rgba(255,255,255,0.6)'
    this.drawRoundRect(this.cvs, this.winWidth / 2 - this.computedSizeW(90) / 2, this.computedSizeH(82), this.computedSizeW(90), this.computedSizeH(25), this.computedSizeW(10) ,'rgba(255,255,255,0.3)');
    // this.cvs.stroke();
  }

}
