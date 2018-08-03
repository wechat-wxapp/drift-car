/**
 * loading类
 * */
export default class LOADER{
    /**
     * 显示加载中
     * */
    show(title = '加载中...') {
        wx.showLoading({
            title,
            mask: true
        });
    }

    /**
     * 关闭加载中
     * */
    hide() {
        wx.hideLoading();
    }

    /**
     * 显示toast
     * @params title {String} 显示标题
     * @params icon {String} toast类型; success, error, loading
     * @params duration {Number} 延迟时间; 精确到毫秒
     * */
    showToast(title = '出错了', icon = 'success', duration = 1000) {
        const toastObj = { title, duration };

        if (icon === 'error') {
            toastObj.image = 'images/error-toast.png?v=1.0.0';
        } else {
            toastObj.icon = icon;
        }

        wx.showToast(toastObj);
    }

    /**
     * 关闭toast
     * */
    hideToast() {
        wx.hideToast();
    }

    /**
     * 显示微信模态框
     * @params data {Object} showModal参数对象
     * */
    showModal(data) {
        wx.showModal(data);
    }

    /**
     * 显示网络错误的微信模态框
     * @params confirmCb {Function} 点击确认按钮的回调事件
     * @params cancelCb {Function} 点击取消按钮的回调事件
     * */
    showInternetError({ title = '出错了!', content = '网络不是很稳定，请重试或重启小游戏再试', confirmText = '重试', confirmCb, cancelCb } = {}) {
        // 默认关闭toast
        this.hide();

        return new Promise((resolve, reject) => {
            $loader.showModal({
                title,
                content,
                confirmText,
                success: ({ confirm, cancel }) => {
                    if (confirm) {
                        confirmCb && confirmCb();
                    } else if (cancel) {
                        cancelCb && cancelCb();
                    }
                }
            });
        });
    }
}