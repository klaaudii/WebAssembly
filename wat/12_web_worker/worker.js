let moduleExports
function loadWasmModule() {
    fetch('./web_worker.wasm')
    .then(response => response.arrayBuffer())
    .then(bytes => WebAssembly.instantiate(bytes))
    .then(module => {
      moduleExports = module.instance.exports;
      self.postMessage({type: "wasmLoaded"})
      console.log("Wasm module loaded")
    });
}

function addInt(a, b){
    self.postMessage({type: "addIntResult", result: moduleExports.addInt(a, b)})
}

self.onmessage = function(message){
    if (message.data.type === 'loadWasm'){
        loadWasmModule();        
    } else if (message.data.type === 'addInt'){
        addInt(message.data.a, message.data.b)
    }
}
