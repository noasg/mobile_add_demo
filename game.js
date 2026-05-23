import { AnimationManager } from "./utils/AnimationManager.js";
import { AnalyticsManager } from "./utils/AnalyticsManager.js";
import { createCloseButton } from "./utils/createCloseButton.js";
import { timerCloseButton } from "./utils/timerCloseButton.js";
import { timerCloseBtn } from "./utils/constants.js";
import { Screen1 } from "./scenes/Screen1.js";
import { Screen2 } from "./scenes/Screen2.js";
import { ASSETS } from "./utils/constants.js";

export class Game {
  constructor(app) {
    this.app = app;

    this.currentScene = null;
    this.uiLayer = new PIXI.Container();

    this.anim = new AnimationManager(app);

    this.analytics = new AnalyticsManager();

    this.isGameActive = true;
  }

  async init() {
    await PIXI.Assets.load([ASSETS.atlas, ASSETS.images.screen1Bg]);

    this.analytics.start();

    this.setupUI();

    this.showScreen1();
  }

  setupUI() {
    this.closeBtn = createCloseButton(() => {
      this.analytics.track("close_clicked");
      this.isGameActive = false;
      console.log("close clicked");
    });

    this.uiLayer.addChild(this.closeBtn);

    this.closeTicker = timerCloseButton(this.app, this.closeBtn, timerCloseBtn);
  }

  showScreen1() {
    this.clearStage();

    const screen1 = new Screen1(this.app, this.anim, this.analytics, () =>
      this.showScreen2(),
    );

    this.app.stage.addChild(screen1);
    this.app.stage.addChild(this.uiLayer);

    this.currentScene = screen1;
  }

  showScreen2() {
    this.clearStage();

    const screen2 = new Screen2(
      this.app,
      this.anim,
      this.analytics,
      () => this.isGameActive,
    );

    this.app.stage.addChild(screen2);
    this.app.stage.addChild(this.uiLayer);

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
