import UTIL from './util';
import b001 from '../../obj/js/b001.js';

/**
 * 风景函数
 */
export default class Scenery extends UTIL {
    constructor() {
        super();
    }

    build() {
        return Promise.all([
            this.s1(),
            this.s2(),
            this.s3(),
            this.s4(),
            this.s5(),
            this.s6(),
            this.s7(),
            this.s8(),
            this.s9(),
            this.sTree()
        ]);
    }

    /**
     * 风景1
     */
    s1() {
        // const material = "https://static.cdn.24haowan.com/24haowan/test/js/nb01.png";
        const material = "obj/nb01.png";
        const model = b001;
        return new $loadModel(model, material, (obj) => {
            const scenery = obj;
            scenery.scale.set(1.2, 1.2, 1.2);
            scenery.size = { width: 120, height: 120 };
            scenery.rang = { x: 54.8, z: -54.8 };

            sceneryListArr.push(scenery);
        });
    }

    /**
     * 风景2
     * */
    s2() {
        // const material = "https://static.cdn.24haowan.com/24haowan/test/js/nb02.png";
        const material = "obj/nb02.png";
        const model = 'https://static.cdn.24haowan.com/24haowan/test/js/b002.obj';

        return new $loadModel(model, material, (obj) => {
            const scenery = obj;
            scenery.scale.set(1.2, 1.2, 1.2);
            scenery.size = { width: 120, height: 120 };
            scenery.rang = { x: 54.8, z: -54.8 };

            sceneryListArr.push(scenery);
        });
    }

    /**
     * 风景3
     * */
    s3() {
        // const material = "https://static.cdn.24haowan.com/24haowan/test/js/nb03.png";
        const material = "obj/nb03.png";
        const model = 'https://static.cdn.24haowan.com/24haowan/test/js/b003.obj';

        return new $loadModel(model, material, (obj) => {
            const scenery = obj;
            scenery.scale.set(1.2, 1.2, 1.2);
            scenery.size = { width: 120, height: 120 };
            scenery.rang = { x: 54.8, z: -54.8 };

            sceneryListArr.push(scenery);
        });
    }

    /**
     * 风景4
     * */
    s4() {
        // const material = "https://static.cdn.24haowan.com/24haowan/test/js/nb04.png";
        const material = "obj/nb04.png";
        const model = 'https://static.cdn.24haowan.com/24haowan/test/js/b004.obj';

        return new $loadModel(model, material, (obj) => {
            const scenery = obj;
            scenery.scale.set(1.2, 1.2, 1.2);
            scenery.size = { width: 120, height: 120 };
            scenery.rang = { x: 54.8, z: -54.8 };

            sceneryListArr.push(scenery);
        });
    }

    /**
     * 风景5
     * */
    s5() {
        // const material = "https://static.cdn.24haowan.com/24haowan/test/js/nb05.png";
        const material = "obj/nb05.png";
        const model = 'https://res.suv666.com/24haowan/pyds/b005.obj';

        return new $loadModel(model, material, (obj) => {
            const scenery = obj;
            scenery.scale.set(1.2, 1.2, 1.2);
            scenery.size = { width: 120, height: 120 };
            scenery.rang = { x: 54.8, z: -54.8 };

            sceneryListArr.push(scenery);
        });
    }

    /**
     * 风景6
     * */
    s6() {
        // const material = "https://static.cdn.24haowan.com/24haowan/test/js/nb06.png";
        const material = "obj/nb06.png";
        const model = 'https://res.suv666.com/24haowan/pyds/b006.obj';

        return new $loadModel(model, material, (obj) => {
            const scenery = obj;
            scenery.scale.set(1.2, 1.2, 1.2);
            scenery.size = { width: 120, height: 120 };
            scenery.rang = { x: 54.8, z: -54.8 };

            sceneryListArr.push(scenery);
        });
    }

    /**
     * 风景7
     * */
    s7() {
        // const material = "https://static.cdn.24haowan.com/24haowan/test/js/nb07.png";
        const material = "obj/nb07.png";
        const model = 'https://res.suv666.com/24haowan/pyds/b007.obj';

        return new $loadModel(model, material, (obj) => {
            const scenery = obj;
            scenery.scale.set(1.2, 1.2, 1.2);
            scenery.size = { width: 120, height: 120 };
            scenery.rang = { x: 54.8, z: -54.8 };

            sceneryListArr.push(scenery);
        });
    }

    /**
     * 风景8
     * */
    s8() {
        // const material = "https://static.cdn.24haowan.com/24haowan/test/js/nb08.png";
        const material = "obj/nb08.png";
        const model = 'https://res.suv666.com/24haowan/pyds/b008.obj';

        return new $loadModel(model, material, (obj) => {
            const scenery = obj;
            scenery.scale.set(1.2, 1.2, 1.2);
            scenery.size = { width: 120, height: 120 };
            scenery.rang = { x: 54.8, z: -54.8 };

            sceneryListArr.push(scenery);
        });
    }

    /**
     * 风景9
     * */
    s9() {
        // const material = "https://static.cdn.24haowan.com/24haowan/test/js/nb09.png";
        const material = "obj/nb09.png";
        const model = 'https://res.suv666.com/24haowan/pyds/b009.obj';

        return new $loadModel(model, material, (obj) => {
            const scenery = obj;
            scenery.scale.set(1.2, 1.2, 1.2);
            scenery.size = { width: 120, height: 120 };
            scenery.rang = { x: 54.8, z: -54.8 };

            sceneryListArr.push(scenery);
        });
    }

    /**
     * 风景树
     * */
    sTree() {
        // const material = "https://static.cdn.24haowan.com/24haowan/test/js/ntree01.png";
        const material = "obj/ntree01.png";
        const model = 'https://static.cdn.24haowan.com/24haowan/test/js/tree.obj';

        return new $loadModel(model, material, (obj) => {
            const scenery = obj;
            scenery.scale.set(1.2, 1.2, 1.2);
            scenery.size = { width: 120, height: 30 };
            scenery.rang = { x: 54.8, z: -10 };

            sceneryOtherListArr['tree'] = scenery;
        });
    }
}