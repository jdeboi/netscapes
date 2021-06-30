
// force pulled to center of hurricane falls off with r^2
// no force > than a particular distance
// angular momentum = 
import BoidDraggable from './BoidDraggable';

export default class Boid {

    constructor(id, hurricanePos, imgs, p5) {
        this.pos = {
            x: Math.random() * p5.windowWidth,
            y: Math.random() * p5.windowHeight
        };

        this.center = { x: hurricanePos.x + 100, y: hurricanePos.y + 126 };

        this.angle = Math.random() * p5.PI * 2;
        // this.angularV = 0;
        // this.angularA = 0;
        // this.maxDis = 300;

        this.distToH = p5.dist(hurricanePos.x, hurricanePos.y, this.pos.x, this.pos.y);
        this.distToH = p5.constrain(this.distToH, 120, p5.windowWidth * .4);
        this.angleAmt = p5.map(this.distToH, 0, p5.windowWidth / 2, .03, .001);

        const r = Math.random();

        const titles = ["sys","taxes2020", "archived", "untitled", "0", "xfiles", "im_not_a_cat", "README","diary21", "setup", "nyan", "v1.22", "exposed","Screen Shot 2021-0","99-babes", "root"]

        this.title = p5.random(titles);

        if (id === 0) {
            this.title = "home";
            this.img = p5.loadImage("https://lmd-bucket.s3.us-east-2.amazonaws.com/sketches/shared/homeicon.png");
        }
        // else if (id === 1) {
        //     this.title = "";
        //     this.img = p5.loadImage(process.env.PUBLIC_URL + "/local_images/hurricane/nyan.png");
        // }
        else if (r < .6) {
            this.img = imgs[0];
            this.title += ".txt";
        }
        else if (r < 1)
            this.img = imgs[1];
        else {
            // this.img = p5.loadImage("https://lmd-bucket.s3.us-east-2.amazonaws.com/sketches/waveforms/txt.png");
            // this.title += ".txt";
            this.pos.x = this.center.x + this.distToH * Math.cos(this.angle);
            this.pos.y = this.center.y + this.distToH * Math.sin(this.angle);
            this.div = new BoidDraggable(0, this.pos.x, this.pos.y, 200, 100, p5, "some text goes here asd asd alaljka ajdkf; ;lkasjd");
        }


        if (!this.div) {
            const sz = 90;
            const ratio = sz / this.img.width;
            this.w = this.img.width * ratio;
            this.h = this.img.height * ratio;
        }

    }

    update = (hurricanePos, p5) => {

        // distToH = p5.constrain(distToH, 50, 200);
        // this.angularV = p5.map(distToH, 0, this.maxDis, .2, 0);
        // this.angularV = p5.constrain(this.angularV, 0, this.maxDis);
        // this.angle += this.angularV;

        // distToH -= .02;
        this.pos.x = this.center.x + this.distToH * Math.cos(this.angle);
        this.pos.y = this.center.y + this.distToH * Math.sin(this.angle);
        this.angle -= this.angleAmt;

        const ratio = .95;
        this.center.x = this.center.x * ratio + (hurricanePos.x + 100) * (1 - ratio);
        this.center.y = this.center.y * ratio + (hurricanePos.y + 126) * (1 - ratio);

        if (this.div)
            this.div.update(this.pos.x, this.pos.y);
    }

    resetPosition = (p5) => {
        this.pos.x = Math.random() * p5.windowWidth;
        this.pos.y = Math.random() * p5.windowHeight;
        if (this.div)
            this.div.update(this.pos.x, this.pos.y);
    }

    display = (p5) => {


        if (this.div) {
            this.div.display();
            this.div.displayToolBar();
        }
        else {
            p5.fill(255, 0, 0);
            // p5.ellipse(this.pos.x, this.pos.y, 50);
            p5.push();
            p5.translate(this.pos.x, this.pos.y);

            p5.image(this.img, 0, 0, this.w, this.h);

            p5.fill(255);
            p5.stroke(0);
            p5.textSize(12);
            let str = this.title;
            p5.text(str, this.w / 2 - p5.textWidth(str) / 2, this.h + 18);
            p5.pop();
        }

    }

    checkMouse = (p5) => {
        if (this.div)
            this.div.checkMouse();
    }

    endDrag = () => {
        if (this.div)
            this.div.endDrag();
    }

    checkDoubleClicked = (p5) => {
        // if (this.mouseOver(p5)) {
        // console.log("mouse");
        // this.div.closed = false;
        // }
    }

    mouseOver = (p5) => {
        return p5.mouseX > this.pos.x && p5.mouseX < this.pos.x + this.w && p5.mouseY > this.pos.y && p5.mouseY < this.pos.y + this.h;
    }
}