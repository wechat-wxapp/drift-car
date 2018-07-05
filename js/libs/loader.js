/**
 * loading类
 * */
export default class LOADER{
    constructor() {
    }

    show(title = '加载中...') {
        wx.showLoading({
            title,
            mask: false
        });
    }

    hide() {
        wx.hideLoading();
    }

    toast(title = '出错了', icon = 'loading', duration = 1000) {
        wx.showToast({
            title,
            icon,
            duration,
        });
    }
}