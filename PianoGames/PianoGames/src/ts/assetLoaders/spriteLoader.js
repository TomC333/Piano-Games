var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as PIXI from "pixi.js";
export class SpriteLoader {
    static loadInitialResources(onProgress, onLoad) {
        return __awaiter(this, void 0, void 0, function* () {
            this.loadAnimations();
            this.loadSprites();
            let activeBundleIds = ['textures', 'animations'];
            yield PIXI.Assets.loadBundle(activeBundleIds, (progress) => {
                onProgress(progress);
            }).then((bundle) => {
                this.textures = bundle.textures;
                onLoad();
            });
        });
    }
    static loadAnimations() {
        let animationsBundleId = 'animations';
        PIXI.Assets.addBundle(animationsBundleId, {
            keySprite: '../../assets/sprites/animatedSprites/key-sprite.json',
            keySpriteAddOnPress: '../../assets/sprites/animatedSprites/key-sprite-add-on-mouse-press.json',
        });
    }
    static loadSprites() {
        let texturesPath = '../../assets/sprites/animatedSprites';
        let textureBundleId = 'textures';
        PIXI.Assets.addBundle(textureBundleId, {
            keySpritePNG: `${texturesPath}/key-sprite.png`,
            keySpriteAddOnPressPNG: `${texturesPath}/key-sprite-add-on-mouse-press.png`,
        });
    }
    static generateAnimationTextures(config) {
        const textures = [];
        for (let i = 0; i < (config === null || config === void 0 ? void 0 : config.frameCount); i++) {
            const texture = PIXI.Texture.from(config.texture + (i <= 9 ? `0${i}` : i));
            textures.push(texture);
        }
        return textures;
    }
    static get AnimationConfigs() {
        return {
            keySpriteAnimtaion: {
                frameCount: 90,
                texture: 'KeySpriteAnimation_000',
            },
            keySpriteAnimationOnPress: {
                frameCount: 90,
                texture: 'KeySpriteAddOnPressAnimation_000',
            }
        };
    }
    static loadImage(src) {
        if (this.imageCache[src]) {
            return this.imageCache[src]; // Return the cached image if it exists
        }
        else {
            const img = new Image();
            img.src = src;
            this.imageCache[src] = img; // Cache the image
            return img;
        }
    }
}
SpriteLoader.imageCache = {};
