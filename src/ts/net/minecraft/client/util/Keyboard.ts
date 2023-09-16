export default class Keyboard {

    static state = {};
    static enabled = false;

    static create() {
        window.addEventListener('keydown', event => {
            Keyboard.state[event.code] = true;
        });
        window.addEventListener('keyup', event => {
            event.preventDefault();
            delete Keyboard.state[event.code];
        });

        Keyboard.setEnabled(true);
    };

    static setState(key: string, state: boolean) {
        Keyboard.state[key] = state;
    }

    static unPressAll() {
        Keyboard.state = {};
    }

    static isKeyDown(key: string) {
        return Keyboard.state[key] && Keyboard.enabled;
    }

    static setEnabled(enabled: boolean) {
        Keyboard.enabled = enabled;

        if (!enabled) {
            Keyboard.unPressAll();
        }
    }

}