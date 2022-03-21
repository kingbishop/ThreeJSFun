import { Scene } from "three"
import World from "./World"


// TODO
class SceneManager {

    scenes: Map<String, Scene>
    worlds: Map<Scene, World>
    current: String
    world: World

    constructor(){
        this.scenes = new Map()
        this.worlds = new Map()
        this.scenes.set("default", new Scene())
       
        this.current = "default"

        this.worlds.set(this.currentScene(), new World(this.currentScene()))
    }

    

    public getCurrentWorld(){
        let currentScene = this.currentScene()
        return this.worlds.get(currentScene)
    }

    public currentScene() {
        return this.scenes.get(this.current)
    }


    
}

export default SceneManager