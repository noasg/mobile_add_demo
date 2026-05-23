import { game } from "./game.js";

import { createApp } from "./utils/createApp.js";

import { resize } from "./utils/resize.js";

const app = createApp();

document.getElementById("game").appendChild(app.view);

const game = new Game(app);

game.init();

window.addEventListener("resize", () => resize(app));

resize(app);
