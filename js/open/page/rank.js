import Init from './init';

/**
 * 开始页函数
 */
export default class Rank extends Init {
  constructor() {
    super();
  }

  /**
   * 更新页面内容
   * */
  setTexture(data) {
    this.clearCvs();

    // 数据总数
    let total = this.rankData.length;
    // 每页展示数
    let counts = 3;
    // 总页数
    let totalPages = Math.ceil(total / counts);
    // 当前页数
    // let rankCurrentPage = 1;
    // let rankCurrentPage = data.page >= totalPages ? totalPages : data.page;

    switch (data.common) {
      case 0 : {
        if (this.rankCurrentPage <= 1) {
          this.rankCurrentPage = 1;
        } else {
          this.rankCurrentPage--;
        }
      }
      break;
      case 1 : {
          if (this.rankCurrentPage >= totalPages) {
            this.rankCurrentPage = totalPages;
          } else {
            this.rankCurrentPage++;
          }
      }
      break;
    }
    let rankCurrentPage = this.rankCurrentPage

    // 当前页面展示数量
    let current_count = (rankCurrentPage == totalPages) ? (total % counts) : counts;


    /**
     * 好友排名
     * */
    this.friendRank();
    
    //世界
    // this.worldRank();
    /**
     * 群排名
     * */
    // this.groupRank();

    // 更新提示
    this.cvs.fillStyle = "#e7e7e7";
    this.cvs.fillRect(this.winWidth / 2 - this.computedSizeW(582) / 2, this.computedSizeH(272), this.computedSizeW(582), this.computedSizeH(50));
    this.cvs.fillStyle = "#808080";
    this.cvs.font = `${this.computedSizeW(20)}px Arial`;
    this.cvs.textAlign = "left";
    this.cvs.fillText('排行榜：每周一凌晨更新', this.computedSizeW(130), this.computedSizeH(306));


    this.cvs.fillStyle = "#4974ea";
    if (rankCurrentPage == 1) {
      this.cvs.fillStyle = "#808080";
    }
    this.cvs.font = `${this.computedSizeW(20)}px xszt`;
    this.cvs.textAlign = "left";
    this.cvs.fillText('上一页', this.computedSizeW(460), this.computedSizeW(306))

    this.cvs.fillStyle = "#4974ea";
    if (rankCurrentPage === 1 || rankCurrentPage === totalPages) {
      this.cvs.fillStyle = "#808080";
    }
    this.cvs.font = `${this.computedSizeW(20)}px xszt`;
    this.cvs.textAlign = "left";
    this.cvs.fillText('|', this.computedSizeW(550), this.computedSizeW(306))

    this.cvs.fillStyle = "#4974ea";
    if (rankCurrentPage === totalPages) {
      this.cvs.fillStyle = "#808080";
    }
    this.cvs.font = `${this.computedSizeW(20)}px xszt`;
    this.cvs.textAlign = "left";
    this.cvs.fillText('下一页', this.computedSizeW(570), this.computedSizeW(306))



    this.cvs.fillStyle = "#fff";
    this.cvs.fillRect(this.winWidth / 2 - this.computedSizeW(582) / 2, this.computedSizeH(322), this.computedSizeW(582), this.computedSizeH(620));

    //分割线
    this.cvs.lineWidth = '1';
    this.cvs.strokeStyle = '#ededed';
    for (let i = 0; i < 5; i++) {
      this.cvs.moveTo(this.computedSizeW(130), this.computedSizeH(445 + i * 96));
      this.cvs.lineTo(this.computedSizeW(608), this.computedSizeH(445 + i * 96));
    }
    this.cvs.stroke();

    // 排名
    this.cvs.beginPath();
    this.cvs.fillStyle = this.themeBule;



    for(let i = (rankCurrentPage - 1) * counts; i < current_count + (rankCurrentPage - 1) * counts; i++) {
      if(i == 3) this.cvs.fillStyle = '#a8a8a8';
      // 排名
      this.cvs.fillText(i + 1, this.computedSizeW(132), this.computedSizeH(402 + (i - (rankCurrentPage - 1) * counts) * 96));
      // 头像
      let avatar = wx.createImage();
      avatar.src = this.rankData[i].avatarUrl;
      avatar.onload = () => {
        // pattern = this.cvs.createPattern(avatar, 'repeat');
        // this.cvs.arc(this.computedSizeW(234), this.computedSizeH(394 + i * 97), this.computedSizeW(31), 0, 2 * Math.PI);
        // this.drawRoundRect(this.cvs, this.computedSizeW(234), this.computedSizeH(394 + i * 97), this.computedSizeW(31), this.computedSizeW(31), this.computedSizeW(31 / 2), 'red')
        // this.cvs.fill()
        this.cvs.drawImage(avatar, this.computedSizeW(234), this.computedSizeH(394 + (i - (rankCurrentPage - 1) * counts) * 97), this.computedSizeW(31), this.computedSizeW(31));

      }


      // this.cvs.arc(this.computedSizeW(234), this.computedSizeH(394 + i * 97), this.computedSizeW(31), 0, 2 * Math.PI);

      this.cvs.fill();
    }

    // 名字
    for(let i = (rankCurrentPage - 1) * counts; i < current_count + (rankCurrentPage - 1) * counts; i++){
      this.cvs.fillStyle = '#666';
      this.cvs.fillText(this.rankData[i].nickname, this.computedSizeW(286), this.computedSizeH(402 + (i - (rankCurrentPage - 1) * counts) * 96), this.computedSizeW(146));
    }
    
    // console.log('this.rankData: ', this.rankData);

    // 分数
    this.cvs.font = `bold`;
    this.cvs.fillStyle = '#000';
    for(let i = (rankCurrentPage - 1) * counts; i < current_count + (rankCurrentPage - 1) * counts; i++){
      this.cvs.fillText(this.rankData[i].KVDataList[0].value, this.computedSizeW(538), this.computedSizeH(402 + (i - (rankCurrentPage - 1) * counts) * 96));
    }

    //blue part 个人成绩
    this.cvs.fillStyle = this.themeBule;
    this.cvs.fillRect(this.winWidth / 2 - this.computedSizeW(582) / 2, this.computedSizeH(965), this.computedSizeW(582), this.computedSizeH(102));
    this.cvs.fillStyle = `#ffd81f`;
    this.cvs.font = 'noraml';
    this.cvs.fillText(this.selfData.rank, this.computedSizeW(132), this.computedSizeH(1028));
    this.cvs.arc(this.computedSizeW(234), this.computedSizeH(1018), this.computedSizeW(31), 0, 2 * Math.PI);
    this.cvs.fill();
    this.cvs.fillStyle = `#fff`;
    this.cvs.fillText(this.selfData.nickname, this.computedSizeW(286), this.computedSizeH(1028), this.computedSizeW(146));
    this.cvs.font = `bold`;
    this.cvs.fillText(this.selfData.KVDataList[0].value, this.computedSizeW(538), this.computedSizeH(1028));

    const backIcon1 = wx.createImage();
    backIcon1.src = `images/back-icon.png`;
    this.cvs.drawImage(backIcon1, 0, 0, backIcon1.width, backIcon1.height, this.computedSizeW(84), this.computedSizeH(1150), this.computedSizeW(62), this.computedSizeH(62));

    const btn = wx.createImage();
    btn.src = 'images/btn.png';
    this.cvs.drawImage(btn, 0, 0, btn.width, btn.height, this.computedSizeW(445), this.computedSizeH(1150), this.computedSizeW(216), this.computedSizeH(80));

    this.cvs.fillStyle = "#fff";
    this.cvs.font = `bold ${this.computedSizeW(30)}px Arial`;
    this.cvs.fillText('查看群排行', this.computedSizeW(480), this.computedSizeH(1194));


  }

