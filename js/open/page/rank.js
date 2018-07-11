import Init from './init';

/**
 * 开始页函数
 */
export default class Rank extends Init {
  constructor() {
    super();
    this.total = null;
    // 每页展示数
    this.counts = 5;
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
    this.cvs.fillStyle = "#fbf6f1";
    this.cvs.fillRect(this.winWidth / 2 - this.computedSizeW(560) / 2, this.computedSizeH(291), this.computedSizeW(560), this.computedSizeH(50));
    this.cvs.fillStyle = "#808080";
    this.cvs.font = `${this.computedSizeH(20)}px Yahei`;
    this.cvs.textAlign = "center";
    this.cvs.fillText('排行榜：每周一凌晨更新',this.winWidth / 2, this.computedSizeH(324));
    
    //中央空白背景板
    this.cvs.fillStyle = "#fff";
    this.cvs.fillRect(this.winWidth / 2 - this.computedSizeW(560) / 2, this.computedSizeH(338), this.computedSizeW(560), this.computedSizeH(640));

    //分割线
    this.cvs.lineWidth = 2; 
    this.cvs.strokeStyle = '#e7e7e7';
    const that = this;
    for (let i = 0; i < 4; i++) {
      that.cvs.moveTo(this.computedSizeW(125), this.computedSizeH(448 + i * 110));
      that.cvs.lineTo(this.computedSizeW(625), this.computedSizeH(448 + i * 110));
    }
    this.cvs.stroke();

    //个人成绩背景板
    // this.cvs.beginPath();
    this.cvs.fillStyle = '#fff';
    this.cvs.fillRect(this.winWidth / 2 - this.computedSizeW(560) / 2, this.computedSizeH(999), this.computedSizeW(560), this.computedSizeH(110));

    //返回按钮
    const backBtn = wx.createImage();
    backBtn.src = `images/back-btn.png`;
    this.cvs.drawImage(backBtn, 0, 0, backBtn.width, backBtn.height, this.computedSizeW(95), this.computedSizeH(1139), this.computedSizeW(162), this.computedSizeH(63));

  }

  /**
   * 更新页面内容数据
   * */
  showData(data, type) {
    let getRankData
    if(type !== 'groupRank') {
      getRankData = this.getHWData(type)
    } else {
      getRankData = this.getHWData(type);
      if (Object.keys(getRankData).length <= 0) {
        setTimeout(() => {
          this.showData(data, type);
        }, 500);
        return false;
      }
    }

    console.log('群:',getRankData,this.selfData)
    if(!getRankData.list) return;
    this.rankData = getRankData.list;
    this.total = this.rankData.length;
    // }
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
    let current_count = (rankCurrentPage == this.totalPages) ? ((false == (this.total % this.counts)) ? this.counts : this.total % this.counts) : this.counts;

    //是否有下一页和上一页
    let hasNextPage = data.hasNextPage || (this.totalPages > rankCurrentPage);
    let hasPrePage = data.hasPrePage || rankCurrentPage > 1;
    
    // let { isDriving } = data;
    let isLastPage = rankCurrentPage === this.totalPages;
    let isFristPage = rankCurrentPage === 1;
    // if(type === 'world') {
      //   this.noNext = !data.hasNextPage;
      // } else {
      this.noNext = isLastPage ? 1 : 0;
    // }
    this.noPre = isFristPage ? 1 : 0;

    /**
     * 上下一页
     */
    // hasPrePage ? this.cvs.fillStyle = this.themeBule : this.cvs.fillStyle = "#808080";
    if(hasPrePage) {
      const prePageDis = wx.createImage();
      prePageDis.src = 'images/pre-page-dis.png';
      this.cvs.drawImage(prePageDis, 0, 0, prePageDis.width, prePageDis.height, this.computedSizeW(201), this.computedSizeH(902), this.computedSizeW(154), this.computedSizeH(63));
    }else {
      const prePageN = wx.createImage();
      prePageN.src = 'images/pre-page-n.png';
      this.cvs.drawImage(prePageN, 0, 0, prePageN.width, prePageN.height, this.computedSizeW(201), this.computedSizeH(902), this.computedSizeW(154), this.computedSizeH(63));
    }
    if(hasNextPage) {
      const nextPageDis = wx.createImage();
      nextPageDis.src = 'images/next-page-dis.png';
      this.cvs.drawImage(nextPageDis, 0, 0, nextPageDis.width, nextPageDis.height, this.computedSizeW(394), this.computedSizeH(902), this.computedSizeW(154), this.computedSizeH(63));
    }else {
      const nextPageN = wx.createImage();
      nextPageN.src = 'images/next-page-n.png';
      this.cvs.drawImage(nextPageN, 0, 0, nextPageN.width, nextPageN.height, this.computedSizeW(394), this.computedSizeH(902), this.computedSizeW(154), this.computedSizeH(63));
    }

    // 排名
    this.cvs.beginPath();
    this.cvs.fillStyle = this.themeBule;
    const that = this;
    if(this.total !== 0){
      for(let i = (rankCurrentPage - 1) * this.counts; i < current_count + (rankCurrentPage - 1) * this.counts; i++) {
        that.cvs.fillStyle = '#7f2409';
        // 排名
        that.cvs.fillText(i + 1, that.computedSizeW(132), that.computedSizeH(402 + (i - (rankCurrentPage - 1) * this.counts) * 110));
        // 头像
        let j = data.rankCurrentPage ? i % 5 : i;
        // let avatar = wx.createImage();
        // avatar.src = that.rankData[j].avatarUrl;
        // avatar.onload = () => {
        //   that.circleImg(this.cvs, avatar, this.computedSizeW(176), that.computedSizeH(356 + (i - (rankCurrentPage - 1) * this.counts) * 110), this.computedSizeW(39.5))
        //   that.cvs.closePath();
        // }
        that.circleImg(this.cvs, that.rankData[j].avatarObj, this.computedSizeW(176), that.computedSizeH(356 + (i - (rankCurrentPage - 1) * this.counts) * 110), this.computedSizeW(39.5))
      }
    }

    // 名字
    this.cvs.font = `bold`;
    this.cvs.textAlign = "left";
    if(this.total !== 0) {
      for(let i = (rankCurrentPage - 1) * this.counts; i < current_count + (rankCurrentPage - 1) * this.counts; i++){
        this.cvs.fillStyle = '#8a8a8a';
        let j = data.rankCurrentPage ? i % 5 : i;
        this.cvs.fillText(this.rankData[j].nickname, this.computedSizeW(275), this.computedSizeH(402 + (i - (rankCurrentPage - 1) * this.counts) * 110), this.computedSizeW(146));
      }
    }
      // this.cvs.fillText(`this.rankData[i].nickname`, this.computedSizeW(286), this.computedSizeH(402 ), this.computedSizeW(146));

    // 分数
    this.cvs.fillStyle = '#2a2a2a';
    if(this.total !== 0){
      for(let i = (rankCurrentPage - 1) * this.counts; i < current_count + (rankCurrentPage - 1) * this.counts; i++){
        let j = data.rankCurrentPage ? i % 5 : i;
        if(this.rankData[j].KVDataList.length > 0)
          this.cvs.fillText(this.rankData[j].KVDataList[0].value, this.computedSizeW(583), this.computedSizeH(402 + (i - (rankCurrentPage - 1) * this.counts) * 110));
      }
    }
    
    //底部白色自己排名
    this.selfData = getRankData.self;
    // let avatar = wx.createImage();
    // if (this.selfData.avatarUrl) {
    //   avatar.src = this.selfData.avatarUrl
    //   avatar.onload = () => {
    //     this.circleImg(this.cvs,avatar, this.computedSizeW(190), this.computedSizeH(1024), this.computedSizeW(30), this.computedSizeH(39))
    //     this.cvs.beginPath();
    //   }
    //   if(this.total !== 0){
    //     this.cvs.fillStyle = '#7f2409';
    //     this.cvs.fillText(this.selfData.rank, this.computedSizeW(132), this.computedSizeH(1064));
    //   }
    //   if(this.total !== 0){
    //     this.cvs.fillStyle = '#8a8a8a';
    //     this.cvs.fillText(this.selfData.nickname, this.computedSizeW(275), this.computedSizeH(1064), this.computedSizeW(146));
    //   }
    //   if(this.selfData.KVDataList.length > 0){
    //     this.cvs.fillStyle = '#2a2a2a';
    //     this.cvs.fillText(this.selfData.KVDataList[0].value, this.computedSizeW(583), this.computedSizeH(1064));
    //   }
    // }
    
  }
    

