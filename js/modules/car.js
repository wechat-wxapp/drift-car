import UTIL from './util';

/**
 * 汽车函数
 */
export default class Car extends UTIL {
    constructor() {
        super();
    }

    build() {
        return Promise.all([this.createCar()]);
    }

    /**
     * 创建车模型
     */
    createCar() {
        return new Promise((resolve, reject) => {
            if (carBodys && car) this.removeCar();

            const carCache = $cache.getGameData('car');

            // 设置车辆速度属性
            this.setCarSpeed();

            if (carList.length > 0) {
                const cacheCar = carList.find(v => v.data.id === carCache.id);
                if (cacheCar) {
                    const { car: carCache, physical } = cacheCar;

                    car = carCache;
                    carBodys = physical;

                    // 添加车辆
                    this.addCar();
                    resolve();
                    return false;
                }
            }

            $loader.show('正在加载车辆...');
            // 加载汽车
            this.loadCar(carCache)
                .then(() => {
                    $loader.hide();

                    resolve();
                });
        });
    }

    /**
     * 设置车辆速度属性
     * */
    setCarSpeed() {
        const { speed: s, speedMax: sm, speedStep: ss, levelSpeed: ls, speedStepMax: ssm } = $cache.getCarSpeed();
        speed = s;
        speedMax = sm;
        speedStep = ss;
        levelSpeed = ls;
        speedStepMax = ssm;
    }

    /**
     * 开始加载汽车
     * @params {Object} 模型配置
     * */
    loadCar(modelData) {
        const { model, material, modelSize, physicalSize } = modelData;

        return new $loadModel(model, material, (obj) => {
            car = obj;

            car.scale.set(modelSize[0], modelSize[1], modelSize[2]);
            car.position.set(25, 15, -10);

            const boxShape = new CANNON.Box(new CANNON.Vec3(physicalSize[0], physicalSize[1], physicalSize[2]));

            carBodys = new CANNON.Body({ mass: 2, shape: boxShape });
            carBodys.position.set(car.position.x, car.position.y, car.position.z);

            // 缓存汽车列表
            carList.push({ data: modelData, car, physical: carBodys });

            // 添加车辆
            this.addCar();
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
}
