import UTIL from './util';
import TurnRoad from "./turn_road";


/**
 * 直路函数
 */
export default class Road extends UTIL {
    constructor() {
        super();
        this.createRoad();
        this.turnRoad = new TurnRoad();
    }

    /**
     * 创建直线道路
     */
    createRoad() {
        const material = "https://static.cdn.24haowan.com/24haowan/test/js/roadnnn3.png";
        const model = 'https://static.cdn.24haowan.com/24haowan/test/js/r.obj';

        this.createObj(model, material, (obj) => {
            road = obj;

            road.scale.set(3, 3, 3);
        });
    }

    /**
     * 返回r模型(直路)
     */
    r({ type } = {}) {
        const { key } = this.getLastRoad();
        const roadObj = road.clone();
        roadObj.key = key + 1;

        const roadBodyShape = new CANNON.Box(new CANNON.Vec3(17, 1.5, 12));
        const roadLeftShape = new CANNON.Box(new CANNON.Vec3(1.5, 3, 12));
        const roadRightShape = new CANNON.Box(new CANNON.Vec3(1.5, 3, 12));

        const roadBody = new CANNON.Body({ mass: 0, shape: roadBodyShape, position: new CANNON.Vec3(roadObj.position.x, 1.5, roadObj.position.z) });
        const roadBoths = new CANNON.Body({ mass: 0, position: new CANNON.Vec3(roadObj.position.x, 3, roadObj.position.z) });
        roadBoths.addShape(roadLeftShape, new CANNON.Vec3(-18.7, 0, 0));
        roadBoths.addShape(roadRightShape, new CANNON.Vec3(17.5, 0, 0));

        // 撞墙
        roadBoths.addEventListener("collide", this.collide.bind(this));
        // 得分
        roadBody.addEventListener("collide", () => {
            this.getScore(key, type)
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
        body.rang = { x: 15.1, z: -6.8 };
        // 模型尺寸(根据原点位置)
        body.size = { width: 39, height: 24 };

        let x = position.x - rang.x + body.rang.x - body.size.width;
        let z = position.z - rang.z + body.rang.z - size.height;

        x += key === 0 ? body.size.width : size.width;

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
        body.size = { width: 24, height: 39 };
        body.rang = { x: 6.9, z: -13.7 };
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

    r3() {
        const { body } = this.r1();
        this.r1();
        this.r1();
        this.r1();
        const { body: body2 } = this.turnRoad.r3();
        this.r2();
        this.r2();
        this.r2();
        this.r2({ type: 'remove' });

        lastBoxType = 'r5';

        const { size, rang } = scenery1;
        const scenery_1 = scenery1.clone();
        const scenery_2 = scenery1.clone();
        const scenery_3 = scenery1.clone();

        const x1 = body.position.x - body.rang.x + rang.x - size.width + body.size.width + size.width - body.size.width - size.width;
        const z1 = rang.z + size.height + body.position.z - body.rang.z - body.size.height + body.size.height - size.height;

        const x2 = x1 + body.size.width + size.width;

        const x3 = body2.position.x - body2.rang.x + rang.x - size.width + body2.size.width + size.width - body2.size.width;
        const z3 = rang.z + size.height + body2.position.z - body2.rang.z - body2.size.height + body2.size.height - size.height - body2.size.height;

        scenery_1.position.set(x1, 0, z1);
        scenery_2.position.set(x2, 0, z1);
        scenery_3.position.set(x3, 0, z3);

        scene.add(scenery_1);
        scene.add(scenery_2);
        scene.add(scenery_3);

        sceneryArr.push([scenery_1, scenery_2, scenery_3]);
    }

    r4() {
        const { body } = this.r2();
        this.r2();
        this.r2();
        this.r2();
        const { body: body2 } = this.turnRoad.r4();
        this.r1();
        this.r1();
        this.r1();
        this.r1({ type: 'remove' });

        lastBoxType = 'r6';

        const { size, rang } = scenery1;
        const scenery_1 = scenery1.clone();
        const scenery_2 = scenery1.clone();
        const scenery_3 = scenery1.clone();

        const x1 = body.position.x - body.rang.x + rang.x - size.width + body.size.width + size.width - body.size.width;
        const z1 = rang.z + size.height + body.position.z - body.rang.z - body.size.height + body.size.height;

        const z2 = z1 - body.size.height - size.height;

        const x3 = body2.position.x - body2.rang.x + rang.x - size.width + body2.size.width + size.width;
        const z3 = rang.z + size.height + body2.position.z - body2.rang.z - body2.size.height + body2.size.height - size.height;

        scenery_1.position.set(x1, 0, z1);
        scenery_2.position.set(x1, 0, z2);
        scenery_3.position.set(x3, 0, z3);

        scene.add(scenery_1);
        scene.add(scenery_2);
        scene.add(scenery_3);

        sceneryArr.push([scenery_1, scenery_2, scenery_3]);
    }
}
