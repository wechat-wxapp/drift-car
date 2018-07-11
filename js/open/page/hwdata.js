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
        const { shareTicket, worldRank } = data;

        // 初始化个人数据
        this.initSelf().then(e => {
            wx.HWData.self = e;

            // 初始化好友排行榜数据
            this.friendRankData()
                .then(({ rank, self }) => {
                    this.setRankCache('friendRank', { list: rank, self });
                });

            // 初始化群组排行榜数据
<<<<<<< HEAD
            // this.initGroupRankData(shareTicket)
            //     .then(({ rank, self }) => {
            //         this.setHWData('groupRank', { list: rank, self });
            //     });
=======
            this.initGroupRankData(shareTicket)
                .then(({ rank, self }) => {
                    this.setRankCache('groupRank', { list: rank, self });
                });
>>>>>>> d54e90887ef640d9b29da1de2ced9b890dc0e6e4

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
        this.loadImg(list)
            .then((e) => {
                const { avatarObj } = list.find(v => v.nickname === self.nickname);
                avatarObj && (self.avatarObj = avatarObj);
                this.setHWData(key, { list: e, self });
            });
    }

    /**
     * 预加载排行榜图片
     * @params {Array} 排行榜数组
     * @return {Array} 预加载后排行榜数组, 加载后图片对象保存在 avatarObj 字段
     * */
    loadImg(list) {
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

