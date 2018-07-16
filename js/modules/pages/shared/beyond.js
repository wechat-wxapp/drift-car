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
        const {cvs, cvs2d, texture2d, mesh} = this.createCanvas2d('3d', 'shared');

        this.sharedCanvas = cvs;
        const sharedCanvas2d = this.sharedCanvas.getContext("2d");
        beyondTexture2d = texture2d;
        beyondCanvasSprite = mesh;

        beyondCanvasSprite.position.set(-21.75, 81, 20);

        beyondCanvasSprite.scale.set(1.5, 1.5, 1);

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
