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
        // const material = "https://static.cdn.24haowan.com/24haowan/test/js/nr0003.png";
        const material = "obj/nr0003.png";
        const model = 'https://static.cdn.24haowan.com/24haowan/test/js/newroad0002.obj';

        return new Promise((res, rej) => {
            this.createObj(model, material, (obj) => {
                turnRoadSmall = obj;
                turnRoadSmall.scale.set(2, 2, 2);

                res();
            });
        });
    }

    /**
     * 返回t模型(弯路)
     */
    t({ type } = {}) {
        const { key } = this.getLastRoad();
        const roadObj = turnRoadSmall.clone();
        roadObj.key = key + 1;

        const roadBody1Shape = new CANNON.Box(new CANNON.Vec3(28, 1, 45));
        const roadBody2Shape = new CANNON.Box(new CANNON.Vec3(30, 1, 16));

        const collide1Shape = new CANNON.Box(new CANNON.Vec3(1, 8, 45));
        const collide2Shape = new CANNON.Box(new CANNON.Vec3(1, 8, 15));
        const collide3Shape = new CANNON.Box(new CANNON.Vec3(1, 8, 45));
        const collide4Shape = new CANNON.Box(new CANNON.Vec3(1, 8, 15));

        const roadBody = new CANNON.Body({ mass: 0, position: new CANNON.Vec3(0, 1, 0) });
        const roadBoths = new CANNON.Body({ mass: 0, position: new CANNON.Vec3(0, 8, roadObj.position.z - .5) });

        const rotating = new CANNON.Quaternion();
        rotating.setFromAxisAngle(new CANNON.Vec3(0, 1, 0), -1.57);

        roadBody.addShape(roadBody1Shape, new CANNON.Vec3(-26.5, 0, -15));
        roadBody.addShape(roadBody2Shape, new CANNON.Vec3(17.5, 0, -30), rotating);
        roadBoths.addShape(collide1Shape, new CANNON.Vec3(-55.3, 0, -15));
        roadBoths.addShape(collide2Shape, new CANNON.Vec3(2.5, 0, 15));
        roadBoths.addShape(collide3Shape, new CANNON.Vec3(-11.5, 0, -59), rotating);
        roadBoths.addShape(collide4Shape, new CANNON.Vec3(18.5, 0, -1), rotating);

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

        body.size = { width: 89, width2: 60, height: 89 };
        body.rang = { x: 50, z: -24.4 };
        body.boxType = 'r3';

        let x = position.x - rang.x + body.rang.x;
        const z = body.rang.z + body.size.height + position.z - rang.z - size.height - body.size.height;

        boxType === 'r4' && (x +=  size.width - size.width2);
        boxType === 'r1' && (x += .8);

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
        body.size = { width: 88.3, width2: 59.5, height: 89, height2: 60 };
        body.rang = { x: 27.5, z: -54.7 };
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
}
