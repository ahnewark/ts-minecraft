import Inventory from "../Inventory.js";

export default class InventoryBasic extends Inventory {

    private items: number[];

    constructor() {
        super("basic");

        this.items = [];
    }

    getItemInSlot(index: number) {
        return this.items[index];
    }

    setItem(index: number, typeId: number) {
        this.items[index] = typeId;
    }

}