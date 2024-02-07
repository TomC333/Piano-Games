import * as signalR from "@microsoft/signalr"
import { PianoGamesManager } from "../ts/managers/pianoGamesManager";
import "../css/pianoGames.css";
import { Loader } from "../ts/assetLoaders/loader";
import { SpriteLoader } from "../ts/assetLoaders/spriteLoader";


const gameViewContainer: HTMLDivElement = document.getElementById("game-canvas-container") as HTMLDivElement;
const loader = new Loader();
const urlParams = new URLSearchParams(window.location.search);
const gameID = urlParams.get("game_id");

const connection = new signalR.HubConnectionBuilder()
    .withUrl("/shufflerGame")
    .build();



function buildEverything() {

    
    connection.start().catch((err) => document.write(err));

    const pianoGamesManager: PianoGamesManager = new PianoGamesManager(gameID, connection);
    gameViewContainer.append(pianoGamesManager.gameView);
    loader.hideProgressBar();
    loader.showPianoGame();

    connection.on("IsCorrect", (isCorrect: boolean) => {
        console.log("Result: ", isCorrect);
        pianoGamesManager.continueGame();
    });

    connection.on("ShuffledPiano", (shuffledPiano: number[]) => {
        pianoGamesManager.startGame(shuffledPiano);
    });

}


SpriteLoader.loadInitialResources((progress: number) => {
    loader.setProgress(Math.max(0, progress));
}, () => {

    buildEverything();
});







