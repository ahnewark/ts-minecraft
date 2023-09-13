import Minecraft from "../../../../../../js/net/minecraft/client/Minecraft";
import Command from "../Command";

export default class TeleportCommand extends Command {

    constructor() {
        super("tp", "<x> <y> <z>", "Teleport to a position")
    }

    execute(minecraft: Minecraft, args: string[]) {
        if (args.length !== 3) {
            return false;
        }

        let x = parseInt(args[0]);
        let y = parseInt(args[1]);
        let z = parseInt(args[2]);

        if (isNaN(x) || isNaN(y) || isNaN(z)) {
            return false;
        }

        minecraft.player.setPosition(x, y, z);
        minecraft.addMessageToChat("Teleported to " + x + " " + y + " " + z);

        return true;
    }

}