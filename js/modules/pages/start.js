import UTIL from '../util';

/**
 * 开始页函数
 */
export default class Start extends UTIL {
    constructor() {
        super();
        this.page();
    }

    /**
     * 绑定事件, 创建开始页
     * */
    buildPage() {
        events.click('startBtn', () => {
            scene.remove(this.sprite);

            // 开始播放音效
            this.readyMusic();

            currentPage = 'gamePage';

            setTimeout(() => {
                startKey = true;
            }, 3000);
        });

        scene.add(this.sprite);
    }

    /**
     * 开始页
     */
    page() {
        const offCanvas = wx.createCanvas();
        offCanvas.width = winWidth;
        offCanvas.height = winHeight;

        const ctx = offCanvas.getContext("2d");

        ctx.fillStyle = "rgba(0,0,0, 0.5)";
        ctx.fillRect(0, 0, winWidth, winHeight);

        ctx.fillStyle = "#fff";
        ctx.font = "bold 40px Arial";
        ctx.textAlign = "center";
        ctx.fillText("我是蚂蚁", winWidth / 2, 200);

        ctx.fillStyle = "#fff";
        ctx.font = "bold 20px Arial";
        ctx.textAlign = "center";
        ctx.fillText("开始游戏", winWidth / 2, 500);

        const texture = new THREE.Texture(offCanvas);
        texture.needsUpdate = true;

        const spriteMaterial = new THREE.SpriteMaterial({
            map: texture
        });
        this.sprite = new THREE.Sprite(spriteMaterial);
        this.sprite.position.set(-11.5, 78.3, 20);
        this.sprite.scale.set(14.5, 25, 1);
    }
}
