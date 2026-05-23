import { AnimationManager } from "./utils/AnimationManager.js";
import { AnalyticsManager } from "./utils/AnalyticsManager.js";
import { SoundManager } from "./utils/SoundManager.js";

import { createCloseButton } from "./utils/createCloseButton.js";
import { timerCloseButton } from "./utils/timerCloseButton.js";
import { timerCloseBtn } from "./utils/constants.js";

import { Screen1 } from "./scenes/Screen1.js";
import { Screen2 } from "./scenes/Screen2.js";

import { ASSETS } from "./utils/constants.js";

export class Game {
  constructor(app) {
    // Main PIXI application instance
    this.app = app;

    // Currently active scene
    this.currentScene = null;

    // Separate UI layer to keep UI above scenes
    this.uiLayer = new PIXI.Container();

    // Global animation manager
    this.anim = new AnimationManager(app);

    // Analytics/events tracker
    this.analytics = new AnalyticsManager();

    // Global sound manager
    this.sound = new SoundManager();

    // Used to control game state
    this.isGameActive = true;
  }

  /**
   -> Initializes the game:
   -> - loads assets
   -> - loads sounds
   -> - starts analytics
   -> - creates UI
   -> - opens first screen
   */
  async init() {
    await PIXI.Assets.load([ASSETS.atlas, ASSETS.images.screen1Bg]);

    await this.sound.load("ambient", "assets/sounds/ambient_repeat.mp3", {
      loop: true,
      volume: 0.3,
    });

    this.analytics.start();

    this.setupUI();

    this.showScreen1();
  }

  /**
   * Creates global UI elements
   */
  setupUI() {
    this.closeBtn = createCloseButton(() => {
      // Track close button click
      this.analytics.track("close_clicked");

      // Stop all active sounds
      this.sound.stopAll();

      // Mark game as inactive
      this.isGameActive = false;

      console.log("close clicked");
    });

    this.uiLayer.addChild(this.closeBtn);

    // Starts timer logic for displaying/enabling close button
    this.closeTicker = timerCloseButton(this.app, this.closeBtn, timerCloseBtn);
  }

  /**
   * Displays the first screen of the game.
   */
  showScreen1() {
    // this.clearStage();

    const screen1 = new Screen1(
      this.app,
      this.anim,
      this.analytics,
      this.sound,
      // Callback to move to next screen
      () => this.showScreen2(),
    );

    this.app.stage.addChild(screen1);
    this.app.stage.addChild(this.uiLayer);

    this.currentScene = screen1;
  }

  /**
   * Displays the second screen of the game.
   */
  showScreen2() {
    // Remove previous scene
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

  /**
   * Removes and destroys the current scene
   * to free memory and avoid duplicates.
   */
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
