import UTIL from "../../util";

/**
 * 2d canvas函数
 */
export default class Shared extends UTIL {
    currentSpeedRecord = {
        x: 0,
        z: 0
    };

    size = {
        width: winWidth,
        height: winHeight
    };

    constructor() {
        super();
        this.page();

        this.bindEvent();
    }

    bindEvent() {
        // 结束页-再玩一次
        this.bindReStart();
        // 结束页-回来主页
        this.bindGoHome();

        // 复活页-复活
        this.bindReseur();
        // 复活页-跳过
        this.bindSkip();

        // 群组排行榜-上一页
        this.bindGroupRankPrePage();
        // 群组排行榜-下一页
        this.bindGroupRankNextPage();

        // 好友排行榜-上一页
        this.bindFriendRankPrePage();
        // 好友排行榜-下一页
        this.bindFriendRankNextPage();

        // 泡妞神器-返回
        this.bindQrBack();

        // 公众号-返回
        this.bindWechatBack();

        this.goGroupRank();
        this.iWantToPlay();
        this.goBack1();
        this.goBack2();
    }

    // 结束页-再玩一次
    bindReStart() {
        const x1 = this.computedSizeW(250);
        const x2 = this.computedSizeW(350);
        const y1 = this.computedSizeH(583);
        const y2 = this.computedSizeH(610);

        events.click({
            name: 'restartBtn',
            pageName: 'endPage',
            point: [x1, y1, x2, y2],
            cb: () => {
                // $wx.sendMessage('clear');
                this.clear2d();
                // 重启游戏
                this.restart();

                currentPage = 'gamePage';
            }
        });
    }

    // 结束页-返回主页
    bindGoHome() {
        const x1 = this.computedSizeW(175);
        const x2 = this.computedSizeW(245);
        const y1 = this.computedSizeH(655);
        const y2 = this.computedSizeH(680);

        events.click({
            name: 'goHomeBtn',
            pageName: 'endPage',
            point: [x1, y1, x2, y2],
            cb: () => {
                this.clear2d();

                offCanvasSprite.position.x += speedRecord.x;
                offCanvasSprite.position.z -= speedRecord.z;

                startPage.setTexture();
                currentPage = 'startPage';
            }
        });
    }

    // 复活页-复活
    bindReseur() {
        const x1 = this.computedSizeW(125);
        const x2 = this.computedSizeW(300);
        const y1 = this.computedSizeH(360);
        const y2 = this.computedSizeH(420);

        events.click({
            name: 'reseurBtn',
            pageName: 'reseurPage',
            point: [x1, y1, x2, y2],
            cb: () => {
                this.clear2d();

                this.restart(true);

                currentPage = 'gamePage';
            }
        });
    }

    // 复活页-跳过
    bindSkip() {
        const x1 = this.computedSizeW(175);
        const x2 = this.computedSizeW(240);
        const y1 = this.computedSizeH(460);
        const y2 = this.computedSizeH(490);

        events.click({
            name: 'skipBtn',
            pageName: 'reseurPage',
            point: [x1, y1, x2, y2],
            cb: () => {
                this.clear2d();

                this.endPage();

                // 设置分数
                $wx.setWxScore();

                currentPage = 'endPage';
            }
        });
    }

    // 上一页按钮
    bindGroupRankPrePage() {
        const x1 = this.computedSizeW(254);
        const x2 = this.computedSizeW(291);
        const y1 = this.computedSizeH(158);
        const y2 = this.computedSizeH(171);

        events.click({
            name: 'prePageBtn',
            pageName: 'groupRank',
            point: [x1, y1, x2, y2],
            cb: () => {
                // rankCurrentPage = rankCurrentPage <= 1 ? 1 : rankCurrentPage--;
                console.log(1123414)
                $wx.sendMessage('groupRank',{ page: rankCurrentPage, common: 0 , shareTicket: $wx.shareTicket});
                sharedTexture2d.needsUpdate = true;
            }
        })
    }

