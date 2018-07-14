import UTIL from "../../util";

import Shared from '../shared/index';
import Beyond from '../shared/beyond';

import pageLoading from './loading';

let instance

/**
 * 2d canvas函数
 */
export default class Page extends UTIL {
    constructor(renderer) {
        super();

        if (instance) {
            return instance
        }
        instance = this

        uiScene = new THREE.Scene();
        this.renderer = renderer
        this.camera = new THREE.OrthographicCamera(winWidth / -2, winWidth / 2, winHeight / 2, winHeight / -2, 0, 10000);

        this.page();

        sharedClass = new Shared();
        beyondClass = new Beyond();

        // 实例化加载页
        loadingPage = new pageLoading();
    }

    /**
     * 创建2d画布
     */
    page() {
        // offCanvas = wx.createCanvas();
        //
        // offCanvas.height = winHeight * window.devicePixelRatio;
        // offCanvas.width = winWidth * window.devicePixelRatio;
        //
        // offCanvas2d = offCanvas.getContext("2d");
        //
        // offCanvas2d.scale(window.devicePixelRatio, window.devicePixelRatio);
        //
        // // texture2d = new THREE.Texture(offCanvas);
        // // texture2d.minFilter = THREE.LinearFilter;
        // //
        // // const spriteMaterial = new THREE.SpriteMaterial({
        // //     map: texture2d
        // // });
        //
        // // offCanvasSprite = new THREE.Sprite(spriteMaterial);
        // // offCanvasSprite.position.set(-11.75, 78.44, 20);
        //
        // // const scaleX = Math.floor(winHeight / winWidth * 10) / 10 === 1.7 ? 13.5 : this.computedSizeW(13.5);
        //
        // // offCanvasSprite.scale.set(scaleX, 23.95, 1);
        //
        // // scene.add(offCanvasSprite);
        //
        // texture2d = new THREE.CanvasTexture(offCanvas)
        //
        // texture2d.minFilter = texture2d.magFilter = THREE.LinearFilter
        // // texture2d.needsUpdate = true
        //
        // let geometry = new THREE.PlaneGeometry(winWidth, winHeight)
        //
        // let material = new THREE.MeshBasicMaterial({ map: texture2d, transparent: true })
        //
        // offCanvasSprite = new THREE.Mesh(geometry, material)
        //
        // uiScene.add(offCanvasSprite);

        const {cvs, cvs2d, texture2d: t2d, mesh} = this.createCanvas2d('2d', 'main', winWidth, winHeight);

        offCanvas2d = cvs2d;
        texture2d = t2d;

        offCanvasSprite = mesh;

        uiScene.add(mesh);

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
        offCanvasSprite.position.set(-11.75, 78.44, 20);
        offCanvasSprite.position.x += speedRecord.x;
        offCanvasSprite.position.z -= speedRecord.z;
    }

    render() {
        this.renderer.render(uiScene, this.camera)
    }
}
