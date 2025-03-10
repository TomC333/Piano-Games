import * as PIXI from 'pixi.js';
import { KeyColors } from "./enums";
export class Layout {
    static get canvas() {
        const width = window.innerWidth;
        const pianoElementsMargin = 20;
        const numberOfPianoElement = 1;
        return {
            width: width,
            height: window.innerHeight,
            background: 0x4649b0,
            elementsMargin: pianoElementsMargin,
            numberOfPianoElement: numberOfPianoElement,
            freeSpaceWidth: width - (numberOfPianoElement + 1) * pianoElementsMargin,
        };
    }
    static get pianoWindow() {
        const height = Layout.canvas.height * 0.95;
        return {
            pianoWidthPercentager: 0.4,
            gameButtonsWidthPercentage: 0.3,
            width: Layout.canvas.freeSpaceWidth,
            height: height,
            y: Layout.canvas.height - height,
            x: Layout.canvas.elementsMargin,
        };
    }
    static get gameButtons() {
        const height = Layout.pianoWindow.height;
        const width = Layout.pianoWindow.width * Layout.pianoWindow.gameButtonsWidthPercentage;
        return {
            width: width,
            height: height,
            x: Layout.pianoWindow.width + Layout.pianoWindow.x - width,
            y: Layout.pianoWindow.y,
        };
    }
    static get piano() {
        const width = Layout.canvas.freeSpaceWidth * Layout.pianoWindow.pianoWidthPercentager;
        const height = Layout.pianoWindow.height;
        const keysMargin = 3;
        const bottomMargin = this.pianoKeysBottomMargin;
        const numberOfKeys = 12;
        const numberOfWhiteKeys = 7;
        const leftMargin = (width - Layout.whiteKey.width * numberOfWhiteKeys - (numberOfWhiteKeys - 1) * keysMargin) / 2;
        const keysY = height - Layout.whiteKey.height - bottomMargin;
        const keyAndSpriteMarginY = 30;
        const spriteY = keysY - keyAndSpriteMarginY - Layout.sprite.width;
        const spriteAndHolderMaring = 50;
        const spriteHolderY = spriteY - spriteAndHolderMaring - Layout.spriteHolder.radius;
        return {
            width: width,
            height: height,
            y: Layout.pianoWindow.y,
            x: (Layout.pianoWindow.width - width) / 2,
            numberOfKeys: numberOfKeys,
            noteFrequency: '8n',
            keyChart: ['C4', 'C#4', 'D4', 'D#4', 'E4', 'F4', 'F#4', 'G4', 'G#4',
                'A4', 'A#4', 'B4'],
            keyColors: [KeyColors.WHITE, KeyColors.BLACK, KeyColors.WHITE, KeyColors.BLACK,
                KeyColors.WHITE, KeyColors.WHITE, KeyColors.BLACK, KeyColors.WHITE,
                KeyColors.BLACK, KeyColors.WHITE, KeyColors.BLACK, KeyColors.WHITE],
            keysStartX: leftMargin,
            marginBetweenWhiteKeys: keysMargin,
            keysY: keysY,
            spriteY: spriteY,
            spriteHolderY: spriteHolderY,
        };
    }
    static get whiteKey() {
        const height = Layout.pianoWindow.height * 0.5;
        return {
            height: height,
            width: height / 5,
            color: 0xffffff,
        };
    }
    static initializeKeyElement(index) {
        let width = 0;
        let height = 0;
        let color = 0x0;
        switch (Layout.piano.keyColors[index]) {
            case KeyColors.BLACK:
                width = Layout.blackKey.width;
                height = Layout.blackKey.height;
                color = Layout.blackKey.color;
                break;
            case KeyColors.WHITE:
                width = Layout.whiteKey.width;
                height = Layout.whiteKey.height;
                color = Layout.whiteKey.color;
                break;
        }
        const graphics = new PIXI.Graphics();
        graphics.beginFill(color);
        const keyElement = graphics.drawRect(0, 0, width, height);
        graphics.endFill();
        return keyElement;
    }
}
Layout.pianoKeysBottomMargin = 30;
Layout.button = {
    width: 80,
    height: 40,
};
Layout.keySpriteOptions = {
    correctSpriteColor: 0x03fc3d,
    incorrectSpriteColor: 0xfc0303,
    gameInProgressSpriteColor: 0xfc0303,
    spriteClickColor: 0x0091ff,
    defaultColor: 0xffffff,
    emptySprite: 0x000000,
    margin: 10,
};
Layout.sprite = {
    width: Layout.whiteKey.width * 0.5,
    height: Layout.whiteKey.width * 0.5,
    correctSpriteColor: 0x03fc3d,
    incorrectSpriteColor: 0xfc0303,
    gameInProgressSpriteColor: 0xfffb00,
    spriteClickColor: 0x0091ff,
    defaultColor: 0xffffff,
    emptySprite: 0x000000,
};
Layout.spriteHolder = {
    lineStrength: 2,
    radius: Layout.sprite.width * 0.4,
    circleColor: 0xffffff,
};
Layout.blackKey = {
    height: Layout.whiteKey.height * 0.6,
    width: Layout.whiteKey.width * 0.6,
    color: 0x000000,
};
