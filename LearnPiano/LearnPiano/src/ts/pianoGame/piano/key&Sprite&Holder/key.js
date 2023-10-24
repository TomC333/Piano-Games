import { Layout } from '../../../../layout';
export class Key {
    constructor(index) {
        this._index = index;
        this._keyElement = Layout.initializeKeyElement(index);
        this._keyElement.interactive = true;
        this._note = Layout.piano.keyChart[index];
    }
    setElementPosition(x, y) {
        this._keyElement.x = x;
        this._keyElement.y = y;
    }
    getElement() {
        return this._keyElement;
    }
    get index() {
        return this._index;
    }
    get note() {
        return this._note;
    }
    get width() {
        return this._keyElement.width;
    }
}
