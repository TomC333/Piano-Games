import * as PIXI from "pixi.js";
export type Textures = {
    //keySpritePNG: PIXI.Texture,
    //keySpriteAddOnPressPNG: PIXI.Texture,

};
type BundleId = 'textures' | 'animations';
export class SpriteLoader {

    static textures: Textures;
    static async loadInitialResources(onProgress: (progress: number) => void, onLoad: () => void) {
        this.loadAnimations();
        this.loadSprites();
        let activeBundleIds: BundleId[] = ['textures', 'animations'];
        await PIXI.Assets.loadBundle(activeBundleIds, (progress: number) => {
            onProgress(progress);
        }).then((bundle: { textures: Textures, animations: PIXI.Texture[] }) => {
            this.textures = bundle.textures;
            onLoad();
        })
    }

    private static loadAnimations() {
        let animationsBundleId: BundleId = 'animations';
        PIXI.Assets.addBundle(animationsBundleId, {
            keySprite: '../../assets/sprites/animatedSprites/key-sprite.json',
            keySpriteAddOnPress: '../../assets/sprites/animatedSprites/key-sprite-add-on-mouse-press.json',
        });
    }

    private static loadSprites() {
        let texturesPath = '../../assets/sprites/animatedSprites';
        let textureBundleId: BundleId = 'textures';
        PIXI.Assets.addBundle(textureBundleId, {
            keySpritePNG: `${texturesPath}/key-sprite.png`,
            keySpriteAddOnPressPNG: `${texturesPath}/key-sprite-add-on-mouse-press.png`,

        });
    }

    static generateAnimationTextures(config: SpriteAnimationConfig): PIXI.Texture[] {
        const textures: PIXI.Texture[] = [];
        for (let i = 0; i < config?.frameCount; i++) {
            const texture = PIXI.Texture.from(config.texture + (i <= 9 ? `0${i}` : i));
            textures.push(texture);
        }
        return textures;
    }
    static get AnimationConfigs() {
        return {
            keySpriteAnimtaion: <SpriteAnimationConfig>{
                frameCount: 90,
                texture: 'KeySpriteAnimation_000',
            },

            keySpriteAnimationOnPress: <SpriteAnimationConfig>{
                frameCount: 90,
                texture: 'KeySpriteAddOnPressAnimation_000',
            }  
        }
    }
    private static imageCache: { [key: string]: HTMLImageElement } = {};
    static loadImage(src: string) {
        if (this.imageCache[src]) {
            return this.imageCache[src]; // Return the cached image if it exists
        } else {
            const img = new Image();
            img.src = src;
            this.imageCache[src] = img; // Cache the image
            return img;
        }
    }
}
export type SpriteAnimationConfig = {
    texture: string;
    frameCount: number;
}