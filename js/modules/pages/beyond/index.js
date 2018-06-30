import UTIL from "../../util";

/**
 * 2d canvas函数
 */
export default class Shared extends UTIL {
    currentSpeedRecord = {
        x: 0,
        z: 0
    };

    size = {
        width: 40,
        height: 60
    };

    constructor() {
        super();
        this.page();
    }
    /**
     * 创建2d画布
     */
    page() {
        this.sharedCanvas = openDataContext.canvas;

        this.sharedCanvas.width = 50 * window.devicePixelRatio;
        this.sharedCanvas.height = 50 * window.devicePixelRatio;

        const sharedCanvas2d = sharedCanvas.getContext("2d");

        sharedCanvas2d.scale(window.devicePixelRatio, window.devicePixelRatio);

        beyondTexture2d = new THREE.Texture(sharedCanvas);
        beyondTexture2d.minFilter = THREE.LinearFilter;

        const spriteMaterial = new THREE.SpriteMaterial({
            map: beyondTexture2d
        });

        beyondCanvasSprite = new THREE.Sprite(spriteMaterial);
        beyondCanvasSprite.position.set(-11.75, 78.44, 20);

        // const scaleX = Math.floor(winHeight / winWidth * 10) / 10 === 1.7 ? 13.5 : this.computedSizeW(13.5);

        beyondCanvasSprite.scale.set(2, 3, 1);

        scene.add(beyondCanvasSprite);
    }

    beyondPage() {
        this.sharedCanvas.width = 40 * window.devicePixelRatio;
        this.sharedCanvas.height = 60 * window.devicePixelRatio;

        // $wx.setSize(this.size);

        console.log('score: ', score);

        $wx.sendMessage('beyond', { score });

        // this.setPosition();

        beyondTexture2d.needsUpdate = true;
    }

    // setPosition() {
    //     beyondCanvasSprite.position.x += speedRecord.x - this.currentSpeedRecord.x;
    //     beyondCanvasSprite.position.z -= speedRecord.z - this.currentSpeedRecord.z;
    //
    //     this.currentSpeedRecord = speedRecord;
    // }
}
