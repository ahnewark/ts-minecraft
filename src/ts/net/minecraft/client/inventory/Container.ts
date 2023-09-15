import PlayerEntity from "../entity/PlayerEntity";
import Inventory from "./Inventory";
import Slot from "./Slot";
import InventoryPlayer from "./inventory/InventoryPlayer";

export default class Container {

    public slots: Slot[];
    public dirty: boolean;

    constructor() {
        this.slots = [];
        this.dirty = true;
    }

    addSlot(slot: Slot) {
        this.slots.push(slot);
    }

    swapWithHotbar(slot: Slot, inventoryPlayer: InventoryPlayer, hotbarIndex: number) {
        let slotInventory = slot.inventory;

        let typeId = slotInventory.getItemInSlot(slot.index);
        let hotbarTypeId = inventoryPlayer.getItemInSlot(hotbarIndex);

        slotInventory.setItem(slot.index, hotbarTypeId);
        inventoryPlayer.setItem(hotbarIndex, typeId);

        this.dirty = true;
    }

    onSlotClick(slot: Slot, player: PlayerEntity) {
        let inventoryPlayer = player.inventory;
        let typeId = slot.inventory.getItemInSlot(slot.index);

        if(inventoryPlayer.itemInCursor === null || inventoryPlayer.itemInCursor === 0) {
            slot.inventory.setItem(slot.index, 0);
            inventoryPlayer.itemInCursor = typeId;
        } else {
            slot.inventory.setItem(slot.index, inventoryPlayer.itemInCursor);
            inventoryPlayer.itemInCursor = typeId;
        }
        this.dirty = true;
    }

}