
var f = function (a){
    this.x = a
}

f.prototype = {y : 1} ;

var o = new f (42)

