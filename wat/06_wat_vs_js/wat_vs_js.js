function sum(){
let sum = 0;
for (let i = 1; i <= 10_000; i++) {
  sum += i;
}
console.log(sum);
}

//js version
let start = performance.now();
sum();
let end = performance.now();
console.log("JavaScript sum time:", end - start, "ms");

// WAT version
const fs = require('fs');
const bytes = fs.readFileSync(__dirname + '/wat.wasm');
( async() => {
    let start = performance.now();
    let obj = await WebAssembly.instantiate( new
   Uint8Array(bytes),);
//    let start = performance.now();
    sum = obj.instance.exports.sum;
    console.log(sum());
    let end = performance.now();
    console.log("Wat sum time:", end - start, "ms");
})();


