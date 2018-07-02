import API from './api';

/**
 * 封装异步接口
 * */
const request = (url, opts) => {
    return new Promise((res, rej) => {
        wx.request({
            url,
            ...opts,
            success: (e) => {
                res(e.data);
            },
            fail: (e) => {
                rej(e);
            },
            complete: () => {}
        });
    });
};

export default {
    /**
     * 异步方法
     * */
    request,

    /**
     * 获取用户openid,session_key
     * */
    getAccessToken: (code) => {
        return request(API.CODE_2_ACCESS_TOKEN, {
            data: { code }
        });
    },

    /**
     * 获取用户信息
     * */
    getUnionId: (data) => {
        return request(API.GET_UNIONID, {
            data: { ...data },
            method: 'POST'
        });
    },

    /**
     * 获取车库
     * */
    getunlock: () => {
        const { openid } = localStorage.getItem('accessToken');

        return request(API.GET_UNLOCK, {
            method: 'POST',
            data: { openid }
        });
    }
}
