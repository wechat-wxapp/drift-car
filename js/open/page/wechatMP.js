import Init from './init';

/**
 * 开始页函数
 */
export default class wechatMP extends Init {
  constructor() {
    super();
    this.guide = wx.createImage();
    this.guide.src = 'images/guide.png';
    this.point = wx.createImage();
    this.point.src = 'images/point.png';
    this.backIcon = wx.createImage();
    this.backIcon.src = `images/back-icon.png`;
  }

  relativeSizeH(num) {
    return this.computedSizeH(85) + this.computedSizeW(num - 85)
  }
  
  /**
   * 更新页面内容
   * */
  setTexture(data) {
    this.clearCvs();

    this.cvs.drawImage(this.point, 0, 0, this.point.width, this.point.height, this.computedSizeW(500), this.computedSizeH(85), this.computedSizeW(54), this.computedSizeW(66));

    this.cvs.drawImage(this.guide, 0, 0, this.guide.width, this.guide.height, this.computedSizeW(95), this.relativeSizeH(270), this.computedSizeW(560), this.computedSizeW(824));

    this.cvs.drawImage(this.backIcon, 0, 0, this.backIcon.width, this.backIcon.height, this.computedSizeW(84), this.relativeSizeH(1150), this.computedSizeW(62), this.computedSizeW(62));
  }
  
}
