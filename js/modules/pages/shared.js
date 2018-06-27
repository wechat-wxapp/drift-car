import UTIL from "../util";

/**
 * 2d canvas函数
 */
export default class Shared extends UTIL {
    constructor() {
        super();
        this.page();

        this.bindEvent();
    }

    bindEvent() {
        this.bindReStart();
        this.bindGoHome();
    }

    bindReStart() {
        const x1 = this.computedSizeW(250);
        const x2 = this.computedSizeW(350);
        const y1 = this.computedSizeH(583);
        const y2 = this.computedSizeH(610);

        events.click({
            name: 'restartBtn',
            pageName: 'endPage',
            point: [x1, y1, x2, y2],
            cb: () => {
                $wx.sendMessage('clear');

                // 重启游戏
                this.restart();

                currentPage = 'gamePage';
            }
        });
    }

    bindGoHome() {
        const x1 = this.computedSizeW(175);
        const x2 = this.computedSizeW(245);
        const y1 = this.computedSizeH(655);
        const y2 = this.computedSizeH(680);

        events.click({
            name: 'goHomeBtn',
            pageName: 'endPage',
            point: [x1, y1, x2, y2],
            cb: () => {
                $wx.sendMessage('clear');

                offCanvasSprite.position.x += speedRecord.x;
                offCanvasSprite.position.z -= speedRecord.z;

                startPage.setTexture();
                currentPage = 'startPage';
            }
        });
    }

    /**
     * 创建2d画布
     */
    page() {
        // const offCanvas = wx.createCanvas();

        const sharedCanvas = openDataContext.canvas;

        // offCanvas.style.width = winWidth;
        // offCanvas.style.height = winHeight;

        sharedCanvas.height = winHeight * window.devicePixelRatio;
        sharedCanvas.width = winWidth * window.devicePixelRatio;

        const sharedCanvas2d = sharedCanvas.getContext("2d");

        sharedCanvas2d.scale(window.devicePixelRatio, window.devicePixelRatio);

        sharedTexture2d = new THREE.Texture(sharedCanvas);
        sharedTexture2d.minFilter = THREE.LinearFilter;

        // texture2d.needsUpdate = true;

        const spriteMaterial = new THREE.SpriteMaterial({
            map: sharedTexture2d
        });

        sharedCanvasSprite = new THREE.Sprite(spriteMaterial);
        sharedCanvasSprite.position.set(-11.75, 78.44, 20);

        const scaleX = Math.floor(winHeight / winWidth * 10) / 10 === 1.7 ? 13.5 : this.computedSizeW(13.5);

        sharedCanvasSprite.scale.set(scaleX, 23.95, 1);

        scene.add(sharedCanvasSprite);
    }
}