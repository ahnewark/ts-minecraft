import Minecraft from "../../../../../../js/net/minecraft/client/Minecraft";
import Command from "../Command";

export default class TimeCommand extends Command {

    constructor() {
        super("time", "<set|add> <value>", "Change the time of the world")
    }

    execute(minecraft: Minecraft, args: string[]) {
        if (args.length !== 2) {
            return false;
        }

        let action = args[0];

        if (action === "add") {
            if (isNaN(parseInt(args[1])))
                return false;

            let value = parseInt(args[1]);

            minecraft.world.time += value;
            minecraft.addMessageToChat("Added " + value + " to the time");
        } else if (action === "set") {
            let value: number;

            if (isNaN(parseInt(args[1]))) {
                if (args[1] === "day") {
                    value = 1000;
                } else if (args[1] === "night") {
                    value = 13000;
                } else {
                    return false;
                }
            } else {
                value = parseInt(args[1]);
            }

            minecraft.world.time = value;
            minecraft.addMessageToChat("Time set to " + value);
        } else {
            return false;
        }

        return true;
    }

}