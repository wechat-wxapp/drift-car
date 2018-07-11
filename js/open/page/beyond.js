import Init from './init';

/**
 * 超越页函数
 */
export default class Beyond extends Init {
    constructor() {
        super();

        this.reset();
    }

    reset() {
        this.timerKey = 0;
        this.currentScore = 0;
    }

    /**
     * 更新页面内容
     * */
    setTexture({ score }) {
        this.clearCvs(true);

        // const avatar = wx.createImage();
        // avatar.src = 'images/car-pane.png';
        //
        // avatar.onload = () => {
        //     this.cvs.drawImage(avatar, 0, 0, avatar.width, avatar.height, 1, 1, this.computedSizeW(50), this.computedSizeH(50));
        // };

        const { friendRankData } = this.getHWData();

        if (!friendRankData) return false;

        const currentData = friendRankData.find(v => {
            const val = v.KVDataList[0].value;
            return score > Number(val) - 40 && val > this.currentScore;
        });

        if (currentData) {

            this.timerKey += 1;

            if (this.timerKey >= 2) {
                this.currentScore = currentData.KVDataList[0].value;
            }

            if (currentData.avatarObj) {
                this.cvs.drawImage(currentData.avatarObj, 0, 0, currentData.avatarObj.width, currentData.avatarObj.height, 0, 0, this.computedSizeW(70), this.computedSizeH(70));
            } else {
                const avatar = wx.createImage();
                avatar.src = currentData.avatarUrl;
                avatar.onload = () => {
                    this.cvs.drawImage(avatar, 0, 0, avatar.width, avatar.height, 0, 0, this.computedSizeW(70), this.computedSizeH(70));
                };
            }

            this.cvs.fillStyle = "#fff";
            this.cvs.font = 'bold 24px Arial';
            this.cvs.fillText('超越好友', 0, 145);
        } else if (!currentData || this.timerKey >= 2) {
            this.timerKey = 0;
            this.clearCvs(true, true);
        }
    }
}
