import * as CANNON from './libs/cannon';
import './libs/OBJLoader';

import Speeder from './modules/speeder';

import './libs/cannonDebugRenderer';
import './libs/OrbitControls';

let scene, renderer, camera, car, road, turnRoad, world, controls, cannonDebugRenderer, ground, groundBody;

const ctx = canvas.getContext('webgl', { antialias: true, preserveDrawingBuffer: true });

// 模型变量
let carBodys;
let roadArr = [];
let roadBodys = [];
let roadCollisions = [];

const timeStep = 1 / 60;

// 当前旋转向量
let currentW = 0;

// 得分
let score = 0;
let lastScore = 0;

// 动画变量
let key = 0;
let maxKey = 10;
let movekey = 'z';
let clickKey = true;
let startKey = false;

// 路面回收锁
let removeKey = false;

// 道理旋转角度
const rotating = new CANNON.Quaternion();
rotating.setFromAxisAngle(new CANNON.Vec3(0, 1, 0), -4.73);

// 道路渲染序列
const loopRoadConfig = {
    r1: ['r1', 'r3'],
    r2: ['r2', 'r4'],
    r3: ['r2', 'r4'],
    r4: ['r1', 'r3']
};

// 速度变量
let speed = 1;
const speedMax = 2;
const speedStep = 0.01;
const speedStepMax = 0.08;
const levelSpeed = [10, 20, 30, 40, 50, 60, 70, 80];

/**
 * 游戏主函数
 */
export default class Main {
    constructor() {
        // 初始化3D世界
        this.initThree();
        // 初始化物理世界
        this.initCannon();
        // 创建车辆
        this.createCar();
        // 创建直路
        this.createRoad();
        // 创建弯路
        this.createTurnRoad();
        // 创建地板
        this.createGroundBody();
        // 渲染
        this.loop();

        document.addEventListener('touchstart', this.handleMouseStart.bind(this), false);

        setTimeout(() => {
            startKey = true;
        }, 3000);
    }

    /**
     * 初始化3D世界
     * */
    initThree() {
        scene = new THREE.Scene();
        renderer = new THREE.WebGLRenderer({ context: ctx, canvas: canvas });

        const winWidth = window.innerWidth;
        const winHeight = window.innerHeight;
        const cameraAspect = winWidth / winHeight;

        renderer.setSize(winWidth, winHeight);
        renderer.setPixelRatio(window.devicePixelRatio);

        console.log("屏幕尺寸: " + winWidth + " x " + winHeight);

        camera = new THREE.PerspectiveCamera(75, cameraAspect, .1, 10000000);
        camera.position.set(-16.738086885462103, 60.533387653514225, 28.513221776822927);
        camera.rotation.set(-0.9577585082113045, -0.3257201862210706, -0.42691147594250245);

        // 添加环境光
        const ambientLight = new THREE.AmbientLight(0x999999);
        scene.add(ambientLight);

        // 添加投射光
        const directionalLight = new THREE.DirectionalLight(0xcccccc);
        directionalLight.position.set(0, 1200, 1000).normalize();
        scene.add(directionalLight);

        // 摄像机调试
        // controls = new THREE.OrbitControls(camera);
    }

    /**
     * 初始化物理世界
     * */
    initCannon() {
        world = new CANNON.World();
        world.quatNormalizeSkip = 0;
        world.quatNormalizeFast = false;

        // 重力设置为99
        world.gravity.set(0, -99, 0);
        world.broadphase = new CANNON.NaiveBroadphase();

        // 显示物理世界
        // cannonDebugRenderer = new THREE.CannonDebugRenderer(scene, world);
    }

    /**
     * 创建地板
     * */
    createGroundBody() {
        const metal_texture = new THREE.TextureLoader().load("images/metal.jpg");
        metal_texture.wrapS = THREE.RepeatWrapping;
        metal_texture.wrapT = THREE.RepeatWrapping;
        metal_texture.repeat.set(1,1);

        // 地面
        const ground_material = new THREE.MeshBasicMaterial({ map: metal_texture });
        ground = new THREE.Mesh(new THREE.BoxGeometry(30000, 1, 30000), ground_material);
        ground.receiveShadow = true;
        ground.castShadow = true;
        // scene.add(ground);

        const groundShape = new CANNON.Plane();
        groundBody = new CANNON.Body({ mass: 0 });
        groundBody.addShape(groundShape);

        groundBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2);

