import * as PIXI from 'pixi.js';
import { Button } from "./button";
import { Layout } from "../../../layout";
export class GameButtons {
    constructor(_connection, _gameID, _gameManager) {
        this._connection = _connection;
        this._gameID = _gameID;
        this._gameManager = _gameManager;
        this._container = new PIXI.Container();
        this._container.width = Layout.gameButtons.width;
        this._container.height = Layout.gameButtons.height;
        this._container.x = Layout.gameButtons.x;
        this._container.y = Layout.gameButtons.y;
        this._container.eventMode = 'dynamic';
        this._shuffleButton = new Button("Shuffle");
        this._finishButton = new Button("Finish");
        this._shuffleButton.setPosition(50, 50);
        this._finishButton.setPosition(50, 200);
        this._container.addChild(this._shuffleButton.getElement());
        this.addListeners();
    }
    addListeners() {
        this._shuffleButton.getElement().onpointertap = () => {
            this._connection.send("ShufflePiano", this._gameID);
        };
        this._finishButton.getElement().onpointertap = () => {
            const piano = this._gameManager.getPianoActiveSprites();
            // handle piano :D 
            for (let i = 0; i < piano.length; i++) {
                if (piano[i] == -1) {
                    console.log("sheavse jer dzmaa igini da mere gamova pasuxi sm");
                    return;
                }
            }
            this._connection.send("CheckAnswer", this._gameID, piano);
        };
    }
    getElement() {
        return this._container;
    }
    removeShuffleAndAddFinish() {
        this._container.removeChild(this._shuffleButton.getElement());
        this._container.addChild(this._finishButton.getElement());
    }
    removeFinishAndAddShuffler() {
        this._container.addChild(this._shuffleButton.getElement());
        this._container.removeChild(this._finishButton.getElement());
    }
}
