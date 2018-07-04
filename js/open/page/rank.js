import Init from './init';

/**
 * 开始页函数
 */
export default class Rank extends Init {
  constructor() {
    super();
    this.total = null;
    // 每页展示数
    this.counts = 6;
    // 总页数
    this.totalPages = 1;
  }

  /**
   * 更新页面内容
   * */
  setTexture(type, noScale) {
    this.clearCvs(null, noScale);
    if(type == 1) {
      this.friendRank()
    }else if(type == 2) {
      // this.initGroupRankData(data.shareTicket);
      this.groupRank();
    }else {
      this.worldRank();
    }
    // 更新提示
    this.cvs.fillStyle = "#e7e7e7";
    this.cvs.fillRect(this.winWidth / 2 - this.computedSizeW(582) / 2, this.computedSizeH(272), this.computedSizeW(582), this.computedSizeH(50));
    this.cvs.fillStyle = "#808080";
    this.cvs.font = `${this.computedSizeH(20)}px Yahei`;
    this.cvs.textAlign = "left";
    this.cvs.fillText('排行榜：每周一凌晨更新', this.computedSizeW(130), this.computedSizeH(306));
    
    this.cvs.fillStyle = "#fff";
    this.cvs.fillRect(this.winWidth / 2 - this.computedSizeW(582) / 2, this.computedSizeH(322), this.computedSizeW(582), this.computedSizeH(620));

    //分割线
    this.cvs.lineWidth = 1;
    this.cvs.strokeStyle = '#ededed';
    const that = this;
    for (let i = 0; i < 5; i++) {
      that.cvs.moveTo(this.computedSizeW(130), this.computedSizeH(445 + i * 96));
      that.cvs.lineTo(this.computedSizeW(608), this.computedSizeH(445 + i * 96));
    }
    this.cvs.stroke();

    //blue part 个人成绩
    this.cvs.fillStyle = this.themeBule;
    this.cvs.fillRect(this.winWidth / 2 - this.computedSizeW(582) / 2, this.computedSizeH(965), this.computedSizeW(582), this.computedSizeH(102));

    const backIcon1 = wx.createImage();
    backIcon1.src = `images/back-icon.png`;
    this.cvs.drawImage(backIcon1, 0, 0, backIcon1.width, backIcon1.height, this.computedSizeW(84), this.computedSizeH(1150), this.computedSizeW(62), this.computedSizeH(62));

    // const btn = wx.createImage();
    // btn.src = 'images/btn.png';
    // this.cvs.drawImage(btn, 0, 0, btn.width, btn.height, this.computedSizeW(445), this.computedSizeH(1150), this.computedSizeW(216), this.computedSizeH(80));
    // this.canvasScale()
  }

