export class RandomUtils {
  // random number in range
  static range(min, max) {
    return Math.random() * (max - min) + min;
  }

  // random integer in range (inclusive)
  static rangeInt(min, max) {
    return Math.floor(this.range(min, max + 1));
  }

  // true/false with probability (0–1)
  static chance(probability = 0.5) {
    return Math.random() < probability;
  }

  // returns either -1 or +1
  static sign() {
    return Math.random() < 0.5 ? -1 : 1;
  }

  // returns true/false (alias for readability)
  static coinFlip() {
    return this.chance(0.5);
  }

  // random pick from array
  static pick(array) {
    return array[this.rangeInt(0, array.length - 1)];
  }

  // random float between 0 and 1
  static unit() {
    return Math.random();
  }
}
