export class Loader {
    private progressLabel = document.getElementById('game-init-label') as HTMLElement;
    private progressBar = document.getElementById('game-init-progress') as HTMLProgressElement;

    constructor() { }

    setProgress(progress: number) {
        this.progressLabel.style.opacity = '1';

        if (this.progressLabel) {
            this.progressLabel.innerHTML = `Loading... ${Math.floor(progress * 100)}%`;
        }
        this.progressBar.value = progress * 100;
    }

    hideProgressBar() {
        setTimeout(() => {
            (<HTMLElement>document.querySelector(".loader")).remove();
        }, 500);
    }

    showPianoGame() {
        setTimeout(() => {
            (<HTMLElement>document.getElementById("game-canvas-container")).style.visibility = 'visible';
        }, 500);
    }
}