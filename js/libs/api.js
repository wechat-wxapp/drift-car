const API_HOST = 'prod';
let host;

switch (API_HOST) {
    case 'prod':
        host = 'https://custom.24haowan.com';
        break;
    case 'test':
        // 泓骅地址
        host = 'http://192.168.0.67:3000';
        break;
    default:
        // 强子地址
        host = 'https://192.168.6.49:3003';
        break;
}

console.log('当前API_HOST: ', host);

const API = {
    'CODE_2_ACCESS_TOKEN': '/yc/wechat/code2accessToken',
    'GET_UNIONID': '/yc/wechat/getUnionId',

    // 获取车库
    'GET_UNLOCK': '/yc/carport/getunlock',

    // 获取世界排行
    'GET_WORLD_RANK': '/yc/rank/data',

    // 更新解锁车辆分数
    'UNLOCK_CAR': '/yc/carport/unlockCar',
    // 解锁车辆,消除红点
    'TAKE_CAR': '/yc/carport/takeCar',
    // 获取解锁相关信息
    'UN_LOCK_LIST': '/yc/carport/unlocklist'
};

Object.keys(API).forEach(api => {
    const url = API[api];
    API[api] = `${host}${url}`;
});

export default API;
