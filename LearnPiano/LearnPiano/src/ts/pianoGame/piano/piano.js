import * as PIXI from 'pixi.js';
import { Layout } from '../../../layout';
import { KeyColors, SelectOptions, KeyZIndexes, SpriteIndex } from '../../../enums';
import { Key } from './key&Sprite&Holder/key';
import { KeySprite } from './key&Sprite&Holder/keySprite';
import { SpriteHolder } from './key&Sprite&Holder/spriteHolder';
import { SynthSingleton } from './synthSingleton';
import { Glow } from '../../helpers/glow';
export class Piano {
    get _synt() {
        return SynthSingleton.getInstance();
    }
    constructor() {
        this._keys = [];
        this._sprites = [];
        this._passiveHolders = [];
        this._activeHolders = [];
        this._selectedHolder = { index: -1, isPassive: false };
        this._gameInProgress = false;
        this._counter = 0;
        this._container = new PIXI.Container();
        this._container.sortableChildren = true;
        this._container.width = Layout.piano.width;
        this._container.height = Layout.piano.height;
        this._container.x = Layout.piano.x;
        this._container.y = Layout.piano.y;
        this._container.sortableChildren = true;
        this.initializeAndAddPianoElements();
        this.addListeners();
    }
    addListeners() {
        for (let i = 0; i < Layout.piano.numberOfKeys; i++) {
            const key = this._keys[i];
            key.getElement().onpointerdown = () => {
                const currentActiveHolder = this._activeHolders[i];
                if (currentActiveHolder.isHolding) {
                    const currentSprite = this._sprites[currentActiveHolder.holdingSpriteIndex];
                    if (this._gameInProgress) {
                        currentSprite.setColor(Layout.sprite.gameInProgressSpriteColor);
                    }
                    else if (currentActiveHolder.holdingSpriteIndex === i) {
                        currentSprite.setColor(Layout.sprite.correctSpriteColor);
                    }
                    else {
                        currentSprite.setColor(Layout.sprite.incorrectSpriteColor);
                    }
                    currentSprite.addPressAnimation();
                    this._synt.triggerAttack(currentSprite.note, Layout.piano.noteFrequency);
                }
            };
            key.getElement().onpointerup = () => {
                const currentActiveColder = this._activeHolders[i];
                if (currentActiveColder.isHolding) {
                    const currentSprite = this._sprites[currentActiveColder.holdingSpriteIndex];
                    currentSprite.removePressAnimation();
                    currentSprite.setColor(Layout.sprite.defaultColor);
                    this._synt.triggerRelease();
                }
            };
            key.getElement().onpointerupoutside = key.getElement().onpointerup;
            //const sprite = this._sprites[i];
            //sprite.getElement().onpointerdown = (e) => {
            //    sprite.getElement().zIndex = SpriteIndex.SELECTED;
            //    sprite.setColor(Layout.sprite.spriteClickColor);
            //    this._synt.triggerAttack(sprite.note, Layout.piano.noteFrequency);
            //    sprite.addPressAnimation();
            //    sprite.isDraggable = true;
            //}
            //sprite.getElement().onpointerup = (e) => {
            //    sprite.getElement().zIndex = SpriteIndex.NOT_SELECTED;
            //    sprite.setColor(Layout.sprite.defaultColor);
            //    this._synt.triggerRelease();
            //    sprite.removePressAnimation();
            //    sprite.isDraggable = false;
            //    if (this._gameInProgress) {
            //        const detectedPosition = this.detectIsInHolder(e);
            //        if (detectedPosition.isInHolder) {
            //            this.handleSpriteMovedInHolder(sprite, detectedPosition.isPassiveHolder, detectedPosition.index);
            //        }
            //        this.returnAllSpritesToPosition();
            //    }
            //};
            //sprite.getElement().onpointerupoutside = sprite.getElement().onpointerup;
            //sprite.getElement().onpointermove = (e) => {
            //    if (sprite.isDraggable && this._gameInProgress) {
            //        const x = e.x - Layout.piano.x - sprite.width / 2;
            //        const y = e.y - Layout.piano.y - sprite.height / 2;
            //        sprite.setPosition(x, y);
            //        this._synt.triggerRelease();
            //    }
            //}
            const passiveHolder = this._passiveHolders[i];
            passiveHolder.getElement().onpointertap = () => {
                switch (passiveHolder.selectOptions) {
                    case SelectOptions.NOT_SELECTED:
                        passiveHolder.selectOptions = SelectOptions.SELECTED;
                        Glow.addGlowFilter(passiveHolder.getElement());
                        if (this._selectedHolder.index == Piano.NO_HOLDER) {
                            this._selectedHolder = { index: passiveHolder.index, isPassive: true };
                        }
                        else {
                            let secondHolder = this._activeHolders[this._selectedHolder.index];
                            if (this._selectedHolder.isPassive) {
                                secondHolder = this._passiveHolders[this._selectedHolder.index];
                            }
                            const firstSpriteIndex = passiveHolder.holdingSpriteIndex;
                            const secondSpriteIndex = secondHolder.holdingSpriteIndex;
                            passiveHolder.removeSprite();
                            secondHolder.removeSprite();
                            passiveHolder.setSprite(secondSpriteIndex);
                            secondHolder.setSprite(firstSpriteIndex);
                            passiveHolder.selectOptions = SelectOptions.NOT_SELECTED;
                            secondHolder.selectOptions = SelectOptions.NOT_SELECTED;
                            this._selectedHolder = { index: Piano.NO_HOLDER, isPassive: false };
                            this.returnAllSpritesToPosition();
                            setTimeout(() => {
                                Glow.removeGlowFilter(secondHolder.getElement());
                                Glow.removeGlowFilter(passiveHolder.getElement());
                            }, 500);
                        }
                        break;
                    case SelectOptions.SELECTED:
                        passiveHolder.selectOptions = SelectOptions.NOT_SELECTED;
                        this._selectedHolder = { index: Piano.NO_HOLDER, isPassive: false };
                        Glow.removeGlowFilter(passiveHolder.getElement());
                        break;
                }
            };
            passiveHolder.getElement().onpointerdown = () => {
                if (passiveHolder.isHolding && passiveHolder.selectOptions === SelectOptions.SELECTED) {
                    this._counter++;
                    const sprite = this._sprites[passiveHolder.holdingSpriteIndex];
                    this._synt.triggerAttack(sprite.note, Layout.piano.noteFrequency);
                    sprite.setColor(Layout.sprite.spriteClickColor);
                    sprite.addPressAnimation();
                }
            };
            passiveHolder.getElement().onpointerup = () => {
                if (passiveHolder.isHolding) {
                    this._synt.triggerRelease();
                    const sprite = this._sprites[passiveHolder.holdingSpriteIndex];
                    sprite.setColor(Layout.sprite.defaultColor);
                    sprite.removePressAnimation();
                }
            };
            passiveHolder.getElement().onpointerupoutside = passiveHolder.getElement().onpointerup;
            const activeHolder = this._activeHolders[i];
            activeHolder.getElement().onpointertap = () => {
                switch (activeHolder.selectOptions) {
                    case SelectOptions.NOT_SELECTED:
                        activeHolder.selectOptions = SelectOptions.SELECTED;
                        Glow.addGlowFilter(activeHolder.getElement());
                        if (this._selectedHolder.index === Piano.NO_HOLDER) {
                            this._selectedHolder = { index: activeHolder.index, isPassive: false };
                        }
                        else {
                            let secondHolder = this._activeHolders[this._selectedHolder.index];
                            if (this._selectedHolder.isPassive) {
                                secondHolder = this._passiveHolders[this._selectedHolder.index];
                            }
                            const firstSpriteIndex = activeHolder.holdingSpriteIndex;
                            const secondSpriteIndex = secondHolder.holdingSpriteIndex;
                            activeHolder.removeSprite();
                            secondHolder.removeSprite();
                            activeHolder.setSprite(secondSpriteIndex);
                            secondHolder.setSprite(firstSpriteIndex);
                            activeHolder.selectOptions = SelectOptions.NOT_SELECTED;
                            secondHolder.selectOptions = SelectOptions.NOT_SELECTED;
                            this._selectedHolder = { index: Piano.NO_HOLDER, isPassive: false };
                            this.returnAllSpritesToPosition();
                            setTimeout(() => {
                                Glow.removeGlowFilter(secondHolder.getElement());
                                Glow.removeGlowFilter(activeHolder.getElement());
                            }, 500);
                        }
                        break;
                    case SelectOptions.SELECTED:
                        activeHolder.selectOptions = SelectOptions.NOT_SELECTED;
                        this._selectedHolder = { index: Piano.NO_HOLDER, isPassive: false };
                        Glow.removeGlowFilter(activeHolder.getElement());
                        break;
                }
            };
            activeHolder.getElement().onpointerdown = () => {
                if (activeHolder.isHolding && activeHolder.selectOptions === SelectOptions.SELECTED) {
                    this._counter++;
                    const sprite = this._sprites[activeHolder.holdingSpriteIndex];
                    this._synt.triggerAttack(sprite.note, Layout.piano.noteFrequency);
                    sprite.setColor(Layout.sprite.spriteClickColor);
                    sprite.addPressAnimation();
                }
            };
            activeHolder.getElement().onpointerup = () => {
                if (activeHolder.isHolding) {
                    this._synt.triggerRelease();
                    const sprite = this._sprites[activeHolder.holdingSpriteIndex];
                    sprite.setColor(Layout.sprite.defaultColor);
                    sprite.removePressAnimation();
                }
            };
            activeHolder.getElement().onpointerupoutside = activeHolder.getElement().onpointerup;
        }
    }
    getActiveSpriteElement() {
        const result = [];
        for (let i = 0; i < this._activeHolders.length; i++) {
            result.push(this._activeHolders[i].holdingSpriteIndex);
        }
        return result;
    }
    //private handleSpriteMovedInHolder(sprite: KeySprite, isPassiveHolder: boolean, index: number) {
    //    let holder = this._activeHolders[index];
    //    if (isPassiveHolder) {
    //        holder = this._passiveHolders[index];
    //    }
    //    const spriteOldHolderInfo = this.getSpriteHolder(sprite.index);
    //    let spriteOldHolder = this._activeHolders[spriteOldHolderInfo.index];
    //    if (spriteOldHolderInfo.isPassiveHolder) {
    //        spriteOldHolder = this._passiveHolders[spriteOldHolderInfo.index];
    //    }
    //    if (holder.isHolding) {
    //        const holdersOldSprite = this._sprites[holder.holdingSpriteIndex];
    //        holder.removeSprite();
    //        spriteOldHolder.removeSprite();
    //        spriteOldHolder.setSprite(holdersOldSprite.index);
    //        holder.setSprite(sprite.index);
    //    } else {
    //        spriteOldHolder.removeSprite();
    //        holder.setSprite(sprite.index);
    //    }
    //}
    //private getSpriteHolder(index: number): {isPassiveHolder: boolean, index: number} {
    //    for (let i = 0; i < Layout.piano.numberOfKeys; i++) {
    //        const holder = this._passiveHolders[i];
    //        const activeHolder = this._activeHolders[i];
    //        if (holder.holdingSpriteIndex === index) {
    //            return { isPassiveHolder: true, index: holder.index };
    //        }
    //        if (activeHolder.holdingSpriteIndex === index) {
    //            return { isPassiveHolder: false, index: activeHolder.index };
    //        }
    //    }
    //    return { isPassiveHolder: false, index: -1 };
    //}
    //private detectIsInHolder(e: PIXI.FederatedPointerEvent): { isInHolder: boolean, isPassiveHolder: boolean, index: number } {
    //    const x = e.x - Layout.piano.x;
    //    const y = e.y - Layout.piano.y;
    //    for (let i = 0; i < Layout.piano.numberOfKeys; i++) {
    //        const holder = this._passiveHolders[i];
    //        const activeHolder = this._activeHolders[i];
    //        if (holder.isInside(x, y)) {
    //            return { isInHolder: true, isPassiveHolder: true, index: holder.index };
    //        }
    //        if (activeHolder.isInside(x, y)) {
    //            return { isInHolder: true, isPassiveHolder: false, index: activeHolder.index };
    //        }
    //    }
    //    return { isInHolder: false, isPassiveHolder: false, index: -1 };
    //}
    initializeAndAddPianoElements() {
        this.initializePianoKeys();
        this.initializeSpriteAndHolders();
    }
    initializePianoKeys() {
        const y = Layout.piano.keysY;
        let whiteX = Layout.piano.keysStartX;
        for (let i = 0; i < Layout.piano.numberOfKeys; i++) {
            const newKey = new Key(i);
            this._container.addChild(newKey.getElement());
            switch (Layout.piano.keyColors[i]) {
                case KeyColors.BLACK:
                    newKey.setElementPosition(whiteX - (Layout.piano.marginBetweenWhiteKeys + Layout.blackKey.width) * 0.5, y);
                    newKey.getElement().zIndex = KeyZIndexes.BLACK;
                    break;
                case KeyColors.WHITE:
                    newKey.setElementPosition(whiteX, y);
                    whiteX += Layout.whiteKey.width + Layout.piano.marginBetweenWhiteKeys;
                    newKey.getElement().zIndex = KeyZIndexes.WHITE;
                    break;
            }
            this._keys.push(newKey);
        }
    }
    initializeSpriteAndHolders() {
        const spriteAndHolderDiff = 5;
        const spriteY = Layout.piano.spriteY;
        const passiveSpriteHolderY = Layout.piano.spriteHolderY;
        const activeSpriteHolderY = spriteY + Layout.sprite.height - 2 * Layout.spriteHolder.radius - spriteAndHolderDiff;
        for (let i = 0; i < Layout.piano.numberOfKeys; i++) {
            const newKeySprite = new KeySprite(i);
            const newPassiveHolder = new SpriteHolder(i);
            const newActiveHolder = new SpriteHolder(i);
            const spriteX = this._keys[i].getElement().x + this._keys[i].width * 0.5 - newKeySprite.width * 0.5;
            const holderX = this._keys[i].getElement().x + this._keys[i].width * 0.5 - newPassiveHolder.width * 0.5;
            newKeySprite.setPosition(spriteX, spriteY);
            newKeySprite.getElement().zIndex = SpriteIndex.NOT_SELECTED;
            newPassiveHolder.setPosition(holderX, passiveSpriteHolderY);
            newPassiveHolder.setPossibleSpritePositions(spriteX, passiveSpriteHolderY - spriteAndHolderDiff);
            newActiveHolder.setPosition(holderX, activeSpriteHolderY);
            newActiveHolder.setSprite(newKeySprite.index);
            newActiveHolder.setPossibleSpritePositions(spriteX, spriteY);
            this._activeHolders.push(newActiveHolder);
            this._container.addChild(newActiveHolder.getElement());
            this._passiveHolders.push(newPassiveHolder);
            this._container.addChild(newPassiveHolder.getElement());
            this._sprites.push(newKeySprite);
            this._container.addChild(newKeySprite.getElement());
        }
    }
    getContainer() {
        return this._container;
    }
    gameFinished() {
        console.log(this._counter);
        this._gameInProgress = false;
    }
    gameStarted(shuffledKeys) {
        this._counter = 0;
        for (let i = 0; i < shuffledKeys.length; i++) {
            this._passiveHolders[i].removeSprite();
            this._activeHolders[i].removeSprite();
        }
        for (let i = 0; i < shuffledKeys.length; i++) {
            this._passiveHolders[i].setSprite(shuffledKeys[i]);
        }
        this.returnAllSpritesToPosition();
        this._gameInProgress = true;
    }
    returnAllSpritesToPosition() {
        for (let i = 0; i < Layout.piano.numberOfKeys; i++) {
            const holder = this._passiveHolders[i];
            const activeHolder = this._activeHolders[i];
            if (holder.isHolding) {
                const x = holder.getPossibleSpritePosition().x;
                const y = holder.getPossibleSpritePosition().y;
                this._sprites[holder.holdingSpriteIndex].goToPosition(x, y, true);
            }
            if (activeHolder.isHolding) {
                const x = activeHolder.getPossibleSpritePosition().x;
                const y = activeHolder.getPossibleSpritePosition().y;
                this._sprites[activeHolder.holdingSpriteIndex].goToPosition(x, y, true);
            }
        }
    }
}
Piano.NO_HOLDER = -1;
