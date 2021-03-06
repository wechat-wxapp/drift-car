import Scenery from '../../scenery';
import Car from '../../car';
import Road from '../../road';
import TurnRoad from "../../turn-road";
import TurnRoadSmall from "../../turn-road-small";
import CarAssets from '../../carAssets.js';

import UTIL from "../../util";

import Score from '../score/index';

import pageStart from './start';
import pageCarport from "./carport";
import pageGame from "./game";

import Frame from "../frame/index";

/**
 * 开始页函数
 */
export default class Loader extends UTIL {
    loadedNum = 0;

    constructor() {
        super();

        this.setTexture('加载中...');

        this.init();
    }

    init() {
        const loader = [{
            text: '正在抽取图片...',
            load: this.loadImg
        }, {
            text: '正在加载动画帧...',
            load: this.loadFrame
        }, {
            text: '正在检查身份证...',
            load: this.wxLogin
        }, {
            text: '正在挖地基...',
            load: this.buildScenery
        }, {
            text: '正在加载本地汽车...',
            load: this.checkCar
        }, {
            text: '正在铺路...',
            load: this.buildRoad
        }, {
            text: '正在给路涂色...',
            load: this.buildTurnRoad
        }, {
            text: '正在加载汽车资源...',
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

        // 实例化开始页面
        startPage = new pageStart();
    
        // 实例化动画帧
        framePage = new Frame();

        const { openid } = $cache.getCache('accessToken');
        $wx.sendMessage('initHwData', {
            openId: openid,
            shareTicket: $wx.shareTicket
        });

        // 进入是否显示群排行榜
        sharedClass.showGroupRankPage();

        // 加载世界排行榜
        this.loadWorldRank();
    }

    /**
     * 更新页面内容
     * */
    setTexture(text) {
        offCanvas2d.clearRect(0, 0, winWidth, winHeight);

        offCanvas2d.fillStyle = "#647fdc";
        offCanvas2d.fillRect(0, 0, winWidth, winHeight);

        if (this.imgKey) {
            const bg = imgList.indexBg;
            const logo = imgList.logo;

            this.bgCover(offCanvas2d, bg);
            offCanvas2d.drawImage(logo, 0, 0, logo.width, logo.height, winWidth / 2 - this.computedSizeW(logo.width / 8), winHeight / 2 - this.computedSizeH(logo.height / 2) - 20, this.computedSizeW(logo.width / 4), this.computedSizeW(logo.height / 4));
        }

        offCanvas2d.fillStyle = "#fff";
        // offCanvas2d.font = "bold 40px Arial";
        offCanvas2d.textAlign = "center";
        offCanvas2d.fillText(text, winWidth / 2, winHeight / 2 - this.computedSizeH(55));

        texture2d.needsUpdate = true;
    }

    /**
     * 预加载
     * */
    loading(loader) {
        // const { text, load } = loader.shift();
        // this.setTexture(text);
        // console.log('加载',text,'所需时间');
        // const a=+new Date();
        // load.bind(this)().then((e) => {
        //     console.log(+new Date()-a);
        //     if (loader.length > 0) {
        //         this.loading(loader);
        //     } else {
        //         this.loaded();
        //     }
        // })
        // const bg = imgList.indexBg;
        // const logo = imgList.logo;

        // this.bgCover(offCanvas2d, bg);
        // offCanvas2d.drawImage(logo, 0, 0, logo.width, logo.height, winWidth / 2 - this.computedSizeW(logo.width / 8), winHeight / 2 - this.computedSizeH(logo.height / 2) - 20, this.computedSizeW(logo.width / 4), this.computedSizeW(logo.height / 4));
        const taskArray = [];
        for (const task of loader) {
            const { load, text } = task;
            taskArray.push(load.call(this));
        }
        Promise.all(taskArray).then((e) => {
            this.buildCar().then((e) => {
                this.loaded();
            })
        })
    }

    /**
     * 初始化景物
     * */
    buildScenery() {
        scenery = new Scenery();

        return scenery.build();
    }

    /**
     * 检测分包的汽车加载回来没
     * */
    checkCar() {
        const carAssets = new CarAssets();

        return carAssets.build();
    }

    /**
     * 初始化汽车
     * */
    buildCar() {
        carClass = new Car();

        return carClass.build();
    }

    /**
     * 初始化道路
     * */
    buildRoad() {
        roadClass = new Road();

        return roadClass.build();
    }

    /**
     * 初始化弯路
     * */
    buildTurnRoad() {
        turnRoadClass = new TurnRoad();

        return turnRoadClass.build();
    }

    /**
     * 初始化弯路2
     * */
    buildTurnRoadSmall() {
        turnRoadSmallClass = new TurnRoadSmall();

        return turnRoadSmallClass.build();
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
     * 获取微信身份
     * */
    wxLogin() {
        return $wx.checkLogin();
    }

    /**
     * 预加载排行榜
     * */
    loadWorldRank() {
        console.log('开始缓存世界排行榜...');
        return $io.getWorldRank()
            .then(({ payload: { ranks, user } }) => {
                const { openid } = $cache.getCache('accessToken');
                console.log('缓存世界排行榜成功: ', { ranks, user });
                $wx.sendMessage('initHwData', {
                    openId: openid,
                    shareTicket: $wx.shareTicket,
                    worldRank: { list: ranks, self: user }
                });
            }).catch(err => {
                $loader.showInternetError({
                    content: '排行榜数据缓存失败了，请检查网络再重试',
                    confirmCb: this.loadWorldRank.bind(this)
                });
            });
    }

    /**
     * 预加载图片
     * */
    loadImg() {
        const list = Object.entries(Object.assign({}, imgList));

        return new Promise((res, rej) => {
            // 如果已经加载完直接跳过
            if (this.checkLoadStatus(list)) {
                res();
                return false;
            }

            for (let v of list) {
                if (typeof v[1] !== 'string') continue;

                this.imgloading(v[1])
                    .then((e) => {
                        imgList[v[0]] = e;
                        this.loadedNum += 1;

                        // 图片预加载结束
                        if (this.checkLoadStatus(list)) res();
                    });
            }
        });
    }

    /**
     * 检查图片是否加载完成
     * @params list {Array} 图片列表
     * @return {Boolean} true/false
     * */
    checkLoadStatus(list) {
        if (this.loadedNum === list.length) {
            this.imgKey = true;
            this.setTexture('正在读取汽车资源');

            return true;
        }
        return false;
    }
    
    /**
     * 加载动画帧1
     * */
    loadFrame() {
        const isIos = $wx.isIos();
        
        const loadList = [];
        
        for (let k in frame) {
            const { length, loaded } = frame[k];
            
            const loadPromise = new Promise((resolve, reject) => {
                let loadNum = 0;
                
                // 如果已经加载过或不是IOS系统则直接跳过
                if (loaded || !isIos) {
                    resolve();
                    return false;
                }
                
                for (let i = 0; i < length; i++) {
                    let prefix = Array(String(length).length).fill(0).join('');
                    prefix = `${prefix}${i}`;
                    prefix = prefix.substr(String(i).length, prefix.length);
        
                    this.imgloading(`images/frame/f1/guide_000${prefix}-min.png`)
                        .then((e) => {
                            frame[k].list[i] = e;
                
                            loadNum++;
                
                            if (loadNum >= length) {
                                frame[k].loaded = true;
                                
                                resolve();
                            }
                        });
                }
            });
    
            loadList.push(loadPromise);
        }
        
        return Promise.all(loadList);
    }
}