import UTIL from './util';
import Speeder from "./speeder";
import pageGame from "./pages/game";

/**
 * 汽车函数
 */
export default class Car extends UTIL {
    constructor() {
        super();

        events.click({
            name: 'playGame',
            pageName: 'gamePage',
            point: [0, 0, winWidth, winHeight],
            cb: () => {
                this.drift();
            }
        });
    }

    build() {
        return Promise.all([this.createCar()]);
    }

    /**
     * 创建车模型
     */
    createCar() {
        const material = "https://static.cdn.24haowan.com/24haowan/test/js/car2.png";
        const model = 'https://static.cdn.24haowan.com/24haowan/test/js/car4.obj';

        return new Promise((res, rej) => {
            this.createObj(model, material, (obj) => {
                car = obj;

                car.scale.set(2, 2, 2);
                car.position.set(25, 15, -10);

                const boxShape = new CANNON.Box(new CANNON.Vec3(4, 4, 4));

                carBodys = new CANNON.Body({ mass: 2, shape: boxShape });
                carBodys.position.set(car.position.x, car.position.y, car.position.z);

                world.add(carBodys);

                scene.add(car);

                res();
            });
        });
    }

    /**
     * 漂移函数
     * */
    drift() {
        if (startKey) {
            // 播放漂移音乐
            music.playDrift();

            const localW = currentW;
            if (!clickKey) {
                Speeder((percent, status) => {
                    currentW = localW - percent * localW;

                    carBodys.quaternion.setFromAxisAngle(new CANNON.Vec3(0, 1, 0), currentW);

                    if (percent >= 1) {
                        movekey = 'z';
                    }

                    if (status === 'done') {
                        currentW = 0;
                    }
                });
                clickKey = true;
            } else {
                Speeder((percent, status) => {
                    currentW = localW + percent * (-1.57 - localW);

                    carBodys.quaternion.setFromAxisAngle(new CANNON.Vec3(0, 1, 0), currentW);
                    if (percent >= 1) {
                        movekey = 'x';
                    }

                    if (status === 'done') {
                        currentW = -1.57;
                    }
                });
                clickKey = false;
            }
        }
    }
}
