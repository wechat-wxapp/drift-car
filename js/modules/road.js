import UTIL from './util';


/**
 * 直路函数
 */
export default class Road extends UTIL {
    constructor() {
        super();
    }

    build() {
        return Promise.all([this.createRoad()]);
    }

    /**
     * 创建直线道路
     */
    createRoad() {
        const material = "https://static.cdn.24haowan.com/24haowan/test/js/nr0001.png";
        const model = 'https://static.cdn.24haowan.com/24haowan/test/js/newroad001.obj';

        return new Promise((res, rej) => {
            this.createObj(model, material, (obj) => {
                road = obj;

                road.scale.set(2, 2, 2);

                res();
            });
        });
    }

    /**
     * 返回r模型(直路)
     */
    r({ type } = {}) {
        const { key } = this.getLastRoad();
        const roadObj = road.clone();
        roadObj.key = key + 1;

        const roadBodyShape = new CANNON.Box(new CANNON.Vec3(28, 1, 30));
        const roadLeftShape = new CANNON.Box(new CANNON.Vec3(1, 8, 30));
        const roadRightShape = new CANNON.Box(new CANNON.Vec3(1, 8, 30));

        const roadBody = new CANNON.Body({ mass: 0, shape: roadBodyShape, position: new CANNON.Vec3(roadObj.position.x, 1, roadObj.position.z) });
        const roadBoths = new CANNON.Body({ mass: 0, position: new CANNON.Vec3(roadObj.position.x, 8, roadObj.position.z) });
        roadBoths.addShape(roadLeftShape, new CANNON.Vec3(-29, 0, 0));
        roadBoths.addShape(roadRightShape, new CANNON.Vec3(29, 0, 0));

        // 撞墙
        roadBoths.addEventListener("collide", this.collide.bind(this));
        // 得分
        roadBody.addEventListener("collide", () => {
            this.getScore(key, type);
        });

        world.add(roadBody);
        world.add(roadBoths);

        roadBodys.push(roadBody);
        roadCollisions.push(roadBoths);
        roadArr.push(roadObj);

        scene.add(roadObj);

        return {
            body: roadObj,
            physical: {
                floor: roadBody,
                boths: roadBoths
            }
        }
    }

    /**
     * 直路竖向模型
     */
    r1(params) {
        const { size, position, rang, key } = this.getLastRoad();
        const { body, physical: { floor, boths } } = this.r(params);

        // 模型原点偏移量
        body.rang = { x: 25, z: -25 };
        // 模型尺寸(根据原点位置)
        body.size = { width: 60, height: 60 };

        let x = position.x - rang.x + body.rang.x - body.size.width;
        let z = position.z - rang.z + body.rang.z - size.height;

        x += key === 0 ? body.size.width : size.width;

        if (key === 0) {
            z += body.size.height * 2;
        }

        body.position.set(x, 0, z);
        floor.position.set(x, floor.position.y, z);
        boths.position.set(x, boths.position.y, z);
        body.boxType = 'r1';

        return {
            body,
            physical: {
                floor,
                boths
            }
        }
    }

    /**
     * 直路横向模型
     */
    r2(params) {
        const { size, position, rang } = this.getLastRoad();
        const { body, physical: { floor, boths } } = this.r(params);
        body.size = { width: 60, height: 60 };
        body.rang = { x: 25, z: -25 };
        body.boxType = 'r2';

        const x = position.x - rang.x + body.rang.x - body.size.width + size.width + body.size.width;
        const z = body.rang.z + body.size.height + position.z - rang.z - size.height;

        body.position.set(x, 0, z);

        body.rotation.set(0, -1.57, 0);

        floor.position.set(x, floor.position.y, z);
        boths.position.set(x, boths.position.y, z);

        floor.quaternion.setFromAxisAngle(new CANNON.Vec3(0, 1, 0), -1.57);
        boths.quaternion.setFromAxisAngle(new CANNON.Vec3(0, 1, 0), -1.57);

        return {
            body,
            physical: {
                floor,
                boths
            }
        }
    }

    getRandomScenery() {
        return sceneryListArr[this.getRandomInt(0, sceneryListArr.length)];
    }

    r3() {
        const { body } = this.r1();
        const { body: body2 } = turnRoadClass.r3({ type: 'remove' });

        lastBoxType = 'r5';

        const { size, rang } = this.getRandomScenery();
        const scenery_1 = this.getRandomScenery().clone();
        const scenery_2 = this.getRandomScenery().clone();
        const scenery_3 = this.getRandomScenery().clone();
        const scenery_4 = this.getRandomScenery().clone();

        const x1 = body.position.x - body.rang.x + rang.x - size.width;
        const z1 = rang.z + body.position.z - body.rang.z - body.size.height;

        const x2 = x1 + body.size.width + size.width;
        const z2 = z1 + body.size.height;

        const x3 = body2.position.x - body2.rang.x + rang.x;
        const z3 = rang.z + body2.position.z - body2.rang.z - body2.size.height;

        const z4 = z1 - size.height;

        scenery_1.position.set(x1, 0, z1);
        scenery_2.position.set(x2, 0, z2);
        scenery_3.position.set(x3, 0, z3);
        scenery_4.position.set(x1, 0, z4);

        scenery_1.rotateY(3.142);
        scenery_3.rotateY(1.571);
        scenery_4.rotateY(3.142);

        scene.add(scenery_1);
        scene.add(scenery_2);
        scene.add(scenery_3);
        scene.add(scenery_4);

        sceneryArr.push([scenery_1, scenery_2, scenery_3, scenery_4]);
    }

