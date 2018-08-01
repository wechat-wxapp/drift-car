/**
 * 管理处理视频广告 --liyilei
 * 视频广告是微信全局单例对象
 */

export default class videoAd{
    constructor() {
        this.createVideoAd();
    }

    /**
     * 提前初始化调用
     * @param {string} adUnitId 广告位id
     */
    createVideoAd(adUnitId = 'adunit-722f9ea4aab7122d') {
        this.vedioAd = wx.createRewardedVideoAd({ adUnitId: adUnitId })
        return this.vedioAd
                .onLoad(() => {
                    console.log('激励视频 广告加载成功')
                })
    }

    /**
     * 广告默认隐藏，调用广告对象show()才能显示
     */
    showVideoAd() {
        $loader.show('正在加载广告...');
        //没有就再新建一次？？？？,不知道怎么模拟一次拉广告失败
        let loadFail;
        this.vedioAd.onError(err => {
            loadFail = true
            console.log('广告加载失败', err)
        })
        if(!loadFail) {
            return this.vedioAd.show()
                    .then(() => {
                        $loader.hide();
                        console.log('激励视频 广告显示')
                        return this.onCloseVideoAd()
                    })
                    // 文档用法有歧义，这个有待观察
                    // .catch(err => {
                    //     console.log('显示广告失败', err)
                    //     //自动再拉,并再次试着显示广告
                    //     this.loadVideoAd().then(this.showVideoAd())
                    // })
        } else {
            console.log('loadFail')
            this.loadVideoAd().then(() => this.showVideoAd())
        }
    }

    /**
     * 获取失败，不会被show，需要手动重新拉取
     */
    loadVideoAd() {
        console.log('重新拉取广告');
        return this.vedioAd.load()
    }

    /**
     * 监听关闭
     */
    onCloseVideoAd() {
        return new Promise((resolve,reject) => {
            this.vedioAd.onClose(res => {
                // 用户点击了【关闭广告】按钮
                // 小于 2.1.0 的基础库版本，res 是一个 undefined
                console.log('关闭视频广告', res)
                if (res && res.isEnded || res === undefined) {
                    // 正常播放结束，可以下发游戏奖励
                    resolve()
                } else {
                    // 播放中途退出，不下发游戏奖励
                    reject()
                }
            })
        })
    }
}