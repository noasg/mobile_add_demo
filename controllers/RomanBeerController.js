import { ASSETS } from "../utils/constants.js";
import { RandomUtils } from "../utils/RandomUtils.js";
import { CollisionUtils } from "../utils/CollisionUtils.js";
import { appWidth, appHeight } from "../utils/constants.js";

export class RomanBeerController {
  constructor(app, stage, dacContainer, anim, onCatchOrMiss) {
    this.app = app;
    this.stage = stage;
    this.dac = dacContainer;
    this.anim = anim;
    this.onCycleEnd = onCatchOrMiss;

    this.active = false;

    this.setup();
  }

  setup() {
    // -------------------
    // ROMAN
    // -------------------
    this.roman = PIXI.Sprite.from(ASSETS.sprites.roman);
    this.roman.anchor?.set?.(0.5);

    // store original position
    this.romanStart = {
      x: appWidth / 2,
      y: appHeight + 200,
    };

    this.stage.addChild(this.roman);

    // -------------------
    // ROMAN MASK
    // -------------------
    this.romanMask = new PIXI.Graphics();
    this.romanMask.beginFill(0xffffff);
    this.romanMask.drawRect(0, 0, appWidth, 314);
    this.romanMask.endFill();

    this.stage.addChild(this.romanMask);

    // apply ONLY to roman
    this.roman.mask = this.romanMask;

    // -------------------
    // BEER
    // -------------------
    this.beer = PIXI.Sprite.from(ASSETS.sprites.bere);
    this.beer.anchor?.set?.(0.5);
    this.beer.visible = false;

    this.stage.addChild(this.beer);
  }

  startCycle() {
    if (this.active) return;
    if (!this.app.stage) return;
    this.active = true;

    this.spawnRoman();
  }

  getRandomRomanX() {
    return appWidth / 2 + RandomUtils.range(-150, 150);
  }

  spawnRoman() {
    this.roman.y = 450;
    this.roman.x = this.getRandomRomanX();
    this.roman.scale.x = RandomUtils.sign();

    this.anim.to(this.roman, {
      y: 280,
      duration: 1,
      onComplete: () => this.spawnBeer(),
    });
  }

  spawnBeer() {
    this.beer.visible = true;
    // this.beer.alpha = 0.5;

    this.beer.x = this.roman.x;
    this.beer.y = this.roman.y + 80;

    this.dropBeer();
  }

  dropBeer() {
    this.anim.to(this.beer, {
      y: appHeight + 100,
      duration: 1.2,
      onUpdate: () => this.checkCollision(),
      onComplete: () => this.endCycle(false),
    });
  }

  checkCollision() {
    if (CollisionUtils.hit(this.beer, this.dac)) {
      this.endCycle(true);
    }
  }

  endCycle(caught) {
    if (!this.active) return;

    this.active = false;

    this.beer.visible = false;
    // this.beer.alpha = 1;

    if (caught) {
      this.flashCatch();
    }

    this.resetRoman();

    this.onCycleEnd?.(caught);
  }

  flashCatch() {
    const dac1 = this.dac.children[0];
    const dac2 = this.dac.children[1];

    dac1.visible = false;
    dac2.visible = true;

    this.anim.to(dac2, {
      x: dac2.x, // dummy animation (we just use timing)
      duration: 1,
      onComplete: () => {
        dac2.visible = false;
        dac1.visible = true;
      },
    });
  }

  resetRoman() {
    this.anim.to(this.roman, {
      x: this.getRandomRomanX(),
      y: this.romanStart.y,
      duration: 1,
      onComplete: () => {
        this.roman.visible = true;
      },
    });
  }
}
