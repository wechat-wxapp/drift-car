import * as CANNON from './libs/cannon';
import IO from './libs/io';
import TIMER from './libs/timer';

// 不可变常量, 不参与全局挂载
const constantData = {
    // 复活次数, 默认 1 次
    reseurNum: 1
};

// 普通变量
const basicData = {
    scene: '',
    renderer: '',
    camera: '',
    car: '',
    road: '',
    turnRoad: '',
    turnRoadSmall: '',
    world: '',
    controls: '',
    cannonDebugRenderer: '',
    ground: '',
    groundBody: '',

    // 全局canvas对象
    ctx: '',

    // 汽车列表
    carList: [],

    // 车辆类
    carClass: '',
    // 直路类
    roadClass: '',
    // 弯路类
    turnRoadClass: '',
    // 弯路2类
    turnRoadSmallClass: '',
    // 地板类
    groundClass: '',

    // 风景对象
    scenery: '',
    // 风景列表
    sceneryListArr: [],
    // 额外风景列表
    sceneryOtherListArr: {},

    // 全局容器尺寸
    winWidth: window.innerWidth,
    winHeight: window.innerHeight,

    // 模型变量
    carBodys: '',

    // 全局变量bus对象
    $bus: '',
    // 全局缓存类
    $cache: '',
    // 全局微信类
    $wx: '',
    // 全局异步函数
    $io: IO,
    // 全局loading类
    $loader: '',
    // 全局计时器
    $timer: TIMER,

    // 加载锁
    loadKey: false,
    // 音乐锁
    musicKey: true,

    // 得分
    score: 0,
    lastScore: 0,
    // 转弯多少次
    turn: 0,
    // 点击转弯减速的判断
    isTurning: false,
    oldSpeed: '',

    // 最后的道路key
    // lastBoxType: 'r6',
    loopRoadConfig: {
        r5: ['r6'],
        r6: ['r5', 'r8']
    },

    // 速度变量
    speed: 2.5,
    speedKey: 0,
    lastSpeedKey: 0,
    speedMax: 5,
    speedStep: 0.01,
    speedStepMax: 0.08,
    // 加速等级区间
    level: 0,
    levelSpeed: [5, 20, 40, 60, 80, 90, 120, 160, 200, 250],

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
    currentPage: '',
    // 当前开放域标识
    currentShared: 'shared',

    // 主页类
    pageClass: '',
    // 分数类
    scoreClass: '',
    // 开放域类
    sharedClass: '',
    // 超越好友类
    beyondClass: '',

    // 等待页对象
    loadingPage: '',
    // 开始页对象
    startPage: '',
    // 游戏页对象
    gamePage: '',
    // 分数栏对象
    scorePage: '',
    // 车库对象
    carportPage: '',

    // 微信公开域画布
    isSharedLoop: false,
    openDataContext: '',
    sharedCanvas: '',
    sharedTexture2d: '',
    sharedCanvasSprite: '',
    // 超越好友
    beyondTexture2d: '',
    beyondCanvasSprite: '',
    // 微信特有离屏画布
    offCanvas2d: '',
    texture2d: '',
    offCanvasSprite: '',
    // 分数画布
    scoreCanvas2d: '',
    scoreTexture2d: '',
    scoreCanvasSprite: '',

    // 预加载图片列表
    imgList: {
        btn: 'images/btn.png',
        backIcon: 'images/back-icon.png',
        closeBtn: 'images/close-btn.png',

        //loading页
        logo: 'images/logo.png',
        loadingBg: 'images/loading-bg.png',

        // 开始页
        indexBg: 'images/index.png',
        startBtn: 'images/start-btn.png',
        leaderboard: 'images/leaderboard-btn.png',
        groupLeaderboard: 'images/group-leaderboard-btn.png',
        musicOn: 'images/music-on.png',
        musicOff: 'images/music-off.png',
        qr: 'images/qr.png',
        carport: 'images/carport.png',
        wechat: 'images/wechat.png',

        // 游戏页
        scoreBg: 'images/score-bg.png',

        // 结束页
        endHeader: 'images/end-header.png',
        endAgain: 'images/end-again.png',
        endBack: 'images/end-back.png',
        endShare: 'images/end-share.png',
        endRankBg: 'images/end-rank-bg.png',

        // 复活页
        reseurRePlay: 'images/reseur-rePlay.png',

        // 公众号
        point: 'images/point.png',
        guide: 'images/guide.png',

        // 二维码
        qrLamp: 'images/qr-lamp.png',
        qrBtn: 'images/qr-btn.png',
        qrcode: 'images/qrcode.png',

        //排行
        rankOne: 'images/rankOne.png',
        friendRankOn: 'images/friend-rank-on.png',
        friendRankOff: 'images/friend-rank-off.png',
        worldRankOn: 'images/world-rank-on.png',
        worldRankOff: 'images/world-rank-off.png',
        groupRankOn: 'images/group-rank-on.png',
        iPLayBtn: 'images/i-play-btn.png',

        //上下一页的激活和未激活按钮
        prePageN: 'images/pre-page-n.png',
        prePageDis: 'images/pre-page-dis.png',
        nextPageN: 'images/next-page-n.png',
        nextPageDis: 'images/next-page-dis.png',

        //查看群排行按钮
        goGroupRank: 'images/go-group-rank.png',
        //方形返回按钮
        backBtn: 'images/back-btn.png',

        // 车库
        carHeader: 'images/car-header.png',
        carPane: 'images/car-pane.png',
        carPaneOn: 'images/car-pane-on.png',
        carPaneOff: 'images/car-pane-off.png',
        carNew: 'images/car-new.png',
        unlockPane: 'images/unlock-pane.png',
        unlockGame: 'images/unlock-game.png',
        unlockCn: 'images/unlock-cn.png',
        unlockBtn: 'images/unlock-btn.png',
        gift100: 'images/gift-100.png',
        gift200: 'images/gift-200.png',
        curve: 'images/curve.png'
    },

    // 计时器组
    timerArr: [],

    offCanvas: '',

    // 排行榜当前页数
    rankCurrentPage: 1,
    //世界排行榜下一页启动
    worldRankNextSwitch: true,
    // 请求数量,limit
    requestLimit: 5
};

// 可重置变量
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

    // 碰撞后定位2d画布
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
        // 不可变常量
        this.constantData = constantData;

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
     * 设置挂载属性
     * */
    setData(key, value) {
        window[key] = value
    }

    /**
     * 重置模型,摄像头位置
     * */
    resetModel() {
        carClass.removeCar();
        carClass.addCar();

        carBodys.position.set(25, 15, -10);
        carBodys.quaternion.setFromAxisAngle(new CANNON.Vec3(0, 1, 0), 0);

        // 普通画布
        offCanvasSprite.position.set(-11.75, 78.44, 20);
        // 分数
        scoreCanvasSprite.position.set(-10, 82.8, 9);
        // 超越好友
        // beyondCanvasSprite.position.set(-11.75, 78.44, 20);
        // sharedCanvasSprite.position.set(-11.75, 78.44, 20);

        camera.position.set(-16.738086885462103, 90.533387653514225, 28.513221776822927);
        camera.rotation.set(-0.9577585082113045, -0.3257201862210706, -0.42691147594250245);
    }
}