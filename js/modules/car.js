import UTIL from './util';
import Speeder from "./speeder";

/**
 * 汽车函数
 */
export default class Car extends UTIL {
    model = {
        id: 0,
        model: 'https://static.cdn.24haowan.com/24haowan/test/js/newcar1.obj',
        material: 'https://static.cdn.24haowan.com/24haowan/test/js/newcar1.png',
        modelSize: [ 2, 2, 2 ],
        cannonSize: [ 4, 6, 4 ]
    };

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
    createCar(data) {
        // const material = "https://static.cdn.24haowan.com/24haowan/test/js/newcar1.png";
        // const model = 'https://static.cdn.24haowan.com/24haowan/test/js/newcar1.obj';
        // // const material = "https://static.cdn.24haowan.com/24haowan/test/js/car2.png";
        // // const model = 'https://static.cdn.24haowan.com/24haowan/test/js/car4.obj';

        if (carBodys && car) this.removeCar();

        const currentModel = data || this.model;

        if (carList.length > 0) {
            const cacheCar = carList.find(v => v.data.id === currentModel.id);
            if (cacheCar) {
                const { car: carCache, physical } = cacheCar;

                car = carCache;
                carBodys = physical;

                // 添加车辆
                this.addCar();

                return false;
            }
        }

        // 加载汽车
        return this.loadCar(currentModel);
    }

    /**
     * 开始加载汽车
     * */
    loadCar(modelData) {
        const { model, material, modelSize, cannonSize } = modelData;

        return new Promise((res, rej) => {
            this.createObj(model, material, (obj) => {
                car = obj;

                car.scale.set(modelSize[0], modelSize[1], modelSize[2]);
                car.position.set(25, 15, -10);

                const boxShape = new CANNON.Box(new CANNON.Vec3(cannonSize[0], cannonSize[1], cannonSize[2]));

                carBodys = new CANNON.Body({ mass: 2, shape: boxShape });
                carBodys.position.set(car.position.x, car.position.y, car.position.z);

                // 缓存汽车列表
                carList.push({ data: modelData, car, physical: carBodys });

                // 添加车辆
                this.addCar();

                res();
            });
        });
    }

    /**
     * 删除车辆
     * */
    removeCar() {
        world.remove(carBodys);
        scene.remove(car);
    }

    /**
     * 添加车辆
     * */
    addCar() {
        world.add(carBodys);
        scene.add(car);
    }

    /**
     * 漂移函数
     * */
    drift() {
        if (startKey) {
            // 播放漂移音乐
            // music.playDrift();

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
                // carBodys.quaternion.setFromAxisAngle(new CANNON.Vec3(0, 1, 0), 0);
                // movekey = 'z';
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
                // carBodys.quaternion.setFromAxisAngle(new CANNON.Vec3(0, 1, 0), -1.57);
                // movekey = 'x';
                clickKey = false;
            }
        }
    }
}
