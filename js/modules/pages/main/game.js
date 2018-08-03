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
     * 检测当前网络情况
     * */
    startGame() {
        if (!connected) {
            $loader.showInternetError({
                title: '警告',
                content: '当前网络环境不稳定，进行游戏可能会造成无法上传分数',
                confirmText: '开始游戏',
                confirmCb: () => {
                    this.gameStart();
                }
            });
            return false;
        }

        this.gameStart();
    }

    /**
     * 开始游戏
     * */
    gameStart() {
        // 关闭按钮
        $wx.startBtn.hide();

        // 初始化分数空间
        scorePage.setTexture();

        // 清除其余2d画布
        pageClass.clear2d();

        // 第一次进行游戏(并不是判断是否新用户)
        if (restartKey) {
            restartKey = false;

            this.end();
            this.readyMusic();
        } else {
            // 开始游戏
            this.restart();
        }

        // sharedClass.reseurPage();
        // beyondClass.beyondPage();
        // beyondClass.beyondPage();
    }

    /**
     * 开始页
     */
    page(time) {
        offCanvas2d.clearRect(0, 0, winWidth, winHeight);

        if (time) {
            offCanvas2d.fillStyle = "#ff7700";
            offCanvas2d.font = "bold 70px Arial";
            offCanvas2d.fillText(time, winWidth / 2, winHeight / 2 - this.computedSizeW(65));

            // 描边
            offCanvas2d.strokeStyle = "#fff";
            offCanvas2d.lineWidth = 3;
            offCanvas2d.strokeText(time, winWidth / 2, winHeight / 2 - this.computedSizeW(65));
        }

        texture2d.needsUpdate = true;
    }
}
