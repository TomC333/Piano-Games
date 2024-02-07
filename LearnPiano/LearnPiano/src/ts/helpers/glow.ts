import * as PIXI from 'pixi.js';
import { GlowFilter } from '@pixi/filter-glow';
import { gsap } from "gsap";


export class Glow {

    static addGlowFilter(target: PIXI.Container) {


        const glowFilter = new GlowFilter({ innerStrength: 0, outerStrength: 0, color: 0xffffff });

        target.filters = [glowFilter];

        gsap.to(glowFilter, {
            innerStrength: 5,
            outerStrength: 5,
            repeat: 0,
            yoyo: true,
            duration: 1,
        });
    }

    static removeGlowFilter(target: PIXI.Container) {

        gsap.to(target.filters[0], {
            innerStrength: 0,
            outerStrength: 0,
            repeat: -1,
            yoyo: true,
            duration: 1,
        })

        setTimeout(() => {
            target.filters = [];
        }, 1000);
    }
}
