import Command from "../Command";
import Minecraft from "../../../../../../js/net/minecraft/client/Minecraft";
import FontRenderer from "../../../../../../js/net/minecraft/client/render/gui/FontRenderer";

export default class HelpCommand extends Command {

    constructor() {
        super("help", "", "Displays a list of commands")
    }

    execute(minecraft: Minecraft, args: string[]) {
        minecraft.addMessageToChat(FontRenderer.COLOR_PREFIX + "2--- Showing help page ---");
        minecraft.commandHandler.commands.forEach(command => {
            minecraft.addMessageToChat("/" + command.command + " " + command.usage + " - " + command.description);
        });
        return true;
    }

}