  showData(data) {
    
    this.total = this.rankData.length;
    this.totalPages = Math.ceil(this.total / this.counts);
    // 当前页数
    switch (data.common) {
      case 0 : 
      this.rankCurrentPage <= 1 ? this.rankCurrentPage = 1 : this.rankCurrentPage--;
      break;
      case 1 :
      this.rankCurrentPage >= this.totalPages ? this.rankCurrentPage = this.totalPages : this.rankCurrentPage++;
      break;
    }
    let rankCurrentPage = this.rankCurrentPage;

    // 当前页面展示数量
    let current_count = (rankCurrentPage == this.totalPages) ? (this.total % this.counts) : this.counts;
      current_count === 0 && (current_count = 5);

    //是否有下一页和上一页
    this.hasNextPage = this.totalPages > rankCurrentPage;
    this.hasPrePage = rankCurrentPage > 1;

    // let { isDriving } = data;
    this.isLastPage = rankCurrentPage === this.totalPages;
    this.isFristPage = rankCurrentPage === 1;
    this.noNext = this.isLastPage? 1 : 0;
    this.noPre = this.isFristPage ? 1 : 0;
    
    // 更新提示
    this.cvs.fillStyle = "#e7e7e7";
    this.cvs.fillRect(this.winWidth / 2 - this.computedSizeW(582) / 2, this.computedSizeH(272), this.computedSizeW(582), this.computedSizeH(50));
    this.cvs.fillStyle = "#808080";
    this.cvs.font = `${this.computedSizeW(20)}px xszt`;
    this.cvs.textAlign = "left";
    this.cvs.fillText('排行榜：每周一凌晨更新', this.computedSizeW(130), this.computedSizeH(306));

    // this.cvs.fillStyle = this.themeBule;
    // if (rankCurrentPage == 1) {
    //   this.cvs.fillStyle = "#808080";
    // }
    this.hasPrePage ? this.cvs.fillStyle = this.themeBule : this.cvs.fillStyle = "#808080";
    this.cvs.font = `${this.computedSizeW(20)}px xszt`;
    this.cvs.textAlign = "left";
    this.cvs.fillText('上一页', this.computedSizeW(460), this.computedSizeH(306))

    this.cvs.fillStyle = "#808080";
    this.cvs.font = `${this.computedSizeW(20)}px xszt`;
    this.cvs.textAlign = "left";
    this.cvs.fillText('|', this.computedSizeW(548), this.computedSizeH(306))

    // this.cvs.fillStyle = this.themeBule;
    // if (rankCurrentPage === this.totalPages) {
    //   this.cvs.fillStyle = "#808080";
    // }
    this.hasNextPage ? this.cvs.fillStyle = this.themeBule : this.cvs.fillStyle = "#808080";
    this.cvs.font = `${this.computedSizeW(20)}px xszt`;
    this.cvs.textAlign = "left";
    this.cvs.fillText('下一页', this.computedSizeW(570), this.computedSizeH(306))

    //分割线
    this.cvs.lineWidth = 1;
    this.cvs.strokeStyle = '#ededed';
    for (let i = 0; i < 5; i++) {
      this.cvs.moveTo(this.computedSizeW(130), this.computedSizeH(445 + i * 96));
      this.cvs.lineTo(this.computedSizeW(608), this.computedSizeH(445 + i * 96));
    }
    this.cvs.stroke();

    // 排名
    this.cvs.beginPath();
    this.cvs.fillStyle = this.themeBule;
    const that = this;
    if(this.total !== 0){


      for(let i = (rankCurrentPage - 1) * this.counts; i < current_count + (rankCurrentPage - 1) * this.counts; i++) {
        if(i == 3) that.cvs.fillStyle = '#a8a8a8';
        // 排名
        that.cvs.fillText(i + 1, that.computedSizeW(132), that.computedSizeH(402 + (i - (rankCurrentPage - 1) * this.counts) * 96));
        // 头像
        let avatar = wx.createImage();
        avatar.src = that.rankData[i].avatarUrl;

        avatar.onload = () => {
          that.circleImg(this.cvs, avatar, this.computedSizeW(190), that.computedSizeH(364 + (i - (rankCurrentPage - 1) * this.counts) * 96.8), this.computedSizeW(30))
          that.cvs.closePath();
        }
      }
    }

    // 名字
    if(this.total !== 0) {
      for(let i = (rankCurrentPage - 1) * this.counts; i < current_count + (rankCurrentPage - 1) * this.counts; i++){
        this.cvs.fillStyle = '#666';

        this.cvs.fillText(this.rankData[i].nickname, this.computedSizeW(286), this.computedSizeH(402 + (i - (rankCurrentPage - 1) * this.counts) * 96), this.computedSizeW(146));
      }
    }
      // this.cvs.fillText(`this.rankData[i].nickname`, this.computedSizeW(286), this.computedSizeH(402 ), this.computedSizeW(146));

    // 分数
    this.cvs.font = `bold`;
    this.cvs.fillStyle = '#000';
    if(this.total !== 0){
      for(let i = (rankCurrentPage - 1) * this.counts; i < current_count + (rankCurrentPage - 1) * this.counts; i++){
        if(this.rankData[i].KVDataList.length > 0)
          this.cvs.fillText(this.rankData[i].KVDataList[0].value, this.computedSizeW(538), this.computedSizeH(402 + (i - (rankCurrentPage - 1) * this.counts) * 96));
      }
    }
      let avatar = wx.createImage();
      if (this.selfData.avatarUrl) {
        avatar.src = this.selfData.avatarUrl
        avatar.onload = () => {
          this.circleImg(this.cvs,avatar, this.computedSizeW(190), this.computedSizeH(990), this.computedSizeW(30), this.computedSizeH(30))
          this.cvs.beginPath();
        }
              //蓝色自己排名
        this.cvs.fillStyle = `#ffd81f`;
        this.cvs.font = 'noraml';
        if(this.total !== 0)
          this.cvs.fillText(this.selfData.rank, this.computedSizeW(132), this.computedSizeH(1028));
        // this.cvs.fillRect(100,100,this.computedSizeW(200),this.computedSizeH(200))
        // this.cvs.arc(this.computedSizeW(280), this.computedSizeH(299), this.computedSizeW(80), 0, 2 * Math.PI);
        // this.cvs.fill();
        this.cvs.fillStyle = `#fff`;
        if(this.total !== 0)
          this.cvs.fillText(this.selfData.nickname, this.computedSizeW(286), this.computedSizeH(1028), this.computedSizeW(146));
        this.cvs.font = `bold`;
        if(this.selfData.KVDataList.length > 0)
          this.cvs.fillText(this.selfData.KVDataList[0].value, this.computedSizeW(538), this.computedSizeH(1028));
      }
    
  }
    

