import Minecraft from "../../../../../js/net/minecraft/client/Minecraft";

export default class Command {
    public command: string;
    public usage: string;
    public description: string;

    constructor(command: string, usage: string, description: string) {
        this.command = command;
        this.usage = usage;
        this.description = description;
    }

    execute(minecraft: Minecraft, args: string[]) {
        return false;
    }

}