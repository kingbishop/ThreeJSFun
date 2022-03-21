import { BoxBufferGeometry, Camera, Euler, Object3D, Quaternion, Vector3 } from "three";
import Controls from "./Controls";
import Game from "./Game";
import StateObject from "./StateObject";


class Player extends StateObject {

    velocity: Vector3
    direction: Vector3

    playerObject: Object3D
    playerCamera: Camera
    
   

    constructor(playerObject : Object3D, playerCamera: Camera) {
        super()
        this.velocity = new Vector3()
        this.direction = new Vector3()
        this.playerObject = playerObject
        this.playerCamera = playerCamera

        this.playerObject.attach(playerCamera)

        Controls.init()
    }

    private rotateCamera(){

       

        let playerPos = this.playerObject.position.clone()
        let cameraPos = this.playerCamera.position.clone()
        

        let direction = cameraPos.sub(playerPos).normalize().multiplyScalar(20)

        let newPos = playerPos.add(direction)
        

       
        this.playerCamera.position.set(newPos.x,10,newPos.z)

        if(Controls.rotateLeft || Controls.rotateRight) {
            
            playerPos = this.playerObject.position.clone()
            cameraPos = this.playerCamera.position.clone()

            direction = cameraPos.sub(playerPos).applyEuler(new Euler(0,1 * Game.deltaTime,0)).add(playerPos)
        
            
            this.playerCamera.position.set(direction.x,10,direction.z)
        }
       

        //console.log(this.playerCamera.position.z)


    }


    public override update() {
        //this.rotateCamera()
        this.direction.z = Number(Controls.forward) - Number(Controls.backwards)
        this.direction.x = Number(Controls.right) - Number(Controls.left)
        this.direction.normalize()

        this.velocity.x -= this.velocity.x * 10.0 * Game.deltaTime
        this.velocity.z -= this.velocity.z * 10.0 * Game.deltaTime

        if(Controls.forward || Controls.backwards) this.velocity.z -= this.direction.z * 400.0 * Game.deltaTime
        if(Controls.right || Controls.left) this.velocity.x -= this.direction.x * 400.0 * Game.deltaTime


        this.playerObject.translateX( - this.velocity.x * Game.deltaTime)
        this.playerObject.translateZ(this.velocity.z * Game.deltaTime)

       
        this.playerCamera.lookAt(this.playerObject.position)
       
    }


    

}

export default Player