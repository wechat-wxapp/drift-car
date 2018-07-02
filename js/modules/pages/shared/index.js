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
        width: winWidth,
        height: winHeight
    };

    constructor() {
        super();
        this.page();

        this.bindEvent();
    }

    bindEvent() {
        this.bindReStart();
        this.bindGoHome();
        this.bindPrePage();
        this.bindNextPage();
    }

    bindReStart() {
        const x1 = this.computedSizeW(250);
        const x2 = this.computedSizeW(350);
        const y1 = this.computedSizeH(583);
        const y2 = this.computedSizeH(610);

        events.click({
            name: 'restartBtn',
            pageName: 'endPage',
            point: [x1, y1, x2, y2],
            cb: () => {
                // $wx.sendMessage('clear');
                this.clear2d();
                // 重启游戏
                this.restart();

                currentPage = 'gamePage';
            }
        });
    }

    bindGoHome() {
        const x1 = this.computedSizeW(175);
        const x2 = this.computedSizeW(245);
        const y1 = this.computedSizeH(655);
        const y2 = this.computedSizeH(680);

        events.click({
            name: 'goHomeBtn',
            pageName: 'endPage',
            point: [x1, y1, x2, y2],
            cb: () => {
                this.clear2d();

                offCanvasSprite.position.x += speedRecord.x;
                offCanvasSprite.position.z -= speedRecord.z;

                startPage.setTexture();
                currentPage = 'startPage';
            }
        });
    }

    // 上一页按钮
    bindPrePage() {
        const x1 = this.computedSizeW(254);
        const x2 = this.computedSizeW(291);
        const y1 = this.computedSizeH(158);
        const y2 = this.computedSizeH(171);

        events.click({
            name: 'prePageBtn',
            pageName: 'rankPage',
            point: [x1, y1, x2, y2],
            cb: () => {
                // rankCurrentPage = rankCurrentPage <= 1 ? 1 : rankCurrentPage--;
                $wx.sendMessage('rank',{ page: rankCurrentPage, common: 0 });
                sharedTexture2d.needsUpdate = true;
            }
        })
    }

    // 下一页按钮
    bindNextPage() {
        const x1 = this.computedSizeW(311);
        const x2 = this.computedSizeW(363);
        const y1 = this.computedSizeH(157);
        const y2 = this.computedSizeH(172);

        events.click({
            name: 'nextPageBtn',
            pageName: 'rankPage',
            point: [x1, y1, x2, y2],
            cb: () => {
                // rankCurrentPage = rankCurrentPage + 1;
                $wx.sendMessage('rank',{ page: rankCurrentPage, common: 1 });
                sharedTexture2d.needsUpdate = true;
            }
        })
    }

    /**
     * 创建2d画布
     */
    page() {
        this.sharedCanvas = openDataContext.canvas;

        this.sharedCanvas.height = winHeight * window.devicePixelRatio;
        this.sharedCanvas.width = winWidth * window.devicePixelRatio;

        const sharedCanvas2d = this.sharedCanvas.getContext("2d");

        sharedCanvas2d.scale(window.devicePixelRatio, window.devicePixelRatio);

        sharedTexture2d = new THREE.Texture(this.sharedCanvas);
        sharedTexture2d.minFilter = THREE.LinearFilter;

        const spriteMaterial = new THREE.SpriteMaterial({
            map: sharedTexture2d
        });

        sharedCanvasSprite = new THREE.Sprite(spriteMaterial);
        sharedCanvasSprite.position.set(-11.75, 78.44, 20);

        const scaleX = Math.floor(winHeight / winWidth * 10) / 10 === 1.7 ? 13.5 : this.computedSizeW(13.5);

        sharedCanvasSprite.scale.set(scaleX, 23.95, 1);

        scene.add(sharedCanvasSprite);
    }

    endPage() {
        $wx.sendMessage('end',{ page: 1 });

        this.setPosition();

        sharedTexture2d.needsUpdate = true;
    }

    clear2d() {
        $wx.sendMessage('clear');
        sharedTexture2d.needsUpdate = true;
    }

    carListPage() {
        $wx.sendMessage('carport');

        this.setPosition();

        sharedTexture2d.needsUpdate = true;
    }

    setPosition() {
        sharedCanvasSprite.position.x += speedRecord.x - this.currentSpeedRecord.x;
        sharedCanvasSprite.position.z -= speedRecord.z - this.currentSpeedRecord.z;

        this.currentSpeedRecord = speedRecord;
    }
}
