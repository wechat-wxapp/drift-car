import Init from './init';

/**
 * 开始页函数
 */
export default class Resurgence extends Init {
    constructor() {
        super();

        this.endHeader = wx.createImage();
        this.endHeader.src = 'images/end-header.png';

        this.rankOne = wx.createImage();
        this.rankOne.src = 'images/rankOne.png';

        this.rePlay = wx.createImage();
        this.rePlay.src = 'images/reseur-rePlay.png';

        //默认头像图片
        this.staticAvater = wx.createImage();
        this.staticAvater.src = 'images/static-avatar.png';
    }

    relativeSizeH(num) {
        return this.computedSizeH(239) + this.computedSizeW(num - 239)
    }
    
    /**
     * 更新页面内容
     * */
    setTexture(data) {
        this.clearCvs();

        const { list, self } = this.getHWData('friendRank');
        this.rankData = list;
        this.selfData = self;

        this.cvs.drawImage(this.endHeader, 0, 0, this.endHeader.width, this.endHeader.height, this.computedSizeW(95), this.computedSizeH(239), this.computedSizeW(this.endHeader.width), this.computedSizeW(this.endHeader.height));

        // 白色背景
        this.cvs.fillStyle = "#fff";
        this.cvs.fillRect(this.computedSizeW(95), this.relativeSizeH(452), this.computedSizeW(560), this.computedSizeW(565));

        // 得分
        this.cvs.fillStyle = "#333";
        this.cvs.textAlign = "center";
        this.cvs.font = `bold ${this.computedSizeW(150)}px Arial`;
        this.cvs.fillText(data.score, this.winWidth / 2, this.computedSizeW(630));

        // 横线
        this.cvs.fillStyle = "#DFC48D";
        this.cvs.fillRect(this.computedSizeW(155), this.relativeSizeH(711), this.computedSizeW(440), this.computedSizeW(2));

        if (this.rankData) {
            let myFri = null;
            let scoreLess = 0;
            this.rankData.map((e, index)=>{
                if (e['KVDataList'][0].value > data.score && e.openid !== this.selfData.openid) {
                    myFri = e;
                    scoreLess = myFri['KVDataList'][0].value - data.score
                }
            });

            if (myFri === null) {
                // const rankOne = wx.createImage();
                // rankOne.src = 'images/rankOne.png';
                this.cvs.drawImage(this.rankOne, 0, 0, this.rankOne.width, this.rankOne.height, this.winWidth / 2 - this.computedSizeW(326) / 2, this.relativeSizeH(456), this.computedSizeW(326), this.computedSizeW(25));
            } else {
                this.cvs.fillStyle = "#999";
                this.cvs.font = `${this.computedSizeW(26)}px Arial`;
                this.cvs.textAlign = "left";
                this.cvs.fillText(`还差${scoreLess}分超越:`, this.computedSizeW(155), this.relativeSizeH(795));

                // 超过长度省略名字
                const clipNickName = this.textOverFlow(myFri.nickname, this.computedSizeW(80));

                this.cvs.fillText(clipNickName, this.computedSizeW(513), this.relativeSizeH(795));
                this.cvs.fill();

                //要判断这 个人有没有头像
                let beyondFriendAvatar = myFri.avatarObj ? myFri.avatarObj : this.staticAvater;
                this.circleImg(this.cvs, beyondFriendAvatar, this.computedSizeW(409), this.relativeSizeH(746), this.computedSizeW(42), this.computedSizeW(42));
            }
        } else {
            this.cvs.fillStyle = "#999";
            this.cvs.font = `${this.computedSizeW(26)}px Arial`;
            this.cvs.textAlign = "center";
            this.cvs.fillText('缓存排行榜失败，请重启小程序再试', this.winWidth / 2, this.relativeSizeH(795));
        }

        // const rePlay = wx.createImage();
        // rePlay.src = 'images/reseur-rePlay.png';
        this.cvs.drawImage(this.rePlay, 0, 0, this.rePlay.width, this.rePlay.height, this.computedSizeW(155), this.relativeSizeH(877), this.computedSizeW(440), this.computedSizeW(100));
        // this.cvs.fillStyle = "#fff";
        // this.cvs.font = `bold ${this.computedSizeW(36)}px Arial`;
        // this.cvs.textAlign = "center";
        // this.cvs.fillText('免 费 复 活', this.winWidth / 2, this.relativeSizeH(716));

        this.cvs.fillStyle = "#999";
        this.cvs.textAlign = 'center';
        this.cvs.font = `${this.computedSizeW(26)}px Arial`;
        this.cvs.fillText('点击跳过', this.winWidth / 2, this.relativeSizeH(1070));
        this.cvs.fillRect(this.computedSizeW(320), this.relativeSizeH(1074), this.computedSizeW(110), 2);
    }

}
