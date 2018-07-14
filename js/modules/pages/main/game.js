import UTIL from "../../util";
import Speeder from "../../speeder";

/**
 * 游戏页
 */
export default class Game extends UTIL {
    constructor() {
        super();

        // 绑定漂移按钮
        this.bindDriftBtn();
    }

    /**
     * 绑定漂移按钮
     * */
    bindDriftBtn() {
        events.click({
            name: 'playGame',
            pageName: 'gamePage',
            point: [0, 0, winWidth, winHeight],
            cb: () => {
                this.drift();
            }
        });
    }

    /**
     * 漂移函数
     * */
    drift() {
        if (startKey) {
            // 播放漂移音乐
            music.playDrift();

            // 增加转弯次数
            turn++;
            if((currentSpeed >= (speed * 3 / 4)) || currentSpeed > 1.9) isTurning = true;
            
        }
    }

    /**
     * 开始游戏
     * */
    startGame() {
        // 关闭按钮
        $wx.startBtn.hide();

        // 初始化分数空间
        scorePage.setTexture();

        // 清除其余2d画布
        pageClass.clear2d();

        // 开始游戏
        this.restart();

        // sharedClass.endPage();
        // beyondClass.beyondPage();
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
