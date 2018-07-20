import UTIL from '../../util';

/**
 * 开始页函数
 */
export default class Start extends UTIL {
    isBindStartBtn = false;

    constructor() {
        super();

        this.bg = imgList.indexBg;
        this.logo = imgList.logo;
        this.startBtn = imgList.startBtn;
        this.leaderboard = imgList.leaderboard;
        this.groupLeaderboard = imgList.groupLeaderboard;
        this.musicOn = imgList.musicOn;
        this.musicOff = imgList.musicOff;
        this.qr = imgList.qr;
        this.carport = imgList.carport;
        this.wechat = imgList.wechat;
        this.carNew = imgList.carNew;

        // 创建页面
        this.setTexture();

        // 绑定点击事件
        this.buildPage();
    }

    /**
     * 绑定事件, 创建开始页
     * */
    buildPage() {
        // 如果登录则绑定普通按钮点击事件
        $wx.isLogin === true && this.bindStartBtn();
        this.bindMusicBtn();

        // 排行榜
        this.bindRankBtn();
        // 群排行榜
        this.bindGroupRankBtn();
        // 泡妞神器
        this.bindQrBtn();
        // 车库
        this.bindCarportBtn();
        // 公众号
        this.bindWechatBtn();
    }

    /**
     * 绑定开始按钮
     * */
    bindStartBtn() {
        // 防止多次绑定
        if (this.isBindStartBtn) return false;

        const x1 = this.computedSizeW(95);
        const x2 = this.computedSizeW(320);
        const y1 = this.computedSizeH(517);
        const y2 = this.computedSizeH(575);

        events.click({
            name: 'startBtn',
            pageName: 'startPage',
            point: [x1, y1, x2, y2],
            cb: () => {
                gamePage.startGame();
            }
        });

        this.isBindStartBtn = true;
    }

    /**
     * 绑定音乐按钮
     * */
    bindMusicBtn() {
        const x1 = this.computedSizeW(18);
        const x2 = this.computedSizeW(71);
        const y1 = this.computedSizeH(17);
        const y2 = this.computedSizeH(64);

        events.click({
            name: 'musicBtn',
            pageName: 'startPage',
            point: [x1, y1, x2, y2],
            cb: () => {
                const isMusic = $cache.getGameData('music');

                const resultMusic = !isMusic

                $cache.setGameData('music', resultMusic);

                if (resultMusic) {
                    music.playBgm();
                } else {
                    music.pusedMusic();

                }

                this.setTexture();
            }
        });
    }

    /**
     * 绑定好友排行榜按钮
     * */
    bindRankBtn() {
        const x1 = this.computedSizeW(211);
        const x2 = this.computedSizeW(317);
        const y1 = this.computedSizeH(594);
        const y2 = this.computedSizeH(641);

        events.click({
            name: 'rankBtn',
            pageName: 'startPage',
            point: [x1, y1, x2, y2],
            cb: () => {
                sharedClass.rankPage();
            }
        });
    }

    /**
     * 绑定群排行榜按钮
     * */
    bindGroupRankBtn() {
        const x1 = this.computedSizeW(176);
        const x2 = this.computedSizeW(241);
        const y1 = this.computedSizeH(663);
        const y2 = this.computedSizeH(726);

        events.click({
            name: 'groupRankBtn',
            pageName: 'startPage',
            point: [x1, y1, x2, y2],
            cb: () => {
                sharedClass.groupRankPage();
            }
        });
    }

    /**
     * 绑定泡妞神器按钮
     * */
    bindQrBtn() {
        const x1 = this.computedSizeW(96);
        const x2 = this.computedSizeW(152);
        const y1 = this.computedSizeH(663);
        const y2 = this.computedSizeH(726);

        events.click({
            name: 'qrBtn',
            pageName: 'startPage',
            point: [x1, y1, x2, y2],
            cb: () => {
                // sharedClass.qrPage();
                $wx.navigateToMiniProgram();
            }
        });
    }

    /**
     * 绑定车库按钮
     * */
    bindCarportBtn() {
        const x1 = this.computedSizeW(98);
        const x2 = this.computedSizeW(199);
        const y1 = this.computedSizeH(599);
        const y2 = this.computedSizeH(647);

        events.click({
            name: 'carportBtn',
            pageName: 'startPage',
            point: [x1, y1, x2, y2],
            cb: () => {
                $cache.setGameData('hasNew', false);

                // 加载车列表
                this.asyncCarList();
            }
        });
    }

