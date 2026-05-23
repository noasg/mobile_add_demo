export class SoundManager {
  constructor() {
    // Stores all loaded sounds by name
    this.sounds = new Map();
  }

  /**
   * Loads and registers a sound.
   */
  async load(name, path, options = {}) {
    const sound = new Audio(path);

    sound.loop = options.loop ?? false;
    sound.volume = options.volume ?? 1;
    sound.preload = "auto";

    this.sounds.set(name, sound);

    return sound;
  }

  /**
   * Plays a sound by name.
   */
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

  /**
   * Stops a specific sound
   * and resets playback position.
   */
  stop(name) {
    const sound = this.sounds.get(name);

    if (!sound) return;

    sound.pause();
    sound.currentTime = 0;
  }

  /**
   * Stops all registered sounds.
   */
  stopAll() {
    this.sounds.forEach((sound) => {
      sound.pause();
      sound.currentTime = 0;
    });
  }

  /**
   * Cleans up all sounds
   * and clears memory references.
   */
  destroy() {
    this.stopAll();
    this.sounds.clear();
  }
}
