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
        const {cvs, cvs2d, texture2d, mesh} = this.createCanvas2d('3d', 'main', 105, 205);

        scoreCanvas2d = cvs2d;
        scoreTexture2d = texture2d;
        scoreCanvasSprite = mesh;

        scoreCanvasSprite.position.set(-6, 82.8, 9);
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
