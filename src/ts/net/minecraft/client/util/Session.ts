import GameProfile from "./GameProfile.js";

export default class Session {

    private profile: GameProfile;
    private accessToken: string;

    constructor(profile: GameProfile, accessToken: string) {
        this.profile = profile;
        this.accessToken = accessToken;
    }

    setAccessToken(accessToken: string) {
        this.accessToken = accessToken;
    }

    getProfile() {
        return this.profile;
    }

    getAccessToken() {
        return this.accessToken;
    }

    toJson() {
        return JSON.stringify({
            profile: {
                uuid: this.profile.uuid.toString(),
                username: this.profile.username
            },
            accessToken: this.accessToken
        });
    }

    static fromJson(json: string) {
        let data = JSON.parse(json);
        return new Session(new GameProfile(data.profile.uuid, data.profile.username), data.accessToken);
    }

}