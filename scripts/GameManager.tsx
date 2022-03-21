import { Camera, PerspectiveCamera } from "three"
import Screen from "./Screen"
import World from "./World"


class GameManager {
    

    private screen: Screen
    private camera: Camera

    constructor() {
        this.screen = new Screen()
        
    }

    public getScreen() {
        return this.screen
    }

    

}


export default GameManager