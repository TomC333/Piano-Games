import * as PIXI from 'pixi.js';
import { Layout } from '../../../../layout';
export class SpriteHolder {
    constructor(index) {
        this._isHolding = false;
        this._index = index;
        this._container = new PIXI.Container();
        const graphic = new PIXI.Graphics();
        //graphic.lineStyle(Layout.spriteHolder.lineStrength, Layout.shuffledSpritesStorageWindow.circleColor);
        graphic.beginFill(Layout.spriteHolder.circleColor);
        const newSpriteHolder = graphic.drawCircle(0, 0, Layout.spriteHolder.radius);
        graphic.endFill();
        newSpriteHolder.pivot.x -= Layout.spriteHolder.radius;
        newSpriteHolder.pivot.y -= Layout.spriteHolder.radius;
        newSpriteHolder.alpha = 0.1;
        this._container.addChild(newSpriteHolder);
    }
    get index() {
        return this._index;
    }
    get width() {
        return this._container.width;
    }
    get isHolding() {
        return this._isHolding;
    }
    setSprite(index) {
        this._holdingSpriteIndex = index;
        this._isHolding = true;
    }
    get holdingSpriteIndex() {
        return this._holdingSpriteIndex;
    }
    removeSprite() {
        this._holdingSpriteIndex = -1;
        this._isHolding = false;
    }
    setPosition(x, y) {
        this._container.x = x;
        this._container.y = y;
    }
    getElement() {
        return this._container;
    }
    getPossibleSpritePosition() {
        return { x: this._possibleSpriteX, y: this._possibleSpriteY };
    }
    setPossibleSpritePositions(x, y) {
        this._possibleSpriteX = x;
        this._possibleSpriteY = y;
    }
    isInside(x, y) {
        return x >= this._container.x
            && x <= this._container.x + this._container.width
            && y >= this._container.y
            && y <= this._container.y + this._container.height;
    }
}
