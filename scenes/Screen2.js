import { appWidth, appHeight } from "../utils/constants.js";
import { DragController } from "../utils/DragController.js";
import { ASSETS } from "../utils/constants.js";

export class Screen2 extends PIXI.Container {
  constructor() {
    super();

    this.init();
  }

  init() {
    // -------------------
    // BACKGROUND
    // -------------------
    const bg = new PIXI.Graphics();

    bg.beginFill(0x87ceeb);
    bg.drawRect(0, 0, appWidth, appHeight);
    bg.endFill();

    this.addChild(bg);

    // -------------------
    // ROMAN
    // -------------------
    const roman = PIXI.Sprite.from(ASSETS.sprites.roman);

    roman.x = appWidth / 2;
    roman.y = 130;

    this.addChild(roman);

    // -------------------
    // WALL
    // -------------------
    const wall = PIXI.Sprite.from(ASSETS.sprites.wallFinal);

    wall.width = appWidth;
    wall.scale.y = wall.scale.x;

    wall.x = 0;
    wall.y = appHeight - wall.height;

    this.addChild(wall);

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

    // IMPORTANT: add BEFORE measuring size
    this.addChild(dacContainer);

    // position AFTER adding to stage
    dacContainer.x = appWidth / 2;
    dacContainer.y = appHeight - dacContainer.height * 0.25;

    // -------------------
    // DRAG CONTROLLER
    // -------------------
    this.drag = new DragController(this.app, dacContainer, {
      minX: dacContainer.width / 2,
      maxX: appWidth - dacContainer.width / 2,
    });

    console.log("showing screen 2");
  }
}
