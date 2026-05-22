export class AnimationManager {
  constructor(app) {
    this.app = app;
  }

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
}
