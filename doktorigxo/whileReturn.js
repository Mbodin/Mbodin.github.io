
console.log (eval ("out: while (true){ while (true){ break out }}")) ;
    // Prints “undefined”.

console.log (eval ("out: while (true){ while (true){ 'in' ; break out }}")) ;
    // Prints “in”.

console.log (eval ("out: while (true){ 'middle' ; while (true){ 'in' ; break out }}")) ;
    // Prints “in”.

console.log (eval ("out: while (true){ 'middle' ; while (true){ break out }}")) ;
    // Prints “middle”.

console.log (eval ("out: while (true){ 'middle' ; while (true){ undefined ; break out } }"))
    // Prints “undefined”.

