
counter = 0 ;

console.log (+[18]) ;   // Prints 18.

Array.prototype.toString = function (){
    counter++;          // Performs a side-effect.
    return 42
} ;

console.log (counter) ;  // Prints 0.
console.log (+[18]) ;    // Prints 42.
console.log (counter)    // Prints 1.

