import { Camera, Object3D, PerspectiveCamera, Scene } from "three"
import { Body, Vec3, World as CWorld } from "cannon-es"
import Screen from "./Screen"
import StateObject from "./StateObject"



class World extends StateObject {


    private objects : Map<String,any>
    private scene: Scene
    private camera: Camera
    private cWorld: CWorld
    

    constructor(scene: Scene) {
        super()
        this.objects = new Map()
        this.scene = scene
        this.setPerspectiveCamera()

        this.cWorld = new CWorld({
            gravity: new Vec3(0, -20, 0)
        })
    }

    public setPerspectiveCamera(){
        this.camera = new PerspectiveCamera(70, Screen.aspectRatio, 1, 1000)
    }

    public getCamera() {
        return this.camera
    }

    public addObject(objectName: String, object : any){
        if(this.objects.has(objectName)){
            throw new Error("Object already exists in world")
        }
        this.objects.set(objectName, object)

        if(object instanceof Object3D){
            this.scene.add(object)
        }

        if(object instanceof Body){
            this.cWorld.addBody(object)
        }
        
       
    }
    



    public removeObject(objectName: String){
        if(this.objects.has(objectName)){
            let object = this.objects.get(objectName)
           
            if(object instanceof Object3D){
                this.scene.remove(object)
            }

            if(object instanceof Body){
                this.cWorld.removeBody(object)
            }
           
        }
        this.objects.delete(objectName)
    }

    c

    public getObject(objectName: String) {
        return this.objects.get(objectName)
    }


    public override update() {
        this.objects.forEach((v,k) => {
            if(v instanceof StateObject){
                let so = v as StateObject
                so.update()
            }
        })

        this.cWorld.fixedStep()
    }



}

export default World