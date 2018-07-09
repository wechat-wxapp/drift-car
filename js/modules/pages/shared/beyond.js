import UTIL from "../../util";

/**
 * 2d canvas函数
 */
export default class Shared extends UTIL {

    constructor() {
        super();
        this.page();

        this.bindDriftBtn();
    }

    bindDriftBtn() {
        events.click({
            name: 'qwe',
            pageName: 'beyondPage',
            point: [0, 0, winWidth, winHeight],
            cb: () => {
                this.clear2d();

                sharedClass.endPage();
            }
        });
    }

    /**
     * 创建2d画布
     */
    page() {
        this.sharedCanvas = openDataContext.canvas;

        // this.sharedCanvas.width = 50 * window.devicePixelRatio;
        // this.sharedCanvas.height = 50 * window.devicePixelRatio;

        const sharedCanvas2d = this.sharedCanvas.getContext("2d");

        // sharedCanvas2d.scale(window.devicePixelRatio, window.devicePixelRatio);

        beyondTexture2d = new THREE.Texture(this.sharedCanvas);
        beyondTexture2d.minFilter = THREE.LinearFilter;

        const spriteMaterial = new THREE.SpriteMaterial({
            map: beyondTexture2d
        });

        beyondCanvasSprite = new THREE.Sprite(spriteMaterial);
        beyondCanvasSprite.position.set(-11.75, 78.44, 20);

        beyondCanvasSprite.scale.set(2, 2, 1);

        scene.add(beyondCanvasSprite);
    }

    /**
     * 超越好友页
     * */
    beyondPage() {
        this.setCanvasSize();

        // this.sharedCanvas.width = 50 * window.devicePixelRatio;
        // this.sharedCanvas.height = 50 * window.devicePixelRatio;

        // currentPage = 'beyondPage';

        this.showPage('beyond', { score });
    }

    setCanvasSize() {
        this.sharedCanvas.width = 50 * window.devicePixelRatio;
        this.sharedCanvas.height = 50 * window.devicePixelRatio;

        currentShared = 'beyond';
    }

    /**
     * 重设超越好友本地数据配置
     * */
    reset() {
        this.showPage('beyondReset');
    }

    showPage(command, data, clear) {
        $wx.sendMessage(command, data);

        beyondTexture2d.needsUpdate = true;
    }

    clear2d() {
        $wx.sendMessage('clear');
        beyondTexture2d.needsUpdate = true;
    }
}
