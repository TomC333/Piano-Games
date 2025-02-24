import * as Tone from 'tone';
export class SynthSingleton {

    private static _synth: Tone.Synth;

    private constructor() { }

    public static getInstance(): Tone.Synth {

        if (!this._synth) {
            this._synth = new Tone.Synth().toDestination();
        }

        return this._synth;
    }
}