    // 下一页按钮
    bindGroupRankNextPage() {
        const x1 = this.computedSizeW(311);
        const x2 = this.computedSizeW(363);
        const y1 = this.computedSizeH(157);
        const y2 = this.computedSizeH(172);
        events.click({
            name: 'nextPageBtn',
            pageName: 'groupRank',
            point: [x1, y1, x2, y2],
            cb: () => {
                // rankCurrentPage = rankCurrentPage + 1;
                $wx.sendMessage('groupRank',{ page: rankCurrentPage, common: 1 , shareTicket: $wx.shareTicket});
                sharedTexture2d.needsUpdate = true;
            }
        })
    }
    // 上一页按钮
    bindFriendRankPrePage() {
        const x1 = this.computedSizeW(254);
        const x2 = this.computedSizeW(291);
        const y1 = this.computedSizeH(158);
        const y2 = this.computedSizeH(171);

        events.click({
            name: 'prePageBtn',
            pageName: 'friendRank',
            point: [x1, y1, x2, y2],
            cb: () => {
                // rankCurrentPage = rankCurrentPage <= 1 ? 1 : rankCurrentPage--;
                console.log(1123414)
                $wx.sendMessage('friendRank',{ page: rankCurrentPage, common: 0 , shareTicket: $wx.shareTicket});
                sharedTexture2d.needsUpdate = true;
            }
        })
    }

    // 下一页按钮
    bindFriendRankNextPage() {
        const x1 = this.computedSizeW(311);
        const x2 = this.computedSizeW(363);
        const y1 = this.computedSizeH(157);
        const y2 = this.computedSizeH(172);
        events.click({
            name: 'nextPageBtn',
            pageName: 'friendRank',
            point: [x1, y1, x2, y2],
            cb: () => {
                // rankCurrentPage = rankCurrentPage + 1;
                $wx.sendMessage('friendRank',{ page: rankCurrentPage, common: 1 , shareTicket: $wx.shareTicket});
                sharedTexture2d.needsUpdate = true;
            }
        })
    }

    // 泡妞神器-返回
    bindQrBack() {
        const x1 = this.computedSizeW(45);
        const x2 = this.computedSizeW(85);
        const y1 = this.computedSizeH(630);
        const y2 = this.computedSizeH(670);

        events.click({
            name: 'qrBackBtn',
            pageName: 'qrPage',
            point: [x1, y1, x2, y2],
            cb: () => {
                this.clear2d();
                startPage.setTexture();
            }
        })
    }

    // 公众号-返回
    bindWechatBack() {
        const x1 = this.computedSizeW(45);
        const x2 = this.computedSizeW(85);
        const y1 = this.computedSizeH(630);
        const y2 = this.computedSizeH(670);

        events.click({
            name: 'wechatBackBtn',
            pageName: 'wechatPage',
            point: [x1, y1, x2, y2],
            cb: () => {
                this.clear2d();
                startPage.setTexture();
            }
        })
    }

    //查看群排行
    goGroupRank() {
        const x1 = this.computedSizeW(246);
        const x2 = this.computedSizeW(365);
        const y1 = this.computedSizeH(635);
        const y2 = this.computedSizeH(675);
        // this.computedSizeW(445), this.computedSizeH(1150), this.computedSizeW(216), this.computedSizeH(80)
        events.click({
            name: 'goGroupRank',
            pageName: 'friendRank',
            point: [x1, y1, x2, y2],
            cb: () => {
                isSharedLoop = true;
                console.log('goGroupRank')
                // rankCurrentPage = rankCurrentPage + 1;
                $wx.sendMessage('groupRank',{ page: rankCurrentPage, common: 1 , shareTicket: $wx.shareTicket });
                // sharedTexture2d.needsUpdate = true;
                currentPage = 'groupRank';
            }
        })
    }

    //开始页

    iWantToPlay() {
        const x1 = this.computedSizeW(246);
        const x2 = this.computedSizeW(365);
        const y1 = this.computedSizeH(635);
        const y2 = this.computedSizeH(675);
        // this.computedSizeW(445), this.computedSizeH(1150), this.computedSizeW(216), this.computedSizeH(80)
        events.click({
            name: 'iWantToPlay',
            pageName: 'groupRank',
            point: [x1, y1, x2, y2],
            cb: () => {
                this.clear2d();

                offCanvasSprite.position.x += speedRecord.x;
                offCanvasSprite.position.z -= speedRecord.z;

                startPage.setTexture();
                currentPage = 'startPage';
            }
        })
    }

