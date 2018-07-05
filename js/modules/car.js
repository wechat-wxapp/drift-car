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
    createCar(data) {
        // const material = "https://static.cdn.24haowan.com/24haowan/test/js/newcar1.png";
        // const model = 'https://static.cdn.24haowan.com/24haowan/test/js/newcar1.obj';
        // // const material = "https://static.cdn.24haowan.com/24haowan/test/js/car2.png";
        // // const model = 'https://static.cdn.24haowan.com/24haowan/test/js/car4.obj';

        if (carBodys && car) this.removeCar();

        const carCache = $cache.getGameData('car');

        const currentModel = data || carCache;

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
        const { model, material, modelSize, physicalSize } = modelData;

        return new Promise((res, rej) => {
            this.createObj(model, material, (obj) => {
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
}
