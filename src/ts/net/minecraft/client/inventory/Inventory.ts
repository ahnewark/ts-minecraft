export default abstract class Inventory {

    public inventoryName: string;

    constructor(name: string) {
        this.inventoryName = name;
    }

    abstract getItemInSlot(index: number): number;

    setItem(index: number, typeId: number) {

    }

}