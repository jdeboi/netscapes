import ShadowDraggable from '../Draggable/ShadowDraggable';

export default class BoidDraggable extends ShadowDraggable {

    constructor(id, x, y, w, h, p5, txt) {

        super(id, x, y, w, h, p5);
        this.txt = txt;
        // this.closed = true;
    }

    update(x, y) {
        if (!this.dragging) {
            const rat = .96;
            this.x = this.x * rat + x * (1 - rat);
            this.y = this.y * rat + y * (1 - rat);
        }
        else
            super.update();
    }

    displayContent() {
        this.displayShadow();
        this.displaySolidBack(this.p5.color(255));
        // this.p5.fill(255);
        this.p5.push();
        this.p5.translate(20, this.barH + 20);
        this.p5.text(this.txt, 0, 0, this.w - 40, this.h - 40);
        this.p5.pop();
        // this.p5.ellipse(0, 0, 200);
        this.displayFrame();
    }



}
