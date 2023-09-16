export default class ChatLine {

    public message: string;
    public updateCounter: number;

    constructor(message: string) {
        this.message = message;
        this.updateCounter = 0;
    }

    getMessage() {
        return this.message;
    }
}