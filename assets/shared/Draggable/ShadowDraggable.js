import Draggable from "./Draggable.js";

export default class ShadowDraggable extends Draggable {
  constructor(id, x, y, w, h, p5, content) {
    super(id, x, y, w, h, p5, content);
    const url =
      "https://lmd-bucket.s3.us-east-2.amazonaws.com/sketches/gallery/";
    this.shadow = p5.loadImage(url + "tracklights/black_shadow.png");
  }

  displayContent() {
    this.displayShadow();
    super.displayContent();
  }

  displayShadow() {
    var backW = this.w * 1.25;
    var backH = this.h * 1.2;

    var backY = 0;

    this.p5.push();
    this.p5.translate(0, this.barH);
    this.p5.image(this.shadow, 0, backY, backW, backH);
    this.p5.pop();
  }
}
