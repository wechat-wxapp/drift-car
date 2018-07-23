/**
 * 绑定事件函数
 * (重复绑定会覆盖之前的方法)
 */
export default class bindEvent{
    constructor() {
        document.addEventListener('touchstart', this.onClick, false);
    }

    /**
     * 设置点击位置点
     * */
    setEventPoint(name, pageName, point) {
        !eventPoint[pageName] && (eventPoint[pageName] = {});

        eventPoint[pageName][name] = point;
    }

    /**
     * 绑定点击事件
     */
    click({ name, pageName, point, cb }) {
        this.setEventPoint(name, pageName, point);
        window.EVENT.click[name] = cb;
    }

    /**
     * 监听事件
     * */
    onClick(e) {
        const { pageX, pageY } = e.changedTouches[0];
        eventPoint[currentPage] && Object.entries(eventPoint[currentPage]).map(v => {
            if (pageX > v[1][0] && pageX < v[1][2] && pageY > v[1][1] && pageY < v[1][3]) {
                typeof EVENT.click[v[0]] === 'function' && EVENT.click[v[0]](e);
            }
        })
    }
}
