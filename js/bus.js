import * as CANNON from './libs/cannon';

/**
 * 全局变量
 * */
const bus = {
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

    // 开始页对象
    startPage: '',

    // 风景对象
    scenery: '',
    // 风景1
    scenery1: '',

    // 全局容器尺寸
    winWidth: window.innerWidth,
    winHeight: window.innerHeight,

    // 模型变量
    carBodys: '',
    roadArr: [],
    roadBodys: [],
    roadCollisions: [],
    // 风景对象
    sceneryArr: [],

    timeStep: 1 / 60,

    // 当前旋转向量
    currentW: 0,

    // 得分
    score: 0,
    lastScore: 0,

    // 动画变量
    key: 0,
    maxKey: 5,
    movekey: 'z',
    clickKey: true,
    startKey: false,

    // 路面回收锁
    removeKey: false,

    // 碰撞锁
    collideKey: false,

    // 道路渲染序列
    // loopRoadConfig: {
    //     r1: ['r5', 'r3'],
    //     r2: ['r6', 'r4'],
    //     r3: ['r6', 'r4'],
    //     r4: ['r5', 'r3']
    // },
    // 最后的道路key
    lastBoxType: 'r6',
    loopRoadConfig: {
        r5: ['r6'],
        r6: ['r5']
    },

    // 速度变量
    speed: 1.5,
    speedMax: 3,
    speedStep: 0.01,
    speedStepMax: 0.08,
    // 加速等级区间
    level: 0,
    levelSpeed: [30, 50, 70, 100],

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
    eventPoint: {
        // 开始页
        startPage: {
            // 开始按钮
            startBtn: [172, 486, 252, 503],
        },
        // 游戏页
        gamePage: {
            // 全屏点击
            playGame: [0, 0, window.innerWidth, window.innerHeight]
        }
    },
    // 当前页面标识(默认为开始页)
    currentPage: 'startPage'
};

Object.entries(bus).map(([k, v]) => {
    window[k] = v;
});