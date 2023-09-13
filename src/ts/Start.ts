import Minecraft from '../js/net/minecraft/client/Minecraft.js';
import * as aesjs from '../../libraries/aes.js';

declare global {
    interface Window { app: Minecraft; }
}

class Start {

    private resources: { [texturePath: string]: HTMLImageElement } = {};

    loadTextures(textures: string[]) {
        let index = 0;

        return textures.reduce((currentPromise, texturePath) => {
            return currentPromise.then(() => {
                return new Promise<void>((resolve, reject) => {
                    // Load texture
                    let image = new Image();
                    image.src = "src/resources/" + texturePath;
                    image.onload = () => resolve();
                    this.resources[texturePath] = image;

                    index++;
                });
            });
        }, Promise.resolve()).then(() => {
            return this.resources;
        });
    }

    async launch(canvasWrapperId) {
        const resources = await this.loadTextures([
            "misc/grasscolor.png",
            "gui/font.png",
            "gui/gui.png",
            "gui/background.png",
            "gui/icons.png",
            "terrain/terrain.png",
            "terrain/sun.png",
            "terrain/moon.png",
            "char.png",
            "gui/title/minecraft.png",
            "gui/title/background/panorama_0.png",
            "gui/title/background/panorama_1.png",
            "gui/title/background/panorama_2.png",
            "gui/title/background/panorama_3.png",
            "gui/title/background/panorama_4.png",
            "gui/title/background/panorama_5.png",
            "gui/container/creative.png"
        ]);
        
        window.app = new Minecraft(canvasWrapperId, resources);
    }
}

// Listen on history back
window.addEventListener('pageshow', function (event) {
    if (window.app) {
        // Reload page to restart the game
        if (!window.app.running) {
            window.location.reload();
        }
    } else {
        // Launch game
        new Start().launch("canvas-container").catch((e) => {
            console.error(e);
        });
    }
});
