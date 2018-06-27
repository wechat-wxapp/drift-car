import UTIL from './util';

/**
 * 弯路函数
 */
export default class Road extends UTIL {
    constructor() {
        super();
    }

    build() {
        return Promise.all([this.createTurnRoad()]);
    }

    /**
     * 创建转弯道路
     */
    createTurnRoad() {
        const material = "https://static.cdn.24haowan.com/24haowan/test/js/newroad002.png";
        const model = 'https://static.cdn.24haowan.com/24haowan/test/js/newroad002.obj';

        return new Promise((res, rej) => {
            this.createObj(model, material, (obj) => {
                turnRoad = obj;
                turnRoad.scale.set(2, 2, 2);

                res();
            });
        });
    }

    /**
     * 返回t模型(弯路)
     */
    t({ type } = {}) {
        const { key } = this.getLastRoad();
        const roadObj = turnRoad.clone();
        roadObj.key = key + 1;

        const roadBody1Shape = new CANNON.Box(new CANNON.Vec3(28, 1, 60));
        const roadBody2Shape = new CANNON.Box(new CANNON.Vec3(30, 1, 31));

        const collide1Shape = new CANNON.Box(new CANNON.Vec3(1, 2, 60));
        const collide2Shape = new CANNON.Box(new CANNON.Vec3(1, 2, 30));
        const collide3Shape = new CANNON.Box(new CANNON.Vec3(1, 2, 60));
        const collide4Shape = new CANNON.Box(new CANNON.Vec3(1, 2, 30));

        const roadBody = new CANNON.Body({ mass: 0, position: new CANNON.Vec3(0, 1, 0) });
        const roadBoths = new CANNON.Body({ mass: 0, position: new CANNON.Vec3(0, 2, roadObj.position.z - .5) });

        const rotating = new CANNON.Quaternion();
        rotating.setFromAxisAngle(new CANNON.Vec3(0, 1, 0), -1.57);

        roadBody.addShape(roadBody1Shape, new CANNON.Vec3(-26.5, 0, 0));
        roadBody.addShape(roadBody2Shape, new CANNON.Vec3(32.5, 0, -30), rotating);
        roadBoths.addShape(collide1Shape, new CANNON.Vec3(-55.3, 0, 0));
        roadBoths.addShape(collide2Shape, new CANNON.Vec3(2.5, 0, 30));
        roadBoths.addShape(collide3Shape, new CANNON.Vec3(3.5, 0, -59), rotating);
        roadBoths.addShape(collide4Shape, new CANNON.Vec3(33.5, 0, -1), rotating);

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
     * 弯道直向模型
     */
    r3(params) {
        const { size, position, rang, boxType } = this.getLastRoad();
        const { body, physical: { floor, boths } } = this.t(params);

        body.size = { width: 120, height: 119.5 };
        body.rang = { x: 51.3, z: -54.5 };
        body.boxType = 'r3';

        let x = position.x - rang.x + body.rang.x;
        const z = body.rang.z + body.size.height + position.z - rang.z - size.height - body.size.height;

        boxType === 'r4' && (x +=  size.width - size.width2);

        body.position.set(x, -0.09, z);
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
        body.size = { width: 120, width2: 59.5, height: 119.5, height2: 60 };
        body.rang = { x: 58.5, z: -55 };
        body.boxType = 'r4';

        body.rotation.set(0, 3.14, 0);

        const x = position.x - rang.x + body.rang.x + size.width;
        const z = body.rang.z + body.size.height2 + position.z - rang.z - size.height;

        floor.quaternion.setFromAxisAngle(new CANNON.Vec3(0, 1, 0), -3.14);
        boths.quaternion.setFromAxisAngle(new CANNON.Vec3(0, 1, 0), -3.14);

        body.position.set(x, -0.09, z);
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
}
