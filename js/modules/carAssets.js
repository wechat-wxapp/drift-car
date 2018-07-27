import UTIL from "./util";

export default class carAssets extends UTIL {
    constructor() {
        super();
        this.initCarAssets();
    }
    initCarAssets() {
        // 如果存在了某辆车的缓存，说明所有车都已经在缓存里面，不需要反复加载。
        const isCarCache = localStorage.getItem('https://res.suv666.com/24haowan/pyds/newcar3.obj')
        if (!isCarCache) {
            console.log('需要重新加载分包资源');
            const loadTask = wx.loadSubpackage({
                name: 'carAssets', // name 可以填 name 或者 root
                success: function(res) {
                    // 分包加载成功后通过 success 回调
                    carAssetsLoaded = true;
                },
                fail: function(res) {
                    // 分包加载失败通过 fail 回调
                }
            })
        } else {
            carAssetsLoaded = true;
        }
    }
    build() {
        // 轮询汽车分包是否加载完毕
        return new Promise((resolve, rej) => {
            if (carAssetsLoaded) {
                resolve();
            } else {
                carInterval = setInterval(() => {
                    console.log('定时器轮询中');
                    if (carAssetsLoaded) {
                        clearInterval(carInterval)
                        resolve();
                    }
                }, 100)
            }
        })
    }
}