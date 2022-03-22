import { Body, BODY_TYPES, Box, Quaternion, Vec3 } from "cannon-es";
import { BoxBufferGeometry, Camera, Euler, Object3D, Quaternion as Q3, Vector3 } from "three";
import Controls from "./Controls";
import Game from "./Game";
import StateObject from "./StateObject";
import World from "./World";


class Player extends StateObject {

    velocity: Vector3
    direction: Vector3

    playerObject: Object3D
    playerCamera: Camera
    playerBody: Body
    
   

    constructor(playerObject : Object3D, playerCamera: Camera, world: World) {
        super()
        this.velocity = new Vector3()
        this.direction = new Vector3()
        this.playerObject = playerObject
        this.playerCamera = playerCamera

        this.playerObject.attach(playerCamera)

        this.playerBody = new Body({
            mass: 20,
            type: BODY_TYPES.KINEMATIC,
            shape: new Box(new Vec3(5,5,5))
        })

        this.playerBody.position = new Vec3(0,5,0)
        this.playerObject.position.copy(this.playerBody.position as unknown as Vector3)
        this.playerObject.quaternion.copy(this.playerBody.quaternion as unknown as Q3)

        world.addObject(this.playerBody.id.toString(), this.playerBody)


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
       
        this.playerCamera.lookAt(this.playerObject.position)
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
        if(Controls.right || Controls.left) this.velocity.x -= this.direction.x * 20.0 * Game.deltaTime



        this.playerObject.rotateY(this.velocity.x * Game.deltaTime)
       // this.playerObject.translateX( - this.velocity.x * Game.deltaTime)
        this.playerObject.translateZ(this.velocity.z * Game.deltaTime)

        // this.playerBody.quaternion.y = (this.velocity.x * Game.deltaTime)
        // this.playerBody.position.z = this.playderBody.position.z + (this.velocity.z * Game.deltaTime)
        
        this.playerBody.position.copy(this.playerObject.position as unknown as Vec3)
        this.playerBody.quaternion.copy(this.playerObject.quaternion as unknown as Quaternion)

        this.playerObject.position.copy(this.playerBody.position as unknown as Vector3)
        this.playerObject.quaternion.copy(this.playerBody.quaternion as unknown as Q3)
       
      
       
    }


    

}

export default Player