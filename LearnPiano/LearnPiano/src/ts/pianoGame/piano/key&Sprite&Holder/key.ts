import * as PIXI from 'pixi.js';
import { Layout } from '../../../../layout';
export class Key {

    private _index: number;
    private _keyElement: PIXI.Graphics;
    private _note: string;


    constructor(index: number) {

        this._index = index;
        this._keyElement = Layout.initializeKeyElement(index);
        this._keyElement.interactive = true;
        this._note = Layout.piano.keyChart[index];
    }

    setElementPosition(x: number, y: number) {
        this._keyElement.x = x;
        this._keyElement.y = y;
    }

    getElement(): PIXI.Graphics {
        return this._keyElement;
    }

    get index(): number {
        return this._index;
    }

    get note(): string {
        return this._note;
    }

    get width(): number {
        return this._keyElement.width;
    }
}