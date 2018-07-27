import './libs/OBJLoader';

import './libs/cannonDebugRenderer';
import './libs/OrbitControls';

import Music from './modules/music';

import GroundBody from './modules/ground';
import bindEvent from './modules/bind-event';

import WX from './libs/wx';
import CACHE from './libs/cache';
import LOADER from './libs/loader';
import UTIL from "./modules/util";

// 2d画布
import page from './modules/pages/main/index';

import VideoAd from './modules/video-ad';

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

        // 实例化缓存类
        $cache = new CACHE();

        // 实例化loading类
        $loader = new LOADER();

        // 实例化微信类
        $wx = new WX();

        // 实例化主屏2d
        pageClass = new page(renderer);

        // 播放背景音乐
        this.playBgm();

        // 渲染
        this.loop();

        //视频广告对象，初始化就会请求
        videoAd = new VideoAd;
    }

    /**
     * 初始化3D世界
     * */
    initThree() {
        ctx = canvas.getContext('webgl', { antialias: true, preserveDrawingBuffer: true });

        scene = new THREE.Scene();
        renderer = new THREE.WebGLRenderer({ context: ctx, canvas });
        renderer.setClearColor('#428bca', 1);
        renderer.autoClear = false;

        const cameraAspect = winWidth / winHeight;

        renderer.setSize(winWidth, winHeight);
        renderer.setPixelRatio(window.devicePixelRatio);

        console.log("屏幕尺寸: " + winWidth + " x " + winHeight);

        camera = new THREE.PerspectiveCamera(75, cameraAspect, .1, 10000);
        camera.position.set(-10.738086885462103, 90.533387653514225, 52.513221776822927);
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
        // cannonDebugRenderer = new THREE.CannonDebugRenderer(scene, world);
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
     * 连续短弯道
     */
    r8() {
        roadClass.r6();
    }

    /**
     * 更新路路面
     */
    updateRoad() {
        if (key < maxKey) {
        //     if (key < 1) {

            if (key === 0) {
                this.r7();
            } else if (key === 1) {
                this.r5();
            } else {
                const currentRoadConfig = loopRoadConfig[lastBoxType];
                const random = this.getRandomInt(0, currentRoadConfig.length);

                this[currentRoadConfig[random]]();
            }


            // if (key < 1) {
            //     this.r7();
            // } else if (key === 1) {
            //     this.r7();
            // } else if (key === 2) {
            //     this.r6();
            // } else if (key === 3) {
            //     this.r8();
            // } else if (key === 4) {
            //     this.r5();
            // } else if (key === 5) {
            //     this.r6();
            // } else if (key === 6) {
            //     this.r8();
            // }

            key += 1;
        }
    }

    _changeX(speed) {
        car.position.x += speed;
        carBodys.position.x += speed;
        camera.position.x += speed;
        
        // 2d canvas
        scoreCanvasSprite.position.x += speed;
        beyondCanvasSprite.position.x += speed;
    }

    _changeZ(speed) {
        car.position.z -= speed;
        carBodys.position.z -= speed;
        camera.position.z -= speed;

        // 2d canvas
        scoreCanvasSprite.position.z -= speed;
        beyondCanvasSprite.position.z -= speed;
    }
    /*
     * 更新车辆和摄像机未知
     */
    updateAnimation() {
        if (startKey) {

            if(isTurning) {
                
                if(!this.slowDownFlag) {
                    currentSpeed -= speed / 48;
                    if(currentSpeed <= (speed * 3 / 4)) this.slowDownFlag = true;
                } 
                if(movekey === 'z') {
                    currentW = currentW - currentSpeed / 30;
                    this._changeX(currentSpeed / 8);
                    this._changeZ(currentSpeed);
                    if(currentW <= -1.62) {
                        isTurning = false;
                        movekey = 'x';
                        turnSpringback = true;
                    }
                } else {
                    currentW = currentW + currentSpeed / 30;
                    this._changeZ(currentSpeed / 8)
                    this._changeX(currentSpeed);
                    if(currentW >= 0.05) {
                        isTurning = false;
                        movekey = 'z';
                        turnSpringback = true;
                    }
                }
               
            }else {
                this.slowDownFlag = false;
                if(turnSpringback) {
                    if(currentSpeed >= speed) {
                        currentSpeed = speed;
                        turnSpringback = false;
                    }else {
                        currentSpeed += speed / 36;
                    }
                }else {currentSpeed = speed;}
                
                if (movekey === 'x') {
                    this._changeX(currentSpeed);
                    currentW = currentW + currentSpeed / 240;
                    if(currentW >= -1.57) {
                        currentW = -1.57
                    }
                    // beyondCanvasSprite.position.x += speed;
                } else {
                    this._changeZ(currentSpeed);
                    currentW = currentW - currentSpeed / 240;
                    if(currentW <= 0) {
                        currentW = 0
                    }
                    // beyondCanvasSprite.position.z -= speed;
                }
            }
            
            carBodys.quaternion.setFromAxisAngle(new CANNON.Vec3(0, 1, 0), currentW)
            // console.log(`=======,当前speed速度${speed},当前currentSpeed速度${currentSpeed}`)
        }
        // cannonDebugRenderer && cannonDebugRenderer.update();
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
            if (levelScore && speedKey >= levelScore) {
                level++;

                this.updateLevelSpeed();
            }
        }
    }

    sharedLoop() {
        if (isSharedLoop) {
            sharedTexture2d.needsUpdate = true;
        }
    }

    timer(progress) {
        if (timerArr.length <= 0) return false;

        timerArr.map(v => {
            Object.values(v)[0](progress);
        })
    }

    /**
     * 实现帧循环
     * */
    loop(progress) {
        renderer.clear();

        // 渲染3d场景
        renderer.render(scene, camera);

        // 渲染2d场景
        (!startKey && pageClass) && pageClass.render();

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

        // 刷新开放域
        this.sharedLoop();

        // 运行计时器
        this.timer(progress);

        // texture2d.needsUpdate = true;
        // beyondTexture2d.needsUpdate = true;

        requestAnimationFrame(this.loop.bind(this));
    }
}
