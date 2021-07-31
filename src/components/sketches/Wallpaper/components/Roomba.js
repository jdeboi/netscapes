
// force pulled to center of hurricane falls off with r^2
// no force > than a particular distance

import RoombaDraggable from "./RoombaDraggable";
import { getDegrees, rectanglesOverlap } from '../../../shared/Helpers/Helpers';

const RIGHT = 0;
const UP = 1;
const DOWN = 2;
const LEFT = 3;

// angular momentum = 
export default class Roomba {

    constructor(id, img, p5) {

        this.y = Math.random() * p5.windowHeight / 2;
        this.w = 130;
        this.x = p5.windowWidth / 2 - (id * this.w + 10);
        this.h = this.w;
        this.dir = p5.random([UP, DOWN, LEFT, RIGHT]);
        this.angle = this.getTarget();
        this.speed = 2;
        this.isStopped = false;
        this.id = id;
        // this.img = p5.loadImage(process.env.PUBLIC_URL + "/local_images/hurricane.png");
        this.div = new RoombaDraggable(0, this.x, this.y, this.w, this.h, img, p5);
        this.pattern = p5.loadImage("https://netscapes.s3.us-east-2.amazonaws.com/roomba/grass1.jpeg");
        this.buffer = p5.createGraphics(this.w + 4, this.h + 26 + 4);
        this.isMini = false;
        this.closed = false;
    }

    isVisible = () => {
        return !this.div.closed;
    }

    getPos = () => {
        return { x: this.div.x, y: this.div.y };
    }

    update = (roombas, p5) => {
        if (!this.div.dragging) {
            this.checkCollisions(roombas);
            this.checkBoundaries(p5);

            this.checkRandomMove(p5);
            this.setDir();
            if (this.isStopped) {
                this.rotateRoomba();
            }
        }
        this.div.update(this.dirX, this.dirY);

    }

    checkRandomMove = (p5) => {
        if (!this.isStopped) {
            if (Math.random() < .002) {
                this.dir += p5.random([-1, 1]);
                if (this.dir > 3)
                    this.dir = 0;
                else if (this.dir < 0)
                    this.dir = 3;
                this.isStopped = true;
            }
        }
    }

    checkCollisions = (roombas) => {
        if (!this.isStopped) {
            let rmbs = roombas.filter((roomba) => roomba.id !== this.id);
            for (const roomba of rmbs) {
                if (this.willCollide(roomba)) {
                    this.dir++;
                    this.dir %= 4;
                    this.isStopped = true;
                    return;
                }
            }
        }

    }

    willCollide(roomba) {
        const x0 = this.div.x + Math.cos(this.getTarget()) * this.speed;
        const y0 = this.div.y + Math.sin(this.getTarget()) * this.speed;
        const x1 = roomba.div.x;
        const y1 = roomba.div.y;
        const w = this.w;
        const h = this.h + 26;
        return rectanglesOverlap(x0, y0, w, h, x1, y1, w, h);
    }

    checkBoundaries = (p5) => {
        if (this.div.x > p5.windowWidth - this.w) {
            this.div.x = p5.windowWidth - this.w;
            this.dir = p5.random([UP, DOWN, LEFT]);
            this.isStopped = true;
        }
        else if (this.div.x < 0) {
            // this.div.x = 0;
            // this.dirX = 1;
            this.div.x = 0;
            this.dir = p5.random([UP, DOWN, RIGHT]);
            this.isStopped = true;
        }
        if (this.div.y > p5.windowHeight - this.h - 26 - 30) {
            // this.div.y = p5.windowHeight-this.h-26;
            // this.dirY = -1;
            this.div.y = p5.windowHeight - this.h - 26 - 30;
            this.dir = p5.random([LEFT, RIGHT, UP]);
            this.isStopped = true;
        }
        else if (this.div.y < 0) {
            // this.div.y = 0;
            // this.dirY = 1;
            this.div.y = 0;
            this.dir = p5.random([LEFT, RIGHT, DOWN]);
            this.isStopped = true;
        }
    }

    rotateRoomba = () => {
        this.dirX = 0;
        this.dirY = 0;
        this.setAngle();
    }

