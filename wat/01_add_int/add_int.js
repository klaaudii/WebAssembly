// Node.js can read the WebAssembly file directly from the hard drive
// where the application is running using the built-in module called fs that
// reads files from local storage.

const fs = require ('fs');
const bytes = fs.readFileSync (__dirname + '/add_int.wasm');
const value_1 = parseInt (process.argv[2]);
const value_2 = parseInt (process.argv[3]);

(async () => {
const obj = await WebAssembly.instantiate (
 new Uint8Array (bytes));
let add_value = obj.instance.exports.AddInt( value_1,
value_2 );
console.log(`${value_1} + ${value_2} = ${add_value}`);
})();

// using .then
// WebAssembly.instantiate (new Uint8Array (bytes))
// then (obj => {
//  let add_value = obj.instance.exports.AddInt(value_1,
// value_2);
//  console.log(`${value_1} + ${value_2} = ${add_value}`);
//  });


// command to execute using node.js: node add_int.js 7 9