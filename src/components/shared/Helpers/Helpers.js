
export function getRandomNum(val) {
  var x = Math.sin(val) * 10000;
  return x - Math.floor(x);
}

// index 2 goes to top
// 3 , 2, 1, 0
//-> 2, 1, 3, 0
export function getNewZIndices(indexToTop, array) {
  let prevVal = array[indexToTop];
  let maxVal = 0;
  let newArr = [];
  for (let i = 0; i < array.length; i++) {
    if (array[i] > maxVal) maxVal = array[i];
    if (array[i] > prevVal) newArr[i] = array[i] - 1;
    else newArr[i] = array[i];
  }
  newArr[indexToTop] = maxVal;
  return newArr;
}

export function mapVal(val, in_min, in_max, out_min, out_max) {
  return (val - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

export function constrain(val, min, max) {
  if (val < min)
    return min;
  else if (val > max)
    return max;
  return val;
}

export function randomInRange(start, end) {
  let diff = end - start;
  return Math.random() * diff + start;
}

export function getRadians(degrees) {
  return degrees * Math.PI / 180;
}

function valueInRange(value, min, max) {
  return (value >= min) && (value <= max);
}

export function rectanglesOverlap(p1x, p1y, p1w, p1h, p2x, p2y, p2w, p2h) {

  const A = { x: p1x, y: p1y, width: p1w, height: p1h };
  const B = { x: p2x, y: p2y, width: p2w, height: p2h };

  let xOverlap = valueInRange(A.x, B.x, B.x + B.width) ||
    valueInRange(B.x, A.x, A.x + A.width);

  let yOverlap = valueInRange(A.y, B.y, B.y + B.height) ||
    valueInRange(B.y, A.y, A.y + A.height);

  return xOverlap && yOverlap;
}

// export function rectanglesOverlap(p1x, p1y, p1w, p1h, p2x, p2y, p2w, p2h) {
//   const l1 = { x: p1x, y: p1y };
//   const r1 = { x: l1.x + p1w, y: l1.y + p1h };
//   const l2 = { x: p2x, y: p2y };
//   const r2 = { x: l2.x + p2w, y: l2.y + p2h };
//   // To check if either rectangle is actually a line
//   // For example :  l1 ={-1,0}  r1={1,1}  l2={0,-1}
//   // r2={0,1}

//   if (l1.x == r1.x || l1.y == r1.y || l2.x == r2.x
//     || l2.y == r2.y) {
//     // the line cannot have positive overlap
//     return false;
//   }

//   // If one rectangle is on left side of other
//   if (l1.x >= r2.x || l2.x >= r1.x)
//     return false;

//   // If one rectangle is above other
//   if (r1.y >= l2.y || r2.y >= l1.y)
//     return false;

//   return true;

// }