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

        if (this.selfData) this.updateWxScore(data.score);

        this.cvs.fillStyle = "#fff";
        this.cvs.font = `bold ${this.computedSizeW(26)}px Arial`;
        this.cvs.textAlign = "center";
        this.cvs.fillText('本次得分', this.winWidth / 2, this.computedSizeH(216));

        this.cvs.font = `bold ${this.computedSizeW(102)}px Arial`;
        this.cvs.fillText(data.score, this.winWidth / 2, this.computedSizeH(332));
    
        // 世界排行
        this.cvs.fillStyle = this.themeBule;
        this.cvs.fillRect(this.winWidth / 2 - this.computedSizeW(582) / 2, this.computedSizeH(496), this.computedSizeW(582), this.computedSizeH(76));

        this.cvs.fillStyle = "#fff";
        this.cvs.textAlign = "left";
        this.cvs.font = `bold ${this.computedSizeW(22)}px Arial`;
        this.cvs.fillText('好友排行', this.computedSizeW(136), this.computedSizeH(544));

        // this.cvs.textAlign = "center";
        // this.cvs.font = `bold ${this.computedSizeW(22)}px Arial`;
        // this.cvs.fillText('45456', this.winWidth / 2, this.computedSizeH(544));



        // // 好友排行
        this.cvs.fillStyle = "#fff";
        this.cvs.fillRect(this.winWidth / 2 - this.computedSizeW(582) / 2, this.computedSizeH(616), this.computedSizeW(582), this.computedSizeH(298));

        this.cvs.fillStyle = "#e7e7e7";
        this.cvs.fillRect(this.winWidth / 2 - this.computedSizeW(582) / 2, this.computedSizeH(914), this.computedSizeW(582), this.computedSizeH(72));
        
        this.cvs.fillStyle = "#808080";
        this.cvs.font = `${this.computedSizeW(20)}px Arial`;
        this.cvs.textAlign = "left";
        this.cvs.fillText('排行榜：每周一凌晨更新', this.computedSizeW(130), this.computedSizeH(960));
        
        this.cvs.fillStyle = "#5079eb";
        this.cvs.textAlign = "left";
        this.cvs.fillText('查看全部排行 >', this.computedSizeW(480), this.computedSizeH(960));

        const btn = wx.createImage();
        btn.src = 'images/btn.png';
        this.cvs.drawImage(btn, 0, 0, btn.width, btn.height, this.computedSizeW(120), this.computedSizeH(1044), this.computedSizeW(218), this.computedSizeH(78));
        this.cvs.drawImage(btn, 0, 0, btn.width, btn.height, this.computedSizeW(415), this.computedSizeH(1044), this.computedSizeW(218), this.computedSizeH(78));

        this.cvs.fillStyle = "#fff";
        this.cvs.font = `bold ${this.computedSizeW(32)}px Arial`;
        this.cvs.fillText('炫耀一下', this.computedSizeW(164), this.computedSizeH(1087));
        this.cvs.fillText('再玩一局', this.computedSizeW(460), this.computedSizeH(1087));

        this.cvs.font = `${this.computedSizeW(26)}px Arial`;
        this.cvs.textAlign = "center";
        this.cvs.fillText('返回首页', this.winWidth / 2, this.computedSizeH(1215));
        // this.cvs.fillRect(this.computedSizeW(312), this.computedSizeH(1234), this.computedSizeW(116), 2);
        this.cvs.fillRect(this.computedSizeW(316), this.computedSizeH(1234), this.computedSizeW(116), 2);


        this.drawRoundRect(this.cvs, this.winWidth / 2 - this.computedSizeW(160) / 2, this.computedSizeH(182), this.computedSizeW(160), this.computedSizeH(50), this.computedSizeW(25) ,'rgba(255,255,255,0.3)');
        
        if (this.rankData !== null ) {
            const rank = this.selfData.rank
            let {myPowerfulFri,myWeakFri} = {}
            if (rank !== 1) {
                myPowerfulFri = this.rankData[rank - 2]
            }
            if (rank !== this.selfData.length) {
                myWeakFri = this.rankData[rank]
            }
            this.cvs.fillStyle = "#fff";
            this.cvs.textAlign = "center";
            this.cvs.font = `bold ${this.computedSizeW(26)}px Arial`;
            this.cvs.fillText(`历史最高得分：${ this.selfData['KVDataList'][0].value }`, this.winWidth / 2, this.computedSizeH(425));

            this.cvs.font = `bold ${this.computedSizeW(22)}px Arial`;
            this.cvs.fillStyle = "#fdd724";
            this.cvs.textAlign = "left";
            this.cvs.fillText(this.selfData.rank, this.computedSizeW(572), this.computedSizeH(544));

            // 多种排名可能情况
            if (myPowerfulFri && myWeakFri) {
                //名次
                this.cvs.font = `${this.computedSizeW(18)}px Arial`;
                this.cvs.fillStyle = "#a8a8a8";
                this.cvs.textAlign = "center";
                this.cvs.fillText(rank - 1, this.computedSizeW(178), this.computedSizeH(678));
                this.cvs.fillText(rank + 1, this.computedSizeW(572), this.computedSizeH(678));
                this.cvs.fillStyle = this.themeBule;
                this.cvs.fillText(rank, this.computedSizeW(374), this.computedSizeH(678));

                //分割线
                this.cvs.beginPath();
                this.cvs.strokeStyle = '#ededed';
                this.cvs.moveTo(this.computedSizeW(280), this.computedSizeH(666));
                this.cvs.lineTo(this.computedSizeW(280), this.computedSizeH(856));
                this.cvs.moveTo(this.computedSizeW(470), this.computedSizeH(666));
                this.cvs.lineTo(this.computedSizeW(470), this.computedSizeH(856));
                this.cvs.stroke();
                this.cvs.closePath();

                //头像
                const avatar = wx.createImage();
                avatar.src = myPowerfulFri.avatarUrl
                avatar.onload = () => {
                    this.circleImg(this.cvs, avatar,  this.computedSizeW(136), this.computedSizeH(722), this.computedSizeW(42), this.computedSizeW(42))
                }
                const avatar1 = wx.createImage();
                avatar1.src = this.selfData.avatarUrl
                avatar1.onload = () => {
                    this.circleImg(this.cvs, avatar1,  this.computedSizeW(332), this.computedSizeH(722), this.computedSizeW(42), this.computedSizeW(42))
                }
                const avatar2 = wx.createImage();
                avatar2.src = myWeakFri.avatarUrl
                avatar2.onload = () => {
                    this.circleImg(this.cvs, avatar2,  this.computedSizeW(530), this.computedSizeH(722), this.computedSizeW(42), this.computedSizeW(42))
                }
                this.cvs.font = `${this.computedSizeW(20)}px Arial`;
                this.cvs.fillStyle = "#666";
                this.cvs.textAlign = "center";
                this.cvs.fillText(myPowerfulFri.nickname, this.computedSizeW(178), this.computedSizeH(840));
                this.cvs.fillText(this.selfData.nickname, this.computedSizeW(374), this.computedSizeH(840));
                this.cvs.fillText(myWeakFri.nickname, this.computedSizeW(572), this.computedSizeH(840));
                
                this.cvs.font = `bold ${this.computedSizeW(24)}px Arial`;
                this.cvs.fillStyle = "#000";
                this.cvs.fillText(myPowerfulFri['KVDataList'][0].value, this.computedSizeW(178), this.computedSizeH(875));
                this.cvs.fillText(this.selfData['KVDataList'][0].value, this.computedSizeW(374), this.computedSizeH(875));
                this.cvs.fillText(myWeakFri['KVDataList'][0].value, this.computedSizeW(572), this.computedSizeH(875));
            }
            else if(myPowerfulFri || myWeakFri) {
                
                const power = myPowerfulFri !== undefined
                myWeakFri = power ? this.selfData: myWeakFri
                myPowerfulFri = power ? myPowerfulFri: this.selfData
                if (power) {
                    myPowerfulFri.rank = rank - 1 
                }
                else {
                    myWeakFri.rank = rank + 1
                }
                //名次
                this.cvs.font = `${this.computedSizeW(18)}px Arial`;
                this.cvs.textAlign = "center";
                if (!power) {
                    this.cvs.fillStyle = this.themeBule;
                    this.cvs.fillText(myPowerfulFri.rank, this.winWidth / 4  + this.computedSizeW(42), this.computedSizeH(678));
                    this.cvs.fillStyle = "#a8a8a8";
                    this.cvs.fillText(myWeakFri.rank, this.winWidth / 4 * 3  - this.computedSizeW(42), this.computedSizeH(678));
                }
                else {
                    this.cvs.fillStyle = "#a8a8a8";
                    this.cvs.fillText(myPowerfulFri.rank, this.winWidth / 4  + this.computedSizeW(42), this.computedSizeH(678));
                    this.cvs.fillStyle = this.themeBule;
                    this.cvs.fillText(myWeakFri.rank, this.winWidth / 4 * 3  - this.computedSizeW(42), this.computedSizeH(678));
                }


                //分割线
                this.cvs.beginPath();
                this.cvs.strokeStyle = '#ededed';
                this.cvs.moveTo(this.winWidth/2, this.computedSizeH(666));
                this.cvs.lineTo(this.winWidth/2, this.computedSizeH(856));
                this.cvs.stroke();
                this.cvs.closePath();

                //头像
                const avatar = wx.createImage();
                avatar.src = myWeakFri.avatarUrl
                avatar.onload = () => {
                    this.circleImg(this.cvs, avatar,  this.winWidth / 4 * 3 - this.computedSizeW(84), this.computedSizeH(722), this.computedSizeW(42), this.computedSizeW(42))
                }
                const avatar1 = wx.createImage();
                avatar1.src = myPowerfulFri.avatarUrl
                avatar1.onload = () => {
                    this.circleImg(this.cvs, avatar1, this.winWidth / 4, this.computedSizeH(722), this.computedSizeW(42), this.computedSizeW(42))
                }

                this.cvs.font = `${this.computedSizeW(20)}px Arial`;
                this.cvs.fillStyle = "#666";
                this.cvs.textAlign = "center";
                this.cvs.fillText(myPowerfulFri.nickname, this.winWidth / 4  + this.computedSizeW(42), this.computedSizeH(840));
                this.cvs.fillText(myWeakFri.nickname, this.winWidth / 4 * 3  - this.computedSizeW(42), this.computedSizeH(840));
                
                this.cvs.font = `bold ${this.computedSizeW(24)}px Arial`;
                this.cvs.fillStyle = "#000";
                this.cvs.fillText(myPowerfulFri['KVDataList'][0].value, this.winWidth / 4  + this.computedSizeW(42), this.computedSizeH(875));
                this.cvs.fillText(myWeakFri['KVDataList'][0].value, this.winWidth / 4 * 3  - this.computedSizeW(42), this.computedSizeH(875));
            }
            else {
                //名次
                this.cvs.font = `${this.computedSizeW(18)}px Arial`;
                this.cvs.fillStyle = this.themeBule;
                this.cvs.textAlign = "center";
                this.cvs.fillText(rank, this.winWidth / 2, this.computedSizeH(678));
                //头像
                const avatar = wx.createImage();
                avatar.src = this.selfData.avatarUrl
                avatar.onload = () => {
                    this.circleImg(this.cvs, avatar,  this.computedSizeW(332), this.computedSizeH(722), this.computedSizeW(42), this.computedSizeW(42))
                }
                this.cvs.font = `${this.computedSizeW(20)}px Arial`;
                this.cvs.fillStyle = "#666";
                this.cvs.textAlign = "center";
                this.cvs.fillText(this.selfData.nickname, this.computedSizeW(374), this.computedSizeH(840));
                
                this.cvs.font = `bold ${this.computedSizeW(24)}px Arial`;
                this.cvs.fillStyle = "#000";
                this.cvs.fillText(this.selfData['KVDataList'][0].value, this.computedSizeW(374), this.computedSizeH(875));
            }
        }
    

    }
}
