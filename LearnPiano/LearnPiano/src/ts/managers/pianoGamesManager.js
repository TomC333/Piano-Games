import * as PIXI from 'pixi.js';
import { Layout } from '../../layout';
import { Piano } from '../pianoGame/piano/piano';
export class PianoGamesManager {
    constructor() {
        this._gameWindow = new PIXI.Application({
            width: Layout.canvas.width,
            height: Layout.canvas.height,
            background: Layout.canvas.background,
            antialias: true,
        });
        this._gameWindow.stage;
        this.initializeAndAddOnStageGameElements();
    }
    initializeAndAddOnStageGameElements() {
        this.initializeAndAddOnStagePiano();
    }
    initializeAndAddOnStagePiano() {
        this._piano = new Piano();
        this._gameWindow.stage.addChild(this._piano.getContainer());
    }
    get gameView() {
        return this._gameWindow.view;
    }
}
