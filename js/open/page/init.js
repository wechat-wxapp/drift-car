/**
 * 初始化函数
 */
export default class Init {
    constructor() {
        this.dpr = wx.getSystemInfoSync().pixelRatio;
        this.winWidth = wx.getSystemInfoSync().screenWidth * this.dpr;
        this.winHeight = wx.getSystemInfoSync().screenHeight * this.dpr;
        const sharedCanvas = wx.getSharedCanvas();
        this.cvs = sharedCanvas.getContext('2d');

        // 排行榜数据
        this.rankData = null;
        
        // 排行榜里面的个人成绩数据
        this.selfData = null;
        // 个人信息
        this.self = null;

        // 当前页
        this.rankCurrentPage = 1;
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
    clearCvs(noTransBg, noScale) {
        this.cvs.clearRect(0, 0, this.winWidth, this.winHeight);
        if(wx.HWData.hasScaled === 0 && !noScale) {
            this.canvasScale();
            wx.HWData.hasScaled++;
        }
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

    /**
     * 初始化好友排行榜数据并排序
     * */
    friendRankData() {
        return new Promise((resolve, reject) => {
            wx.getFriendCloudStorage({
                keyList: ['score'],
                success: (res) => {
                    const { data: randData } = res;
                    const { nickName } = this.getHWData('self');
                    // 倒序排序
                    const rank = this.sort(randData, 'asc');
                    // 获取自己相对排行榜的数据
                    const self = this.normalizeSelf(rank, nickName);
                    resolve({ rank, self });
                },
                fail: res => {
                    console.log('获取排行榜数据失败...', res);
                    reject(res);
                }
            })
        })
    }

    /**
     * 初始化群排行榜数据并排序
     * */
    initGroupRankData(shareTicket) {
        return new Promise((resolve, reject) => {

            if(shareTicket === 'noShareTicket') {
                reject();
                return false;
            }

            wx.getGroupCloudStorage({
                shareTicket,
                keyList: ['score'],
                success: res => {
                    const { data: rankData } = res;
                    const { nickName } = this.getHWData('self');

                    // 倒序排序
                    const rank = this.sort(rankData, 'asc', 1);

                    // 获取自己相对排行榜的数据
                    const self = this.normalizeSelf(rank, nickName);
                    resolve({ rank, self });
                },
                fail: res => {
                    console.log('获取群排行榜数据失败...', res);
                    reject(res);
                }
            })
        })
    }

    /**
     * 初始化世界排行榜
     * */
    initWorldRankData({ list, self }) {
        const rankData = list;
        rankData.map(e =>{
            e['KVDataList'] = [];
            e['KVDataList'].push({ value: e.score });
            e.avatarUrl = e.headimgurl;
            delete e.score;
        });

        const { score, headimgurl } = self;

        const selfData = self;
        selfData['KVDataList'] = [];
        selfData['KVDataList'].push({ value: score });
        selfData.avatarUrl = headimgurl;
        delete selfData.score;

        return { rank: rankData, self: selfData }
    }

    /**
     * 初始化个人信息
     * */
    initSelf(openId) {
        return new Promise((resolve, reject) => {
            wx.getUserInfo({
                openIdList: [openId, 'o4eqt4pUjeDAbP4vRQaTpCldSOmE'],
                success: res => {
                    const self = res.data[0];
                    console.log('初始化个人信息: ', res);
                    resolve(self);
                },
                fail: (res) => {
                    console.log('请求个人信息失败...');
                    reject(res);
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

        var num = Math.floor(arr.length/2);
        var middleArr = arr.splice(num, 1);
        var middleValue = middleArr[0].KVDataList.length > 0 ? middleArr[0].KVDataList[0].value : 0;
        var left = [];
        var right = [];
        
        const checkScore = (arr) => {
            if(arr.length === 0) {
                arr.push({key: "score", value: "0"})
            }
        }
        if (des === 'des') {
            for(var i = 0; i < arr.length; i++){
                checkScore(arr[i].KVDataList);
                if(arr[i].KVDataList[0].value * 1 < middleValue * 1){
                    left.push(arr[i]);
                }else{
                    right.push(arr[i]);
                }
            }
        } else {
            for(var i = 0; i < arr.length; i++){
                checkScore(arr[i].KVDataList);
                if(arr[i].KVDataList[0].value * 1  > middleValue * 1){
                    left.push(arr[i]);
                }else{
                    right.push(arr[i]);
                }
            }
        }
        return this.sort(left, des, isGroup).concat(middleArr,this.sort(right, des, isGroup));
    }


    // 获取排行中的用户数据，并添加排名
    normalizeSelf (arr, nickname) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].nickname === nickname) {
                arr[i].rank = i + 1;
                return arr[i];
            }
        }
        console.log('没有分数记录...')
    }

    deepCopy(data) {
        return JSON.parse(JSON.stringify(data));
    }

    //绘制圆形头像
    circleImg(ctx, img, x, y, r) {
        ctx.save();
        // ctx.lineWidth = 18
        let d = 2 * r;
        let cx = x + r;
        let cy = y + r;
        ctx.arc(cx, cy, r, 0, 2 * Math.PI);
        ctx.clip();
        ctx.drawImage(img, x, y, d, d);
        // ctx.strokeStyle = `rgba(73,116,235,1)`
        // ctx.strokeStyle = "#fff"
        ctx.stroke();
        ctx.restore();
        ctx.beginPath();
        // ctx.closePath();
    }

    canvasScale(isEnlarge) {
        !isEnlarge ? this.cvs.scale(1 / this.dpr, 1 / this.dpr) : this.cvs.scale(this.dpr, this.dpr)
    }

    /**
     * 超过长度截取文字
     * @params text {String} 需要被截取的文字
     * @params max {Number} 最长长度
     * @params tail {String} 省略号
     * @params isCb {Boolean} 是否进行过递归, 不需要传值, 如果传值可用来控制是否显示省略号
     * @return {String} 返回裁剪过或不需要裁剪的文字
     * */
    textOverFlow(text, max, tail = '...', isCb) {
        if (this.cvs.measureText(text).width <= max) {
            return isCb ? `${text}${tail}` : text;
        }

        return this.textOverFlow(text.substr(0, text.length - 1), max, tail, true);
    }

    /**
     * 更新微信分数
     * @params score {Number} 提交的分数
     * */
    updateWxScore(score) {
        wx.setUserCloudStorage({
            KVDataList: [{ key: "score", value: String(score) }],
            success: (e) => {
                console.log('更新分数成功: ', score);
            },
            fail: (e) => {
                console.log('更新分数: ', e);
            },
            complete: () => {}
        })
    }

    /**
     * 获取HWData数据
     * @params key {String} 数据下标
     * @return {Object} 如果不传"key"那么返回所有,否则返回指定下标
     * */
    getHWData(key) {
        return key ? wx.HWData[key] : wx.HWData;
    }

    /**
     * 设置HWData数据
     * @params key {String} 数据下标
     * @params value {String} 数据内容
     * */
    setHWData(key, value) {
        wx.HWData[key] = value;
    }

    /**
     * 设置排行榜数据
     * @params score {Number} 需要更新的分数
     * @params rankType {String} 需要更新的排行榜, 类型为 friendRank 会同时更新群排行榜, worldRank 更新世界排行榜
     * @return {Object} 返回更新后的排行榜对象
     * */
    setRankData(score, rankType) {
        const { friendRank, groupRank, worldRank } = this.getHWData();

        // 更新好友排行榜和群排行榜
        const friendRankKeys = [{
            name: 'friendRank',
            data: friendRank,
        }, {
            name: 'groupRank',
            data: groupRank,
        }];

        // 更新世界排行榜
        const worldRankKeys = [{
            name: 'worldRank',
            data: worldRank,
        }];

        const rankList = rankType === 'friendRank' ? friendRankKeys : rankType === 'worldRank' ? worldRankKeys : friendRankKeys.concat(worldRankKeys);

        for (let [k, v] of rankList.entries()) {
            const { name, data } = v;

            if (Object.keys(data).length <= 0) continue;

            const { list, self } = data;

            const index = list.findIndex(e => e.nickname === self.nickname);
            if (index < 0) {
                const newSelfRankData = this.setNewRankData(score);
                list.push(newSelfRankData);
            } else {
                list[index].KVDataList[0].value = score;
            }

            const newList = k === 1 ? this.sort(list, 'asc', 1) : this.sort(list, 'asc');
            const newSelf = this.normalizeSelf(newList, self.nickname);

            this.setHWData(name, { list: newList, self: newSelf });
        }
    }

    /**
     * 设置首次玩游戏的数据
     * @params score {String} 分数
     * @return {Object} 根据个人信息生成的排行榜数据
     * */
    setNewRankData(score) {
        const { avatarObj, avatarUrl, nickName, openId } = this.getHWData('self');

        return {
            KVDataList: [{
                key: 'score',
                value: score
            }],
            avatarObj,
            avatarUrl,
            nickname: nickName,
            openid: openId
        };
    }
}

