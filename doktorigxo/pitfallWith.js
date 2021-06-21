
var o = { a : 42 } ;
with (o) {
    f = function (){ return a }
} ;
f ()

