import GuiButton from "./GuiButton.js";

export default class GuiKeyButton extends GuiButton {

    private name: string;
    private listening: boolean;
    private key: string;

    constructor(name: string, key: string, x: number, y: number, width: number, height: number, callback: () => void) {
        super(name + ": " + key, x, y, width, height, callback);

        this.name = name;
        this.listening = false;
    }

    onPress() {
        this.listening = true;
        this.string = "...";
    }

    keyTyped(key) {
        if (this.listening) {
            this.string = this.name + ": " + key;
            this.listening = false;
            this.key = key;
            this.callback();
        }
    }
}