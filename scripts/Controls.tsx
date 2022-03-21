


class Controls {


    static forward : boolean = false
    static backwards : boolean = false
    static left : boolean = false 
    static right : boolean = false

    static rotateRight : boolean = false
    static rotateLeft : boolean = false


    static onKeyDown(event : KeyboardEvent){

        switch(event.code){
            case 'ArrowLeft':
                Controls.rotateLeft = true
                break
            case 'ArrowRight':
                Controls.rotateRight = true
                break
            case 'KeyW':
                Controls.forward = true
                break
            case 'KeyS':
                Controls.backwards = true
                break
            case 'KeyA':
                Controls.left = true
                break
            case 'KeyD':
                Controls.right = true
                break
        }

    }

    static onKeyUp(event: KeyboardEvent){
        switch(event.code){
            case 'ArrowLeft':
                Controls.rotateLeft = false
                break
            case 'ArrowRight':
                Controls.rotateRight = false
                break
            case 'KeyW':
                Controls.forward = false
                break
            case 'KeyS':
                Controls.backwards = false
                break
            case 'KeyA':
                Controls.left = false
                break
            case 'KeyD':
                Controls.right = false
                break
        }
    }

    static init() {
        document.onkeydown = Controls.onKeyDown
        document.onkeyup = Controls.onKeyUp
    }
}

export default Controls