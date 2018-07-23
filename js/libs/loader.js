/**
 * loading类
 * */
export default class LOADER{
    constructor() {
    }

    show(title = '加载中...') {
        wx.showLoading({
            title,
            mask: true
        });
    }

    hide() {
        wx.hideLoading();
    }

    showToast(title = '出错了', icon = 'success', duration = 1000) {
        const toastObj = { title, duration };

        if (icon === 'error') {
            toastObj.image = 'images/error-toast.png?v=1.0.0';
        } else {
            toastObj.icon = icon;
        }

        wx.showToast(toastObj);
    }

    hideToast() {
        wx.hideToast();
    }
}