const API_HOST = 'prod';
let host;

switch (API_HOST) {
    case 'prod':
        host = 'http://custom.c56e37f627a5a42e89b31387f12f59fab.cn-shenzhen.alicontainer.com';
        break;
    case 'test':
        host = 'http://192.168.9.95:3000';
        break;
    default:
        host = 'https://192.168.6.49:3003';
        break;
}

const API = {
    'CODE_2_ACCESS_TOKEN': '/yc/wechat/code2accessToken',
    'GET_UNIONID': '/yc/wechat/getUnionId',

    // 获取车库
    'GET_UNLOCK': '/yc/carport/getunlock'
};

Object.keys(API).forEach(api => {
    const url = API[api];
    API[api] = `${host}${url}`;
});

export default API;
