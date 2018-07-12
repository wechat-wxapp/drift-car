/**
 * 全局缓存类
 * */
export default class Cache {
    gameData = {
        // 是否开启音乐
        music: true,
        // 车辆配置
        car: {
            // 车辆标识
            id: 0,
            // 模型地址
            model: 'https://static.cdn.24haowan.com/24haowan/test/js/newcar2.obj',
            // 贴图地址
            material: 'https://static.cdn.24haowan.com/24haowan/test/js/newcar2.png',
            // 模型尺寸
            modelSize: [ 2, 2, 2 ],
            // 物理模型尺寸
            physicalSize: [ 4, 6, 4 ],
            // 加速区间
            levelSpeed: [5, 20, 40, 60, 80, 90, 120, 160, 200, 250],
            // 初始速度
            speed: 2.5,
            // 最大速度
            speedMax: 5,
            // 每次加速步长
            speedStep: 0.01,
            // 累计加速步长最大值
            speedStepMax: 0.08
        }
    };

    constructor() {
        this.initGameCache();
    }

    initGameCache() {
        const gameCache = this.getCache('gameData');
        !gameCache && this.setCache('gameData', this.gameData);
    }

    setCache(key, value) {
        localStorage.setItem(key, value);
    }

    getCache(key) {
        return localStorage.getItem(key);
    }

    setGameData(key, value) {
        const gameData = localStorage.getItem('gameData');
        const cache = gameData || {};

        cache[key] = value;
        this.setCache('gameData', cache);
    }

    getGameData(key) {
        const gameData = localStorage.getItem('gameData');
        const cache = gameData || {};

        return cache[key];
    }
}