import Packet from "../../../../../../../../ts/net/minecraft/client/network/Packet.js";

export default class StatusResponsePacket extends Packet {

    constructor() {
        super();
    }

    write(buffer) {

    }

    read(buffer) {
        this.object = JSON.parse(buffer.readString());
    }

    handle(packetHandler) {
        packetHandler.handleStatusResponse(this)
    }
}