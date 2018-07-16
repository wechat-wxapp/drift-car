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
        this.endFriendRank();
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
        // 世界排行-查看好友排行榜
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

    ralativeClickSizeH(num) {
        return this.computedSizeH(96) + this.computedSizeW(num - 96)
    }

    //阻止排行榜切换下上页面太快
    preventFastClick(pageName, d = 300) {
        currentPage = 'off';
        setTimeout(() => {
            currentPage = pageName;
        }, d)
    }
    
    // 结束页-再玩一次
    bindReStart() {
        const x1 = this.computedSizeW(60);
        const x2 = this.computedSizeW(356);
        const y1 = this.ralativeClickSizeH(531);
        const y2 = this.ralativeClickSizeH(570);

        events.click({
            name: 'restartBtn',
            pageName: 'endPage',
            point: [x1, y1, x2, y2],
            cb: () => {
                this.clear2d();
                // 重启游戏
                this.restart();
            }
        });
    }

    // 结束页-返回主页
    bindGoHome() {
        const x1 = this.computedSizeW(56);
        const x2 = this.computedSizeW(176);
        const y1 = this.ralativeClickSizeH(596);
        const y2 = this.ralativeClickSizeH(632);

        events.click({
            name: 'goHomeBtn',
            pageName: 'endPage',
            point: [x1, y1, x2, y2],
            cb: () => {
                this.clear2d();
                // isSharedLoop = false;

                // pageClass.setPosition();

                startPage.setTexture();
            }
        });
    }

    // 结束页-好友排行
    endFriendRank() {
        const x1 = this.computedSizeW(232);
        const x2 = this.computedSizeW(327);
        const y1 = this.ralativeClickSizeH(456);
        const y2 = this.ralativeClickSizeH(494);

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
        const x1 = this.computedSizeW(238);
        const x2 = this.computedSizeW(357);
        const y1 = this.ralativeClickSizeH(596);
        const y2 = this.ralativeClickSizeH(632);

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
        const x1 = this.computedSizeW(82);
        const x2 = this.computedSizeW(341);
        const y1 = this.ralativeClickSizeH(482);
        const y2 = this.ralativeClickSizeH(549);

        events.click({
            name: 'reseurBtn',
            pageName: 'reseurPage',
            point: [x1, y1, x2, y2],
            cb: () => {
                this.clear2d();
                // isSharedLoop = false;
                this.restart(true);
            }
        });
    }

    // 复活页-跳过
    bindSkip() {
        const x1 = this.computedSizeW(170);
        const x2 = this.computedSizeW(255);
        const y1 = this.ralativeClickSizeH(570);
        const y2 = this.ralativeClickSizeH(604);

        events.click({
            name: 'skipBtn',
            pageName: 'reseurPage',
            point: [x1, y1, x2, y2],
            cb: () => {
                this.clear2d();
                isSharedLoop = true;

                this.endPage();
            }
        });
    }

    // 世界页面-上一页按钮
    bindWorldRankPrePage() {
        const x1 = this.computedSizeW(110);
        const x2 = this.computedSizeW(195);
        const y1 = this.ralativeClickSizeH(500);
        const y2 = this.ralativeClickSizeH(528);

        events.click({
            name: 'worldRankPrePage',
            pageName: 'worldRank',
            point: [x1, y1, x2, y2],
            cb: () => {
                $wx.sendMessage('worldRank',{ page: rankCurrentPage, common: 0 , isDriving : 'pre'})
                sharedTexture2d.needsUpdate = true;
                this.preventFastClick('worldRank');
            }
        })
    }

    // 世界排行榜-下一页按钮
    bindWorldRankNextPage() {
        const x1 = this.computedSizeW(220);
        const x2 = this.computedSizeW(300);
        const y1 = this.ralativeClickSizeH(500);
        const y2 = this.ralativeClickSizeH(528);
        events.click({
            name: 'worldRankNextPage',
            pageName: 'worldRank',
            point: [x1, y1, x2, y2],
            cb: () => {
                $wx.sendMessage('worldRank',{ common: 1 , isDriving : 'next'})
                // currentPage = 'off';
                // setTimeout(() => {
                //     currentPage = 'worldRank';
                // }, 100)
                this.preventFastClick('worldRank');
            }
        })
    }

    // 群排行榜-上一页按钮
    bindGroupRankPrePage() {
        const x1 = this.computedSizeW(110);
        const x2 = this.computedSizeW(195);
        const y1 = this.ralativeClickSizeH(500);
        const y2 = this.ralativeClickSizeH(528);

        events.click({
            name: 'groupRankPrePage',
            pageName: 'groupRank',
            point: [x1, y1, x2, y2],
            cb: () => {
                $wx.sendMessage('groupRank',{ page: rankCurrentPage, common: 0 , shareTicket: $wx.shareTicket , isDriving : 'pre'});
                sharedTexture2d.needsUpdate = true;
                this.preventFastClick('groupRank');
            }
        })
    }

    // 群排行榜-下一页按钮
    bindGroupRankNextPage() {
        const x1 = this.computedSizeW(220);
        const x2 = this.computedSizeW(300);
        const y1 = this.ralativeClickSizeH(500);
        const y2 = this.ralativeClickSizeH(528);
        events.click({
            name: 'groupRankNextPage',
            pageName: 'groupRank',
            point: [x1, y1, x2, y2],
            cb: () => {
                // rankCurrentPage = rankCurrentPage + 1;
                $wx.sendMessage('groupRank',{ page: rankCurrentPage, common: 1 , shareTicket: $wx.shareTicket , isDriving : 'next'});
                sharedTexture2d.needsUpdate = true;
                this.preventFastClick('groupRank');
            }
        })
    }
    // 好友排行榜-上一页按钮
    bindFriendRankPrePage() {
        const x1 = this.computedSizeW(110);
        const x2 = this.computedSizeW(195);
        const y1 = this.ralativeClickSizeH(500);
        const y2 = this.ralativeClickSizeH(528);

        events.click({
            name: 'friendRankPrePage',
            pageName: 'friendRank',
            point: [x1, y1, x2, y2],
            cb: () => {
                $wx.sendMessage('friendRank',{ page: rankCurrentPage, common: 0 , isDriving : 'pre'});
                sharedTexture2d.needsUpdate = true;
                this.preventFastClick('friendRank');
            }
        })
    }

    // 好友排行榜-下一页按钮
    bindFriendRankNextPage() {
        const x1 = this.computedSizeW(220);
        const x2 = this.computedSizeW(300);
        const y1 = this.ralativeClickSizeH(500);
        const y2 = this.ralativeClickSizeH(528);
        events.click({
            name: 'friendRankNextPage',
            pageName: 'friendRank',
            point: [x1, y1, x2, y2],
            cb: () => {
                $wx.sendMessage('friendRank',{ page: rankCurrentPage, common: 1 , isDriving : 'next'} );
                sharedTexture2d.needsUpdate = true;
                this.preventFastClick('friendRank');
            }
        })
    }

    // 泡妞神器-返回
    bindQrBack() {
        const x1 = this.computedSizeW(45);
        const x2 = this.computedSizeW(85);
        const y1 = this.ralativeClickSizeH(630);
        const y2 = this.ralativeClickSizeH(670);

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
        const y1 = this.ralativeClickSizeH(540);
        const y2 = this.ralativeClickSizeH(570);

        events.click({
            name: 'saveQrcode',
            pageName: 'qrPage',
            point: [x1, y1, x2, y2],
            cb: () => {
                wx.saveImageToPhotosAlbum({
                    filePath: 'images/qrcode.png',
                    success: function() {
                        $loader.toast('保存成功', 'success');
                    },
                    fail: function() {
                        $loader.toast('保存失败', 'error');
                    }
                })
            }
        })
    }

    // 公众号-返回
    bindWechatBack() {
        const x1 = this.computedSizeW(45);
        const x2 = this.computedSizeW(80);
        const y1 = this.ralativeClickSizeH(630);
        const y2 = this.ralativeClickSizeH(670);

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

    /**
     * 世界排行榜-查看好友排行榜按钮
     * */
    goFriendRank() {
        const x1 = this.computedSizeW(52);
        const x2 = this.computedSizeW(178);
        const y1 = this.computedSizeH(96);
        const y2 = this.ralativeClickSizeH(145); // 145

        events.click({
            name: 'friendRankBtn',
            pageName: 'worldRank',
            point: [x1, y1, x2, y2],
            cb: () => {
                $wx.sendMessage('worldRank', { goBackKey: true });
                sharedClass.rankPage();
            }
        });
    }

    //好友排行榜-查看世界排行
    goWorldRank() {
        const x1 = this.computedSizeW(234);
        const x2 = this.computedSizeW(360);
        const y1 = this.computedSizeH(96);
        const y2 = this.ralativeClickSizeH(148);

        events.click({
            name: 'goWorldRank',
            pageName: 'friendRank',
            point: [x1, y1, x2, y2],
            cb: () => {
                rankCurrentPage = 1
                $wx.sendMessage('friendRank', { goBackKey: true });
                $wx.sendMessage('worldRank',{ page: rankCurrentPage })
                currentPage = 'worldRank';
                isSharedLoop = true;
            }
        })
    }

    //查看群排行
    goGroupRank() {
        const x1 = this.computedSizeW(268);
        const x2 = this.computedSizeW(358);
        const y1 = this.ralativeClickSizeH(628);
        const y2 = this.ralativeClickSizeH(660);

        events.click({
            name: 'goGroupRankFromFriend',
            pageName: 'friendRank',
            point: [x1, y1, x2, y2],
            cb: () => {

                this.groupRankPage()
            }
        })
        events.click({
            name: 'goGroupRankFromWrold',
            pageName: 'worldRank',
            point: [x1, y1, x2, y2],
            cb: () => {
                this.groupRankPage()
            }
        })
    }

    // 群排行榜-我也要玩
    iWantToPlay() {
        const x1 = this.computedSizeW(265);
        const x2 = this.computedSizeW(358);
        const y1 = this.ralativeClickSizeH(628);
        const y2 = this.ralativeClickSizeH(660);

        events.click({
            name: 'iWantToPlay',
            pageName: 'groupRank',
            point: [x1, y1, x2, y2],
            cb: () => {
                this.clear2d();
                $wx.sendMessage('groupRank', { goBackKey: true });
                startPage.setTexture();
            }
        })
    }

    //好友排行榜-返回
    friendRankGoBack() {
        const x1 = this.computedSizeW(50);
        const x2 = this.computedSizeW(140);
        const y1 = this.ralativeClickSizeH(630);
        const y2 = this.ralativeClickSizeH(660);

        events.click({
            name: 'friendRankGoBack',
            pageName: 'friendRank',
            point: [x1, y1, x2, y2],
            cb: () => {
                this.clear2d();
                $wx.sendMessage('friendRank', { goBackKey: true });
                startPage.setTexture();
            }
        })
    }

    // 群排行榜-返回
    groupRankGoBack() {
        const x1 = this.computedSizeW(50);
        const x2 = this.computedSizeW(140);
        const y1 = this.ralativeClickSizeH(630);
        const y2 = this.ralativeClickSizeH(660);
        events.click({
            name: 'groupRankGoBack',
            pageName: 'groupRank',
            point: [x1, y1, x2, y2],
            cb: () => {
                this.clear2d();
                $wx.sendMessage('groupRank', { goBackKey: true });
                startPage.setTexture();
            }
        })
    }

    // 世界排行榜-返回
    worldRankGoBack() {
        const x1 = this.computedSizeW(50);
        const x2 = this.computedSizeW(140);
        const y1 = this.ralativeClickSizeH(630);
        const y2 = this.ralativeClickSizeH(660);
        events.click({
            name: 'worldRankGoBack',
            pageName: 'worldRank',
            point: [x1, y1, x2, y2],
            cb: () => {
                this.clear2d();
                $wx.sendMessage('worldRank', { goBackKey: true });
                startPage.setTexture();
            }
        })
    }

    //事件绑定函数的封装
    btnBindEvent(p, eventName, pageName) {
        const x1 = this.computedSizeW(p.x1);
        const x2 = this.computedSizeW(p.x2);
        const y1 = this.computedSizeH(p.y1);
        const y2 = this.computedSizeH(p.y2);
        return new Promise ((resovle) => {
            events.click({
                name: eventName,
                pageName: pageName,
                point: [x1, y1, x2, y2],
                cb: () => resovle()
            })
        })
    }

    /**
     * 群排行榜
     * */
    groupRankPage() {
        $wx.shareAppMessage();
    }

    /**
     * 群排行榜页面
     * */
    showGroupRankPage() {
        if($wx.shareTicket !== 'noShareTicket') {
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
        const {cvs, cvs2d, texture2d, mesh} = this.createCanvas2d('2d', 'shared', winWidth, winHeight);

        this.sharedCanvas = cvs;
        sharedTexture2d = texture2d;
        sharedCanvasSprite = mesh;

        uiScene.add(sharedCanvasSprite);
    }

    /**
     * 结束页
     * */
    endPage() {
        this.setCanvasSize();

        // 更新解锁分数
        $io.unlockCar({ score, turn })
        .then((e) => {
            const { payload: { hasNew } } = e;
            $cache.setGameData('hasNew', hasNew);
        });

        isSharedLoop = true;
        currentPage = 'endPage';
        this.showPage('end', { score });
    }

    /**
     * 复活页
     * */
    reseurPage() {
        this.setCanvasSize();

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
        this.showPage('friendRank', { noScale: $wx.shareTicket !== 'noShareTicket' }, true);
    }

    /**
     * 泡妞神器
     * */
    qrPage() {
        // localStorage.removeItem('accessToken')
        // localStorage.removeItem('gameData')
        //
        // console.log(localStorage.getItem('accessToken'));
        // console.log(localStorage.getItem('gameData'));

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

    /**
     * 设置canvas尺寸
     * */
    setCanvasSize() {
        if (currentShared === 'shared') return false;

        this.sharedCanvas.width = winWidth * window.devicePixelRatio;
        this.sharedCanvas.height = winHeight * window.devicePixelRatio;

        // if (!this.asd) {
        //         const sharedCanvas2d = this.sharedCanvas.getContext("2d");
        //
        //         sharedCanvas2d.scale(window.devicePixelRatio, window.devicePixelRatio);
        //         this.asd = true;
        //     }

        currentShared = 'shared';
    }

    showPage(command, data, clear) {
        $wx.startBtn.hide();

        $wx.sendMessage(command, data);

        clear && pageClass.clear2d();

        // this.setPosition();

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
