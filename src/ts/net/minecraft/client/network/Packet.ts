import PacketHandler from "../../../../../js/net/minecraft/client/network/handler/PacketHandler";
import ByteBuf from "../../../../../js/net/minecraft/client/network/util/ByteBuf";

// TODO: This should be an interface.
export default abstract class Packet {

    abstract write(buffer: ByteBuf);

    abstract read(buffer: ByteBuf, length: number);

    abstract handle(packetHandler: PacketHandler);

}