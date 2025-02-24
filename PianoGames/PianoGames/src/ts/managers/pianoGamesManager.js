import * as PIXI from 'pixi.js';
import { Layout } from '../../layout';
import { Piano } from '../pianoGame/piano/piano';
import { GameButtons } from "../pianoGame/gameButtons/gameButtons";
export class PianoGamesManager {
    constructor(_gameID, _connection) {
        this._gameID = _gameID;
        this._connection = _connection;
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
        this.initializeAndAddOnStageGameButtons();
    }
    initializeAndAddOnStageGameButtons() {
        this._gameButtons = new GameButtons(this._connection, this._gameID, this);
        this._gameWindow.stage.addChild(this._gameButtons.getElement());
    }
    initializeAndAddOnStagePiano() {
        this._piano = new Piano();
        this._gameWindow.stage.addChild(this._piano.getContainer());
    }
    getPianoActiveSprites() {
        return this._piano.getActiveSpriteElement();
    }
    continueGame() {
        this._gameButtons.removeFinishAndAddShuffler();
        this._piano.gameFinished();
    }
    startGame(shuffledKeys) {
        this._piano.gameStarted(shuffledKeys);
        this._gameButtons.removeShuffleAndAddFinish();
    }
    get gameView() {
        return this._gameWindow.view;
    }
}
