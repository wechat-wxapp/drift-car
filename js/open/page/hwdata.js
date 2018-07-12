import Init from "./init";

/**
 * 全局HWData函数
 */
export default class HWData extends Init {
    constructor(data = {}) {
        super();

        wx.HWData = {
            // 好友排行榜数据
            friendRank: {},
            // 群排行榜数据
            groupRank: {},
            // 世界排行榜数据
            worldRank: {},
            // 个人信息
            self: ''
        };

        this.initData(data);
    }

    /**
     * 初始化缓存数据方法
     * @params {Object} 参数, 格式: { shareTicket: 群组排行榜key, worldRank: 世界排行榜数据 }
     * */
    initData(data) {
        const { openId, shareTicket, worldRank } = data;

        // 初始化个人数据
        this.initSelf(openId)
            .then(e => {
                // 预加载个人信息头像
                this.loadSelfImg(e)
                    .then(val => {
                        wx.HWData.self = val;
                    });

                // 初始化好友排行榜数据
                this.friendRankData()
                    .then(({ rank, self }) => {
                        console.log('缓存好友排行榜成功: ', rank, self);
                        this.setRankCache('friendRank', { list: rank, self });
                    });
                // 初始化群组排行榜数据
                this.initGroupRankData(shareTicket)
                    .then(({ rank, self }) => {
                        console.log('缓存群排行榜成功: ', rank, self);
                        this.setRankCache('groupRank', { list: rank, self });
                    })
                    .catch(e => {
                        console.log('缓存群排行榜失败: ', e);
                    });

                // 初始化世界排行榜
                const { rank, self } = this.initWorldRankData(worldRank);
                this.setRankCache('worldRank', { list: rank, self });
            });
    }

    /**
     * 缓存数据方法
     * @params {String} 缓存数据下标
     * @params {Object} 缓存对象, 格式: { list: 排行榜数组, self: 自己的名次数据 }
     * */
    setRankCache(key, data) {
        const { list, self } = data;
        this.loadRankImg(list)
            .then((e) => {
                try {
                    const { avatarObj } = list.find(v => v.nickname === self.nickname);
                    avatarObj && (self.avatarObj = avatarObj);
                    this.setHWData(key, { list: e, self });
                } catch (err) {
                    const newUser = this.setNewRankData(0);
                    e.push(newUser);
                    const rankUser = this.normalizeSelf(e, newUser.nickname);
                    this.setHWData(key, { list: e, self: rankUser });
                }
            });
    }

    /**
     * 缓存个人信息数据
     * @params {Object} 个人数据对象
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
     * @params {Array} 排行榜数组
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
}

