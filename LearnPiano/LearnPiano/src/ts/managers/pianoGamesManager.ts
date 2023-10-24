import * as PIXI from 'pixi.js';
import { Layout } from '../../layout';
import { Piano } from '../pianoGame/piano/piano';

export class PianoGamesManager {

    private _gameWindow: PIXI.Application<HTMLCanvasElement>;
    private _piano: Piano;

    constructor() {

        this._gameWindow = new PIXI.Application<HTMLCanvasElement>({
            width: Layout.canvas.width,
            height: Layout.canvas.height,
            background: Layout.canvas.background,
            antialias: true,
        });

        this._gameWindow.stage;

        this.initializeAndAddOnStageGameElements();

    }

    private initializeAndAddOnStageGameElements() {
        this.initializeAndAddOnStagePiano();
    }

    private initializeAndAddOnStagePiano() {

        this._piano = new Piano();
        this._gameWindow.stage.addChild(this._piano.getContainer());
    }

    get gameView(): HTMLCanvasElement{
        return this._gameWindow.view;
    }

}