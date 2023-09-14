import Minecraft from "../../../../../js/net/minecraft/client/Minecraft.js";
import GuiButton from "../../../../../js/net/minecraft/client/gui/widgets/GuiButton.js";
import Gui from "./Gui.js";

export default class GuiScreen extends Gui {

    public buttonList: GuiButton[] = [];
    public previousScreen: GuiScreen;

    public width: number;
    public height: number;

    public textureBackground: HTMLImageElement;

    constructor(minecraft: Minecraft) {
        super(minecraft);

        this.buttonList = [];
        this.previousScreen = null;
    }

    setup(minecraft, width, height) {
        this.minecraft = minecraft;
        this.width = width;
        this.height = height;
        this.textureBackground = this.getTexture("gui/background.png");

        this.init();
    }

    init() {
        this.buttonList = [];
    }

    onClose() {

    }

    drawScreen(stack: CanvasRenderingContext2D, mouseX: number, mouseY: number, partialTicks: number) {
        for (let i in this.buttonList) {
            let button = this.buttonList[i];
            button.minecraft = this.minecraft;
            button.render(stack, mouseX, mouseY, partialTicks);
        }
    }

    updateScreen() {
        for (let i in this.buttonList) {
            let button = this.buttonList[i];

            button.onTick();
        }
    }

    keyTyped(key: string, character: string) {
        if (key === "Escape") {
            this.minecraft.displayScreen(this.previousScreen);
            return true;
        }

        for (let i in this.buttonList) {
            let button = this.buttonList[i];

            button.keyTyped(key, character);
        }

        return false;
    }

    keyReleased(key: string) {
        for (let i in this.buttonList) {
            let button = this.buttonList[i];

            button.keyReleased(key);
        }

        return false;
    }

    mouseClicked(mouseX: number, mouseY: number, mouseButton: number) {
        for (let i in this.buttonList) {
            let button = this.buttonList[i];

            if (button.isMouseOver(mouseX, mouseY)) {
                button.mouseClicked(mouseX, mouseY, mouseButton);
            }
        }
    }

    mouseReleased(mouseX: number, mouseY: number, mouseButton: number) {
        for (let i in this.buttonList) {
            let button = this.buttonList[i];

            button.mouseReleased(mouseX, mouseY, mouseButton);
        }
    }

    mouseDragged(mouseX: number, mouseY: number, mouseButton: number) {
        for (let i in this.buttonList) {
            let button = this.buttonList[i];

            button.mouseDragged(mouseX, mouseY, mouseButton);
        }
    }

    drawDefaultBackground(stack: CanvasRenderingContext2D) {
        if (this.minecraft.isInGame()) {
            // Render transparent background
            this.drawRect(stack, 0, 0, this.width, this.height, 'black', 0.6);
        } else {
            // Render dirt background
            this.drawBackground(stack, this.textureBackground, this.width, this.height);
        }
    }
}