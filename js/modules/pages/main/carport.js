import UTIL from "../../util";

/**
 * 车库页函数
 */
export default class Carport extends UTIL {
    constructor() {
        super();

        this.carportPane = imgList.carportPane;
        this.selectedIcon = imgList.selectedIcon;
        this.backIcon = imgList.backIcon;
        this.unlockPane = imgList.unlockPane;
        this.unlockBtn = imgList.unlockBtn;
        this.gift100 = imgList.gift100;
        this.gift200 = imgList.gift200;
        this.unlockGame = imgList.unlockGame;
        this.curve = imgList.curve;
        this.unlockCn = imgList.unlockCn;

        this.buildPage();
    }

    /**
     * 绑定事件, 创建开始页
     * */
    buildPage() {
        // 点击车辆
        this.bindCarBtn();
        // 点击返回
        this.bindCarBackBtn();
        // 点击使用/确认
        this.bindCarUseBtn();
    }

    /**
     * 绑定车辆点击按钮
     * */
    bindCarBtn() {
        const x1 = this.computedSizeW(70);
        const x2 = this.computedSizeW(345);
        const y1 = this.computedSizeH(245);
        const y2 = this.computedSizeH(550);

        events.click({
            name: 'carBtn',
            pageName: 'carportPage',
            point: [x1, y1, x2, y2],
            cb: (e) => {
                const { pageX, pageY } = e.changedTouches[0];

                const x = Math.floor((pageX - this.computedSizeW(70)) / (this.computedSizeW(345) - this.computedSizeW(70)) * 3);
                const y = Math.floor((pageY - this.computedSizeH(245)) / (this.computedSizeH(550) - this.computedSizeH(245)) * 3);

                this.index = x + y * 3;

                if (!this.list[this.index]) {
                    currentPage = 'carportPage';
                    return false;
                }

                this.setContent();
            }
        });
    }

    /**
     * 绑定车辆页面返回按钮
     * */
    bindCarBackBtn() {
        const x1 = this.computedSizeW(45);
        const x2 = this.computedSizeW(70);
        const y1 = this.computedSizeH(635);
        const y2 = this.computedSizeH(660);

        events.click({
            name: 'carBackBtn',
            pageName: 'carportPage',
            point: [x1, y1, x2, y2],
            cb: (e) => {
                startPage.setTexture();
            }
        });
    }

    /**
     * 绑定车辆使用/确认按钮
     * */
    bindCarUseBtn() {
        const x1 = this.computedSizeW(160);
        const x2 = this.computedSizeW(250);
        const y1 = this.computedSizeH(425);
        const y2 = this.computedSizeH(450);

        events.click({
            name: 'carUseBtn',
            pageName: 'carportContentPage',
            point: [x1, y1, x2, y2],
            cb: () => {
                const { carId, modelUrl, modelPic, modelSize, modelRealSize, unlock } = this.list[this.index];

                if (unlock) {
                    const model = {
                        id: carId,
                        model: modelUrl,
                        material: modelPic,
                        modelSize: modelSize,
                        cannonSize: modelRealSize
                    };

                    carClass.createCar(model);

                    this.setTexture();
                } else {
                    this.setTexture();
                }
            }
        });
    }

    /**
     * 更新页面内容
     * */
    setTexture() {
        currentPage = 'carportPage';

        offCanvas2d.clearRect(0, 0, winWidth, winHeight);

        offCanvas2d.fillStyle = 'rgba(0, 0, 0, .8)';
        offCanvas2d.fillRect(0, 0, winWidth, winHeight);

        offCanvas2d.drawImage(this.carportPane, 0, 0, this.carportPane.width, this.carportPane.height, winWidth / 2 - this.computedSizeW(326.784) / 2, this.computedSizeH(139), this.computedSizeW(327), this.computedSizeH(460));

        // 车辆列表
        this.list.map((v, k) => {
            const { unlock, imgUrl } = v;

            const carPane = wx.createImage();
            carPane.src = imgUrl;

            carPane.onload = () => {
                let pkey = Math.ceil((k + 1) / 3) - 1;

                const x = k - pkey * 3;

                offCanvas2d.drawImage(carPane, 0, 0, carPane.width, carPane.height, this.computedSizeW(73 + x * 97), this.computedSizeH(245 + pkey * 107), this.computedSizeW(77), this.computedSizeH(90));

                // 缓存已经加载完的图片
                this.list[k].imgUrlObj = carPane;

                // 如果已解锁
                unlock && offCanvas2d.drawImage(this.selectedIcon, 0, 0, this.selectedIcon.width, this.selectedIcon.height, this.computedSizeW(140 + x * 97), this.computedSizeH(240 + pkey * 107), this.selectedIcon.width / 2, this.selectedIcon.height / 2);
            }
        });

        // 返回按钮
        offCanvas2d.drawImage(this.backIcon, 0, 0, this.backIcon.width, this.backIcon.height, this.computedSizeW(46), this.computedSizeH(634), this.backIcon.width / 2, this.backIcon.height / 2);

        texture2d.needsUpdate = true;
    }

