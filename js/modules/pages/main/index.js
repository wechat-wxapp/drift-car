import UTIL from "../../util";

import Shared from '../shared/index';
import Beyond from '../shared/beyond';

import pageLoading from './loading';

/**
 * 2d canvas函数
 */
export default class Page extends UTIL {
    currentSpeedRecord = {
        x: 0,
        z: 0
    };

    constructor() {
        super();
        this.page();

        sharedClass = new Shared();
        // beyondClass = new Beyond();

        // 实例化加载页
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

    /**
     * 设置当前未知
     * */
    setPosition() {
        // offCanvasSprite.position.x += speedRecord.x - this.currentSpeedRecord.x;
        // offCanvasSprite.position.z -= speedRecord.z - this.currentSpeedRecord.z;
        //
        // this.currentSpeedRecord = speedRecord;
        offCanvasSprite.position.set(-11.75, 78.44, 20);
        offCanvasSprite.position.x += speedRecord.x;
        offCanvasSprite.position.z -= speedRecord.z;
    }
}
