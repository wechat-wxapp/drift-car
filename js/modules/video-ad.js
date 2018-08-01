/**
 * 管理处理视频广告 --liyilei
 * 视频广告是微信全局单例对象
 */

export default class videoAd{
    loadStatus = false;

    constructor() {
        this.createVideoAd();
    }

    /**
     * 提前初始化调用
     */
    createVideoAd() {
        this.vedioAd = $wx.createRewardedVideoAd();

        this.vedioAd.onLoad(() => {
            this.loadStatus = true;
        });
    }

    /**
     * 广告默认隐藏，调用广告对象show()才能显示
     */
    showVideoAd() {
        $loader.show('正在加载广告...');
        this.vedioAd.onError(err => {
            this.loadStatus = false;
            $logger.error('广告加载失败', err);
        });

        return this.showVideo();
    }

    /**
     * 判断广告状态,执行复活
     * */
    showVideo() {
        return new Promise((resolve, reject) => {
            if(this.loadStatus) {
                $logger.log('广告初始化成功');
                // 初始化视频成功
                return this.vedioAd.show()
                .then(() => {
                    $loader.hide();
                    this.onCloseVideoAd().then(e => {
                        resolve();
                    }).catch(err => {
                        reject();
                    });
                });
            } else {
                // 初始化视频失败,跳过视频直接复活
                $loader.hide();
                $loader.showToast('无法加载,跳过视频', 'error');
                setTimeout(() => {
                    $loader.hideToast();
                    resolve();
                }, 1000);
            }
        })
    }

    /**
     * 获取失败，不会被show，需要手动重新拉取
     */
    // loadVideoAd() {
    //     $logger.log('重新拉取广告');
    //     return this.vedioAd.load()
    // }

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
                    resolve();
                } else {
                    // 播放中途退出，不下发游戏奖励
                    reject();
                }
            })
        })
    }
}