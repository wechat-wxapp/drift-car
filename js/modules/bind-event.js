/**
 * 绑定事件函数
 * (重复绑定会覆盖之前的方法)
 */
export default class bindEvent{
    constructor() {
        document.addEventListener('touchstart', this.onClick, false);
    }

    /**
     * 绑定点击时间(touch模拟click)
     */
    click(name, cb) {
        window.EVENT.click[name] = cb;
    }

    /**
     * 监听事件
     * */
    onClick(e) {
        const {pageX, pageY} = e.changedTouches[0];
        Object.entries(eventPoint[currentPage]).map(v => {
            if (pageX > v[1][0] && pageX < v[1][2] && pageY > v[1][1] && pageY < v[1][3]) {
                EVENT.click[v[0]]();
            }
        })
    }
}
