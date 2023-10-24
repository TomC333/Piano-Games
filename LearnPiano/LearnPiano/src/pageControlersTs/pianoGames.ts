import { PianoGamesManager } from "../ts/managers/pianoGamesManager";
import "../css/pianoGames.css";
import { Loader } from "../ts/assetLoaders/loader";
import { SpriteLoader } from "../ts/assetLoaders/spriteLoader";


const gameViewContainer: HTMLDivElement = document.getElementById("game-canvas-container") as HTMLDivElement;
const loader = new Loader();


SpriteLoader.loadInitialResources((progress: number) => {
    loader.setProgress(Math.max(0, progress));
}, () => {

    const pianoGamesManager: PianoGamesManager = new PianoGamesManager();
    gameViewContainer.append(pianoGamesManager.gameView);
    loader.hideProgressBar();
    loader.showPianoGame();
});

