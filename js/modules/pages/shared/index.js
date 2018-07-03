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
        // 结束页-好友排行
        this.endFriendRank()
        // 结束页-炫耀一下
        this.showYourScore();

        // 复活页-复活
        this.bindReseur();
        // 复活页-跳过
        this.bindSkip();

        // 群组排行榜-上一页
        this.bindGroupRankPrePage();
        // 群组排行榜-下一页
        this.bindGroupRankNextPage();
        // 群排行榜-返回
        this.groupRankGoBack();
        // 群排行榜-我也要玩
        this.iWantToPlay();

        // 好友排行榜-上一页
        this.bindFriendRankPrePage();
        // 好友排行榜-下一页
        this.bindFriendRankNextPage();
        // 好友排行榜-返回
        this.friendRankGoBack();
        // 好友排行-世界排行榜
        this.goWorldRank();


        // 世界排行榜-上一页
        this.bindWorldRankPrePage();
        // 世界排行榜-下一页
        this.bindWorldRankNextPage();
        // 世界排行-返回
        this.worldRankGoBack();
        // 世界排行-好友排行榜
        this.goFriendRank();

        // 泡妞神器-返回
        this.bindQrBack();
        // 泡妞神器-保存二维码
        this.saveQrcode();

        // 公众号-返回
        this.bindWechatBack();

        // 查看群排行榜
        this.goGroupRank();
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
                isSharedLoop = false;
                this.clear2d();

                pageClass.setPosition();

                startPage.setTexture();
            }
        });
    }

    // 结束页-好友排行
    endFriendRank() {
        const x1 = this.computedSizeW(266);
        const x2 = this.computedSizeW(352);
        const y1 = this.computedSizeH(517);
        const y2 = this.computedSizeH(532);

        events.click({
            name: 'endFriendRank',
            pageName: 'endPage',
            point: [x1, y1, x2, y2],
            cb: () => {
                isSharedLoop = true ;
                sharedClass.rankPage();
            }
        });
    }

    /**
     * 结束页面的炫耀一下
     */
    showYourScore() {
        const x1 = this.computedSizeW(62);
        const x2 = this.computedSizeW(183);
        const y1 = this.computedSizeH(570);
        const y2 = this.computedSizeH(610);

        events.click({
            name: 'showYourScore',
            pageName: 'endPage',
            point: [x1, y1, x2, y2],
            cb: () => {
                this.groupRankPage()
            }
        })
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
                isSharedLoop = false;
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
                isSharedLoop = true;

                this.endPage();

                // 提交分数到服务器
                // $io.updateScore(score);

                // 更新解锁分数
                $io.unlockCar({ score, turn });

                currentPage = 'endPage';
            }
        });
    }

    // 上一页按钮
    bindWorldRankPrePage() {
        const x1 = this.computedSizeW(254);
        const x2 = this.computedSizeW(291);
        const y1 = this.computedSizeH(158);
        const y2 = this.computedSizeH(171);

        events.click({
            name: 'worldRankPrePage',
            pageName: 'worldRank',
            point: [x1, y1, x2, y2],
            cb: () => {
                // rankCurrentPage = rankCurrentPage <= 1 ? 1 : rankCurrentPage--;
                if (rankCurrentPage === 1) {
                    return
                }
                rankCurrentPage -= 1;
                $io.getWorldRank({ offset: rankCurrentPage - 1 }).then(e=>{
                    this.showPage('worldRank',{
                        page: 1,
                        common: 1 ,
                        shareTicket: $wx.shareTicket,
                        ranks:e.payload.ranks ,
                        user:e.payload.user
                    });
                    sharedTexture2d.needsUpdate = true;
                    currentPage = 'worldRank';
                })
            }
        })
    }

    //查看世界排行
    goWorldRank() {
        const x1 = this.computedSizeW(249);
        const x2 = this.computedSizeW(356);
        const y1 = this.computedSizeH(88);
        const y2 = this.computedSizeH(123);

        events.click({
            name: 'goWorldRank',
            pageName: 'friendRank',
            point: [x1, y1, x2, y2],
            cb: () => {
                isSharedLoop = true;
                console.log('goWorldRank')
                rankCurrentPage = 1
                $io.getWorldRank({ offset: rankCurrentPage - 1 }).then(e=>{
                    this.showPage('worldRank',{
                        page: 1,
                        common: 1 ,
                        shareTicket: $wx.shareTicket,
                        ranks:e.payload.ranks ,
                        user:e.payload.user
                    });
                    sharedTexture2d.needsUpdate = true;
                    currentPage = 'worldRank';
                })
            }
        })
    }

    // 世界排行榜-下一页按钮
    bindWorldRankNextPage() {
        const x1 = this.computedSizeW(311);
        const x2 = this.computedSizeW(363);
        const y1 = this.computedSizeH(157);
        const y2 = this.computedSizeH(172);
        events.click({
            name: 'worldRankNextPage',
            pageName: 'worldRank',
            point: [x1, y1, x2, y2],
            cb: () => {
                rankCurrentPage += 1;
                $io.getWorldRank({ offset: rankCurrentPage - 1 }).then(e=>{
                    this.showPage('worldRank',{
                        page: 1,
                        common: 1 ,
                        shareTicket: $wx.shareTicket,
                        ranks:e.payload.ranks,
                        user:e.payload.user
                    });
                    sharedTexture2d.needsUpdate = true;
                    currentPage = 'worldRank';
                })
            }
        })
    }

    // 群排行榜-上一页按钮
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
                $wx.sendMessage('groupRank',{ page: rankCurrentPage, common: 0 , shareTicket: $wx.shareTicket});
                sharedTexture2d.needsUpdate = true;
            }
        })
    }

    // 群排行榜-下一页按钮
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
    // 好友排行榜-上一页按钮
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
                $wx.sendMessage('friendRank',{ page: rankCurrentPage, common: 0 , shareTicket: $wx.shareTicket});
                sharedTexture2d.needsUpdate = true;
            }
        })
    }

    // 好友排行榜-下一页按钮
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

    //泡妞神器-保存二维码
    saveQrcode() {
        const x1 = this.computedSizeW(130);
        const x2 = this.computedSizeW(275);
        const y1 = this.computedSizeH(540);
        const y2 = this.computedSizeH(570);

        events.click({
            name: 'saveQrcode',
            pageName: 'qrPage',
            point: [x1, y1, x2, y2],
            cb: () => {
                wx.saveImageToPhotosAlbum({
                    filePath: 'images/qrcode.png',
                    success: function() {
                        wx.showToast({ title:'保存成功' });
                    },
                    fail: function() {
                        wx.showToast({ title:'保存失败' });
                    }
                })
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

    // 查看群排行
    /**
     * 绑定排行榜按钮
     * */
    goFriendRank() {
        const x1 = this.computedSizeW(51);
        const x2 = this.computedSizeW(161);
        const y1 = this.computedSizeH(91);
        const y2 = this.computedSizeH(120);

        events.click({
            name: 'friendRankBtn',
            pageName: 'worldRank',
            point: [x1, y1, x2, y2],
            cb: () => {
                sharedClass.rankPage();
            }
        });
    }

    //查看群排行
    goGroupRank() {
        const x1 = this.computedSizeW(246);
        const x2 = this.computedSizeW(365);
        const y1 = this.computedSizeH(635);
        const y2 = this.computedSizeH(675);

        events.click({
            name: 'goGroupRank',
            pageName: 'friendRank',
            point: [x1, y1, x2, y2],
            cb: () => {
                this.groupRankPage()
            }
        })
    }

    // 群排行榜-我也要玩
    iWantToPlay() {
        const x1 = this.computedSizeW(246);
        const x2 = this.computedSizeW(365);
        const y1 = this.computedSizeH(635);
        const y2 = this.computedSizeH(675);

        events.click({
            name: 'iWantToPlay',
            pageName: 'groupRank',
            point: [x1, y1, x2, y2],
            cb: () => {
                isSharedLoop = false;
                this.clear2d();

                startPage.setTexture();
            }
        })
    }

    //好友排行榜-返回
    friendRankGoBack() {
        const x1 = this.computedSizeW(50);
        const x2 = this.computedSizeW(76);
        const y1 = this.computedSizeH(642);
        const y2 = this.computedSizeH(666);

        events.click({
            name: 'friendRankGoBack',
            pageName: 'friendRank',
            point: [x1, y1, x2, y2],
            cb: () => {
                this.clear2d();
                isSharedLoop = false;

                pageClass.setPosition();

                startPage.setTexture();
            }
        })
    }

    // 群排行榜-返回
    groupRankGoBack() {
        const x1 = this.computedSizeW(50);
        const x2 = this.computedSizeW(76);
        const y1 = this.computedSizeH(642);
        const y2 = this.computedSizeH(666);
        events.click({
            name: 'groupRankGoBack',
            pageName: 'groupRank',
            point: [x1, y1, x2, y2],
            cb: () => {
                this.clear2d();
                isSharedLoop = false;

                pageClass.setPosition();

                startPage.setTexture();
            }
        })
    }

    // 世界排行榜-返回
    worldRankGoBack() {
        const x1 = this.computedSizeW(50);
        const x2 = this.computedSizeW(76);
        const y1 = this.computedSizeH(642);
        const y2 = this.computedSizeH(666);
        events.click({
            name: 'worldRankGoBack',
            pageName: 'worldRank',
            point: [x1, y1, x2, y2],
            cb: () => {
                isSharedLoop = false;
                this.clear2d();

                pageClass.setPosition();

                startPage.setTexture();
            }
        })
    }

    /**
     * 群排行榜
     * */
    groupRankPage() {
        wx.shareAppMessage({
            title: '漂移车王'
        })
    }

    /**
     * 群排行榜页面
     * */
    showGroupRankPage() {
        if($wx.shareTicket !== 'noStareTicket') {
            $wx.startBtn.hide();

            isSharedLoop = true;
            pageClass.clear2d();

            $wx.sendMessage('groupRank',{ type: 2 , page: rankCurrentPage, common: 0 , shareTicket: $wx.shareTicket});
            currentPage = 'groupRank';
        }
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
        isSharedLoop = true;
        currentPage = 'endPage';
        this.showPage('end', { score });
    }

    /**
     * 复活页
     * */
    reseurPage() {
        isSharedLoop = true;
        currentPage = 'reseurPage';
        this.showPage('reseur', { score });
    }

    /**
     * 排行榜
     * */
    rankPage() {
        isSharedLoop = true;
        currentPage = 'friendRank';
        //禁止从这里进去缩放
        this.showPage('friendRank', { noScale: $wx.shareTicket === 'noShareTicket' }, true);
    }

    /**
     * 泡妞神器
     * */
    qrPage() {
        localStorage.removeItem('accessToken');
        // console.log('当前localStorage: ', localStorage.getItem('accessToken'));
        currentPage = 'qrPage';
        this.showPage('qr', {}, true);
    }

    /**
     * 公众号
     * */
    wechatPage() {
        currentPage = 'wechatPage';
        this.showPage('wechat', {}, true);
    }

    showPage(command, data, clear) {
        $wx.startBtn.hide();

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