        world.add(groundBody);
    }

    /**
     * 创建车模型
     */
    createCar() {
        const material = "https://static.cdn.24haowan.com/24haowan/test/js/car2.png";
        const model = 'https://static.cdn.24haowan.com/24haowan/test/js/car4.obj';

        this.createObj(model, material, (obj) => {
            car = obj;

            car.scale.set(1, 1, 1);
            car.position.set(13, 15, 0);
            // car.position.set(-2, 10, 10);

            const boxShape = new CANNON.Box(new CANNON.Vec3(3, 3, 3));

            carBodys = new CANNON.Body({ mass: 2, shape: boxShape });
            carBodys.position.set(car.position.x, car.position.y, car.position.z);

            world.add(carBodys);

            scene.add(car);
        });
    }

    /**
     * 创建直线道路
     */
    createRoad() {
        const material = "https://static.cdn.24haowan.com/24haowan/test/js/road01.jpg";
        const model = 'https://static.cdn.24haowan.com/24haowan/test/js/newroad.obj';

        this.createObj(model, material, (obj) => {
            road = obj;

            road.scale.set(3, 3, 3);
        });
    }

    /**
     * 创建转弯道路
     */
    createTurnRoad() {
        const material = "https://static.cdn.24haowan.com/24haowan/test/js/road01.jpg";
        const model = 'https://static.cdn.24haowan.com/24haowan/test/js/turnRoad22.obj';

        this.createObj(model, material, (obj) => {
            turnRoad = obj;
            turnRoad.scale.set(3, 3, 3);
        });
    }

    /**
     * 创建模型
     */
    createObj(model, material, callback) {
        // const manager = new THREE.LoadingManager();
        // manager.onProgress = (item, loaded, total) => {
        //   console.log(item, loaded, total);
        // };

        // const texture = new THREE.Texture();
        // const imgLoader = new THREE.ImageLoader(manager);
        // imgLoader.load(material, (image) => {
        //   texture.image = image;
        //   texture.needsUpdate = true;
        // });

        var texture = THREE.ImageUtils.loadTexture(material);

        const objLoader = new THREE.OBJLoader();
        objLoader.load(model, (obj) => {
            console.log('加载模型: ', model);
            // var materialObj = new THREE.MeshBasicMaterial({
            //   vertexColors: THREE.FaceColors,
            //   overdraw: 0.5
            // });

            obj.traverse((child) => {
                if (child instanceof THREE.Mesh) {
                    child.material.map = texture;
                }
            });

            callback(obj);
        }, (xhr) => {
            console.log((xhr.loaded / xhr.total * 100) + '% loaded');
        }, (err) => {
            console.log('发生了错误: ', model, err);
        });
    }

    /**
     * 获取最后未知的元素
     */
    getLastRoad() {
        try {
            const lastRoad = roadArr[roadArr.length - 1];
            const position = lastRoad.position;
            const size = lastRoad.size;
            const rang = lastRoad.rang;
            const boxType = lastRoad.boxType;

            return {
                position,
                size,
                rang,
                boxType
            }
        } catch (err) {
            return {
                position: { x: 0, y: 0, z: 0 },
                size: { width: 0, height: 0 },
                rang: { x: 0, z: 0 },
                boxType: 'r1'
            }
        }
    }

    /**
     * 撞墙后触发
     * */
    collide() {
        startKey = false;
        console.log('---结束游戏---');
    }

    /**
     * 得分
     * */
    getScore(key) {
        // 限制重复触发
        if (lastScore >= key) {
            return false;
        }

        if (key > 3) {
            removeKey = true;
        }

        maxKey++;
        score++;
        lastScore = key;
        console.log('目前得分: ', lastScore)
    }

    /**
     * 返回r模型(直路)
     */
    r(key) {
        const roadObj = road.clone();

        const roadBodyShape = new CANNON.Box(new CANNON.Vec3(17, 1.5, 12.5));
        const roadLeftShape = new CANNON.Box(new CANNON.Vec3(1.5, 5, 12.5));
        const roadRightShape = new CANNON.Box(new CANNON.Vec3(1.5, 5, 12.5));

        const roadBody = new CANNON.Body({ mass: 0, shape: roadBodyShape, position: new CANNON.Vec3(roadObj.position.x, 2.2, roadObj.position.z) });
        const roadBoths = new CANNON.Body({ mass: 0, position: new CANNON.Vec3(roadObj.position.x, 5, roadObj.position.z) });
        roadBoths.addShape(roadLeftShape, new CANNON.Vec3(-18.5, 0, 0));
        roadBoths.addShape(roadRightShape, new CANNON.Vec3(17, 0, 0));

        // 撞墙
        roadBoths.addEventListener("collide", this.collide);
        // 得分
        roadBody.addEventListener("collide", () => {
            this.getScore(key)
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
     * 返回t模型(弯路)
     */
    t(key) {
        const roadObj = turnRoad.clone();

        const roadBody1Shape = new CANNON.Box(new CANNON.Vec3(17, 1.5, 37));
        const roadBody2Shape = new CANNON.Box(new CANNON.Vec3(17, 1.5, 27));

        const collide1Shape = new CANNON.Box(new CANNON.Vec3(1.5, 5, 36));
        const collide2Shape = new CANNON.Box(new CANNON.Vec3(1.5, 5, 20.5));
        const collide3Shape = new CANNON.Box(new CANNON.Vec3(1.5, 5, 26));
        const collide4Shape = new CANNON.Box(new CANNON.Vec3(1.5, 5, 44));

        const roadBody = new CANNON.Body({ mass: 0, position: new CANNON.Vec3(0, 2.2, 0) });
        const roadBoths = new CANNON.Body({ mass: 0, position: new CANNON.Vec3(0, 5, roadObj.position.z - .5) });

        roadBody.addShape(roadBody1Shape, new CANNON.Vec3(0, 0, -12));
        roadBody.addShape(roadBody2Shape, new CANNON.Vec3(42, 0, -30), rotating);
        roadBoths.addShape(collide1Shape, new CANNON.Vec3(-18.5, 0, -11));
        roadBoths.addShape(collide2Shape, new CANNON.Vec3(17, 0, 5));
        roadBoths.addShape(collide3Shape, new CANNON.Vec3(43, 0, -14), rotating);
        roadBoths.addShape(collide4Shape, new CANNON.Vec3(25, 0, -50), rotating);

        // 撞墙
        roadBoths.addEventListener("collide", this.collide);

        // 得分
        roadBody.addEventListener("collide", () => {
            this.getScore(key)
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
    r1(key) {
        const { size, position, rang, boxType } = this.getLastRoad();
        const { body, physical: { floor, boths } } = this.r(key);

        // 模型原点偏移量
        body.rang = { x: 15, z: -7 };
        // 模型尺寸(根据原点位置)
        body.size = { width: 38.5, height: 25 };

        let x = position.x - rang.x + body.rang.x - body.size.width;
        let z = position.z - rang.z + body.rang.z - size.height;

        x += key === 0 ? body.size.width : size.width;

        body.position.set(x, 0, z);
        floor.position.set(x, floor.position.y, z);
        boths.position.set(x, boths.position.y, z);
        body.boxType = 'r1';
    }


    /**
     * 直路横向模型
     */
    r2(key) {
        const { size, position, rang, boxType } = this.getLastRoad();
        const { body, physical: { floor, boths } } = this.r(key);
        body.size = { width: 25, height: 38.5 };
        body.rang = { x: 7, z: -13.5 };
        body.boxType = 'r2';

        const x = position.x - rang.x + body.rang.x - body.size.width + size.width + body.size.width;
        const z = body.rang.z + body.size.height + position.z - rang.z - size.height;

        body.position.set(x, 0, z);
        body.rotation.set(0, 4.73, 0);

        floor.position.set(x, floor.position.y, z);
        boths.position.set(x, boths.position.y, z);

        floor.quaternion.setFromAxisAngle(new CANNON.Vec3(0, 1, 0), -4.7);
        boths.quaternion.setFromAxisAngle(new CANNON.Vec3(0, 1, 0), -4.7);
    }

    /**
     * 弯道直向模型
     */
    r3(key) {
        const { size, position, rang, boxType } = this.getLastRoad();
        const { body, physical: { floor, boths } } = this.t(key);

        body.size = { width: 89, height: 76 };
        body.rang = { x: 15, z: -20 };
        body.boxType = 'r3';

        let x = position.x - rang.x + body.rang.x;
        const z = body.rang.z + body.size.height + position.z - rang.z - size.height - body.size.height;

        boxType === 'r4' && (x +=  size.width - size.width2);

        body.position.set(x, 0, z);
        floor.position.set(x, floor.position.y, z);
        boths.position.set(x, boths.position.y, z);

    }
    /**
     * 弯道横向模型
     */
    r4(key) {
        const { size, position, rang, boxType } = this.getLastRoad();
        const { body, physical: { floor, boths } } = this.t(key);
        body.size = { width: 89, width2: 39, height: 76, height2: 38 };
        body.rang = { x: 64, z: -46 };
        body.boxType = 'r4';

        body.rotation.set(0, 3.14, 0);

        const x = position.x - rang.x + body.rang.x + size.width;
        const z = body.rang.z + body.size.height2 + position.z - rang.z - size.height;

        floor.quaternion.setFromAxisAngle(new CANNON.Vec3(0, 1, 0), -3.14);
        boths.quaternion.setFromAxisAngle(new CANNON.Vec3(0, 1, 0), -3.14);

        // 第一赛道偏移量28
        body.position.set(x, 0, z);
        floor.position.set(x, floor.position.y, z);
        boths.position.set(x, boths.position.y, z);
    }

    /**
     * 更新路路面
     */
    updateRoad() {
        if (road && turnRoad && key < maxKey) {
            const { boxType } = this.getLastRoad();
            const currentRoadConfig = loopRoadConfig[boxType];
            const random = Math.round(Math.random(0, 1));

            if (key < 5) {
                this.r1(key);
            } else {
                this[currentRoadConfig[random]](key);
            }

            // if (key < 1) {
            //     this.r3(key);
            // } else if (key === 1) {
            //     this.r4(key);
            // } else if (key === 2) {
            //     this.r4(key);
            // } else if (key === 3) {
            //     this.r3(key);
            // } else if (key === 4) {
            //     this.r2(key);
            // } else if (key === 5) {
            //     this.r4(key);
            // } else if (key === 6) {
            //     this.r3(key);
            // } else if (key === 7) {
            //     this.r2(key);
            // } else if (key === 8) {
            //     this.r2(key);
            // } else {
            //     this.r4(key);
            // }

            key += 1;
        }
    }

    /**
     * 点击转弯函数
     */
    handleMouseStart() {
        if (startKey) {
            const localW = currentW;
            if (!clickKey) {
                Speeder((percent, status) => {
                    currentW = localW - percent * localW;

                    carBodys.quaternion.setFromAxisAngle(new CANNON.Vec3(0, 1, 0), currentW);

                    if (percent >= 1.1) {
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

                    if (percent >= 1.1) {
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

    /**
     * 更新车辆和摄像机未知
     */
    updateAnimation() {
        if (startKey) {
            if (movekey === 'x') {
                car.position.x += speed;
                carBodys.position.x += speed;
                camera.position.x += speed;
            } else {
                car.position.z -= speed;
                carBodys.position.z -= speed;
                camera.position.z -= speed;
            }
        }

        cannonDebugRenderer && cannonDebugRenderer.update();

        renderer.setClearColor('#428bca', 1.0);
        renderer.render(scene, camera)
    }

    /**
     * 更新物理世界
     * */
    updateWorld() {
        world.step(timeStep);
        // ground.position.copy(groundBody.position);
        // ground.quaternion.copy(groundBody.quaternion);
        if (car) {
            car.position.copy(carBodys.position);
            car.quaternion.copy(carBodys.quaternion);
        }
    }

    /**
     * 加速函数
     * */
    updateLevelSpeed(s = 0) {
        if (s >= speedStepMax) return false;
        s += speedStep;
        speed += s;
        setTimeout(() => {
            this.updateLevelSpeed(s);
        }, 100)
    }

    /**
     * 回收路面
     * */
    removeObj() {
        if (!removeKey) return false;

        world.remove(roadBodys.shift());
        world.remove(roadCollisions.shift());

        scene.remove(roadArr.shift());

        removeKey = false;
    }

    /**
     * 判断是否加速
     * */
    updateSpeed() {
        if (startKey && speed <= speedMax) {
            const levelScore = levelSpeed[0];
            if (score >= levelScore) {
                levelSpeed.splice(0, 1);
                this.updateLevelSpeed();
                console.log('---加速---');
            }
        }
    }

    // 实现帧循环
    loop() {
        // 更新物理世界
        this.updateWorld();
        // 生成路面
        this.updateRoad();
        // 更新汽车动画
        this.updateAnimation();
        // 加速
        this.updateSpeed();
        // 回收路面
        this.removeObj();

        requestAnimationFrame(this.loop.bind(this), canvas);
    }
}
