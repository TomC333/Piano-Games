import * as Tone from 'tone';
export class SynthSingleton {
    constructor() { }
    static getInstance() {
        if (!this._synth) {
            this._synth = new Tone.Synth().toDestination();
        }
        return this._synth;
    }
}
