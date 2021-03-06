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
        this.currentScore = 0;
    }

    /**
     * 更新页面内容
     * */
    setTexture({ score }) {
        this.clearCvs(true);

        // this.cvs.fillStyle = "#fff";
        //     this.cvs.textAlign = 'left';
        //     this.cvs.font = `bold ${this.computedSizeW(20)}px Arial`;
        //     this.cvs.fillText('超越好友', 0, this.computedSizeH(18));
        //
        // const avatar = wx.createImage();
        // avatar.src = 'images/car-pane.png';
        //
        // this.cvs.drawImage(avatar, 0, 0, avatar.width, avatar.height, 0, this.computedSizeH(25), this.computedSizeW(80), this.computedSizeW(80));

        const { list, self } = this.getHWData('friendRank');

        if (!list) return false;

        const currentData = list.find(v => {
            const val = Number(v.KVDataList[0].value);
            return score > val && val > Number(this.currentScore) && self.openid !== v.openid;
        });

        if (currentData) {

            this.currentScore = currentData.KVDataList[0].value;

            this.cvs.fillStyle = "#fff";
            this.cvs.textAlign = 'left';
            this.cvs.font = `bold ${this.computedSizeW(18)}px Arial`;
            this.cvs.fillText('超越好友', 0, this.computedSizeH(18));

            if (currentData.avatarObj) {
                this.cvs.drawImage(currentData.avatarObj, 0, 0, currentData.avatarObj.width, currentData.avatarObj.height, 0, this.computedSizeH(23), this.computedSizeW(70), this.computedSizeW(70));
            } else {
                const avatar = wx.createImage();
                avatar.src = currentData.avatarUrl;
                avatar.onload = () => {
                    this.cvs.drawImage(avatar, 0, 0, avatar.width, avatar.height, 0, this.computedSizeH(23), this.computedSizeW(70), this.computedSizeH(70));
                };
            }
        } else if (!currentData) {
            this.clearCvs(true, true);
        }
    }
}
