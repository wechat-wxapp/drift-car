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
}