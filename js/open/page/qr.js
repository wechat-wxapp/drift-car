import Init from './init';

/**
 * 开始页函数
 */
export default class wechatMP extends Init {
  constructor() {
    super();
  }

  /**
   * 更新页面内容
   * */
  setTexture(data) {
    this.clearCvs();

    const qrcode = wx.createImage();
    qrcode.src = 'images/qrcode.png';
    this.cvs.drawImage(qrcode, 0, 0, qrcode.width, qrcode.height, this.computedSizeW(95), this.computedSizeH(270), this.computedSizeW(560), this.computedSizeH(824));

    const qrBtn = wx.createImage();
    qrBtn.src = 'images/qr-btn.png';
    this.cvs.drawImage(qrBtn, 0, 0, qrBtn.width, qrBtn.height, this.computedSizeW(240), this.computedSizeH(976), this.computedSizeW(270), this.computedSizeH(74));

    const leftLamp = wx.createImage();
    leftLamp.src = 'images/qr-lamp.png';
    this.cvs.drawImage(leftLamp, 0, 0, leftLamp.width, leftLamp.height, this.computedSizeW(0), this.computedSizeH(110), this.computedSizeW(250), this.computedSizeH(344));

    const backIcon1 = wx.createImage();
    backIcon1.src = `images/back-icon.png`;
    this.cvs.drawImage(backIcon1, 0, 0, backIcon1.width, backIcon1.height, this.computedSizeW(84), this.computedSizeH(1150), this.computedSizeW(62), this.computedSizeH(62));
    
    this.cvs.save()
    const righttLamp = wx.createImage();
    this.cvs.translate(this.winWidth, 0)
    this.cvs.scale(-1,1)
    righttLamp.src = 'images/qr-lamp.png';
    this.cvs.drawImage(righttLamp, 0, 0, righttLamp.width, righttLamp.height, this.computedSizeW(0), this.computedSizeH(110), this.computedSizeW(250), this.computedSizeH(344));
    this.cvs.restore()
  }
  
}
