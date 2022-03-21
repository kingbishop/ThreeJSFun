import { BoxGeometry, Mesh, MeshBasicMaterial, TorusGeometry, WebGLRenderer } from "three"
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

        let torusGeometry = new TorusGeometry(10,20,20,20)
        let material = new MeshBasicMaterial({color:'rgb(255,0,0)', wireframe: true})
        let torus = new Mesh(torusGeometry, material)
        let world = this.sceneManager.getCurrentWorld()
        let camera = world.getCamera()

        camera.position.z = camera.position.z + 60
        world.addObject("Floor", Floor.create(50,50).getObject())

        let boxG = new BoxGeometry(5,5,5)
        let boxmaterial = new MeshBasicMaterial({color:'rgb(155,155,155)'})
        let box = new Mesh(boxG,boxmaterial)

        
       


        camera.position.z = box.position.z + 30
        camera.position.y = box.position.y + 20
       
       
        this.player = new Player(box,camera)


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

        let floor = world.getObject("Floor") as Mesh
        // let torus = world.getObject("Torus") as Mesh
        // if(torus)
        // torus.rotation.z += 0.001

        world.update()

        this.prevTime = time
        this.renderer.render(scene, camera)
    }


}

export default Game