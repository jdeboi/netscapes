
// force pulled to center of hurricane falls off with r^2
// no force > than a particular distance

import HurricaneDraggable from "./HurricaneDraggable";

// angular momentum = 
export default class Hurricane {

    constructor(p5) {
        this.x = p5.windowWidth/2;
        this.y = p5.windowHeight/2;
        this.w = 200;
        this.h = 200;
        this.dirX = 1;
        this.dirY = 1;

        this.speed = 2;
        this.dir = Math.random() * 3.1415;
        // this.img = p5.loadImage(process.env.PUBLIC_URL + "/local_images/hurricane.png");
        this.div = new HurricaneDraggable(0, this.x, this.y, this.w, this.h, p5);
    }

    isVisible = () => {
        return !this.div.closed;
    }
    
    getPos = () => {
        return {x: this.div.x, y: this.div.y};
    }

    update = (p5) => {
        if (!this.div.dragging) {
            if (this.div.x > p5.windowWidth-this.w) {
                this.div.x = p5.windowWidth-this.w;
                this.dirX = -1;
            }
            else if (this.div.x < 0) {
                this.div.x = 0;
                this.dirX = 1;
            }

            if (this.div.y > p5.windowHeight-this.h-26) {
                this.div.y = p5.windowHeight-this.h-26;
                this.dirY = -1;
            }
            else if (this.div.y < 0) {
                this.div.y = 0;
                this.dirY = 1;
            } 
        }
        this.div.update(this.dirX, this.dirY);
        // if (this.div.x > p5.windowWidth) {

        // }

        // this.x++;
        // if (this.x > p5.windowWidth) {

        // }

        // this.x = this.speed * Math.cos()
    }

    resetPosition = (p5) => {
        this.x = Math.random() * p5.windowWidth;
        this.y = Math.random() * p5.windowHeight;
    }

    display = (p5) => {
        this.div.display(0, 0);
        this.div.displayToolBar(0, 0);
    }

    checkMouse = () => {
        this.div.checkMouse();
    }

    endDrag = () => {
        this.div.endDrag();
    }
}
