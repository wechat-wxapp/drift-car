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

    const guide = wx.createImage();
    guide.src = 'images/guide.png';
    this.cvs.drawImage(guide, 0, 0, guide.width, guide.height, this.computedSizeH(95), this.computedSizeH(270), this.computedSizeW(560), this.computedSizeH(824));

    const point = wx.createImage();
    point.src = 'images/point.png';
    this.cvs.drawImage(point, 0, 0, point.width, point.height, this.computedSizeH(500), this.computedSizeH(85), this.computedSizeW(54), this.computedSizeH(66));

    const backIcon1 = wx.createImage();
    backIcon1.src = `images/back-icon.png`;
    this.cvs.drawImage(backIcon1, 0, 0, backIcon1.width, backIcon1.height, this.computedSizeW(84), this.computedSizeH(1150), this.computedSizeW(62), this.computedSizeH(62));
  }
  
}
