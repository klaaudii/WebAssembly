;; in WebAssembly all code is organized into modules. A WebAssembly module is 
;; a self-contained unit of code that defines its own functions, data, and memory.
(module
  (import "env" "print" (func $print (param i32)))

  (func $start
    (i32.const 8)   ;; Push the value 2 onto the stack
    (i32.const 3)   ;; Push the value 3 onto the stack
    (i32.add)       ;; Pop the top two values and push their sum onto the stack
    (call $print)   ;; Call the "print" function with the top value on the stack
  )

   (start $start)   ;; the "start" section is used to specify a function that should 
                    ;; be automatically executed when the module is instantiated. 
)