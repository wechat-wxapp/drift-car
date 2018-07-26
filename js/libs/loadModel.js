/**
 * 模型加载类
 * */
export default class LoadModel {
    /**
     * 创建模型
     * @params model {String} 需要加载的模型地址
     * @params material {String} 需要加载的纹理地址
     * @params callback {Function} 加载完成后回调方法
     */
    constructor(model, material, callback) {
        return this.loadMaterial(material, model).then(e => {
            callback && callback(e);
        });
    }

    loadMaterial(material, model) {
        return new Promise((resolve, reject) => {
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

                // var texture = THREE.ImageUtils.loadTexture(material);

                this.loadObj(texture, model).then(e => {
                    resolve(e);
                });
            });
        })
    }

    loadObj(texture, model) {
        return new Promise((resolve, reject) => {
            const objLoader = new THREE.OBJLoader();
            objLoader.load(model, (obj) => {
                console.log('加载成功11', obj);
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

                resolve(obj);
            }, (xhr) => {
                console.log((xhr.loaded / xhr.total * 100) + '% loaded');
            }, (err) => {
                console.log('发生了错误: ', model, err);
            });
        })
    }
}