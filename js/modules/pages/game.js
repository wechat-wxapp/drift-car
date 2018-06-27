/**
 * 开始页函数
 */
export default class Game {
    constructor() {
        this.scoreBg = imgList.scoreBg;

        // 创建页面
        this.page();

        // 绑定点击事件
        this.buildPage();
    }

    /**
     * 绑定事件, 创建开始页
     * */
    buildPage() {

    }

    /**
     * 开始页
     */
    page(time) {
        offCanvas2d.clearRect(0, 0, winWidth, winHeight);

        // offCanvas2d.drawImage(this.scoreBg, 0, 0, this.scoreBg.width, this.scoreBg.height, 30, 0, this.scoreBg.width / 2, this.scoreBg.height / 2);
        //
        // offCanvas2d.fillStyle = "#fff";
        // offCanvas2d.font = "bold 20px Arial";
        // offCanvas2d.textAlign = "center";
        // offCanvas2d.fillText(score, 80, 42);
        //
        // if (time) {
        //     offCanvas2d.font = "bold 70px Arial";
        //     offCanvas2d.fillText(time, winWidth / 2, winHeight / 2);
        // }

        texture2d.needsUpdate = true;
    }
}
