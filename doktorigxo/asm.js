function AsmModule (stdlib, foreign, heap){
    "use asm" ;

    var H32 = new stdlib.Int32Array(heap) ;
    var HU32 = new stdlib.Uint32Array(heap) ;

    var g_i = 0 ;   // int global
    var g_f = 0.0 ; // double global

    function g (){
        g_f = +(g_i|0)  // read/write globals
    }

    function g2 (){}

    var ftable_1 = [g, g2] ;

    function h (i, x){
        i = i|0 ;
        x = x|0 ;
        H32[i>>2] = x ;
        ftable_1[(x-2)&1] ()
    }
}


var heap = new ArrayBuffer (0x10000) // 64k heap

AsmModule (window, null, heap)

