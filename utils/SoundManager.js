export class SoundManager {
  constructor() {
    this.sounds = new Map();
  }

  async load(name, path, options = {}) {
    const sound = new Audio(path);

    sound.loop = options.loop ?? false;
    sound.volume = options.volume ?? 1;
    sound.preload = "auto";

    this.sounds.set(name, sound);

    return sound;
  }

  async play(name) {
    const sound = this.sounds.get(name);

    if (!sound) return;

    try {
      if (sound.paused) {
        await sound.play();
      }
    } catch (err) {
      console.warn(`Failed to play sound "${name}"`, err);
    }
  }

  stop(name) {
    const sound = this.sounds.get(name);

    if (!sound) return;

    sound.pause();
    sound.currentTime = 0;
  }

  stopAll() {
    this.sounds.forEach((sound) => {
      sound.pause();
      sound.currentTime = 0;
    });
  }

  destroy() {
    this.stopAll();
    this.sounds.clear();
  }
}
