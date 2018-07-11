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
            complete: () => {
            }
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
    getunlock: (params) => {
        const { openid } = localStorage.getItem('accessToken');

        return request(API.GET_UNLOCK, {
            method: 'POST',
            data: {
                openid,
                ...params
            }
        });
    },

    /**
     * 提交解锁车辆参数
     * */
    unlockCar: (data) => {
        const { openid } = localStorage.getItem('accessToken');

        data.openid = openid;

        return request(API.UNLOCK_CAR, {
            method: 'POST',
            data: {
                data: JSON.stringify(data)
            }
        });
    },

    /**
     * 获取世界排行
     * */
    getWorldRank: (data) => {
        const { openid } = localStorage.getItem('accessToken');

        return request(API.GET_WORLD_RANK, {
            method: 'POST',
            data: { openid,
                offset: 0,
                limit: 99
             }
        });
    }
}