  friendRank(){
    this.drawRoundRect(this.cvs, this.computedSizeW(85), this.computedSizeH(160), this.computedSizeW(216), this.computedSizeH(70), this.computedSizeW(35), 'rgba(73,116,235,1)');
    this.drawRoundRect(this.cvs, this.computedSizeW(442), this.computedSizeH(160), this.computedSizeW(216), this.computedSizeH(70), this.computedSizeW(35), '#fff', 2);
    this.cvs.fillStyle = "#fff";
    this.cvs.font = `bold ${this.computedSizeW(30)}px Arial`;
    this.cvs.textAlign = "left";
    this.cvs.fillText('好友排行', this.computedSizeW(134), this.computedSizeH(205));
    this.cvs.fillText('世界排行', this.computedSizeW(490), this.computedSizeH(205));
  }

  worldRank(){
    this.drawRoundRect(this.cvs, this.computedSizeW(85), this.computedSizeH(160), this.computedSizeW(216), this.computedSizeH(70), this.computedSizeW(35), '#fff', 2);
    this.drawRoundRect(this.cvs, this.computedSizeW(442), this.computedSizeH(160), this.computedSizeW(216), this.computedSizeH(70), this.computedSizeW(35), 'rgba(73,116,235,1)');
    this.cvs.beginPath();
    this.cvs.fillStyle = "#fff";
    this.cvs.font = `bold ${this.computedSizeW(30)}px Arial`;
    this.cvs.textAlign = "left";
    this.cvs.fillText('好友排行', this.computedSizeW(134), this.computedSizeH(205));
    this.cvs.fillText('世界排行', this.computedSizeW(490), this.computedSizeH(205));
  }

  groupRank(){
    this.drawRoundRect(this.cvs, (this.winWidth - this.computedSizeW(216)) / 2, this.computedSizeH(160), this.computedSizeW(216), this.computedSizeH(70), this.computedSizeW(35), 'rgba(73,116,235,1)');
    this.cvs.beginPath();
    this.cvs.fillStyle = "#fff";
    this.cvs.textAlign = "center";
    this.cvs.font = `bold ${this.computedSizeW(30)}px Arial`;
    this.cvs.fillText('群排行榜', this.winWidth / 2, this.computedSizeH(206));
  }

}