    //返回
    goBack1() {
        const x1 = this.computedSizeW(50);
        const x2 = this.computedSizeW(76);
        const y1 = this.computedSizeH(642);
        const y2 = this.computedSizeH(666);
        // this.computedSizeW(445), this.computedSizeH(1150), this.computedSizeW(216), this.computedSizeH(80)
        events.click({
            name: 'goBack1',
            pageName: 'friendRank',
            point: [x1, y1, x2, y2],
            cb: () => {
                this.clear2d();
                isSharedLoop = false;
                offCanvasSprite.position.x += speedRecord.x;
                offCanvasSprite.position.z -= speedRecord.z;

                startPage.setTexture();
                currentPage = 'startPage';
            }
        })
    }

    goBack2() {
        const x1 = this.computedSizeW(50);
        const x2 = this.computedSizeW(76);
        const y1 = this.computedSizeH(642);
        const y2 = this.computedSizeH(666);
        events.click({
            name: 'goBack2',
            pageName: 'groupRank',
            point: [x1, y1, x2, y2],
            cb: () => {
                console.log('asd');
                this.clear2d();
                isSharedLoop = false;
                offCanvasSprite.position.x += speedRecord.x;
                offCanvasSprite.position.z -= speedRecord.z;

                startPage.setTexture();
                currentPage = 'startPage';
            }
        })
    }


    /**
     * 创建2d画布
     */
    page() {
        this.sharedCanvas = openDataContext.canvas;

        this.sharedCanvas.height = winHeight * window.devicePixelRatio;
        this.sharedCanvas.width = winWidth * window.devicePixelRatio;

        const sharedCanvas2d = this.sharedCanvas.getContext("2d");

        sharedCanvas2d.scale(window.devicePixelRatio, window.devicePixelRatio);

        sharedTexture2d = new THREE.Texture(this.sharedCanvas);
        sharedTexture2d.minFilter = THREE.LinearFilter;

        const spriteMaterial = new THREE.SpriteMaterial({
            map: sharedTexture2d
        });

        sharedCanvasSprite = new THREE.Sprite(spriteMaterial);
        sharedCanvasSprite.position.set(-11.75, 78.44, 20);

        const scaleX = Math.floor(winHeight / winWidth * 10) / 10 === 1.7 ? 13.5 : this.computedSizeW(13.5);

        sharedCanvasSprite.scale.set(scaleX, 23.95, 1);

        scene.add(sharedCanvasSprite);
    }

    /**
     * 结束页
     * */
    endPage() {
        this.showPage('end', { score });
    }

    /**
     * 复活页
     * */
    reseurPage() {
        this.showPage('reseur', { score });
    }

    /**
     * 车库
     * */
    carListPage() {
        this.showPage('carport');
    }

    /**
     * 排行榜
     * */
    rankPage() {
        isSharedLoop = true;
        currentPage = 'friendRank';
        this.showPage('friendRank', {}, true);
    }

    /**
     * 泡妞神器
     * */
    qrPage() {
        this.showPage('qr', {}, true);
    }

    /**
     * 公众号
     * */
    wechatPage() {
        this.showPage('wechat', {}, true);
    }

    /**
     * 群排行榜
     * */
    groupRankPage() {
        isSharedLoop = true;
        currentPage = 'groupRank';
        this.showPage('groupRank', {shareTicket: $wx.shareTicket}, true);
    }

    showPage(command, data, clear) {
        wxConfig.startBtn.hide();

        $wx.sendMessage(command, data);

        clear && pageClass.clear2d();

        this.setPosition();

        sharedTexture2d.needsUpdate = true;
    }

    clear2d() {
        $wx.sendMessage('clear');
        sharedTexture2d.needsUpdate = true;
    }

    setPosition() {
        sharedCanvasSprite.position.x += speedRecord.x - this.currentSpeedRecord.x;
        sharedCanvasSprite.position.z -= speedRecord.z - this.currentSpeedRecord.z;

        this.currentSpeedRecord = speedRecord;
    }
}
