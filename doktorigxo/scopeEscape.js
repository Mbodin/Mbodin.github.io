
var x = "out" ;

function f(x){
    with ({ x : "with" }){
        do console.log (x)
        while (delete x)
    }
}

f ("argument")  // prints "with", then "argument"

