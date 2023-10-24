import { PianoGamesManager } from "../ts/managers/pianoGamesManager";
import "../css/pianoGames.css";
import { Loader } from "../ts/assetLoaders/loader";
import { SpriteLoader } from "../ts/assetLoaders/spriteLoader";
const gameViewContainer = document.getElementById("game-canvas-container");
const loader = new Loader();
SpriteLoader.loadInitialResources((progress) => {
    loader.setProgress(Math.max(0, progress));
}, () => {
    const pianoGamesManager = new PianoGamesManager();
    gameViewContainer.append(pianoGamesManager.gameView);
    loader.hideProgressBar();
    loader.showPianoGame();
});
