let instance;

/**
 * 统一的音效管理器
 */
export default class Music {
    constructor() {
        if ( instance )
            return instance;

        instance = this;

        this.bgmAudio = new Audio();
        this.bgmAudio.loop = true;
        this.bgmAudio.src  = 'sound/BGM.mp3';

        this.driftAudio = new Audio();
        this.driftAudio.src = 'sound/drift.mp3';

        this.boomAudio = new Audio();
        this.boomAudio.src = 'sound/boom.mp3';

        this.readyAudio = new Audio();
        this.readyAudio.src = 'sound/ready.mp3';

        this.goAudio = new Audio();
        this.goAudio.src = 'sound/go.mp3';

        this.go2Audio = new Audio();
        this.go2Audio.src = 'sound/go2.mp3';
    }

    playBgm() {
        this.bgmAudio.currentTime = 0;
        this.bgmAudio.play();
    }

    pauseBgm() {
        this.bgmAudio.pause();
    }

    playDrift() {
        this.driftAudio.currentTime = 0;
        this.driftAudio.play();
    }

    playExplosion() {
        this.boomAudio.currentTime = 0;
        this.boomAudio.play();
    }

    playReady() {
        this.readyAudio.currentTime = 0;
        this.readyAudio.play();
    }

    playGo() {
        this.goAudio.currentTime = 0;
        this.goAudio.play();
    }

    playGo2() {
        this.go2Audio.currentTime = 0;
        this.go2Audio.play();
    }
}
