#include <stdio.h>

int main()
{
    printf("Hello world from C!\n");

    return 0;
}

// emsdk activate
// emcc hello_world.c -o hello_world.js (vygeneruje wasm file and js glue file)