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

    //flag used to stop roman+beer+dacian animations -> after users taps the close button
    this.isGameActiveFn = isGameActiveFn;

    this.nextCycleDelay = 0;

    this.init();
  }

  /**
   * Creates and initializes
   * all gameplay elements for Screen 2.
   */
  init() {
    // Layer for roman/beer animations
    this.romanLayer = new PIXI.Container();

    // Layer for wall + bg
    this.worldLayer = new PIXI.Container();

    // layer for dacian charcter at bottom + counter for beers
    this.uiLayer = new PIXI.Container();

    this.addChild(this.romanLayer);
    this.addChild(this.worldLayer);
    this.addChild(this.uiLayer);

    //bg
    const bg = new PIXI.Graphics();
    bg.beginFill(0x87ceeb);
    bg.drawRect(0, 0, appWidth, appHeight);
    bg.endFill();

    this.worldLayer.addChild(bg);

    //adding wall
    const wall = PIXI.Sprite.from(ASSETS.sprites.wallFinal);

    wall.width = appWidth;
    wall.scale.y = wall.scale.x;

    wall.x = 0;
    wall.y = appHeight - wall.height;

    this.worldLayer.addChild(wall);

    // Container holding DAC character sprites
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

    // Enable horizontal drag movement for DAC character
    this.drag = new DragController(this.app, dacContainer, {
      minX: dacContainer.width / 2,
      maxX: appWidth - dacContainer.width / 2,
    });

    //beer counter
    this.score = 0;

    this.scoreText = new PIXI.Text(`Shared beers: ${this.score}`, {
      fill: 0xff4500,
      fontSize: 30,
      fontWeight: "bold",
    });

    this.scoreText.x = 40;
    this.scoreText.y = 40;

    this.uiLayer.addChild(this.scoreText);

    // Main gameplay logic controller
    this.game = new RomanBeerController(
      this.app,
      this,
      dacContainer,
      this.anim,
      (caught) => {
        console.log("cycle ended:", caught);

        if (caught) {
          this.score++;
          this.scoreText.text = `Shared beers: ${this.score}`;
        }

        this.nextCycleDelay = 800;
      },
    );

    // Start first gameplay cycle
    this.game.startCycle();

    // Main update loop for Screen 2, used to trigger new cycles in RomanBeerController
    this.app.ticker.add(this.update, this);

    console.log("showing screen 2");
  }

  /**
   * Runs every frame.
   * Handles cycle timing and updates.
   */
  update() {
    // Stop updates if game is inactive
    if (!this.isGameActiveFn()) return;

    // Safety check
    if (!this.game) return;

    // Handle delay countdown
    if (this.nextCycleDelay > 0) {
      this.nextCycleDelay -= this.app.ticker.deltaMS;

      if (this.nextCycleDelay <= 0) {
        this.game.startCycle();
      }
    }
  }

  /**
   * Cleans up ticker listeners
   * before destroying the scene.
   */
  destroy(options) {
    this.app.ticker.remove(this.update, this);

    super.destroy(options);
  }
}
