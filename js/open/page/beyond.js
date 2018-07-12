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

        // this.cvs.fillStyle = "#fff";
        //     this.cvs.textAlign = 'left';
        //     this.cvs.font = `bold ${this.computedSizeW(18)}px Arial`;
        //     this.cvs.fillText('超越好友', 0, this.computedSizeH(20));
        //
        // const avatar = wx.createImage();
        // avatar.src = 'images/car-pane.png';
        //
        // avatar.onload = () => {
        //     this.cvs.drawImage(avatar, 0, 0, avatar.width, avatar.height, 0, this.computedSizeH(25), this.computedSizeW(70), this.computedSizeH(70));
        // };

        const { list } = this.getHWData('friendRank');

        if (!list) return false;

        const currentData = list.find(v => {
            const val = v.KVDataList[0].value;
            return score > Number(val) && val > this.currentScore;
        });

        if (currentData) {

            this.timerKey += 1;

            if (this.timerKey >= 2) {
                this.currentScore = currentData.KVDataList[0].value;
            }

            this.cvs.fillStyle = "#fff";
            this.cvs.textAlign = 'left';
            this.cvs.font = `bold ${this.computedSizeW(18)}px Arial`;
            this.cvs.fillText('超越好友', 0, this.computedSizeH(18));

            if (currentData.avatarObj) {
                this.cvs.drawImage(currentData.avatarObj, 0, 0, currentData.avatarObj.width, currentData.avatarObj.height, 0, this.computedSizeH(23), this.computedSizeW(70), this.computedSizeH(70));
            } else {
                const avatar = wx.createImage();
                avatar.src = currentData.avatarUrl;
                avatar.onload = () => {
                    this.cvs.drawImage(avatar, 0, 0, avatar.width, avatar.height, 0, this.computedSizeH(23), this.computedSizeW(70), this.computedSizeH(70));
                };
            }
        } else if (!currentData || this.timerKey >= 2) {
            this.timerKey = 0;
            this.clearCvs(true, true);
        }
    }
}
