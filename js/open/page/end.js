import Init from './init';









/**该方法用来绘制一个有填充色的圆角矩形
 *@param cxt:canvas的上下文环境
 *@param x:左上角x轴坐标
 *@param y:左上角y轴坐标
 *@param width:矩形的宽度
 *@param height:矩形的高度
 *@param radius:圆的半径
 *@param fillColor:填充颜色
 **/
function fillRoundRect(cxt,x,y,width,height,radius,/*optional*/fillColor){
    //圆的直径必然要小于矩形的宽高
    if(2*radius>width || 2*radius>height){return false;}

    cxt.save();
    cxt.translate(x,y);
    //绘制圆角矩形的各个边
    drawRoundRectPath(cxt,width,height,radius);
    cxt.fillStyle=fillColor||"#000";//若是给定了值就用给定的值否则给予默认值
    cxt.fill();
    cxt.restore();
}


/**该方法用来绘制圆角矩形
 *@param cxt:canvas的上下文环境
 *@param x:左上角x轴坐标
 *@param y:左上角y轴坐标
 *@param width:矩形的宽度
 *@param height:矩形的高度
 *@param radius:圆的半径
 *@param lineWidth:线条粗细
 *@param strokeColor:线条颜色
 **/
function strokeRoundRect(cxt,x,y,width,height,radius,/*optional*/lineWidth,/*optional*/strokeColor){
    //圆的直径必然要小于矩形的宽高
    if(2*radius>width || 2*radius>height){return false;}

    cxt.save();
    cxt.translate(x,y);
    //绘制圆角矩形的各个边
    drawRoundRectPath(cxt,width,height,radius);
    cxt.lineWidth = lineWidth||2;//若是给定了值就用给定的值否则给予默认值2
    cxt.strokeStyle=strokeColor||"#000";
    cxt.stroke();
    cxt.restore();
}

function drawRoundRectPath(cxt,width,height,radius){
    cxt.beginPath(0);
    //从右下角顺时针绘制，弧度从0到1/2PI
    cxt.arc(width-radius,height-radius,radius,0,Math.PI/2);

    //矩形下边线
    cxt.lineTo(radius,height);

    //左下角圆弧，弧度从1/2PI到PI
    cxt.arc(radius,height-radius,radius,Math.PI/2,Math.PI);

    //矩形左边线
    cxt.lineTo(0,radius);

    //左上角圆弧，弧度从PI到3/2PI
    cxt.arc(radius,radius,radius,Math.PI,Math.PI*3/2);

    //上边线
    cxt.lineTo(width-radius,0);

    //右上角圆弧
    cxt.arc(width-radius,radius,radius,Math.PI*3/2,Math.PI*2);

    //右边线
    cxt.lineTo(width,height-radius);
    cxt.closePath();
}











/**
 * 开始页函数
 */
export default class Loader extends Init {
    constructor() {
        super();
    }

    /**
     * 更新页面内容
     * */
    setTexture(data) {
        this.cvs.clearRect(0, 0, this.winWidth, this.winHeight);

        this.cvs.fillStyle = "rgba(0, 0, 0, .8)";
        this.cvs.fillRect(0, 0, this.winWidth, this.winHeight);

        // fillRoundRect(this.cvs, this.winWidth / 2 - this.computedSizeW(80) / 2, this.computedSizeH(120) - 17.5, this.computedSizeW(80), 25, 12, "rgba(255, 255, 255, .3)");

        this.cvs.fillStyle = "#fff";
        this.cvs.font = `bold ${this.computedSizeW(16)}px Arial`;
        this.cvs.textAlign = "center";
        this.cvs.fillText('本次得分', this.winWidth / 2, this.computedSizeH(120));

        this.cvs.font = `bold ${this.computedSizeW(80)}px Arial`;
        this.cvs.fillText('160', this.winWidth / 2, this.computedSizeH(220));

        this.cvs.font = `bold ${this.computedSizeW(14)}px Arial`;
        this.cvs.fillText('历史最高分: 208', this.winWidth / 2, this.computedSizeH(250));

        // 世界排行
        this.cvs.fillStyle = "#4973eb";
        this.cvs.fillRect(this.winWidth / 2 - this.computedSizeW(330) / 2, this.computedSizeH(280), this.computedSizeW(330), this.computedSizeH(38));

        this.cvs.fillStyle = "#fff";
        this.cvs.font = `bold ${this.computedSizeW(12)}px Arial`;
        this.cvs.fillText('世界排行', this.computedSizeW(95), this.computedSizeH(303));

        this.cvs.fillStyle = "#fdd724";
        this.cvs.font = `bold ${this.computedSizeW(14)}px Arial`;
        this.cvs.fillText('45456', this.computedSizeW(320), this.computedSizeH(303));

        // 好友排行
        this.cvs.fillStyle = "#fff";
        this.cvs.fillRect(this.winWidth / 2 - this.computedSizeW(330) / 2, this.computedSizeH(340), this.computedSizeW(330), this.computedSizeH(170));

        this.cvs.fillStyle = "#e7e7e7";
        this.cvs.fillRect(this.winWidth / 2 - this.computedSizeW(330) / 2, this.computedSizeH(510), this.computedSizeW(330), this.computedSizeH(40));






        this.cvs.fillStyle = "#a8a8a8";
        this.cvs.fillText('43', this.computedSizeW(100), this.computedSizeH(370));





        this.cvs.fillStyle = "#888";
        this.cvs.font = `${this.computedSizeW(12)}px Arial`;
        this.cvs.fillText('世界排行榜: 每周一凌晨更新', this.computedSizeW(140), this.computedSizeH(535));

        this.cvs.fillStyle = "#5079eb";
        this.cvs.fillText('查看全部排行 >', this.computedSizeW(310), this.computedSizeH(535));

        const btn = wx.createImage();
        btn.src = 'images/btn.png';
        this.cvs.drawImage(btn, 0, 0, btn.width, btn.height, this.computedSizeW(60), this.computedSizeH(580), this.computedSizeW(106.5), this.computedSizeH(43.5));
        this.cvs.drawImage(btn, 0, 0, btn.width, btn.height, this.computedSizeW(245), this.computedSizeH(580), this.computedSizeW(106.5), this.computedSizeH(43.5));

        this.cvs.fillStyle = "#fff";
        this.cvs.font = `bold ${this.computedSizeW(16)}px Arial`;
        this.cvs.fillText('炫耀一下', this.computedSizeW(112), this.computedSizeH(604));

        this.cvs.fillText('再玩一局', this.computedSizeW(298), this.computedSizeH(604));

        this.cvs.fillText('返回首页', this.computedSizeW(210), this.computedSizeH(670));
        this.cvs.fillRect(this.computedSizeW(176), this.computedSizeH(680), this.computedSizeW(67), 2);
    }
}
