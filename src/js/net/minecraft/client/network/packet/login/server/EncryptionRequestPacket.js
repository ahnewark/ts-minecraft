import Packet from "../../../../../../../../ts/net/minecraft/client/network/Packet.js";

export default class EncryptionRequestPacket extends Packet {

    constructor() {
        super();
    }

    write(buffer) {

    }

    read(buffer) {
        this.serverId = buffer.readString();
        this.publicKey = buffer.readByteArray();
        this.verifyToken = buffer.readByteArray();
    }

    handle(handler) {
        handler.handleEncryptionRequest(this);
    }
}