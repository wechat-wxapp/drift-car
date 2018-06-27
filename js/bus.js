import * as CANNON from './libs/cannon';

// 常量
const basicData = {
    scene: '',
    renderer: '',
    camera: '',
    car: '',
    road: '',
    turnRoad: '',
    world: '',
    controls: '',
    cannonDebugRenderer: '',
    ground: '',
    groundBody: '',

    // 车辆类
    carClass: '',
    // 直路类
    roadClass: '',
    // 弯路类
    turnRoadClass: '',
    // 地板类
    groundClass: '',

    // 2d canvas 模型
    offCanvasSprite: '',
    // 等待页对象
    loadingPage: '',
    // 开始页对象
    startPage: '',
    // 2d游戏页对象
    gamePage: '',

    // 风景对象
    scenery: '',
    // 风景列表
    sceneryListArr: [],

    // 全局容器尺寸
    winWidth: window.innerWidth,
    winHeight: window.innerHeight,

    // 模型变量
    carBodys: '',

    // 全局变量bus对象
    $bus: '',
    // 全局微信类
    $wx: '',

    // 加载锁
    loadKey: false,
    // 音乐锁
    musicKey: true,

    // 得分
    score: 0,
    lastScore: 0,

    // 最后的道路key
    // lastBoxType: 'r6',
    loopRoadConfig: {
        r5: ['r6'],
        r6: ['r5']
    },

    // 速度变量
    speed: 2.5,
    speedMax: 5,
    speedStep: 0.01,
    speedStepMax: 0.08,
    // 加速等级区间
    level: 0,
    levelSpeed: [5, 10, 15, 20, 25, 30, 35, 40, 45, 50],

    timeStep: 1.0 / 60.0,

    // 音乐播放器
    music: '',

    // 物理世界库
    CANNON,

    // 全局事件实例对象
    events: '',
    // 全局绑定事件
    EVENT: {
        click: {}
    },
    // 点击坐标
    /**
     * gamePage: '游戏页面'
     * startPage: '开始页面'
     * endPage: '结束页面'
     * */
    eventPoint: {},
    // 当前页面标识(默认为开始页)
    currentPage: 'startPage',

    // 微信公开域画布
    openDataContext: '',
    sharedCanvasSprite: '',
    sharedTexture2d: '',
    // 微信特有离屏画布
    offCanvas2d: '',
    texture2d: '',

    // 预加载图片列表
    imgList: {
        btn: 'images/btn.png',

        //loading页
        logo: 'images/logo.png',
        loadingBg: 'images/loading-bg.png',

        // 开始页
        indexBg: 'images/index.png',
        startBtn: 'images/start-btn.png',
        leaderboard: 'images/leaderboard-btn.png',
        checkLeaderboard: 'images/check-leaderboard-btn.png',
        startBottomBtn1: 'images/start-bottom-btn-1.png',
        startBottomBtn2: 'images/start-bottom-btn-2.png',
        startBottomBtn3: 'images/start-bottom-btn-3.png',
        startBottomBtn4: 'images/start-bottom-btn-4.png',

        // 游戏页
        scoreBg: 'images/score-bg.png'
    }
};

// 变量
const varData = {
    // 模型变量
    roadArr: [],
    roadBodys: [],
    roadCollisions: [],

    // 风景对象
    sceneryArr: [],

    // 当前旋转向量
    currentW: 0,

    // 动画变量
    key: 0,
    maxKey: 5,
    movekey: 'z',
    clickKey: true,
    // 是否开始
    startKey: false,

    // 路面回收锁
    removeKey: false,
    // 景物回收锁
    sceneryRemoveKey: false,

    // 碰撞锁
    collideKey: false,

    // 最后的道路key
    lastBoxType: 'r6',

    /**
     * 碰撞后定位2d画布
     * */
    speedRecord: {
        x: 0,
        z: 0
    }
};

/**
 * 全部局变量bus函数
 */
export default class Bus{
    constructor() {
        this.basicData = basicData;
        this.varData = varData;

        this.setWindowData({ ...this.basicData, ...JSON.parse(JSON.stringify(this.varData)) });
    }

    /**
     * 设置全局变量
     */
    setWindowData(data) {
        const bus = Object.assign({}, data);

        Object.entries(bus).map(([k, v]) => window[k] = v);
    };

    /**
     * 重置变量
     * */
    reset() {
        // 重置变量
        this.setWindowData(JSON.parse(JSON.stringify(this.varData)));

        // 重置位置
        this.resetModel();
    }

    /**
     * 重置模型,摄像头位置
     * */
    resetModel() {
        carBodys.position.set(25, 15, -10);
        carBodys.quaternion.setFromAxisAngle(new CANNON.Vec3(0, 1, 0), 0);

        offCanvasSprite.position.set(-11.75, 78.44, 20);
        sharedCanvasSprite.position.set(-11.75, 78.44, 20);

        camera.position.set(-16.738086885462103, 90.533387653514225, 28.513221776822927);
        camera.rotation.set(-0.9577585082113045, -0.3257201862210706, -0.42691147594250245);
    }
}