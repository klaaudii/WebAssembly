function findMax(array) {
    let max = array[0];
    for (let i = 1; i < array.length; i++) {
      if (array[i] > max) {
        max = array[i];
      }
    }
    return max;
}

let array = [10, 5, 20, 15, 30, 25];

// js version
let start = performance.now();
let max = findMax(array);
let end = performance.now();
console.log("JavaScript max:", max, "time:", end - start, "ms");

// WAT version
const fs = require('fs');
const bytes = fs.readFileSync(__dirname + '/wat.wasm');
( async() => {
    let start = performance.now();
    let obj = await WebAssembly.instantiate( new
   Uint8Array(bytes),);
//    let start = performance.now();
    findMax = obj.instance.exports.findMax;
    console.log(findMax());
    let end = performance.now();
    console.log("Wat sum time:", end - start, "ms");
})();