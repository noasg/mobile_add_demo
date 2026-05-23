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

  /**
   * Creates and initializes
   * all controller objects.
   */
  setup() {
    this.roman = PIXI.Sprite.from(ASSETS.sprites.roman);
    this.roman.anchor?.set?.(0.5);

    // Store original hidden/offscreen position for reset after each cycle
    this.romanStart = {
      x: appWidth / 2,
      y: appHeight + 200,
    };

    this.stage.addChild(this.roman);

    // Create mask to hide roman outside visible area
    this.romanMask = new PIXI.Graphics();
    this.romanMask.beginFill(0xffffff);
    this.romanMask.drawRect(0, 0, appWidth, 314);
    this.romanMask.endFill();

    this.stage.addChild(this.romanMask);

    this.roman.mask = this.romanMask;

    // Create falling beer sprite
    this.beer = PIXI.Sprite.from(ASSETS.sprites.bere);
    this.beer.anchor?.set?.(0.5);
    this.beer.visible = false;

    this.stage.addChild(this.beer);
  }

  /**
   * Starts a new gameplay cycle.
   */
  startCycle() {
    if (this.active) return;
    if (!this.app.stage) return;
    this.active = true;

    this.spawnRoman();
  }

  /**
   * Returns a random X position
   * for roman spawn movement.
   */
  getRandomRomanX() {
    return appWidth / 2 + RandomUtils.range(-150, 150);
  }

  /**
   * Animates roman into view.
   */
  spawnRoman() {
    this.roman.y = 450;
    this.roman.x = this.getRandomRomanX();
    // Random facing direction
    this.roman.scale.x = RandomUtils.sign();

    // Animate roman upward
    this.anim.to(this.roman, {
      y: 280,
      duration: 1,
      onComplete: () => this.spawnBeer(),
    });
  }

  /**
   * Creates and positions the beer
   * below the roman character.
   */
  spawnBeer() {
    this.beer.visible = true;
    // this.beer.alpha = 0.5;

    this.beer.x = this.roman.x;
    this.beer.y = this.roman.y + 80;

    this.dropBeer();
  }

  /**
   * Animates beer falling downward.
   */
  dropBeer() {
    this.anim.to(this.beer, {
      y: appHeight + 100,
      duration: 1.2,
      // Check collision while beer falls
      onUpdate: () => this.checkCollision(),
      // End cycle if beer missed
      onComplete: () => this.endCycle(false),
    });
  }

  /**
   * Checks collision between
   * beer and DAC player.
   */
  checkCollision() {
    if (CollisionUtils.hit(this.beer, this.dac)) {
      this.endCycle(true);
    }
  }

  /**
   * Ends current gameplay cycle.
   */
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

  /**
   * Briefly swaps DAC sprite
   * to create catch feedback effect.
   */
  flashCatch() {
    const dac1 = this.dac.children[0];
    const dac2 = this.dac.children[1];

    dac1.visible = false;
    dac2.visible = true;

    this.anim.to(dac2, {
      x: dac2.x,
      duration: 1,
      onComplete: () => {
        dac2.visible = false;
        dac1.visible = true;
      },
    });
  }

  /**
   * Animates roman back offscreen
   * after cycle ends.
   */
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
