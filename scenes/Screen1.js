import { appWidth, appHeight } from "../utils/constants.js";
import { ASSETS } from "../utils/constants.js";

export class Screen1 extends PIXI.Container {
  constructor(app, anim, analytics, sound, onStart) {
    super();

    this.app = app;
    this.anim = anim;
    this.onStart = onStart;
    this.analytics = analytics;
    this.sound = sound;

    this.init();
  }

  /**
   * Creates and initializes
   * all visual elements for Screen 1.
   */
  init() {
    // Create background sprite
    const bg = PIXI.Sprite.from(ASSETS.images.screen1Bg);

    bg.width = appWidth;
    bg.height = appHeight;

    this.addChild(bg);

    // Create start button sprite
    const startBtn = PIXI.Sprite.from(ASSETS.sprites.startBtn);

    startBtn.anchor.set(0.5);

    startBtn.x = appWidth / 2;
    startBtn.y = appHeight / 2;

    startBtn.eventMode = "static";
    startBtn.cursor = "pointer";

    //start button animation
    this.anim.pulse(startBtn, {
      min: 0.86,
      max: 1.0,
    });

    startBtn.on("pointertap", async () => {
      // Track analytics event
      this.analytics.track("start_clicked");

      await this.sound.play("ambient");

      // Move to next screen
      this.onStart();

      console.log("start button pressed");
    });

    this.addChild(startBtn);
  }
}
