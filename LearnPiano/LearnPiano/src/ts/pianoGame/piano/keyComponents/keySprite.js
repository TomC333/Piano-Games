import * as PIXI from 'pixi.js';
import { SpriteLoader } from '../../../assetLoaders/spriteLoader';
import { Layout } from '../../../../layout';
import { gsap } from "gsap";
export class KeySprite {
    constructor(index) {
        this._container = new PIXI.Container();
        this._isDraggable = false;
        this._index = index;
        this._note = Layout.piano.keyChart[index];
        this._spriteAnimation = new PIXI.AnimatedSprite(SpriteLoader.generateAnimationTextures(SpriteLoader.AnimationConfigs.keySpriteAnimtaion));
        this._spriteAnimation.width = Layout.sprite.width;
        this._spriteAnimation.height = Layout.sprite.height;
        this._spriteAnimation.loop = true;
        this._spriteAnimation.gotoAndPlay((Math.random() * 100 % (SpriteLoader.AnimationConfigs.keySpriteAnimtaion.frameCount - 1)) | 0);
        this._spriteAnimation.tint = Layout.keySpriteOptions.defaultColor;
        this._spritaPressAnimation = new PIXI.AnimatedSprite(SpriteLoader.generateAnimationTextures(SpriteLoader.AnimationConfigs.keySpriteAnimationOnPress));
        this._spritaPressAnimation.width = Layout.sprite.width;
        this._spritaPressAnimation.height = Layout.sprite.height;
        this._spritaPressAnimation.loop = true;
        this._spritaPressAnimation.gotoAndPlay((Math.random() * 100 % (SpriteLoader.AnimationConfigs.keySpriteAnimtaion.frameCount - 1)) | 0);
        this._spritaPressAnimation.tint = Layout.keySpriteOptions.defaultColor;
        this._container.addChild(this._spriteAnimation);
        this._container.width = Layout.sprite.width;
        this._container.height = Layout.sprite.height;
        //this._container.eventMode = 'dynamic';
    }
    setPosition(x, y) {
        this._container.x = x;
        this._container.y = y;
    }
    goToPosition(x, y, isAnimated) {
        if (isAnimated) {
            gsap.to(this._container, {
                x: x, y: y, duration: 1, ease: "power2.inOut"
            });
        }
        else {
            this.setPosition(x, y);
        }
    }
    get index() {
        return this._index;
    }
    get width() {
        return this._container.width;
    }
    get height() {
        return this._container.height;
    }
    get note() {
        return this._note;
    }
    get isDraggable() {
        return this._isDraggable;
    }
    set isDraggable(value) {
        this._isDraggable = value;
    }
    getElement() {
        return this._container;
    }
    setColor(color) {
        this._spriteAnimation.tint = color;
        this._spritaPressAnimation.tint = color;
    }
    addPressAnimation() {
        this._container.addChild(this._spritaPressAnimation);
    }
    removePressAnimation() {
        this._container.removeChild(this._spritaPressAnimation);
    }
}
