import Part from './Part';

export default class Parts {
    constructor(numPart, p5) {
        this.maxArea = p5.width / 2;
        this.maxW = p5.width / 10;
        this.t = 3;
        this.maxL = this.maxArea;
        this.parts = [];
        let w = p5.max(p5.width / 300, this.maxW * p5.random() ** 12);
        let startX = -this.maxArea / 2;
        let startY = -this.maxArea / 2;
        let startZ = -this.maxArea / 2;
        let aryEndXYZ = this.randomDirection(startX, startY, startZ, p5);
        while (p5.abs(aryEndXYZ[0]) > this.maxArea || p5.abs(aryEndXYZ[1]) > this.maxArea || p5.abs(aryEndXYZ[2]) > this.maxArea) {
            aryEndXYZ = this.randomDirection(startX, startY, startZ, p5);
        }
        let endX = aryEndXYZ[0];
        let endY = aryEndXYZ[1];
        let endZ = aryEndXYZ[2];
        this.partCount = p5.int(p5.random(1000));
        this.parts.push(new Part(startX, startY, startZ, endX, endY, endZ, w, this.t, this.partCount, this.maxW, p5));
        this.numPart = numPart;
        this.isGenerate = false;
    }
    update(p5) {
        for (let i = 0; i < this.parts.length; i++) {
            this.parts[i].update(p5);
        }
        if (this.parts[this.parts.length - 1].currentTime >= this.parts[this.parts.length - 1].totalTime) {
            this.isGenerate = true;
        }

        if (this.isGenerate == true && this.parts.length < this.numPart) {
            let w = p5.max(p5.width / 300, this.maxW * p5.random() ** 12);
            let startX = this.parts[this.parts.length - 1].endX;
            let startY = this.parts[this.parts.length - 1].endY;
            let startZ = this.parts[this.parts.length - 1].endZ;
            let aryEndXYZ = this.randomDirection(startX, startY, startZ, p5);
            while (p5.abs(aryEndXYZ[0]) > this.maxArea || p5.abs(aryEndXYZ[1]) > this.maxArea || p5.abs(aryEndXYZ[2]) > this.maxArea) {
                aryEndXYZ = this.randomDirection(startX, startY, startZ, p5);
            }
            let endX = aryEndXYZ[0];
            let endY = aryEndXYZ[1];
            let endZ = aryEndXYZ[2];
            this.partCount++;
            this.parts.push(new Part(startX, startY, startZ, endX, endY, endZ, w, this.t, this.partCount, this.maxW, p5));
            this.isGenerate = false;
        }

        if (this.parts.length >= this.numPart) {
            this.parts[0].direction = false;
        }

        if (this.parts[0].erase == true) { this.parts.shift(); }
    }
    randomDirection(startX, startY, startZ, p5) {
        let endX = startX;
        let endY = startY;
        let endZ = startZ;
        let direction = p5.random(["-x", "x", "-y", "y", "-z", "z"]);
        switch (direction) {
            case "-x":
                endX = startX + this.maxL * p5.random(-1, 0);
                break;
            case "x":
                endX = startX + this.maxL * p5.random(0, 1);
                break;
            case "-y":
                endY = startY + this.maxL * p5.random(-1, 0);
                break;
            case "y":
                endY = startY + this.maxL * p5.random(0, 1);
                break;
            case "-z":
                endZ = startZ + this.maxL * p5.random(-1, 0);
                break;
            case "z":
                endZ = startZ + this.maxL * p5.random(0, 1);
                break;
        }
        return [endX, endY, endZ];
    }
}
