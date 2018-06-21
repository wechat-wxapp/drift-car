const Tween = {
    Back: {
        easeOut(t,b,c,d,s) {
            if (s === undefined) s = 1.70158;
            return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
        }
    }
};

let b = 0,
    c = 100,
    d = 100,
    t = 0;

/**
 * 速度计算函数
 * */
const runSpeed = (cb) => {
    const result = Math.ceil(Tween.Back.easeOut(t, b, c, d));
    if (t < d) {
        t++;
        window.speeder = setTimeout(() => {
            cb(result / 100, 'progress');
            runSpeed(cb);
        }, 10);
    } else {
        cb(1, 'done');
    }
};

/**
 * 速度函数
 * */
const speeder = (cb) => {
    if (window.speeder) {
        clearTimeout(window.speeder);
    }
    b = 0, c = 100, d = 30, t = 0;

    runSpeed(cb);
};

export default speeder;
