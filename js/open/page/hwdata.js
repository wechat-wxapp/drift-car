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

    initData(data) {
        const { shareTicket, worldRank } = data;

        // 初始化个人数据
        this.initSelf().then(e => {
            wx.HWData.self = e;

            // 初始化好友排行榜数据
            this.friendRankData()
                .then(({ rank, self }) => {
                    this.setHWData('friendRank', { list: rank, self });
                });

            // 初始化群组排行榜数据
            // this.initGroupRankData(shareTicket)
            //     .then(({ rank, self }) => {
            //         this.setHWData('groupRank', { list: rank, self });
            //     });

            // 初始化世界排行榜
            const { rank, self } = this.initWorldRankData(worldRank);
            this.setHWData('worldRank', { list: rank, self });
        });
    }
}

