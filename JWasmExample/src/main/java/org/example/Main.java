package org.example;

import de.inetsoftware.jwebassembly.api.annotation.Export;
import de.inetsoftware.jwebassembly.api.annotation.Partial;
import de.inetsoftware.jwebassembly.api.annotation.Replace;
import de.inetsoftware.jwebassembly.web.dom.Document;
import de.inetsoftware.jwebassembly.web.dom.HTMLElement;
import de.inetsoftware.jwebassembly.web.dom.Text;
import de.inetsoftware.jwebassembly.web.dom.Window;

public class Main {

    public static void main(String[] args) {
        Document document = Window.document();
        HTMLElement div = document.createElement("div");
        Text text = document.createTextNode("Hello World, this text come from WebAssembly.");
        div.appendChild( text );
        document.body().appendChild( div );
    }



//    @Export
//    public static int sum(int a, int b){
//        Document document = Window.document();
//        HTMLElement div = document.createElement("div");
//        Text text = document.createTextNode("Hello World, this text come from WebAssembly.");
//        div.appendChild( text );
//        document.body().appendChild( div );
//        return a + b;
//    }

    @Export
    public static int factorial(int n) {
        if (n == 0) {
            return 1;
        } else {
            return n * factorial(n-1);
        }
    }
}