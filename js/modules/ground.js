import UTIL from "./util";

/**
 * 地板函数
 */
export default class Ground extends UTIL {
    constructor() {
        super();
        this.createGroundBody();
    }

    /**
     * 创建地板
     * */
    createGroundBody() {
        const metal_texture = new THREE.TextureLoader().load("obj/floor.png");
        metal_texture.wrapS = THREE.RepeatWrapping;
        metal_texture.wrapT = THREE.RepeatWrapping;
        metal_texture.repeat.set(300, 300);

        // 地面
        const ground_material = new THREE.MeshBasicMaterial({ map: metal_texture });
        ground = new THREE.Mesh(new THREE.BoxGeometry(30000, 1, 30000), ground_material);
        ground.receiveShadow = true;
        ground.castShadow = true;

        ground.position.set(0, -0.5, 0);

        scene.add(ground);

        const groundShape = new CANNON.Plane();
        groundBody = new CANNON.Body({ mass: 0 });
        groundBody.addShape(groundShape);

        // 接触地板马上结束
        groundBody.addEventListener("collide", this.collide.bind(this));

        groundBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2);

        world.add(groundBody);
    }
}
