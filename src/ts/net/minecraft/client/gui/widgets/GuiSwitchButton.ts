import GuiButton from "./GuiButton.js";

export default class GuiSwitchButton extends GuiButton {

    private settingName: string;
    private value: boolean;


    constructor(name: string, value: boolean, x: number, y: number, width: number, height: number, callback: GuiButton["callback"]) {
        super(name, x, y, width, height, callback);

        this.settingName = name;
        this.value = value;

        this.string = this.getDisplayName();
    }

    onPress() {
        this.value = !this.value;
        this.string = this.getDisplayName();
        this.callback();
    }

    getDisplayName() {
        return this.settingName + ": " + (this.value ? "ON" : "OFF");
    }
}