  friendRank(){
    this.drawRoundRect(this.cvs, this.computedSizeW(85), this.computedSizeH(160), this.computedSizeW(216), this.computedSizeH(70), this.computedSizeH(35), 'rgba(73,116,235,1)');
    this.drawRoundRect(this.cvs, this.computedSizeW(442), this.computedSizeH(160), this.computedSizeW(216), this.computedSizeH(70), this.computedSizeH(35), '#fff', 2);
    this.cvs.fillStyle = "#fff";
    this.cvs.font = `bold ${this.computedSizeW(30)}px xszt`;
    this.cvs.textAlign = "left";
    this.cvs.fillText('好友排行', this.computedSizeW(133), this.computedSizeH(206));
    this.cvs.fillText('世界排行', this.computedSizeW(489), this.computedSizeH(206));

    const btn = wx.createImage();
    btn.src = 'images/btn.png';
    this.cvs.drawImage(btn, 0, 0, btn.width, btn.height, this.computedSizeW(445), this.computedSizeH(1150), this.computedSizeW(216), this.computedSizeH(80));
    this.cvs.fillStyle = "#fff";
    this.cvs.font = `bold ${this.computedSizeW(30)}px xszt`;
    this.cvs.fillText('查看群排行', this.computedSizeW(480), this.computedSizeH(1194));
    
  }

  worldRank(){
    this.drawRoundRect(this.cvs, this.computedSizeW(85), this.computedSizeH(160), this.computedSizeW(216), this.computedSizeH(70), this.computedSizeH(35), '#fff', 2);
    this.drawRoundRect(this.cvs, this.computedSizeW(442), this.computedSizeH(160), this.computedSizeW(216), this.computedSizeH(70), this.computedSizeH(35), 'rgba(73,116,235,1)');
    this.cvs.beginPath();
    this.cvs.fillStyle = "#fff";
    this.cvs.font = `bold ${this.computedSizeW(30)}px xszt`;
    this.cvs.textAlign = "left";
    this.cvs.fillText('好友排行', this.computedSizeW(133), this.computedSizeH(206));
    this.cvs.fillText('世界排行', this.computedSizeW(489), this.computedSizeH(206));
    this.cvs.closePath()

    const btn = wx.createImage();
    btn.src = 'images/btn.png';
    this.cvs.drawImage(btn, 0, 0, btn.width, btn.height, this.computedSizeW(445), this.computedSizeH(1150), this.computedSizeW(216), this.computedSizeH(80));
    this.cvs.fillStyle = "#fff";
    this.cvs.font = `bold ${this.computedSizeW(30)}px xszt`;
    this.cvs.fillText('查看群排行', this.computedSizeW(480), this.computedSizeH(1194));
    this.cvs.closePath();
  }

  groupRank(){
    // this.drawRoundRect(this.cvs, this.computedSizeW(85), this.computedSizeH(160), this.computedSizeW(216), this.computedSizeH(70), this.computedSizeW(35), '#fff', 2);
    // this.drawRoundRect(this.cvs, this.computedSizeW(442), this.computedSizeH(160), this.computedSizeW(216), this.computedSizeH(70), this.computedSizeW(35), 'rgba(73,116,235,1)');
    this.drawRoundRect(this.cvs, (this.winWidth - this.computedSizeW(216)) / 2, this.computedSizeH(160), this.computedSizeW(216), this.computedSizeH(70), this.computedSizeH(35), 'rgba(73,116,235,1)');
    this.cvs.beginPath();
    this.cvs.fillStyle = "#fff";
    this.cvs.textAlign = "center";
    this.cvs.font = `bold ${this.computedSizeW(30)}px xszt`;
    this.cvs.fillText('群排行榜', this.winWidth / 2, this.computedSizeH(206));


    const btn = wx.createImage();
    btn.src = 'images/btn.png';
    this.cvs.drawImage(btn, 0, 0, btn.width, btn.height, this.computedSizeW(445), this.computedSizeH(1150), this.computedSizeW(216), this.computedSizeH(80));
    this.cvs.fillStyle = "#fff";
    this.cvs.font = `bold ${this.computedSizeW(30)}px xszt`;
    this.cvs.fillText('我也要玩', this.computedSizeW(550), this.computedSizeH(1194));
  }

}