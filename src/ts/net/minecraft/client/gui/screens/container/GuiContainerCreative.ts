import GuiContainer from "../GuiContainer.js";
import ContainerCreative from "../../../inventory/container/ContainerCreative.js";
import PlayerEntity from "../../../entity/PlayerEntity.js";
import InventoryBasic from "../../../inventory/inventory/InventoryBasic.js";

export default class GuiContainerCreative extends GuiContainer {

    static inventory = new InventoryBasic();

    private textureInventory: HTMLImageElement;

    constructor(player: PlayerEntity) {
        super(new ContainerCreative(player));

        this.inventoryWidth = 195;
        this.inventoryHeight = 136;
    }

    init() {
        this.textureInventory = this.getTexture("gui/container/creative.png");

        super.init();
    }

    drawTitle(stack: CanvasRenderingContext2D) {
        this.drawString(stack, "Creative Inventory", this.x + 8, this.y + 6, 0xff404040, false);
    }

    drawInventoryBackground(stack: CanvasRenderingContext2D) {
        this.drawSprite(
            stack,
            this.textureInventory,
            0,
            0,
            this.inventoryWidth,
            this.inventoryHeight,
            this.x,
            this.y,
            this.inventoryWidth,
            this.inventoryHeight
        );
    }

    keyTyped(key: string, character: string) {
        if (key === this.minecraft.settings.keyOpenInventory) {
            this.minecraft.displayScreen(null);
            return true;
        }

        return super.keyTyped(key, character);
    }

}