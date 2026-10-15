class Button {
  constructor(x, y, p5) {
    this.r = 10;
    this.x = x;
    this.y = y;
    this.p5 = p5;
  }

  display(dx, dy, fillVal, strokeVal) {
    this.p5.stroke(strokeVal);
    this.p5.strokeWeight(2);
    this.p5.noFill();

    if (this.mouseOver(dx, dy)) {
      this.p5.fill(fillVal);
    }
    this.p5.ellipse(this.x, this.y, this.r);
  }

  mouseOver(dx, dy) {
    let d = this.p5.dist(
      dx + this.x,
      dy + this.y,
      this.p5.mouseX,
      this.p5.mouseY
    );

    return d < this.r / 2;
  }
}