    setDir = () => {
        if (this.isStopped) {
            this.dirX = 0;
            this.dirY = 0;
        }
        else if (this.dir === LEFT) {
            this.dirX = -this.speed;
            this.dirY = 0;
        }
        else if (this.dir === RIGHT) {
            this.dirX = this.speed;
            this.dirY = 0;
        }
        else if (this.dir === UP) {
            this.dirX = 0;
            this.dirY = -this.speed;
        }
        else {
            this.dirX = 0;
            this.dirY = this.speed;
        }
    }

    resetPosition = (p5) => {
        this.x = Math.random() * p5.windowWidth;
        this.y = Math.random() * p5.windowHeight;
    }

    display = (p5) => {
        if (this.div.closed) {
            if(this.div.closed !== this.closed) {
                this.setPattern(p5);
                p5.image(this.buffer, this.div.x - 2, this.div.y - 2);
                console.log(this.closed, this.div.closed);
            }
        }
        else if (this.div.dragging) {
            this.setPattern(p5);
            p5.image(this.buffer, this.div.x - 2, this.div.y - 2);
            this.div.displayToolBar(0, 0);
        }
        else if (this.pattern && this.div.content && this.buffer) {
            this.setPattern(p5);
            if (this.mini && this.mini !== this.div.minimized) {
                p5.image(this.buffer, this.div.x - 2, this.div.y - 2);
                // this.div.display(this.angle + Math.PI / 2);
                this.div.displayToolBar(0, 0);
            }
            if (this.div.minimized) {
                p5.image(this.buffer, this.div.x - 2, this.div.y - 2);
                this.div.display(this.angle + Math.PI / 2);
                this.div.displayToolBar(0, 0);
            }
            else {
                p5.image(this.buffer, this.div.x - 2, this.div.y - 2);
                this.div.display(this.angle + Math.PI / 2);
                this.div.displayToolBar(0, 0);
            }

        }


        this.mini = this.div.minimized;
        this.closed = this.div.closed;
    }

    setPattern = (p5) => {
        if (this.mini) {
            this.buffer.clear();
            const iX = this.div.x % (this.pattern.width - this.buffer.width);
            const iY = this.div.y % (this.pattern.height - this.buffer.height);
            this.buffer.copy(this.pattern, iX, iY, this.buffer.width, 26 + 4, 0, 0, this.buffer.width, 26 + 4);
        }

        else {
            const iX = this.div.x % (this.pattern.width - this.buffer.width);
            const iY = this.div.y % (this.pattern.height - this.buffer.height);
            this.buffer.copy(this.pattern, iX, iY, this.buffer.width, this.buffer.height, 0, 0, this.buffer.width, this.buffer.height);

        }

    }

    vacuum = (p5) => {
        p5.erase();
        p5.rect(this.div.x, this.div.y, this.w, this.h + 26, this.div.bRad);
    }

    getTarget = () => {
        switch (this.dir) {
            case UP:
                return Math.PI * 3 / 2;
            case DOWN:
                return Math.PI / 2;
            case LEFT:
                return Math.PI;
            case RIGHT:
                return 0;
            default:
                return 0;
        }
    }

    setAngle = () => {
        const angAmt = .03;
        const dr = angAmt + .001;
        const target = this.getTarget();
        this.angle %= 2 * Math.PI;
        if (this.angle < 0) {
            this.angle += 2 * Math.PI;
        }

        if (this.isCloseToRange(target, this.angle, dr)) {
            this.setTarget(target);
        }
        else if (target === 0) {
            if (this.angle > 2 * Math.PI - dr || this.angle < dr) {
                this.setTarget(target);
            }
            else if (this.angle > Math.PI)
                this.angle += angAmt;
            else
                this.angle -= angAmt;
        }
        else if (target === Math.PI / 2) {
            if (this.angle > Math.PI / 2 && this.angle < 3 / 2 * Math.PI)
                this.angle -= angAmt;
            else
                this.angle += angAmt;
        }
        else if (target === Math.PI) {
            if (this.angle > Math.PI)
                this.angle -= angAmt;
            else
                this.angle += angAmt;
        }

        else if (target === 3 * Math.PI / 2) {
            if (this.angle > 3 * Math.PI / 2 || this.angle < Math.PI / 2)
                this.angle -= angAmt;
            else
                this.angle += angAmt;
        }
    }

    isCloseToRange = (target, start, dr) => {
        return Math.abs(start - target) < dr;
    }

    setTarget = (target) => {
        this.angle = target;
        this.isStopped = false;
    }

    checkMouse = () => {
        this.div.checkMouse();
    }

    endDrag = () => {
        this.div.endDrag();
    }
}
