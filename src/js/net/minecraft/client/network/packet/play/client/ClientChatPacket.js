import Packet from "../../../../../../../../ts/net/minecraft/client/network/Packet.js";

export default class ClientChatPacket extends Packet {

    constructor(message) {
        super();

        this.message = message;
    }

    write(buffer) {
        buffer.writeString(this.message);
    }
}