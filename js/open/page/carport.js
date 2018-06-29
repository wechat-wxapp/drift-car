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
    
    const backIcon1 = wx.createImage();
    backIcon1.src = `images/back-icon.png`;
    this.cvs.drawImage(backIcon1, 0, 0, backIcon1.width, backIcon1.height, this.computedSizeW(84), this.computedSizeH(1150), this.computedSizeW(62), this.computedSizeH(62));
    // 解锁背景
    var show = true
    if (show) {
        const unlockPane = wx.createImage();
        unlockPane.src = 'images/unlock-pane.png';
        this.cvs.drawImage(unlockPane, 0, 0, unlockPane.width, unlockPane.height, this.computedSizeW(80), this.computedSizeH(477), this.computedSizeW(592), this.computedSizeH(405));

        const btn = wx.createImage();
        btn.src = 'images/unlock-btn.png';
        this.cvs.drawImage(btn, 0, 0, btn.width, btn.height, this.computedSizeH(290), this.computedSizeH(766), this.computedSizeW(173), this.computedSizeH(64));

        this.cvs.fillStyle = "#ffffff";
        this.cvs.font = `bold ${this.computedSizeW(29)}px Arial`;
        this.cvs.fillText('好 的', this.computedSizeW(345), this.computedSizeH(805));
    }

    // 解锁选项
    var choose = 5
    switch(choose) {
        case 1:
            { 
                this.cvs.drawImage(carPane, 0, 0, carPane.width, carPane.height, this.computedSizeW(157), this.computedSizeW(540), this.computedSizeW(140), this.computedSizeH(164));         
                this.cvs.fillStyle = "#e9b320";
                this.cvs.font = `bold ${this.computedSizeW(25)}px Arial`;
                this.cvs.fillText('解锁条件：', this.computedSizeW(322), this.computedSizeH(570)); 

                this.cvs.fillStyle = "#ffffff";
                this.cvs.font = `${this.computedSizeW(25)}px Arial`;
                this.cvs.fillText('点击首页公众号按钮，按', this.computedSizeW(326), this.computedSizeH(610));       

                this.cvs.fillStyle = "#ffffff";
                this.cvs.font = `${this.computedSizeW(25)}px Arial`;
                this.cvs.fillText('提示操作进行关注有车以', this.computedSizeW(326), this.computedSizeH(646));       

                this.cvs.fillStyle = "#ffffff";
                this.cvs.font = `${this.computedSizeW(25)}px Arial`;
                this.cvs.fillText('后公众号。', this.computedSizeW(326), this.computedSizeH(672));

            }
            break;
        case 2:
            { 
                this.cvs.drawImage(carPane, 0, 0, carPane.width, carPane.height, this.computedSizeW(157), this.computedSizeW(540), this.computedSizeW(140), this.computedSizeH(164));

                this.cvs.fillStyle = "#e9b320";
                this.cvs.font = `bold ${this.computedSizeW(25)}px Arial`;
                this.cvs.fillText('解锁条件：', this.computedSizeW(322), this.computedSizeH(570));

                this.cvs.fillStyle = "#ffffff";
                this.cvs.font = `${this.computedSizeW(25)}px Arial`;
                this.cvs.fillText('一场游戏达到一百分。', this.computedSizeW(326), this.computedSizeH(610));

                const gift100 = wx.createImage();
                gift100.src = 'images/gift-100.png';
                this.cvs.drawImage(gift100, 0, 0, gift100.width, gift100.height, this.computedSizeH(325), this.computedSizeH(621), this.computedSizeW(238), this.computedSizeH(54));

            }
            break;
        case 3:
            { 
                this.cvs.drawImage(carPane, 0, 0, carPane.width, carPane.height, this.computedSizeW(157), this.computedSizeW(540), this.computedSizeW(140), this.computedSizeH(164));

                this.cvs.fillStyle = "#e9b320";
                this.cvs.font = `bold ${this.computedSizeW(25)}px Arial`;
                this.cvs.fillText('解锁条件：', this.computedSizeW(322), this.computedSizeH(570));

                this.cvs.fillStyle = "#ffffff";
                this.cvs.font = `${this.computedSizeW(25)}px Arial`;
                this.cvs.fillText('一场游戏达到二百分。', this.computedSizeW(326), this.computedSizeH(610));

                const gift200 = wx.createImage();
                gift200.src = 'images/gift-200.png';
                this.cvs.drawImage(gift200, 0, 0, gift200.width, gift200.height, this.computedSizeH(325), this.computedSizeH(621), this.computedSizeW(238), this.computedSizeH(54));
            }
            break;
        case 4:
            { 
                this.cvs.drawImage(carPane, 0, 0, carPane.width, carPane.height, this.computedSizeW(157), this.computedSizeW(540), this.computedSizeW(140), this.computedSizeH(164));

                this.cvs.fillStyle = "#e9b320";
                this.cvs.font = `bold ${this.computedSizeW(25)}px Arial`;
                this.cvs.fillText('解锁条件：', this.computedSizeW(322), this.computedSizeH(570));

                this.cvs.fillStyle = "#ffffff";
                this.cvs.font = `${this.computedSizeW(25)}px Arial`;
                this.cvs.fillText('累计十五天参加游戏。', this.computedSizeW(326), this.computedSizeH(610));

                const unlockGame = wx.createImage();
                unlockGame.src = 'images/unlock-game.png';
                this.cvs.drawImage(unlockGame, 0, 0, unlockGame.width, unlockGame.height, this.computedSizeH(325), this.computedSizeH(621), this.computedSizeW(238), this.computedSizeH(54));

            }
            break;
        case 5:
            { 
                this.cvs.drawImage(carPane, 0, 0, carPane.width, carPane.height, this.computedSizeW(157), this.computedSizeW(540), this.computedSizeW(140), this.computedSizeH(164));

                this.cvs.fillStyle = "#e9b320";
                this.cvs.font = `bold ${this.computedSizeW(25)}px Arial`;
                this.cvs.fillText('解锁条件：', this.computedSizeW(322), this.computedSizeH(570));

                this.cvs.fillStyle = "#ffffff";
                this.cvs.font = `${this.computedSizeW(25)}px Arial`;
                this.cvs.fillText('一场游戏中转弯达到100次。', this.computedSizeW(326), this.computedSizeH(610));

                const curve = wx.createImage();
                curve.src = 'images/curve.png';
                this.cvs.drawImage(curve, 0, 0, curve.width, curve.height, this.computedSizeH(340), this.computedSizeH(621), this.computedSizeW(238), this.computedSizeH(54));

            }
            break;
    }

    // 已解锁
    var success = true
    if (success) {
        const unlockCn = wx.createImage();
        unlockCn.src = 'images/unlock-cn.png';
        this.cvs.drawImage(unlockCn, 0, 0, unlockCn.width, unlockCn.height, this.computedSizeH(227), this.computedSizeH(518), this.computedSizeW(79), this.computedSizeH(43));
    }
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
