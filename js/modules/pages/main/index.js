import UTIL from "../../util";

import pageLoading from './loading';
import Shared from '../shared/index';

/**
 * 2d canvas函数
 */
export default class Page extends UTIL {
    constructor() {
        super();
        this.page();

        sharedClass = new Shared();
        loadingPage = new pageLoading();
    }

    /**
     * 创建2d画布
     */
    page() {
        const offCanvas = wx.createCanvas();

        offCanvas.height = winHeight * window.devicePixelRatio;
        offCanvas.width = winWidth * window.devicePixelRatio;

        offCanvas2d = offCanvas.getContext("2d");

        offCanvas2d.scale(window.devicePixelRatio, window.devicePixelRatio);

        texture2d = new THREE.Texture(offCanvas);
        texture2d.minFilter = THREE.LinearFilter;

        const spriteMaterial = new THREE.SpriteMaterial({
            map: texture2d
        });

        offCanvasSprite = new THREE.Sprite(spriteMaterial);
        offCanvasSprite.position.set(-11.75, 78.44, 20);

        const scaleX = Math.floor(winHeight / winWidth * 10) / 10 === 1.7 ? 13.5 : this.computedSizeW(13.5);

        offCanvasSprite.scale.set(scaleX, 23.95, 1);

        scene.add(offCanvasSprite);
    }

    /**
     * 清空2d画布
     * */
    clear2d() {
        offCanvas2d.clearRect(0, 0, winWidth, winHeight);
        texture2d.needsUpdate = true;
    }
}
