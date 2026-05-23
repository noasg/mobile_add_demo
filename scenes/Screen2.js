import { appWidth, appHeight } from "../utils/constants.js";
import { DragController } from "../utils/DragController.js";
import { ASSETS } from "../utils/constants.js";
import { RomanBeerController } from "../controllers/RomanBeerController.js";

export class Screen2 extends PIXI.Container {
  constructor(app, anim, analytics, isGameActiveFn) {
    super();

    this.app = app;
    this.anim = anim;
    this.analytics = analytics;
    this.isGameActiveFn = isGameActiveFn;

    // ✅ ticker delay state
    this.nextCycleDelay = 0;

    this.init();
  }

  init() {
    // -------------------
    // LAYERS
    // -------------------
    this.romanLayer = new PIXI.Container();
    this.worldLayer = new PIXI.Container();
    this.uiLayer = new PIXI.Container();

    this.addChild(this.romanLayer);
    this.addChild(this.worldLayer);
    this.addChild(this.uiLayer);

    // -------------------
    // BACKGROUND
    // -------------------
    const bg = new PIXI.Graphics();
    bg.beginFill(0x87ceeb);
    bg.drawRect(0, 0, appWidth, appHeight);
    bg.endFill();

    this.worldLayer.addChild(bg);

    // -------------------
    // WALL
    // -------------------
    const wall = PIXI.Sprite.from(ASSETS.sprites.wallFinal);

    wall.width = appWidth;
    wall.scale.y = wall.scale.x;

    wall.x = 0;
    wall.y = appHeight - wall.height;

    this.worldLayer.addChild(wall);

    // -------------------
    // DAC CONTAINER
    // -------------------
    const dacContainer = new PIXI.Container();

    const dac1 = PIXI.Sprite.from(ASSETS.sprites.dac1);
    dac1.anchor.set(0.5);

    const dac2 = PIXI.Sprite.from(ASSETS.sprites.dac2);
    dac2.anchor.set(0.5);
    dac2.visible = false;

    dacContainer.addChild(dac1);
    dacContainer.addChild(dac2);

    dacContainer.x = appWidth / 2;
    dacContainer.y = appHeight - dacContainer.height * 0.25;

    this.uiLayer.addChild(dacContainer);

    // -------------------
    // DRAG
    // -------------------
    this.drag = new DragController(this.app, dacContainer, {
      minX: dacContainer.width / 2,
      maxX: appWidth - dacContainer.width / 2,
    });

    // -------------------
    // GAME CONTROLLER
    // -------------------
    this.game = new RomanBeerController(
      this.app,
      this,
      dacContainer,
      this.anim,
      (caught) => {
        console.log("cycle ended:", caught);

        // ✅ start delay instead of setTimeout
        this.nextCycleDelay = 800;
      },
    );

    this.game.startCycle();

    // -------------------
    // TICKER LOOP (REPLACES setTimeout)
    // -------------------
    this.app.ticker.add(this.update, this);

    console.log("showing screen 2");
  }

  update() {
    if (!this.isGameActiveFn()) return;
    if (!this.game) return;

    if (this.nextCycleDelay > 0) {
      this.nextCycleDelay -= this.app.ticker.deltaMS;

      if (this.nextCycleDelay <= 0) {
        this.game.startCycle();
      }
    }
  }

  destroy(options) {
    // cleanup ticker to avoid ghost updates
    this.app.ticker.remove(this.update, this);

    super.destroy(options);
  }
}
