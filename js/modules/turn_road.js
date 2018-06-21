import UTIL from './util';

/**
 * 弯路函数
 */
export default class Road extends UTIL {
    constructor() {
        super();
        this.createTurnRoad();
    }

    /**
     * 创建转弯道路
     */
    createTurnRoad() {
        const material = "https://static.cdn.24haowan.com/24haowan/test/js/road.png";
        const model = 'https://static.cdn.24haowan.com/24haowan/test/js/t.obj';

        this.createObj(model, material, (obj) => {
            turnRoad = obj;
            turnRoad.scale.set(3, 3, 3);
        });
    }

    /**
     * 返回t模型(弯路)
     */
    t({ type } = {}) {
        const { key } = this.getLastRoad();
        const roadObj = turnRoad.clone();
        roadObj.key = key + 1;

        const roadBody1Shape = new CANNON.Box(new CANNON.Vec3(17, 1.5, 31.5));
        const roadBody2Shape = new CANNON.Box(new CANNON.Vec3(17, 1.5, 12.9));

        const collide1Shape = new CANNON.Box(new CANNON.Vec3(1.5, 3, 31.5));
        const collide2Shape = new CANNON.Box(new CANNON.Vec3(1.5, 3, 13.8));
        const collide3Shape = new CANNON.Box(new CANNON.Vec3(1.5, 3, 31.5));
        const collide4Shape = new CANNON.Box(new CANNON.Vec3(1.5, 3, 13.5));

        const roadBody = new CANNON.Body({ mass: 0, position: new CANNON.Vec3(0, 1.5, 0) });
        const roadBoths = new CANNON.Body({ mass: 0, position: new CANNON.Vec3(0, 3, roadObj.position.z - .5) });

        const rotating = new CANNON.Quaternion();
        rotating.setFromAxisAngle(new CANNON.Vec3(0, 1, 0), -1.57);

        roadBody.addShape(roadBody1Shape, new CANNON.Vec3(0, 0, 2));
        roadBody.addShape(roadBody2Shape, new CANNON.Vec3(29.7, 0, -10), rotating);
        roadBoths.addShape(collide1Shape, new CANNON.Vec3(-18.7, 0, 2));
        roadBoths.addShape(collide2Shape, new CANNON.Vec3(17.5, 0, 20));
        roadBoths.addShape(collide3Shape, new CANNON.Vec3(11.5, 0, -28), rotating);
        roadBoths.addShape(collide4Shape, new CANNON.Vec3(29.1, 0, 8.1), rotating);

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
     * 弯道直向模型
     */
    r3(params) {
        const { size, position, rang, boxType } = this.getLastRoad();
        const { body, physical: { floor, boths } } = this.t(params);

        body.size = { width: 62.9, height: 62.9 };
        body.rang = { x: 15.2, z: -28.4 };
        body.boxType = 'r3';

        let x = position.x - rang.x + body.rang.x;
        const z = body.rang.z + body.size.height + position.z - rang.z - size.height - body.size.height;

        boxType === 'r4' && (x +=  size.width - size.width2);

        body.position.set(x, 0, z);
        floor.position.set(x, floor.position.y, z);
        boths.position.set(x, boths.position.y, z);

        return {
            body,
            physical: {
                floor,
                boths
            }
        }
    }

    /**
     * 弯道横向模型
     */
    r4(params) {
        const { size, position, rang } = this.getLastRoad();
        const { body, physical: { floor, boths } } = this.t(params);
        body.size = { width: 62.9, width2: 38.9, height: 62.9, height2: 38.9 };
        body.rang = { x: 37.4, z: -24.1 };
        body.boxType = 'r4';

        body.rotation.set(0, 3.14, 0);

        const x = position.x - rang.x + body.rang.x + size.width;
        const z = body.rang.z + body.size.height2 + position.z - rang.z - size.height;

        floor.quaternion.setFromAxisAngle(new CANNON.Vec3(0, 1, 0), -3.14);
        boths.quaternion.setFromAxisAngle(new CANNON.Vec3(0, 1, 0), -3.14);

        body.position.set(x, 0, z);
        floor.position.set(x, floor.position.y, z);
        boths.position.set(x, boths.position.y, z);

        return {
            body,
            physical: {
                floor,
                boths
            }
        }
    }

    r5(params) {
        const { body } = this.r3(params);

        const { size, rang } = scenery1;
        const scenery = scenery1.clone();

        sceneryArr.push([scenery]);

        const x1 = body.position.x - body.rang.x + rang.x - size.width + body.size.width + size.width - body.size.width;
        const z1 = rang.z + size.height + body.position.z - body.rang.z - body.size.height + body.size.height - size.height - body.size.height;

        scenery.position.set(x1, 0, z1);

        scene.add(scenery);
    }

    r6(params) {
        const { body } = this.r4(params);

        const { size, rang } = scenery1;
        const scenery = scenery1.clone();

        sceneryArr.push([scenery]);

        const x1 = body.position.x - body.rang.x + rang.x - size.width + body.size.width + size.width;
        const z1 = rang.z + size.height + body.position.z - body.rang.z - body.size.height + body.size.height - size.height;

        scenery.position.set(x1, 0, z1);

        scene.add(scenery);
    }
}
