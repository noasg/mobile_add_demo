import { AnimationManager } from "./utils/AnimationManager.js";

import { Screen1 } from "./scenes/Screen1.js";
import { Screen2 } from "./scenes/Screen2.js";

export class Game {
  constructor(app) {
    this.app = app;

    this.currentScene = null;

    this.anim = new AnimationManager(app);
  }

  async init() {
    await PIXI.Assets.load(["assets/atlas.json", "assets/screen1_bg.jpg"]);

    this.showScreen1();
  }

  showScreen1() {
    this.clearStage();

    const screen1 = new Screen1(this.app, this.anim, () => this.showScreen2());

    this.app.stage.addChild(screen1);

    this.currentScene = screen1;
  }

  showScreen2() {
    this.clearStage();

    const screen2 = new Screen2();

    this.app.stage.addChild(screen2);

    this.currentScene = screen2;
  }

  clearStage() {
    if (this.currentScene) {
      this.app.stage.removeChild(this.currentScene);

      this.currentScene.destroy({
        children: true,
      });
    }

    this.currentScene = null;
  }
}
