import UTIL from "../../util";

/**
 * 动画帧
 */
export default class Frame extends UTIL {
    frameNum = -1;
    
    constructor() {
        super();
    
        this.frameWoaBg = imgList.frameWoaBg;
        this.frameWoaBtn = imgList.frameWoaBtn;
        this.bgCenter = {
            x: winWidth / 2 - this.computedSizeW(this.frameWoaBg.width / 4),
            y: winHeight / 2 - this.computedSizeW(this.frameWoaBg.height / 4)
        };
        
        // 开始渲染动画
        // this.runAnimation();
    
        // 绑定点击事件
        this.buildPage();
    }
    
    buildPage() {
        // 绑定返回首页按钮
        this.bindGoHome();
    }
    
    /**
     * 返回主页
     * */
    bindGoHome() {
        const { y: centerY } = this.bgCenter;
        
        const x1 = winWidth / 2 - this.computedSizeW(this.frameWoaBtn.width / 4);
        const x2 = x1 + this.computedSizeW(this.frameWoaBtn.width / 2);
        const y1 = centerY +  this.computedSizeW(this.frameWoaBg.height / 2);
        const y2 = y1 +  + this.computedSizeW(this.frameWoaBtn.height / 2);
        
        events.click({
            name: 'frameGoHomeBtn',
            pageName: 'framePage',
            point: [x1, y1, x2, y2],
            cb: () => {
                this.animation.closeTimeout();
                
                startPage.setTexture();
            }
        });
    }
    
    /**
     * 执行动画帧
     * */
    runAnimation() {
        const showWoaGuid = $cache.getGameData('showWoaGuide');
        if (!showWoaGuid) return false;
        
        if ($wx.isIos()) {
            currentPage = 'framePage';
            this.frameNum = -1;
    
            this.animation = $timer(() => {
                if (this.frameNum >= 59) {
                    this.frameNum = -1;
                }
                this.frameNum++;
                this.updateAnimation(this.frameNum);
            }, 80);
    
            this.setTexture();
        }
    
        $cache.setGameData('showWoaGuide', false);
    }
    
    /**
     * 更新页面内容
     * */
    setTexture() {
        const { x: centerX, y: centerY } = this.bgCenter;
    
        offCanvas2d.fillStyle = 'rgba(0, 0, 0, .8)';
        offCanvas2d.fillRect(0, 0, winWidth, winHeight);
    
        offCanvas2d.drawImage(this.frameWoaBg, 0, 0, this.frameWoaBg.width, this.frameWoaBg.height, centerX, centerY - this.computedSizeW(20), this.computedSizeW(this.frameWoaBg.width / 2), this.computedSizeW(this.frameWoaBg.height / 2));
        offCanvas2d.drawImage(this.frameWoaBtn, 0, 0, this.frameWoaBtn.width, this.frameWoaBtn.height, winWidth / 2 - this.computedSizeW(this.frameWoaBtn.width / 4), centerY +  this.computedSizeW(this.frameWoaBg.height / 2), this.computedSizeW(this.frameWoaBtn.width / 2), this.computedSizeW(this.frameWoaBtn.height / 2));
        
        texture2d.needsUpdate = true;
    }
    
    /**
     * 更新动画帧
     * @params i {Number} 动画帧进度
     * */
    updateAnimation(i) {
        const { y: centerY } = this.bgCenter;
        
        const currentFrame = frame.f1.list[i];
    
        offCanvas2d.drawImage(currentFrame, 0, 0, currentFrame.width, currentFrame.height, winWidth / 2 - this.computedSizeW(currentFrame.width / 4), centerY + this.computedSizeW(this.frameWoaBg.height / 2 - 20 - currentFrame.height / 2), this.computedSizeW(currentFrame.width / 2), this.computedSizeW(currentFrame.height / 2));
    
        texture2d.needsUpdate = true;
    }
}
