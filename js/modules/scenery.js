import UTIL from './util';
import b001 from '../../obj/js/b001.js';
import b002 from '../../obj/js/b002.js';
import b003 from '../../obj/js/b003.js';
import b004 from '../../obj/js/b004.js';
import b005 from '../../obj/js/b005.js';
import b006 from '../../obj/js/b006.js';
import b007 from '../../obj/js/b007.js';
import b008 from '../../obj/js/b008.js';
import b009 from '../../obj/js/b009.js';
import tree from '../../obj/js/tree.js';



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
        const material = "obj/nb01.png";
        return new $loadModel(b001, material, (obj) => {
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
        const material = "obj/nb02.png";

        return new $loadModel(b002, material, (obj) => {
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
        const material = "obj/nb03.png";

        return new $loadModel(b003, material, (obj) => {
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
        const material = "obj/nb04.png";

        return new $loadModel(b004, material, (obj) => {
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
        const material = "obj/nb05.png";

        return new $loadModel(b005, material, (obj) => {
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
        const material = "obj/nb06.png";

        return new $loadModel(b006, material, (obj) => {
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
        const material = "obj/nb07.png";

        return new $loadModel(b007, material, (obj) => {
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
        const material = "obj/nb08.png";

        return new $loadModel(b008, material, (obj) => {
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
        const material = "obj/nb09.png";

        return new $loadModel(b009, material, (obj) => {
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
        const material = "obj/ntree01.png";

        return new $loadModel(tree, material, (obj) => {
            const scenery = obj;
            scenery.scale.set(1.2, 1.2, 1.2);
            scenery.size = { width: 120, height: 30 };
            scenery.rang = { x: 54.8, z: -10 };

            sceneryOtherListArr['tree'] = scenery;
        });
    }
}