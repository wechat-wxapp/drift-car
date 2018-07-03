const API_HOST = 'test';
let host;

switch (API_HOST) {
    case 'prod':
        host = 'https://custom.24haowan.com';
        break;
    case 'test':
        // 泓骅地址
        host = 'http://192.168.6.183:3000';
        break;
    default:
        // 强子地址
        host = 'https://192.168.6.49:3003';
        break;
}

const API = {
    'CODE_2_ACCESS_TOKEN': '/yc/wechat/code2accessToken',
    'GET_UNIONID': '/yc/wechat/getUnionId',

    // 获取车库
    'GET_UNLOCK': '/yc/carport/getunlock',

    // 提交分数
    'UPDATE_SCORE': '/yc/user/updateScore'
};

Object.keys(API).forEach(api => {
    const url = API[api];
    API[api] = `${host}${url}`;
});

export default API;
