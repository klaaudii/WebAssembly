const fs = require ('fs');
const bytes = fs.readFileSync (__dirname + '/stack_vs_sExpression.wasm');

(async () => {
const obj = await WebAssembly.instantiate (
 new Uint8Array (bytes));
let result = obj.instance.exports.main();
console.log(`${result}`);
})();