import UTIL from './util';

/**
 * 风景函数
 */
export default class Scenery extends UTIL {
    constructor() {
        super();
        this.s1();
    }

    /**
     * 风景1
     */
    s1() {
        const material = "https://static.cdn.24haowan.com/24haowan/test/js/scenery.png";
        const model = 'https://static.cdn.24haowan.com/24haowan/test/js/scenery.obj';

        this.createObj(model, material, (obj) => {
            scenery1 = obj;
            scenery1.size = { width: 100, height: 100 };
            scenery1.rang = { x: 45, z: -45 };
        });
    }
}
