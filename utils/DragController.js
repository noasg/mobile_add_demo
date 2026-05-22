export class DragController {
  constructor(app, target, options = {}) {
    this.app = app;
    this.target = target;

    this.minX = options.minX ?? 0;
    this.maxX = options.maxX ?? app.screen.width;

    this.dragging = false;

    this.init();
  }

  init() {
    this.target.eventMode = "static";
    this.target.cursor = "grab";

    this.target
      .on("pointerdown", this.onDown)
      .on("pointerup", this.onUp)
      .on("pointerupoutside", this.onUp)
      .on("pointermove", this.onMove);
  }

  onDown = (event) => {
    this.dragging = true;
    this.target.cursor = "grabbing";

    this.offsetX = event.data.global.x - this.target.x;
  };

  onUp = () => {
    this.dragging = false;
    this.target.cursor = "grab";
  };

  onMove = (event) => {
    if (!this.dragging) return;

    let newX = event.data.global.x - this.offsetX;

    // clamp movement
    newX = Math.max(this.minX, Math.min(this.maxX, newX));

    this.target.x = newX;
  };

  destroy() {
    this.target
      .off("pointerdown", this.onDown)
      .off("pointerup", this.onUp)
      .off("pointerupoutside", this.onUp)
      .off("pointermove", this.onMove);
  }
}
