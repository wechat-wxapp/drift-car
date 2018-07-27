import UTIL from "./util";

export default class Version extends UTIL {
    constructor() {
        super();
        this.checkVersion();
    }
    checkVersion() {
        const cacheVersion = localStorage.getItem('version');
        if (!cacheVersion || cacheVersion != version) {
            // 说明版本号不一致
            localStorage.clear();
            console.log('版本号不一致');
            localStorage.setItem('version', version);
        }
    }

}