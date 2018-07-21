/**
 * 统一的音效管理器
 */
export default class Music {
    constructor() {
        this.bgmAudio = this.createAudio('sound/BGM.mp3');
        this.bgmAudio.loop = true;

        // this.driftAudio = new Audio();
        // this.driftAudio.src = 'sound/drift.mp3';
    }

    /**
     * 播放音频接口, 统一判断是否播放音乐
     * @params music {Object} 音频对象
     * */
    playMusic(music) {
        const isMusic = $cache.getGameData('music');
        if (!isMusic) return false;
        music.play();
    }

    /**
     * 暂停背景音乐
     * */
    pusedMusic() {
        this.bgmAudio.pause();
    }

    /**
     * 播放背景音乐
     * */
    playBgm() {
        this.playMusic(this.bgmAudio);
    }

    /**
     * 播放漂移音效
     * */
    playDrift() {
        // this.driftAudio.currentTime = 0;
        // // this.driftAudio.seek(0);
        // // this.driftAudio.stop();
        // this.playMusic(this.driftAudio);

        this.destroyAudio(this.boomAudio);
        this.boomAudio = this.createAudio('sound/drift.mp3');
        this.playMusic(this.boomAudio);
    }

    /**
     * 播放撞车音效
     * */
    playExplosion() {
        this.destroyAudio(this.boomAudio);
        this.boomAudio = this.createAudio('sound/boom.mp3');
        this.playMusic(this.boomAudio);
    }

    /**
     * 播放预备音效
     * */
    playReady() {
        this.destroyAudio(this.readyAuio);
        this.readyAuio = this.createAudio('sound/ready.mp3');
        this.readyAuio.volume = .5;
        this.playMusic(this.readyAuio);
    }

    /**
     * 播放开始音效
     * */
    playGo() {
        this.destroyAudio(this.goAuio);
        this.goAuio = this.createAudio('sound/go.mp3');
        this.goAuio.volume = .5;
        this.playMusic(this.goAuio);
    }

    /**
     * 创建音频对象
     * */
    createAudio(src, cb) {
        const audio = wx.createInnerAudioContext();
        audio.src = src;
        audio.onEnded(() => {
            cb && cb();
        });
        return audio;
    }

    /**
     * 销毁音频对象
     * */
    destroyAudio(audio) {
        if (audio){
            audio.pause();
            audio.destroy();
        }
    }
}
