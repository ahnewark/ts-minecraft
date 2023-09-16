import Packet from "../../../../../../../../ts/net/minecraft/client/network/Packet.js";

export default class ServerKeepAlivePacket extends Packet {

    constructor() {
        super();

        this.id = 0;
    }

    read(buffer) {
        this.id = buffer.readVarInt();
    }

    handle(handler) {
        handler.handleKeepAlive(this);
    }

    getId() {
        return this.id;
    }
}