    /**
     * 绑定公众号按钮
     * */
    bindWechatBtn() {
        const x1 = this.computedSizeW(259);
        const x2 = this.computedSizeW(316);
        const y1 = this.computedSizeH(657);
        const y2 = this.computedSizeH(724);

        events.click({
            name: 'wechatBtn',
            pageName: 'startPage',
            point: [x1, y1, x2, y2],
            cb: () => {
                sharedClass.wechatPage();
                currentPage = 'wechatPage';
            }
        });
    }

    /**
     * 加载车库列表
     * */
    asyncCarList() {
        carportPage.getCarListInfo()
            .then(e => {
                $wx.startBtn.hide();

                carportPage.setTexture();
            });
    }

    /**
     * 开始页
     */
    setTexture() {
        currentPage = 'startPage';

        const hasNew = $cache.getGameData('hasNew');

        offCanvas2d.clearRect(0, 0, winWidth, winHeight);

        this.bgCover(offCanvas2d, this.bg);

        offCanvas2d.drawImage(this.logo, 0, 0, this.logo.width, this.logo.height, winWidth / 2 - this.computedSizeW(this.logo.width / 4), this.computedSizeH(72), this.computedSizeW(this.logo.width / 2), this.computedSizeW(this.logo.height / 2));

        const isMuisc = $cache.getGameData('music');
        const musicBtn = isMuisc ? this.musicOn : this.musicOff;

        offCanvas2d.drawImage(musicBtn, 0, 0, musicBtn.width, musicBtn.height, winWidth / 2 - this.computedSizeW(180), this.computedSizeH(24), this.computedSizeW(musicBtn.width / 2), this.computedSizeW(musicBtn.height / 2));

        // 如果已经登录
        if ($wx.isLogin) {
            offCanvas2d.drawImage(this.startBtn, 0, 0, this.startBtn.width, this.startBtn.height, winWidth / 2 - this.computedSizeW(this.startBtn.width / 4), this.computedSizeH(525), this.computedSizeW(this.startBtn.width / 2), this.computedSizeW(this.startBtn.height / 2));
            this.bindStartBtn();
        } else {
            $wx.startBtn.show();
        }

        offCanvas2d.drawImage(this.leaderboard, 0, 0, this.leaderboard.width, this.leaderboard.height, winWidth / 2 - this.computedSizeW(this.leaderboard.width / 4 - 55), this.computedSizeH(602), this.computedSizeW(this.leaderboard.width / 2), this.computedSizeW(this.leaderboard.height / 2));
        offCanvas2d.drawImage(this.carport, 0, 0, this.carport.width, this.carport.height, winWidth / 2 - this.computedSizeW(this.carport.width / 4 + 55), this.computedSizeH(602), this.computedSizeW(this.carport.width / 2), this.computedSizeW(this.carport.height / 2));

        // 是否含有新解锁车辆
        hasNew && offCanvas2d.drawImage(this.carNew, 0, 0, this.carNew.width, this.carNew.height, winWidth / 2 - this.computedSizeW(15), this.computedSizeH(598), this.computedSizeW(this.carNew.width / 2), this.computedSizeW(this.carNew.height / 2));

        offCanvas2d.drawImage(this.qr, 0, 0, this.qr.width, this.qr.height, this.computedSizeW(100), this.computedSizeH(670), this.computedSizeW(this.qr.width / 2), this.computedSizeW(this.qr.height / 2));
        offCanvas2d.drawImage(this.groupLeaderboard, 0, 0, this.groupLeaderboard.width, this.groupLeaderboard.height, winWidth / 2 - this.computedSizeW(this.groupLeaderboard.width / 4), this.computedSizeH(670), this.computedSizeW(this.groupLeaderboard.width / 2), this.computedSizeW(this.groupLeaderboard.height / 2));
        offCanvas2d.drawImage(this.wechat, 0, 0, this.wechat.width, this.wechat.height, this.computedSizeW(270), this.computedSizeH(670), this.computedSizeW(this.wechat.width / 2), this.computedSizeW(this.wechat.height / 2));

        texture2d.needsUpdate = true;
    }
}




