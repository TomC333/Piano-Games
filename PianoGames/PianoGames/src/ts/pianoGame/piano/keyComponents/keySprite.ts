import * as PIXI from 'pixi.js';
import { SpriteLoader } from '../../../assetLoaders/spriteLoader';
import { Layout } from '../../../../layout';
import { gsap } from "gsap";
import { SelectOptions } from '../../../../enums';
import { Glow } from '../../../helpers/glow';

export class KeySprite {

    private _index: number;
    private _spriteAnimation: PIXI.AnimatedSprite;
    private _spritaPressAnimation: PIXI.AnimatedSprite;
    private _note: string;
    private _container = new PIXI.Container();
    private _isDraggable = false;

    constructor(index: number) {

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

    setPosition(x: number, y: number) {

        this._container.x = x;
        this._container.y = y;
    }

    goToPosition(x: number, y: number, isAnimated: boolean) {

        if (isAnimated) {

            gsap.to(this._container, {
                x: x, y: y, duration: 1, ease: "power2.inOut"
            });

        } else {
            this.setPosition(x, y);
        }
    }

    get index(): number {
        return this._index;
    }

    get width(): number {
        return this._container.width;
    }

    get height(): number {
        return this._container.height;
    }

    get note(): string {
        return this._note;
    }

    get isDraggable(): boolean {
        return this._isDraggable;
    }

    set isDraggable(value: boolean) {
        this._isDraggable = value;
    }

    getElement() {
        return this._container;
    }

    setColor(color: number) {
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