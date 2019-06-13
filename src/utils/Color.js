class Color {
  constructor() {
    this.red = Math.floor(Math.random() * 255);
    this.green = Math.floor(Math.random() * 255);
    this.blue = Math.floor(Math.random() * 255);
  }

  toString() {
    return  `rgb(${this.red}, ${this.green}, ${this.blue})`;
  }
}
