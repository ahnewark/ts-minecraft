import Inventory from "./Inventory";

export default class Slot {

    public inventory: Inventory;
    public index: number;
    public x: number;
    public y: number;

    constructor(inventory: Inventory, index: number, x: number, y: number) {
        this.inventory = inventory;
        this.index = index;
        this.x = x;
        this.y = y;
    }

}