import { appWidth } from "./constants.js";

export function createCloseButton(onClick) {
  const closeBtn = PIXI.Sprite.from("closeBtn");
  closeBtn.anchor.set(0.5);

  closeBtn.x = appWidth - 40;
  closeBtn.y = 40;

  closeBtn.width = 45;
  closeBtn.height = 45;

  closeBtn.visible = false;

  closeBtn.eventMode = "static";
  closeBtn.cursor = "pointer";

  closeBtn.on("pointerdown", () => {
    if (onClick) onClick();
  });

  console.log("closeBtn", closeBtn);

  return closeBtn;
}
