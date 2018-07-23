/**
 * 计时器
 * */
class TIMER {
    constructor(cb, duration) {
        // 动画运行了多少次
        this.currentTime = 0;
        this.start = null;

        this.createTimeout(cb, duration);
    }

    createTimeout(cb, duration) {
        this.timerKey = timerArr.length;
        const obj = {};
        obj[this.timerKey] = (progress) => {
            if (!this.start || !timerKey){
                this.start = progress;
                this.currentTime = 0;
                timerKey = true;
            }
            const currentTime = progress - this.start - this.currentTime * duration;

            if (currentTime >= duration) {
                this.currentTime += 1;
                cb({ key: this.currentTime });
            }
        };

        timerArr.push(obj);
    }

    closeTimeout() {
        const arrIndex = timerArr.findIndex(v => {
            return Object.keys(v)[0] === String(this.timerKey);
        });

        timerArr.splice(arrIndex, 1)
    }
}

export default (cb, duration) => {
    return new TIMER(cb, duration);
}