import Init from './init';

/**
 * 开始页函数
 */
export default class wechatMP extends Init {
  constructor() {
    super();

    this.qrcode = wx.createImage();
    this.qrcode.src = 'images/qrcode.png';
    this.qrBtn = wx.createImage();
    this.qrBtn.src = 'images/qr-btn.png';
    this.leftLamp = wx.createImage();
    this.leftLamp.src = 'images/qr-lamp.png';

    this.backIcon1 = wx.createImage();
    this.backIcon1.src = `images/back-icon.png`;

    this.righttLamp = wx.createImage();
    this.righttLamp.src = 'images/qr-lamp.png';
  }

  relativeSizeH(num) {
    return this.computedSizeH(270) + this.computedSizeW(num - 270)
  }

  /**
   * 更新页面内容
   * */
  setTexture(data) {
    this.clearCvs();


    this.cvs.drawImage(this.qrcode, 0, 0, this.qrcode.width, this.qrcode.height, this.computedSizeW(95), this.computedSizeH(270), this.computedSizeW(560), this.computedSizeW(824));


    this.cvs.drawImage(this.qrBtn, 0, 0, this.qrBtn.width, this.qrBtn.height, this.computedSizeW(240), this.relativeSizeH(976), this.computedSizeW(270), this.computedSizeW(74));


    this.cvs.drawImage(this.leftLamp, 0, 0, this.leftLamp.width, this.leftLamp.height, this.computedSizeW(0), this.relativeSizeH(110), this.computedSizeW(250), this.computedSizeW(344));

    this.cvs.drawImage(this.backIcon1, 0, 0, this.backIcon1.width, this.backIcon1.height, this.computedSizeW(84), this.relativeSizeH(1150), this.computedSizeW(62), this.computedSizeW(62));
    
    this.cvs.save()

    this.cvs.translate(this.winWidth, 0)
    this.cvs.scale(-1,1)

    this.cvs.drawImage(this.righttLamp, 0, 0, this.righttLamp.width, this.righttLamp.height, this.computedSizeW(0), this.relativeSizeH(110), this.computedSizeW(250), this.computedSizeW(344));
    this.cvs.restore()
  }
  
}
