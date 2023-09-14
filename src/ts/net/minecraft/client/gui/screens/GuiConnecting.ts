import GuiScreen from "../GuiScreen.js";
import GuiButton from "../widgets/GuiButton.js";
import NetworkManager from "../../../../../../js/net/minecraft/client/network/NetworkManager.js";
import HandshakePacket from "../../../../../../js/net/minecraft/client/network/packet/handshake/client/HandshakePacket.js";
import ProtocolState from "../../../../../../js/net/minecraft/client/network/ProtocolState.js";
import NetworkLoginHandler from "../../../../../../js/net/minecraft/client/network/handler/NetworkLoginHandler.js";
import Minecraft from "../../../../../../js/net/minecraft/client/Minecraft.js";
import LoginStartPacket from "../../../../../../js/net/minecraft/client/network/packet/login/client/LoginStartPacket.js";

export default class GuiConnecting extends GuiScreen {

    public previousScreen: GuiScreen;
    public connecting: boolean;
    public networkManager: NetworkManager;
    public address: string;
    public port: number;

    constructor(previousScreen: GuiScreen, address: string) {
        super();

        this.previousScreen = previousScreen;
        this.connecting = false;
        this.networkManager = null;

        // Split up address into host and port
        if (address.includes(":")) {
            let parts = address.split(":");
            this.address = parts[0];
            this.port = parseInt(parts[1]);
        } else {
            this.address = address;
            this.port = 25565;
        }
    }

    connect(address: string, port: number) {
        this.networkManager = new NetworkManager(this.minecraft);
        this.networkManager.setNetworkHandler(new NetworkLoginHandler(this.networkManager));
        this.networkManager.connect(address, port, Minecraft.PROXY);

        // Send Minecraft protocol handshake
        this.networkManager.sendPacket(new HandshakePacket(Minecraft.PROTOCOL_VERSION, ProtocolState.LOGIN));
        this.networkManager.sendPacket(new LoginStartPacket(this.minecraft.getSession().getProfile().getUsername()));
    }

    init() {
        super.init();

        let y = this.height / 2 - 50;
        this.buttonList.push(new GuiButton("Cancel", this.width / 2 - 100, y + 130, 200, 20, () => {
            this.minecraft.displayScreen(this.previousScreen);
        }));

        // Connect on first initialization
        if (!this.connecting) {
            this.connecting = true;
            this.connect(this.address, this.port);
        }
    }

    drawScreen(stack: CanvasRenderingContext2D, mouseX: number, mouseY: number, partialTicks: number) {
        // Render dirt background
        this.drawBackground(stack, this.textureBackground, this.width, this.height);

        // Render title
        this.drawCenteredString(stack, "Connecting to server...", this.width / 2, this.height / 2 - 20);

        super.drawScreen(stack, mouseX, mouseY, partialTicks);
    }


    onClose() {
        super.onClose();

        if (this.networkManager !== null && this.networkManager.getState() !== ProtocolState.PLAY) {
            this.networkManager.close();
        }
    }
}