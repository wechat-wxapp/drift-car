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

    if (this.rankData !== null ) {
        let myFri = null
        let scoreLess = 0
        this.rankData.map((e,index)=>{
            if (e['KVDataList'][0].value > data.score && e.openid !== this.selfData.openid) {
                myFri = e
                scoreLess = myFri['KVDataList'][0].value - data.score
            }
        })
        if (myFri === null) {
            const rankOne = wx.createImage();
            rankOne.src = 'images/rankOne.png';
            this.cvs.drawImage(rankOne, 0, 0, rankOne.width, rankOne.height, this.winWidth / 2 - this.computedSizeW(326) / 2, this.computedSizeH(456), this.computedSizeW(326), this.computedSizeH(25));
        }
        else {

            let scoreLength = (`还差${scoreLess}分超越:`.length + 1) * 26
            let nicknameLeft = (myFri.nickname.length <= 15? myFri.nickname.length : 15 ) * 26
            let sumWidth = scoreLength + 110 + nicknameLeft
            let bothLeft = this.winWidth / 2 - this.computedSizeW(sumWidth) / 2
            this.cvs.fillStyle = "#fff";

            this.cvs.font = `${this.computedSizeW(26)}px Arial`;
            this.cvs.textAlign = "right";
            this.cvs.fillText(`还差${scoreLess}分超越:`, bothLeft + this.computedSizeW(scoreLength), this.computedSizeH(470));
            // this.cvs.arc(this.computedSizeW(420), this.computedSizeH(466), this.computedSizeH(42), 0, 2 * Math.PI);
            this.cvs.textAlign = "left";

            if (myFri.nickname.length > 15) {
                myFri.nickname = myFri.nickname.slice(0,13) + '..'
            }
            this.cvs.fillText(myFri.nickname, bothLeft + this.computedSizeW(scoreLength + 110), this.computedSizeH(470));
            // this.cvs.fillText(`yourchef`, this.computedSizeW(480), this.computedSizeH(470));
            this.cvs.fill();

            const avatar = wx.createImage();
            avatar.src = myFri.avatarUrl
            avatar.onload = () => {
                this.circleImg(this.cvs, avatar, bothLeft + this.computedSizeW(scoreLength   + 13), this.computedSizeH(424), this.computedSizeW(42), this.computedSizeW(42))
            }
        }
    }

    this.cvs.fillStyle = "#fff";
    this.cvs.font = `bold ${this.computedSizeW(26)}px Arial`;
    this.cvs.textAlign = "center";
    this.cvs.fillText('本次得分', this.winWidth / 2, this.computedSizeH(216));
    this.cvs.font = `bold ${this.computedSizeW(102)}px Arial`;
    this.cvs.fillText(data.score, this.winWidth / 2, this.computedSizeH(332));


    const btn = wx.createImage();
    btn.src = 'images/btn.png';
    this.cvs.drawImage(btn, 0, 0, btn.width, btn.height, this.winWidth / 2 - this.computedSizeW(300) / 2, this.computedSizeH(660), this.computedSizeW(300), this.computedSizeH(110));
    this.cvs.fillStyle = "#fff";
    this.cvs.font = `bold ${this.computedSizeW(36)}px Arial`;
    this.cvs.textAlign = "center";
    this.cvs.fillText('免 费 复 活', this.winWidth / 2, this.computedSizeH(716));
    
    this.cvs.font = `${this.computedSizeW(26)}px Arial`;
    this.cvs.fillText(`点击跳过`, this.winWidth / 2, this.computedSizeH(864));
    this.cvs.fillRect(this.computedSizeW(316), this.computedSizeH(880), this.computedSizeW(116), 2);
    
    //最上面那个半透明圆角框
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
