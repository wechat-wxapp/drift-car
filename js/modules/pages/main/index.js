import UTIL from "../../util";

import Shared from '../shared/index';
import Beyond from '../shared/beyond';

import pageLoading from './loading';

/**
 * 2d canvas函数
 */
export default class Page extends UTIL {
    constructor(renderer) {
        super();

        uiScene = new THREE.Scene();
        this.renderer = renderer;
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

    render() {
        this.renderer.render(uiScene, this.camera)
    }
}
