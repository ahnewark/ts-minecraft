import UUID from "./UUID";

export default class GameProfile {

    public uuid: UUID;
    public username: string;

    constructor(uuid: UUID, username: string) {
        this.uuid = uuid;
        this.username = username;
    }

    getCompactUUID() {
        return this.uuid.toString().replace(/-/g, "");
    }

    getId() {
        return this.uuid;
    }

    getUsername() {
        return this.username;
    }

}