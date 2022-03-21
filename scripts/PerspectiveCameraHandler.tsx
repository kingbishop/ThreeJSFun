import { Camera, PerspectiveCamera } from "three";
import Screen from "./Screen";


class PerspectiveCameraHandler {

    camera: PerspectiveCamera
    constructor(camera : PerspectiveCamera){
        this.camera = camera
    }


    private resize(){
        this.camera.aspect = Screen.aspectRatio
        this.camera.updateProjectionMatrix()
    }
    
}


export default PerspectiveCameraHandler