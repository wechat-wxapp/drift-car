/**
 * 游戏页
 */
export default class Game {
    constructor() {}

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
