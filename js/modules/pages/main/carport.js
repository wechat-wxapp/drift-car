import UTIL from "../../util";

/**
 * 车库页函数
 */
export default class Carport extends UTIL {
    constructor() {
        super();

        this.carPane = imgList.carPane;
        this.carPaneOn = imgList.carPaneOn;
        this.carPaneOff = imgList.carPaneOff;
        this.carNew = imgList.carNew;
        this.carHeader = imgList.carHeader;
        this.backBtn = imgList.backBtn;
        this.unlockPane = imgList.unlockPane;
        this.unlockBtn = imgList.unlockBtn;
        this.gift100 = imgList.gift100;
        this.gift200 = imgList.gift200;
        this.unlockGame = imgList.unlockGame;
        this.curve = imgList.curve;
        this.unlockCn = imgList.unlockCn;
        this.closeBtn = imgList.closeBtn;

        this.prePageN = imgList.prePageN;
        this.prePageDis = imgList.prePageDis;
        this.nextPageN = imgList.nextPageN;
        this.nextPageDis = imgList.nextPageDis;

        this.headerOffsetTop = this.computedSizeH(133.032);
        this.bgOffsetTop = this.headerOffsetTop + this.computedSizeW(115.368);

        this.loadNum = 0;
        
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
        // 车库详情页面关闭按钮
        this.bindCarContentCloseBtn();
        // 上一页
        this.bindCarPrePage();
        // 下一页
        this.bindCarNextPage();
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

                this.list[this.index].isNew = false;

                this.setContent();
            }
        });
    }

    /**
     * 绑定车辆详细页面上一页按钮
     * */
    bindCarPrePage() {
        const x1 = this.computedSizeW(107);
        const x2 = this.computedSizeW(203);
        const y1 = this.bgOffsetTop + this.computedSizeH(254.731);
        const y2 = this.bgOffsetTop + this.computedSizeH(289.731);

        events.click({
            name: 'carPrePageBtn',
            pageName: 'carportPage',
            point: [x1, y1, x2, y2],
            cb: () => {
                if (this.page <= 1) return false;

                const offset = (this.page - 2) * this.limit;

                this.getList({ offset })
                .then(e => {
                    carportPage.setTexture();
                });
            }
        });
    }

    /**
     * 绑定车辆详细页面下一页按钮
     * */
    bindCarNextPage() {
        const x1 = this.computedSizeW(217);
        const x2 = this.computedSizeW(315);
        const y1 = this.bgOffsetTop + this.computedSizeH(252.731);
        const y2 = this.bgOffsetTop + this.computedSizeH(289.731);

        events.click({
            name: 'carNextPageBtn',
            pageName: 'carportPage',
            point: [x1, y1, x2, y2],
            cb: () => {
                if (!this.hasNext) return false;

                const offset = this.page * this.limit;

                this.getList({ offset })
                    .then(e => {
                        carportPage.setTexture();
                    });
            }
        });
    }

    /**
     * 绑定车辆页面返回按钮
     * */
    bindCarBackBtn() {
        const x1 = this.computedSizeW(37);
        const x2 = this.computedSizeW(137);
        const y1 = this.computedSizeH(574);
        const y2 = this.computedSizeH(621);

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
                $loader.show('正在加载车辆...');

                const { carId, modelUrl, modelPic, modelSize, modelRealSize, unlock, speed, speedMax, speedStep, levelSpeed, speedStepMax } = this.list[this.index];

                if (unlock) {
                    const model = {
                        id: carId,
                        model: modelUrl,
                        material: modelPic,
                        modelSize: modelSize,
                        physicalSize: modelRealSize,
                        speed,
                        speedMax,
                        speedStep,
                        levelSpeed,
                        speedStepMax
                    };

                    $cache.setGameData('car', model);

                    carClass.createCar()
                        .then(() => {
                            $loader.hide();

                            this.setTexture();
                        });

                    return false;
                }

                this.setTexture();
            }
        });
    }

    /**
     * 绑定车辆详细页面关闭按钮
     * */
    bindCarContentCloseBtn() {
        const x1 = this.computedSizeW(324);
        const x2 = this.computedSizeW(363);
        const y1 = this.computedSizeH(264);
        const y2 = this.computedSizeH(305);

        events.click({
            name: 'carContentBackBtn',
            pageName: 'carportContentPage',
            point: [x1, y1, x2, y2],
            cb: () => {
                this.setTexture();
            }
        });
    }

    /**
     * 获取车库列表
     * */
    getList(params = {}) {
        $loader.show();

        const require = Object.assign({}, { offset:  0, limit: 6 }, params);

        return $io.getunlock(require).then(e => {
            const { payload: { hasNext, limit, offset, page, data } } = e;

            carportPage.list = data;
            carportPage.hasNext = hasNext;
            carportPage.limit = limit;
            carportPage.offset = offset;
            carportPage.page = page;


            return e;
        });
    }

    /**
     * 更新页面内容
     * */
    setTexture() {
        currentPage = 'carportPage';

        this.loadNum = 0;

        const currentCarId = $cache.getGameData('car').id;

        offCanvas2d.clearRect(0, 0, winWidth, winHeight);

        offCanvas2d.fillStyle = 'rgba(0, 0, 0, .8)';
        offCanvas2d.fillRect(0, 0, winWidth, winHeight);

        // 白色背景
        offCanvas2d.fillStyle = '#fff';
        offCanvas2d.fillRect(this.computedSizeW(41.4), this.bgOffsetTop, this.computedSizeW(331.2), this.computedSizeH(310));

        // 头部
        offCanvas2d.drawImage(this.carHeader, 0, 0, this.carHeader.width, this.carHeader.height, this.computedSizeW(41.4), this.headerOffsetTop, this.computedSizeW(331.2), this.computedSizeW(115.368));

        // 车辆列表
        this.list.map((v, k) => {
            const { isNew, carId, unlock, imgUrl } = v;

            const carPane = wx.createImage();
            carPane.src = imgUrl;

            carPane.onload = () => {
                let pkey = Math.ceil((k + 1) / 3) - 1;

                const x = k - pkey * 3;

                // 是否已选择
                if (carId === currentCarId) {
                    offCanvas2d.drawImage(this.carPaneOn, 0, 0, this.carPaneOn.width, this.carPaneOn.height, this.computedSizeW(54 + x * 105), this.bgOffsetTop + this.computedSizeH(11.731 + pkey * 120), this.computedSizeW(97.152), this.computedSizeH(118.68));
                }

                // 汽车
                offCanvas2d.drawImage(carPane, 0, 0, carPane.width, carPane.height, this.computedSizeW(55 + x * 105), this.bgOffsetTop + this.computedSizeH(15.731 + pkey * 120), this.computedSizeW(97.152), this.computedSizeH(118.68));

                // 缓存已经加载完的图片
                this.list[k].imgUrlObj = carPane;

                if (isNew) {
                    offCanvas2d.drawImage(this.carNew, 0, 0, this.carNew.width, this.carNew.height, this.computedSizeW(130 + x * 97), this.bgOffsetTop + this.computedSizeH(18.731 + pkey * 107), this.carNew.width / 2, this.carNew.height / 2);
                } else {
                    // 如果已解锁
                    !unlock && offCanvas2d.drawImage(this.carPaneOff, 0, 0, this.carPaneOff.width, this.carPaneOff.height, this.computedSizeW(54 + x * 105), this.bgOffsetTop + this.computedSizeH(11.731 + pkey * 120), this.computedSizeW(97.152), this.computedSizeH(118.68));
                }

                this.loadNum++;

                // 加载成功后, 清除loading
                if (this.loadNum === this.list.length) {
                    $loader.hide();
                }

                texture2d.needsUpdate = true;
            }
        });

        // 分页按钮
        if (this.page !== 1) {
            offCanvas2d.drawImage(this.prePageDis, 0, 0, this.prePageDis.width, this.prePageDis.height, this.computedSizeW(110), this.bgOffsetTop + this.computedSizeH(258.731), this.computedSizeW(89.424), this.computedSizeW(34.776));
        } else {
            offCanvas2d.drawImage(this.prePageN, 0, 0, this.prePageN.width, this.prePageN.height, this.computedSizeW(110), this.bgOffsetTop + this.computedSizeH(258.731), this.computedSizeW(89.424), this.computedSizeW(34.776));
        }

        if (this.hasNext) {
            offCanvas2d.drawImage(this.nextPageDis, 0, 0, this.nextPageDis.width, this.nextPageDis.height, this.computedSizeW(220), this.bgOffsetTop + this.computedSizeH(258.731), this.computedSizeW(89.424), this.computedSizeW(34.776));
        } else {
            offCanvas2d.drawImage(this.nextPageN, 0, 0, this.nextPageN.width, this.nextPageN.height, this.computedSizeW(220), this.bgOffsetTop + this.computedSizeH(258.731), this.computedSizeW(89.424), this.computedSizeW(34.776));
        }

        // 返回按钮
        offCanvas2d.drawImage(this.backBtn, 0, 0, this.backBtn.width, this.backBtn.height, this.computedSizeW(41.4), this.computedSizeH(580), this.computedSizeW(89.424), this.computedSizeW(34.776));

        texture2d.needsUpdate = true;
    }

    setContent() {
        currentPage = 'carportContentPage';

        const { unlock, imgUrlObj, unlockNum } = this.list[this.index];

        // 解锁背景
        offCanvas2d.drawImage(this.unlockPane, 0, 0, this.unlockPane.width, this.unlockPane.height, this.computedSizeW(44), this.computedSizeH(263), this.computedSizeW(327), this.computedSizeH(223));

        offCanvas2d.drawImage(this.unlockBtn, 0, 0, this.unlockBtn.width, this.unlockBtn.height, this.computedSizeW(160), this.computedSizeH(422), this.computedSizeW(95), this.computedSizeH(35));

        offCanvas2d.textAlign = 'left';

        // 汽车背景
        offCanvas2d.drawImage(this.carPane, 0, 0, this.carPane.width, this.carPane.height, this.computedSizeW(87), this.computedSizeH(298), this.computedSizeW(80), this.computedSizeH(93));

        // 汽车
        offCanvas2d.drawImage(imgUrlObj, 0, 0, imgUrlObj.width, imgUrlObj.height, this.computedSizeW(90), this.computedSizeH(301), this.computedSizeW(75), this.computedSizeH(88));

        // 解锁条件文字
        offCanvas2d.fillStyle = "#e9b320";
        offCanvas2d.font = `bold ${this.computedSizeW(14)}px Arial`;
        offCanvas2d.fillText('解锁条件：', this.computedSizeW(177), this.computedSizeH(314));

        // 按钮
        offCanvas2d.fillStyle = '#fff';
        offCanvas2d.font = `bold ${this.computedSizeW(16)}px Arial`;
        const btnText = unlock ? '使 用' : '好 的';
        offCanvas2d.fillText(btnText, this.computedSizeW(190), this.computedSizeH(444));

        // 关闭按钮
        offCanvas2d.drawImage(this.closeBtn, 0, 0, this.closeBtn.width, this.closeBtn.height, this.computedSizeW(330), this.computedSizeH(275), this.computedSizeW(this.closeBtn.width / 2), this.computedSizeH(this.closeBtn.height / 2));

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
