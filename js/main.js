import './libs/OBJLoader';

import Music from './modules/music';

import './libs/cannonDebugRenderer';
import './libs/OrbitControls';


import GroundBody from './modules/ground';
import bindEvent from './modules/bind-event';

import WX from './libs/wx';
import UTIL from "./modules/util";

// 2d画布
import page from './modules/pages/index';
import Shared from './modules/pages/shared';
import pageLoading from './modules/pages/loading';

/**
 * 游戏主函数
 */
export default class Main extends UTIL {
    constructor() {
        super();

        // 初始化3D世界
        this.initThree();

        // 初始化物理世界
        this.initCannon();

        // 创建地板
        groundClass = new GroundBody();

        // 创建全局绑定对象
        events = new bindEvent();

        // 创建音乐播放器
        music = new Music();

        // 实例化微信类
        $wx = new WX();
        // 无法加载
        // $wx.getFontFamily();

        new page();
        new Shared();
        // 创建loading页对象
        loadingPage = new pageLoading();

        // 渲染
        this.loop();
    }

    /**
     * 初始化3D世界
     * */
    initThree() {
        const ctx = canvas.getContext('webgl', { antialias: true, preserveDrawingBuffer: true });

        scene = new THREE.Scene();
        renderer = new THREE.WebGLRenderer({ context: ctx, canvas });

        const cameraAspect = winWidth / winHeight;

        renderer.setSize(winWidth, winHeight);
        renderer.setPixelRatio(window.devicePixelRatio);

        console.log("屏幕尺寸: " + winWidth + " x " + winHeight);

        camera = new THREE.PerspectiveCamera(75, cameraAspect, .1, 500);
        camera.position.set(-16.738086885462103, 90.533387653514225, 28.513221776822927);
        camera.rotation.set(-0.9577585082113045, -0.3257201862210706, -0.42691147594250245);

        // 添加环境光 0x999999
        const ambientLight = new THREE.AmbientLight('#7c7c7c');
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
        cannonDebugRenderer = new THREE.CannonDebugRenderer(scene, world);
    }

    r1() {
        roadClass.r1();
    }

    /**
     * 直路竖向模型
     */
    r5() {
        roadClass.r3();
    }

    /**
     * 直路横向模型
     */
    r6() {
        roadClass.r4();
    }

    /**
     * 直路横向模型
     */
    r7() {
        roadClass.r5();
    }

    /**
     * 弯道直向模型
     */
    r3(key) {
        turnRoadClass.r3(key);
    }

    /**
     * 弯道横向模型
     */
    r4(key) {
        turnRoadClass.r4(key);
    }

    /**
     * 更新路路面
     */
    updateRoad() {
        if (key < maxKey) {
            // if (key < 1) {

            if (key === 0) {
                this.r7();
            } else {
                const currentRoadConfig = loopRoadConfig[lastBoxType];
                const random = 0;

                this[currentRoadConfig[random]]();
            }


            // if (key < 1) {
            //     this.r7();
            // } else if (key === 1) {
            //     this.r5();
            // } else if (key === 2) {
            //     this.r6();
            // } else if (key === 3) {
            //     this.r5();
            // } else if (key === 4) {
            //     this.r6();
            // } else if (key === 5) {
            //     this.r5();
            // }

            key += 1;
        }
    }

    /**
     * 点击函数
     */
    handleMouseStart(e) {
        // 触发绑定事件判断
        // events.onClick(e);
    
        // 触发漂移
        this.drift();
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
                speedRecord.x += speed;

                // 2d canvas
                // offCanvasSprite.position.x += speed;
                // sharedCanvasSprite.position.x += speed;
            } else {
                car.position.z -= speed;
                carBodys.position.z -= speed;
                camera.position.z -= speed;

                speedRecord.z += speed;

                // 2d canvas
                // offCanvasSprite.position.z -= speed;
                // sharedCanvasSprite.position.z -= speed;
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

        car.position.copy(carBodys.position);
        car.quaternion.copy(carBodys.quaternion);
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
     * 判断是否加速
     * */
    updateSpeed() {
        if (startKey && speed <= speedMax) {
            const levelScore = levelSpeed[level];
            if (levelScore && score >= levelScore) {
                level++;
                // levelSpeed.splice(0, 1);
                this.updateLevelSpeed();
                console.log(`---加速 当前区间 ${level}---`);
            }
        }
    }

    // 实现帧循环
    loop() {
        // 更新物理世界
        loadKey && this.updateWorld();
        // 生成路面
        loadKey && this.updateRoad();
        // 更新汽车动画
        this.updateAnimation();
        // 加速
        this.updateSpeed();
        // 回收路面
        this.removeObj();

        // texture2d.needsUpdate = true;
        sharedTexture2d.needsUpdate = true;

        requestAnimationFrame(this.loop.bind(this), canvas);
    }
}
