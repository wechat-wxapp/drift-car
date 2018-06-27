import UTIL from "../util";

/**
 * 2d canvas函数
 */
export default class Page extends UTIL {
    constructor() {
        super();
        this.page();
    }

    /**
     * 创建2d画布
     */
    page() {
        const offCanvas = wx.createCanvas();

        // const offCanvas = openDataContext.canvas;

        // offCanvas.style.width = winWidth;
        // offCanvas.style.height = winHeight;



        offCanvas.height = winHeight * window.devicePixelRatio;
        offCanvas.width = winWidth * window.devicePixelRatio;

        offCanvas2d = offCanvas.getContext("2d");

        offCanvas2d.scale(window.devicePixelRatio, window.devicePixelRatio);

        texture2d = new THREE.Texture(offCanvas);
        texture2d.minFilter = THREE.LinearFilter;

        texture2d.needsUpdate = true;

        const spriteMaterial = new THREE.SpriteMaterial({
            map: texture2d
        });

        offCanvasSprite = new THREE.Sprite(spriteMaterial);
        offCanvasSprite.position.set(-11.75, 78.44, 20);

        const scaleX = Math.floor(winHeight / winWidth * 10) / 10 === 1.7 ? 13.5 : this.computedSizeW(13.5);

        offCanvasSprite.scale.set(scaleX, 23.95, 1);

        scene.add(offCanvasSprite);

        // // var geometry = new THREE.PlaneGeometry(42, 75)
        // var geometry = new THREE.PlaneGeometry(this.computedSize(42), 75)
        // var material = new THREE.MeshBasicMaterial({
        //     map: texture2d
        // })
        // offCanvasSprite = new THREE.Mesh(geometry, material);
        // offCanvasSprite.position.set(-1.1, 52.8, 2)
        // offCanvasSprite.rotation.set(-0.9577585082113045, -0.3257201862210706, -0.42691147594250245);
        // scene.add(offCanvasSprite);
    }
}
