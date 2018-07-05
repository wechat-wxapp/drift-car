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
   * 基础页面框架
   * @param {Number} type 
   * @param {*} noScale 
   */
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

  /**
   * 更新页面内容数据
   * */
  showData(data) {
    this.total = this.rankData.length;
    this.totalPages = data.rankCurrentPage ? data.rankCurrentPage : Math.ceil(this.total / this.counts);
    // 当前页数
    switch (data.common) {
      case 0 : 
      this.rankCurrentPage <= 1 ? this.rankCurrentPage = 1 : this.rankCurrentPage--;
      break;
      case 1 :
      this.rankCurrentPage >= this.totalPages ? this.rankCurrentPage = this.totalPages : this.rankCurrentPage++;
      break;
    }
    
    let rankCurrentPage = data.rankCurrentPage ? data.rankCurrentPage : this.rankCurrentPage
    
    // 当前页面展示数量
    let current_count = (rankCurrentPage == this.totalPages) ? ((false == (this.total % this.counts)) ? 6 : this.total % this.counts) : this.counts;
    console.log('总条数',rankCurrentPage,current_count,this.total % this.counts,this.total,this.totalPages)

    //是否有下一页和上一页
    
    let hasNextPage = data.hasNextPage || (this.totalPages > rankCurrentPage);
    let hasPrePage = data.hasPrePage || rankCurrentPage > 1;

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
    hasPrePage ? this.cvs.fillStyle = this.themeBule : this.cvs.fillStyle = "#808080";
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
    hasNextPage ? this.cvs.fillStyle = this.themeBule : this.cvs.fillStyle = "#808080";
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
        //前三名变蓝色
        that.cvs.fillStyle = [0, 1, 2].includes(i) ? that.themeBule : '#a8a8a8'
        // 排名
        that.cvs.fillText(i + 1, that.computedSizeW(132), that.computedSizeH(402 + (i - (rankCurrentPage - 1) * this.counts) * 96));
        // 头像
        let avatar = wx.createImage();
        let j = data.rankCurrentPage ? i % 6 : i;
        avatar.src = that.rankData[j].avatarUrl;

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
        let j = data.rankCurrentPage ? i % 6 : i;
        this.cvs.fillText(this.rankData[j].nickname, this.computedSizeW(286), this.computedSizeH(402 + (i - (rankCurrentPage - 1) * this.counts) * 96), this.computedSizeW(146));
      }
    }
      // this.cvs.fillText(`this.rankData[i].nickname`, this.computedSizeW(286), this.computedSizeH(402 ), this.computedSizeW(146));

    // 分数
    this.cvs.font = `bold`;
    this.cvs.fillStyle = '#000';
    if(this.total !== 0){
      for(let i = (rankCurrentPage - 1) * this.counts; i < current_count + (rankCurrentPage - 1) * this.counts; i++){
        let j = data.rankCurrentPage ? i % 6 : i;
        if(this.rankData[j].KVDataList.length > 0)
          this.cvs.fillText(this.rankData[j].KVDataList[0].value, this.computedSizeW(538), this.computedSizeH(402 + (i - (rankCurrentPage - 1) * this.counts) * 96));
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