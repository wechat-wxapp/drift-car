import API from "./api";

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
    getCode: () => {
        request(API.SAVE_CODE, {
            data: { code }
        }).then(e => {
            const { code, payload: { data } } = e;
            if (code === 'code') {
                const { openid, session_key } = data;

                this.openid = openid;
                this.openid = session_key;
            }
        });
    }
}