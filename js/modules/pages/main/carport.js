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
        this.closeBtn = imgList.closeBtn;
        this.carOk = imgList.carOk;
        this.carUse = imgList.carUse;
        this.carProgressBg = imgList.carProgressBg;

        this.prePageN = imgList.prePageN;
        this.prePageDis = imgList.prePageDis;
        this.nextPageN = imgList.nextPageN;
        this.nextPageDis = imgList.nextPageDis;

        this.headerOffsetTop = this.computedSizeH(133.032);
        this.bgOffsetTop = this.headerOffsetTop + this.computedSizeW(115.368);

        this.contentBgOffsetTop = this.bgOffsetTop - this.computedSizeW(30);

        // 按钮相对于背景位置
        this.btnOffsetTop = this.contentBgOffsetTop + this.computedSizeW(310 - this.unlockBtn.height / 2);

        // 图片加载进度
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
        // 车库详情页面返回按钮
        this.bindCarContentBackBtn();
        // 上一页
        this.bindCarPrePage();
        // 下一页
        this.bindCarNextPage();
    }

    /**
     * 绑定车辆点击按钮
     * */
    bindCarBtn() {
        const x1 = this.computedSizeW(41.4);
        const x2 = this.computedSizeW(372.6);
        const y1 = this.bgOffsetTop;
        const y2 = this.bgOffsetTop + this.computedSizeW(258.731);

        events.click({
            name: 'carBtn',
            pageName: 'carportPage',
            point: [x1, y1, x2, y2],
            cb: (e) => {
                const { pageX, pageY } = e.changedTouches[0];

                const x = Math.floor((pageX - x1) / (x2 - x1) * 3);
                const y = Math.floor((pageY - y1) / (y2 - y1) * 2);

                this.index = x + y * 3;

                if (!this.list[this.index]) {
                    currentPage = 'carportPage';
                    return false;
                }

                const { isNew, unlockNum } = this.list[this.index];

                // 如果可以解锁
                if (isNew) {
                    $loader.showToast('恭喜解锁');
                    $io.takeCar({ unlockNum });
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
        const y1 = this.bgOffsetTop + this.computedSizeW(250);
        const y2 = this.bgOffsetTop + this.computedSizeW(280);

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
        const y1 = this.bgOffsetTop + this.computedSizeW(250);
        const y2 = this.bgOffsetTop + this.computedSizeW(280);

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
        const y1 = this.bgOffsetTop + this.computedSizeW(320);
        const y2 = this.bgOffsetTop + this.computedSizeW(350);

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
        const y1 = this.btnOffsetTop - this.computedSizeW(5);
        const y2 = this.btnOffsetTop + this.computedSizeW(this.unlockBtn.height / 2);

        events.click({
            name: 'carUseBtn',
            pageName: 'carportContentPage',
            point: [x1, y1, x2, y2],
            cb: () => {
                const { carId, modelUrl, modelPic, modelSize, modelRealSize, unlock, speed, speedMax, speedStep, levelSpeed, speedStepMax } = this.list[this.index];
                $loader.hideToast();

                if (unlock) {
                    $loader.show('正在加载车辆...');

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
        const y1 = this.contentBgOffsetTop + this.computedSizeW(5);
        const y2 = this.contentBgOffsetTop + this.computedSizeW(40);

        events.click({
            name: 'carContentCloseBtn',
            pageName: 'carportContentPage',
            point: [x1, y1, x2, y2],
            cb: () => {
                $loader.hideToast();
                this.setTexture();
            }
        });
    }

    /**
     * 绑定车辆详情页面返回按钮
     * */
    bindCarContentBackBtn() {
        const x1 = this.computedSizeW(37);
        const x2 = this.computedSizeW(137);
        const y1 = this.bgOffsetTop + this.computedSizeW(320);
        const y2 = this.bgOffsetTop + this.computedSizeW(350);

        events.click({
            name: 'carContentBackBtn',
            pageName: 'carportContentPage',
            point: [x1, y1, x2, y2],
            cb: (e) => {
                startPage.setTexture();
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
            const { payload: { hasNext, limit, offset, page, data, high } } = e;

            this.list = data;
            this.hasNext = hasNext;
            this.limit = limit;
            this.offset = offset;
            this.page = page;
            this.high = high;

            return e;
        });
    }

    /**
     * 更新页面内容
     * */
    setTexture() {
        currentPage = 'carportPage';

        // 重置加载进度
        this.loadNum = 0;

        const currentCarId = $cache.getGameData('car').id;

        offCanvas2d.clearRect(0, 0, winWidth, winHeight);

        offCanvas2d.fillStyle = 'rgba(0, 0, 0, .8)';
        offCanvas2d.fillRect(0, 0, winWidth, winHeight);

        // 白色背景
        offCanvas2d.fillStyle = '#fff';
        offCanvas2d.fillRect(this.computedSizeW(41.4), this.bgOffsetTop, this.computedSizeW(331.2), this.computedSizeW(310));

        // 头部
        offCanvas2d.drawImage(this.carHeader, 0, 0, this.carHeader.width, this.carHeader.height, this.computedSizeW(41.4), this.headerOffsetTop, this.computedSizeW(331.2), this.computedSizeW(this.carHeader.height / 2));

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
                    offCanvas2d.drawImage(this.carPaneOn, 0, 0, this.carPaneOn.width, this.carPaneOn.height, this.computedSizeW(54 + x * 105), this.bgOffsetTop + this.computedSizeH(11.731) + this.computedSizeW(pkey * 110), this.computedSizeW(97.152), this.computedSizeW(118.68));
                }

                // 汽车
                offCanvas2d.drawImage(carPane, 0, 0, carPane.width, carPane.height, this.computedSizeW(55 + x * 105), this.bgOffsetTop + this.computedSizeH(15.731) + this.computedSizeW(pkey * 110), this.computedSizeW(97.152), this.computedSizeW(118.68));

                // 缓存已经加载完的图片
                this.list[k].imgUrlObj = carPane;

                if (isNew) {
                    offCanvas2d.drawImage(this.carNew, 0, 0, this.carNew.width, this.carNew.height, this.computedSizeW(130 + x * 100), this.bgOffsetTop + this.computedSizeH(18.731) + this.computedSizeW(pkey * 110), this.carNew.width / 2, this.carNew.height / 2);
                } else {
                    // 如果未解锁
                    !unlock && offCanvas2d.drawImage(this.carPaneOff, 0, 0, this.carPaneOff.width, this.carPaneOff.height, this.computedSizeW(54 + x * 105), this.bgOffsetTop + this.computedSizeH(11.731) + this.computedSizeW(pkey * 110), this.computedSizeW(97.152), this.computedSizeW(118.68));
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
            offCanvas2d.drawImage(this.prePageDis, 0, 0, this.prePageDis.width, this.prePageDis.height, this.computedSizeW(110), this.bgOffsetTop + this.computedSizeW(250), this.computedSizeW(89.424), this.computedSizeW(34.776));
        } else {
            offCanvas2d.drawImage(this.prePageN, 0, 0, this.prePageN.width, this.prePageN.height, this.computedSizeW(110), this.bgOffsetTop + this.computedSizeW(250), this.computedSizeW(89.424), this.computedSizeW(34.776));
        }

        if (this.hasNext) {
            offCanvas2d.drawImage(this.nextPageDis, 0, 0, this.nextPageDis.width, this.nextPageDis.height, this.computedSizeW(220), this.bgOffsetTop + this.computedSizeW(250), this.computedSizeW(89.424), this.computedSizeW(34.776));
        } else {
            offCanvas2d.drawImage(this.nextPageN, 0, 0, this.nextPageN.width, this.nextPageN.height, this.computedSizeW(220), this.bgOffsetTop + this.computedSizeW(250), this.computedSizeW(89.424), this.computedSizeW(34.776));
        }

        // 返回按钮
        offCanvas2d.drawImage(this.backBtn, 0, 0, this.backBtn.width, this.backBtn.height, this.computedSizeW(41.4), this.bgOffsetTop + this.computedSizeW(320), this.computedSizeW(89.424), this.computedSizeW(34.776));

        texture2d.needsUpdate = true;
    }

    setContent() {
        currentPage = 'carportContentPage';

        const { days, highScore, highTurn } = this.high;
        const { unlock, imgUrlObj, unlockNum } = this.list[this.index];

        const carSize = {
            left: winWidth / 2 - this.computedSizeW(imgUrlObj.width / 4),
            top: this.contentBgOffsetTop + this.computedSizeW(80),
            width: this.computedSizeW(imgUrlObj.width / 2),
            height: this.computedSizeW(imgUrlObj.height / 2)
        };

        // 背景
        offCanvas2d.drawImage(this.unlockPane, 0, 0, this.unlockPane.width, this.unlockPane.height, this.computedSizeW(52.5), this.contentBgOffsetTop, this.computedSizeW(310), this.computedSizeW(320));

        // 汽车背景
        offCanvas2d.fillStyle = '#fff';
        offCanvas2d.fillRect(carSize.left, carSize.top, carSize.width, carSize.height);

        // 解锁背景
        unlock && offCanvas2d.drawImage(this.carPane, 0, 0, this.carPane.width, this.carPane.height, carSize.left - this.computedSizeW(5), carSize.top - this.computedSizeW(8), carSize.width + this.computedSizeW(10), carSize.height + this.computedSizeW(10));

        // 汽车
        offCanvas2d.drawImage(imgUrlObj, 0, 0, imgUrlObj.width, imgUrlObj.height, carSize.left, carSize.top, carSize.width, carSize.height);

        // 未解锁背景
        !unlock && offCanvas2d.drawImage(this.carPaneOff, 0, 0, this.carPaneOff.width, this.carPaneOff.height, carSize.left, carSize.top, carSize.width, carSize.height);

        // 进度
        offCanvas2d.drawImage(this.carProgressBg, 0, 0, this.carProgressBg.width, this.carProgressBg.height, winWidth / 2 - this.computedSizeW(this.carProgressBg.width / 4), this.contentBgOffsetTop + this.computedSizeW(240), this.computedSizeW(this.carProgressBg.width / 2), this.computedSizeW(this.carProgressBg.height / 2));

        const carUseBtn = unlock ? this.carUse : this.carOk;

        // 好的/使用按钮
        offCanvas2d.drawImage(carUseBtn, 0, 0, carUseBtn.width, carUseBtn.height, winWidth / 2 - this.computedSizeW(carUseBtn.width / 4), this.btnOffsetTop, this.computedSizeW(carUseBtn.width / 2), this.computedSizeW(carUseBtn.height / 2));

        // 关闭按钮
        unlock && offCanvas2d.drawImage(this.closeBtn, 0, 0, this.closeBtn.width, this.closeBtn.height, this.computedSizeW(330), this.contentBgOffsetTop + this.computedSizeW(10), this.computedSizeW(this.closeBtn.width / 2), this.computedSizeW(this.closeBtn.height / 2));

        offCanvas2d.textAlign = "center";
        offCanvas2d.fillStyle = '#92510A';
        offCanvas2d.font = `bold ${this.computedSizeW(14)}px Arial`;

        // 解锁选项
        switch(unlockNum) {
            case 0:
                this.createSimpleText('登录就送。', { unlock: true });

                break;
            case 1:
                offCanvas2d.fillText('点击首页公众号按钮，按提示操作', winWidth / 2, this.contentBgOffsetTop + this.computedSizeW(210));
                offCanvas2d.fillText('进行关注有车以后公众号。', winWidth / 2, this.contentBgOffsetTop + this.computedSizeW(230));
                this.createProgressText({ unlock });
                break;
            case 2:
                this.createSimpleText('连续登录2天。', { num: days, max: 2, unlock });
                break;
            case 3:
                this.createSimpleText('连续登录5天。', { num: days, max: 5, unlock });
                break;
            case 4:
                this.createSimpleText('连续登录10天。', { num: days, max: 10, unlock });
                break;
            case 5:
                this.createSimpleText('一场比赛达到50分。', { num: highScore, max: 50, unlock });
                break;
            case 6:
                this.createSimpleText('一场比赛达到100分。', { num: highScore, max: 100, unlock });
                break;
            case 7:
                this.createSimpleText('一场比赛达到200分。', { num: highScore, max: 200, unlock });
                break;
            case 8:
                this.createSimpleText('一场比赛达到500分。', { num: highScore, max: 500, unlock });
                break;
            case 9:
                this.createSimpleText('一场比赛转弯200次。', { num: highTurn, max: 200, unlock });
                break;
        }

        texture2d.needsUpdate = true;
    }

    /**
     * 创建通用文案
     * */
    createSimpleText(text, progress) {
        offCanvas2d.fillText(text, winWidth / 2, this.contentBgOffsetTop + this.computedSizeW(225));

        progress && this.createProgressText(progress);
    }

    /**
     * 创建进度文案
     * */
    createProgressText({ num, max, unlock }) {
        offCanvas2d.fillStyle = '#fff';

        if (unlock) {
            offCanvas2d.fillText('已解锁', winWidth / 2, this.contentBgOffsetTop + this.computedSizeW(257));
        } else if (typeof num === 'number') {
            if (num < max) {
                offCanvas2d.fillText(`${num} / ${max}`, winWidth / 2, this.contentBgOffsetTop + this.computedSizeW(257));
            } else {
                offCanvas2d.fillText('已解锁', winWidth / 2, this.contentBgOffsetTop + this.computedSizeW(257));
            }
        } else {
            offCanvas2d.fillText('待解锁', winWidth / 2, this.contentBgOffsetTop + this.computedSizeW(257));
        }
    }
}
