import { appWidth, appHeight } from "./constants.js";

export function createApp() {
  return new PIXI.Application({
    width: appWidth,
    height: appHeight,

    backgroundColor: 0x111111,

    antialias: false,

    resolution: window.devicePixelRatio || 1,

    autoDensity: true,
  });
}
