import EnumBlockFace from "./EnumBlockFace";
import Vector3 from "./Vector3";

export default class MovingObjectPosition {

    private vector: Vector3;
    private face: EnumBlockFace;

    private x: number;
    private y: number;
    private z: number;

    constructor(vector: Vector3, face: EnumBlockFace, x: number, y: number, z: number) {
        this.vector = vector;
        this.face = face;

        this.x = x;
        this.y = y;
        this.z = z;
    }
}