    r4() {
        const { body } = this.r2();
        const { body: body2 } = turnRoadClass.r4({ type: 'remove' });

        lastBoxType = 'r6';

        const { size, rang } = this.getRandomScenery();
        const scenery_1 = this.getRandomScenery().clone();
        const scenery_2 = this.getRandomScenery().clone();
        const scenery_3 = this.getRandomScenery().clone();
        const scenery_4 = this.getRandomScenery().clone();

        const x1 = body.position.x - body.rang.x + rang.x + body.size.width;
        const z1 = rang.z + size.height + body.position.z - body.rang.z;

        const x2 = x1 - body.size.width;
        const z2 = z1 - body.size.height - size.height;

        const x3 = body2.position.x - body2.rang.x + rang.x + body2.size.width;
        const z3 = rang.z + body2.position.z - body2.rang.z;

        const x4 = x1 + size.width;

        scenery_1.position.set(x1, 0, z1);
        scenery_2.position.set(x2, 0, z2);
        scenery_3.position.set(x3, 0, z3);
        scenery_4.position.set(x4, 0, z1);

        scenery_1.rotateY(4.713);
        scenery_2.rotateY(1.571);

        scene.add(scenery_1);
        scene.add(scenery_2);
        scene.add(scenery_3);
        scene.add(scenery_4);

        sceneryArr.push([scenery_1, scenery_2, scenery_3, scenery_4]);
    }

    /**
     * 开始前置道路
     * */
    r5() {
        const { body } = this.r1();
        this.r1();

        lastBoxType = 'r6';

        const { size, rang } = this.getRandomScenery();
        const scenery_1 = this.getRandomScenery().clone();
        const scenery_2 = this.getRandomScenery().clone();

        const x1 = body.position.x - body.rang.x + rang.x - size.width;
        const z1 = rang.z + body.position.z - body.rang.z - body.size.height;

        const x2 = x1 + body.size.width + size.width;
        const z2 = z1 + body.size.height;

        scenery_1.position.set(x1, 0, z1);
        scenery_2.position.set(x2, 0, z2);

        scenery_1.rotateY(3.142);

        scene.add(scenery_1);
        scene.add(scenery_2);

        sceneryArr.push([scenery_1, scenery_2]);
    }

    /**
     * 连续短弯道
     * */
    r6() {
        const { body } = turnRoadSmallClass.r3();
        const { body: body2 } = turnRoadSmallClass.r4();
        turnRoadSmallClass.r3();
        turnRoadSmallClass.r4({ type: 'remove' });

        this.r1();

        lastBoxType = 'r6';

        const { size, rang } = this.getRandomScenery();
        const scenery_1 = this.getRandomScenery().clone();
        const scenery_2 = this.getRandomScenery().clone();
        const scenery_3 = this.getRandomScenery().clone();
        const scenery_4 = this.getRandomScenery().clone();
        const scenery_5 = this.getRandomScenery().clone();
        const scenery_6 = this.getRandomScenery().clone();
        const scenery_11 = this.getRandomScenery().clone();
        const scenery_12 = this.getRandomScenery().clone();

        const { size: treeSize } = sceneryOtherListArr.tree;
        const scenery_7 = sceneryOtherListArr.tree.clone();
        const scenery_8 = sceneryOtherListArr.tree.clone();
        const scenery_9 = sceneryOtherListArr.tree.clone();
        const scenery_10 = sceneryOtherListArr.tree.clone();

        const x1 = body.position.x - body.rang.x + rang.x;
        const z1 = rang.z + size.height + body.position.z - body.rang.z - body.size.height - size.height;

        const x2 = body2.position.x - body2.rang.x + rang.x + body2.size.width;
        const z2 = rang.z + body2.position.z - body2.rang.z;

        const x3 = x1 + size.width;
        const z3 = z1 - size.height;

        const x4 = x2 + size.width;
        const z4 = z2 - size.height;

        const z5 = z1 - size.height;

        const x6 = x2 + size.width;

        const x11 = x1 - size.width;

        const z12 = z2 + size.height;

        // 树
        const z7 = z2 + size.height / 2 + treeSize.height / 2;
        const x7 = x1 + body.size.width2;

        const z8 = z4 - size.height / 2 - treeSize.height / 2;

        const z9 = z3 - size.height / 2 - treeSize.height / 2;

        const x10 = x1 - treeSize.width;
        const z10 = z1 + size.height / 2 + treeSize.height / 2;

        scenery_1.position.set(x1, 0, z1);
        scenery_2.position.set(x2, 0, z2);
        scenery_3.position.set(x3, 0, z3);
        scenery_4.position.set(x4, 0, z4);
        scenery_5.position.set(x1, 0, z5);
        scenery_6.position.set(x6, 0, z2);
        scenery_11.position.set(x11, 0, z1);
        scenery_12.position.set(x2, 0, z12);

        scenery_7.position.set(x7, 0, z7);
        scenery_8.position.set(x4, 0, z8);
        scenery_9.position.set(x3, 0, z9);
        scenery_10.position.set(x10, 0, z10);

        scenery_1.rotateY(3.142);
        scenery_3.rotateY(3.142);
        scenery_5.rotateY(3.142);
        scenery_11.rotateY(3.142);

        scene.add(scenery_1);
        scene.add(scenery_2);
        scene.add(scenery_3);
        scene.add(scenery_4);
        scene.add(scenery_5);
        scene.add(scenery_6);
        scene.add(scenery_11);
        scene.add(scenery_12);

        scene.add(scenery_7);
        scene.add(scenery_8);
        scene.add(scenery_9);
        scene.add(scenery_10);

        sceneryArr.push([scenery_1, scenery_2, scenery_3, scenery_4, scenery_5, scenery_6, scenery_7, scenery_8, scenery_9, scenery_10, scenery_11, scenery_12]);
    }
}
