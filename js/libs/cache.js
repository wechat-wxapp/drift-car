/**
 * 全局缓存类
 * */
export default class Cache {
    gameData = {
        music: true,
        car: {
            id: 0,
            model: 'https://static.cdn.24haowan.com/24haowan/test/js/newcar2.obj',
            material: 'https://static.cdn.24haowan.com/24haowan/test/js/newcar2.png',
            modelSize: [ 2, 2, 2 ],
            physicalSize: [ 4, 6, 4 ]
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