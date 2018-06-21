/**
 * 公共继承类
 * */
export default class UTIL {
    /**
     * 创建模型
     */
    createObj(model, material, callback) {
        // const manager = new THREE.LoadingManager();
        // manager.onProgress = (item, loaded, total) => {
        //   console.log(item, loaded, total);
        // };

        // const texture = new THREE.Texture();
        // const imgLoader = new THREE.ImageLoader(manager);
        // imgLoader.load(material, (image) => {
        //   texture.image = image;
        //   texture.needsUpdate = true;
        // });

        var texture = THREE.ImageUtils.loadTexture(material);

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

        console.log('---结束游戏---');
    };

    /**
     * 得分
     * */
    getScore(key, type) {
        // 限制重复触发
        if (lastScore >= key) {
            return false;
        }

        if (key > 3) {
            removeKey = true;
        }

        if (type === 'remove') {
            sceneryArr.shift().map(v => scene.remove(v));
        }

        if (!(key % 10)) {
            maxKey++;
            console.log('---创建道路---');
        }
        score++;
        lastScore = key;
        console.log('目前得分: ', score)
    }

    /**
     * 重置游戏
     * */
    restart() {
        setTimeout(() => {
            this.clearWorld();
            this.initVar();

            // 复活
            // this.revival();

            // 失败重新开始
            this.end();

            carBodys.position.set(13, 15, -10);
            carBodys.quaternion.setFromAxisAngle(new CANNON.Vec3(0, 1, 0), 0);

            camera.position.set(-16.738086885462103, 120.533387653514225, 28.513221776822927);
            camera.rotation.set(-0.9577585082113045, -0.3257201862210706, -0.42691147594250245);

            setTimeout(() => {
                startKey = true;
            }, 3000);
        }, 2000);
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
        lastScore = 0;

        // 重置等级区间
        level = 0;

        // 重置速度
        speed = 1.5;

        // 重置背景音乐
        this.readyMusic();
    }

    /**
     * 复活, 不清除分数
     * */
    revival() {
        lastScore = 0;

        // 重置背景音乐
        this.readyMusic();

        console.log(`---成功复活 当前分数: ${score} 当前速度: ${speed}---`);
    }

    /**
     * 重置变量
     * */
    initVar() {
        roadArr = [];
        roadBodys = [];
        roadCollisions = [];
        sceneryArr = [];

        currentW = 0;

        key = 0;
        maxKey = 20;
        movekey = 'z';
        clickKey = true;
        startKey = false;

        removeKey = false;

        collideKey = false;

        lastBoxType = 'r6';
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
                    return false;
                } else {
                    music.playReady();
                }
                playMusic(++key);
            }, 1000);
        };
        playMusic();
    }
}
