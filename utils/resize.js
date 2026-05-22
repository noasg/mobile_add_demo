import { appWidth, appHeight } from "./constants.js";

export function resize(app) {
  const scaleX = window.innerWidth / appWidth;
  const scaleY = window.innerHeight / appHeight;

  const scale = Math.min(scaleX, scaleY);

  app.view.style.width = `${appWidth * scale}px`;
  app.view.style.height = `${appHeight * scale}px`;

  app.view.style.position = "absolute";

  app.view.style.left = `${(window.innerWidth - appWidth * scale) / 2}px`;

  app.view.style.top = `${(window.innerHeight - appHeight * scale) / 2}px`;

  console.log("resized -> utils");
}
