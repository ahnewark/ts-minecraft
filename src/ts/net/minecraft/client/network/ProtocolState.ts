export default class ProtocolState {
    static HANDSHAKE = new ProtocolState(-1);
    static PLAY = new ProtocolState(0);
    static STATUS = new ProtocolState(1);
    static LOGIN = new ProtocolState(2);

    private id: number;

    constructor(id: number) {
        this.id = id;
    }

    getId() {
        return this.id;
    }

    getName() {
        switch (this) {
            case ProtocolState.HANDSHAKE:
                return "HANDSHAKE";
            case ProtocolState.LOGIN:
                return "LOGIN";
            case ProtocolState.PLAY:
                return "PLAY";
            case ProtocolState.STATUS:
                return "STATUS";
            default:
                return "UNKNOWN";
        }
    }


    static fromId(id: number) {
        for (let state of this.values()) {
            if (state.getId() === id) {
                return state;
            }
        }
    }

    static values() {
        return [
            ProtocolState.HANDSHAKE,
            ProtocolState.LOGIN,
            ProtocolState.PLAY,
            ProtocolState.STATUS
        ];
    }
}