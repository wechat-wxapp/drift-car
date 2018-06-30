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
        this.bgmAudio.src  = 'https://static.cdn.24haowan.com/24haowan/test/js/BGM2.mp3';

        this.driftAudio = new Audio();
        this.driftAudio.src = 'https://static.cdn.24haowan.com/24haowan/test/js/drift.mp3';

        this.boomAudio = new Audio();
        this.boomAudio.src = 'https://static.cdn.24haowan.com/24haowan/test/js/boom.mp3';

        this.readyAudio = new Audio();
        this.readyAudio.src = 'https://static.cdn.24haowan.com/24haowan/test/js/ready.mp3';

        this.goAudio = new Audio();
        this.goAudio.src = 'https://static.cdn.24haowan.com/24haowan/test/js/go.mp3';

        this.go2Audio = new Audio();
        this.go2Audio.src = 'https://static.cdn.24haowan.com/24haowan/test/js/go2.mp3';
    }

    playMusic(music) {
        if (!musicKey) return false;

        music.play();
    }

    playBgm() {
        this.bgmAudio.currentTime = 0;
        this.playMusic(this.bgmAudio);
    }

    pauseBgm() {
        this.bgmAudio.pause();
    }

    playDrift() {
        this.driftAudio.currentTime = 0;
        this.playMusic(this.driftAudio);
    }

    playExplosion() {
        this.boomAudio.currentTime = 0;
        this.playMusic(this.boomAudio);
    }

    playReady() {
        this.readyAudio.currentTime = 0;
        this.playMusic(this.readyAudio);
    }

    playGo() {
        this.goAudio.currentTime = 0;
        this.playMusic(this.goAudio);
    }

    playGo2() {
        this.go2Audio.currentTime = 0;
        this.playMusic(this.go2Audio);
    }
}
