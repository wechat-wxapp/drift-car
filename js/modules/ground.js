/**
 * 地板函数
 */
export default class Ground {
    constructor() {
        this.createGroundBody();
    }

    /**
     * 创建地板
     * */
    createGroundBody() {
        const metal_texture = new THREE.TextureLoader().load("https://static.cdn.24haowan.com/24haowan/test/js/floor.jpg");
        metal_texture.wrapS = THREE.RepeatWrapping;
        metal_texture.wrapT = THREE.RepeatWrapping;
        metal_texture.repeat.set(300, 300);

        // 地面
        const ground_material = new THREE.MeshBasicMaterial({ map: metal_texture });
        ground = new THREE.Mesh(new THREE.BoxGeometry(30000, 1, 30000), ground_material);
        ground.receiveShadow = true;
        ground.castShadow = true;
        scene.add(ground);

        const groundShape = new CANNON.Plane();
        groundBody = new CANNON.Body({ mass: 0 });
        groundBody.addShape(groundShape);

        groundBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2);

        world.add(groundBody);
    }
}
