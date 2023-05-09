;; Every WAT app must be a module

(module
    ;; expect the import object env from our embedding environment
    ;; within that object we’re expecting the function print_string.
    ;; we call this function $print_string, so we can access it from out code
    ;; param i32 represents the length of our string
    (import "env" "print_string" (func $print_string( param i32)))
    ;; import of memory buffer from object env, we call it buffer
    ;; memory 1 = single page (smallest chunk of memory we can allocate - 64KB)
    (import "env" "buffer" (memory 1))
    ;; global variables
    ;; start_string - starting memory location of the string
    ;; string_len - constant, length of the string
    (global $start_string (import "env" "start_string") i32) 
    (global $string_len i32 (i32.const 12))
    ;; define the string in linear memory using a data expression
    ;; we pass the location in memory where the module will write the data and the data string hello world!
    (data (global.get $start_string) "hello world!")
    ;; define and export our function
    (func (export "helloworld")
        ;; we call the imported print_string function 
        ;; with the lenght of the string we defined as a global  
        (call $print_string (global.get $string_len))
    )
)