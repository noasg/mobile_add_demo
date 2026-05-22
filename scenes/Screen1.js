import { appWidth, appHeight } from "../utils/constants.js";

export class Screen1 extends PIXI.Container {
  constructor(app, anim, onStart) {
    super();

    this.app = app;
    this.anim = anim;
    this.onStart = onStart;

    this.init();
  }

  init() {
    // background
    const bg = PIXI.Sprite.from("assets/screen1_bg.jpg");

    bg.width = appWidth;
    bg.height = appHeight;

    this.addChild(bg);

    // button
    const startBtn = PIXI.Sprite.from("startBtn");

    startBtn.anchor.set(0.5);

    startBtn.x = appWidth / 2;
    startBtn.y = appHeight / 2;

    startBtn.eventMode = "static";
    startBtn.cursor = "pointer";

    this.anim.pulse(startBtn, {
      min: 0.86,
      max: 1.0,
    });

    startBtn.on("pointerdown", () => {
      this.onStart();
      console.log("start button pressed");
    });

    this.addChild(startBtn);
  }
}
