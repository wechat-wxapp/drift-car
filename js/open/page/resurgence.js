import Init from './init';

/**
 * 开始页函数
 */
export default class Resurgence extends Init {
  constructor() {
    super();
  }

  /**
   * 更新页面内容
   * */
  setTexture(data) {
    this.clearCvs();

    this.cvs.fillStyle = "#fff";
    this.cvs.font = `bold ${this.computedSizeW(26)}px Arial`;
    this.cvs.textAlign = "center";
    this.cvs.fillText('本次得分', this.winWidth / 2, this.computedSizeH(216));
    
    this.cvs.font = `bold ${this.computedSizeW(102)}px Arial`;
    this.cvs.fillText('160', this.winWidth / 2, this.computedSizeH(332));
    
    this.cvs.font = `${this.computedSizeW(26)}px Arial`;
    this.cvs.textAlign = "right";
    this.cvs.fillText(`还差18分超越：`, this.computedSizeW(364), this.computedSizeH(470));
    this.cvs.arc(this.computedSizeW(420), this.computedSizeH(466), this.computedSizeH(42), 0, 2 * Math.PI);
    this.cvs.textAlign = "left";
    this.cvs.fillText(`Youchef`, this.computedSizeW(480), this.computedSizeH(470));
    this.cvs.fill();
    
    const btn = wx.createImage();
    btn.src = 'images/btn.png';
    this.cvs.drawImage(btn, 0, 0, btn.width, btn.height, this.winWidth / 2 - this.computedSizeW(300) / 2, this.computedSizeH(660), this.computedSizeW(300), this.computedSizeH(110));
    this.cvs.fillStyle = "#fff";
    this.cvs.font = `bold ${this.computedSizeW(36)}px Arial`;
    this.cvs.textAlign = "center";
    this.cvs.fillText('看视频复活', this.winWidth / 2, this.computedSizeH(716));
    
    this.cvs.font = `${this.computedSizeW(26)}px Arial`;
    this.cvs.fillText(`点击跳过`, this.winWidth / 2, this.computedSizeH(864));
    this.cvs.fillRect(this.computedSizeW(316), this.computedSizeH(880), this.computedSizeW(116), 2);
    
    //最上面那个半透明圆角框
    this.drawRoundRect(this.cvs, this.winWidth / 2 - this.computedSizeW(160) / 2, this.computedSizeH(182), this.computedSizeW(160), this.computedSizeH(50), this.computedSizeW(25) ,'rgba(255,255,255,0.3)');
    // this.cvs.beginPath();
    // this.cvs.strokeStyle = 'rgba(255, 255, 255, 1)';
    // this.cvs.moveTo(this.computedSizeW(312), this.computedSizeH(880));
    // this.cvs.lineTo(this.computedSizeW(432), this.computedSizeH(880));
    // this.cvs.stroke();
    // // this.cvs.fillStyle = "#000";
    // // this.cvs.fillRect(0,0,180,140);
    // // this.cvs.strokeStyle = 'rgba(255,255,255,0.6)'
    // // this.cvs.stroke();
  }
  
}
