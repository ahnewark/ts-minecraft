export default class Vector4 {

    public x: number;
    public y: number;
    public z: number;
    public w: number;

    constructor(x = 0, y = 0, z = 0, w = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
    }

    addVector(x: number, y: number, z: number, w: number) {
        return new Vector4(this.x + x, this.y + y, this.z + z, this.w + w);
    }

}