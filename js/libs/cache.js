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
            physicalSize: [ 4, 6, 4 ]
        }
    };

    constructor() {
        const { levelSpeed, speed, speedMax, speedStep, speedStepMax } = $bus.constantData;

        this.gameData.car = {
            ...this.gameData.car,

            // 加速区间
            levelSpeed,
            // 初始速度
            speed,
            // 最大速度
            speedMax,
            // 每次加速步长
            speedStep,
            // 累计加速步长最大值
            speedStepMax
        };

        // 初始化车辆缓存
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

    /**
     *
     * */
    getCarSpeed() {
        const { levelSpeed, speed, speedMax, speedStep, speedStepMax } = this.getGameData('car');
        const { levelSpeed: ls, speed: s, speedMax: sm, speedStep: ss, speedStepMax: ssm } = $bus.constantData;

        return {
            levelSpeed: levelSpeed || ls,
            speed: speed || s,
            speedMax: speedMax || sm,
            speedStep: speedStep || ss,
            speedStepMax: speedStepMax || ssm,
        }
    }
}