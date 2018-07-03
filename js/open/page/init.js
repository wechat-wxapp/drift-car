/**
 * 初始化函数
 */
export default class Init {
    constructor() {
        this.winWidth = wx.getSystemInfoSync().screenWidth;
        this.winHeight = wx.getSystemInfoSync().screenHeight;

        const sharedCanvas = wx.getSharedCanvas();
        this.cvs = sharedCanvas.getContext('2d');

        this.themeBule = `rgba(73,116,235,1)`;
        // 排行榜数据
        // this.rankData = null;
        this.rankData = null;
        // this.groupRankData = null;
        // this.worldRankData = null;
        // 排行榜里面的个人成绩数据
        this.selfData = null;
        // 个人信息
        this.self = null;

        // 好友排行榜数据
        // this.initFriendRankData();
        // 群排行榜的数据
        // this.initGroupRankData(data.shareTicket);

        // 当前页
        this.rankCurrentPage = 1;
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
    initFriendRankData() {
        return new Promise((resolve, reject) => {
            let that = this;
            wx.getFriendCloudStorage({
                keyList: ['score'],
                success: res => {
                    let tempRankData = res.data
                    // 排序
                    that.rankData = that.sort(tempRankData, 'asc')
                    console.log(`好友数据格式`,that.rankData)
                    // 请求个人数据
                    that.initSelf().then(() => {
                        // 保存个人数据
                        that.selfData = that.normalizeSelf(that.rankData, that.self.nickName)
                        console.log('friend ranks self data',that.rankData,that.selfData)
                        resolve()
                    })
                },
                fail: res => {
                    console.log('获取排行榜数据失败...', res)
                }
            })
        })
    }

    // 初始化群排行榜数据并排序
    initGroupRankData(shareTicket) {
        return new Promise((resolve, reject) => {
            let that = this;
            wx.getGroupCloudStorage({
                shareTicket: shareTicket,
                keyList: ['score'],
                success: res => {
                    let tempRankData = res.data
                    // 排序
                    that.rankData = that.sort(tempRankData, 'asc', 1)
                    // that.rankData = that.groupSort(tempRankData)
                    // 请求个人数据
                    console.log('请求群排行榜', that.rankData)
                    that.initSelf().then(() => {
                        // 保存个人数据
                        // that.selfData = that.rankData
                        that.selfData = that.normalizeSelf(that.rankData, that.self.nickName)
                        console.log('群排行数据内部个人数据请求',that.selfData)
                        resolve()
                    })
                },
                fail: res => console.log('获取群的排行榜数据失败...')
            })
        })
    }

        
    initWorldpRankData(offset = 0, limit = 20) {
        const domain = `192.168.6.49:3003`;
        const openid = "o4eqt4i61Kdq9nr4cHHwK8_wT3xE";
        //获取世界排行榜
        const _wRank = (openid) => {
            // const openid = openid
            console.log('request1111111111')
            return new Promise((resovle) => {
                wx.request({
                    method: 'POST',
                    url: `${domain}/yc/rank/data`,
                    data: {
                        openid: openid,
                        offset: offset, // 分页偏移量
                        limit: limit // 每页请求数
                    },
                    success: res => {
                        const worldRank = res.payload.ranks
                        console.log(`world request`, res)
                        console.log(`world rank request`, worldRank)
                    }
                })
            })
        }
        _wRank(openid)
        // wx.login({
        //     success: res => {
        //         let code = res.code;
        //         wx.request({
        //             url: `${domain}/yc/wechat/code2accessToken?code=${code}`,
        //             success: res => {
        //                 //openID,,,,以及session key
        //                 _wRank(res.openid)
        //             },
        //             fail: () => console.log('request fail')
        //         })
        //     },
        //     fail: () => console.log('login fail')
        // })
    }

    // 初始化个人信息
    initSelf() {
        return new Promise((resolve) => {
            let that = this;
            wx.getUserInfo({
                openIdList: ['selfOpenId'],
                success: res => {
                    that.self = res.data[0];
                    resolve()
                },
                fail: () => {
                    console.log('请求个人信息失败...')
                }
            })
        })
    }

    // 排序方法
    sort(arrP, des ,isGroup) {
        let arr;
        if(!isGroup) {
            [ ...arr ] = arrP;
        } else {
            arr = [];
            for(let item of arrP) {
                if(item.KVDataList.length > 0) arr.push(item)
            }
        }
        if(arr.length <= 1){
            return arr;
        }

        // console.log('arr111',arr) arr[i].KVDataList.length == 0
        var num = Math.floor(arr.length/2);
        var middleArr = arr.splice(num, 1);
        var middleValue = middleArr[0].KVDataList.length > 0 ? middleArr[0].KVDataList[0].value : 0;
        var left = [];
        var right = [];
        
        if (des === 'des') {
            for(var i = 0; i < arr.length; i++){
                if(arr[i].KVDataList[0].value * 1 < middleValue * 1){
                    left.push(arr[i]);
                }else{
                    right.push(arr[i]);
                }
            }
        } else {
            for(var i = 0; i < arr.length; i++){
                if(arr[i].KVDataList[0].value * 1  > middleValue * 1){
                    left.push(arr[i]);
                }else{
                    right.push(arr[i]);
                }
            }
        }
        console.log('des111' ,right)
        console.log('des222' ,left)
        return this.sort(left, des, isGroup).concat(middleArr,this.sort(right, des, isGroup));
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

    deepCopy(data) {
        return JSON.parse(JSON.stringify(data));
    }
}

