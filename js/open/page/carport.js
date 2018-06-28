import Init from './init';

/**
 * 开始页函数
 */
export default class Carport extends Init {
  constructor() {
    super();
  }

  /**
   * 更新页面内容
   * */
  setTexture(data) {
    this.clearCvs();

    const carportPane = wx.createImage();
    carportPane.src = 'images/carport-pane.png';
    this.cvs.drawImage(carportPane, 0, 0, carportPane.width, carportPane.height, this.winWidth / 2 - this.computedSizeW(592) / 2, this.computedSizeH(252), this.computedSizeW(592), this.computedSizeH(834));

    const carPane = wx.createImage();
    carPane.src = 'images/car-pane.png';
    for(let i = 0;i < 3; i++){
        for(let j = 0;j < 3; j++) {
            this.cvs.drawImage(carPane, 0, 0, carPane.width, carPane.height, this.computedSizeW(132 + i * 175), this.computedSizeH(444 + j * 194), this.computedSizeW(140), this.computedSizeH(164));
        }
    }

    const selectIcon =  wx.createImage();
    selectIcon.src = 'images/selected-icon.png';
    this.cvs.drawImage(selectIcon, 0, 0, selectIcon.width, selectIcon.height, this.computedSizeW(240), this.computedSizeH(434), this.computedSizeW(36), this.computedSizeH(36));
    // this.cvs.fillStyle = "#fff";
    // this.cvs.font = `bold ${this.computedSizeW(36)}px Arial`;
    // this.cvs.textAlign = "center";
    // this.cvs.fillText('看视频复活', this.winWidth / 2, this.computedSizeH(716));
    
    // this.cvs.font = `${this.computedSizeW(26)}px Arial`;
    // this.cvs.fillText(`点击跳过`, this.winWidth / 2, this.computedSizeH(864));
    // this.cvs.fillRect(this.computedSizeW(316), this.computedSizeH(880), this.computedSizeW(116), 2);
    
    // //最上面那个半透明圆角框
    // this.drawRoundRect(this.cvs, this.winWidth / 2 - this.computedSizeW(160) / 2, this.computedSizeH(182), this.computedSizeW(160), this.computedSizeH(50), this.computedSizeW(25) ,'rgba(255,255,255,0.3)');
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
