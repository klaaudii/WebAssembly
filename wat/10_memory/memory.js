const fs = require('fs');
const bytes = fs.readFileSync(__dirname + '/memory.wasm');
( async () => {
    let obj = await WebAssembly.instantiate(new
   Uint8Array(bytes),);
    let pointer_value = obj.instance.exports.get_ptr();
    console.log(`pointer_value=${pointer_value}`);
})();
   