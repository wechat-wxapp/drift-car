import UTIL from "../../util";

import pageScore from './score';

/**
 * 2d canvas函数
 */
export default class Score extends UTIL {
    constructor() {
        super();
        this.page();

        scorePage = new pageScore();
    }

    /**
     * 创建2d画布
     */
    page() {
        const offCanvas = wx.createCanvas();

        offCanvas.height = 205 * window.devicePixelRatio;
        offCanvas.width = 105 * window.devicePixelRatio;

        scoreCanvas2d = offCanvas.getContext("2d");

        scoreCanvas2d.scale(window.devicePixelRatio, window.devicePixelRatio);

        scoreTexture2d = new THREE.Texture(offCanvas);
        scoreTexture2d.minFilter = THREE.LinearFilter;

        const spriteMaterial = new THREE.SpriteMaterial({
            map: scoreTexture2d
        });

        scoreCanvasSprite = new THREE.Sprite(spriteMaterial);
        scoreCanvasSprite.position.set(-10, 82.8, 9);

        scoreCanvasSprite.scale.set(4, 7.5, 1);

        scene.add(scoreCanvasSprite);
    }

    /**
     * 清空2d画布
     * */
    clear2d() {
        scoreCanvas2d.clearRect(0, 0, 205, 105);
        scoreTexture2d.needsUpdate = true;
    }
}
