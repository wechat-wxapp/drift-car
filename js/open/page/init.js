/**
 * 初始化函数
 */
export default class Index {
    constructor() {
        this.winWidth = wx.getSystemInfoSync().screenWidth;
        this.winHeight = wx.getSystemInfoSync().screenHeight;

        const sharedCanvas = wx.getSharedCanvas();
        this.cvs = sharedCanvas.getContext('2d');

        this.themeBule = `rgba(73,116,235,1)`;
        // 排行榜数据
        this.rankData = null;
        // 排行榜里面的个人成绩数据
        this.selfData = null;
        // 个人信息
        this.self = null

        this.initRankData();
        // this._initSelfData();
        // this._initSelf();
    }

    /**
     * 计算当前屏幕相对于 375 * 667 的结果
     * */
    computedSizeW(size) {
        return size * this.winWidth / 375 / 2;
    }

    computedSizeH(size) {
        return size * this.winHeight / 667 / 2;
    }

    /**
     * 清除画布内容
     * */
    clearCvs(noTransBg) {
        this.cvs.clearRect(0, 0, this.winWidth, this.winHeight);
        if(noTransBg) return;
        this.cvs.fillStyle = 'rgba(0, 0, 0, .8)';
        this.cvs.fillRect(0, 0, this.winWidth, this.winHeight);
    }

    /**
     * 圆角矩形
     * */
    drawRoundRect(cxt, x, y, width, height, radius, color, lineWidth) {
        cxt.beginPath();
        cxt.arc(x + radius, y + radius, radius, Math.PI, Math.PI * 3 / 2);
        cxt.lineTo(width - radius + x, y);
        cxt.arc(width - radius + x, radius + y, radius, Math.PI * 3 / 2, Math.PI * 2);
        cxt.lineTo(width + x, height + y - radius);
        cxt.arc(width - radius + x, height - radius + y, radius, 0, Math.PI * 1 / 2);
        cxt.lineTo(radius + x, height + y);
        cxt.arc(radius + x, height - radius + y, radius, Math.PI * 1 / 2, Math.PI);
        if (!lineWidth) {
            cxt.fillStyle = color;
            cxt.lineWidth = 0;
            cxt.fill();
        } else {
            cxt.strokeStyle = color;
            cxt.lineWidth = lineWidth;
            cxt.stroke();
        }
        cxt.closePath();
    }

    // 初始化好友排行榜数据并排序
    initRankData() {
        let that = this;
        wx.getFriendCloudStorage({
            keyList: ['score'],
            success: res => {
                let tempRankData = res.data
                // 排序
                that.rankData = that.sort(tempRankData, 'des')

                // 请求个人数据
                that.initSelf(() => {
                    // 保存个人数据
                    that.selfData = that.normalizeSelf(that.rankData, that.self.nickName)
                    console.log('sd', that.selfData)

                })
            },
            fail: res => {
                console.log('获取排行榜数据失败...')
            }
        })
    }


    // 初始化个人信息
    initSelf(callback) {
        let that = this;
        wx.getUserInfo({
            openIdList: ['selfOpenId'],
            success: res => {
                that.self = res.data[0];
                callback()
            },
            fail: () => {
                console.log('请求个人信息失败...')
            }
        })
    }

    // 排序方法
    sort (arr, des) {
        if(arr.length <= 1){
            return arr;
        }

        var num = Math.floor(arr.length/2);
        var middleArr = arr.splice(num, 1);
        var middleValue = middleArr[0].KVDataList[0].value;
        var left = [];
        var right = [];

        if (des === 'des') {
            for(var i = 0; i < arr.length; i++){
                if(arr[i].KVDataList[0].value < middleValue){
                    left.push(arr[i]);
                }else{
                    right.push(arr[i]);
                }
            }
        } else {
            for(var i = 0; i < arr.length; i++){
                if(arr[i].KVDataList[0].value > middleValue){
                    left.push(arr[i]);
                }else{
                    right.push(arr[i]);
                }
            }
        }

        return this.sort(left, des).concat(middleArr,this.sort(right, des));
    }

    // 获取排行中的用户数据，并添加排名
    normalizeSelf (arr, nickname) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].nickname == nickname) {
                arr[i].rank = i + 1;
                return arr[i]
            }
        }
        console.log('没有分数记录...')
    }

}

