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

        //加载图片
        //返回按钮
        this.backBtn = wx.createImage();
        this.backBtn.src = `images/back-btn.png`;
        //上下页
        this.prePageDis = wx.createImage();
        this.prePageDis.src = 'images/pre-page-dis.png';
        this.prePageN = wx.createImage();
        this.prePageN.src = 'images/pre-page-n.png';
        this.nextPageDis = wx.createImage();
        this.nextPageDis.src = 'images/next-page-dis.png';
        this.nextPageN = wx.createImage();
        this.nextPageN.src = 'images/next-page-n.png';

        //好友排行榜的页面图片
        this.friendRankOn = wx.createImage();
        this.friendRankOn.src = 'images/friend-rank-on.png';
        this.worldRankOff = wx.createImage();
        this.worldRankOff.src = 'images/world-rank-off.png';

        //世界排行榜的页面图片
        this.friendRankOff = wx.createImage();
        this.friendRankOff.src = 'images/friend-rank-off.png';
        this.worldRankOn = wx.createImage();
        this.worldRankOn.src = 'images/world-rank-on.png';

        //世界和好友排行右下的查看群按键
        this.goGroupRank = wx.createImage();
        this.goGroupRank.src = 'images/go-group-rank.png';

        //群排行榜的页面图片
        this.groupRankOn = wx.createImage();
        this.groupRankOn.src = 'images/group-rank-on.png';
        this.iPlayBtn = wx.createImage();
        this.iPlayBtn.src = 'images/i-play-btn.png';

        //正在加载的图片
        this.isLoading = wx.createImage();
        this.isLoading.src = 'images/is-loading.png';

        //默认头像
        this.staticAvater = wx.createImage();
        this.staticAvater.src = 'images/static-avatar.png';

        this.headerOffsetTop = this.computedSizeH(172);
    }

    //适配IX，相对于顶部图片定位
    relativeSizeH(num) {
        return this.headerOffsetTop + this.computedSizeW(num)
    }

    /**
     * 基础页面框架
     * @param {Number} type
     * @param {*} noScale
     */
    setTexture(type, { noScale }) {
        this.clearCvs(null, noScale);
        if(type === 'friendRank') {
            this.friendRank()
        }else if(type === 'groupRank') {
            // this.initGroupRankData(data.shareTicket);
            this.groupRank();
        }else {
            this.worldRank();
        }
        // 更新提示
        this.cvs.fillStyle = "#fbf6f1";
        this.cvs.fillRect(this.winWidth / 2 - this.computedSizeW(560) / 2, this.relativeSizeH(119), this.computedSizeW(560), this.computedSizeW(50)); //291
        this.cvs.fillStyle = "#808080";
        this.cvs.font = `${this.computedSizeW(20)}px Yahei`;
        this.cvs.textAlign = "center";
        
        // 只有世界排行榜才提示文案
        type === 'worldRank' && this.cvs.fillText('排行榜：每周一凌晨更新',this.winWidth / 2, this.relativeSizeH(152)); //324

        //中央空白背景板
        this.cvs.fillStyle = "#fff";
        this.cvs.fillRect(this.winWidth / 2 - this.computedSizeW(560) / 2, this.relativeSizeH(166), this.computedSizeW(560), this.computedSizeW(640)); //338

        //分割线
        // this.cvs.lineWidth = 2;
        // this.cvs.strokeStyle = '#e7e7e7';
        // const that = this;
        // for (let i = 0; i < 4; i++) {
        //   that.cvs.moveTo(this.computedSizeW(125), this.relativeSizeH(276 + i * 110)); // 448
        //   that.cvs.lineTo(this.computedSizeW(625), this.relativeSizeH(276 + i * 110));
        // }
        // this.cvs.stroke();

        //个人成绩背景板
        // this.cvs.beginPath();
        this.cvs.fillStyle = '#fff';
        this.cvs.fillRect(this.winWidth / 2 - this.computedSizeW(560) / 2, this.relativeSizeH(827), this.computedSizeW(560), this.computedSizeW(110)); //999

        //返回按钮
        this.cvs.drawImage(this.backBtn, 0, 0, this.backBtn.width, this.backBtn.height, this.computedSizeW(95), this.relativeSizeH(967), this.computedSizeW(162), this.computedSizeW(63)); //1139

    }

    //判断是否渲染函数的中间件函数
    dataMiddleware(type, data) {
        const innerMiddlewareFn = ()=> {
            this.middlewareTimer = setTimeout(() => {
                if(wx.HWData.loadingKey) {
                    innerMiddlewareFn();
                }else {
                    if(!data.isDriving || (data.isDriving === 'next' && !this.noNext) || (data.isDriving === 'pre' && !this.noPre)) {
                        //再画一次中央白板
                        this.cvs.fillStyle = "#fff";
                        this.cvs.fillRect(this.winWidth / 2 - this.computedSizeW(560) / 2, this.relativeSizeH(166), this.computedSizeW(560), this.computedSizeW(640));
                        this.cvs.lineWidth = 2;
                        this.cvs.strokeStyle = '#e7e7e7';
                        const that = this;
                        for (let i = 0; i < 4; i++) {
                            that.cvs.moveTo(this.computedSizeW(125), this.relativeSizeH(276 + i * 110)); // 448
                            that.cvs.lineTo(this.computedSizeW(625), this.relativeSizeH(276 + i * 110));
                        }
                        this.cvs.stroke();

                        wx.HWData.loadingKey = false;
                        this.showData(type, data)
                        clearTimeout(this.middlewareTimer)
                    }
                }
            }, 100);
        }
        const { goBackKey } = data;
        if(goBackKey) {
            this.middlewareTimer && clearTimeout(this.middlewareTimer)
            return;
        }
        if(!data.isDriving) {
            this.setTexture(type, data)
            // 隐藏正在加载
            // this.cvs.drawImage(this.isLoading, 0, 0, this.isLoading.width, this.isLoading.height, this.computedSizeW(361) / 2, this.relativeSizeH(380), this.computedSizeW(361), this.computedSizeW(87));
        }

        innerMiddlewareFn()
    }



    /**
     * 更新页面内容数据
     * */
    showData(type, data) {
        let getRankData
        // if(type !== 'groupRank') {
        //   getRankData = this.getHWData(type)
        // } else {
        getRankData = this.getHWData(type);
        if (getRankData === undefined || Object.keys(getRankData).length <= 0) {
            setTimeout(() => {
                this.showData(data, type);
            }, 50);
            return false;
        }
        // const data = this.refreshRankData(type, this.showData.bind(this))
        // getRankData = data;
        // return false;
        // }
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
            this.cvs.drawImage(this.prePageDis, 0, 0, this.prePageDis.width, this.prePageDis.height, this.computedSizeW(201), this.relativeSizeH(730), this.computedSizeW(154), this.computedSizeW(63)); // 902
        }else {
            this.cvs.drawImage(this.prePageN, 0, 0, this.prePageN.width, this.prePageN.height, this.computedSizeW(201), this.relativeSizeH(730), this.computedSizeW(154), this.computedSizeW(63));
        }
        if(hasNextPage) {
            this.cvs.drawImage(this.nextPageDis, 0, 0, this.nextPageDis.width, this.nextPageDis.height, this.computedSizeW(394), this.relativeSizeH(730), this.computedSizeW(154), this.computedSizeW(63));
        }else {
            this.cvs.drawImage(this.nextPageN, 0, 0, this.nextPageN.width, this.nextPageN.height, this.computedSizeW(394), this.relativeSizeH(730), this.computedSizeW(154), this.computedSizeW(63));
        }

        // 排名
        this.cvs.beginPath();
        // this.cvs.font = `${this.computedSizeW(20)}px Yahei`;
        // const that = this;
        if(this.total !== 0){
            for(let i = (rankCurrentPage - 1) * this.counts; i < current_count + (rankCurrentPage - 1) * this.counts; i++) {
                this.cvs.font = `${this.computedSizeW(20)}px Yahei`;
                this.cvs.fillStyle = '#7f2409';
                // 排名
                this.cvs.fillText(i + 1, this.computedSizeW(132), this.relativeSizeH(230 + (i - (rankCurrentPage - 1) * this.counts) * 110)); // 402
            }

            for(let i = (rankCurrentPage - 1) * this.counts; i < current_count + (rankCurrentPage - 1) * this.counts; i++) {
                let j = data.rankCurrentPage ? i % 5 : i;
                //判断要不要用默认头像
                let drawImg = this.rankData[j].avatarObj ? this.rankData[j].avatarObj : this.staticAvater;
                this.circleImg(this.cvs, drawImg, this.computedSizeW(176), this.relativeSizeH(184 + (i - (rankCurrentPage - 1) * this.counts) * 110), this.computedSizeW(39.5)) // 356
            }
        }

        // 名字
        if(this.total !== 0) {
            for(let i = (rankCurrentPage - 1) * this.counts; i < current_count + (rankCurrentPage - 1) * this.counts; i++){
                this.cvs.fillStyle = '#8a8a8a';
                let j = data.rankCurrentPage ? i % 5 : i;
                let nameText = this.rankData[j].nickname == undefined ? '游客玩家' : this.rankData[j].nickname;
                this.cvs.textAlign = "left";
                this.cvs.font = `${this.computedSizeW(20)}px Yahei`;

                // 超过长度省略名字
                const clipNameText = this.textOverFlow(nameText, this.computedSizeW(200));

                this.cvs.fillText(clipNameText, this.computedSizeW(275), this.relativeSizeH(230 + (i - (rankCurrentPage - 1) * this.counts) * 110)); // 402
            }
        }
        // this.cvs.fillText(`this.rankData[i].nickname`, this.computedSizeW(286), this.computedSizeH(402 ), this.computedSizeW(146));

        // 分数
        this.cvs.fillStyle = '#2a2a2a';
        if(this.total !== 0){
            for(let i = (rankCurrentPage - 1) * this.counts; i < current_count + (rankCurrentPage - 1) * this.counts; i++){
                let j = data.rankCurrentPage ? i % 5 : i;
                if(this.rankData[j].KVDataList.length > 0)
                    this.cvs.font = `${this.computedSizeW(20)}px Yahei`;
                this.cvs.fillText(this.rankData[j].KVDataList[0].value, this.computedSizeW(583), this.relativeSizeH(230 + (i - (rankCurrentPage - 1) * this.counts) * 110)); //402
            }
        }

        //底部白色自己排名
        this.selfData = getRankData.self;

        let selfAvatar = this.selfData.avatarObj ? this.selfData.avatarObj : this.staticAvater;
        this.circleImg(this.cvs, selfAvatar, this.computedSizeW(190), this.relativeSizeH(852), this.computedSizeW(30), this.computedSizeH(39)) // 1024

        this.cvs.font = `${this.computedSizeW(20)}px Yahei`;

        this.cvs.fillStyle = '#7f2409';
        this.cvs.fillText(this.selfData.rank, this.computedSizeW(132), this.relativeSizeH(892)); //1064

        this.cvs.fillStyle = '#8a8a8a';
        this.cvs.fillText(this.selfData.nickname, this.computedSizeW(275), this.relativeSizeH(892), this.computedSizeW(146)); // 1064

        if(this.selfData.KVDataList.length > 0) {
            this.cvs.fillStyle = '#2a2a2a';
            this.cvs.fillText(this.selfData.KVDataList[0].value, this.computedSizeW(583), this.relativeSizeH(892)); // 1064
        }

    }


    friendRank(){
        this.cvs.drawImage(this.friendRankOn, 0, 0, this.friendRankOn.width, this.friendRankOn.height, this.computedSizeW(95), this.headerOffsetTop, this.computedSizeW(280), this.computedSizeW(119));
        // this.cvs.drawImage(this.friendRankOn, 0, 0, this.friendRankOn.width, this.friendRankOn.height, this.computedSizeW(95), this.computedSizeH(172), this.computedSizeW(280), this.computedSizeW(119));

        this.cvs.drawImage(this.worldRankOff, 0, 0, this.worldRankOff.width, this.worldRankOff.height, this.computedSizeW(376), this.headerOffsetTop, this.computedSizeW(280), this.computedSizeW(119));

        this.cvs.drawImage(this.goGroupRank, 0, 0, this.goGroupRank.width, this.goGroupRank.height, this.computedSizeW(481), this.relativeSizeH(967), this.computedSizeW(174), this.computedSizeW(63)); //1139
    }

    worldRank(){
        this.cvs.drawImage(this.friendRankOff, 0, 0, this.friendRankOff.width, this.friendRankOff.height, this.computedSizeW(95), this.computedSizeH(172), this.computedSizeW(280), this.computedSizeW(119));

        this.cvs.drawImage(this.worldRankOn, 0, 0, this.worldRankOn.width, this.worldRankOn.height, this.computedSizeW(376), this.computedSizeH(172), this.computedSizeW(280), this.computedSizeW(119));

        this.cvs.drawImage(this.goGroupRank, 0, 0, this.goGroupRank.width, this.goGroupRank.height, this.computedSizeW(481), this.relativeSizeH(967), this.computedSizeW(174), this.computedSizeW(63));

    }

    groupRank(){
        this.cvs.drawImage(this.groupRankOn, 0, 0, this.groupRankOn.width, this.groupRankOn.height, this.computedSizeW(96), this.computedSizeH(172), this.computedSizeW(558), this.computedSizeW(120));

        this.cvs.drawImage(this.iPlayBtn, 0, 0, this.iPlayBtn.width, this.iPlayBtn.height, this.computedSizeW(481), this.relativeSizeH(967), this.computedSizeW(174), this.computedSizeW(63));
    }

}