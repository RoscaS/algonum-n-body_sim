class DualValue {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  set(x, y) {
    this.x = x;
    this.y = y;
  }

  toString() {
    return `(${this.x}; ${this.y})`;
  }
}

class Position extends DualValue {
  constructor(x, y) {
    super(x, y);
  }

  toString() {
    return `P: ${super.toString()}`;
  }
}

class Vector2 extends DualValue {
  constructor(x, y) {
    super(x, y);
  }


  toString() {
    return `v: ${super.toString()}`;
  }

}
