import * as PIXI from 'pixi.js';
import { Layout } from '../../../layout';
import { KeyColors, KeyZIndexes, SpriteIndex } from '../../../enums';
import { Key } from './key&Sprite&Holder/key';
import { KeySprite } from './key&Sprite&Holder/keySprite';
import { SpriteHolder } from './key&Sprite&Holder/spriteHolder';
import { SynthSingleton } from './synthSingleton';
export class Piano {
    constructor() {
        this._keys = [];
        this._sprites = [];
        this._passiveHolders = [];
        this._activeHolders = [];
        this._synt = SynthSingleton.getInstance();
        this._gameInProgress = false;
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
                const currentActiveColder = this._activeHolders[i];
                if (currentActiveColder.isHolding) {
                    const currentSprite = this._sprites[currentActiveColder.holdingSpriteIndex];
                    if (this._gameInProgress) {
                        currentSprite.setColor(Layout.sprite.gameInProgressSpriteColor);
                    }
                    else if (currentActiveColder.holdingSpriteIndex === i) {
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
            const sprite = this._sprites[i];
            sprite.getElement().onpointerdown = (e) => {
                sprite.getElement().zIndex = SpriteIndex.SELECTED;
                sprite.setColor(Layout.sprite.spriteClickColor);
                this._synt.triggerAttack(sprite.note, Layout.piano.noteFrequency);
                sprite.addPressAnimation();
                sprite.isDraggable = true;
            };
            sprite.getElement().onpointerup = (e) => {
                sprite.getElement().zIndex = SpriteIndex.NOT_SELECTED;
                sprite.setColor(Layout.sprite.defaultColor);
                this._synt.triggerRelease();
                sprite.removePressAnimation();
                sprite.isDraggable = false;
                if (this._gameInProgress) {
                    const detectedPosition = this.detectIsInHolder(e);
                    if (detectedPosition.isInHolder) {
                        this.handleSpriteMovedInHolder(sprite, detectedPosition.isPassiveHolder, detectedPosition.index);
                    }
                    this.returnAllSpritesToPosition();
                }
            };
            sprite.getElement().onpointerupoutside = sprite.getElement().onpointerup;
            sprite.getElement().onpointermove = (e) => {
                if (sprite.isDraggable && this._gameInProgress) {
                    const x = e.x - Layout.piano.x - sprite.width / 2;
                    const y = e.y - Layout.piano.y - sprite.height / 2;
                    sprite.setPosition(x, y);
                    this._synt.triggerRelease();
                }
            };
        }
    }
    handleSpriteMovedInHolder(sprite, isPassiveHolder, index) {
        let holder = this._activeHolders[index];
        if (isPassiveHolder) {
            holder = this._passiveHolders[index];
        }
        const spriteOldHolderInfo = this.getSpriteHolder(sprite.index);
        console.log(spriteOldHolderInfo.isPassiveHolder, spriteOldHolderInfo.index);
        let spriteOldHolder = this._activeHolders[spriteOldHolderInfo.index];
        if (spriteOldHolderInfo.isPassiveHolder) {
            spriteOldHolder = this._passiveHolders[spriteOldHolderInfo.index];
        }
        if (holder.isHolding) {
            const holdersOldSprite = this._sprites[holder.holdingSpriteIndex];
            holder.removeSprite();
            spriteOldHolder.removeSprite();
            spriteOldHolder.setSprite(holdersOldSprite.index);
            holder.setSprite(sprite.index);
        }
        else {
            spriteOldHolder.removeSprite();
            holder.setSprite(sprite.index);
        }
    }
    getSpriteHolder(index) {
        for (let i = 0; i < Layout.piano.numberOfKeys; i++) {
            const holder = this._passiveHolders[i];
            const activeHolder = this._activeHolders[i];
            if (holder.holdingSpriteIndex === index) {
                return { isPassiveHolder: true, index: holder.index };
            }
            if (activeHolder.holdingSpriteIndex === index) {
                return { isPassiveHolder: false, index: activeHolder.index };
            }
        }
        return { isPassiveHolder: false, index: -1 };
    }
    detectIsInHolder(e) {
        const x = e.x - Layout.piano.x;
        const y = e.y - Layout.piano.y;
        for (let i = 0; i < Layout.piano.numberOfKeys; i++) {
            const holder = this._passiveHolders[i];
            const activeHolder = this._activeHolders[i];
            if (holder.isInside(x, y)) {
                return { isInHolder: true, isPassiveHolder: true, index: holder.index };
            }
            if (activeHolder.isInside(x, y)) {
                return { isInHolder: true, isPassiveHolder: false, index: activeHolder.index };
            }
        }
        return { isInHolder: false, isPassiveHolder: false, index: -1 };
    }
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
    returnAllSpritesToPosition() {
        for (let i = 0; i < Layout.piano.numberOfKeys; i++) {
            const holder = this._passiveHolders[i];
            const activeHolder = this._activeHolders[i];
            if (holder.isHolding) {
                const x = holder.getPossibleSpritePosition().x;
                const y = holder.getPossibleSpritePosition().y;
                this._sprites[holder.holdingSpriteIndex].goToPosition(x, y);
            }
            if (activeHolder.isHolding) {
                const x = activeHolder.getPossibleSpritePosition().x;
                const y = activeHolder.getPossibleSpritePosition().y;
                this._sprites[activeHolder.holdingSpriteIndex].goToPosition(x, y);
            }
        }
    }
}
