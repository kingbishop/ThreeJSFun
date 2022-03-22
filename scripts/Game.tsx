import { Body, Plane, Sphere } from "cannon-es"
import { BoxGeometry, Mesh, MeshBasicMaterial, MeshNormalMaterial, SphereGeometry, TorusGeometry, Vector3, WebGLRenderer } from "three"
import GameManager from "./GameManager"
import Floor from "./objects/Floor"
import Player from "./Player"
import SceneManager from "./SceneManager"
import Screen from "./Screen"




class Game {

    static deltaTime : number

    prevTime : number

    sceneManager : SceneManager
    renderer : WebGLRenderer
    player : Player



    constructor() {
       
        this.renderer = new WebGLRenderer()
        this.sceneManager = new SceneManager()
        this.prevTime = performance.now()

        this.renderer.setPixelRatio(Screen.pixelRatio)
        this.renderer.setSize(Screen.width,Screen.height)
        this.start()
    }


    private start() {
        document.body.appendChild(this.renderer.domElement)

       
       
        let world = this.sceneManager.getCurrentWorld()
        let camera = world.getCamera()

        // camera.position.z = camera.position.z + 60
        world.addObject("Floor", Floor.create(50,50).getObject())

        let boxG = new BoxGeometry(10,10,10)
        let boxmaterial = new MeshBasicMaterial({color:'rgb(155,155,155)'})
        let box = new Mesh(boxG,boxmaterial)

        let groundBody = new Body({
            type: Body.STATIC,
            shape: new Plane()
        })

        groundBody.quaternion.setFromEuler(-Math.PI/2, 0, 0)

        world.addObject("Body", groundBody)
       
        camera.position.z = groundBody.position.z + 30
        camera.position.y = groundBody.position.y + 20
        camera.lookAt(groundBody.position.x, groundBody.position.y, groundBody.position.z)

        
        let radius = 1
        let geometry = new SphereGeometry(radius)
        let material = new MeshNormalMaterial()
        let sphereMesh = new Mesh(geometry,material)

        let sphereBody = new Body({
            mass: 5,
            shape: new Sphere(radius)
        })

        let sphereBody2 = new Body({
            mass: 5,
            shape: new Sphere(radius)
        })


        sphereBody.position.set(0,10,0)
        sphereBody2.position.set(0,15,0)

        world.addObject("SphereBody",sphereBody)
        world.addObject("SphereBody2",sphereBody2)

        world.addObject("Sphere",sphereMesh)
        world.addObject("Sphere2", sphereMesh.clone())
       
       
        this.player = new Player(box,camera,world)


        world.addObject("Box",box)
        world.addObject("Player", this.player)
        this.update()
    }

    private update = () => {
        requestAnimationFrame(this.update)

        let time = performance.now()
        
        Game.deltaTime = (time - this.prevTime) / 1000

        let scene = this.sceneManager.currentScene()
        
        let world = this.sceneManager.getCurrentWorld()
        let camera = world.getCamera()

        let sphere = world.getObject("Sphere") as Mesh
        let sphere2 = world.getObject("Sphere2") as Mesh


        let sBody = world.getObject("SphereBody") as Body
        let sBody2 = world.getObject("SphereBody2") as Body

        sphere.position.copy(new Vector3(sBody.position.x,sBody.position.y, sBody.position.z))
        sphere2.position.copy(new Vector3(sBody2.position.x,sBody2.position.y, sBody2.position.z))

        //Call Update on All StateObjects within the World
        world.update() 

        this.prevTime = time
        this.renderer.render(scene, camera)
    }


}

export default Game