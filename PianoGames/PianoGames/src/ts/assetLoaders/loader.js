export class Loader {
    constructor() {
        this.progressLabel = document.getElementById('game-init-label');
        this.progressBar = document.getElementById('game-init-progress');
    }
    setProgress(progress) {
        this.progressLabel.style.opacity = '1';
        if (this.progressLabel) {
            this.progressLabel.innerHTML = `Loading... ${Math.floor(progress * 100)}%`;
        }
        this.progressBar.value = progress * 100;
    }
    hideProgressBar() {
        setTimeout(() => {
            document.querySelector(".loader").remove();
        }, 500);
    }
    showPianoGame() {
        setTimeout(() => {
            document.getElementById("game-canvas-container").style.visibility = 'visible';
        }, 500);
    }
}
