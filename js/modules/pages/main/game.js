import UTIL from "../../util";
import IO from '../../../libs/io';

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
        this.restart();

        // 设置页面target
        currentPage = 'gamePage';

        // sharedClass.carListPage();
        // pageClass.clear2d();
         // gamePage = new pageGame();

//                 scorePage.setTexture();

//                 // this.restart();
                // IO.getWorldRank().then(e=>{
                //     let res = {
                //             "payload": {
                //                 "user": {
                //                     "openid": "111",
                //                     "nickname": "脚皮哥",
                //                     "headimgurl": "https://wx.qlogo.cn/mmopen/vi_32/pcbt1wicwoepR0Kb8qoDedsn0QEZjgxOntxeSWAwdBUxaVon9MUpujv7nvupkg3mhMKibBgaljtciaA0QyZ8KzgKA/132",
                //                     "score": "20",
                //                     "rank": 3
                //                 },
                //                 "ranks": [
                //                     {
                //                         "openid": "12111",
                //                         "score": "122",
                //                         "rank": "1",
                //                         "headimgurl": "https://wx.qlogo.cn/mmopen/vi_32/pcbt1wicwoepR0Kb8qoDedsn0QEZjgxOntxeSWAwdBUxaVon9MUpujv7nvupkg3mhMKibBgaljtciaA0QyZ8KzgKA/132",
                //                         "nickname": "脚1皮哥",
                //                     },
                //                     {
                //                         "openid": "1111",
                //                         "score": "122",
                //                         "rank": "2",
                //                         "headimgurl": "https://wx.qlogo.cn/mmopen/vi_32/pcbt1wicwoepR0Kb8qoDedsn0QEZjgxOntxeSWAwdBUxaVon9MUpujv7nvupkg3mhMKibBgaljtciaA0QyZ8KzgKA/132",
                //                         "nickname": "脚12312皮哥",
                //                     },
                //                     {
                //                         "openid": "111",
                //                         "headimgurl": "https://wx.qlogo.cn/mmopen/vi_32/pcbt1wicwoepR0Kb8qoDedsn0QEZjgxOntxeSWAwdBUxaVon9MUpujv7nvupkg3mhMKibBgaljtciaA0QyZ8KzgKA/132",
                //                         "nickname": "脚皮哥",
                //                         "score": "20",
                //                         "rank": "3"
                //                     }
                //                 ]
                //             },
                //             "code": "0",
                //             "msg": "ok"
                //         }
                //     $wx.sendMessage('worldRank',{ page: rankCurrentPage , shareTicket: $wx.shareTicket ,user:res.payload.user ,ranks:res.payload.ranks});
                // })
                // $wx.sendMessage('groupRank',{ page: rankCurrentPage , shareTicket: $wx.shareTicket });
                // $wx.sendMessage('friendRank',{ page: rankCurrentPage , shareTicket: $wx.shareTicket});

//                 sharedTexture2d.needsUpdate = true;

//                 pageClass.clear2d();

//                 // 设置页面target
                // currentPage = 'worldRank';
                // currentPage = 'friendRank';
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
