import * as signalR from "@microsoft/signalr"
import * as PIXI from 'pixi.js';
import { Layout } from '../../layout';
import { Piano } from '../pianoGame/piano/piano';
import { GameButtons } from "../pianoGame/gameButtons/gameButtons";

export class PianoGamesManager {

    private _gameWindow: PIXI.Application<HTMLCanvasElement>;
    private _piano: Piano;
    private _gameButtons: GameButtons;

    constructor(private _gameID: string, private _connection: signalR.HubConnection) {

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
        this.initializeAndAddOnStageGameButtons();
    }

    private initializeAndAddOnStageGameButtons() {

        this._gameButtons = new GameButtons(this._connection, this._gameID, this);
        this._gameWindow.stage.addChild(this._gameButtons.getElement());
    }

    private initializeAndAddOnStagePiano() {

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

    startGame(shuffledKeys: number[]) {

        this._piano.gameStarted(shuffledKeys);
        this._gameButtons.removeShuffleAndAddFinish();
    }

    get gameView(): HTMLCanvasElement{
        return this._gameWindow.view;
    }

}