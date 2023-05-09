(async () => {
    const fs = require('fs');
    const bytes = fs.readFileSync(__dirname + '/start_function.wasm');
    const module = await WebAssembly.instantiate(bytes, {
      env: {
        print: (value) => {
          console.log(value);
        },
      },
    });
  })();