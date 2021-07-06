import ShadowDraggable from '../../../Hurricane/components/Draggable/ShadowDraggable';

export default class FanDraggable extends ShadowDraggable {

    constructor(id, x, y, w, h, p5) {

        super(id, x, y, w, h, p5);
        this.fan = p5.loadImage(process.env.PUBLIC_URL + "/local_images/infrastructure/fan.png");
        this.blades = p5.loadImage(process.env.PUBLIC_URL + "/local_images/infrastructure/blades.png");
    }

    // update(dx, dy) {
    //     if (this.dragging) {
    //         super.update();
    //     }
    //     else {
    //         this.x += dx;
    //         this.y += dy;
    //     }
    // }

    displayContent() {
        this.displayShadow();
        this.displaySolidBack(this.p5.color(0));
        // this.p5.fill(255);
        this.p5.push();
        this.p5.translate(this.x, this.y);
       
        this.p5.translate(0, 25);
        this.p5.image(this.fan, -this.w/2, -this.h/2, this.w, this.h);

        this.p5.push();
        this.p5.rotate(this.p5.millis()/1000);
        this.p5.image(this.blades, -this.w/2, -this.h/2, this.w, this.h);
        this.p5.pop();

        this.p5.pop();
        // this.p5.ellipse(0, 0, 200);
        this.displayFrame();
    }

   

}
