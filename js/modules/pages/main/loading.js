import Scenery from '../../scenery';
import Car from '../../car';
import Road from '../../road';
import TurnRoad from "../../turn-road";
import TurnRoadSmall from "../../turn-road-small";

import Score from '../score/index';

import pageStart from './start';
import pageCarport from "./carport";
import pageGame from "./game";

/**
 * 开始页函数
 */
export default class Loader {
    constructor() {
        this.setTexture('正在加载...');
        // $wx.sendMessage('loading', '正在加载...');

        const loader = [{
            text: '正在抽取图片...',
            load: this.loadImg
        }, {
            text: '正在挖地基...',
            load: this.buildScenery
        }, {
            text: '正在查看有车以后小程序...',
            load: this.buildCar
        }, {
            text: '正在铺路...',
            load: this.buildRoad
        }, {
            text: '正在给路涂色...',
            load: this.buildTurnRoad
        }, {
            text: '正在给路涂色...',
            load: this.buildTurnRoadSmall
        }];

        this.loading(loader);
    }

    loaded() {
        loadKey = true;

        // 初始化其他2d画布
        scoreClass = new Score();

        // 实例化车库
        carportPage = new pageCarport();

        // 实例化游戏页面
        gamePage = new pageGame();

        startPage = new pageStart();

        // 进入是否显示群排行榜
        sharedClass.showGroupRankPage();
    }

    /**
     * 更新页面内容
     * */
    setTexture(text) {
        offCanvas2d.clearRect(0, 0, winWidth, winHeight);

        offCanvas2d.fillStyle = "#647fdc";
        offCanvas2d.fillRect(0, 0, winWidth, winHeight);

        if (this.imgKey) {
            const bg = imgList.loadingBg;
            const logo = imgList.logo;

            offCanvas2d.drawImage(bg, 0, 0, bg.width, bg.height, 0, 0, winWidth, winHeight);
            offCanvas2d.drawImage(logo, 0, 0, logo.width, logo.height, winWidth / 2 - logo.width / 4, winHeight / 2 - logo.height / 2 - 20, logo.width / 2, logo.height / 2);
        }

        offCanvas2d.fillStyle = "#fff";
        // offCanvas2d.font = "bold 40px Arial";
        offCanvas2d.textAlign = "center";
        offCanvas2d.fillText(text, winWidth / 2, winHeight / 2);

        texture2d.needsUpdate = true;
    }

    /**
     * 预加载
     * */
    loading(loader) {
        const { text, load } = loader.shift();
        this.setTexture(text);

        load.bind(this)().then((e) => {
            if (loader.length > 0) {
                this.loading(loader);
            } else {
                this.loaded();
            }
        })
    }

    /**
     * 初始化景物
     * */
    buildScenery() {
        scenery = new Scenery();

        return new Promise((res, rej) => {
            scenery.build().then(() => res());
        })
    }

    /**
     * 初始化汽车
     * */
    buildCar() {
        carClass = new Car();

        return new Promise((res, rej) => {
            carClass.build().then(() => res());
        })
    }

    /**
     * 初始化道路
     * */
    buildRoad() {
        roadClass = new Road();

        return new Promise((res, rej) => {
            roadClass.build().then(() => res());
        })
    }

    /**
     * 初始化弯路
     * */
    buildTurnRoad() {
        turnRoadClass = new TurnRoad();

        return new Promise((res, rej) => {
            turnRoadClass.build().then(() => res());
        })
    }

    /**
     * 初始化弯路2
     * */
    buildTurnRoadSmall() {
        turnRoadSmallClass = new TurnRoadSmall();

        return new Promise((res, rej) => {
            turnRoadSmallClass.build().then(() => res());
        })
    }

    imgloading(img) {
        const image = new Image();
        image.src = img;

        return new Promise((res, rej) => {
            image.onload = () => {
                res(image);
            }
        });
    }

    /**
     * 预加载图片
     * */
    loadImg() {
        let loaded = 0;
        const list = Object.entries(Object.assign({}, imgList));

        return new Promise((res, rej) => {
            list.map((v, k) => {
                this.imgloading(v[1])
                    .then((e) => {
                        imgList[v[0]] = e;
                        loaded += 1;

                        // 图片预加载结束
                        if (loaded === list.length) {
                            this.imgKey = true;
                            res();
                        }
                    })
            })
        });
    }
}
