import"./modulepreload-polyfill-B5Qt9EMX.js";import S from"https://esm.sh/p5@1.10.0";import b from"https://esm.sh/matter-js@0.19.0";const{Engine:C,Bodies:y,Composite:w,Constraint:p,Vector:E}=b,k=`
precision highp float;
uniform sampler2D tex0;
varying vec2 vTexCoord;
uniform vec2 texelSize;
uniform float kernelSize;
uniform vec2 direction;
const int MAX_KERNEL_SIZE = 100;
void main() {
  vec2 pos = vTexCoord;
  vec4 accumColor = vec4(0.0);
  float accumWeight = 0.0;
  for (int i = 0; i < MAX_KERNEL_SIZE; i++) {
    if (i >= int(kernelSize)) break;
    float offset = -0.5 * (kernelSize - 1.0) + float(i);
    float weight = exp( -(offset * offset) / (kernelSize * kernelSize) );
    accumColor += weight * texture2D(tex0, pos + direction * offset * texelSize);
    accumWeight += weight;
  }
  gl_FragColor = accumColor / accumWeight;
}`,z=`
precision highp float;
uniform sampler2D tex0;
varying vec2 vTexCoord;
void main() {
  vec4 color = texture2D(tex0, vTexCoord);
  if (color.r > 0.75) {
    color = vec4(0.0, 0.0, 1.0, 1.0);
  } else if (color.r > 0.6) {
    color = vec4(0.2, 0.2, 0.2, 1.0);
  } else if (color.r > 0.4) {
    color = vec4(0.1, 0.1, 0.1, 1.0);
  } else {
    color = vec4(0.0, 0.0, 0.0, 1.0);
  }
  gl_FragColor = color;
}`,g=400;new S(e=>{let l,a,h,r=[],u=[],n,v,i;e.preload=function(){l=e.loadImage("/netscapes/assets/central-coast/splishsplash/dolphin2.png")},e.setup=function(){e.createCanvas(e.windowWidth,e.windowHeight).parent("p5-sketch"),i=e.createGraphics(e.width/5,e.height/5),a=C.create(),a.positionIterations=4,a.velocityIterations=3,h=a.world;for(let o=0;o<3;o++)for(let t=0;t<o+1;t++){const s=(t+o)%2===0,c=e.width/2+t*300-o*150,m=o*250+150;u.push(new x(c,m,l.width*.5,l.height*.5,s))}for(let o=0;o<g;o++)r.push(new f(e.width/2-50+100*Math.random(),-150*Math.random(),7));n=i.createFilterShader(k),n.setUniform("kernelSize",10),v=i.createFilterShader(z)},e.windowResized=function(){e.resizeCanvas(e.windowWidth,e.windowHeight),i.resizeCanvas(e.windowWidth/5,e.windowHeight/5)},e.draw=function(){e.mouseIsPressed&&r.push(new f(e.mouseX,e.mouseY,6));for(let o=r.length-1;o>=0;o--)r[o].body.position.y>e.height&&(r[o].removeFromWorld(),r.splice(o,1));if(r.length<g){const o=g-r.length;for(let t=0;t<o;t++)r.push(new f(e.width/2-55*e.sin(e.frameCount/100)+10*Math.random(),-10*Math.random(),7))}C.update(a);const d=i.width/e.width;i.clear(),i.background(255),i.noStroke(),i.fill(0);for(const o of r)o.show(i,d);n.setUniform("direction",[1,0]),i.filter(n),n.setUniform("direction",[0,1]),i.filter(n),i.filter(v),e.image(i,0,0,e.width,e.height);for(const o of u)o.show()};class x{constructor(o,t,s,c,m){this.w=s,this.h=c,this.isFlipped=m,this.body=y.rectangle(o,t,s,c),w.add(h,[this.body,p.create({bodyA:this.body,pointB:E.clone(this.body.position),stiffness:1,length:0})])}show(){const{x:o,y:t}=this.body.position;e.push(),e.translate(o,t),e.rotate(this.body.angle),e.rectMode(e.CENTER),e.imageMode(e.CENTER),e.noStroke(),this.isFlipped?(e.push(),e.scale(-1,1),e.image(l,0,0,this.w,this.h),e.pop()):e.image(l,0,0,this.w,this.h),e.pop()}}class f{constructor(o,t,s){this.r=s,this.body=y.circle(o,t,s,{friction:0,restitution:.2}),w.add(h,this.body)}removeFromWorld(){w.remove(h,this.body)}show(o,t){const{x:s,y:c}=this.body.position;o.ellipse(s*t,c*t,this.r*2*t)}}});
