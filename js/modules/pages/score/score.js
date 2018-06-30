/**
 * 开始页函数
 */
export default class Loader {
    constructor() {
        this.scoreBg = imgList.scoreBg;
    }

    /**
     * 更新页面内容
     * */
    setTexture() {
        scoreCanvas2d.clearRect(0, 0, 205, 105);

        scoreCanvas2d.drawImage(this.scoreBg, 0, 0, this.scoreBg.width, this.scoreBg.height, 0, 0, this.scoreBg.width / 2, this.scoreBg.height / 2);

        scoreCanvas2d.fillStyle = "#fff";
        scoreCanvas2d.font = "bold 20px Arial";
        scoreCanvas2d.textAlign = "center";
        scoreCanvas2d.fillText(score, 50, 42);

        scoreTexture2d.needsUpdate = true;
    }
}
