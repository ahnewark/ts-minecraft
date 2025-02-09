import Packet from "../../../../../../../../ts/net/minecraft/client/network/Packet.js";

export default class LoginStartPacket extends Packet {

    constructor(username) {
        super();

        this.username = username;
    }

    write(buffer) {
        buffer.writeString(this.username);
    }

    read(buffer) {
        this.username = buffer.readString();
    }
}