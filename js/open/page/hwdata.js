import Init from "./init";

/**
 * 全局HWData函数
 */
export default class HWData extends Init {
    constructor(data = {}) {
        super();

        wx.HWData = {
            // 好友排行榜数据
            friendRank: {
                list: []
            },
            // 群排行榜数据
            groupRank: {},
            // 世界排行榜数据
            worldRank: {},
            // 个人信息
            self: '',

            // 当前星期
            week: '5',

            //用来判断只进行一次canvas缩放
            hasScaled: 0,
            //是否显示加载图片
            loadingKey: true
        };

        console.log('当前week: ', wx.HWData.week);

        this.initData(data);
    }

    /**
     * 初始化缓存数据方法
     * @params data {Object} 参数, 格式: { shareTicket: 群组排行榜key, worldRank: 世界排行榜数据 }
     * */
    initData(data) {
        const { openId, shareTicket, worldRank } = data;
        shareTicket !== 'noShareTicket' && (this.shareTicket = shareTicket);
        // 初始化个人数据
        this.initSelf(openId)
            .then(e => {
                // this.setHWData('self', e);
                // 预加载个人信息头像
                this.loadSelfImg(e)
                    .then(val => {
                        this.setHWData('self', val);

                        // 初始化好友排行榜数据
                        this.friendRankData()
                            .then(({ rank, self }) => {
                                console.log('缓存好友排行榜成功: ', { rank, self });
                                this.setRankCache('friendRank', { list: rank, self });
                                this.checkLoading();
                            }).catch((err) => {
                                console.log('缓存好友排行榜失败: ', err);
                                this.setRankCache('friendRank');
                                this.checkLoading();
                            });

                        // 初始化群组排行榜数据
                        this.initGroupRankData(shareTicket)
                            .then(({ rank, self }) => {
                                console.log('缓存群排行榜成功: ', { rank, self });
                                this.setRankCache('groupRank', { list: rank, self });
                                this.checkLoading();
                            })
                            .catch(e => {
                                console.log('缓存群排行榜失败: ', e);
                            });

                        // 初始化世界排行榜
                        const { rank, self } = this.initWorldRankData(worldRank);
                        this.setRankCache('worldRank', { list: rank, self });
                    });
            });
    }

    /**
     * 缓存数据方法
     * @params key {String} 缓存数据下标
     * @params data {Object} 缓存对象, 格式: { list: 排行榜数组, self: 自己的名次数据 }
     * */
    setRankCache(key, data) {
        // 如果没有数据
        if (!data) {
            const list = [];
            const newUser = this.setNewRankData(0);
            list.push(newUser);
            const rankUser = this.normalizeSelf(list, newUser.nickname);
            this.setHWData(key, { list, self: rankUser });

            return false;
        }

        const { list, self } = data;

        this.setRankUserCache(key, data);

        // 暂时放到本地
        this.loadRankImg(list)
            .then((e) => {
                const { self: newSelf } = this.getHWData(key);

                this.setRankUserCache(key, { list: e, self: newSelf});
                this.checkLoading();
            });
    }

    /**
     * 设置缓存数据方法, 排行榜没有数据默认插入0分的个人数据
     * @params key {String} 缓存数据下标
     * @params data {Object} 缓存对象, 格式: { list: 排行榜数组, self: 自己的名次数据 }
     * */
    setRankUserCache(key, data) {
        const { list, self } = data;

        try {
            const { avatarObj } = list.find(v => v.nickname === self.nickname);
            avatarObj && (self.avatarObj = avatarObj);
            const rankUser = this.normalizeSelf(list, self.nickname);
            this.setHWData(key, { list, self: rankUser });
        } catch (err) {
            // 世界排行榜不修改排名和分数
            if (key === 'worldRank') {
                const score = self.KVDataList[0].value;
                const newUser = this.setNewRankData(score);
                const worldUser = {
                    ...newUser,
                    rank: self.rank
                };
                this.setHWData(key, { list, self: worldUser });
            } else {
                const newUser = this.setNewRankData(0);
                list.push(newUser);
                const rankUser = this.normalizeSelf(list, newUser.nickname);
                this.setHWData(key, { list, self: rankUser });
            }

        }
    }

    /**
     * 缓存个人信息数据
     * @params self {Object} 个人数据对象
     * @return {Object} 缓存后的个人数据对象, 缓存头像保存在 avatarObj
     * */
    loadSelfImg(self) {
        return new Promise((res, rej) => {
            const { avatarUrl } = self;
            const img = wx.createImage();
            img.src = avatarUrl;
            img.onload = () => {
                self.avatarObj = img;
                res(self);
            };
        });
    }

    /**
     * 预加载排行榜图片
     * @params list {Array} 排行榜数组
     * @return {Array} 预加载后排行榜数组, 加载后图片对象保存在 avatarObj 字段
     * */
    loadRankImg(list) {
        let loadLength = 0;
        return new Promise((res, rej) => {
            for (let [k, v] of list.entries()) {
                const { avatarUrl } = v;
                if (!avatarUrl) {
                    loadLength++;
                    continue;
                }

                const img = wx.createImage();
                img.src = avatarUrl;
                img.onload = () => {
                    list[k].avatarObj = img;
                    loadLength++;

                    if (loadLength === list.length) {
                        res(list);
                    }
                };
            }
        });
    }

    /**
     * 判断排行榜的loading图片是否要消失
     */
    checkLoading() {
        //传过去setloadingKey的变量
        let _temp;
        try {
            if(this.getHWData('friendRank').list.length > 0) {
                _temp = this.shareTicket ? (this.getHWData('groupRank').list.length > 0 && this.getHWData('groupRank').list[0].avatarObj) : true
            }else {
                _temp = false;
            }
        } catch (error) {
            console.log('检查loadingKey改变',error)
        }
        this.setHWData('loadingKey', !_temp)
    }
}

