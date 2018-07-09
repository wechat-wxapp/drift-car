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

        const endHeader = wx.createImage();
        endHeader.src = 'images/end-header.png';
        this.cvs.drawImage(endHeader, 0, 0, endHeader.width, endHeader.height, this.computedSizeW(95), this.computedSizeH(238), this.computedSizeW(endHeader.width), this.computedSizeW(endHeader.height));

        // 白色背景
        this.cvs.fillStyle = "#fff";
        this.cvs.fillRect(this.computedSizeW(95), this.computedSizeH(452), this.computedSizeW(560), this.computedSizeH(565));

        // 得分
        this.cvs.fillStyle = "#333";
        this.cvs.textAlign = "center";
        this.cvs.font = `bold ${this.computedSizeW(150)}px Arial`;
        this.cvs.fillText(data.score, this.winWidth / 2, this.computedSizeH(630));

        // 横线
        this.cvs.fillStyle = "#DFC48D";
        this.cvs.fillRect(this.computedSizeW(155), this.computedSizeH(711), this.computedSizeW(440), this.computedSizeH(2));

        if (this.rankData !== null ) {
            let myFri = null;
            let scoreLess = 0;
            this.rankData.map((e, index)=>{
                if (e['KVDataList'][0].value > data.score && e.openid !== this.selfData.openid) {
                    myFri = e;
                    scoreLess = myFri['KVDataList'][0].value - data.score
                }
            });

            if (myFri === null) {
                const rankOne = wx.createImage();
                rankOne.src = 'images/rankOne.png';
                this.cvs.drawImage(rankOne, 0, 0, rankOne.width, rankOne.height, this.winWidth / 2 - this.computedSizeW(326) / 2, this.computedSizeH(456), this.computedSizeW(326), this.computedSizeH(25));
            } else {
                this.cvs.fillStyle = "#999";
                this.cvs.font = `${this.computedSizeW(26)}px Arial`;
                this.cvs.textAlign = "left";
                this.cvs.fillText(`还差${scoreLess}分超越:`, this.computedSizeW(155), this.computedSizeH(795));

                if (myFri.nickname.length > 15) {
                    myFri.nickname = myFri.nickname.slice(0,13) + '..'
                }

                // 获取文字长度
                // this.cvs.measureText('asdasdasdasdasdas').width

                this.cvs.fillText(myFri.nickname, this.computedSizeW(513), this.computedSizeH(795), 237.0595703125);
                this.cvs.fill();

                const avatar = wx.createImage();
                avatar.src = myFri.avatarUrl;
                avatar.onload = () => {
                    this.circleImg(this.cvs, avatar, this.computedSizeW(409), this.computedSizeH(746), this.computedSizeW(42), this.computedSizeW(42));
                    this.cvs.beginPath();
                }
            }
        }

        const rePlay = wx.createImage();
        rePlay.src = 'images/reseur-rePlay.png';
        this.cvs.drawImage(rePlay, 0, 0, rePlay.width, rePlay.height, this.computedSizeW(155), this.computedSizeH(877), this.computedSizeW(440), this.computedSizeH(100));
        // this.cvs.fillStyle = "#fff";
        // this.cvs.font = `bold ${this.computedSizeW(36)}px Arial`;
        // this.cvs.textAlign = "center";
        // this.cvs.fillText('免 费 复 活', this.winWidth / 2, this.computedSizeH(716));

        this.cvs.fillStyle = "#999";
        this.cvs.textAlign = 'center';
        this.cvs.font = `${this.computedSizeW(26)}px Arial`;
        this.cvs.fillText('点击跳过', this.winWidth / 2, this.computedSizeH(1070));
        this.cvs.fillRect(this.computedSizeW(320), this.computedSizeH(1074), this.computedSizeW(110), 2);
    }

}
