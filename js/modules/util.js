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
            // console.log('加载模型: ', model);
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
        // window.speeder && clearTimeout(window.speeder);
        music.playExplosion();

        // 重启游戏
        // this.restart();

        // 清除超越好友
        beyondClass.clear2d();

        this.i = 0;
        this.shakeCamera();
        console.log('---结束游戏---');
    };

    /**
     * 撞车后抖镜头,并显示相关页面
     */
    shakeCamera() {
        const cameraX = camera.position.x;
        const cameraY = camera.position.y;
        const cameraZ = camera.position.z;
        this.loopShakeTimer = $timer(() => {
            if(this.i >= 50) {
                this.i = 0;
                this.loopShakeTimer.closeTimeout();
                camera.position.set(cameraX, cameraY, cameraZ);
                this.showReseurPage();
            }
            // else if(this.i >= 15) {
            //     camera.position.set(cameraX, cameraY, cameraZ);
            // }
            else if(this.i <= 5) {
                // camera.position.set(cameraX + 0.5 - (Math.random() * 1), cameraY, cameraZ + 0.5 - (Math.random() * 1))
                camera.position.set(cameraX - 0.05 * this.i, cameraY, cameraZ - 0.05 * this.i)
            }else if(this.i <=15) {
                camera.position.set(cameraX - 0.05 * (-1 * this.i + 5), cameraY, cameraZ - 0.05 * (-1 * this.i + 5))
            }else if(this.i <= 20) {
                camera.position.set(cameraX - 0.05 * (this.i - 20), cameraY, cameraZ - 0.05 * (this.i - 20))
            }
            this.i ++;
        }, 16);
    }

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

        if (realKey > 1) {
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
            // 清除超越好友数据判断
            beyondClass.reset();
        }

        // 重置页面分数
        scorePage.setTexture();

        // 重置背景音乐
        this.readyMusic();
    }

    /**
     * 获取随机数
     * */
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
        const { speed: s } = $cache.getCarSpeed();

        // 重置分数
        score = 0;

        // 重置等级区间
        level = 0;

        // 重置速度
        speed = s || 2.5;
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

        console.log(`---成功复活 剩余复活次数: ${reseurNum} 当前分数: ${score} 当前speed速度: ${speed} 当前currentSpeed速度: ${currentSpeed}---`);
    }

    updateScore() {
        this.scoreTimer = $timer(() => {
            if (!startKey) {
                // 关闭分数计时器
                this.scoreTimer.closeTimeout();
                return false;
            }

            score++;

            // 检测超越好友
            beyondClass.beyondPage();
            scorePage.setTexture();
        }, 1000);
    }

    /**
     * 首次开始音效
     * */
    readyMusic() {
        this.musicTimer = $timer(({ key }) => {
            if (key >= 4) {
                music.playGo();

                // 设置开启key
                startKey = true;

                // 更新分数
                this.updateScore();

                // 清空倒计时
                gamePage.page();

                // 设置页面target
                currentPage = 'gamePage';

                // 关闭倒计时器
                this.musicTimer.closeTimeout();

                return false;
            } else {
                // 倒计时
                gamePage.page(4 - key);

                music.playReady();
            }
        }, 1000);

        // this.startMusicTimer = $timer(({ key }) => {
        //     gamePage.page(4 - key);
        //     music.playReady();
        //     asd();
        //     this.startMusicTimer.closeTimeout();
        // }, 1000);

        // 手动释放内存
        wx.triggerGC();

        // 全屏不能点击
        currentPage = 'off';
    }

    /**
     * 开启背景音乐
     * */
    playBgm() {
        const isMusic = $cache.getGameData('music');

        if (isMusic) {
            music.playBgm();
        }
    }

    /**
     * 创建基于Three.js的离屏canvas
     * */
    createCanvas2d(type, block, width, height) {
        const cvs = block === 'shared' ? openDataContext.canvas : wx.createCanvas();
        let cvs2d, texture2d, mesh;

        if (type === '3d') {
            texture2d = new THREE.Texture(cvs);
            texture2d.minFilter = THREE.LinearFilter;

            const spriteMaterial = new THREE.SpriteMaterial({
                map: texture2d
            });

            mesh = new THREE.Sprite(spriteMaterial);
        } else {
            texture2d = new THREE.CanvasTexture(cvs);
            texture2d.minFilter = texture2d.magFilter = THREE.LinearFilter;

            const geometry = new THREE.PlaneGeometry(width, height);
            const material = new THREE.MeshBasicMaterial({ map: texture2d, transparent: true });

            mesh = new THREE.Mesh(geometry, material);
        }

        if (width && height) {
            cvs.width = width * window.devicePixelRatio;
            cvs.height = height * window.devicePixelRatio;

            cvs2d = cvs.getContext("2d");

            cvs2d.scale(window.devicePixelRatio, window.devicePixelRatio);
        }

        return {
            cvs,
            cvs2d,
            texture2d,
            mesh
        };
    }

    /**
     * 计算当前屏幕相对于 414 * 736 的宽
     * @parasm {Number} 被计算的值
     * */
    computedSizeW(size) {
        return size * winWidth / 414;
    }

    /**
     * 计算当前屏幕相对于 414 * 736 的高
     * @parasm {Number} 被计算的值
     * */
    computedSizeH(size) {
        return size * winHeight / 736;
    }
}
