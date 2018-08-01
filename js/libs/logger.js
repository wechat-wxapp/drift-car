const logger = {
    /**
     * 控制台输出信息
     * @method loggerInfo
     * @param  {String} type 打印的类型，可为'log'、'warn'、'error'
     * @param  {Any}    info 打印的信息
     */
    logInfo(type, info) {
        console.log(
            `[ ${this.config.types[type]} ] => `,
            '------------',
            ...info,
            '------------'
        );
    },
    /**
     * 控制台打印普通信息
     * @method loggerInfo
     * @param  {Any}   info 打印的信息
     */
    log(...info) {
        this.logInfo('log', info);
    },
    /**
     * 控制台打印警告信息
     * @method loggerInfo
     * @param  {Any}   info 打印的信息
     */
    warn(...info) {
        this.logInfo('warn', info);
    },
    /**
     * 控制台打印错误信息
     * @method loggerInfo
     * @param  {Any}   info 打印的信息
     */
    error(...info) {
        this.logInfo('error', info);
    },
    install(Vue) {
        if (logger.installed) {
            return;
        }
        Object.defineProperty(Vue.prototype, '$logger', {
            get() {
                return logger;
            }
        });
        this.installed = true;
    },
    installed: false
};

logger.config = {
    types: {
        log: '记录',
        warn: '警告',
        error: '错误'
    },
    styles: {
        log: 'background-color: #1abc9c;color: white;padding:0px 5px;',
        warn: 'background-color: #f2bb15;color: white;padding:0px 5px;',
        error: 'background-color: #b22222;color: white;padding:0px 5px;'
    }
};

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(logger);
}

export default logger;
