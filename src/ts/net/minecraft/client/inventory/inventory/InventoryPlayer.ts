import Inventory from "../Inventory.js";

export default class InventoryPlayer extends Inventory {

    private selectedSlotIndex: number;
    private itemInCursor: number;
    private items: number[];

    constructor() {
        super("player");

        this.selectedSlotIndex = 0;
        this.itemInCursor = null;
        this.items = [];
    }

    setItem(index: number, typeId: number) {
        this.items[index] = typeId === null ? 0 : typeId;
    }

    setItemInSelectedSlot(typeId: number) {
        this.items[this.selectedSlotIndex] = typeId;
    }

    getItemInSelectedSlot() {
        return this.getItemInSlot(this.selectedSlotIndex);
    }

    shiftSelectedSlot(offset: number) {
        if (this.selectedSlotIndex + offset < 0) {
            this.selectedSlotIndex = 9 + (this.selectedSlotIndex + offset);
        } else {
            this.selectedSlotIndex = (this.selectedSlotIndex + offset) % 9;
        }
    }

    getItemInSlot(index: number) {
        return this.items.hasOwnProperty(index) ? this.items[index] : 0;
    }
}