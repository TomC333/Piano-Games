import * as PIXI from 'pixi.js';
import { Layout } from '../../../layout';

export class Button {

    private _container: PIXI.Container;

    constructor(buttonText: string) {

        this._container = new PIXI.Container();

        let pixiText = new PIXI.Text(buttonText, {
            fontFamily: 'Arial',
            fontSize: 24,
            fill: "white",
            align: "right",
        });

        const graphics = new PIXI.Graphics();

        graphics.beginFill(0x000000);
        const t = graphics.drawRect(0, 0, Layout.button.width, Layout.button.height);
        graphics.endFill();


        this._container.addChild(t);
        this._container.addChild(pixiText);
        this._container.eventMode = 'dynamic';

        pixiText.x = (Layout.button.width - pixiText.width) / 2;
        pixiText.y = (Layout.button.height - pixiText.height) / 2;

    }

    setPosition(x: number, y: number) {
        this._container.x = x;
        this._container.y = y;
    }


    getElement(): PIXI.Container {
        return this._container;
    }
}