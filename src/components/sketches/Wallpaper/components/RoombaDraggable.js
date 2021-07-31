import ShadowDraggable from '../../Hurricane/components/Draggable/ShadowDraggable';

export default class RoombaDraggable extends ShadowDraggable {

    constructor(id, x, y, w, h, img, p5) {

        super(id, x, y, w, h, p5);
        this.content = img;
    }

    update(dx, dy) {
        if (this.dragging) {
            super.update();
        }
        else {
            this.x += dx;
            this.y += dy;
        }
    }

    maximizeWindow() {
        //
    }

    displayContent(rot) {
        // this.displayShadow();
        // this.displaySolidBack(this.p5.color(0, 0, 255));
        // this.p5.fill(255);
        this.p5.push();
        this.p5.translate(this.w / 2, this.barH + this.h / 2);
        this.p5.rotate(rot)
        this.p5.image(this.content, -this.w / 2, -this.h / 2, this.w, this.h);
        this.p5.pop();
        // this.p5.ellipse(0, 0, 200);
        // this.displayFrame();
    }

  
    displayToolBar() {
        this.p5.push();
        this.p5.translate(this.x, this.y);
        if (!this.closed) {
          this.p5.fill(0);
          this.p5.noStroke();
          if (!this.minimized) this.p5.rect(0, 10, this.w, (this.barH - 10));
          this.p5.rect(0, 0, this.w, this.barH, this.bRad);
    
          // let gx = globalConfig.x * globalConfig.scaler;
          // let gy = globalConfig.y * globalConfig.scaler;
          // let mx = this.p5.mouseX + userX - gx - this.p5.windowWidth / 2 - this.x;
          // let my = this.p5.mouseY + userY - gy - this.p5.windowHeight / 2 - this.y;
          // let mx = this.p5.mouseX;
          // let my = this.p5.mouseY;
          this.closeButton.display(this.x, this.y);
          this.minButton.display(this.x, this.y);
          this.maxButton.display(this.x, this.y);
        }
        this.p5.pop();
      }
    

}
