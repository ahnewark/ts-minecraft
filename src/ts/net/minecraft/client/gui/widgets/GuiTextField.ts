import GuiButton from "./GuiButton.js";

export default class GuiTextField extends GuiButton {

    public text: string;
    public isFocused: boolean;
    private cursorCounter: number;
    public maxLength: number;
    public renderBackground: boolean;
    
    private shiftPressed: boolean;
    private controlPressed: boolean;

    constructor(x: number, y: number, width: number, height: number) {
        super("", x, y, width, height, () => {});

        this.text = "";
        this.isFocused = false;
        this.cursorCounter = 0;
        this.maxLength = 80;
        this.renderBackground = true;
    }

    render(stack: CanvasRenderingContext2D, mouseX: number, mouseY: number, partialTicks: number) {
        let cursorVisible = this.isFocused && Math.floor(this.cursorCounter / 6) % 2 === 0;
        let textColor = this.enabled ? 0xe0e0e0ff : 0x707070ff;

        // Draw background
        if (this.renderBackground) {
            this.drawRect(stack, this.x - 1, this.y - 1, this.x + this.width + 1, this.y + this.height + 1, '#5f5f60');
            this.drawRect(stack, this.x, this.y, this.x + this.width, this.y + this.height, 'black');
        }

        // Draw text
        this.drawString(stack, this.text, this.x + 2, this.y + this.height / 2 - 4, textColor);

        // Draw cursor
        if (cursorVisible) {
            this.drawString(stack, "_", this.x + 2 + this.getStringWidth(stack, this.text), this.y + this.height / 2 - 4, textColor);
        }
    }

    onTick() {
        this.cursorCounter++;
    }

    mouseClicked(mouseX: number, mouseY: number, mouseButton: number) {
        this.isFocused = true;
    }

    onPress() {

    }

    keyTyped(key: string, character: string) {
        if (!this.isFocused || !this.enabled) {
            return;
        }

        if (key === "Backspace") {
            if (this.text.length > 0) {
                this.text = this.text.substring(0, this.text.length - 1);
            }
            return;
        }

        if (key === "ShiftLeft") {
            this.shiftPressed = true;
            return;
        }

        if (key === "ControlLeft") {
            this.controlPressed = true;
            return;
        }

        if (key === "KeyV" && this.controlPressed) {
            this.minecraft.window.getClipboardText().then(text => {
                this.text += text;
            }, () => { console.debug("Failed to get clipboard text") });
        }

        if (key === "KeyA" && this.controlPressed) {
            this.text = ""; // TODO: Select all
            return;
        }

        if (character.length !== 1) {
            return;
        }

        if (this.text.length < this.maxLength) {
            this.text += character;
        }
    }

    keyReleased(key: string) {
        if (key === "ShiftLeft") {
            this.shiftPressed = false;
            return;
        }

        if (key === "ControlLeft") {
            this.controlPressed = false;
            return;
        }
    }

    getText() {
        return this.text;
    }
}