const fs = require('fs');
const bytes = fs.readFileSync(__dirname + '/hello_world.wasm');

// function will be set later and will point to the exported helloworld function
let hello_world = null; 
// starting location of string in the linear memory
// we can choose any address as long as none of the memory you’re using extends past the 64KB limit.
let start_string_index = 100; 
// webassembly memory object, 1 = we want allocate one page
let memory = new WebAssembly.Memory ({ initial: 1 }); 


let importObject = {
    // environment object
    // If there is any function or value from the embedding environment 
    // you want to make available to the WebAssembly module, pass them in here.
    env : {
        buffer : memory,
        start_string: start_string_index,
        // This function retrieves the length of the string in our memory buffer 
        // and uses it in combination with our starting string index to create a string object.
        print_string: function (str_len) {
            const bytes = new Uint8Array (memory.buffer,
            start_string_index, str_len);
            const log_string = new TextDecoder('utf8').decode(bytes);
            console.log (log_string);
        }
    }
};


( async () => {
    let obj = await WebAssembly.instantiate(new Uint8Array (bytes), importObject);
    // We then pull the helloworld function out of obj.instance.exports using the destructuring
    // syntax to set the hello_world variable to the obj.instance.exports function
    ({helloworld: hello_world} = obj.instance.exports);
    hello_world();
})();
   