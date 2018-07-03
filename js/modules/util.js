/**
 * 公共继承类
 * */
export default class UTIL {
    /**
     * 创建模型
     */
    createObj(model, material, callback) {
        const manager = new THREE.LoadingManager();
        manager.onProgress = (item, loaded, total) => {
            // console.log(item, loaded, total);
        };

        const texture = new THREE.Texture();
        texture.minFilter = THREE.LinearFilter;
        const imgLoader = new THREE.ImageLoader(manager);
        imgLoader.load(material, (image) => {
            texture.image = image;
            texture.needsUpdate = true;
        });

        // var texture = THREE.ImageUtils.loadTexture(material);

        const objLoader = new THREE.OBJLoader();
        objLoader.load(model, (obj) => {
            console.log('加载模型: ', model);
            // var materialObj = new THREE.MeshBasicMaterial({
            //   vertexColors: THREE.FaceColors,
            //   overdraw: 0.5
            // });

            obj.traverse((child) => {
                if (child instanceof THREE.Mesh) {
                    child.material.map = texture;
                }
            });

            callback(obj);
        }, (xhr) => {
            console.log((xhr.loaded / xhr.total * 100) + '% loaded');
        }, (err) => {
            console.log('发生了错误: ', model, err);
        });
    }

    /**
     * 获取最后未知的元素
     */
    getLastRoad() {
        try {
            const lastRoad = roadArr[roadArr.length - 1];
            const { position, size, rang, boxType, key } = lastRoad;

            return {
                position,
                size,
                rang,
                boxType,
                key
            }
        } catch (err) {
            return {
                position: { x: 0, y: 0, z: 0 },
                size: { width: 0, height: 0 },
                rang: { x: 0, z: 0 },
                boxType: 'r1',
                key: 0
            }
        }
    }

    /**
     * 撞墙后触发
     * */
    collide() {
        if (collideKey) return false;
        collideKey = true;

        startKey = false;
        window.speeder && clearTimeout(window.speeder);
        music.playExplosion();

        // 重启游戏
        // this.restart();

        // 显示结束页
        setTimeout(() => {
            this.showReseurPage();
        }, 1000);

        console.log('---结束游戏---');
    };

    /**
     * 显示结束页面
     * */
    showReseurPage() {
        if (reseurNum === 0) {
            sharedClass.endPage();
        } else {
            sharedClass.reseurPage();
        }
    }

    /**
     * 得分
     * */
    getScore(key, type) {
        const realKey = key - 2;

        // 限制重复触发(因为要补2格防止刚开始后面镜头出现断路,所以判断时候需要 -2 )
        if (lastSpeedKey >= realKey) {
            return false;
        }

        if (realKey > 3) {
            removeKey = true;
            sceneryRemoveKey = true;
        }

        if (type === 'remove' && sceneryRemoveKey && sceneryArr.length > 0) {
             sceneryArr.shift().map(v => scene.remove(v));
        }

        if (!(realKey % 2)) {
            maxKey++;
        }
        speedKey++;
        lastSpeedKey = realKey;

    }

    /**
     * 重置游戏
     * */
    restart(isReseur) {
        this.clearWorld();

        // 重置变量
        $bus.reset();

        // 判断是否复活
        if (isReseur) {
            // 复活
            this.revival();
        } else {
            // 失败重新开始
            this.end();
        }

        // 重置页面分数
        scorePage.setTexture();

        // 重置背景音乐
        this.readyMusic();
    }

    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }

    /**
     * 清除世界元素
     * */
    clearWorld() {
        while(roadArr.length > 0) {
            world.remove(roadBodys.shift());
            world.remove(roadCollisions.shift());

            scene.remove(roadArr.shift());
        }

        sceneryArr.map(v => v.map(val => scene.remove(val)));
    }

    /**
     * 失败重置信息
     * */
    end() {
        // 重置分数
        score = 0;

        // 重置等级区间
        level = 0;

        // 重置速度
        speed = 2.5;
        speedKey = 0;
        lastSpeedKey = 0;

        // 重置转弯次数
        turn = 0;

        $bus.setData('reseurNum', $bus.constantData.reseurNum);
    }

    /**
     * 复活, 不清除分数
     * */
    revival() {
        lastSpeedKey = 0;

        // 扣减复活数
        reseurNum--;

        console.log(`---成功复活 剩余复活次数: ${reseurNum} 当前分数: ${score} 当前速度: ${speed}---`);
    }

    updateScore() {
        setTimeout(() => {
            if (!startKey) return false;
            score++;

            scorePage.setTexture();

            this.updateScore();
        }, 1000)
    }

    /**
     * 首次开始音效
     * */
    readyMusic() {
        music.pauseBgm();
        const playMusic = (key = 0) => {
            setTimeout(() => {
                if (key >= 2) {
                    music.playBgm();
                    music.playGo();

                    // 设置开启key
                    startKey = true;

                    // 更新分数
                    this.updateScore();

                    // 清空倒计时
                    gamePage.page();

                    return false;
                } else {
                    // 倒计时
                    gamePage.page(2 - key);

                    music.playReady();
                }
                playMusic(++key);
            }, 1000);
        };
        // 倒计时
        gamePage.page(3);
        playMusic();
    }

    /**
     * 计算当前屏幕相对于 414 * 736 的结果
     * */
    computedSizeW(size) {
        return size * winWidth / 414;
    }

    computedSizeH(size) {
        return size * winHeight / 736;
    }
}