    setContent() {
        currentPage = 'carportContentPage';

        const { unlock, imgUrlObj, unlockNum } = this.list[this.index];

        // 解锁背景
        offCanvas2d.drawImage(this.unlockPane, 0, 0, this.unlockPane.width, this.unlockPane.height, this.computedSizeW(44), this.computedSizeH(263), this.computedSizeW(327), this.computedSizeH(223));

        offCanvas2d.drawImage(this.unlockBtn, 0, 0, this.unlockBtn.width, this.unlockBtn.height, this.computedSizeW(160), this.computedSizeH(422), this.computedSizeW(95), this.computedSizeH(35));

        offCanvas2d.textAlign = 'left';

        // 背景
        offCanvas2d.drawImage(imgUrlObj, 0, 0, imgUrlObj.width, imgUrlObj.height, this.computedSizeW(87), this.computedSizeH(298), this.computedSizeW(77), this.computedSizeH(90));

        // 解锁条件文字
        offCanvas2d.fillStyle = "#e9b320";
        offCanvas2d.font = `bold ${this.computedSizeW(14)}px Arial`;
        offCanvas2d.fillText('解锁条件：', this.computedSizeW(177), this.computedSizeH(314));

        // 按钮
        offCanvas2d.fillStyle = '#fff';
        offCanvas2d.font = `bold ${this.computedSizeW(16)}px Arial`;
        const btnText = unlock ? '使 用' : '好 的';
        offCanvas2d.fillText(btnText, this.computedSizeW(190), this.computedSizeH(444));

        // 解锁选项
        switch(unlockNum) {
            case 0:
                offCanvas2d.font = `${this.computedSizeW(14)}px Arial`;
                offCanvas2d.fillText('登录就送!', this.computedSizeW(180), this.computedSizeH(337));
                break;
            case 1:
                offCanvas2d.font = `${this.computedSizeW(14)}px Arial`;
                offCanvas2d.fillText('点击首页公众号按钮，按', this.computedSizeW(180), this.computedSizeH(337));

                offCanvas2d.font = `${this.computedSizeW(14)}px Arial`;
                offCanvas2d.fillText('提示操作进行关注有车以', this.computedSizeW(180), this.computedSizeH(356));

                offCanvas2d.font = `${this.computedSizeW(14)}px Arial`;
                offCanvas2d.fillText('后公众号。', this.computedSizeW(180), this.computedSizeH(376));
                break;
            case 2:
                this.createSimpleText('一场游戏达到一百分。', this.gift100);
                break;
            case 3:
                this.createSimpleText('一场游戏达到二百分。', this.gift200);
                break;
            case 4:
                this.createSimpleText('累计十五天参加游戏。', this.unlockGame);
                break;
            case 5:
                this.createSimpleText('一场游戏中转弯达到100次。', this.curve);
                break;
        }

        // 已解锁
        if (unlock) {
            offCanvas2d.drawImage(this.unlockCn, 0, 0, this.unlockCn.width, this.unlockCn.height, this.computedSizeW(125), this.computedSizeH(286), this.computedSizeW(44), this.computedSizeH(24));
        }

        texture2d.needsUpdate = true;
    }

    /**
     * 创建通用文案
     * */
    createSimpleText(text, img) {
        offCanvas2d.fillStyle = '#fff';
        offCanvas2d.font = `${this.computedSizeW(14)}px Arial`;
        offCanvas2d.fillText(text, this.computedSizeW(180), this.computedSizeH(337));

        offCanvas2d.drawImage(img, 0, 0, img.width, img.height, this.computedSizeW(179), this.computedSizeH(343), this.computedSizeW(131), this.computedSizeH(30));
    }
}
