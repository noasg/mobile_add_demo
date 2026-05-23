export class AnimationManager {
  constructor(app) {
    this.app = app;
  }

  /**
   * Creates a continuous pulse animation
   * by scaling the target object up and down.
   */
  pulse(target, { min = 0.8, max = 1, speed = 0.05 } = {}) {
    let t = 0;

    const tick = () => {
      if (!target || target.destroyed) {
        this.app.ticker.remove(tick);
        return;
      }

      t += speed;

      const scale = min + (Math.sin(t) + 1) * 0.5 * (max - min);
      target.scale.set(scale);
    };

    this.app.ticker.add(tick);
  }

  /**
   * Animates object position over time.
   */
  to(target, { x, y, duration = 1, onUpdate, onComplete } = {}) {
    const startX = target.x;
    const startY = target.y;

    const diffX = x !== undefined ? x - startX : 0;
    const diffY = y !== undefined ? y - startY : 0;

    const startTime = performance.now();

    const update = (now) => {
      if (!target || target.destroyed) return;

      const t = Math.min((now - startTime) / (duration * 1000), 1);

      if (x !== undefined) target.x = startX + diffX * t;
      if (y !== undefined) target.y = startY + diffY * t;

      onUpdate?.();

      if (t < 1) {
        requestAnimationFrame(update);
      } else {
        onComplete?.();
      }
    };

    requestAnimationFrame(update);
  }
}
