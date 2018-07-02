import UTIL from '../../util';

/**
 * 开始页函数
 */
export default class Start extends UTIL {
    isBindStartBtn = false;

    constructor() {
        super();

        this.bg = imgList.indexBg;
        this.startBtn = imgList.startBtn;
        this.leaderboard = imgList.leaderboard;
        this.checkLeaderboard = imgList.checkLeaderboard;
        this.startBottomBtn1 = imgList.startBottomBtn1;
        this.startBottomBtn2 = imgList.startBottomBtn2;
        this.startBottomBtn3 = imgList.startBottomBtn3;
        this.startBottomBtn4 = imgList.startBottomBtn4;

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
        wxConfig.isLogin === true && this.bindStartBtn();
        this.bindMusicBtn();

        // 排行榜
        this.bindRankBtn();
        // 群排行榜
        this.bindGroupRankBtn();
        // 泡妞神器
        this.bindQrBtn();
        // 公众号
        this.bindWechatBtn();
    }

    /**
     * 绑定开始按钮
     * */
    bindStartBtn() {
        // 防止多次绑定
        if (this.isBindStartBtn) return false;

        const x1 = this.computedSizeW(130);
        const x2 = this.computedSizeW(295);
        const y1 = this.computedSizeH(245);
        const y2 = this.computedSizeH(305);

        events.click({
            name: 'startBtn',
            pageName: 'startPage',
            point: [x1, y1, x2, y2],
            cb: () => {
                // 实例化游戏页面
                // gamePage = new pageGame();

                // scorePage.setTexture();

                // // this.restart();

                // // $wx.sendMessage('worldRank',{ page: rankCurrentPage , shareTicket: $wx.shareTicket });
                // $wx.sendMessage('groupRank',{ page: rankCurrentPage , shareTicket: $wx.shareTicket });
                // // $wx.sendMessage('friendRank',{ page: rankCurrentPage , shareTicket: $wx.shareTicket});

                // sharedTexture2d.needsUpdate = true;

                // pageClass.clear2d();

                // // 设置页面target
                // currentPage = 'groupRank';
                // // currentPage = 'gamePage';


                gamePage.startGame();
            }
        });

        this.isBindStartBtn = true;
    }

    /**
     * 绑定音乐按钮
     * */
    bindMusicBtn() {
        const x1 = this.computedSizeW(65);
        const x2 = this.computedSizeW(100);
        const y1 = this.computedSizeH(655);
        const y2 = this.computedSizeH(685);

        events.click({
            name: 'musicBtn',
            pageName: 'startPage',
            point: [x1, y1, x2, y2],
            cb: () => {
                musicKey = !musicKey;
            }
        });
    }

    /**
     * 绑定排行榜按钮
     * */
    bindRankBtn() {
        const x1 = this.computedSizeW(150);
        const x2 = this.computedSizeW(265);
        const y1 = this.computedSizeH(315);
        const y2 = this.computedSizeH(355);

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
     * 绑定排行榜按钮
     * */
    bindGroupRankBtn() {
        const x1 = this.computedSizeW(165);
        const x2 = this.computedSizeW(245);
        const y1 = this.computedSizeH(365);
        const y2 = this.computedSizeH(390);

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
        const x1 = this.computedSizeW(145);
        const x2 = this.computedSizeW(190);
        const y1 = this.computedSizeH(640);
        const y2 = this.computedSizeH(700);

        events.click({
            name: 'qrBtn',
            pageName: 'startPage',
            point: [x1, y1, x2, y2],
            cb: () => {
                sharedClass.qrPage();
                currentPage = 'qrPage';
            }
        });
    }

    /**
     * 绑定公众号按钮
     * */
    bindWechatBtn() {
        const x1 = this.computedSizeW(310);
        const x2 = this.computedSizeW(350);
        const y1 = this.computedSizeH(640);
        const y2 = this.computedSizeH(690);

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
     * 开始页
     */
    setTexture() {
        currentPage = 'startPage';

        offCanvas2d.clearRect(0, 0, winWidth, winHeight);

        offCanvas2d.fillStyle = "#647fdc";
        offCanvas2d.fillRect(0, 0, winWidth, winHeight);

        offCanvas2d.drawImage(this.bg, 0, 0, this.bg.width, this.bg.height, 0, 0, winWidth, winHeight);

        // 如果已经登录
        if (wxConfig.isLogin) {
            offCanvas2d.drawImage(this.startBtn, 0, 0, this.startBtn.width, this.startBtn.height, winWidth / 2 - this.computedSizeW(this.startBtn.width / 4), this.computedSizeH(250), this.computedSizeW(149), this.computedSizeW(60));
            this.bindStartBtn();
        } else {
            wxConfig.startBtn.show();
        }

        offCanvas2d.drawImage(this.leaderboard, 0, 0, this.leaderboard.width, this.leaderboard.height, winWidth / 2 - this.computedSizeW(this.leaderboard.width / 4), this.computedSizeH(320), this.computedSizeW(this.leaderboard.width / 2), this.computedSizeW(this.leaderboard.height / 2));
        offCanvas2d.drawImage(this.checkLeaderboard, 0, 0, this.checkLeaderboard.width, this.checkLeaderboard.height, winWidth / 2 - this.computedSizeW(this.checkLeaderboard.width / 4), this.computedSizeH(370), this.computedSizeW(this.checkLeaderboard.width / 2), this.computedSizeW(this.checkLeaderboard.height / 2));

        const bottomSize = winWidth / 6;

        offCanvas2d.drawImage(this.startBottomBtn1, 0, 0, this.startBottomBtn1.width, this.startBottomBtn1.height, bottomSize * 1.2 - this.startBottomBtn1.width / 4, winHeight - this.computedSizeW(95), this.computedSizeW(this.startBottomBtn1.width / 2), this.computedSizeW(this.startBottomBtn1.height / 2));
        offCanvas2d.drawImage(this.startBottomBtn2, 0, 0, this.startBottomBtn2.width, this.startBottomBtn2.height, bottomSize * 2.4  - this.startBottomBtn2.width / 4, winHeight - this.computedSizeW(95), this.computedSizeW(this.startBottomBtn2.width / 2), this.computedSizeW(this.startBottomBtn2.height / 2));
        offCanvas2d.drawImage(this.startBottomBtn3, 0, 0, this.startBottomBtn3.width, this.startBottomBtn3.height, bottomSize * 3.6 - this.startBottomBtn3.width / 4, winHeight - this.computedSizeW(95), this.computedSizeW(this.startBottomBtn3.width / 2), this.computedSizeW(this.startBottomBtn3.height / 2));
        offCanvas2d.drawImage(this.startBottomBtn4, 0, 0, this.startBottomBtn4.width, this.startBottomBtn4.height, bottomSize * 4.8 - this.startBottomBtn4.width / 4, winHeight - this.computedSizeW(95), this.computedSizeW(this.startBottomBtn4.width / 2), this.computedSizeW(this.startBottomBtn4.height / 2));

        texture2d.needsUpdate = true;
    }
}




