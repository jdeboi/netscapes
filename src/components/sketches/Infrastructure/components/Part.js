
export default class Part {
    constructor(startX, startY, startZ, endX, endY, endZ, w, totalTime, partCount, maxW, p5) {
        this.startX = startX;
        this.startY = startY;
        this.startZ = startZ;
        this.endX = endX;
        this.endY = endY;
        this.endZ = endZ;
        this.w = w;
        this.totalTime = totalTime;
        this.currentTime = 0;
        this.direction = true; //true -> extend, false -> shrink
        this.erase = false;
        // let c = p5.random(100, 255)
        // this.col = p5.color(0, p5.random(0, b - 50), b);

        let r = p5.random();

        if (r < .33)
            this.col = p5.color(255, 0, 0);
        else if (r < .66)
            this.col = p5.color(0, 255, 0);
        else
            this.col = p5.color(0, 0, 255);


        if (r < .5)
            this.img = p5.loadImage(window.AWS + "/infrastructure/server2.jpeg");
        else
            this.img = p5.loadImage(window.AWS + "/infrastructure/server.jpeg");

    }

    update(p5) {
        let currentX;
        let currentY;
        let currentZ;
        if (this.direction == true) { //extend
            let ratio = (this.currentTime / this.totalTime) ** 0.5;
            currentX = this.startX + (this.endX - this.startX) * ratio;
            currentY = this.startY + (this.endY - this.startY) * ratio;
            currentZ = this.startZ + (this.endZ - this.startZ) * ratio;
            if (this.currentTime < this.totalTime) { this.currentTime++; }
            this.drawPart(this.startX, this.startY, this.startZ, currentX, currentY, currentZ, this.w, this.col, p5);
        } else { //shrink
            let ratio = (1 - (this.currentTime - this.totalTime) / this.totalTime) ** 0.5;
            currentX = this.endX + (this.startX - this.endX) * ratio;
            currentY = this.endY + (this.startY - this.endY) * ratio;
            currentZ = this.endZ + (this.startZ - this.endZ) * ratio;
            this.currentTime++;
            if (this.currentTime > this.totalTime * 2) { this.erase = true; }
            this.drawPart(this.endX, this.endY, this.endZ, currentX, currentY, currentZ, this.w, this.col, p5);
        }
    }

    drawPart(startX, startY, startZ, endX, endY, endZ, w, col, p5) {
        let angAxisZ = p5.atan2(endY - startY, endX - startX);
        let distXY = p5.dist(startX, startY, endX, endY);
        let angAxisY = -p5.atan2(endZ - startZ, distXY);
        let distXYZ = p5.dist(0, startZ, distXY, endZ);
        p5.push();
        p5.translate(startX, startY, startZ);
        p5.rotateZ(angAxisZ);
        p5.rotateY(angAxisY);
        p5.translate(distXYZ / 2, 0, 0);
        p5.ambientMaterial(col);
        if (w > 10) {
            p5.texture(this.img);

        }



        // let dx = p5.abs(endX - startX);
        // if (w > 10 && dx > 1 && dx < 100)
        //     p5.sphere(w);
        else {


        }

        p5.box(distXYZ + w, w, w); //length + w
        this.drawText(distXYZ + w, p5)
        p5.pop();
    }

    drawText(w, p5) {
        // let txt = "";
        let txtSz = 32;
        let maxLen = 60;
        let txt = "$$$$$$ bit by bit $$$$$$ bit by bit $$$$$$ bit by bit $$$$$$ bit by bit $$$$$$ bit by bit $$$$$$ bit by bit $$$$$$ bit by bit $$$$$$ bit by bit $$$$$$ bit by bit $$$$$$ bit by bit $$$$$$ bit by bit $$$$$$ bit by bit $$$$$$ bit by bit $$$$$$ bit by bit $$$$$$ bit by bit $$$$$$ bit by bit $$$$$$ bit by bit $$$$$$ bit by bit $$$$$$ bit by bit $$$$$$ bit by bit $$$$$$ ";
        // txt = txt.substring(0, 80);

        // let index = p5.floor(w / txtSz);
        // index = p5.constrain(index, 1, txt.length);
        // txt = txt.substring(0, index);


        
        // let per = p5.sin(p5.millis() / 1000);
        // let txtLen = p5.map(per, -1, 1, 10, txt.length);
        // txt = txt.substring(0, txtLen);

        let per = p5.sin(p5.millis() / 1000);
        let start = p5.map(per, -1, 1, 0, maxLen);
        txt = txt.substring(start, start+maxLen);
        

        p5.textSize(txtSz);
        p5.stroke(this.col);
        p5.fill(this.col);
        p5.text(txt, -p5.textWidth(txt) / 2, 0);



        p5.noStroke();
    }
}