import UTIL from "../../util";

/**
 * 游戏页
 */
export default class Game extends UTIL {
    constructor() {
        super();
    }

    /**
     * 开始游戏
     * */
    startGame() {
        // 关闭按钮
        wxConfig.startBtn.hide();

        // 初始化分数空间
        scorePage.setTexture();

        // 清除其余2d画布
        pageClass.clear2d();

        // 开始游戏
        // this.restart();

        // 设置页面target
        // currentPage = 'gamePage';

        // sharedClass.carListPage();
        // pageClass.clear2d();
//  gamePage = new pageGame();

//                 scorePage.setTexture();

//                 // this.restart();

//                 // $wx.sendMessage('worldRank',{ page: rankCurrentPage , shareTicket: $wx.shareTicket });
                // $wx.sendMessage('groupRank',{ page: rankCurrentPage , shareTicket: $wx.shareTicket });
                $wx.sendMessage('friendRank',{ page: rankCurrentPage , shareTicket: $wx.shareTicket});

//                 sharedTexture2d.needsUpdate = true;

//                 pageClass.clear2d();

//                 // 设置页面target
                currentPage = 'friendRank';
//                 // currentPage = 'gamePage';

    }

    /**
     * 开始页
     */
    page(time) {
        offCanvas2d.clearRect(0, 0, winWidth, winHeight);

        if (time) {
            offCanvas2d.fillStyle = "#fff";

            offCanvas2d.font = "bold 70px Arial";
            offCanvas2d.fillText(time, winWidth / 2, winHeight / 2);
        }

        texture2d.needsUpdate = true;
    }
}
