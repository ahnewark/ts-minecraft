import Minecraft from "../../../../../../js/net/minecraft/client/Minecraft.js";
import Gui from "../Gui.js";

export default class GuiButton extends Gui {

    protected string: string;
    protected enabled: boolean;

    protected x: number;
    protected y: number;
    protected width: number;
    protected height: number;

    protected callback: () => void;

    constructor(string: string, x: number, y: number, width: number, height: number, callback: GuiButton["callback"]) {
        super(Minecraft.singleton);

        this.string = string;
        this.enabled = true;

        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        this.callback = callback;
    }

    render(stack: CanvasRenderingContext2D, mouseX: number, mouseY: number, partialTicks: number) {
        let mouseOver = this.isMouseOver(mouseX, mouseY);
        this.drawButton(stack, this.enabled, mouseOver, this.x, this.y, this.width, this.height);
        this.drawCenteredString(stack, this.string, this.x + this.width / 2, this.y + this.height / 2 - 4);
    }

    onPress() {
        if (this.enabled) {
            this.callback();
        }
    }

    onTick() {

    }

    mouseClicked(mouseX: number, mouseY: number, mouseButton: number) {
        this.onPress();
    }

    mouseReleased(mouseX: number, mouseY: number, mouseButton: number) {

    }

    mouseDragged(mouseX: number, mouseY: number, mouseButton: number) {

    }

    keyTyped(key: string, character: string) {

    }

    keyReleased(key: string) {

    }

    isMouseOver(mouseX: number, mouseY: number) {
        return mouseX > this.x && mouseX < this.x + this.width && mouseY > this.y && mouseY < this.y + this.height;
    }

    drawButton(stack: CanvasRenderingContext2D, enabled: boolean, mouseOver: boolean, x: number, y: number, width: number, height: number) {
        let textureGui = this.getTexture("gui/gui.png");
        let spriteY = 66 + (enabled ? (mouseOver ? 20 : 0) : -20);

        this.drawSprite(stack, textureGui, 0, spriteY, width / 2, 20, x, y, width / 2, height);
        this.drawSprite(stack, textureGui, 200 - width / 2, spriteY, width / 2, 20, x + width / 2, y, width / 2, height);
    }

    setEnabled(enabled: boolean) {
        this.enabled = enabled;
        return this;
    }

}