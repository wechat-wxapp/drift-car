import Init from './init';

/**
 * 开始页函数
 */
export default class Loader extends Init {
    constructor() {
        super();
    }

    /**
     * 更新页面内容
     * */
    setTexture(data) {
        this.clearCvs();

        let maxScore = data.score;

        if (this.selfData) {
            if (data.score > this.selfData['KVDataList'][0].value) {
                this.updateWxScore(data.score);
            } else {
                maxScore = this.selfData['KVDataList'][0].value;
            }
        }

        const endHeader = wx.createImage();
        endHeader.src = 'images/end-header.png';
        this.cvs.drawImage(endHeader, 0, 0, endHeader.width, endHeader.height, this.computedSizeW(95), this.computedSizeH(182), this.computedSizeW(endHeader.width), this.computedSizeH(endHeader.height));

        this.cvs.fillStyle = "#fff";
        this.cvs.fillRect(this.computedSizeW(95), this.computedSizeH(395), this.computedSizeW(560), this.computedSizeH(510));

        this.cvs.fillStyle = "#333";
        this.cvs.textAlign = "center";
        this.cvs.font = `bold ${this.computedSizeW(102)}px Arial`;
        this.cvs.fillText(data.score, this.winWidth / 2, this.computedSizeH(480));

        this.cvs.fillStyle = "#DFC48D";
        this.cvs.fillRect(this.computedSizeW(155), this.computedSizeH(566), this.computedSizeW(440), this.computedSizeH(2));

        this.cvs.fillStyle = "#9a9a9a";
        this.cvs.textAlign = "left";
        this.cvs.font = `${this.computedSizeW(20)}px Arial`;
        this.cvs.fillText('查看全部排行 >', this.computedSizeW(436), this.computedSizeH(870));

        // 再玩一局
        const endAgain = wx.createImage();
        endAgain.src = 'images/end-again.png';
        this.cvs.drawImage(endAgain, 0, 0, endAgain.width, endAgain.height, this.computedSizeW(95.2), this.computedSizeH(950), this.computedSizeW(endAgain.width), this.computedSizeW(endAgain.height));

        // 返回首页
        const endBack = wx.createImage();
        endBack.src = 'images/end-back.png';
        this.cvs.drawImage(endBack, 0, 0, endBack.width, endBack.height, this.computedSizeW(95.7), this.computedSizeH(1074), this.computedSizeW(endBack.width), this.computedSizeW(endBack.height));

        // 炫耀一下
        const endShare = wx.createImage();
        endShare.src = 'images/end-share.png';
        this.cvs.drawImage(endShare, 0, 0, endShare.width, endShare.height, this.computedSizeW(424.7), this.computedSizeH(1074), this.computedSizeW(endShare.width), this.computedSizeW(endShare.height));

        // 名次背景
        const rankBg = wx.createImage();
        rankBg.src = 'images/end-rank-bg.png';

        if (this.rankData !== null ) {
            const rank = this.selfData.rank
            let {myPowerfulFri,myWeakFri} = {}
            if (rank !== 1) {
                myPowerfulFri = this.rankData[rank - 2]
            }
            if (rank !== this.selfData.length) {
                myWeakFri = this.rankData[rank]
            }
            this.cvs.fillStyle = "#999";
            this.cvs.textAlign = "center";
            this.cvs.font = `bold ${this.computedSizeW(26)}px Arial`;
            this.cvs.fillText(`历史最高得分：${ this.selfData['KVDataList'][0].value }`, this.winWidth / 2, this.computedSizeH(530));

            this.cvs.textAlign = 'center';

            // 多种排名可能情况
            if (myPowerfulFri && myWeakFri) {
                //头像
                const avatar = wx.createImage();
                avatar.src = myPowerfulFri.avatarUrl;
                avatar.onload = () => {
                    this.circleImg(this.cvs, avatar,  this.computedSizeW(180), this.computedSizeH(642), this.computedSizeW(42), this.computedSizeW(42));

                    // 名次背景
                    this.cvs.drawImage(rankBg, 0, 0, rankBg.width, rankBg.height, this.computedSizeW(168), this.computedSizeH(645) - this.computedSizeW(24), this.computedSizeW(rankBg.width), this.computedSizeW(rankBg.height));

                    //名次
                    this.cvs.font = `${this.computedSizeW(24)}px Arial`;
                    this.cvs.fillStyle = '#2FBF2E';
                    this.cvs.fillText(`第${rank - 1}名`, this.computedSizeW(220), this.computedSizeH(650));
                };
                const avatar1 = wx.createImage();
                avatar1.src = this.selfData.avatarUrl;
                avatar1.onload = () => {
                    this.circleImg(this.cvs, avatar1,  this.computedSizeW(332), this.computedSizeH(642), this.computedSizeW(42), this.computedSizeW(42));

                    // 名次背景
                    this.cvs.drawImage(rankBg, 0, 0, rankBg.width, rankBg.height, this.computedSizeW(322), this.computedSizeH(645) - this.computedSizeW(24), this.computedSizeW(rankBg.width), this.computedSizeW(rankBg.height));

                    //名次
                    this.cvs.font = `${this.computedSizeW(24)}px Arial`;
                    this.cvs.fillStyle = '#2FBF2E';
                    this.cvs.fillText(`第${rank}名`, this.computedSizeW(374), this.computedSizeH(650));
                };
                const avatar2 = wx.createImage();
                avatar2.src = myWeakFri.avatarUrl;
                avatar2.onload = () => {
                    this.circleImg(this.cvs, avatar2,  this.computedSizeW(490), this.computedSizeH(642), this.computedSizeW(42), this.computedSizeW(42));

                    // 名次背景
                    this.cvs.drawImage(rankBg, 0, 0, rankBg.width, rankBg.height, this.computedSizeW(478), this.computedSizeH(645) - this.computedSizeW(24), this.computedSizeW(rankBg.width), this.computedSizeW(rankBg.height));

                    //名次
                    this.cvs.font = `${this.computedSizeW(24)}px Arial`;
                    this.cvs.fillStyle = '#2FBF2E';
                    this.cvs.fillText(`第${rank + 1}名`, this.computedSizeW(530), this.computedSizeH(650));
                };

                // 昵称
                this.cvs.font = `${this.computedSizeW(20)}px Arial`;
                this.cvs.fillStyle = "#666";
                this.cvs.textAlign = "center";
                this.cvs.fillText(myPowerfulFri.nickname, this.computedSizeW(220), this.computedSizeH(760));
                this.cvs.fillText(this.selfData.nickname, this.computedSizeW(374), this.computedSizeH(760));
                this.cvs.fillText(myWeakFri.nickname, this.computedSizeW(530), this.computedSizeH(760));

                // 得分
                this.cvs.font = `bold ${this.computedSizeW(24)}px Arial`;
                this.cvs.fillStyle = "#000";
                this.cvs.fillText(myPowerfulFri['KVDataList'][0].value, this.computedSizeW(220), this.computedSizeH(800));
                this.cvs.fillText(this.selfData['KVDataList'][0].value, this.computedSizeW(374), this.computedSizeH(800));
                this.cvs.fillText(myWeakFri['KVDataList'][0].value, this.computedSizeW(530), this.computedSizeH(800));
            } else if(myPowerfulFri || myWeakFri) {

                const power = myPowerfulFri !== undefined;
                myWeakFri = power ? this.selfData: myWeakFri;
                myPowerfulFri = power ? myPowerfulFri: this.selfData;
                if (power) {
                    myPowerfulFri.rank = rank - 1
                } else {
                    myWeakFri.rank = rank + 1
                }

                //名次
                // this.cvs.font = `${this.computedSizeW(24)}px Arial`;
                // this.cvs.fillStyle = '#2FBF2E';
                this.cvs.textAlign = "center";

                // if (!power) {
                //     this.cvs.fillText(`第${myPowerfulFri.rank}名`, this.winWidth / 4  + this.computedSizeW(42), this.computedSizeH(650));
                //     this.cvs.fillText(`第${myWeakFri.rank}名`, this.winWidth / 4 * 3  - this.computedSizeW(42), this.computedSizeH(650));
                // } else {
                //     this.cvs.fillText(`第${myPowerfulFri.rank}名`, this.winWidth / 4  + this.computedSizeW(42), this.computedSizeH(650));
                //     this.cvs.fillText(`第${myWeakFri.rank}名`, this.winWidth / 4 * 3  - this.computedSizeW(42), this.computedSizeH(650));
                // }

                //头像
                const avatar = wx.createImage();
                avatar.src = myWeakFri.avatarUrl;
                avatar.onload = () => {
                    this.circleImg(this.cvs, avatar,  this.winWidth / 4 * 3 - this.computedSizeW(84), this.computedSizeH(642), this.computedSizeW(42), this.computedSizeW(42));

                    // 名次背景
                    this.cvs.drawImage(rankBg, 0, 0, rankBg.width, rankBg.height, this.computedSizeW(468), this.computedSizeH(620) - this.computedSizeW(24), this.computedSizeW(rankBg.width), this.computedSizeW(rankBg.height));

                    this.cvs.font = `${this.computedSizeW(24)}px Arial`;
                    this.cvs.fillStyle = '#2FBF2E';
                    this.cvs.fillText(`第${myWeakFri.rank}名`, this.winWidth / 4 * 3  - this.computedSizeW(42), this.computedSizeH(650));
                };
                const avatar1 = wx.createImage();
                avatar1.src = myPowerfulFri.avatarUrl;
                avatar1.onload = () => {
                    this.circleImg(this.cvs, avatar1, this.winWidth / 4, this.computedSizeH(642), this.computedSizeW(42), this.computedSizeW(42));

                    // 名次背景
                    this.cvs.drawImage(rankBg, 0, 0, rankBg.width, rankBg.height, this.computedSizeW(178), this.computedSizeH(620) - this.computedSizeW(24), this.computedSizeW(rankBg.width), this.computedSizeW(rankBg.height));

                    this.cvs.font = `${this.computedSizeW(24)}px Arial`;
                    this.cvs.fillStyle = '#2FBF2E';
                    this.cvs.fillText(`第${myPowerfulFri.rank}名`, this.winWidth / 4  + this.computedSizeW(42), this.computedSizeH(650));
                };

                this.cvs.font = `${this.computedSizeW(20)}px Arial`;
                this.cvs.fillStyle = "#666";
                this.cvs.textAlign = "center";
                this.cvs.fillText(myPowerfulFri.nickname, this.winWidth / 4  + this.computedSizeW(42), this.computedSizeH(760));
                this.cvs.fillText(myWeakFri.nickname, this.winWidth / 4 * 3  - this.computedSizeW(42), this.computedSizeH(760));

                this.cvs.font = `bold ${this.computedSizeW(24)}px Arial`;
                this.cvs.fillStyle = "#000";
                this.cvs.fillText(myPowerfulFri['KVDataList'][0].value, this.winWidth / 4  + this.computedSizeW(42), this.computedSizeH(800));
                this.cvs.fillText(myWeakFri['KVDataList'][0].value, this.winWidth / 4 * 3  - this.computedSizeW(42), this.computedSizeH(800));
            } else {
                this.cvs.textAlign = "center";

                //头像
                const avatar = wx.createImage();
                avatar.src = this.selfData.avatarUrl;
                avatar.onload = () => {
                    this.circleImg(this.cvs, avatar,  this.computedSizeW(332), this.computedSizeH(642), this.computedSizeW(42), this.computedSizeW(42));

                    // 名次背景
                    this.cvs.drawImage(rankBg, 0, 0, rankBg.width, rankBg.height, this.computedSizeW(325), this.computedSizeH(620) - this.computedSizeW(24), this.computedSizeW(rankBg.width), this.computedSizeW(rankBg.height));

                    // 名次
                    this.cvs.font = `${this.computedSizeW(24)}px Arial`;
                    this.cvs.fillStyle = '#2FBF2E';
                    this.cvs.fillText(`第${rank}名`, this.winWidth / 2, this.computedSizeH(650));
                };

                this.cvs.font = `${this.computedSizeW(20)}px Arial`;
                this.cvs.fillStyle = "#666";
                this.cvs.textAlign = "center";
                this.cvs.fillText(this.selfData.nickname, this.computedSizeW(374), this.computedSizeH(760));

                this.cvs.font = `bold ${this.computedSizeW(24)}px Arial`;
                this.cvs.fillStyle = "#000";
                this.cvs.fillText(maxScore, this.computedSizeW(374), this.computedSizeH(800));
            }
        }


    }
}
