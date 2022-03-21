import { BufferGeometry, Material, Mesh, MeshBasicMaterial, PlaneGeometry } from "three";


class Floor {

    geometry: BufferGeometry
    material: Material
    mesh: Mesh

    constructor(width:number, height:number) {
        this.geometry = new PlaneGeometry(width,height)
        this.geometry.rotateX(-Math.PI / 2)
        this.material = new MeshBasicMaterial({color:'rgb(0,155,155)'})
        this.geometry = this.geometry.toNonIndexed()
        this.mesh = new Mesh(this.geometry,this.material)
    }

    public setMaterial(material:Material){
        this.material = material
        this.mesh.material = material
    }

    public getObject() {
        return this.mesh
    }

    static create(width:number, height: number) {
        return new Floor(width,height)
    }
}

export default Floor