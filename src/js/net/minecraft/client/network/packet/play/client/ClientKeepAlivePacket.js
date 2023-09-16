import Packet from "../../../../../../../../ts/net/minecraft/client/network/Packet.js";

export default class ClientKeepAlivePacket extends Packet {

    constructor(id = 0) {
        super();

        this.id = id;
    }

    write(buffer) {
        buffer.writeVarInt(this.id);
    }

    getId() {
        return this.id;
    }
}