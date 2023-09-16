import Packet from "../../../../../../../../ts/net/minecraft/client/network/Packet.js";

export default class ServerEntityHeadLookPacket extends Packet {

    constructor() {
        super();

        this.entityId = 0;
        this.headYaw = 0;
    }

    read(buffer) {
        this.entityId = buffer.readVarInt();
        this.headYaw = buffer.readByte();
    }

    handle(handler) {
        handler.handleEntityHeadLook(this);
    }

    getEntityId() {
        return this.entityId;
    }

    getHeadYaw() {
        return this.headYaw;
    }
}