  friendRank(){
    const friendRankOn = wx.createImage();
    friendRankOn.src = 'images/friend-rank-on.png';
    this.cvs.drawImage(friendRankOn, 0, 0, friendRankOn.width, friendRankOn.height, this.computedSizeW(95), this.computedSizeH(172), this.computedSizeW(280), this.computedSizeH(119));
    
    const worldRankOff = wx.createImage();
    worldRankOff.src = 'images/world-rank-off.png';
    this.cvs.drawImage(worldRankOff, 0, 0, worldRankOff.width, worldRankOff.height, this.computedSizeW(376), this.computedSizeH(172), this.computedSizeW(280), this.computedSizeH(119));
    
    const goGroupRank = wx.createImage();
    goGroupRank.src = 'images/go-group-rank.png';
    this.cvs.drawImage(goGroupRank, 0, 0, goGroupRank.width, goGroupRank.height, this.computedSizeW(481), this.computedSizeH(1139), this.computedSizeW(174), this.computedSizeH(63));
  }

  worldRank(){
    const friendRankOff = wx.createImage();
    friendRankOff.src = 'images/friend-rank-off.png';
    this.cvs.drawImage(friendRankOff, 0, 0, friendRankOff.width, friendRankOff.height, this.computedSizeW(95), this.computedSizeH(172), this.computedSizeW(280), this.computedSizeH(119));
    
    const worldRankOn = wx.createImage();
    worldRankOn.src = 'images/world-rank-on.png';
    this.cvs.drawImage(worldRankOn, 0, 0, worldRankOn.width, worldRankOn.height, this.computedSizeW(376), this.computedSizeH(172), this.computedSizeW(280), this.computedSizeH(119));
    
    const goGroupRank = wx.createImage();
    goGroupRank.src = 'images/go-group-rank.png';
    this.cvs.drawImage(goGroupRank, 0, 0, goGroupRank.width, goGroupRank.height, this.computedSizeW(481), this.computedSizeH(1139), this.computedSizeW(174), this.computedSizeH(63));

  }

  groupRank(){
    const groupRankOn = wx.createImage();
    groupRankOn.src = 'images/group-rank-on.png';
    this.cvs.drawImage(groupRankOn, 0, 0, groupRankOn.width, groupRankOn.height, this.computedSizeW(96), this.computedSizeH(172), this.computedSizeW(558), this.computedSizeH(120));

    const iPlayBtn = wx.createImage();
    iPlayBtn.src = 'images/i-play-btn.png';
    this.cvs.drawImage(iPlayBtn, 0, 0, iPlayBtn.width, iPlayBtn.height, this.computedSizeW(481), this.computedSizeH(1139), this.computedSizeW(174), this.computedSizeH(63));
  }

}