import UTIL from './util';

/**
 * 风景函数
 */
export default class Scenery extends UTIL {
    constructor() {
        super();
    }

    build() {
        return Promise.all([
            // this.s1(),
            // this.s2(),
            // this.s3(),
            this.s4(),
            this.s5(),
            // this.s6(),
            this.s7()
        ]);
    }

    /**
     * 风景1
     */
    s1() {
        return new Promise((res, rej) => {
            const material = "https://static.cdn.24haowan.com/24haowan/test/js/b01.png";
            const model = 'https://static.cdn.24haowan.com/24haowan/test/js/b01.obj';

            this.createObj(model, material, (obj) => {
                const scenery = obj;
                scenery.scale.set(1.2, 1.2, 1.2);
                scenery.size = { width: 120, height: 120 };
                scenery.rang = { x: 54.8, z: -54.8 };

                sceneryListArr.push(scenery);
                res();
            });
        })
    }

    /**
     * 风景2
     * */
    s2() {
        return new Promise((res, rej) => {
            const material = "https://static.cdn.24haowan.com/24haowan/test/js/b02.png";
            const model = 'https://static.cdn.24haowan.com/24haowan/test/js/b02.obj';

            this.createObj(model, material, (obj) => {
                const scenery = obj;
                scenery.scale.set(1.2, 1.2, 1.2);
                scenery.size = { width: 120, height: 120 };
                scenery.rang = { x: 54.8, z: -54.8 };

                sceneryListArr.push(scenery);

                res();
            });
        });
    }

    /**
     * 风景3
     * */
    s3() {
        return new Promise((res, rej) => {
            const material = "https://static.cdn.24haowan.com/24haowan/test/js/b03.png";
            const model = 'https://static.cdn.24haowan.com/24haowan/test/js/b03.obj';

            this.createObj(model, material, (obj) => {
                const scenery = obj;
                scenery.scale.set(1.2, 1.2, 1.2);
                scenery.size = { width: 120, height: 120 };
                scenery.rang = { x: 54.8, z: -54.8 };

                sceneryListArr.push(scenery);

                res();
            });
        });
    }

    /**
     * 风景4
     * */
    s4() {
        return new Promise((res, rej) => {
            const material = "https://static.cdn.24haowan.com/24haowan/test/js/b04.png";
            const model = 'https://static.cdn.24haowan.com/24haowan/test/js/b04.obj';

            this.createObj(model, material, (obj) => {
                const scenery = obj;
                scenery.scale.set(1.2, 1.2, 1.2);
                scenery.size = { width: 120, height: 120 };
                scenery.rang = { x: 54.8, z: -54.8 };

                sceneryListArr.push(scenery);

                res();
            });
        });
    }

    /**
     * 风景5
     * */
    s5() {
        return new Promise((res, rej) => {
            const material = "https://static.cdn.24haowan.com/24haowan/test/js/b05.png";
            const model = 'https://static.cdn.24haowan.com/24haowan/test/js/b05.obj';

            this.createObj(model, material, (obj) => {
                const scenery = obj;
                scenery.scale.set(1.2, 1.2, 1.2);
                scenery.size = { width: 120, height: 120 };
                scenery.rang = { x: 54.8, z: -54.8 };

                sceneryListArr.push(scenery);

                res();
            });
        });
    }

    /**
     * 风景6
     * */
    s6() {
        return new Promise((res, rej) => {
            const material = "https://static.cdn.24haowan.com/24haowan/test/js/b06.png";
            const model = 'https://static.cdn.24haowan.com/24haowan/test/js/b06.obj';

            this.createObj(model, material, (obj) => {
                const scenery = obj;
                scenery.scale.set(1.2, 1.2, 1.2);
                scenery.size = { width: 120, height: 120 };
                scenery.rang = { x: 54.8, z: -54.8 };

                sceneryListArr.push(scenery);

                res();
            });
        });
    }

    /**
     * 风景7
     * 小风景
     * */
    s7() {
        return new Promise((res, rej) => {
            const material = "https://static.cdn.24haowan.com/24haowan/test/js/b-small.png";
            const model = 'https://static.cdn.24haowan.com/24haowan/test/js/b-small.obj';

            this.createObj(model, material, (obj) => {
                const scenery = obj;
                scenery.scale.set(1.2, 1.2, 1.2);
                scenery.size = { width: 120, height: 30 };
                scenery.rang = { x: 54.8, z: -10 };

                sceneryOtherListArr['tree'] = scenery;

                res();
            });
        });
    }
}
