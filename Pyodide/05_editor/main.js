const output = document.getElementById("output");

//https://codemirror.net/5/doc/manual.html
const editor = CodeMirror.fromTextArea(
  document.getElementById("code"), {
    mode: {
      name: "python",
      version: 3,
    },
    theme: "dracula",
    lineNumbers: true,
    indentUnit: 4,
  }
);
editor.setValue("print('Hello world')");

function addToOutput(str) {
  output.value += ">>> " + "\n" + str + "\n";
}

function clearHistory() {
  output.value = "";
}

async function main() {
  let pyodide = await loadPyodide({
    indexURL: "https://cdn.jsdelivr.net/pyodide/v0.20.0/full/",
  });
    pyodide.runPython(`
     import sys
     sys.version
       `);
  output.value += "Python Ready!" + "\n";
  return pyodide;
}

let pyodideReadyPromise = main();

// let str = pyodide.runPython(editor.getValue()); toto dava undefined
// ak mame print("."), vypise sa to do konzoly
//preto to potrebujeme ulozit vystup do "suboru"
// a nasledne pomocou StringIO.getvalue(): This function returns the entire content of the file.

async function evaluateCode() {
  let pyodide = await pyodideReadyPromise;
  try {
    pyodide.runPython(`
      import io
      sys.stdout = io.StringIO()
    `);
    pyodide.runPython(editor.getValue());
    let str = pyodide.runPython("sys.stdout.getvalue()");
    addToOutput(str);
  } catch (err) {
    addToOutput(err);
  }
}