import * as PIXI from 'pixi.js';
import { Layout } from '../../../../layout';
import { SelectOptions } from '../../../../enums';

export class SpriteHolder {

    private _index: number;
    private _isHolding: boolean = false;
    private _holdingSpriteIndex: number = -1;
    private _container: PIXI.Container;
    private _possibleSpriteX: number;
    private _possibleSpriteY: number;
    private _selectedOption: SelectOptions = SelectOptions.NOT_SELECTED;

    constructor(index: number) {

        this._index = index;
        this._container = new PIXI.Container();
        this._container.interactive = true;

        const graphic = new PIXI.Graphics();

        graphic.beginFill(Layout.spriteHolder.circleColor);
        const newSpriteHolder = graphic.drawCircle(0, 0, Layout.spriteHolder.radius);
        graphic.endFill();

        newSpriteHolder.pivot.x -= Layout.spriteHolder.radius;
        newSpriteHolder.pivot.y -= Layout.spriteHolder.radius;

        newSpriteHolder.alpha = 0.1;
        this._container.addChild(newSpriteHolder);
    }


    get selectOptions(): SelectOptions {
        return this._selectedOption;
    }

    set selectOptions(value: SelectOptions) {
        this._selectedOption = value;
    }

    get index(): number {
        return this._index;
    }

    get width(): number {
        return this._container.width;
    }

    get isHolding(): boolean {
        return this._isHolding;
    }

    setSprite(index: number) {

        this._holdingSpriteIndex = index;
        this._isHolding = true;

        if (index == -1) {
            this._isHolding = false;            
        }
    }

    get holdingSpriteIndex(): number {
        return this._holdingSpriteIndex;
    }

    removeSprite() {
        this._holdingSpriteIndex = -1;
        this._isHolding = false;
    }

    setPosition(x: number, y: number) {
        this._container.x = x;
        this._container.y = y;
    }

    getElement(): PIXI.Container {
        return this._container;
    }

    getPossibleSpritePosition(): { x: number, y: number } {
        return { x: this._possibleSpriteX, y: this._possibleSpriteY };
    }

    setPossibleSpritePositions(x: number, y: number) {
        this._possibleSpriteX = x;
        this._possibleSpriteY = y;
    }

    isInside(x: number, y: number) {

        return x >= this._container.x
            && x <= this._container.x + this._container.width
            && y >= this._container.y
            && y <= this._container.y + this._container.height;
    }
}