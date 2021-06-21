
/* --------------------- stdlib_ml/stdlib.js --------------------- */

function record_with(einit, lbl, exp) {
  var res = {};
  for (var i in einit) {
    res[i] = einit[i];
  }
  res[lbl] = exp;
  return res;
}

//----------------------------------------------------------------------------

var None = function() {
   return { /*type: "option",*/ tag: "None" };
};

var Some = function(value) {
   return { /*type: "option",*/ tag: "Some", value: value };
};

//----------------------------------------------------------------------------

var mk_nil = function() {
   return { /*type: "list",*/ tag: "[]" };
};

var mk_cons = function(head, tail) {
   return { /*type: "list",*/ tag: "::", head: head, tail: tail };
};

//----------------------------------------------------------------------------

// var print = function (x) { console.log(x) }

// var stuck = function (msg) { throw {type:'stuck', msg:msg} }

// var to_string = function (x) { return String(x) }

//----------------------------------------------------------------------------

/* automatically dealt with js_of_ast.ml

val ( + ) : int -> int -> int
val ( - ) : int -> int -> int
val ( * ) : int -> int -> int
val ( / ) : int -> int -> int
val ( +. ) : float -> float -> float
val ( -. ) : float -> float -> float
val ( *. ) : float -> float -> float
val ( /. ) : float -> float -> float
val ( = ) : float -> float -> bool
val ( < ) : float -> float -> bool
val ( > ) : float -> float -> bool
val ( <= ) : float -> float -> bool 
val ( >= ) : float -> float -> bool
*/

//----------------------------------------------------------------------------

var nat_eq = function(x, y) { return x === y; };
var int_eq = function(x, y) { return x === y; };
var int_lt = function(x, y) { return x < y; };
var int_gt = function(x, y) { return x > y; };
var int_le = function(x, y) { return x <= y; };
var int_ge = function(x, y) { return x >= y; };
var int_compare = function(x, y) { return x - y; };

//----------------------------------------------------------------------------

var int_of_number = function(x) { return x; };
var number_of_int = function(x) { return x; };

//----------------------------------------------------------------------------

var bool_eq = function(x, y) { return x === y; };

var not = function(x) { return !x; };


//----------------------------------------------------------------------------

var string_eq = function(x, y)  { 
  if (typeof(x) != "string" || typeof(y) != "string")
    throw "string_eq invalid arguments";
  return x === y; 
};

var string_compare = function(x, y) {
  return x.localeCompare(y);
};

var strappend = function(x, y) { 
  if (typeof(x) != "string" || typeof(y) != "string")
    throw "strappend invalid arguments";
  return x + y; 
};

var strlength = function(x) { 
  if (typeof(x) != "string")
    throw "strlength invalid arguments";
  return x.length;
};

var substring = function(n, m, s) { 
  if (typeof(s) != "string")
    throw "strlength invalid arguments";
  return s.slice(n, n+m); 
};


//----------------------------------------------------------------------------

/*
(* We use this to compare types that are not known by stdlib, like Native_error;
  should be implemented in JS by comparing the objects, to see if they have the same
  "tag" fields (there should be no other fields, except perhaps "type") *)
val ( === ) : 'a -> 'a -> bool  (* becomes === in js *)

*/

//----------------------------------------------------------------------------


var __LOC__ = "___LOC___"

var raise = function(x) { throw "Not_found"; };





/* --------------------- tests/jsref/BinNums.unlog.js --------------------- */

var BinNums = (function() {



return {};
})();

/* --------------------- tests/jsref/Bool0.unlog.js --------------------- */

var Bool0 = (function() {

var eqb = function (b1, b2) {
  if (b1) {
    if (b2) {
      return (true);
    } else {
      return (false);
    }
  } else {
    if (b2) {
      return (false);
    } else {
      return (true);
    }
  }
};

return {
  eqb: eqb};
})();

/* --------------------- tests/jsref/List0.unlog.js --------------------- */

var List0 = (function() {

var hd = function (d, l) {
  switch (l.tag) {
    case "[]":
      return (d);
    case "::":
      var x = l.head, l0 = l.tail;
      return (x);
  }
  
};

var tl = function (l) {
  switch (l.tag) {
    case "[]":
      return (mk_nil());
    case "::":
      var a = l.head, m = l.tail;
      return (m);
  }
  
};

var map = function (f, l) {
  switch (l.tag) {
    case "[]":
      return (mk_nil());
    case "::":
      var a = l.head, t = l.tail;
      return (mk_cons(f(a), map(f, t)));
  }
  
};

return {
  hd: hd, 
  tl: tl, 
  map: map};
})();

/* --------------------- tests/jsref/Datatypes.unlog.js --------------------- */

var Datatypes = (function() {

var fst = function (p) {
  var x = p[0], y = p[1];
  return (x);
};

var snd = function (p) {
  var x = p[0], y = p[1];
  return (y);
};

function Eq() { return {tag: "Eq" }; }

function Lt() { return {tag: "Lt" }; }

function Gt() { return {tag: "Gt" }; }

return {
  fst: fst, 
  snd: snd, 
  Eq: Eq, 
  Lt: Lt, 
  Gt: Gt};
})();

/* --------------------- tests/jsref/Fappli_IEEE_bits.unlog.js --------------------- */

var Fappli_IEEE_bits = (function() {



return {};
})();

/* --------------------- tests/jsref/Fappli_IEEE.unlog.js --------------------- */

var Fappli_IEEE = (function() {



return {};
})();

/* --------------------- tests/jsref/LibList.unlog.js --------------------- */

var LibList = (function() {

var list_eq_nil_decidable = function (l) {
  switch (l.tag) {
    case "[]":
      return (true);
    case "::":
      var a = l.head, l0 = l.tail;
      return (false);
  }
  
};

var fold_right = function (f, acc, l) {
  switch (l.tag) {
    case "[]":
      return (acc);
    case "::":
      var x = l.head, l$ = l.tail;
      return (f(x, fold_right(f, acc, l$)));
  }
  
};

var fold_left = function (f, acc, l) {
  switch (l.tag) {
    case "[]":
      return (acc);
    case "::":
      var x = l.head, l$ = l.tail;
      return (fold_left(f, f(x, acc), l$));
  }
  
};

var map = function (f, l) {
  return (
    fold_right(function (x, acc) { return (mk_cons(f(x), acc));}, mk_nil(),
      l));
};

var filter = function (f, l) {
  return (
    fold_right(function (x, acc) {
        if (f(x)) {
          return (mk_cons(x, acc));
        } else {
          return (acc);
        }}, mk_nil(), l));
};

var append = function (l1, l2) {
  return (
    fold_right(function (x, acc) { return (mk_cons(x, acc));}, l2, l1));
};

var concat = function (l) {
  return (fold_right(append, mk_nil(), l));
};

var rev = function (l) {
  return (
    fold_left(function (x, acc) { return (mk_cons(x, acc));}, mk_nil(), l));
};

var length = function (l) {
  return (fold_right(function (x, acc) { return ((1 + acc));}, 0, l));
};

var take_drop_last = function (l) {
  switch (l.tag) {
    case "[]":
      return (raise(Not_found()));
    case "::":
      var x = l.head, l$ = l.tail;
      switch (l$.tag) {
        case "[]":
          return ([mk_nil(), x]);
        case "::":
          var a = l$.head, l1 = l$.tail;
          var _tuple_arg_1 = take_drop_last(l$);
          var t = _tuple_arg_1[0], y = _tuple_arg_1[1];
          return ([mk_cons(x, t), y]);
      }
      
  }
  
};

var nth_def = function (d, n, l) {
  switch (l.tag) {
    case "[]":
      return (d);
    case "::":
      var x = l.head, l$ = l.tail;
      if (int_eq(n, 0)) {
        return (x);
      } else {
        return (nth_def(d, (n - 1), l$));
      }
  }
  
};

var mem_decide = function (h, x, l) {
  switch (l.tag) {
    case "[]":
      return (false);
    case "::":
      var y = l.head, l$ = l.tail;
      if (h(x, y)) {
        return (true);
      } else {
        return (mem_decide(h, x, l$));
      }
  }
  
};

return {
  list_eq_nil_decidable: list_eq_nil_decidable, 
  fold_right: fold_right, 
  fold_left: fold_left, 
  map: map, 
  filter: filter, 
  append: append, 
  concat: concat, 
  rev: rev, 
  length: length, 
  take_drop_last: take_drop_last, 
  nth_def: nth_def, 
  mem_decide: mem_decide};
})();

/* --------------------- tests/jsref/LibOption.unlog.js --------------------- */

var LibOption = (function() {

var option_compare = function (h, o1, o2) {
  switch (o1.tag) {
    case "Some":
      var v1 = o1.value;
      switch (o2.tag) {
        case "Some":
          var v2 = o2.value;
          return (h(v1, v2));
        case "None":
          return (false);
      }
      
    case "None":
      switch (o2.tag) {
        case "Some":
          var a = o2.value;
          return (false);
        case "None":
          return (true);
      }
      
  }
  
};

var unsome_default = function (d, o) {
  switch (o.tag) {
    case "Some":
      var x = o.value;
      return (x);
    case "None":
      return (d);
  }
  
};

var map = function (f, o) {
  switch (o.tag) {
    case "Some":
      var x = o.value;
      return (Some(f(x)));
    case "None":
      return (None());
  }
  
};

return {
  option_compare: option_compare, 
  unsome_default: unsome_default, 
  map: map};
})();

/* --------------------- tests/jsref/LibProd.unlog.js --------------------- */

var LibProd = (function() {

var prod_compare = function (h, h0, x, y) {
  var x1 = x[0], x2 = x[1];
  var y1 = y[0], y2 = y[1];
  return ((h(x1, y1) && h0(x2, y2)));
};

return {
  prod_compare: prod_compare};
})();

/* --------------------- tests/jsref/StdMap.unlog.js --------------------- */

var StdMap = (function() {

function Empty() { return {tag: "Empty" }; }

function Node(l, x, d, r, h) { return {tag: "Node", l: l, x: x, d: d, r: r, h: h}; }

var height = function (_fun_arg_) {
  switch (_fun_arg_.tag) {
    case "Empty":
      return (0);
    case "Node":
      var l = _fun_arg_.l, x = _fun_arg_.x, d = _fun_arg_.d, r = _fun_arg_.r,
        h = _fun_arg_.h;
      return (h);
  }
  
};

var create = function (l, x, d, r) {
  var hl = height(l);
var hr = height(r);
  return (
    Node(l, x, d, r, (function () {
        if (int_ge(hl, hr)) {
          return ((hl + 1));
        } else {
          return ((hr + 1));
        }}())));
};

var singleton = function (x, d) {
  return (Node(Empty(), x, d, Empty(), 1));
};

var bal = function (l, x, d, r) {
  switch (l.tag) {
    case "Empty":
      var hl = 0;
      break;
    case "Node":
      var h = l.h;
      var hl = h;
      break;
  }
  
  switch (r.tag) {
    case "Empty":
      var hr = 0;
      break;
    case "Node":
      var h = r.h;
      var hr = h;
      break;
  }
  
  if (int_gt(hl, (hr + 2))) {
    switch (l.tag) {
      case "Empty":
        throw false;
      case "Node":
        var ll = l.l, lv = l.x, ld = l.d, lr = l.r;
        if (int_ge(height(ll), height(lr))) {
          return (create(ll, lv, ld, create(lr, x, d, r)));
        } else {
          switch (lr.tag) {
            case "Empty":
              throw false;
            case "Node":
              var lrl = lr.l, lrv = lr.x, lrd = lr.d, lrr = lr.r;
              return (
                create(create(ll, lv, ld, lrl), lrv, lrd,
                  create(lrr, x, d, r)));
          }
          
        }
    }
    
  } else {
    if (int_gt(hr, (hl + 2))) {
      switch (r.tag) {
        case "Empty":
          throw false;
        case "Node":
          var rl = r.l, rv = r.x, rd = r.d, rr = r.r;
          if (int_ge(height(rr), height(rl))) {
            return (create(create(l, x, d, rl), rv, rd, rr));
          } else {
            switch (rl.tag) {
              case "Empty":
                throw false;
              case "Node":
                var rll = rl.l, rlv = rl.x, rld = rl.d, rlr = rl.r;
                return (
                  create(create(l, x, d, rll), rlv, rld,
                    create(rlr, rv, rd, rr)));
            }
            
          }
      }
      
    } else {
      return (
        Node(l, x, d, r, (function () {
            if (int_ge(hl, hr)) {
              return ((hl + 1));
            } else {
              return ((hr + 1));
            }}())));
    }
  }
};

var empty = Empty();

var is_empty = function (s) {
  switch (s.tag) {
    case "Empty":
      return (true);
    default:
      return (false);
  }
  
};

var add = function (compare, x, data, s) {
  switch (s.tag) {
    case "Empty":
      return (Node(Empty(), x, data, Empty(), 1));
    case "Node":
      var l = s.l, v = s.x, d = s.d, r = s.r, h = s.h;
      var c = compare(x, v);
      if (int_eq(c, 0)) {
        return (Node(l, x, data, r, h));
      } else {
        if (int_lt(c, 0)) {
          return (bal(add(compare, x, data, l), v, d, r));
        } else {
          return (bal(l, v, d, add(compare, x, data, r)));
        }
      }
  }
  
};

var find = function (compare, x, s) {
  switch (s.tag) {
    case "Empty":
      throw false;
    case "Node":
      var l = s.l, v = s.x, d = s.d, r = s.r;
      var c = compare(x, v);
      if (int_eq(c, 0)) {
        return (d);
      } else {
        return (
          find(compare, x, (function () {
              if (int_lt(c, 0)) {
                return (l);
              } else {
                return (r);
              }}())));
      }
  }
  
};

var find_option = function (compare, x, s) {
  switch (s.tag) {
    case "Empty":
      return (None());
    case "Node":
      var l = s.l, v = s.x, d = s.d, r = s.r;
      var c = compare(x, v);
      if (int_eq(c, 0)) {
        return (Some(d));
      } else {
        return (
          find_option(compare, x, (function () {
              if (int_lt(c, 0)) {
                return (l);
              } else {
                return (r);
              }}())));
      }
  }
  
};

var mem = function (compare, x, s) {
  switch (s.tag) {
    case "Empty":
      return (false);
    case "Node":
      var l = s.l, v = s.x, d = s.d, r = s.r;
      var c = compare(x, v);
      return (
        (int_eq(c, 0)
        || mem(compare, x, (function () {
               if (int_lt(c, 0)) {
                 return (l);
               } else {
                 return (r);
               }}()))));
  }
  
};

var min_binding = function (s) {
  switch (s.tag) {
    case "Empty":
      return (raise(Not_found()));
    case "Node":
      var l = s.l, x = s.x, d = s.d, r = s.r;
      switch (l.tag) {
        case "Empty":
          return ([x, d]);
        default:
          return (min_binding(l));
      }
      
  }
  
};

var remove_min_binding = function (s) {
  switch (s.tag) {
    case "Empty":
      throw false;
    case "Node":
      var l = s.l, x = s.x, d = s.d, r = s.r;
      switch (l.tag) {
        case "Empty":
          return (r);
        default:
          return (bal(remove_min_binding(l), x, d, r));
      }
      
  }
  
};

var merge = function (t1, t2) {
  switch (t1.tag) {
    case "Empty":
      return (t2);
    default:
      switch (t2.tag) {
        case "Empty":
          return (t1);
        default:
          var _tuple_arg_1 = min_binding(t2);
          var x = _tuple_arg_1[0], d = _tuple_arg_1[1];
          return (bal(t1, x, d, remove_min_binding(t2)));
      }
      
  }
  
};

var remove = function (compare, x, s) {
  switch (s.tag) {
    case "Empty":
      return (Empty());
    case "Node":
      var l = s.l, v = s.x, d = s.d, r = s.r, h = s.h;
      var c = compare(x, v);
      if (int_eq(c, 0)) {
        return (merge(l, r));
      } else {
        if (int_lt(c, 0)) {
          return (bal(remove(compare, x, l), v, d, r));
        } else {
          return (bal(l, v, d, remove(compare, x, r)));
        }
      }
  }
  
};

var fold = function (f, m, accu) {
  switch (m.tag) {
    case "Empty":
      return (accu);
    case "Node":
      var l = m.l, v = m.x, d = m.d, r = m.r;
      return (fold(f, r, f(v, d, fold(f, l, accu))));
  }
  
};

return {
  Empty: Empty, 
  Node: Node, 
  height: height, 
  create: create, 
  singleton: singleton, 
  bal: bal, 
  empty: empty, 
  is_empty: is_empty, 
  add: add, 
  find: find, 
  find_option: find_option, 
  mem: mem, 
  min_binding: min_binding, 
  remove_min_binding: remove_min_binding, 
  merge: merge, 
  remove: remove, 
  fold: fold};
})();

/* --------------------- tests/jsref/Heap.unlog.js --------------------- */

var Heap = (function() {
with (Datatypes) {

var empty = StdMap.empty;

var read = function (h, l, k) {
  return (StdMap.find(h, k, l));
};

var write = function (h, l, k, v) {
  return (StdMap.add(h, k, v, l));
};

var rem = function (h, l, k) {
  return (StdMap.remove(h, k, l));
};

var read_option = function (h, l, k) {
  return (StdMap.find_option(h, k, l));
};

var indom_dec = function (h, l, k) {
  return (StdMap.mem(h, k, l));
};

var to_list = function (h, l) {
  return (
    StdMap.fold(function (k, v, acc) { return (mk_cons([k, v], acc));}, l,
      mk_nil()));
};
}// end of with Datatypes

return {
  empty: empty, 
  read: read, 
  write: write, 
  rem: rem, 
  read_option: read_option, 
  indom_dec: indom_dec, 
  to_list: to_list};
})();

/* --------------------- tests/jsref/HeapInt.unlog.js --------------------- */

var HeapInt = (function() {

var empty = Heap.empty;

var read = function (l, k) {
  return (Heap.read(int_compare, l, k));
};

var write = function (l, k, v) {
  return (Heap.write(int_compare, l, k, v));
};

var rem = function (l, k) {
  return (Heap.rem(int_compare, l, k));
};

var read_option = function (l, k) {
  return (Heap.read_option(int_compare, l, k));
};

var indom_dec = function (l, k) {
  return (Heap.indom_dec(int_compare, l, k));
};

var to_list = function (l) {
  return (Heap.to_list(int_compare, l));
};

return {
  empty: empty, 
  read: read, 
  write: write, 
  rem: rem, 
  read_option: read_option, 
  indom_dec: indom_dec, 
  to_list: to_list};
})();

/* --------------------- tests/jsref/HeapStr.unlog.js --------------------- */

var HeapStr = (function() {

var empty = Heap.empty;

var read = function (l, k) {
  return (Heap.read(string_compare, l, k));
};

var write = function (l, k, v) {
  return (Heap.write(string_compare, l, k, v));
};

var rem = function (l, k) {
  return (Heap.rem(string_compare, l, k));
};

var read_option = function (l, k) {
  return (Heap.read_option(string_compare, l, k));
};

var indom_dec = function (l, k) {
  return (Heap.indom_dec(string_compare, l, k));
};

var to_list = function (l) {
  return (Heap.to_list(string_compare, l));
};

return {
  empty: empty, 
  read: read, 
  write: write, 
  rem: rem, 
  read_option: read_option, 
  indom_dec: indom_dec, 
  to_list: to_list};
})();

/* --------------------- tests/jsref/HeapList.unlog.js --------------------- */

var HeapList = (function() {
with (Datatypes) {
with (LibList) {

var empty = mk_nil();

var read = function (h, l, k) {
  switch (l.tag) {
    case "[]":
      return (raise(Not_found()));
    case "::":
      var p = l.head, l$ = l.tail;
      var x = p[0], v = p[1];
      if (int_eq(h(x, k), 0)) {
        return (v);
      } else {
        return (read(h, l$, k));
      }
  }
  
};

var write = function (h, l, k, v) {
  return (mk_cons([k, v], l));
};

var rem = function (h1, l, k) {
  return (
    filter(function (p) {
        if (int_eq(h1(fst(p), k), 0)) {
          return (false);
        } else {
          return (true);
        }}, l));
};

var read_option = function (h, l, k) {
  var read_option0 = function (l, k) {
    switch (l.tag) {
      case "[]":
        return (None());
      case "::":
        var p = l.head, l$ = l.tail;
        var x = p[0], v = p[1];
        if (int_eq(h(x, k), 0)) {
          return (Some(v));
        } else {
          return (read_option0(l$, k));
        }
    }
    
  };
  return (read_option0(l, k));
};

var indom_dec = function (h1, l, k) {
  switch (l.tag) {
    case "[]":
      return (false);
    case "::":
      var p = l.head, l$ = l.tail;
      var x = p[0], y = p[1];
      return ((int_eq(h1(x, k), 0) || indom_dec(h1, l$, k)));
  }
  
};

var to_list = function (h, l) {
  switch (l.tag) {
    case "[]":
      return (mk_nil());
    case "::":
      var p = l.head, l$ = l.tail;
      return (mk_cons(p, to_list(h, rem(h, l$, fst(p)))));
  }
  
};
}// end of with Datatypes
}// end of with LibList

return {
  empty: empty, 
  read: read, 
  write: write, 
  rem: rem, 
  read_option: read_option, 
  indom_dec: indom_dec, 
  to_list: to_list};
})();

/* --------------------- tests/jsref/Shared.unlog.js --------------------- */

var Shared = (function() {
with (Datatypes) {
with (Heap) {

var option_case = function (d, f, o) {
  switch (o.tag) {
    case "Some":
      var x = o.value;
      return (f(x));
    case "None":
      return (d);
  }
  
};

var string_sub = function (s, n, l) {
  return (substring(n, l, s));
};

var lt_int_decidable = function (x, y) {
  return ((x < y));
};

var le_int_decidable = function (x, y) {
  return ((x <= y));
};

var ge_nat_decidable = function (x, y) {
  return (int_ge(x, y));
};


}// end of with Datatypes
}// end of with Heap

return {
  option_case: option_case, 
  string_sub: string_sub, 
  lt_int_decidable: lt_int_decidable, 
  le_int_decidable: le_int_decidable, 
  ge_nat_decidable: ge_nat_decidable};
})();

/* --------------------- tests/jsref/Compare.js --------------------- */



var _compare_JsSyntax_mathop = function(x, y) {
   return (x.tag == y.tag);
};

var _compare_JsSyntax_native_error = function(x, y) {
   return (x.tag == y.tag);
};

var _compare_JsSyntax_prealloc = function(x, y) {
   return (x.tag == y.tag) 
     && (x.tag != "Coq_prealloc_mathop" 
         || _compare_JsSyntax_mathop(x.mathop, y.mathop))
     && (x.tag != "Coq_prealloc_native_error" 
         || _compare_JsSyntax_native_error(x.error, y.error))
     && (x.tag != "Coq_prealloc_native_error_proto" 
         || _compare_JsSyntax_native_error(x.error, y.error))
     ;
};


/* --------------------- tests/jsref/Debug.js --------------------- */

var Debug = {
  not_yet_implemented_because : function() {},
  impossible_because : function() {},
  impossible_with_heap_because : function() {},
  ref_get_value : function() {},
  ref_get_value_2 : function() {},
  run_object_method : function() {},
  run_object_heap_set_extensible : function() {},
  lexical_env_get_identifier_ref : function() {}
};

/* --------------------- tests/jsref/JsNumber.js --------------------- */

var JsNumber = {
  /* Alternative approach to the int32 and uint32 conversions
     source: http://www.2ality.com/2012/02/js-integers.html
     function modulo(a, b) {
       return a - Math.floor(a/b)*b;
     }
     function ToUint32(x) {
       return modulo(ToInteger(x), Math.pow(2, 32));
     }

     function ToInt32(x) {
       var uint32 = ToUint32(x);
       if (uint32 >= Math.pow(2, 31)) {
         return uint32 - Math.pow(2, 32)
       } else {
         return uint32;
       }
     }
   */

  // this works because the >>> operator first converts its first argument to uint32
  to_uint32 : function (x) {
    return x >>> 0;
  },

  // this works because the >> operator first converts its first argument to int32
  to_int32 : function (x) {
    return x >> 0;
  },

  from_string : function (x) {
    return Number(x);
  },

  to_string : function (x) {
    return "" + x;
  },

  int32_left_shift : function (x, y) { return x << y; },
  int32_right_shift : function (x, y) { return x >> y; },
  uint32_right_shift : function (x, y) { return x >>> y; },

  int32_bitwise_and : function (x, y) { return x & y; },
  int32_bitwise_or : function (x, y) { return x | y; },
  int32_bitwise_xor : function (x, y) { return x ^ y; },
  int32_bitwise_not : function (x) { return ~ x; },

  floor : function (x) { return Math.floor(x); },
  neg : function (x) { return - x; },
  sign : function (x) { return Math.sign(x); },
  absolute : function (x) { return Math.abs(x); },
  fmod : function (x, y) { return x % y; },

  modulo_32 : function (x) { return x & 0x1F; },

  zero : 0.0,
  neg_zero : -0.0,
  one : 1.0,
  infinity : Number.POSITIVE_INFINITY,
  neg_infinity : Number.NEGATIVE_INFINITY,
  max_value : Number.MAX_VALUE,
  min_value : Number.MIN_VALUE,
  nan : Number.NaN,
  pi : Math.PI,
  e : Math.E,
  ln2 : Math.LN2,

  /* TODO: what about other functions from Math? */
};

/* --------------------- tests/jsref/JsSyntax.unlog.js --------------------- */

var JsSyntax = (function() {
with (Heap) {
with (Shared) {

function Coq_unary_op_delete() { return {tag: "Coq_unary_op_delete" }; }

function Coq_unary_op_void() { return {tag: "Coq_unary_op_void" }; }

function Coq_unary_op_typeof() { return {tag: "Coq_unary_op_typeof" }; }

function Coq_unary_op_post_incr() { return {tag: "Coq_unary_op_post_incr" }; }

function Coq_unary_op_post_decr() { return {tag: "Coq_unary_op_post_decr" }; }

function Coq_unary_op_pre_incr() { return {tag: "Coq_unary_op_pre_incr" }; }

function Coq_unary_op_pre_decr() { return {tag: "Coq_unary_op_pre_decr" }; }

function Coq_unary_op_add() { return {tag: "Coq_unary_op_add" }; }

function Coq_unary_op_neg() { return {tag: "Coq_unary_op_neg" }; }

function Coq_unary_op_bitwise_not() { return {tag: "Coq_unary_op_bitwise_not" }; }

function Coq_unary_op_not() { return {tag: "Coq_unary_op_not" }; }

function Coq_binary_op_mult() { return {tag: "Coq_binary_op_mult" }; }

function Coq_binary_op_div() { return {tag: "Coq_binary_op_div" }; }

function Coq_binary_op_mod() { return {tag: "Coq_binary_op_mod" }; }

function Coq_binary_op_add() { return {tag: "Coq_binary_op_add" }; }

function Coq_binary_op_sub() { return {tag: "Coq_binary_op_sub" }; }

function Coq_binary_op_left_shift() { return {tag: "Coq_binary_op_left_shift" }; }

function Coq_binary_op_right_shift() { return {tag: "Coq_binary_op_right_shift" }; }

function Coq_binary_op_unsigned_right_shift() { return {tag: "Coq_binary_op_unsigned_right_shift" }; }

function Coq_binary_op_lt() { return {tag: "Coq_binary_op_lt" }; }

function Coq_binary_op_gt() { return {tag: "Coq_binary_op_gt" }; }

function Coq_binary_op_le() { return {tag: "Coq_binary_op_le" }; }

function Coq_binary_op_ge() { return {tag: "Coq_binary_op_ge" }; }

function Coq_binary_op_instanceof() { return {tag: "Coq_binary_op_instanceof" }; }

function Coq_binary_op_in() { return {tag: "Coq_binary_op_in" }; }

function Coq_binary_op_equal() { return {tag: "Coq_binary_op_equal" }; }

function Coq_binary_op_disequal() { return {tag: "Coq_binary_op_disequal" }; }

function Coq_binary_op_strict_equal() { return {tag: "Coq_binary_op_strict_equal" }; }

function Coq_binary_op_strict_disequal() { return {tag: "Coq_binary_op_strict_disequal" }; }

function Coq_binary_op_bitwise_and() { return {tag: "Coq_binary_op_bitwise_and" }; }

function Coq_binary_op_bitwise_or() { return {tag: "Coq_binary_op_bitwise_or" }; }

function Coq_binary_op_bitwise_xor() { return {tag: "Coq_binary_op_bitwise_xor" }; }

function Coq_binary_op_and() { return {tag: "Coq_binary_op_and" }; }

function Coq_binary_op_or() { return {tag: "Coq_binary_op_or" }; }

function Coq_binary_op_coma() { return {tag: "Coq_binary_op_coma" }; }

function Coq_literal_null() { return {tag: "Coq_literal_null" }; }

function Coq_literal_bool(value) { return {tag: "Coq_literal_bool", value: value}; }

function Coq_literal_number(value) { return {tag: "Coq_literal_number", value: value}; }

function Coq_literal_string(value) { return {tag: "Coq_literal_string", value: value}; }

function Coq_label_empty() { return {tag: "Coq_label_empty" }; }

function Coq_label_string(value) { return {tag: "Coq_label_string", value: value}; }





var strictness_false = false;

function Coq_propname_identifier(value) { return {tag: "Coq_propname_identifier", value: value}; }

function Coq_propname_string(value) { return {tag: "Coq_propname_string", value: value}; }

function Coq_propname_number(value) { return {tag: "Coq_propname_number", value: value}; }

function Coq_expr_this() { return {tag: "Coq_expr_this" }; }

function Coq_expr_identifier(name) { return {tag: "Coq_expr_identifier", name: name}; }

function Coq_expr_literal(value) { return {tag: "Coq_expr_literal", value: value}; }

function Coq_expr_object(fields) { return {tag: "Coq_expr_object", fields: fields}; }

function Coq_expr_array(elements) { return {tag: "Coq_expr_array", elements: elements}; }

function Coq_expr_function(func_name_opt, arg_names, body) { return {
tag: "Coq_expr_function", func_name_opt: func_name_opt, arg_names: arg_names, body: body}; }

function Coq_expr_access(obj, field) { return {tag: "Coq_expr_access", obj: obj, field: field}; }

function Coq_expr_member(obj, field_name) { return {tag: "Coq_expr_member", obj: obj, field_name: field_name}; }

function Coq_expr_new(func, args) { return {tag: "Coq_expr_new", func: func, args: args}; }

function Coq_expr_call(func, args) { return {tag: "Coq_expr_call", func: func, args: args}; }

function Coq_expr_unary_op(op, arg) { return {tag: "Coq_expr_unary_op", op: op, arg: arg}; }

function Coq_expr_binary_op(arg1, op, arg2) { return {tag: "Coq_expr_binary_op", arg1: arg1, op: op, arg2: arg2}; }

function Coq_expr_conditional(cond, then_branch, else_branch) { return {
tag: "Coq_expr_conditional", cond: cond, then_branch: then_branch, else_branch: else_branch}; }

function Coq_expr_assign(left_expr, op_opt, right_expr) { return {tag: "Coq_expr_assign", left_expr: left_expr, op_opt: op_opt, right_expr: right_expr}; }

function Coq_propbody_val(expr) { return {tag: "Coq_propbody_val", expr: expr}; }

function Coq_propbody_get(body) { return {tag: "Coq_propbody_get", body: body}; }

function Coq_propbody_set(names, body) { return {tag: "Coq_propbody_set", names: names, body: body}; }

function Coq_funcbody_intro(prog, source) { return {tag: "Coq_funcbody_intro", prog: prog, source: source}; }

function Coq_stat_expr(expr) { return {tag: "Coq_stat_expr", expr: expr}; }

function Coq_stat_label(label, stat) { return {tag: "Coq_stat_label", label: label, stat: stat}; }

function Coq_stat_block(stats) { return {tag: "Coq_stat_block", stats: stats}; }

function Coq_stat_var_decl(decls) { return {tag: "Coq_stat_var_decl", decls: decls}; }

function Coq_stat_if(cond, then_branch, else_branch) { return {tag: "Coq_stat_if", cond: cond, then_branch: then_branch, else_branch: else_branch}; }

function Coq_stat_do_while(labels, body, cond) { return {tag: "Coq_stat_do_while", labels: labels, body: body, cond: cond}; }

function Coq_stat_while(labels, cond, body) { return {tag: "Coq_stat_while", labels: labels, cond: cond, body: body}; }

function Coq_stat_with(obj, stat) { return {tag: "Coq_stat_with", obj: obj, stat: stat}; }

function Coq_stat_throw(arg) { return {tag: "Coq_stat_throw", arg: arg}; }

function Coq_stat_return(arg_opt) { return {tag: "Coq_stat_return", arg_opt: arg_opt}; }

function Coq_stat_break(label) { return {tag: "Coq_stat_break", label: label}; }

function Coq_stat_continue(label) { return {tag: "Coq_stat_continue", label: label}; }

function Coq_stat_try(body, catch_stats_opt, finally_opt) { return {tag: "Coq_stat_try", body: body, catch_stats_opt: catch_stats_opt, finally_opt: finally_opt}; }

function Coq_stat_for(labels, init, cond, step, body) { return {tag: "Coq_stat_for", labels: labels, init: init, cond: cond, step: step, body: body}; }

function Coq_stat_for_var(labels, init, cond, step, body) { return {tag: "Coq_stat_for_var", labels: labels, init: init, cond: cond, step: step, body: body}; }

function Coq_stat_for_in(labels, id, obj, body) { return {tag: "Coq_stat_for_in", labels: labels, id: id, obj: obj, body: body}; }

function Coq_stat_for_in_var(labels, id, init, obj, body) { return {tag: "Coq_stat_for_in_var", labels: labels, id: id, init: init, obj: obj, body: body}; }

function Coq_stat_debugger() { return {tag: "Coq_stat_debugger" }; }

function Coq_stat_switch(labels, arg, body) { return {tag: "Coq_stat_switch", labels: labels, arg: arg, body: body}; }

function Coq_switchbody_nodefault(clauses) { return {tag: "Coq_switchbody_nodefault", clauses: clauses}; }

function Coq_switchbody_withdefault(clauses_before, clause_default, clauses_after) { return {
tag: "Coq_switchbody_withdefault", clauses_before: clauses_before, clause_default: clause_default, clauses_after: clauses_after}; }

function Coq_switchclause_intro(arg, stats) { return {tag: "Coq_switchclause_intro", arg: arg, stats: stats}; }

function Coq_prog_intro(strictness, elements) { return {tag: "Coq_prog_intro", strictness: strictness, elements: elements}; }

function Coq_element_stat(stat) { return {tag: "Coq_element_stat", stat: stat}; }

function Coq_element_func_decl(func_name, arg_names, body) { return {
tag: "Coq_element_func_decl", func_name: func_name, arg_names: arg_names, body: body}; }







var funcdecl_name = function (x) {
  return (x.funcdecl_name);
};

var funcdecl_parameters = function (x) {
  return (x.funcdecl_parameters);
};

var funcdecl_body = function (x) {
  return (x.funcdecl_body);
};

function Coq_mathop_abs() { return {tag: "Coq_mathop_abs" }; }

function Coq_native_error_eval() { return {tag: "Coq_native_error_eval" }; }

function Coq_native_error_range() { return {tag: "Coq_native_error_range" }; }

function Coq_native_error_ref() { return {tag: "Coq_native_error_ref" }; }

function Coq_native_error_syntax() { return {tag: "Coq_native_error_syntax" }; }

function Coq_native_error_type() { return {tag: "Coq_native_error_type" }; }

function Coq_native_error_uri() { return {tag: "Coq_native_error_uri" }; }

function Coq_prealloc_global() { return {tag: "Coq_prealloc_global" }; }

function Coq_prealloc_global_eval() { return {tag: "Coq_prealloc_global_eval" }; }

function Coq_prealloc_global_parse_int() { return {tag: "Coq_prealloc_global_parse_int" }; }

function Coq_prealloc_global_parse_float() { return {tag: "Coq_prealloc_global_parse_float" }; }

function Coq_prealloc_global_is_finite() { return {tag: "Coq_prealloc_global_is_finite" }; }

function Coq_prealloc_global_is_nan() { return {tag: "Coq_prealloc_global_is_nan" }; }

function Coq_prealloc_global_decode_uri() { return {tag: "Coq_prealloc_global_decode_uri" }; }

function Coq_prealloc_global_decode_uri_component() { return {tag: "Coq_prealloc_global_decode_uri_component" }; }

function Coq_prealloc_global_encode_uri() { return {tag: "Coq_prealloc_global_encode_uri" }; }

function Coq_prealloc_global_encode_uri_component() { return {tag: "Coq_prealloc_global_encode_uri_component" }; }

function Coq_prealloc_object() { return {tag: "Coq_prealloc_object" }; }

function Coq_prealloc_object_get_proto_of() { return {tag: "Coq_prealloc_object_get_proto_of" }; }

function Coq_prealloc_object_get_own_prop_descriptor() { return {tag: "Coq_prealloc_object_get_own_prop_descriptor" }; }

function Coq_prealloc_object_get_own_prop_name() { return {tag: "Coq_prealloc_object_get_own_prop_name" }; }

function Coq_prealloc_object_create() { return {tag: "Coq_prealloc_object_create" }; }

function Coq_prealloc_object_define_prop() { return {tag: "Coq_prealloc_object_define_prop" }; }

function Coq_prealloc_object_define_props() { return {tag: "Coq_prealloc_object_define_props" }; }

function Coq_prealloc_object_seal() { return {tag: "Coq_prealloc_object_seal" }; }

function Coq_prealloc_object_freeze() { return {tag: "Coq_prealloc_object_freeze" }; }

function Coq_prealloc_object_prevent_extensions() { return {tag: "Coq_prealloc_object_prevent_extensions" }; }

function Coq_prealloc_object_is_sealed() { return {tag: "Coq_prealloc_object_is_sealed" }; }

function Coq_prealloc_object_is_frozen() { return {tag: "Coq_prealloc_object_is_frozen" }; }

function Coq_prealloc_object_is_extensible() { return {tag: "Coq_prealloc_object_is_extensible" }; }

function Coq_prealloc_object_keys() { return {tag: "Coq_prealloc_object_keys" }; }

function Coq_prealloc_object_keys_call() { return {tag: "Coq_prealloc_object_keys_call" }; }

function Coq_prealloc_object_proto() { return {tag: "Coq_prealloc_object_proto" }; }

function Coq_prealloc_object_proto_to_string() { return {tag: "Coq_prealloc_object_proto_to_string" }; }

function Coq_prealloc_object_proto_value_of() { return {tag: "Coq_prealloc_object_proto_value_of" }; }

function Coq_prealloc_object_proto_has_own_prop() { return {tag: "Coq_prealloc_object_proto_has_own_prop" }; }

function Coq_prealloc_object_proto_is_prototype_of() { return {tag: "Coq_prealloc_object_proto_is_prototype_of" }; }

function Coq_prealloc_object_proto_prop_is_enumerable() { return {tag: "Coq_prealloc_object_proto_prop_is_enumerable" }; }

function Coq_prealloc_function() { return {tag: "Coq_prealloc_function" }; }

function Coq_prealloc_function_proto() { return {tag: "Coq_prealloc_function_proto" }; }

function Coq_prealloc_function_proto_to_string() { return {tag: "Coq_prealloc_function_proto_to_string" }; }

function Coq_prealloc_function_proto_apply() { return {tag: "Coq_prealloc_function_proto_apply" }; }

function Coq_prealloc_function_proto_call() { return {tag: "Coq_prealloc_function_proto_call" }; }

function Coq_prealloc_function_proto_bind() { return {tag: "Coq_prealloc_function_proto_bind" }; }

function Coq_prealloc_bool() { return {tag: "Coq_prealloc_bool" }; }

function Coq_prealloc_bool_proto() { return {tag: "Coq_prealloc_bool_proto" }; }

function Coq_prealloc_bool_proto_to_string() { return {tag: "Coq_prealloc_bool_proto_to_string" }; }

function Coq_prealloc_bool_proto_value_of() { return {tag: "Coq_prealloc_bool_proto_value_of" }; }

function Coq_prealloc_number() { return {tag: "Coq_prealloc_number" }; }

function Coq_prealloc_number_proto() { return {tag: "Coq_prealloc_number_proto" }; }

function Coq_prealloc_number_proto_to_string() { return {tag: "Coq_prealloc_number_proto_to_string" }; }

function Coq_prealloc_number_proto_value_of() { return {tag: "Coq_prealloc_number_proto_value_of" }; }

function Coq_prealloc_number_proto_to_fixed() { return {tag: "Coq_prealloc_number_proto_to_fixed" }; }

function Coq_prealloc_number_proto_to_exponential() { return {tag: "Coq_prealloc_number_proto_to_exponential" }; }

function Coq_prealloc_number_proto_to_precision() { return {tag: "Coq_prealloc_number_proto_to_precision" }; }

function Coq_prealloc_array() { return {tag: "Coq_prealloc_array" }; }

function Coq_prealloc_array_is_array() { return {tag: "Coq_prealloc_array_is_array" }; }

function Coq_prealloc_array_proto() { return {tag: "Coq_prealloc_array_proto" }; }

function Coq_prealloc_array_proto_to_string() { return {tag: "Coq_prealloc_array_proto_to_string" }; }

function Coq_prealloc_array_proto_join() { return {tag: "Coq_prealloc_array_proto_join" }; }

function Coq_prealloc_array_proto_pop() { return {tag: "Coq_prealloc_array_proto_pop" }; }

function Coq_prealloc_array_proto_push() { return {tag: "Coq_prealloc_array_proto_push" }; }

function Coq_prealloc_string() { return {tag: "Coq_prealloc_string" }; }

function Coq_prealloc_string_proto() { return {tag: "Coq_prealloc_string_proto" }; }

function Coq_prealloc_string_proto_to_string() { return {tag: "Coq_prealloc_string_proto_to_string" }; }

function Coq_prealloc_string_proto_value_of() { return {tag: "Coq_prealloc_string_proto_value_of" }; }

function Coq_prealloc_string_proto_char_at() { return {tag: "Coq_prealloc_string_proto_char_at" }; }

function Coq_prealloc_string_proto_char_code_at() { return {tag: "Coq_prealloc_string_proto_char_code_at" }; }

function Coq_prealloc_math() { return {tag: "Coq_prealloc_math" }; }

function Coq_prealloc_date() { return {tag: "Coq_prealloc_date" }; }

function Coq_prealloc_regexp() { return {tag: "Coq_prealloc_regexp" }; }

function Coq_prealloc_error() { return {tag: "Coq_prealloc_error" }; }

function Coq_prealloc_error_proto() { return {tag: "Coq_prealloc_error_proto" }; }

function Coq_prealloc_error_proto_to_string() { return {tag: "Coq_prealloc_error_proto_to_string" }; }

function Coq_prealloc_throw_type_error() { return {tag: "Coq_prealloc_throw_type_error" }; }

function Coq_prealloc_json() { return {tag: "Coq_prealloc_json" }; }

function Coq_prealloc_mathop(mathop) { return {tag: "Coq_prealloc_mathop", mathop: mathop}; }

function Coq_prealloc_native_error(error) { return {tag: "Coq_prealloc_native_error", error: error}; }

function Coq_prealloc_native_error_proto(error) { return {tag: "Coq_prealloc_native_error_proto", error: error}; }

function Coq_call_default() { return {tag: "Coq_call_default" }; }

function Coq_call_after_bind() { return {tag: "Coq_call_after_bind" }; }

function Coq_call_prealloc(prealloc) { return {tag: "Coq_call_prealloc", prealloc: prealloc}; }

function Coq_construct_default() { return {tag: "Coq_construct_default" }; }

function Coq_construct_after_bind() { return {tag: "Coq_construct_after_bind" }; }

function Coq_construct_prealloc(prealloc) { return {tag: "Coq_construct_prealloc", prealloc: prealloc}; }

function Coq_builtin_has_instance_function() { return {tag: "Coq_builtin_has_instance_function" }; }

function Coq_builtin_has_instance_after_bind() { return {tag: "Coq_builtin_has_instance_after_bind" }; }

function Coq_builtin_get_default() { return {tag: "Coq_builtin_get_default" }; }

function Coq_builtin_get_function() { return {tag: "Coq_builtin_get_function" }; }

function Coq_builtin_get_args_obj() { return {tag: "Coq_builtin_get_args_obj" }; }

function Coq_builtin_get_own_prop_default() { return {tag: "Coq_builtin_get_own_prop_default" }; }

function Coq_builtin_get_own_prop_args_obj() { return {tag: "Coq_builtin_get_own_prop_args_obj" }; }

function Coq_builtin_get_own_prop_string() { return {tag: "Coq_builtin_get_own_prop_string" }; }

function Coq_builtin_get_prop_default() { return {tag: "Coq_builtin_get_prop_default" }; }

function Coq_builtin_put_default() { return {tag: "Coq_builtin_put_default" }; }

function Coq_builtin_can_put_default() { return {tag: "Coq_builtin_can_put_default" }; }

function Coq_builtin_has_prop_default() { return {tag: "Coq_builtin_has_prop_default" }; }

function Coq_builtin_delete_default() { return {tag: "Coq_builtin_delete_default" }; }

function Coq_builtin_delete_args_obj() { return {tag: "Coq_builtin_delete_args_obj" }; }

function Coq_builtin_default_value_default() { return {tag: "Coq_builtin_default_value_default" }; }

function Coq_builtin_define_own_prop_default() { return {tag: "Coq_builtin_define_own_prop_default" }; }

function Coq_builtin_define_own_prop_array() { return {tag: "Coq_builtin_define_own_prop_array" }; }

function Coq_builtin_define_own_prop_args_obj() { return {tag: "Coq_builtin_define_own_prop_args_obj" }; }

function Coq_object_loc_normal(address) { return {tag: "Coq_object_loc_normal", address: address}; }

function Coq_object_loc_prealloc(prealloc) { return {tag: "Coq_object_loc_prealloc", prealloc: prealloc}; }

function Coq_prim_undef() { return {tag: "Coq_prim_undef" }; }

function Coq_prim_null() { return {tag: "Coq_prim_null" }; }

function Coq_prim_bool(value) { return {tag: "Coq_prim_bool", value: value}; }

function Coq_prim_number(value) { return {tag: "Coq_prim_number", value: value}; }

function Coq_prim_string(value) { return {tag: "Coq_prim_string", value: value}; }

function Coq_value_prim(value) { return {tag: "Coq_value_prim", value: value}; }

function Coq_value_object(value) { return {tag: "Coq_value_object", value: value}; }

function Coq_type_undef() { return {tag: "Coq_type_undef" }; }

function Coq_type_null() { return {tag: "Coq_type_null" }; }

function Coq_type_bool() { return {tag: "Coq_type_bool" }; }

function Coq_type_number() { return {tag: "Coq_type_number" }; }

function Coq_type_string() { return {tag: "Coq_type_string" }; }

function Coq_type_object() { return {tag: "Coq_type_object" }; }



var attributes_data_value = function (x) {
  return (x.attributes_data_value);
};

var attributes_data_writable = function (x) {
  return (x.attributes_data_writable);
};

var attributes_data_enumerable = function (x) {
  return (x.attributes_data_enumerable);
};

var attributes_data_configurable = function (x) {
  return (x.attributes_data_configurable);
};



var attributes_accessor_get = function (x) {
  return (x.attributes_accessor_get);
};

var attributes_accessor_set = function (x) {
  return (x.attributes_accessor_set);
};

var attributes_accessor_enumerable = function (x) {
  return (x.attributes_accessor_enumerable);
};

var attributes_accessor_configurable = function (x) {
  return (x.attributes_accessor_configurable);
};

function Coq_attributes_data_of(value) { return {tag: "Coq_attributes_data_of", value: value}; }

function Coq_attributes_accessor_of(value) { return {tag: "Coq_attributes_accessor_of", value: value}; }



var descriptor_value = function (x) {
  return (x.descriptor_value);
};

var descriptor_writable = function (x) {
  return (x.descriptor_writable);
};

var descriptor_get = function (x) {
  return (x.descriptor_get);
};

var descriptor_set = function (x) {
  return (x.descriptor_set);
};

var descriptor_enumerable = function (x) {
  return (x.descriptor_enumerable);
};

var descriptor_configurable = function (x) {
  return (x.descriptor_configurable);
};

function Coq_full_descriptor_undef() { return {tag: "Coq_full_descriptor_undef" }; }

function Coq_full_descriptor_some(value) { return {tag: "Coq_full_descriptor_some", value: value}; }

function Coq_mutability_uninitialized_immutable() { return {tag: "Coq_mutability_uninitialized_immutable" }; }

function Coq_mutability_immutable() { return {tag: "Coq_mutability_immutable" }; }

function Coq_mutability_nondeletable() { return {tag: "Coq_mutability_nondeletable" }; }

function Coq_mutability_deletable() { return {tag: "Coq_mutability_deletable" }; }





function Coq_env_record_decl(value) { return {tag: "Coq_env_record_decl", value: value}; }

function Coq_env_record_object(value, provide_this) { return {tag: "Coq_env_record_object", value: value, provide_this: provide_this}; }



var env_loc_global_env_record = 0;





var execution_ctx_lexical_env = function (x) {
  return (x.execution_ctx_lexical_env);
};

var execution_ctx_variable_env = function (x) {
  return (x.execution_ctx_variable_env);
};

var execution_ctx_this_binding = function (x) {
  return (x.execution_ctx_this_binding);
};

var execution_ctx_strict = function (x) {
  return (x.execution_ctx_strict);
};



function Coq_ref_base_type_value(value) { return {tag: "Coq_ref_base_type_value", value: value}; }

function Coq_ref_base_type_env_loc(value) { return {tag: "Coq_ref_base_type_env_loc", value: value}; }



var ref_base = function (x) {
  return (x.ref_base);
};

var ref_name = function (x) {
  return (x.ref_name);
};

var ref_strict = function (x) {
  return (x.ref_strict);
};







var object_proto_ = function (x) {
  return (x.object_proto_);
};

var object_class_ = function (x) {
  return (x.object_class_);
};

var object_extensible_ = function (x) {
  return (x.object_extensible_);
};

var object_prim_value_ = function (x) {
  return (x.object_prim_value_);
};

var object_properties_ = function (x) {
  return (x.object_properties_);
};

var object_get_ = function (x) {
  return (x.object_get_);
};

var object_get_own_prop_ = function (x) {
  return (x.object_get_own_prop_);
};

var object_get_prop_ = function (x) {
  return (x.object_get_prop_);
};

var object_put_ = function (x) {
  return (x.object_put_);
};

var object_can_put_ = function (x) {
  return (x.object_can_put_);
};

var object_has_prop_ = function (x) {
  return (x.object_has_prop_);
};

var object_delete_ = function (x) {
  return (x.object_delete_);
};

var object_default_value_ = function (x) {
  return (x.object_default_value_);
};

var object_define_own_prop_ = function (x) {
  return (x.object_define_own_prop_);
};

var object_construct_ = function (x) {
  return (x.object_construct_);
};

var object_call_ = function (x) {
  return (x.object_call_);
};

var object_has_instance_ = function (x) {
  return (x.object_has_instance_);
};

var object_scope_ = function (x) {
  return (x.object_scope_);
};

var object_formal_parameters_ = function (x) {
  return (x.object_formal_parameters_);
};

var object_code_ = function (x) {
  return (x.object_code_);
};

var object_target_function_ = function (x) {
  return (x.object_target_function_);
};

var object_bound_this_ = function (x) {
  return (x.object_bound_this_);
};

var object_bound_args_ = function (x) {
  return (x.object_bound_args_);
};

var object_parameter_map_ = function (x) {
  return (x.object_parameter_map_);
};

function Coq_delete_event(loc, name, locopt) { return {tag: "Coq_delete_event", loc: loc, name: name, locopt: locopt}; }

function Coq_mutateproto_event(loc, fields) { return {tag: "Coq_mutateproto_event", loc: loc, fields: fields}; }

function Coq_enumchange_event(loc, name) { return {tag: "Coq_enumchange_event", loc: loc, name: name}; }



var state_object_heap = function (x) {
  return (x.state_object_heap);
};

var state_env_record_heap = function (x) {
  return (x.state_env_record_heap);
};

function Coq_restype_normal() { return {tag: "Coq_restype_normal" }; }

function Coq_restype_break() { return {tag: "Coq_restype_break" }; }

function Coq_restype_continue() { return {tag: "Coq_restype_continue" }; }

function Coq_restype_return() { return {tag: "Coq_restype_return" }; }

function Coq_restype_throw() { return {tag: "Coq_restype_throw" }; }

function Coq_resvalue_empty() { return {tag: "Coq_resvalue_empty" }; }

function Coq_resvalue_value(value) { return {tag: "Coq_resvalue_value", value: value}; }

function Coq_resvalue_ref(ref) { return {tag: "Coq_resvalue_ref", ref: ref}; }



var res_type = function (x) {
  return (x.res_type);
};

var res_value = function (x) {
  return (x.res_value);
};

var res_label = function (x) {
  return (x.res_label);
};

var res_ref = function (r) {
  return (
    {
      res_type: Coq_restype_normal(),
      res_value: Coq_resvalue_ref(r),
      res_label: Coq_label_empty()
    });
};

var res_val = function (v) {
  return (
    {
      res_type: Coq_restype_normal(),
      res_value: Coq_resvalue_value(v),
      res_label: Coq_label_empty()
    });
};

var res_normal = function (rv) {
  return (
    {
      res_type: Coq_restype_normal(),
      res_value: rv,
      res_label: Coq_label_empty()
    });
};

var res_empty = {
  res_type: Coq_restype_normal(),
  res_value: Coq_resvalue_empty(),
  res_label: Coq_label_empty()
};

var res_break = function (labo) {
  return (
    {
      res_type: Coq_restype_break(),
      res_value: Coq_resvalue_empty(),
      res_label: labo
    });
};

var res_continue = function (labo) {
  return (
    {
      res_type: Coq_restype_continue(),
      res_value: Coq_resvalue_empty(),
      res_label: labo
    });
};

var res_return = function (v) {
  return (
    {
      res_type: Coq_restype_return(),
      res_value: v,
      res_label: Coq_label_empty()
    });
};

var res_throw = function (v) {
  return (
    {
      res_type: Coq_restype_throw(),
      res_value: v,
      res_label: Coq_label_empty()
    });
};

function Coq_out_div() { return {tag: "Coq_out_div" }; }

function Coq_out_ter(state, res) { return {tag: "Coq_out_ter", state: state, res: res}; }

var out_void = function (s) {
  return (Coq_out_ter(s, res_empty));
};

function Coq_specret_val(state, res) { return {tag: "Coq_specret_val", state: state, res: res}; }

function Coq_specret_out(out) { return {tag: "Coq_specret_out", out: out}; }

function Coq_codetype_func() { return {tag: "Coq_codetype_func" }; }

function Coq_codetype_global() { return {tag: "Coq_codetype_global" }; }

function Coq_codetype_eval() { return {tag: "Coq_codetype_eval" }; }
}// end of with Heap
}// end of with Shared

return {
  Coq_unary_op_delete: Coq_unary_op_delete, 
  Coq_unary_op_void: Coq_unary_op_void, 
  Coq_unary_op_typeof: Coq_unary_op_typeof, 
  Coq_unary_op_post_incr: Coq_unary_op_post_incr, 
  Coq_unary_op_post_decr: Coq_unary_op_post_decr, 
  Coq_unary_op_pre_incr: Coq_unary_op_pre_incr, 
  Coq_unary_op_pre_decr: Coq_unary_op_pre_decr, 
  Coq_unary_op_add: Coq_unary_op_add, 
  Coq_unary_op_neg: Coq_unary_op_neg, 
  Coq_unary_op_bitwise_not: Coq_unary_op_bitwise_not, 
  Coq_unary_op_not: Coq_unary_op_not, 
  Coq_binary_op_mult: Coq_binary_op_mult, 
  Coq_binary_op_div: Coq_binary_op_div, 
  Coq_binary_op_mod: Coq_binary_op_mod, 
  Coq_binary_op_add: Coq_binary_op_add, 
  Coq_binary_op_sub: Coq_binary_op_sub, 
  Coq_binary_op_left_shift: Coq_binary_op_left_shift, 
  Coq_binary_op_right_shift: Coq_binary_op_right_shift, 
  Coq_binary_op_unsigned_right_shift: Coq_binary_op_unsigned_right_shift, 
  Coq_binary_op_lt: Coq_binary_op_lt, 
  Coq_binary_op_gt: Coq_binary_op_gt, 
  Coq_binary_op_le: Coq_binary_op_le, 
  Coq_binary_op_ge: Coq_binary_op_ge, 
  Coq_binary_op_instanceof: Coq_binary_op_instanceof, 
  Coq_binary_op_in: Coq_binary_op_in, 
  Coq_binary_op_equal: Coq_binary_op_equal, 
  Coq_binary_op_disequal: Coq_binary_op_disequal, 
  Coq_binary_op_strict_equal: Coq_binary_op_strict_equal, 
  Coq_binary_op_strict_disequal: Coq_binary_op_strict_disequal, 
  Coq_binary_op_bitwise_and: Coq_binary_op_bitwise_and, 
  Coq_binary_op_bitwise_or: Coq_binary_op_bitwise_or, 
  Coq_binary_op_bitwise_xor: Coq_binary_op_bitwise_xor, 
  Coq_binary_op_and: Coq_binary_op_and, 
  Coq_binary_op_or: Coq_binary_op_or, 
  Coq_binary_op_coma: Coq_binary_op_coma, 
  Coq_literal_null: Coq_literal_null, 
  Coq_literal_bool: Coq_literal_bool, 
  Coq_literal_number: Coq_literal_number, 
  Coq_literal_string: Coq_literal_string, 
  Coq_label_empty: Coq_label_empty, 
  Coq_label_string: Coq_label_string, 
  strictness_false: strictness_false, 
  Coq_propname_identifier: Coq_propname_identifier, 
  Coq_propname_string: Coq_propname_string, 
  Coq_propname_number: Coq_propname_number, 
  Coq_expr_this: Coq_expr_this, 
  Coq_expr_identifier: Coq_expr_identifier, 
  Coq_expr_literal: Coq_expr_literal, 
  Coq_expr_object: Coq_expr_object, 
  Coq_expr_array: Coq_expr_array, 
  Coq_expr_function: Coq_expr_function, 
  Coq_expr_access: Coq_expr_access, 
  Coq_expr_member: Coq_expr_member, 
  Coq_expr_new: Coq_expr_new, 
  Coq_expr_call: Coq_expr_call, 
  Coq_expr_unary_op: Coq_expr_unary_op, 
  Coq_expr_binary_op: Coq_expr_binary_op, 
  Coq_expr_conditional: Coq_expr_conditional, 
  Coq_expr_assign: Coq_expr_assign, 
  Coq_propbody_val: Coq_propbody_val, 
  Coq_propbody_get: Coq_propbody_get, 
  Coq_propbody_set: Coq_propbody_set, 
  Coq_funcbody_intro: Coq_funcbody_intro, 
  Coq_stat_expr: Coq_stat_expr, 
  Coq_stat_label: Coq_stat_label, 
  Coq_stat_block: Coq_stat_block, 
  Coq_stat_var_decl: Coq_stat_var_decl, 
  Coq_stat_if: Coq_stat_if, 
  Coq_stat_do_while: Coq_stat_do_while, 
  Coq_stat_while: Coq_stat_while, 
  Coq_stat_with: Coq_stat_with, 
  Coq_stat_throw: Coq_stat_throw, 
  Coq_stat_return: Coq_stat_return, 
  Coq_stat_break: Coq_stat_break, 
  Coq_stat_continue: Coq_stat_continue, 
  Coq_stat_try: Coq_stat_try, 
  Coq_stat_for: Coq_stat_for, 
  Coq_stat_for_var: Coq_stat_for_var, 
  Coq_stat_for_in: Coq_stat_for_in, 
  Coq_stat_for_in_var: Coq_stat_for_in_var, 
  Coq_stat_debugger: Coq_stat_debugger, 
  Coq_stat_switch: Coq_stat_switch, 
  Coq_switchbody_nodefault: Coq_switchbody_nodefault, 
  Coq_switchbody_withdefault: Coq_switchbody_withdefault, 
  Coq_switchclause_intro: Coq_switchclause_intro, 
  Coq_prog_intro: Coq_prog_intro, 
  Coq_element_stat: Coq_element_stat, 
  Coq_element_func_decl: Coq_element_func_decl, 
  funcdecl_name: funcdecl_name, 
  funcdecl_parameters: funcdecl_parameters, 
  funcdecl_body: funcdecl_body, 
  Coq_mathop_abs: Coq_mathop_abs, 
  Coq_native_error_eval: Coq_native_error_eval, 
  Coq_native_error_range: Coq_native_error_range, 
  Coq_native_error_ref: Coq_native_error_ref, 
  Coq_native_error_syntax: Coq_native_error_syntax, 
  Coq_native_error_type: Coq_native_error_type, 
  Coq_native_error_uri: Coq_native_error_uri, 
  Coq_prealloc_global: Coq_prealloc_global, 
  Coq_prealloc_global_eval: Coq_prealloc_global_eval, 
  Coq_prealloc_global_parse_int: Coq_prealloc_global_parse_int, 
  Coq_prealloc_global_parse_float: Coq_prealloc_global_parse_float, 
  Coq_prealloc_global_is_finite: Coq_prealloc_global_is_finite, 
  Coq_prealloc_global_is_nan: Coq_prealloc_global_is_nan, 
  Coq_prealloc_global_decode_uri: Coq_prealloc_global_decode_uri, 
  Coq_prealloc_global_decode_uri_component: Coq_prealloc_global_decode_uri_component, 
  Coq_prealloc_global_encode_uri: Coq_prealloc_global_encode_uri, 
  Coq_prealloc_global_encode_uri_component: Coq_prealloc_global_encode_uri_component, 
  Coq_prealloc_object: Coq_prealloc_object, 
  Coq_prealloc_object_get_proto_of: Coq_prealloc_object_get_proto_of, 
  Coq_prealloc_object_get_own_prop_descriptor: Coq_prealloc_object_get_own_prop_descriptor, 
  Coq_prealloc_object_get_own_prop_name: Coq_prealloc_object_get_own_prop_name, 
  Coq_prealloc_object_create: Coq_prealloc_object_create, 
  Coq_prealloc_object_define_prop: Coq_prealloc_object_define_prop, 
  Coq_prealloc_object_define_props: Coq_prealloc_object_define_props, 
  Coq_prealloc_object_seal: Coq_prealloc_object_seal, 
  Coq_prealloc_object_freeze: Coq_prealloc_object_freeze, 
  Coq_prealloc_object_prevent_extensions: Coq_prealloc_object_prevent_extensions, 
  Coq_prealloc_object_is_sealed: Coq_prealloc_object_is_sealed, 
  Coq_prealloc_object_is_frozen: Coq_prealloc_object_is_frozen, 
  Coq_prealloc_object_is_extensible: Coq_prealloc_object_is_extensible, 
  Coq_prealloc_object_keys: Coq_prealloc_object_keys, 
  Coq_prealloc_object_keys_call: Coq_prealloc_object_keys_call, 
  Coq_prealloc_object_proto: Coq_prealloc_object_proto, 
  Coq_prealloc_object_proto_to_string: Coq_prealloc_object_proto_to_string, 
  Coq_prealloc_object_proto_value_of: Coq_prealloc_object_proto_value_of, 
  Coq_prealloc_object_proto_has_own_prop: Coq_prealloc_object_proto_has_own_prop, 
  Coq_prealloc_object_proto_is_prototype_of: Coq_prealloc_object_proto_is_prototype_of, 
  Coq_prealloc_object_proto_prop_is_enumerable: Coq_prealloc_object_proto_prop_is_enumerable, 
  Coq_prealloc_function: Coq_prealloc_function, 
  Coq_prealloc_function_proto: Coq_prealloc_function_proto, 
  Coq_prealloc_function_proto_to_string: Coq_prealloc_function_proto_to_string, 
  Coq_prealloc_function_proto_apply: Coq_prealloc_function_proto_apply, 
  Coq_prealloc_function_proto_call: Coq_prealloc_function_proto_call, 
  Coq_prealloc_function_proto_bind: Coq_prealloc_function_proto_bind, 
  Coq_prealloc_bool: Coq_prealloc_bool, 
  Coq_prealloc_bool_proto: Coq_prealloc_bool_proto, 
  Coq_prealloc_bool_proto_to_string: Coq_prealloc_bool_proto_to_string, 
  Coq_prealloc_bool_proto_value_of: Coq_prealloc_bool_proto_value_of, 
  Coq_prealloc_number: Coq_prealloc_number, 
  Coq_prealloc_number_proto: Coq_prealloc_number_proto, 
  Coq_prealloc_number_proto_to_string: Coq_prealloc_number_proto_to_string, 
  Coq_prealloc_number_proto_value_of: Coq_prealloc_number_proto_value_of, 
  Coq_prealloc_number_proto_to_fixed: Coq_prealloc_number_proto_to_fixed, 
  Coq_prealloc_number_proto_to_exponential: Coq_prealloc_number_proto_to_exponential, 
  Coq_prealloc_number_proto_to_precision: Coq_prealloc_number_proto_to_precision, 
  Coq_prealloc_array: Coq_prealloc_array, 
  Coq_prealloc_array_is_array: Coq_prealloc_array_is_array, 
  Coq_prealloc_array_proto: Coq_prealloc_array_proto, 
  Coq_prealloc_array_proto_to_string: Coq_prealloc_array_proto_to_string, 
  Coq_prealloc_array_proto_join: Coq_prealloc_array_proto_join, 
  Coq_prealloc_array_proto_pop: Coq_prealloc_array_proto_pop, 
  Coq_prealloc_array_proto_push: Coq_prealloc_array_proto_push, 
  Coq_prealloc_string: Coq_prealloc_string, 
  Coq_prealloc_string_proto: Coq_prealloc_string_proto, 
  Coq_prealloc_string_proto_to_string: Coq_prealloc_string_proto_to_string, 
  Coq_prealloc_string_proto_value_of: Coq_prealloc_string_proto_value_of, 
  Coq_prealloc_string_proto_char_at: Coq_prealloc_string_proto_char_at, 
  Coq_prealloc_string_proto_char_code_at: Coq_prealloc_string_proto_char_code_at, 
  Coq_prealloc_math: Coq_prealloc_math, 
  Coq_prealloc_date: Coq_prealloc_date, 
  Coq_prealloc_regexp: Coq_prealloc_regexp, 
  Coq_prealloc_error: Coq_prealloc_error, 
  Coq_prealloc_error_proto: Coq_prealloc_error_proto, 
  Coq_prealloc_error_proto_to_string: Coq_prealloc_error_proto_to_string, 
  Coq_prealloc_throw_type_error: Coq_prealloc_throw_type_error, 
  Coq_prealloc_json: Coq_prealloc_json, 
  Coq_prealloc_mathop: Coq_prealloc_mathop, 
  Coq_prealloc_native_error: Coq_prealloc_native_error, 
  Coq_prealloc_native_error_proto: Coq_prealloc_native_error_proto, 
  Coq_call_default: Coq_call_default, 
  Coq_call_after_bind: Coq_call_after_bind, 
  Coq_call_prealloc: Coq_call_prealloc, 
  Coq_construct_default: Coq_construct_default, 
  Coq_construct_after_bind: Coq_construct_after_bind, 
  Coq_construct_prealloc: Coq_construct_prealloc, 
  Coq_builtin_has_instance_function: Coq_builtin_has_instance_function, 
  Coq_builtin_has_instance_after_bind: Coq_builtin_has_instance_after_bind, 
  Coq_builtin_get_default: Coq_builtin_get_default, 
  Coq_builtin_get_function: Coq_builtin_get_function, 
  Coq_builtin_get_args_obj: Coq_builtin_get_args_obj, 
  Coq_builtin_get_own_prop_default: Coq_builtin_get_own_prop_default, 
  Coq_builtin_get_own_prop_args_obj: Coq_builtin_get_own_prop_args_obj, 
  Coq_builtin_get_own_prop_string: Coq_builtin_get_own_prop_string, 
  Coq_builtin_get_prop_default: Coq_builtin_get_prop_default, 
  Coq_builtin_put_default: Coq_builtin_put_default, 
  Coq_builtin_can_put_default: Coq_builtin_can_put_default, 
  Coq_builtin_has_prop_default: Coq_builtin_has_prop_default, 
  Coq_builtin_delete_default: Coq_builtin_delete_default, 
  Coq_builtin_delete_args_obj: Coq_builtin_delete_args_obj, 
  Coq_builtin_default_value_default: Coq_builtin_default_value_default, 
  Coq_builtin_define_own_prop_default: Coq_builtin_define_own_prop_default, 
  Coq_builtin_define_own_prop_array: Coq_builtin_define_own_prop_array, 
  Coq_builtin_define_own_prop_args_obj: Coq_builtin_define_own_prop_args_obj, 
  Coq_object_loc_normal: Coq_object_loc_normal, 
  Coq_object_loc_prealloc: Coq_object_loc_prealloc, 
  Coq_prim_undef: Coq_prim_undef, 
  Coq_prim_null: Coq_prim_null, 
  Coq_prim_bool: Coq_prim_bool, 
  Coq_prim_number: Coq_prim_number, 
  Coq_prim_string: Coq_prim_string, 
  Coq_value_prim: Coq_value_prim, 
  Coq_value_object: Coq_value_object, 
  Coq_type_undef: Coq_type_undef, 
  Coq_type_null: Coq_type_null, 
  Coq_type_bool: Coq_type_bool, 
  Coq_type_number: Coq_type_number, 
  Coq_type_string: Coq_type_string, 
  Coq_type_object: Coq_type_object, 
  attributes_data_value: attributes_data_value, 
  attributes_data_writable: attributes_data_writable, 
  attributes_data_enumerable: attributes_data_enumerable, 
  attributes_data_configurable: attributes_data_configurable, 
  attributes_accessor_get: attributes_accessor_get, 
  attributes_accessor_set: attributes_accessor_set, 
  attributes_accessor_enumerable: attributes_accessor_enumerable, 
  attributes_accessor_configurable: attributes_accessor_configurable, 
  Coq_attributes_data_of: Coq_attributes_data_of, 
  Coq_attributes_accessor_of: Coq_attributes_accessor_of, 
  descriptor_value: descriptor_value, 
  descriptor_writable: descriptor_writable, 
  descriptor_get: descriptor_get, 
  descriptor_set: descriptor_set, 
  descriptor_enumerable: descriptor_enumerable, 
  descriptor_configurable: descriptor_configurable, 
  Coq_full_descriptor_undef: Coq_full_descriptor_undef, 
  Coq_full_descriptor_some: Coq_full_descriptor_some, 
  Coq_mutability_uninitialized_immutable: Coq_mutability_uninitialized_immutable, 
  Coq_mutability_immutable: Coq_mutability_immutable, 
  Coq_mutability_nondeletable: Coq_mutability_nondeletable, 
  Coq_mutability_deletable: Coq_mutability_deletable, 
  Coq_env_record_decl: Coq_env_record_decl, 
  Coq_env_record_object: Coq_env_record_object, 
  env_loc_global_env_record: env_loc_global_env_record, 
  execution_ctx_lexical_env: execution_ctx_lexical_env, 
  execution_ctx_variable_env: execution_ctx_variable_env, 
  execution_ctx_this_binding: execution_ctx_this_binding, 
  execution_ctx_strict: execution_ctx_strict, 
  Coq_ref_base_type_value: Coq_ref_base_type_value, 
  Coq_ref_base_type_env_loc: Coq_ref_base_type_env_loc, 
  ref_base: ref_base, 
  ref_name: ref_name, 
  ref_strict: ref_strict, 
  object_proto_: object_proto_, 
  object_class_: object_class_, 
  object_extensible_: object_extensible_, 
  object_prim_value_: object_prim_value_, 
  object_properties_: object_properties_, 
  object_get_: object_get_, 
  object_get_own_prop_: object_get_own_prop_, 
  object_get_prop_: object_get_prop_, 
  object_put_: object_put_, 
  object_can_put_: object_can_put_, 
  object_has_prop_: object_has_prop_, 
  object_delete_: object_delete_, 
  object_default_value_: object_default_value_, 
  object_define_own_prop_: object_define_own_prop_, 
  object_construct_: object_construct_, 
  object_call_: object_call_, 
  object_has_instance_: object_has_instance_, 
  object_scope_: object_scope_, 
  object_formal_parameters_: object_formal_parameters_, 
  object_code_: object_code_, 
  object_target_function_: object_target_function_, 
  object_bound_this_: object_bound_this_, 
  object_bound_args_: object_bound_args_, 
  object_parameter_map_: object_parameter_map_, 
  Coq_delete_event: Coq_delete_event, 
  Coq_mutateproto_event: Coq_mutateproto_event, 
  Coq_enumchange_event: Coq_enumchange_event, 
  state_object_heap: state_object_heap, 
  state_env_record_heap: state_env_record_heap, 
  Coq_restype_normal: Coq_restype_normal, 
  Coq_restype_break: Coq_restype_break, 
  Coq_restype_continue: Coq_restype_continue, 
  Coq_restype_return: Coq_restype_return, 
  Coq_restype_throw: Coq_restype_throw, 
  Coq_resvalue_empty: Coq_resvalue_empty, 
  Coq_resvalue_value: Coq_resvalue_value, 
  Coq_resvalue_ref: Coq_resvalue_ref, 
  res_type: res_type, 
  res_value: res_value, 
  res_label: res_label, 
  res_ref: res_ref, 
  res_val: res_val, 
  res_normal: res_normal, 
  res_empty: res_empty, 
  res_break: res_break, 
  res_continue: res_continue, 
  res_return: res_return, 
  res_throw: res_throw, 
  Coq_out_div: Coq_out_div, 
  Coq_out_ter: Coq_out_ter, 
  out_void: out_void, 
  Coq_specret_val: Coq_specret_val, 
  Coq_specret_out: Coq_specret_out, 
  Coq_codetype_func: Coq_codetype_func, 
  Coq_codetype_global: Coq_codetype_global, 
  Coq_codetype_eval: Coq_codetype_eval};
})();

/* --------------------- tests/jsref/JsSyntaxAux.unlog.js --------------------- */

var JsSyntaxAux = (function() {
with (JsSyntax) {
with (LibList) {

var int_of_native_error = function (e) {
  switch (e.tag) {
    case "Coq_native_error_eval":
      return (1);
    case "Coq_native_error_range":
      return (2);
    case "Coq_native_error_ref":
      return (3);
    case "Coq_native_error_syntax":
      return (4);
    case "Coq_native_error_type":
      return (5);
    case "Coq_native_error_uri":
      return (6);
  }
  
};

var int_of_mathop = function (o) {
  switch (o.tag) {
    case "Coq_mathop_abs":
      return (1);
  }
  
};

var int_of_prealloc = function (p) {
  switch (p.tag) {
    case "Coq_prealloc_global":
      return (1);
    case "Coq_prealloc_global_eval":
      return (2);
    case "Coq_prealloc_global_parse_int":
      return (3);
    case "Coq_prealloc_global_parse_float":
      return (4);
    case "Coq_prealloc_global_is_finite":
      return (5);
    case "Coq_prealloc_global_is_nan":
      return (6);
    case "Coq_prealloc_global_decode_uri":
      return (7);
    case "Coq_prealloc_global_decode_uri_component":
      return (8);
    case "Coq_prealloc_global_encode_uri":
      return (9);
    case "Coq_prealloc_global_encode_uri_component":
      return (10);
    case "Coq_prealloc_object":
      return (11);
    case "Coq_prealloc_object_get_proto_of":
      return (12);
    case "Coq_prealloc_object_get_own_prop_descriptor":
      return (13);
    case "Coq_prealloc_object_get_own_prop_name":
      return (14);
    case "Coq_prealloc_object_create":
      return (15);
    case "Coq_prealloc_object_define_prop":
      return (16);
    case "Coq_prealloc_object_define_props":
      return (17);
    case "Coq_prealloc_object_seal":
      return (18);
    case "Coq_prealloc_object_freeze":
      return (19);
    case "Coq_prealloc_object_prevent_extensions":
      return (20);
    case "Coq_prealloc_object_is_sealed":
      return (21);
    case "Coq_prealloc_object_is_frozen":
      return (22);
    case "Coq_prealloc_object_is_extensible":
      return (23);
    case "Coq_prealloc_object_keys":
      return (24);
    case "Coq_prealloc_object_keys_call":
      return (25);
    case "Coq_prealloc_object_proto":
      return (26);
    case "Coq_prealloc_object_proto_to_string":
      return (27);
    case "Coq_prealloc_object_proto_value_of":
      return (28);
    case "Coq_prealloc_object_proto_has_own_prop":
      return (29);
    case "Coq_prealloc_object_proto_is_prototype_of":
      return (30);
    case "Coq_prealloc_object_proto_prop_is_enumerable":
      return (31);
    case "Coq_prealloc_function":
      return (32);
    case "Coq_prealloc_function_proto":
      return (33);
    case "Coq_prealloc_function_proto_to_string":
      return (34);
    case "Coq_prealloc_function_proto_apply":
      return (35);
    case "Coq_prealloc_function_proto_call":
      return (36);
    case "Coq_prealloc_function_proto_bind":
      return (37);
    case "Coq_prealloc_bool":
      return (38);
    case "Coq_prealloc_bool_proto":
      return (39);
    case "Coq_prealloc_bool_proto_to_string":
      return (40);
    case "Coq_prealloc_bool_proto_value_of":
      return (41);
    case "Coq_prealloc_number":
      return (42);
    case "Coq_prealloc_number_proto":
      return (43);
    case "Coq_prealloc_number_proto_to_string":
      return (44);
    case "Coq_prealloc_number_proto_value_of":
      return (45);
    case "Coq_prealloc_number_proto_to_fixed":
      return (46);
    case "Coq_prealloc_number_proto_to_exponential":
      return (47);
    case "Coq_prealloc_number_proto_to_precision":
      return (48);
    case "Coq_prealloc_array":
      return (49);
    case "Coq_prealloc_array_is_array":
      return (50);
    case "Coq_prealloc_array_proto":
      return (51);
    case "Coq_prealloc_array_proto_to_string":
      return (52);
    case "Coq_prealloc_array_proto_join":
      return (53);
    case "Coq_prealloc_array_proto_pop":
      return (54);
    case "Coq_prealloc_array_proto_push":
      return (55);
    case "Coq_prealloc_string":
      return (56);
    case "Coq_prealloc_string_proto":
      return (57);
    case "Coq_prealloc_string_proto_to_string":
      return (58);
    case "Coq_prealloc_string_proto_value_of":
      return (59);
    case "Coq_prealloc_string_proto_char_at":
      return (60);
    case "Coq_prealloc_string_proto_char_code_at":
      return (61);
    case "Coq_prealloc_math":
      return (62);
    case "Coq_prealloc_date":
      return (63);
    case "Coq_prealloc_regexp":
      return (64);
    case "Coq_prealloc_error":
      return (65);
    case "Coq_prealloc_error_proto":
      return (66);
    case "Coq_prealloc_error_proto_to_string":
      return (67);
    case "Coq_prealloc_throw_type_error":
      return (68);
    case "Coq_prealloc_json":
      return (69);
    case "Coq_prealloc_mathop":
      var o = p.mathop;
      return ((100 + int_of_mathop(o)));
    case "Coq_prealloc_native_error":
      var e = p.error;
      return ((200 + int_of_native_error(e)));
    case "Coq_prealloc_native_error_proto":
      var e = p.error;
      return ((300 + int_of_native_error(e)));
  }
  
};

var prealloc_cmp = function (p1, p2) {
  return (int_compare(int_of_prealloc(p1), int_of_prealloc(p2)));
};

var object_loc_cmp = function (l1, l2) {
  switch (l1.tag) {
    case "Coq_object_loc_normal":
      var n1 = l1.address;
      switch (l2.tag) {
        case "Coq_object_loc_normal":
          var n2 = l2.address;
          return (int_compare(n1, n2));
        case "Coq_object_loc_prealloc":
          var p2 = l2.prealloc;
          return (1);
      }
      
    case "Coq_object_loc_prealloc":
      var p1 = l1.prealloc;
      switch (l2.tag) {
        case "Coq_object_loc_normal":
          var n2 = l2.address;
          return (-1);
        case "Coq_object_loc_prealloc":
          var p2 = l2.prealloc;
          return (prealloc_cmp(p1, p2));
      }
      
  }
  
};

var object_create = function (vproto, sclass, bextens, p) {
  return (
    {
      object_proto_: vproto,
      object_class_: sclass,
      object_extensible_: bextens,
      object_prim_value_: None(),
      object_properties_: p,
      object_get_: Coq_builtin_get_default(),
      object_get_own_prop_: Coq_builtin_get_own_prop_default(),
      object_get_prop_: Coq_builtin_get_prop_default(),
      object_put_: Coq_builtin_put_default(),
      object_can_put_: Coq_builtin_can_put_default(),
      object_has_prop_: Coq_builtin_has_prop_default(),
      object_delete_: Coq_builtin_delete_default(),
      object_default_value_: Coq_builtin_default_value_default(),
      object_define_own_prop_: Coq_builtin_define_own_prop_default(),
      object_construct_: None(),
      object_call_: None(),
      object_has_instance_: None(),
      object_scope_: None(),
      object_formal_parameters_: None(),
      object_code_: None(),
      object_target_function_: None(),
      object_bound_this_: None(),
      object_bound_args_: None(),
      object_parameter_map_: None()
    });
};

var object_set_proto = function (o, v) {
  var x1 = o.object_proto_, x2 = o.object_class_, x3 = o.object_extensible_,
    x4 = o.object_prim_value_, x5 = o.object_properties_, x6 = o.object_get_,
    x7 = o.object_get_own_prop_, x8 = o.object_get_prop_, x9 = o.object_put_,
    x10 = o.object_can_put_, x11 = o.object_has_prop_,
    x12 = o.object_delete_, x13 = o.object_default_value_,
    x14 = o.object_define_own_prop_, x15 = o.object_construct_,
    x16 = o.object_call_, x17 = o.object_has_instance_,
    x18 = o.object_scope_, x19 = o.object_formal_parameters_,
    x20 = o.object_code_, x21 = o.object_target_function_,
    x22 = o.object_bound_this_, x23 = o.object_bound_args_,
    x24 = o.object_parameter_map_;
  return (
    {
      object_proto_: v,
      object_class_: x2,
      object_extensible_: x3,
      object_prim_value_: x4,
      object_properties_: x5,
      object_get_: x6,
      object_get_own_prop_: x7,
      object_get_prop_: x8,
      object_put_: x9,
      object_can_put_: x10,
      object_has_prop_: x11,
      object_delete_: x12,
      object_default_value_: x13,
      object_define_own_prop_: x14,
      object_construct_: x15,
      object_call_: x16,
      object_has_instance_: x17,
      object_scope_: x18,
      object_formal_parameters_: x19,
      object_code_: x20,
      object_target_function_: x21,
      object_bound_this_: x22,
      object_bound_args_: x23,
      object_parameter_map_: x24
    });
};

var object_set_class = function (o, s) {
  var x1 = o.object_proto_, x2 = o.object_class_, x3 = o.object_extensible_,
    x4 = o.object_prim_value_, x5 = o.object_properties_, x6 = o.object_get_,
    x7 = o.object_get_own_prop_, x8 = o.object_get_prop_, x9 = o.object_put_,
    x10 = o.object_can_put_, x11 = o.object_has_prop_,
    x12 = o.object_delete_, x13 = o.object_default_value_,
    x14 = o.object_define_own_prop_, x15 = o.object_construct_,
    x16 = o.object_call_, x17 = o.object_has_instance_,
    x18 = o.object_scope_, x19 = o.object_formal_parameters_,
    x20 = o.object_code_, x21 = o.object_target_function_,
    x22 = o.object_bound_this_, x23 = o.object_bound_args_,
    x24 = o.object_parameter_map_;
  return (
    {
      object_proto_: x1,
      object_class_: s,
      object_extensible_: x3,
      object_prim_value_: x4,
      object_properties_: x5,
      object_get_: x6,
      object_get_own_prop_: x7,
      object_get_prop_: x8,
      object_put_: x9,
      object_can_put_: x10,
      object_has_prop_: x11,
      object_delete_: x12,
      object_default_value_: x13,
      object_define_own_prop_: x14,
      object_construct_: x15,
      object_call_: x16,
      object_has_instance_: x17,
      object_scope_: x18,
      object_formal_parameters_: x19,
      object_code_: x20,
      object_target_function_: x21,
      object_bound_this_: x22,
      object_bound_args_: x23,
      object_parameter_map_: x24
    });
};

var object_set_extensible = function (o, b) {
  var x1 = o.object_proto_, x2 = o.object_class_, x3 = o.object_extensible_,
    x4 = o.object_prim_value_, x5 = o.object_properties_, x6 = o.object_get_,
    x7 = o.object_get_own_prop_, x8 = o.object_get_prop_, x9 = o.object_put_,
    x10 = o.object_can_put_, x11 = o.object_has_prop_,
    x12 = o.object_delete_, x13 = o.object_default_value_,
    x14 = o.object_define_own_prop_, x15 = o.object_construct_,
    x16 = o.object_call_, x17 = o.object_has_instance_,
    x18 = o.object_scope_, x19 = o.object_formal_parameters_,
    x20 = o.object_code_, x21 = o.object_target_function_,
    x22 = o.object_bound_this_, x23 = o.object_bound_args_,
    x24 = o.object_parameter_map_;
  return (
    {
      object_proto_: x1,
      object_class_: x2,
      object_extensible_: b,
      object_prim_value_: x4,
      object_properties_: x5,
      object_get_: x6,
      object_get_own_prop_: x7,
      object_get_prop_: x8,
      object_put_: x9,
      object_can_put_: x10,
      object_has_prop_: x11,
      object_delete_: x12,
      object_default_value_: x13,
      object_define_own_prop_: x14,
      object_construct_: x15,
      object_call_: x16,
      object_has_instance_: x17,
      object_scope_: x18,
      object_formal_parameters_: x19,
      object_code_: x20,
      object_target_function_: x21,
      object_bound_this_: x22,
      object_bound_args_: x23,
      object_parameter_map_: x24
    });
};

var object_with_primitive_value = function (o, v) {
  var x1 = o.object_proto_, x2 = o.object_class_, x3 = o.object_extensible_,
    x4 = o.object_prim_value_, x5 = o.object_properties_, x6 = o.object_get_,
    x7 = o.object_get_own_prop_, x8 = o.object_get_prop_, x9 = o.object_put_,
    x10 = o.object_can_put_, x11 = o.object_has_prop_,
    x12 = o.object_delete_, x13 = o.object_default_value_,
    x14 = o.object_define_own_prop_, x15 = o.object_construct_,
    x16 = o.object_call_, x17 = o.object_has_instance_,
    x18 = o.object_scope_, x19 = o.object_formal_parameters_,
    x20 = o.object_code_, x21 = o.object_target_function_,
    x22 = o.object_bound_this_, x23 = o.object_bound_args_,
    x24 = o.object_parameter_map_;
  return (
    {
      object_proto_: x1,
      object_class_: x2,
      object_extensible_: x3,
      object_prim_value_: Some(v),
      object_properties_: x5,
      object_get_: x6,
      object_get_own_prop_: x7,
      object_get_prop_: x8,
      object_put_: x9,
      object_can_put_: x10,
      object_has_prop_: x11,
      object_delete_: x12,
      object_default_value_: x13,
      object_define_own_prop_: x14,
      object_construct_: x15,
      object_call_: x16,
      object_has_instance_: x17,
      object_scope_: x18,
      object_formal_parameters_: x19,
      object_code_: x20,
      object_target_function_: x21,
      object_bound_this_: x22,
      object_bound_args_: x23,
      object_parameter_map_: x24
    });
};

var object_with_extension = function (o, b) {
  var x1 = o.object_proto_, x2 = o.object_class_, x3 = o.object_extensible_,
    x4 = o.object_prim_value_, x5 = o.object_properties_, x6 = o.object_get_,
    x7 = o.object_get_own_prop_, x8 = o.object_get_prop_, x9 = o.object_put_,
    x10 = o.object_can_put_, x11 = o.object_has_prop_,
    x12 = o.object_delete_, x13 = o.object_default_value_,
    x14 = o.object_define_own_prop_, x15 = o.object_construct_,
    x16 = o.object_call_, x17 = o.object_has_instance_,
    x18 = o.object_scope_, x19 = o.object_formal_parameters_,
    x20 = o.object_code_, x21 = o.object_target_function_,
    x22 = o.object_bound_this_, x23 = o.object_bound_args_,
    x24 = o.object_parameter_map_;
  return (
    {
      object_proto_: x1,
      object_class_: x2,
      object_extensible_: b,
      object_prim_value_: x4,
      object_properties_: x5,
      object_get_: x6,
      object_get_own_prop_: x7,
      object_get_prop_: x8,
      object_put_: x9,
      object_can_put_: x10,
      object_has_prop_: x11,
      object_delete_: x12,
      object_default_value_: x13,
      object_define_own_prop_: x14,
      object_construct_: x15,
      object_call_: x16,
      object_has_instance_: x17,
      object_scope_: x18,
      object_formal_parameters_: x19,
      object_code_: x20,
      object_target_function_: x21,
      object_bound_this_: x22,
      object_bound_args_: x23,
      object_parameter_map_: x24
    });
};

var object_with_properties = function (o, properties) {
  var x1 = o.object_proto_, x2 = o.object_class_, x3 = o.object_extensible_,
    x4 = o.object_prim_value_, x5 = o.object_properties_, x6 = o.object_get_,
    x7 = o.object_get_own_prop_, x8 = o.object_get_prop_, x9 = o.object_put_,
    x10 = o.object_can_put_, x11 = o.object_has_prop_,
    x12 = o.object_delete_, x13 = o.object_default_value_,
    x14 = o.object_define_own_prop_, x15 = o.object_construct_,
    x16 = o.object_call_, x17 = o.object_has_instance_,
    x18 = o.object_scope_, x19 = o.object_formal_parameters_,
    x20 = o.object_code_, x21 = o.object_target_function_,
    x22 = o.object_bound_this_, x23 = o.object_bound_args_,
    x24 = o.object_parameter_map_;
  return (
    {
      object_proto_: x1,
      object_class_: x2,
      object_extensible_: x3,
      object_prim_value_: x4,
      object_properties_: properties,
      object_get_: x6,
      object_get_own_prop_: x7,
      object_get_prop_: x8,
      object_put_: x9,
      object_can_put_: x10,
      object_has_prop_: x11,
      object_delete_: x12,
      object_default_value_: x13,
      object_define_own_prop_: x14,
      object_construct_: x15,
      object_call_: x16,
      object_has_instance_: x17,
      object_scope_: x18,
      object_formal_parameters_: x19,
      object_code_: x20,
      object_target_function_: x21,
      object_bound_this_: x22,
      object_bound_args_: x23,
      object_parameter_map_: x24
    });
};

var object_with_get = function (o, g) {
  var x1 = o.object_proto_, x2 = o.object_class_, x3 = o.object_extensible_,
    x4 = o.object_prim_value_, x5 = o.object_properties_, x6 = o.object_get_,
    x7 = o.object_get_own_prop_, x8 = o.object_get_prop_, x9 = o.object_put_,
    x10 = o.object_can_put_, x11 = o.object_has_prop_,
    x12 = o.object_delete_, x13 = o.object_default_value_,
    x14 = o.object_define_own_prop_, x15 = o.object_construct_,
    x16 = o.object_call_, x17 = o.object_has_instance_,
    x18 = o.object_scope_, x19 = o.object_formal_parameters_,
    x20 = o.object_code_, x21 = o.object_target_function_,
    x22 = o.object_bound_this_, x23 = o.object_bound_args_,
    x24 = o.object_parameter_map_;
  return (
    {
      object_proto_: x1,
      object_class_: x2,
      object_extensible_: x3,
      object_prim_value_: x4,
      object_properties_: x5,
      object_get_: g,
      object_get_own_prop_: x7,
      object_get_prop_: x8,
      object_put_: x9,
      object_can_put_: x10,
      object_has_prop_: x11,
      object_delete_: x12,
      object_default_value_: x13,
      object_define_own_prop_: x14,
      object_construct_: x15,
      object_call_: x16,
      object_has_instance_: x17,
      object_scope_: x18,
      object_formal_parameters_: x19,
      object_code_: x20,
      object_target_function_: x21,
      object_bound_this_: x22,
      object_bound_args_: x23,
      object_parameter_map_: x24
    });
};

var object_with_get_own_property = function (o, gop) {
  var x1 = o.object_proto_, x2 = o.object_class_, x3 = o.object_extensible_,
    x4 = o.object_prim_value_, x5 = o.object_properties_, x6 = o.object_get_,
    x7 = o.object_get_own_prop_, x8 = o.object_get_prop_, x9 = o.object_put_,
    x10 = o.object_can_put_, x11 = o.object_has_prop_,
    x12 = o.object_delete_, x13 = o.object_default_value_,
    x14 = o.object_define_own_prop_, x15 = o.object_construct_,
    x16 = o.object_call_, x17 = o.object_has_instance_,
    x18 = o.object_scope_, x19 = o.object_formal_parameters_,
    x20 = o.object_code_, x21 = o.object_target_function_,
    x22 = o.object_bound_this_, x23 = o.object_bound_args_,
    x24 = o.object_parameter_map_;
  return (
    {
      object_proto_: x1,
      object_class_: x2,
      object_extensible_: x3,
      object_prim_value_: x4,
      object_properties_: x5,
      object_get_: x6,
      object_get_own_prop_: gop,
      object_get_prop_: x8,
      object_put_: x9,
      object_can_put_: x10,
      object_has_prop_: x11,
      object_delete_: x12,
      object_default_value_: x13,
      object_define_own_prop_: x14,
      object_construct_: x15,
      object_call_: x16,
      object_has_instance_: x17,
      object_scope_: x18,
      object_formal_parameters_: x19,
      object_code_: x20,
      object_target_function_: x21,
      object_bound_this_: x22,
      object_bound_args_: x23,
      object_parameter_map_: x24
    });
};

var object_with_invokation = function (o, constr, call0, has_instance) {
  var x1 = o.object_proto_, x2 = o.object_class_, x3 = o.object_extensible_,
    x4 = o.object_prim_value_, x5 = o.object_properties_, x6 = o.object_get_,
    x7 = o.object_get_own_prop_, x8 = o.object_get_prop_, x9 = o.object_put_,
    x10 = o.object_can_put_, x11 = o.object_has_prop_,
    x12 = o.object_delete_, x13 = o.object_default_value_,
    x14 = o.object_define_own_prop_, x15 = o.object_construct_,
    x16 = o.object_call_, x17 = o.object_has_instance_,
    x18 = o.object_scope_, x19 = o.object_formal_parameters_,
    x20 = o.object_code_, x21 = o.object_target_function_,
    x22 = o.object_bound_this_, x23 = o.object_bound_args_,
    x24 = o.object_parameter_map_;
  return (
    {
      object_proto_: x1,
      object_class_: x2,
      object_extensible_: x3,
      object_prim_value_: x4,
      object_properties_: x5,
      object_get_: x6,
      object_get_own_prop_: x7,
      object_get_prop_: x8,
      object_put_: x9,
      object_can_put_: x10,
      object_has_prop_: x11,
      object_delete_: x12,
      object_default_value_: x13,
      object_define_own_prop_: x14,
      object_construct_: constr,
      object_call_: call0,
      object_has_instance_: has_instance,
      object_scope_: x18,
      object_formal_parameters_: x19,
      object_code_: x20,
      object_target_function_: x21,
      object_bound_this_: x22,
      object_bound_args_: x23,
      object_parameter_map_: x24
    });
};

var object_with_scope = function (o, scope) {
  var x1 = o.object_proto_, x2 = o.object_class_, x3 = o.object_extensible_,
    x4 = o.object_prim_value_, x5 = o.object_properties_, x6 = o.object_get_,
    x7 = o.object_get_own_prop_, x8 = o.object_get_prop_, x9 = o.object_put_,
    x10 = o.object_can_put_, x11 = o.object_has_prop_,
    x12 = o.object_delete_, x13 = o.object_default_value_,
    x14 = o.object_define_own_prop_, x15 = o.object_construct_,
    x16 = o.object_call_, x17 = o.object_has_instance_,
    x18 = o.object_scope_, x19 = o.object_formal_parameters_,
    x20 = o.object_code_, x21 = o.object_target_function_,
    x22 = o.object_bound_this_, x23 = o.object_bound_args_,
    x24 = o.object_parameter_map_;
  return (
    {
      object_proto_: x1,
      object_class_: x2,
      object_extensible_: x3,
      object_prim_value_: x4,
      object_properties_: x5,
      object_get_: x6,
      object_get_own_prop_: x7,
      object_get_prop_: x8,
      object_put_: x9,
      object_can_put_: x10,
      object_has_prop_: x11,
      object_delete_: x12,
      object_default_value_: x13,
      object_define_own_prop_: x14,
      object_construct_: x15,
      object_call_: x16,
      object_has_instance_: x17,
      object_scope_: scope,
      object_formal_parameters_: x19,
      object_code_: x20,
      object_target_function_: x21,
      object_bound_this_: x22,
      object_bound_args_: x23,
      object_parameter_map_: x24
    });
};

var object_with_formal_params = function (o, params) {
  var x1 = o.object_proto_, x2 = o.object_class_, x3 = o.object_extensible_,
    x4 = o.object_prim_value_, x5 = o.object_properties_, x6 = o.object_get_,
    x7 = o.object_get_own_prop_, x8 = o.object_get_prop_, x9 = o.object_put_,
    x10 = o.object_can_put_, x11 = o.object_has_prop_,
    x12 = o.object_delete_, x13 = o.object_default_value_,
    x14 = o.object_define_own_prop_, x15 = o.object_construct_,
    x16 = o.object_call_, x17 = o.object_has_instance_,
    x18 = o.object_scope_, x19 = o.object_formal_parameters_,
    x20 = o.object_code_, x21 = o.object_target_function_,
    x22 = o.object_bound_this_, x23 = o.object_bound_args_,
    x24 = o.object_parameter_map_;
  return (
    {
      object_proto_: x1,
      object_class_: x2,
      object_extensible_: x3,
      object_prim_value_: x4,
      object_properties_: x5,
      object_get_: x6,
      object_get_own_prop_: x7,
      object_get_prop_: x8,
      object_put_: x9,
      object_can_put_: x10,
      object_has_prop_: x11,
      object_delete_: x12,
      object_default_value_: x13,
      object_define_own_prop_: x14,
      object_construct_: x15,
      object_call_: x16,
      object_has_instance_: x17,
      object_scope_: x18,
      object_formal_parameters_: params,
      object_code_: x20,
      object_target_function_: x21,
      object_bound_this_: x22,
      object_bound_args_: x23,
      object_parameter_map_: x24
    });
};

var object_with_details = function (o, scope, params, code, target, boundthis, boundargs, paramsmap) {
  var x1 = o.object_proto_, x2 = o.object_class_, x3 = o.object_extensible_,
    x4 = o.object_prim_value_, x5 = o.object_properties_, x6 = o.object_get_,
    x7 = o.object_get_own_prop_, x8 = o.object_get_prop_, x9 = o.object_put_,
    x10 = o.object_can_put_, x11 = o.object_has_prop_,
    x12 = o.object_delete_, x13 = o.object_default_value_,
    x14 = o.object_define_own_prop_, x15 = o.object_construct_,
    x16 = o.object_call_, x17 = o.object_has_instance_,
    x18 = o.object_scope_, x19 = o.object_formal_parameters_,
    x20 = o.object_code_, x21 = o.object_target_function_,
    x22 = o.object_bound_this_, x23 = o.object_bound_args_,
    x24 = o.object_parameter_map_;
  return (
    {
      object_proto_: x1,
      object_class_: x2,
      object_extensible_: x3,
      object_prim_value_: x4,
      object_properties_: x5,
      object_get_: x6,
      object_get_own_prop_: x7,
      object_get_prop_: x8,
      object_put_: x9,
      object_can_put_: x10,
      object_has_prop_: x11,
      object_delete_: x12,
      object_default_value_: x13,
      object_define_own_prop_: x14,
      object_construct_: x15,
      object_call_: x16,
      object_has_instance_: x17,
      object_scope_: scope,
      object_formal_parameters_: params,
      object_code_: code,
      object_target_function_: target,
      object_bound_this_: boundthis,
      object_bound_args_: boundargs,
      object_parameter_map_: paramsmap
    });
};

var object_for_array = function (o, defineownproperty) {
  var x1 = o.object_proto_, x2 = o.object_class_, x3 = o.object_extensible_,
    x4 = o.object_prim_value_, x5 = o.object_properties_, x6 = o.object_get_,
    x7 = o.object_get_own_prop_, x8 = o.object_get_prop_, x9 = o.object_put_,
    x10 = o.object_can_put_, x11 = o.object_has_prop_,
    x12 = o.object_delete_, x13 = o.object_default_value_,
    x14 = o.object_define_own_prop_, x15 = o.object_construct_,
    x16 = o.object_call_, x17 = o.object_has_instance_,
    x18 = o.object_scope_, x19 = o.object_formal_parameters_,
    x20 = o.object_code_, x21 = o.object_target_function_,
    x22 = o.object_bound_this_, x23 = o.object_bound_args_,
    x24 = o.object_parameter_map_;
  return (
    {
      object_proto_: x1,
      object_class_: x2,
      object_extensible_: x3,
      object_prim_value_: x4,
      object_properties_: x5,
      object_get_: x6,
      object_get_own_prop_: x7,
      object_get_prop_: x8,
      object_put_: x9,
      object_can_put_: x10,
      object_has_prop_: x11,
      object_delete_: x12,
      object_default_value_: x13,
      object_define_own_prop_: defineownproperty,
      object_construct_: x15,
      object_call_: x16,
      object_has_instance_: x17,
      object_scope_: x18,
      object_formal_parameters_: x19,
      object_code_: x20,
      object_target_function_: x21,
      object_bound_this_: x22,
      object_bound_args_: x23,
      object_parameter_map_: x24
    });
};

var object_for_args_object = function (o, paramsmap, get, getownproperty, defineownproperty, delete_prop) {
  var x1 = o.object_proto_, x2 = o.object_class_, x3 = o.object_extensible_,
    x4 = o.object_prim_value_, x5 = o.object_properties_, x6 = o.object_get_,
    x7 = o.object_get_own_prop_, x8 = o.object_get_prop_, x9 = o.object_put_,
    x10 = o.object_can_put_, x11 = o.object_has_prop_,
    x12 = o.object_delete_, x13 = o.object_default_value_,
    x14 = o.object_define_own_prop_, x15 = o.object_construct_,
    x16 = o.object_call_, x17 = o.object_has_instance_,
    x18 = o.object_scope_, x19 = o.object_formal_parameters_,
    x20 = o.object_code_, x21 = o.object_target_function_,
    x22 = o.object_bound_this_, x23 = o.object_bound_args_,
    x24 = o.object_parameter_map_;
  return (
    {
      object_proto_: x1,
      object_class_: x2,
      object_extensible_: x3,
      object_prim_value_: x4,
      object_properties_: x5,
      object_get_: get,
      object_get_own_prop_: getownproperty,
      object_get_prop_: x8,
      object_put_: x9,
      object_can_put_: x10,
      object_has_prop_: x11,
      object_delete_: delete_prop,
      object_default_value_: x13,
      object_define_own_prop_: defineownproperty,
      object_construct_: x15,
      object_call_: x16,
      object_has_instance_: x17,
      object_scope_: x18,
      object_formal_parameters_: x19,
      object_code_: x20,
      object_target_function_: x21,
      object_bound_this_: x22,
      object_bound_args_: x23,
      object_parameter_map_: Some(paramsmap)
    });
};

var mathop_compare = function (m1, m2) {
  switch (m1.tag) {
    case "Coq_mathop_abs":
      switch (m2.tag) {
        case "Coq_mathop_abs":
          return (true);
      }
      
  }
  
};

var prealloc_compare = function (bl1, bl2) {
  return (_compare_JsSyntax_prealloc(bl1, bl2));
};

var object_loc_compare = function (l1, l2) {
  switch (l1.tag) {
    case "Coq_object_loc_normal":
      var ln1 = l1.address;
      switch (l2.tag) {
        case "Coq_object_loc_normal":
          var ln2 = l2.address;
          return (nat_eq(ln1, ln2));
        case "Coq_object_loc_prealloc":
          var p = l2.prealloc;
          return (false);
      }
      
    case "Coq_object_loc_prealloc":
      var bl1 = l1.prealloc;
      switch (l2.tag) {
        case "Coq_object_loc_normal":
          var n = l2.address;
          return (false);
        case "Coq_object_loc_prealloc":
          var bl2 = l2.prealloc;
          return (prealloc_compare(bl1, bl2));
      }
      
  }
  
};

var prim_compare = function (w1, w2) {
  switch (w1.tag) {
    case "Coq_prim_undef":
      switch (w2.tag) {
        case "Coq_prim_undef":
          return (true);
        case "Coq_prim_null":
          return (false);
        case "Coq_prim_bool":
          var b = w2.value;
          return (false);
        case "Coq_prim_number":
          var n = w2.value;
          return (false);
        case "Coq_prim_string":
          var s = w2.value;
          return (false);
      }
      
    case "Coq_prim_null":
      switch (w2.tag) {
        case "Coq_prim_undef":
          return (false);
        case "Coq_prim_null":
          return (true);
        case "Coq_prim_bool":
          var b = w2.value;
          return (false);
        case "Coq_prim_number":
          var n = w2.value;
          return (false);
        case "Coq_prim_string":
          var s = w2.value;
          return (false);
      }
      
    case "Coq_prim_bool":
      var b1 = w1.value;
      switch (w2.tag) {
        case "Coq_prim_undef":
          return (false);
        case "Coq_prim_null":
          return (false);
        case "Coq_prim_bool":
          var b2 = w2.value;
          return (bool_eq(b1, b2));
        case "Coq_prim_number":
          var n = w2.value;
          return (false);
        case "Coq_prim_string":
          var s = w2.value;
          return (false);
      }
      
    case "Coq_prim_number":
      var n1 = w1.value;
      switch (w2.tag) {
        case "Coq_prim_undef":
          return (false);
        case "Coq_prim_null":
          return (false);
        case "Coq_prim_bool":
          var b = w2.value;
          return (false);
        case "Coq_prim_number":
          var n2 = w2.value;
          return ((n1 === n2));
        case "Coq_prim_string":
          var s = w2.value;
          return (false);
      }
      
    case "Coq_prim_string":
      var s1 = w1.value;
      switch (w2.tag) {
        case "Coq_prim_undef":
          return (false);
        case "Coq_prim_null":
          return (false);
        case "Coq_prim_bool":
          var b = w2.value;
          return (false);
        case "Coq_prim_number":
          var n = w2.value;
          return (false);
        case "Coq_prim_string":
          var s2 = w2.value;
          return (string_eq(s1, s2));
      }
      
  }
  
};

var value_compare = function (v1, v2) {
  switch (v1.tag) {
    case "Coq_value_prim":
      var w1 = v1.value;
      switch (v2.tag) {
        case "Coq_value_prim":
          var w2 = v2.value;
          return (prim_compare(w1, w2));
        case "Coq_value_object":
          var o = v2.value;
          return (false);
      }
      
    case "Coq_value_object":
      var l1 = v1.value;
      switch (v2.tag) {
        case "Coq_value_prim":
          var p = v2.value;
          return (false);
        case "Coq_value_object":
          var l2 = v2.value;
          return (object_loc_compare(l1, l2));
      }
      
  }
  
};

var mutability_compare = function (m1, m2) {
  switch (m1.tag) {
    case "Coq_mutability_uninitialized_immutable":
      switch (m2.tag) {
        case "Coq_mutability_uninitialized_immutable":
          return (true);
        case "Coq_mutability_immutable":
          return (false);
        case "Coq_mutability_nondeletable":
          return (false);
        case "Coq_mutability_deletable":
          return (false);
      }
      
    case "Coq_mutability_immutable":
      switch (m2.tag) {
        case "Coq_mutability_uninitialized_immutable":
          return (false);
        case "Coq_mutability_immutable":
          return (true);
        case "Coq_mutability_nondeletable":
          return (false);
        case "Coq_mutability_deletable":
          return (false);
      }
      
    case "Coq_mutability_nondeletable":
      switch (m2.tag) {
        case "Coq_mutability_uninitialized_immutable":
          return (false);
        case "Coq_mutability_immutable":
          return (false);
        case "Coq_mutability_nondeletable":
          return (true);
        case "Coq_mutability_deletable":
          return (false);
      }
      
    case "Coq_mutability_deletable":
      switch (m2.tag) {
        case "Coq_mutability_uninitialized_immutable":
          return (false);
        case "Coq_mutability_immutable":
          return (false);
        case "Coq_mutability_nondeletable":
          return (false);
        case "Coq_mutability_deletable":
          return (true);
      }
      
  }
  
};

var ref_base_type_compare = function (rb1, rb2) {
  switch (rb1.tag) {
    case "Coq_ref_base_type_value":
      var v1 = rb1.value;
      switch (rb2.tag) {
        case "Coq_ref_base_type_value":
          var v2 = rb2.value;
          return (value_compare(v1, v2));
        case "Coq_ref_base_type_env_loc":
          var e = rb2.value;
          return (false);
      }
      
    case "Coq_ref_base_type_env_loc":
      var l1 = rb1.value;
      switch (rb2.tag) {
        case "Coq_ref_base_type_value":
          var v = rb2.value;
          return (false);
        case "Coq_ref_base_type_env_loc":
          var l2 = rb2.value;
          return (nat_eq(l1, l2));
      }
      
  }
  
};

var ref_compare = function (r1, r2) {
  return (
    (ref_base_type_compare(r1.ref_base, r2.ref_base)
    && (string_eq(r1.ref_name, r2.ref_name)
       && bool_eq(r1.ref_strict, r2.ref_strict))));
};

var type_compare = function (t1, t2) {
  switch (t1.tag) {
    case "Coq_type_undef":
      switch (t2.tag) {
        case "Coq_type_undef":
          return (true);
        case "Coq_type_null":
          return (false);
        case "Coq_type_bool":
          return (false);
        case "Coq_type_number":
          return (false);
        case "Coq_type_string":
          return (false);
        case "Coq_type_object":
          return (false);
      }
      
    case "Coq_type_null":
      switch (t2.tag) {
        case "Coq_type_undef":
          return (false);
        case "Coq_type_null":
          return (true);
        case "Coq_type_bool":
          return (false);
        case "Coq_type_number":
          return (false);
        case "Coq_type_string":
          return (false);
        case "Coq_type_object":
          return (false);
      }
      
    case "Coq_type_bool":
      switch (t2.tag) {
        case "Coq_type_undef":
          return (false);
        case "Coq_type_null":
          return (false);
        case "Coq_type_bool":
          return (true);
        case "Coq_type_number":
          return (false);
        case "Coq_type_string":
          return (false);
        case "Coq_type_object":
          return (false);
      }
      
    case "Coq_type_number":
      switch (t2.tag) {
        case "Coq_type_undef":
          return (false);
        case "Coq_type_null":
          return (false);
        case "Coq_type_bool":
          return (false);
        case "Coq_type_number":
          return (true);
        case "Coq_type_string":
          return (false);
        case "Coq_type_object":
          return (false);
      }
      
    case "Coq_type_string":
      switch (t2.tag) {
        case "Coq_type_undef":
          return (false);
        case "Coq_type_null":
          return (false);
        case "Coq_type_bool":
          return (false);
        case "Coq_type_number":
          return (false);
        case "Coq_type_string":
          return (true);
        case "Coq_type_object":
          return (false);
      }
      
    case "Coq_type_object":
      switch (t2.tag) {
        case "Coq_type_undef":
          return (false);
        case "Coq_type_null":
          return (false);
        case "Coq_type_bool":
          return (false);
        case "Coq_type_number":
          return (false);
        case "Coq_type_string":
          return (false);
        case "Coq_type_object":
          return (true);
      }
      
  }
  
};

var res_with_value = function (r, rv) {
  var rt = r.res_type, old_rv = r.res_value, labopt = r.res_label;
  return ({ res_type: rt,
            res_value: rv,
            res_label: labopt});
};

var resvalue_compare = function (rv1, rv2) {
  switch (rv1.tag) {
    case "Coq_resvalue_empty":
      switch (rv2.tag) {
        case "Coq_resvalue_empty":
          return (true);
        case "Coq_resvalue_value":
          var v = rv2.value;
          return (false);
        case "Coq_resvalue_ref":
          var r = rv2.ref;
          return (false);
      }
      
    case "Coq_resvalue_value":
      var v1 = rv1.value;
      switch (rv2.tag) {
        case "Coq_resvalue_empty":
          return (false);
        case "Coq_resvalue_value":
          var v2 = rv2.value;
          return (value_compare(v1, v2));
        case "Coq_resvalue_ref":
          var r = rv2.ref;
          return (false);
      }
      
    case "Coq_resvalue_ref":
      var r1 = rv1.ref;
      switch (rv2.tag) {
        case "Coq_resvalue_empty":
          return (false);
        case "Coq_resvalue_value":
          var v = rv2.value;
          return (false);
        case "Coq_resvalue_ref":
          var r2 = rv2.ref;
          return (ref_compare(r1, r2));
      }
      
  }
  
};

var binary_op_compare = function (op1, op2) {
  switch (op1.tag) {
    case "Coq_binary_op_mult":
      switch (op2.tag) {
        case "Coq_binary_op_mult":
          return (true);
        case "Coq_binary_op_div":
          return (false);
        case "Coq_binary_op_mod":
          return (false);
        case "Coq_binary_op_add":
          return (false);
        case "Coq_binary_op_sub":
          return (false);
        case "Coq_binary_op_left_shift":
          return (false);
        case "Coq_binary_op_right_shift":
          return (false);
        case "Coq_binary_op_unsigned_right_shift":
          return (false);
        case "Coq_binary_op_lt":
          return (false);
        case "Coq_binary_op_gt":
          return (false);
        case "Coq_binary_op_le":
          return (false);
        case "Coq_binary_op_ge":
          return (false);
        case "Coq_binary_op_instanceof":
          return (false);
        case "Coq_binary_op_in":
          return (false);
        case "Coq_binary_op_equal":
          return (false);
        case "Coq_binary_op_disequal":
          return (false);
        case "Coq_binary_op_strict_equal":
          return (false);
        case "Coq_binary_op_strict_disequal":
          return (false);
        case "Coq_binary_op_bitwise_and":
          return (false);
        case "Coq_binary_op_bitwise_or":
          return (false);
        case "Coq_binary_op_bitwise_xor":
          return (false);
        case "Coq_binary_op_and":
          return (false);
        case "Coq_binary_op_or":
          return (false);
        case "Coq_binary_op_coma":
          return (false);
      }
      
    case "Coq_binary_op_div":
      switch (op2.tag) {
        case "Coq_binary_op_mult":
          return (false);
        case "Coq_binary_op_div":
          return (true);
        case "Coq_binary_op_mod":
          return (false);
        case "Coq_binary_op_add":
          return (false);
        case "Coq_binary_op_sub":
          return (false);
        case "Coq_binary_op_left_shift":
          return (false);
        case "Coq_binary_op_right_shift":
          return (false);
        case "Coq_binary_op_unsigned_right_shift":
          return (false);
        case "Coq_binary_op_lt":
          return (false);
        case "Coq_binary_op_gt":
          return (false);
        case "Coq_binary_op_le":
          return (false);
        case "Coq_binary_op_ge":
          return (false);
        case "Coq_binary_op_instanceof":
          return (false);
        case "Coq_binary_op_in":
          return (false);
        case "Coq_binary_op_equal":
          return (false);
        case "Coq_binary_op_disequal":
          return (false);
        case "Coq_binary_op_strict_equal":
          return (false);
        case "Coq_binary_op_strict_disequal":
          return (false);
        case "Coq_binary_op_bitwise_and":
          return (false);
        case "Coq_binary_op_bitwise_or":
          return (false);
        case "Coq_binary_op_bitwise_xor":
          return (false);
        case "Coq_binary_op_and":
          return (false);
        case "Coq_binary_op_or":
          return (false);
        case "Coq_binary_op_coma":
          return (false);
      }
      
    case "Coq_binary_op_mod":
      switch (op2.tag) {
        case "Coq_binary_op_mult":
          return (false);
        case "Coq_binary_op_div":
          return (false);
        case "Coq_binary_op_mod":
          return (true);
        case "Coq_binary_op_add":
          return (false);
        case "Coq_binary_op_sub":
          return (false);
        case "Coq_binary_op_left_shift":
          return (false);
        case "Coq_binary_op_right_shift":
          return (false);
        case "Coq_binary_op_unsigned_right_shift":
          return (false);
        case "Coq_binary_op_lt":
          return (false);
        case "Coq_binary_op_gt":
          return (false);
        case "Coq_binary_op_le":
          return (false);
        case "Coq_binary_op_ge":
          return (false);
        case "Coq_binary_op_instanceof":
          return (false);
        case "Coq_binary_op_in":
          return (false);
        case "Coq_binary_op_equal":
          return (false);
        case "Coq_binary_op_disequal":
          return (false);
        case "Coq_binary_op_strict_equal":
          return (false);
        case "Coq_binary_op_strict_disequal":
          return (false);
        case "Coq_binary_op_bitwise_and":
          return (false);
        case "Coq_binary_op_bitwise_or":
          return (false);
        case "Coq_binary_op_bitwise_xor":
          return (false);
        case "Coq_binary_op_and":
          return (false);
        case "Coq_binary_op_or":
          return (false);
        case "Coq_binary_op_coma":
          return (false);
      }
      
    case "Coq_binary_op_add":
      switch (op2.tag) {
        case "Coq_binary_op_mult":
          return (false);
        case "Coq_binary_op_div":
          return (false);
        case "Coq_binary_op_mod":
          return (false);
        case "Coq_binary_op_add":
          return (true);
        case "Coq_binary_op_sub":
          return (false);
        case "Coq_binary_op_left_shift":
          return (false);
        case "Coq_binary_op_right_shift":
          return (false);
        case "Coq_binary_op_unsigned_right_shift":
          return (false);
        case "Coq_binary_op_lt":
          return (false);
        case "Coq_binary_op_gt":
          return (false);
        case "Coq_binary_op_le":
          return (false);
        case "Coq_binary_op_ge":
          return (false);
        case "Coq_binary_op_instanceof":
          return (false);
        case "Coq_binary_op_in":
          return (false);
        case "Coq_binary_op_equal":
          return (false);
        case "Coq_binary_op_disequal":
          return (false);
        case "Coq_binary_op_strict_equal":
          return (false);
        case "Coq_binary_op_strict_disequal":
          return (false);
        case "Coq_binary_op_bitwise_and":
          return (false);
        case "Coq_binary_op_bitwise_or":
          return (false);
        case "Coq_binary_op_bitwise_xor":
          return (false);
        case "Coq_binary_op_and":
          return (false);
        case "Coq_binary_op_or":
          return (false);
        case "Coq_binary_op_coma":
          return (false);
      }
      
    case "Coq_binary_op_sub":
      switch (op2.tag) {
        case "Coq_binary_op_mult":
          return (false);
        case "Coq_binary_op_div":
          return (false);
        case "Coq_binary_op_mod":
          return (false);
        case "Coq_binary_op_add":
          return (false);
        case "Coq_binary_op_sub":
          return (true);
        case "Coq_binary_op_left_shift":
          return (false);
        case "Coq_binary_op_right_shift":
          return (false);
        case "Coq_binary_op_unsigned_right_shift":
          return (false);
        case "Coq_binary_op_lt":
          return (false);
        case "Coq_binary_op_gt":
          return (false);
        case "Coq_binary_op_le":
          return (false);
        case "Coq_binary_op_ge":
          return (false);
        case "Coq_binary_op_instanceof":
          return (false);
        case "Coq_binary_op_in":
          return (false);
        case "Coq_binary_op_equal":
          return (false);
        case "Coq_binary_op_disequal":
          return (false);
        case "Coq_binary_op_strict_equal":
          return (false);
        case "Coq_binary_op_strict_disequal":
          return (false);
        case "Coq_binary_op_bitwise_and":
          return (false);
        case "Coq_binary_op_bitwise_or":
          return (false);
        case "Coq_binary_op_bitwise_xor":
          return (false);
        case "Coq_binary_op_and":
          return (false);
        case "Coq_binary_op_or":
          return (false);
        case "Coq_binary_op_coma":
          return (false);
      }
      
    case "Coq_binary_op_left_shift":
      switch (op2.tag) {
        case "Coq_binary_op_mult":
          return (false);
        case "Coq_binary_op_div":
          return (false);
        case "Coq_binary_op_mod":
          return (false);
        case "Coq_binary_op_add":
          return (false);
        case "Coq_binary_op_sub":
          return (false);
        case "Coq_binary_op_left_shift":
          return (true);
        case "Coq_binary_op_right_shift":
          return (false);
        case "Coq_binary_op_unsigned_right_shift":
          return (false);
        case "Coq_binary_op_lt":
          return (false);
        case "Coq_binary_op_gt":
          return (false);
        case "Coq_binary_op_le":
          return (false);
        case "Coq_binary_op_ge":
          return (false);
        case "Coq_binary_op_instanceof":
          return (false);
        case "Coq_binary_op_in":
          return (false);
        case "Coq_binary_op_equal":
          return (false);
        case "Coq_binary_op_disequal":
          return (false);
        case "Coq_binary_op_strict_equal":
          return (false);
        case "Coq_binary_op_strict_disequal":
          return (false);
        case "Coq_binary_op_bitwise_and":
          return (false);
        case "Coq_binary_op_bitwise_or":
          return (false);
        case "Coq_binary_op_bitwise_xor":
          return (false);
        case "Coq_binary_op_and":
          return (false);
        case "Coq_binary_op_or":
          return (false);
        case "Coq_binary_op_coma":
          return (false);
      }
      
    case "Coq_binary_op_right_shift":
      switch (op2.tag) {
        case "Coq_binary_op_mult":
          return (false);
        case "Coq_binary_op_div":
          return (false);
        case "Coq_binary_op_mod":
          return (false);
        case "Coq_binary_op_add":
          return (false);
        case "Coq_binary_op_sub":
          return (false);
        case "Coq_binary_op_left_shift":
          return (false);
        case "Coq_binary_op_right_shift":
          return (true);
        case "Coq_binary_op_unsigned_right_shift":
          return (false);
        case "Coq_binary_op_lt":
          return (false);
        case "Coq_binary_op_gt":
          return (false);
        case "Coq_binary_op_le":
          return (false);
        case "Coq_binary_op_ge":
          return (false);
        case "Coq_binary_op_instanceof":
          return (false);
        case "Coq_binary_op_in":
          return (false);
        case "Coq_binary_op_equal":
          return (false);
        case "Coq_binary_op_disequal":
          return (false);
        case "Coq_binary_op_strict_equal":
          return (false);
        case "Coq_binary_op_strict_disequal":
          return (false);
        case "Coq_binary_op_bitwise_and":
          return (false);
        case "Coq_binary_op_bitwise_or":
          return (false);
        case "Coq_binary_op_bitwise_xor":
          return (false);
        case "Coq_binary_op_and":
          return (false);
        case "Coq_binary_op_or":
          return (false);
        case "Coq_binary_op_coma":
          return (false);
      }
      
    case "Coq_binary_op_unsigned_right_shift":
      switch (op2.tag) {
        case "Coq_binary_op_mult":
          return (false);
        case "Coq_binary_op_div":
          return (false);
        case "Coq_binary_op_mod":
          return (false);
        case "Coq_binary_op_add":
          return (false);
        case "Coq_binary_op_sub":
          return (false);
        case "Coq_binary_op_left_shift":
          return (false);
        case "Coq_binary_op_right_shift":
          return (false);
        case "Coq_binary_op_unsigned_right_shift":
          return (true);
        case "Coq_binary_op_lt":
          return (false);
        case "Coq_binary_op_gt":
          return (false);
        case "Coq_binary_op_le":
          return (false);
        case "Coq_binary_op_ge":
          return (false);
        case "Coq_binary_op_instanceof":
          return (false);
        case "Coq_binary_op_in":
          return (false);
        case "Coq_binary_op_equal":
          return (false);
        case "Coq_binary_op_disequal":
          return (false);
        case "Coq_binary_op_strict_equal":
          return (false);
        case "Coq_binary_op_strict_disequal":
          return (false);
        case "Coq_binary_op_bitwise_and":
          return (false);
        case "Coq_binary_op_bitwise_or":
          return (false);
        case "Coq_binary_op_bitwise_xor":
          return (false);
        case "Coq_binary_op_and":
          return (false);
        case "Coq_binary_op_or":
          return (false);
        case "Coq_binary_op_coma":
          return (false);
      }
      
    case "Coq_binary_op_lt":
      switch (op2.tag) {
        case "Coq_binary_op_mult":
          return (false);
        case "Coq_binary_op_div":
          return (false);
        case "Coq_binary_op_mod":
          return (false);
        case "Coq_binary_op_add":
          return (false);
        case "Coq_binary_op_sub":
          return (false);
        case "Coq_binary_op_left_shift":
          return (false);
        case "Coq_binary_op_right_shift":
          return (false);
        case "Coq_binary_op_unsigned_right_shift":
          return (false);
        case "Coq_binary_op_lt":
          return (true);
        case "Coq_binary_op_gt":
          return (false);
        case "Coq_binary_op_le":
          return (false);
        case "Coq_binary_op_ge":
          return (false);
        case "Coq_binary_op_instanceof":
          return (false);
        case "Coq_binary_op_in":
          return (false);
        case "Coq_binary_op_equal":
          return (false);
        case "Coq_binary_op_disequal":
          return (false);
        case "Coq_binary_op_strict_equal":
          return (false);
        case "Coq_binary_op_strict_disequal":
          return (false);
        case "Coq_binary_op_bitwise_and":
          return (false);
        case "Coq_binary_op_bitwise_or":
          return (false);
        case "Coq_binary_op_bitwise_xor":
          return (false);
        case "Coq_binary_op_and":
          return (false);
        case "Coq_binary_op_or":
          return (false);
        case "Coq_binary_op_coma":
          return (false);
      }
      
    case "Coq_binary_op_gt":
      switch (op2.tag) {
        case "Coq_binary_op_mult":
          return (false);
        case "Coq_binary_op_div":
          return (false);
        case "Coq_binary_op_mod":
          return (false);
        case "Coq_binary_op_add":
          return (false);
        case "Coq_binary_op_sub":
          return (false);
        case "Coq_binary_op_left_shift":
          return (false);
        case "Coq_binary_op_right_shift":
          return (false);
        case "Coq_binary_op_unsigned_right_shift":
          return (false);
        case "Coq_binary_op_lt":
          return (false);
        case "Coq_binary_op_gt":
          return (true);
        case "Coq_binary_op_le":
          return (false);
        case "Coq_binary_op_ge":
          return (false);
        case "Coq_binary_op_instanceof":
          return (false);
        case "Coq_binary_op_in":
          return (false);
        case "Coq_binary_op_equal":
          return (false);
        case "Coq_binary_op_disequal":
          return (false);
        case "Coq_binary_op_strict_equal":
          return (false);
        case "Coq_binary_op_strict_disequal":
          return (false);
        case "Coq_binary_op_bitwise_and":
          return (false);
        case "Coq_binary_op_bitwise_or":
          return (false);
        case "Coq_binary_op_bitwise_xor":
          return (false);
        case "Coq_binary_op_and":
          return (false);
        case "Coq_binary_op_or":
          return (false);
        case "Coq_binary_op_coma":
          return (false);
      }
      
    case "Coq_binary_op_le":
      switch (op2.tag) {
        case "Coq_binary_op_mult":
          return (false);
        case "Coq_binary_op_div":
          return (false);
        case "Coq_binary_op_mod":
          return (false);
        case "Coq_binary_op_add":
          return (false);
        case "Coq_binary_op_sub":
          return (false);
        case "Coq_binary_op_left_shift":
          return (false);
        case "Coq_binary_op_right_shift":
          return (false);
        case "Coq_binary_op_unsigned_right_shift":
          return (false);
        case "Coq_binary_op_lt":
          return (false);
        case "Coq_binary_op_gt":
          return (false);
        case "Coq_binary_op_le":
          return (true);
        case "Coq_binary_op_ge":
          return (false);
        case "Coq_binary_op_instanceof":
          return (false);
        case "Coq_binary_op_in":
          return (false);
        case "Coq_binary_op_equal":
          return (false);
        case "Coq_binary_op_disequal":
          return (false);
        case "Coq_binary_op_strict_equal":
          return (false);
        case "Coq_binary_op_strict_disequal":
          return (false);
        case "Coq_binary_op_bitwise_and":
          return (false);
        case "Coq_binary_op_bitwise_or":
          return (false);
        case "Coq_binary_op_bitwise_xor":
          return (false);
        case "Coq_binary_op_and":
          return (false);
        case "Coq_binary_op_or":
          return (false);
        case "Coq_binary_op_coma":
          return (false);
      }
      
    case "Coq_binary_op_ge":
      switch (op2.tag) {
        case "Coq_binary_op_mult":
          return (false);
        case "Coq_binary_op_div":
          return (false);
        case "Coq_binary_op_mod":
          return (false);
        case "Coq_binary_op_add":
          return (false);
        case "Coq_binary_op_sub":
          return (false);
        case "Coq_binary_op_left_shift":
          return (false);
        case "Coq_binary_op_right_shift":
          return (false);
        case "Coq_binary_op_unsigned_right_shift":
          return (false);
        case "Coq_binary_op_lt":
          return (false);
        case "Coq_binary_op_gt":
          return (false);
        case "Coq_binary_op_le":
          return (false);
        case "Coq_binary_op_ge":
          return (true);
        case "Coq_binary_op_instanceof":
          return (false);
        case "Coq_binary_op_in":
          return (false);
        case "Coq_binary_op_equal":
          return (false);
        case "Coq_binary_op_disequal":
          return (false);
        case "Coq_binary_op_strict_equal":
          return (false);
        case "Coq_binary_op_strict_disequal":
          return (false);
        case "Coq_binary_op_bitwise_and":
          return (false);
        case "Coq_binary_op_bitwise_or":
          return (false);
        case "Coq_binary_op_bitwise_xor":
          return (false);
        case "Coq_binary_op_and":
          return (false);
        case "Coq_binary_op_or":
          return (false);
        case "Coq_binary_op_coma":
          return (false);
      }
      
    case "Coq_binary_op_instanceof":
      switch (op2.tag) {
        case "Coq_binary_op_mult":
          return (false);
        case "Coq_binary_op_div":
          return (false);
        case "Coq_binary_op_mod":
          return (false);
        case "Coq_binary_op_add":
          return (false);
        case "Coq_binary_op_sub":
          return (false);
        case "Coq_binary_op_left_shift":
          return (false);
        case "Coq_binary_op_right_shift":
          return (false);
        case "Coq_binary_op_unsigned_right_shift":
          return (false);
        case "Coq_binary_op_lt":
          return (false);
        case "Coq_binary_op_gt":
          return (false);
        case "Coq_binary_op_le":
          return (false);
        case "Coq_binary_op_ge":
          return (false);
        case "Coq_binary_op_instanceof":
          return (true);
        case "Coq_binary_op_in":
          return (false);
        case "Coq_binary_op_equal":
          return (false);
        case "Coq_binary_op_disequal":
          return (false);
        case "Coq_binary_op_strict_equal":
          return (false);
        case "Coq_binary_op_strict_disequal":
          return (false);
        case "Coq_binary_op_bitwise_and":
          return (false);
        case "Coq_binary_op_bitwise_or":
          return (false);
        case "Coq_binary_op_bitwise_xor":
          return (false);
        case "Coq_binary_op_and":
          return (false);
        case "Coq_binary_op_or":
          return (false);
        case "Coq_binary_op_coma":
          return (false);
      }
      
    case "Coq_binary_op_in":
      switch (op2.tag) {
        case "Coq_binary_op_mult":
          return (false);
        case "Coq_binary_op_div":
          return (false);
        case "Coq_binary_op_mod":
          return (false);
        case "Coq_binary_op_add":
          return (false);
        case "Coq_binary_op_sub":
          return (false);
        case "Coq_binary_op_left_shift":
          return (false);
        case "Coq_binary_op_right_shift":
          return (false);
        case "Coq_binary_op_unsigned_right_shift":
          return (false);
        case "Coq_binary_op_lt":
          return (false);
        case "Coq_binary_op_gt":
          return (false);
        case "Coq_binary_op_le":
          return (false);
        case "Coq_binary_op_ge":
          return (false);
        case "Coq_binary_op_instanceof":
          return (false);
        case "Coq_binary_op_in":
          return (true);
        case "Coq_binary_op_equal":
          return (false);
        case "Coq_binary_op_disequal":
          return (false);
        case "Coq_binary_op_strict_equal":
          return (false);
        case "Coq_binary_op_strict_disequal":
          return (false);
        case "Coq_binary_op_bitwise_and":
          return (false);
        case "Coq_binary_op_bitwise_or":
          return (false);
        case "Coq_binary_op_bitwise_xor":
          return (false);
        case "Coq_binary_op_and":
          return (false);
        case "Coq_binary_op_or":
          return (false);
        case "Coq_binary_op_coma":
          return (false);
      }
      
    case "Coq_binary_op_equal":
      switch (op2.tag) {
        case "Coq_binary_op_mult":
          return (false);
        case "Coq_binary_op_div":
          return (false);
        case "Coq_binary_op_mod":
          return (false);
        case "Coq_binary_op_add":
          return (false);
        case "Coq_binary_op_sub":
          return (false);
        case "Coq_binary_op_left_shift":
          return (false);
        case "Coq_binary_op_right_shift":
          return (false);
        case "Coq_binary_op_unsigned_right_shift":
          return (false);
        case "Coq_binary_op_lt":
          return (false);
        case "Coq_binary_op_gt":
          return (false);
        case "Coq_binary_op_le":
          return (false);
        case "Coq_binary_op_ge":
          return (false);
        case "Coq_binary_op_instanceof":
          return (false);
        case "Coq_binary_op_in":
          return (false);
        case "Coq_binary_op_equal":
          return (true);
        case "Coq_binary_op_disequal":
          return (false);
        case "Coq_binary_op_strict_equal":
          return (false);
        case "Coq_binary_op_strict_disequal":
          return (false);
        case "Coq_binary_op_bitwise_and":
          return (false);
        case "Coq_binary_op_bitwise_or":
          return (false);
        case "Coq_binary_op_bitwise_xor":
          return (false);
        case "Coq_binary_op_and":
          return (false);
        case "Coq_binary_op_or":
          return (false);
        case "Coq_binary_op_coma":
          return (false);
      }
      
    case "Coq_binary_op_disequal":
      switch (op2.tag) {
        case "Coq_binary_op_mult":
          return (false);
        case "Coq_binary_op_div":
          return (false);
        case "Coq_binary_op_mod":
          return (false);
        case "Coq_binary_op_add":
          return (false);
        case "Coq_binary_op_sub":
          return (false);
        case "Coq_binary_op_left_shift":
          return (false);
        case "Coq_binary_op_right_shift":
          return (false);
        case "Coq_binary_op_unsigned_right_shift":
          return (false);
        case "Coq_binary_op_lt":
          return (false);
        case "Coq_binary_op_gt":
          return (false);
        case "Coq_binary_op_le":
          return (false);
        case "Coq_binary_op_ge":
          return (false);
        case "Coq_binary_op_instanceof":
          return (false);
        case "Coq_binary_op_in":
          return (false);
        case "Coq_binary_op_equal":
          return (false);
        case "Coq_binary_op_disequal":
          return (true);
        case "Coq_binary_op_strict_equal":
          return (false);
        case "Coq_binary_op_strict_disequal":
          return (false);
        case "Coq_binary_op_bitwise_and":
          return (false);
        case "Coq_binary_op_bitwise_or":
          return (false);
        case "Coq_binary_op_bitwise_xor":
          return (false);
        case "Coq_binary_op_and":
          return (false);
        case "Coq_binary_op_or":
          return (false);
        case "Coq_binary_op_coma":
          return (false);
      }
      
    case "Coq_binary_op_strict_equal":
      switch (op2.tag) {
        case "Coq_binary_op_mult":
          return (false);
        case "Coq_binary_op_div":
          return (false);
        case "Coq_binary_op_mod":
          return (false);
        case "Coq_binary_op_add":
          return (false);
        case "Coq_binary_op_sub":
          return (false);
        case "Coq_binary_op_left_shift":
          return (false);
        case "Coq_binary_op_right_shift":
          return (false);
        case "Coq_binary_op_unsigned_right_shift":
          return (false);
        case "Coq_binary_op_lt":
          return (false);
        case "Coq_binary_op_gt":
          return (false);
        case "Coq_binary_op_le":
          return (false);
        case "Coq_binary_op_ge":
          return (false);
        case "Coq_binary_op_instanceof":
          return (false);
        case "Coq_binary_op_in":
          return (false);
        case "Coq_binary_op_equal":
          return (false);
        case "Coq_binary_op_disequal":
          return (false);
        case "Coq_binary_op_strict_equal":
          return (true);
        case "Coq_binary_op_strict_disequal":
          return (false);
        case "Coq_binary_op_bitwise_and":
          return (false);
        case "Coq_binary_op_bitwise_or":
          return (false);
        case "Coq_binary_op_bitwise_xor":
          return (false);
        case "Coq_binary_op_and":
          return (false);
        case "Coq_binary_op_or":
          return (false);
        case "Coq_binary_op_coma":
          return (false);
      }
      
    case "Coq_binary_op_strict_disequal":
      switch (op2.tag) {
        case "Coq_binary_op_mult":
          return (false);
        case "Coq_binary_op_div":
          return (false);
        case "Coq_binary_op_mod":
          return (false);
        case "Coq_binary_op_add":
          return (false);
        case "Coq_binary_op_sub":
          return (false);
        case "Coq_binary_op_left_shift":
          return (false);
        case "Coq_binary_op_right_shift":
          return (false);
        case "Coq_binary_op_unsigned_right_shift":
          return (false);
        case "Coq_binary_op_lt":
          return (false);
        case "Coq_binary_op_gt":
          return (false);
        case "Coq_binary_op_le":
          return (false);
        case "Coq_binary_op_ge":
          return (false);
        case "Coq_binary_op_instanceof":
          return (false);
        case "Coq_binary_op_in":
          return (false);
        case "Coq_binary_op_equal":
          return (false);
        case "Coq_binary_op_disequal":
          return (false);
        case "Coq_binary_op_strict_equal":
          return (false);
        case "Coq_binary_op_strict_disequal":
          return (true);
        case "Coq_binary_op_bitwise_and":
          return (false);
        case "Coq_binary_op_bitwise_or":
          return (false);
        case "Coq_binary_op_bitwise_xor":
          return (false);
        case "Coq_binary_op_and":
          return (false);
        case "Coq_binary_op_or":
          return (false);
        case "Coq_binary_op_coma":
          return (false);
      }
      
    case "Coq_binary_op_bitwise_and":
      switch (op2.tag) {
        case "Coq_binary_op_mult":
          return (false);
        case "Coq_binary_op_div":
          return (false);
        case "Coq_binary_op_mod":
          return (false);
        case "Coq_binary_op_add":
          return (false);
        case "Coq_binary_op_sub":
          return (false);
        case "Coq_binary_op_left_shift":
          return (false);
        case "Coq_binary_op_right_shift":
          return (false);
        case "Coq_binary_op_unsigned_right_shift":
          return (false);
        case "Coq_binary_op_lt":
          return (false);
        case "Coq_binary_op_gt":
          return (false);
        case "Coq_binary_op_le":
          return (false);
        case "Coq_binary_op_ge":
          return (false);
        case "Coq_binary_op_instanceof":
          return (false);
        case "Coq_binary_op_in":
          return (false);
        case "Coq_binary_op_equal":
          return (false);
        case "Coq_binary_op_disequal":
          return (false);
        case "Coq_binary_op_strict_equal":
          return (false);
        case "Coq_binary_op_strict_disequal":
          return (false);
        case "Coq_binary_op_bitwise_and":
          return (true);
        case "Coq_binary_op_bitwise_or":
          return (false);
        case "Coq_binary_op_bitwise_xor":
          return (false);
        case "Coq_binary_op_and":
          return (false);
        case "Coq_binary_op_or":
          return (false);
        case "Coq_binary_op_coma":
          return (false);
      }
      
    case "Coq_binary_op_bitwise_or":
      switch (op2.tag) {
        case "Coq_binary_op_mult":
          return (false);
        case "Coq_binary_op_div":
          return (false);
        case "Coq_binary_op_mod":
          return (false);
        case "Coq_binary_op_add":
          return (false);
        case "Coq_binary_op_sub":
          return (false);
        case "Coq_binary_op_left_shift":
          return (false);
        case "Coq_binary_op_right_shift":
          return (false);
        case "Coq_binary_op_unsigned_right_shift":
          return (false);
        case "Coq_binary_op_lt":
          return (false);
        case "Coq_binary_op_gt":
          return (false);
        case "Coq_binary_op_le":
          return (false);
        case "Coq_binary_op_ge":
          return (false);
        case "Coq_binary_op_instanceof":
          return (false);
        case "Coq_binary_op_in":
          return (false);
        case "Coq_binary_op_equal":
          return (false);
        case "Coq_binary_op_disequal":
          return (false);
        case "Coq_binary_op_strict_equal":
          return (false);
        case "Coq_binary_op_strict_disequal":
          return (false);
        case "Coq_binary_op_bitwise_and":
          return (false);
        case "Coq_binary_op_bitwise_or":
          return (true);
        case "Coq_binary_op_bitwise_xor":
          return (false);
        case "Coq_binary_op_and":
          return (false);
        case "Coq_binary_op_or":
          return (false);
        case "Coq_binary_op_coma":
          return (false);
      }
      
    case "Coq_binary_op_bitwise_xor":
      switch (op2.tag) {
        case "Coq_binary_op_mult":
          return (false);
        case "Coq_binary_op_div":
          return (false);
        case "Coq_binary_op_mod":
          return (false);
        case "Coq_binary_op_add":
          return (false);
        case "Coq_binary_op_sub":
          return (false);
        case "Coq_binary_op_left_shift":
          return (false);
        case "Coq_binary_op_right_shift":
          return (false);
        case "Coq_binary_op_unsigned_right_shift":
          return (false);
        case "Coq_binary_op_lt":
          return (false);
        case "Coq_binary_op_gt":
          return (false);
        case "Coq_binary_op_le":
          return (false);
        case "Coq_binary_op_ge":
          return (false);
        case "Coq_binary_op_instanceof":
          return (false);
        case "Coq_binary_op_in":
          return (false);
        case "Coq_binary_op_equal":
          return (false);
        case "Coq_binary_op_disequal":
          return (false);
        case "Coq_binary_op_strict_equal":
          return (false);
        case "Coq_binary_op_strict_disequal":
          return (false);
        case "Coq_binary_op_bitwise_and":
          return (false);
        case "Coq_binary_op_bitwise_or":
          return (false);
        case "Coq_binary_op_bitwise_xor":
          return (true);
        case "Coq_binary_op_and":
          return (false);
        case "Coq_binary_op_or":
          return (false);
        case "Coq_binary_op_coma":
          return (false);
      }
      
    case "Coq_binary_op_and":
      switch (op2.tag) {
        case "Coq_binary_op_mult":
          return (false);
        case "Coq_binary_op_div":
          return (false);
        case "Coq_binary_op_mod":
          return (false);
        case "Coq_binary_op_add":
          return (false);
        case "Coq_binary_op_sub":
          return (false);
        case "Coq_binary_op_left_shift":
          return (false);
        case "Coq_binary_op_right_shift":
          return (false);
        case "Coq_binary_op_unsigned_right_shift":
          return (false);
        case "Coq_binary_op_lt":
          return (false);
        case "Coq_binary_op_gt":
          return (false);
        case "Coq_binary_op_le":
          return (false);
        case "Coq_binary_op_ge":
          return (false);
        case "Coq_binary_op_instanceof":
          return (false);
        case "Coq_binary_op_in":
          return (false);
        case "Coq_binary_op_equal":
          return (false);
        case "Coq_binary_op_disequal":
          return (false);
        case "Coq_binary_op_strict_equal":
          return (false);
        case "Coq_binary_op_strict_disequal":
          return (false);
        case "Coq_binary_op_bitwise_and":
          return (false);
        case "Coq_binary_op_bitwise_or":
          return (false);
        case "Coq_binary_op_bitwise_xor":
          return (false);
        case "Coq_binary_op_and":
          return (true);
        case "Coq_binary_op_or":
          return (false);
        case "Coq_binary_op_coma":
          return (false);
      }
      
    case "Coq_binary_op_or":
      switch (op2.tag) {
        case "Coq_binary_op_mult":
          return (false);
        case "Coq_binary_op_div":
          return (false);
        case "Coq_binary_op_mod":
          return (false);
        case "Coq_binary_op_add":
          return (false);
        case "Coq_binary_op_sub":
          return (false);
        case "Coq_binary_op_left_shift":
          return (false);
        case "Coq_binary_op_right_shift":
          return (false);
        case "Coq_binary_op_unsigned_right_shift":
          return (false);
        case "Coq_binary_op_lt":
          return (false);
        case "Coq_binary_op_gt":
          return (false);
        case "Coq_binary_op_le":
          return (false);
        case "Coq_binary_op_ge":
          return (false);
        case "Coq_binary_op_instanceof":
          return (false);
        case "Coq_binary_op_in":
          return (false);
        case "Coq_binary_op_equal":
          return (false);
        case "Coq_binary_op_disequal":
          return (false);
        case "Coq_binary_op_strict_equal":
          return (false);
        case "Coq_binary_op_strict_disequal":
          return (false);
        case "Coq_binary_op_bitwise_and":
          return (false);
        case "Coq_binary_op_bitwise_or":
          return (false);
        case "Coq_binary_op_bitwise_xor":
          return (false);
        case "Coq_binary_op_and":
          return (false);
        case "Coq_binary_op_or":
          return (true);
        case "Coq_binary_op_coma":
          return (false);
      }
      
    case "Coq_binary_op_coma":
      switch (op2.tag) {
        case "Coq_binary_op_mult":
          return (false);
        case "Coq_binary_op_div":
          return (false);
        case "Coq_binary_op_mod":
          return (false);
        case "Coq_binary_op_add":
          return (false);
        case "Coq_binary_op_sub":
          return (false);
        case "Coq_binary_op_left_shift":
          return (false);
        case "Coq_binary_op_right_shift":
          return (false);
        case "Coq_binary_op_unsigned_right_shift":
          return (false);
        case "Coq_binary_op_lt":
          return (false);
        case "Coq_binary_op_gt":
          return (false);
        case "Coq_binary_op_le":
          return (false);
        case "Coq_binary_op_ge":
          return (false);
        case "Coq_binary_op_instanceof":
          return (false);
        case "Coq_binary_op_in":
          return (false);
        case "Coq_binary_op_equal":
          return (false);
        case "Coq_binary_op_disequal":
          return (false);
        case "Coq_binary_op_strict_equal":
          return (false);
        case "Coq_binary_op_strict_disequal":
          return (false);
        case "Coq_binary_op_bitwise_and":
          return (false);
        case "Coq_binary_op_bitwise_or":
          return (false);
        case "Coq_binary_op_bitwise_xor":
          return (false);
        case "Coq_binary_op_and":
          return (false);
        case "Coq_binary_op_or":
          return (false);
        case "Coq_binary_op_coma":
          return (true);
      }
      
  }
  
};

var prog_intro_strictness = function (p) {
  switch (p.tag) {
    case "Coq_prog_intro":
      var str = p.strictness, els = p.elements;
      return (str);
  }
  
};

var prog_elements = function (p) {
  switch (p.tag) {
    case "Coq_prog_intro":
      var str = p.strictness, els = p.elements;
      return (els);
  }
  
};

var funcbody_prog = function (fb) {
  switch (fb.tag) {
    case "Coq_funcbody_intro":
      var p = fb.prog, s = fb.source;
      return (p);
  }
  
};

var funcbody_is_strict = function (fb) {
  switch (fb.tag) {
    case "Coq_funcbody_intro":
      var p = fb.prog, s = fb.source;
      switch (p.tag) {
        case "Coq_prog_intro":
          var b_strict = p.strictness, l = p.elements;
          return (b_strict);
      }
      
  }
  
};

var restype_compare = function (rt1, rt2) {
  switch (rt1.tag) {
    case "Coq_restype_normal":
      switch (rt2.tag) {
        case "Coq_restype_normal":
          return (true);
        case "Coq_restype_break":
          return (false);
        case "Coq_restype_continue":
          return (false);
        case "Coq_restype_return":
          return (false);
        case "Coq_restype_throw":
          return (false);
      }
      
    case "Coq_restype_break":
      switch (rt2.tag) {
        case "Coq_restype_normal":
          return (false);
        case "Coq_restype_break":
          return (true);
        case "Coq_restype_continue":
          return (false);
        case "Coq_restype_return":
          return (false);
        case "Coq_restype_throw":
          return (false);
      }
      
    case "Coq_restype_continue":
      switch (rt2.tag) {
        case "Coq_restype_normal":
          return (false);
        case "Coq_restype_break":
          return (false);
        case "Coq_restype_continue":
          return (true);
        case "Coq_restype_return":
          return (false);
        case "Coq_restype_throw":
          return (false);
      }
      
    case "Coq_restype_return":
      switch (rt2.tag) {
        case "Coq_restype_normal":
          return (false);
        case "Coq_restype_break":
          return (false);
        case "Coq_restype_continue":
          return (false);
        case "Coq_restype_return":
          return (true);
        case "Coq_restype_throw":
          return (false);
      }
      
    case "Coq_restype_throw":
      switch (rt2.tag) {
        case "Coq_restype_normal":
          return (false);
        case "Coq_restype_break":
          return (false);
        case "Coq_restype_continue":
          return (false);
        case "Coq_restype_return":
          return (false);
        case "Coq_restype_throw":
          return (true);
      }
      
  }
  
};

var label_compare = function (lab1, lab2) {
  switch (lab1.tag) {
    case "Coq_label_empty":
      switch (lab2.tag) {
        case "Coq_label_empty":
          return (true);
        case "Coq_label_string":
          var s = lab2.value;
          return (false);
      }
      
    case "Coq_label_string":
      var s1 = lab1.value;
      switch (lab2.tag) {
        case "Coq_label_empty":
          return (false);
        case "Coq_label_string":
          var s2 = lab2.value;
          return (string_eq(s1, s2));
      }
      
  }
  
};

var label_set_empty = mk_nil();

var label_set_add = function (lab, labs) {
  return (mk_cons(lab, labs));
};

var label_set_add_empty = function (labs) {
  return (label_set_add(Coq_label_empty(), labs));
};

var label_set_mem = function (lab, labs) {
  return (mem_decide(label_compare, lab, labs));
};

var attributes_data_with_value = function (ad, v$) {
  var v = ad.attributes_data_value, bw = ad.attributes_data_writable,
    be = ad.attributes_data_enumerable, bc = ad.attributes_data_configurable;
  return (
    {
      attributes_data_value: v$,
      attributes_data_writable: bw,
      attributes_data_enumerable: be,
      attributes_data_configurable: bc
    });
};

var descriptor_with_value = function (desc, v$) {
  var v = desc.descriptor_value, bw = desc.descriptor_writable,
    vg = desc.descriptor_get, vs = desc.descriptor_set,
    be = desc.descriptor_enumerable, bc = desc.descriptor_configurable;
  return (
    {
      descriptor_value: v$,
      descriptor_writable: bw,
      descriptor_get: vg,
      descriptor_set: vs,
      descriptor_enumerable: be,
      descriptor_configurable: bc
    });
};

var descriptor_with_writable = function (desc, bw$) {
  var v = desc.descriptor_value, bw = desc.descriptor_writable,
    vg = desc.descriptor_get, vs = desc.descriptor_set,
    be = desc.descriptor_enumerable, bc = desc.descriptor_configurable;
  return (
    {
      descriptor_value: v,
      descriptor_writable: bw$,
      descriptor_get: vg,
      descriptor_set: vs,
      descriptor_enumerable: be,
      descriptor_configurable: bc
    });
};

var descriptor_with_get = function (desc, vg$) {
  var v = desc.descriptor_value, bw = desc.descriptor_writable,
    vg = desc.descriptor_get, vs = desc.descriptor_set,
    be = desc.descriptor_enumerable, bc = desc.descriptor_configurable;
  return (
    {
      descriptor_value: v,
      descriptor_writable: bw,
      descriptor_get: vg$,
      descriptor_set: vs,
      descriptor_enumerable: be,
      descriptor_configurable: bc
    });
};

var descriptor_with_set = function (desc, vs$) {
  var v = desc.descriptor_value, bw = desc.descriptor_writable,
    vg = desc.descriptor_get, vs = desc.descriptor_set,
    be = desc.descriptor_enumerable, bc = desc.descriptor_configurable;
  return (
    {
      descriptor_value: v,
      descriptor_writable: bw,
      descriptor_get: vg,
      descriptor_set: vs$,
      descriptor_enumerable: be,
      descriptor_configurable: bc
    });
};

var descriptor_with_enumerable = function (desc, be$) {
  var v = desc.descriptor_value, bw = desc.descriptor_writable,
    vg = desc.descriptor_get, vs = desc.descriptor_set,
    be = desc.descriptor_enumerable, bc = desc.descriptor_configurable;
  return (
    {
      descriptor_value: v,
      descriptor_writable: bw,
      descriptor_get: vg,
      descriptor_set: vs,
      descriptor_enumerable: be$,
      descriptor_configurable: bc
    });
};

var descriptor_with_configurable = function (desc, bc$) {
  var v = desc.descriptor_value, bw = desc.descriptor_writable,
    vg = desc.descriptor_get, vs = desc.descriptor_set,
    be = desc.descriptor_enumerable, bc = desc.descriptor_configurable;
  return (
    {
      descriptor_value: v,
      descriptor_writable: bw,
      descriptor_get: vg,
      descriptor_set: vs,
      descriptor_enumerable: be,
      descriptor_configurable: bc$
    });
};

var codetype_compare = function (ct1, ct2) {
  switch (ct1.tag) {
    case "Coq_codetype_func":
      switch (ct2.tag) {
        case "Coq_codetype_func":
          return (true);
        case "Coq_codetype_global":
          return (false);
        case "Coq_codetype_eval":
          return (false);
      }
      
    case "Coq_codetype_global":
      switch (ct2.tag) {
        case "Coq_codetype_func":
          return (false);
        case "Coq_codetype_global":
          return (true);
        case "Coq_codetype_eval":
          return (false);
      }
      
    case "Coq_codetype_eval":
      switch (ct2.tag) {
        case "Coq_codetype_func":
          return (false);
        case "Coq_codetype_global":
          return (false);
        case "Coq_codetype_eval":
          return (true);
      }
      
  }
  
};
}// end of with JsSyntax
}// end of with LibList

return {
  int_of_native_error: int_of_native_error, 
  int_of_mathop: int_of_mathop, 
  int_of_prealloc: int_of_prealloc, 
  prealloc_cmp: prealloc_cmp, 
  object_loc_cmp: object_loc_cmp, 
  object_create: object_create, 
  object_set_proto: object_set_proto, 
  object_set_class: object_set_class, 
  object_set_extensible: object_set_extensible, 
  object_with_primitive_value: object_with_primitive_value, 
  object_with_extension: object_with_extension, 
  object_with_properties: object_with_properties, 
  object_with_get: object_with_get, 
  object_with_get_own_property: object_with_get_own_property, 
  object_with_invokation: object_with_invokation, 
  object_with_scope: object_with_scope, 
  object_with_formal_params: object_with_formal_params, 
  object_with_details: object_with_details, 
  object_for_array: object_for_array, 
  object_for_args_object: object_for_args_object, 
  mathop_compare: mathop_compare, 
  prealloc_compare: prealloc_compare, 
  object_loc_compare: object_loc_compare, 
  prim_compare: prim_compare, 
  value_compare: value_compare, 
  mutability_compare: mutability_compare, 
  ref_base_type_compare: ref_base_type_compare, 
  ref_compare: ref_compare, 
  type_compare: type_compare, 
  res_with_value: res_with_value, 
  resvalue_compare: resvalue_compare, 
  binary_op_compare: binary_op_compare, 
  prog_intro_strictness: prog_intro_strictness, 
  prog_elements: prog_elements, 
  funcbody_prog: funcbody_prog, 
  funcbody_is_strict: funcbody_is_strict, 
  restype_compare: restype_compare, 
  label_compare: label_compare, 
  label_set_empty: label_set_empty, 
  label_set_add: label_set_add, 
  label_set_add_empty: label_set_add_empty, 
  label_set_mem: label_set_mem, 
  attributes_data_with_value: attributes_data_with_value, 
  descriptor_with_value: descriptor_with_value, 
  descriptor_with_writable: descriptor_with_writable, 
  descriptor_with_get: descriptor_with_get, 
  descriptor_with_set: descriptor_with_set, 
  descriptor_with_enumerable: descriptor_with_enumerable, 
  descriptor_with_configurable: descriptor_with_configurable, 
  codetype_compare: codetype_compare};
})();

/* --------------------- tests/jsref/HeapObj.unlog.js --------------------- */

var HeapObj = (function() {

var empty = Heap.empty;

var read = function (l, k) {
  return (Heap.read(JsSyntaxAux.object_loc_cmp, l, k));
};

var write = function (l, k, v) {
  return (Heap.write(JsSyntaxAux.object_loc_cmp, l, k, v));
};

var rem = function (l, k) {
  return (Heap.rem(JsSyntaxAux.object_loc_cmp, l, k));
};

var read_option = function (l, k) {
  return (Heap.read_option(JsSyntaxAux.object_loc_cmp, l, k));
};

var indom_dec = function (l, k) {
  return (Heap.indom_dec(JsSyntaxAux.object_loc_cmp, l, k));
};

var to_list = function (l) {
  return (Heap.to_list(JsSyntaxAux.object_loc_cmp, l));
};

return {
  empty: empty, 
  read: read, 
  write: write, 
  rem: rem, 
  read_option: read_option, 
  indom_dec: indom_dec, 
  to_list: to_list};
})();

/* --------------------- tests/jsref/Translate_syntax.js --------------------- */

var Translate_syntax = {
  eval_counter: 0,
  parse_esprima: function (strictness, src) {
    try {
      // EVAL: Uncomment line below to enable multiple eval tabs
      return Some(JSParse(src, "_eval_" + Translate_syntax.eval_counter++, true));
      return Some(JSParse(src, "_eval_", true));
    } catch (e) {
      return None();
    }
  }
};

/* --------------------- tests/jsref/JsCommon.unlog.js --------------------- */

var JsCommon = (function() {
with (Datatypes) {
with (JsSyntax) {
with (JsSyntaxAux) {
with (LibList) {
with (LibOption) {
with (List0) {
with (Shared) {

var res_overwrite_value_if_empty = function (rv, r) {
  if (resvalue_compare(r.res_value, Coq_resvalue_empty())) {
    return (res_with_value(r, rv));
  } else {
    return (r);
  }
};

var res_label_in = function (r, labs) {
  return (label_set_mem(r.res_label, labs));
};

var convert_literal_to_prim = function (_foo_) {
  switch (_foo_.tag) {
    case "Coq_literal_null":
      return (Coq_prim_null());
    case "Coq_literal_bool":
      var b = _foo_.value;
      return (Coq_prim_bool(b));
    case "Coq_literal_number":
      var n = _foo_.value;
      return (Coq_prim_number(n));
    case "Coq_literal_string":
      var s = _foo_.value;
      return (Coq_prim_string(s));
  }
  
};

var type_of_prim = function (_foo_) {
  switch (_foo_.tag) {
    case "Coq_prim_undef":
      return (Coq_type_undef());
    case "Coq_prim_null":
      return (Coq_type_null());
    case "Coq_prim_bool":
      var b = _foo_.value;
      return (Coq_type_bool());
    case "Coq_prim_number":
      var n = _foo_.value;
      return (Coq_type_number());
    case "Coq_prim_string":
      var s = _foo_.value;
      return (Coq_type_string());
  }
  
};

var type_of = function (_foo_) {
  switch (_foo_.tag) {
    case "Coq_value_prim":
      var w = _foo_.value;
      return (type_of_prim(w));
    case "Coq_value_object":
      var o = _foo_.value;
      return (Coq_type_object());
  }
  
};

var attributes_data_default = {
  attributes_data_value: Coq_value_prim(Coq_prim_undef()),
  attributes_data_writable: false,
  attributes_data_enumerable: false,
  attributes_data_configurable: false
};

var attributes_accessor_default = {
  attributes_accessor_get: Coq_value_prim(Coq_prim_undef()),
  attributes_accessor_set: Coq_value_prim(Coq_prim_undef()),
  attributes_accessor_enumerable: false,
  attributes_accessor_configurable: false
};

var attributes_accessor_of_attributes_data = function (ad) {
  return (
    {
      attributes_accessor_get: attributes_accessor_default.attributes_accessor_get,
      attributes_accessor_set: attributes_accessor_default.attributes_accessor_set,
      attributes_accessor_enumerable: ad.attributes_data_enumerable,
      attributes_accessor_configurable: ad.attributes_data_configurable
    });
};

var attributes_data_of_attributes_accessor = function (aa) {
  return (
    {
      attributes_data_value: attributes_data_default.attributes_data_value,
      attributes_data_writable: attributes_data_default.attributes_data_writable,
      attributes_data_enumerable: aa.attributes_accessor_enumerable,
      attributes_data_configurable: aa.attributes_accessor_configurable
    });
};

var attributes_data_update = function (ad, desc) {
  return (
    {
      attributes_data_value: unsome_default(ad.attributes_data_value,
                               desc.descriptor_value),
      attributes_data_writable: unsome_default(ad.attributes_data_writable,
                                  desc.descriptor_writable),
      attributes_data_enumerable: unsome_default(
                                    ad.attributes_data_enumerable,
                                    desc.descriptor_enumerable),
      attributes_data_configurable: unsome_default(
                                      ad.attributes_data_configurable,
                                      desc.descriptor_configurable)
    });
};

var attributes_accessor_update = function (aa, desc) {
  return (
    {
      attributes_accessor_get: unsome_default(aa.attributes_accessor_get,
                                 desc.descriptor_get),
      attributes_accessor_set: unsome_default(aa.attributes_accessor_set,
                                 desc.descriptor_set),
      attributes_accessor_enumerable: unsome_default(
                                        aa.attributes_accessor_enumerable,
                                        desc.descriptor_enumerable),
      attributes_accessor_configurable: unsome_default(
                                          aa.attributes_accessor_configurable,
                                          desc.descriptor_configurable)
    });
};

var attributes_update = function (a, desc) {
  switch (a.tag) {
    case "Coq_attributes_data_of":
      var ad = a.value;
      return (Coq_attributes_data_of(attributes_data_update(ad, desc)));
    case "Coq_attributes_accessor_of":
      var aa = a.value;
      return (
        Coq_attributes_accessor_of(attributes_accessor_update(aa, desc)));
  }
  
};

var attributes_data_of_descriptor = function (desc) {
  return (attributes_data_update(attributes_data_default, desc));
};

var attributes_accessor_of_descriptor = function (desc) {
  return (attributes_accessor_update(attributes_accessor_default, desc));
};

var descriptor_of_attributes = function (_foo_) {
  switch (_foo_.tag) {
    case "Coq_attributes_data_of":
      var ad = _foo_.value;
      return (
        {
          descriptor_value: Some(ad.attributes_data_value),
          descriptor_writable: Some(ad.attributes_data_writable),
          descriptor_get: None(),
          descriptor_set: None(),
          descriptor_enumerable: Some(ad.attributes_data_enumerable),
          descriptor_configurable: Some(ad.attributes_data_configurable)
        });
    case "Coq_attributes_accessor_of":
      var aa = _foo_.value;
      return (
        {
          descriptor_value: None(),
          descriptor_writable: None(),
          descriptor_get: Some(aa.attributes_accessor_get),
          descriptor_set: Some(aa.attributes_accessor_set),
          descriptor_enumerable: Some(aa.attributes_accessor_enumerable),
          descriptor_configurable: Some(aa.attributes_accessor_configurable)
        });
  }
  
};

var attributes_configurable = function (_foo_) {
  switch (_foo_.tag) {
    case "Coq_attributes_data_of":
      var ad = _foo_.value;
      return (ad.attributes_data_configurable);
    case "Coq_attributes_accessor_of":
      var aa = _foo_.value;
      return (aa.attributes_accessor_configurable);
  }
  
};

var attributes_enumerable = function (_foo_) {
  switch (_foo_.tag) {
    case "Coq_attributes_data_of":
      var ad = _foo_.value;
      return (ad.attributes_data_enumerable);
    case "Coq_attributes_accessor_of":
      var aa = _foo_.value;
      return (aa.attributes_accessor_enumerable);
  }
  
};

var state_with_object_heap = function (s, new_object_heap) {
  return (record_with(s, "state_object_heap", new_object_heap));
};

var state_map_object_heap = function (s, f) {
  return (state_with_object_heap(s, f(s.state_object_heap)));
};

var object_write = function (s, l, o) {
  return (
    state_map_object_heap(s, function (h) { return (HeapObj.write(h, l, o));
      }));
};

var object_alloc = function (s, o) {
  var cells = s.state_object_heap, bindings = s.state_env_record_heap,
    state_fresh_locations0 = s.state_fresh_locations;
  var n = state_fresh_locations0;
  var alloc = (state_fresh_locations0 + 1);
  var l = Coq_object_loc_normal(n);
  return (
    [l, object_write({
            state_object_heap: cells,
            state_env_record_heap: bindings,
            state_fresh_locations: alloc}, l, o)]);
};

var object_map_properties = function (o, f) {
  return (object_with_properties(o, f(o.object_properties_)));
};

var object_new = function (vproto, sclass) {
  return (object_create(vproto, sclass, true, Heap.empty));
};

var attributes_writable = function (_foo_) {
  switch (_foo_.tag) {
    case "Coq_attributes_data_of":
      var ad = _foo_.value;
      return (ad.attributes_data_writable);
    case "Coq_attributes_accessor_of":
      var aa = _foo_.value;
      return (false);
  }
  
};

var attributes_data_intro_constant = function (v) {
  return (
    {
      attributes_data_value: v,
      attributes_data_writable: false,
      attributes_data_enumerable: false,
      attributes_data_configurable: false
    });
};

var attributes_data_intro_all_true = function (v) {
  return (
    {
      attributes_data_value: v,
      attributes_data_writable: true,
      attributes_data_enumerable: true,
      attributes_data_configurable: true
    });
};

var descriptor_intro_data = function (v, bw, be, bc) {
  return (
    {
      descriptor_value: Some(v),
      descriptor_writable: Some(bw),
      descriptor_get: None(),
      descriptor_set: None(),
      descriptor_enumerable: Some(be),
      descriptor_configurable: Some(bc)
    });
};

var descriptor_intro_empty = {
  descriptor_value: None(),
  descriptor_writable: None(),
  descriptor_get: None(),
  descriptor_set: None(),
  descriptor_enumerable: None(),
  descriptor_configurable: None()
};

function Coq_ref_kind_null() { return {tag: "Coq_ref_kind_null" }; }

function Coq_ref_kind_undef() { return {tag: "Coq_ref_kind_undef" }; }

function Coq_ref_kind_primitive_base() { return {tag: "Coq_ref_kind_primitive_base" }; }

function Coq_ref_kind_object() { return {tag: "Coq_ref_kind_object" }; }

function Coq_ref_kind_env_record() { return {tag: "Coq_ref_kind_env_record" }; }

var ref_kind_of = function (r) {
  var _switch_arg_1 = r.ref_base;
  switch (_switch_arg_1.tag) {
    case "Coq_ref_base_type_value":
      var v = _switch_arg_1.value;
      switch (v.tag) {
        case "Coq_value_prim":
          var w = v.value;
          switch (w.tag) {
            case "Coq_prim_undef":
              return (Coq_ref_kind_undef());
            case "Coq_prim_null":
              return (Coq_ref_kind_null());
            case "Coq_prim_bool":
              var b = w.value;
              return (Coq_ref_kind_primitive_base());
            case "Coq_prim_number":
              var n = w.value;
              return (Coq_ref_kind_primitive_base());
            case "Coq_prim_string":
              var s = w.value;
              return (Coq_ref_kind_primitive_base());
          }
          
        case "Coq_value_object":
          var o = v.value;
          return (Coq_ref_kind_object());
      }
      
    case "Coq_ref_base_type_env_loc":
      var l = _switch_arg_1.value;
      return (Coq_ref_kind_env_record());
  }
  
};

var ref_create_value = function (v, x, strict) {
  return (
    {
      ref_base: Coq_ref_base_type_value(v),
      ref_name: x,
      ref_strict: strict
    });
};

var ref_create_env_loc = function (l, x, strict) {
  return (
    {
      ref_base: Coq_ref_base_type_env_loc(l),
      ref_name: x,
      ref_strict: strict
    });
};

var mutability_of_bool = function (_foo_) {
  switch (_foo_) {
    case true:
      return (Coq_mutability_deletable());
    case false:
      return (Coq_mutability_nondeletable());
  }
  
};

var state_with_env_record_heap = function (s, new_env_heap) {
  var object_heap = s.state_object_heap,
    old_env_heap = s.state_env_record_heap,
    fresh_locs = s.state_fresh_locations;
  return (
    {
      state_object_heap: object_heap,
      state_env_record_heap: new_env_heap,
      state_fresh_locations: fresh_locs
    });
};

var state_map_env_record_heap = function (s, f) {
  return (state_with_env_record_heap(s, f(s.state_env_record_heap)));
};

var env_record_write = function (s, l, e) {
  return (
    state_map_env_record_heap(s, function (h) {
        return (HeapInt.write(h, l, e));}));
};

var env_record_alloc = function (s, e) {
  var cells = s.state_object_heap, bindings = s.state_env_record_heap,
    state_fresh_locations0 = s.state_fresh_locations;
  var l = state_fresh_locations0;
  var alloc = (state_fresh_locations0 + 1);
  var bindings$ = HeapInt.write(bindings, l, e);
  return (
    [l, {
      state_object_heap: cells,
      state_env_record_heap: bindings$,
      state_fresh_locations: alloc
    }]);
};

var provide_this_true = true;

var provide_this_false = false;

var env_record_object_default = function (l) {
  return (Coq_env_record_object(l, provide_this_false));
};

var decl_env_record_empty = Heap.empty;

var decl_env_record_write = function (ed, x, mu, v) {
  return (HeapStr.write(ed, x, [mu, v]));
};

var decl_env_record_rem = function (ed, x) {
  return (HeapStr.rem(ed, x));
};

var env_record_write_decl_env = function (s, l, x, mu, v) {
  var _switch_arg_2 = HeapInt.read(s.state_env_record_heap, l);
  switch (_switch_arg_2.tag) {
    case "Coq_env_record_decl":
      var ed = _switch_arg_2.value;
      var env$ = decl_env_record_write(ed, x, mu, v);
      return (env_record_write(s, l, Coq_env_record_decl(env$)));
    case "Coq_env_record_object":
      var o = _switch_arg_2.value, p = _switch_arg_2.provide_this;
      return (s);
  }
  
};

var lexical_env_alloc = function (s, lex, e) {
  var _tuple_arg_3 = env_record_alloc(s, e);
  var l = _tuple_arg_3[0], s$ = _tuple_arg_3[1];
  var lex$ = mk_cons(l, lex);
  return ([lex$, s$]);
};

var lexical_env_alloc_decl = function (s, lex) {
  return (
    lexical_env_alloc(s, lex, Coq_env_record_decl(decl_env_record_empty)));
};

var lexical_env_alloc_object = function (s, lex, l, pt) {
  return (lexical_env_alloc(s, lex, Coq_env_record_object(l, pt)));
};

var execution_ctx_intro_same = function (x, lthis, strict) {
  return (
    {
      execution_ctx_lexical_env: x,
      execution_ctx_variable_env: x,
      execution_ctx_this_binding: lthis,
      execution_ctx_strict: strict
    });
};

var execution_ctx_with_lex = function (c, lex) {
  var x1 = c.execution_ctx_lexical_env, x2 = c.execution_ctx_variable_env,
    x3 = c.execution_ctx_this_binding, x4 = c.execution_ctx_strict;
  return (
    {
      execution_ctx_lexical_env: lex,
      execution_ctx_variable_env: x2,
      execution_ctx_this_binding: x3,
      execution_ctx_strict: x4
    });
};

var execution_ctx_with_lex_same = function (c, lex) {
  var x1 = c.execution_ctx_lexical_env, x2 = c.execution_ctx_variable_env,
    x3 = c.execution_ctx_this_binding, x4 = c.execution_ctx_strict;
  return (
    {
      execution_ctx_lexical_env: lex,
      execution_ctx_variable_env: lex,
      execution_ctx_this_binding: x3,
      execution_ctx_strict: x4
    });
};

var lexical_env_initial = mk_cons(env_loc_global_env_record, mk_nil());

var execution_ctx_initial = function (str) {
  return (
    {
      execution_ctx_lexical_env: lexical_env_initial,
      execution_ctx_variable_env: lexical_env_initial,
      execution_ctx_this_binding: Coq_value_object(
                                    Coq_object_loc_prealloc(
                                      Coq_prealloc_global())),
      execution_ctx_strict: str
    });
};

var element_funcdecl = function (_foo_) {
  switch (_foo_.tag) {
    case "Coq_element_stat":
      var s = _foo_.stat;
      return (mk_nil());
    case "Coq_element_func_decl":
      var name = _foo_.func_name, args = _foo_.arg_names, bd = _foo_.body;
      return (
        mk_cons({
            funcdecl_name: name,
            funcdecl_parameters: args,
            funcdecl_body: bd}, mk_nil()));
  }
  
};

var prog_funcdecl = function (p) {
  return (concat(LibList.map(element_funcdecl, prog_elements(p))));
};

var stat_vardecl = function (_foo_) {
  switch (_foo_.tag) {
    case "Coq_stat_expr":
      var e = _foo_.expr;
      return (mk_nil());
    case "Coq_stat_label":
      var s0 = _foo_.label, s = _foo_.stat;
      return (stat_vardecl(s));
    case "Coq_stat_block":
      var ts = _foo_.stats;
      return (concat(map(stat_vardecl, ts)));
    case "Coq_stat_var_decl":
      var nes = _foo_.decls;
      return (LibList.map(fst, nes));
    case "Coq_stat_if":
      var e = _foo_.cond, s1 = _foo_.then_branch, s2o = _foo_.else_branch;
      return (
        append(stat_vardecl(s1),
          unsome_default(mk_nil(), LibOption.map(stat_vardecl, s2o))));
    case "Coq_stat_do_while":
      var l = _foo_.labels, s = _foo_.body, e = _foo_.cond;
      return (stat_vardecl(s));
    case "Coq_stat_while":
      var l = _foo_.labels, e = _foo_.cond, s = _foo_.body;
      return (stat_vardecl(s));
    case "Coq_stat_with":
      var e = _foo_.obj, s = _foo_.stat;
      return (stat_vardecl(s));
    case "Coq_stat_throw":
      var e = _foo_.arg;
      return (mk_nil());
    case "Coq_stat_return":
      var o = _foo_.arg_opt;
      return (mk_nil());
    case "Coq_stat_break":
      var l = _foo_.label;
      return (mk_nil());
    case "Coq_stat_continue":
      var l = _foo_.label;
      return (mk_nil());
    case "Coq_stat_try":
      var s = _foo_.body, sco = _foo_.catch_stats_opt,
        sfo = _foo_.finally_opt;
      return (
        append(stat_vardecl(s),
          append(
            unsome_default(mk_nil(),
              LibOption.map(function (sc) { return (stat_vardecl(snd(sc)));},
                sco)),
            unsome_default(mk_nil(), LibOption.map(stat_vardecl, sfo)))));
    case "Coq_stat_for":
      var l = _foo_.labels, o = _foo_.init, o0 = _foo_.cond, o1 = _foo_.step,
        s = _foo_.body;
      return (stat_vardecl(s));
    case "Coq_stat_for_var":
      var l = _foo_.labels, nes = _foo_.init, o = _foo_.cond,
        o0 = _foo_.step, s = _foo_.body;
      return (append(LibList.map(fst, nes), stat_vardecl(s)));
    case "Coq_stat_for_in":
      var l = _foo_.labels, e = _foo_.id, e0 = _foo_.obj, s = _foo_.body;
      return (stat_vardecl(s));
    case "Coq_stat_for_in_var":
      var l = _foo_.labels, str = _foo_.id, o = _foo_.init, e = _foo_.obj,
        s = _foo_.body;
      return (mk_cons(str, stat_vardecl(s)));
    case "Coq_stat_debugger":
      return (mk_nil());
    case "Coq_stat_switch":
      var l = _foo_.labels, e = _foo_.arg, sb = _foo_.body;
      return (switchbody_vardecl(sb));
  }
  
};

var switchbody_vardecl = function (_foo_) {
  switch (_foo_.tag) {
    case "Coq_switchbody_nodefault":
      var scl = _foo_.clauses;
      return (concat(map(switchclause_vardecl, scl)));
    case "Coq_switchbody_withdefault":
      var scl1 = _foo_.clauses_before, sl = _foo_.clause_default,
        scl2 = _foo_.clauses_after;
      return (
        append(concat(map(switchclause_vardecl, scl1)),
          append(concat(map(stat_vardecl, sl)),
            concat(map(switchclause_vardecl, scl2)))));
  }
  
};

var switchclause_vardecl = function (_foo_) {
  switch (_foo_.tag) {
    case "Coq_switchclause_intro":
      var e = _foo_.arg, sl = _foo_.stats;
      return (concat(map(stat_vardecl, sl)));
  }
  
};

var element_vardecl = function (_foo_) {
  switch (_foo_.tag) {
    case "Coq_element_stat":
      var t = _foo_.stat;
      return (stat_vardecl(t));
    case "Coq_element_func_decl":
      var name = _foo_.func_name, args = _foo_.arg_names, bd = _foo_.body;
      return (mk_nil());
  }
  
};

var prog_vardecl = function (p) {
  return (concat(LibList.map(element_vardecl, prog_elements(p))));
};

function Coq_preftype_number() { return {tag: "Coq_preftype_number" }; }

function Coq_preftype_string() { return {tag: "Coq_preftype_string" }; }

var method_of_preftype = function (_foo_) {
  switch (_foo_.tag) {
    case "Coq_preftype_number":
      return ("valueOf");
    case "Coq_preftype_string":
      return ("toString");
  }
  
};

var other_preftypes = function (_foo_) {
  switch (_foo_.tag) {
    case "Coq_preftype_number":
      return (Coq_preftype_string());
    case "Coq_preftype_string":
      return (Coq_preftype_number());
  }
  
};

var throw_true = true;

var throw_false = false;

var throw_irrelevant = false;

var add_one = function (n) {
  return ((n + JsNumber.one));
};

var sub_one = function (n) {
  return ((n - JsNumber.one));
};

var is_syntactic_eval = function (_foo_) {
  switch (_foo_.tag) {
    case "Coq_expr_this":
      return (false);
    case "Coq_expr_identifier":
      var s = _foo_.name;
      return (string_eq(s, "eval"));
    case "Coq_expr_literal":
      var l = _foo_.value;
      switch (l.tag) {
        case "Coq_literal_null":
          return (false);
        case "Coq_literal_bool":
          var b = l.value;
          return (false);
        case "Coq_literal_number":
          var n = l.value;
          return (false);
        case "Coq_literal_string":
          var s = l.value;
          return (string_eq(s, "eval"));
      }
      
    case "Coq_expr_object":
      var l = _foo_.fields;
      return (false);
    case "Coq_expr_array":
      var l = _foo_.elements;
      return (false);
    case "Coq_expr_function":
      var o = _foo_.func_name_opt, l = _foo_.arg_names, f = _foo_.body;
      return (false);
    case "Coq_expr_access":
      var e0 = _foo_.obj, e1 = _foo_.field;
      return (false);
    case "Coq_expr_member":
      var e0 = _foo_.obj, s = _foo_.field_name;
      return (false);
    case "Coq_expr_new":
      var e0 = _foo_.func, l = _foo_.args;
      return (false);
    case "Coq_expr_call":
      var e0 = _foo_.func, l = _foo_.args;
      return (false);
    case "Coq_expr_unary_op":
      var u = _foo_.op, e0 = _foo_.arg;
      return (false);
    case "Coq_expr_binary_op":
      var e0 = _foo_.arg1, b = _foo_.op, e1 = _foo_.arg2;
      return (false);
    case "Coq_expr_conditional":
      var e0 = _foo_.cond, e1 = _foo_.then_branch, e2 = _foo_.else_branch;
      return (false);
    case "Coq_expr_assign":
      var e0 = _foo_.left_expr, o = _foo_.op_opt, e1 = _foo_.right_expr;
      return (false);
  }
  
};

var elision_head_count = function (_foo_) {
  switch (_foo_.tag) {
    case "[]":
      return (0);
    case "::":
      var o = _foo_.head, ol$ = _foo_.tail;
      switch (o.tag) {
        case "Some":
          var t = o.value;
          return (0);
        case "None":
          return ((1 + elision_head_count(ol$)));
      }
      
  }
  
};

var elision_head_remove = function (ol) {
  switch (ol.tag) {
    case "[]":
      return (ol);
    case "::":
      var o = ol.head, ol$ = ol.tail;
      switch (o.tag) {
        case "Some":
          var t = o.value;
          return (ol);
        case "None":
          return (elision_head_remove(ol$));
      }
      
  }
  
};

var elision_tail_count = function (ol) {
  return (elision_head_count(rev(ol)));
};

var elision_tail_remove = function (ol) {
  return (rev(elision_head_remove(rev(ol))));
};

var parse_pickable = function (s, strict) {
  return (Translate_syntax.parse_esprima(strict, s));
};
}// end of with Datatypes
}// end of with JsSyntax
}// end of with JsSyntaxAux
}// end of with LibList
}// end of with LibOption
}// end of with List0
}// end of with Shared

return {
  res_overwrite_value_if_empty: res_overwrite_value_if_empty, 
  res_label_in: res_label_in, 
  convert_literal_to_prim: convert_literal_to_prim, 
  type_of_prim: type_of_prim, 
  type_of: type_of, 
  attributes_data_default: attributes_data_default, 
  attributes_accessor_default: attributes_accessor_default, 
  attributes_accessor_of_attributes_data: attributes_accessor_of_attributes_data, 
  attributes_data_of_attributes_accessor: attributes_data_of_attributes_accessor, 
  attributes_data_update: attributes_data_update, 
  attributes_accessor_update: attributes_accessor_update, 
  attributes_update: attributes_update, 
  attributes_data_of_descriptor: attributes_data_of_descriptor, 
  attributes_accessor_of_descriptor: attributes_accessor_of_descriptor, 
  descriptor_of_attributes: descriptor_of_attributes, 
  attributes_configurable: attributes_configurable, 
  attributes_enumerable: attributes_enumerable, 
  state_with_object_heap: state_with_object_heap, 
  state_map_object_heap: state_map_object_heap, 
  object_write: object_write, 
  object_alloc: object_alloc, 
  object_map_properties: object_map_properties, 
  object_new: object_new, 
  attributes_writable: attributes_writable, 
  attributes_data_intro_constant: attributes_data_intro_constant, 
  attributes_data_intro_all_true: attributes_data_intro_all_true, 
  descriptor_intro_data: descriptor_intro_data, 
  descriptor_intro_empty: descriptor_intro_empty, 
  Coq_ref_kind_null: Coq_ref_kind_null, 
  Coq_ref_kind_undef: Coq_ref_kind_undef, 
  Coq_ref_kind_primitive_base: Coq_ref_kind_primitive_base, 
  Coq_ref_kind_object: Coq_ref_kind_object, 
  Coq_ref_kind_env_record: Coq_ref_kind_env_record, 
  ref_kind_of: ref_kind_of, 
  ref_create_value: ref_create_value, 
  ref_create_env_loc: ref_create_env_loc, 
  mutability_of_bool: mutability_of_bool, 
  state_with_env_record_heap: state_with_env_record_heap, 
  state_map_env_record_heap: state_map_env_record_heap, 
  env_record_write: env_record_write, 
  env_record_alloc: env_record_alloc, 
  provide_this_true: provide_this_true, 
  provide_this_false: provide_this_false, 
  env_record_object_default: env_record_object_default, 
  decl_env_record_empty: decl_env_record_empty, 
  decl_env_record_write: decl_env_record_write, 
  decl_env_record_rem: decl_env_record_rem, 
  env_record_write_decl_env: env_record_write_decl_env, 
  lexical_env_alloc: lexical_env_alloc, 
  lexical_env_alloc_decl: lexical_env_alloc_decl, 
  lexical_env_alloc_object: lexical_env_alloc_object, 
  execution_ctx_intro_same: execution_ctx_intro_same, 
  execution_ctx_with_lex: execution_ctx_with_lex, 
  execution_ctx_with_lex_same: execution_ctx_with_lex_same, 
  lexical_env_initial: lexical_env_initial, 
  execution_ctx_initial: execution_ctx_initial, 
  element_funcdecl: element_funcdecl, 
  prog_funcdecl: prog_funcdecl, 
  stat_vardecl: stat_vardecl, 
  switchbody_vardecl: switchbody_vardecl, 
  switchclause_vardecl: switchclause_vardecl, 
  element_vardecl: element_vardecl, 
  prog_vardecl: prog_vardecl, 
  Coq_preftype_number: Coq_preftype_number, 
  Coq_preftype_string: Coq_preftype_string, 
  method_of_preftype: method_of_preftype, 
  other_preftypes: other_preftypes, 
  throw_true: throw_true, 
  throw_false: throw_false, 
  throw_irrelevant: throw_irrelevant, 
  add_one: add_one, 
  sub_one: sub_one, 
  is_syntactic_eval: is_syntactic_eval, 
  elision_head_count: elision_head_count, 
  elision_head_remove: elision_head_remove, 
  elision_tail_count: elision_tail_count, 
  elision_tail_remove: elision_tail_remove, 
  parse_pickable: parse_pickable};
})();

/* --------------------- tests/jsref/JsCommonAux.unlog.js --------------------- */

var JsCommonAux = (function() {
with (Datatypes) {
with (JsCommon) {
with (JsSyntax) {
with (JsSyntaxAux) {
with (LibList) {
with (LibOption) {
with (Shared) {

var __ = {};

var if_some_then_same_dec = function (x, y, d) {
  switch (x.tag) {
    case "Some":
      var a = x.value;
      switch (y.tag) {
        case "Some":
          var a0 = y.value;
          return (d(a0, a));
        case "None":
          return (true);
      }
      
    case "None":
      switch (y.tag) {
        case "Some":
          var a = y.value;
          return (false);
        case "None":
          return (true);
      }
      
  }
  
};

var same_value_dec = function (v1, v2) {
  var h0 = !(type_compare(type_of(v1), type_of(v2)));
  return (
    (function () {
        if (h0) {
          return (function (_pat_any_20) { return (false);});
        } else {
          return (
            function (_pat_any_1) {
              var t = type_of(v1);
              return (
                (function () {
                    switch (t.tag) {
                      case "Coq_type_undef":
                        return (
                          function (_pat_any_2, _pat_any_3) {
                            return (true);
                          });
                      case "Coq_type_null":
                        return (
                          function (_pat_any_4, _pat_any_5) {
                            return (true);
                          });
                      case "Coq_type_bool":
                        return (
                          function (_pat_any_6, _pat_any_7) {
                            return (value_compare(v1, v2));
                          });
                      case "Coq_type_number":
                        return (
                          function (_pat_any_8, _pat_any_9) {
                            var h2 = (value_compare(v1,
                                        Coq_value_prim(
                                          Coq_prim_number(JsNumber.nan)))
                                     && value_compare(v2,
                                          Coq_value_prim(
                                            Coq_prim_number(JsNumber.nan))));
                            return (
                              (function () {
                                  if (h2) {
                                    return (
                                      function (_pat_any_15) {
                                        return (true);
                                      });
                                  } else {
                                    return (
                                      function (_pat_any_10) {
                                        var h3 = (value_compare(v1,
                                                    Coq_value_prim(
                                                      Coq_prim_number(
                                                        JsNumber.zero)))
                                                 && value_compare(v2,
                                                      Coq_value_prim(
                                                        Coq_prim_number(
                                                          JsNumber.neg_zero))));
                                        return (
                                          (function () {
                                              if (h3) {
                                                return (
                                                  function (_pat_any_14) {
                                                    return (false);
                                                  });
                                              } else {
                                                return (
                                                  function (_pat_any_11) {
                                                    var h4 = (value_compare(
                                                                v1,
                                                                Coq_value_prim(
                                                                  Coq_prim_number(
                                                                    JsNumber.neg_zero)))
                                                             && value_compare(
                                                                  v2,
                                                                  Coq_value_prim(
                                                                    Coq_prim_number(
                                                                    JsNumber.zero))));
                                                    return (
                                                      (function () {
                                                          if (h4) {
                                                            return (
                                                              function (_pat_any_13) {
                                                                return (
                                                                  false);
                                                              });
                                                          } else {
                                                            return (
                                                              function (_pat_any_12) {
                                                                return (
                                                                  value_compare(
                                                                    v1, v2));
                                                              });
                                                          }}())(__));
                                                  });
                                              }}())(__));
                                      });
                                  }}())(__));
                          });
                      case "Coq_type_string":
                        return (
                          function (_pat_any_16, _pat_any_17) {
                            return (value_compare(v1, v2));
                          });
                      case "Coq_type_object":
                        return (
                          function (_pat_any_18, _pat_any_19) {
                            return (value_compare(v1, v2));
                          });
                    }
                    }())(__, __));
            });
        }}())(__));
};

var attributes_data_compare = function (ad1, ad2) {
  var v1 = ad1.attributes_data_value, w1 = ad1.attributes_data_writable,
    e1 = ad1.attributes_data_enumerable,
    c1 = ad1.attributes_data_configurable;
  var v2 = ad2.attributes_data_value, w2 = ad2.attributes_data_writable,
    e2 = ad2.attributes_data_enumerable,
    c2 = ad2.attributes_data_configurable;
  return (
    (value_compare(v1, v2)
    && (_compare_bool(w1, w2)
       && (_compare_bool(e1, e2) && _compare_bool(c1, c2)))));
};

var attributes_accessor_compare = function (aa1, aa2) {
  var v1 = aa1.attributes_accessor_get, w1 = aa1.attributes_accessor_set,
    e1 = aa1.attributes_accessor_enumerable,
    c1 = aa1.attributes_accessor_configurable;
  var v2 = aa2.attributes_accessor_get, w2 = aa2.attributes_accessor_set,
    e2 = aa2.attributes_accessor_enumerable,
    c2 = aa2.attributes_accessor_configurable;
  return (
    (value_compare(v1, v2)
    && (value_compare(w1, w2) && (bool_eq(e1, e2) && bool_eq(c1, c2)))));
};

var attributes_compare = function (a1, a2) {
  switch (a1.tag) {
    case "Coq_attributes_data_of":
      var ad1 = a1.value;
      switch (a2.tag) {
        case "Coq_attributes_data_of":
          var ad2 = a2.value;
          return (attributes_data_compare(ad1, ad2));
        case "Coq_attributes_accessor_of":
          var a = a2.value;
          return (false);
      }
      
    case "Coq_attributes_accessor_of":
      var aa1 = a1.value;
      switch (a2.tag) {
        case "Coq_attributes_data_of":
          var a = a2.value;
          return (false);
        case "Coq_attributes_accessor_of":
          var aa2 = a2.value;
          return (attributes_accessor_compare(aa1, aa2));
      }
      
  }
  
};

var full_descriptor_compare = function (an1, an2) {
  switch (an1.tag) {
    case "Coq_full_descriptor_undef":
      switch (an2.tag) {
        case "Coq_full_descriptor_undef":
          return (true);
        case "Coq_full_descriptor_some":
          var a = an2.value;
          return (false);
      }
      
    case "Coq_full_descriptor_some":
      var a1 = an1.value;
      switch (an2.tag) {
        case "Coq_full_descriptor_undef":
          return (false);
        case "Coq_full_descriptor_some":
          var a2 = an2.value;
          return (attributes_compare(a1, a2));
      }
      
  }
  
};

var ref_kind_comparable = function (x, y) {
  switch (x.tag) {
    case "Coq_ref_kind_null":
      switch (y.tag) {
        case "Coq_ref_kind_null":
          return (true);
        case "Coq_ref_kind_undef":
          return (false);
        case "Coq_ref_kind_primitive_base":
          return (false);
        case "Coq_ref_kind_object":
          return (false);
        case "Coq_ref_kind_env_record":
          return (false);
      }
      
    case "Coq_ref_kind_undef":
      switch (y.tag) {
        case "Coq_ref_kind_null":
          return (false);
        case "Coq_ref_kind_undef":
          return (true);
        case "Coq_ref_kind_primitive_base":
          return (false);
        case "Coq_ref_kind_object":
          return (false);
        case "Coq_ref_kind_env_record":
          return (false);
      }
      
    case "Coq_ref_kind_primitive_base":
      switch (y.tag) {
        case "Coq_ref_kind_null":
          return (false);
        case "Coq_ref_kind_undef":
          return (false);
        case "Coq_ref_kind_primitive_base":
          return (true);
        case "Coq_ref_kind_object":
          return (false);
        case "Coq_ref_kind_env_record":
          return (false);
      }
      
    case "Coq_ref_kind_object":
      switch (y.tag) {
        case "Coq_ref_kind_null":
          return (false);
        case "Coq_ref_kind_undef":
          return (false);
        case "Coq_ref_kind_primitive_base":
          return (false);
        case "Coq_ref_kind_object":
          return (true);
        case "Coq_ref_kind_env_record":
          return (false);
      }
      
    case "Coq_ref_kind_env_record":
      switch (y.tag) {
        case "Coq_ref_kind_null":
          return (false);
        case "Coq_ref_kind_undef":
          return (false);
        case "Coq_ref_kind_primitive_base":
          return (false);
        case "Coq_ref_kind_object":
          return (false);
        case "Coq_ref_kind_env_record":
          return (true);
      }
      
  }
  
};

var object_binds_pickable_option = function (s, l) {
  return (HeapObj.read_option(s.state_object_heap, l));
};

var env_record_binds_pickable_option = function (s, l) {
  return (HeapInt.read_option(s.state_env_record_heap, l));
};

var decl_env_record_pickable_option = function (ed, x) {
  return (HeapStr.read_option(ed, x));
};

var descriptor_is_data_dec = function (desc) {
  return (
    !(
      (option_compare(value_compare, desc.descriptor_value, None())
      && option_compare(bool_eq, desc.descriptor_writable, None()))));
};

var descriptor_is_accessor_dec = function (desc) {
  return (
    !(
      (option_compare(value_compare, desc.descriptor_get, None())
      && option_compare(value_compare, desc.descriptor_set, None()))));
};

var descriptor_is_generic_dec = function (desc) {
  return (
    (!(descriptor_is_data_dec(desc)) && !(descriptor_is_accessor_dec(desc))));
};

var prepost_unary_op_dec = function (op) {
  switch (op.tag) {
    case "Coq_unary_op_delete":
      return (false);
    case "Coq_unary_op_void":
      return (false);
    case "Coq_unary_op_typeof":
      return (false);
    case "Coq_unary_op_post_incr":
      return (true);
    case "Coq_unary_op_post_decr":
      return (true);
    case "Coq_unary_op_pre_incr":
      return (true);
    case "Coq_unary_op_pre_decr":
      return (true);
    case "Coq_unary_op_add":
      return (false);
    case "Coq_unary_op_neg":
      return (false);
    case "Coq_unary_op_bitwise_not":
      return (false);
    case "Coq_unary_op_not":
      return (false);
  }
  
};

var attributes_is_data_dec = function (a) {
  switch (a.tag) {
    case "Coq_attributes_data_of":
      var a0 = a.value;
      return (true);
    case "Coq_attributes_accessor_of":
      var a0 = a.value;
      return (false);
  }
  
};

var run_object_heap_map_properties = function (s, l, f) {
  return (
    map(function (o) {
        return (object_write(s, l, object_map_properties(o, f)));},
      object_binds_pickable_option(s, l)));
};

var object_heap_map_properties_pickable_option = function (s, l, f) {
  return (run_object_heap_map_properties(s, l, f));
};

var descriptor_contains_dec = function (desc1, desc2) {
  var descriptor_value0 = desc1.descriptor_value,
    descriptor_writable0 = desc1.descriptor_writable,
    descriptor_get0 = desc1.descriptor_get,
    descriptor_set0 = desc1.descriptor_set,
    descriptor_enumerable0 = desc1.descriptor_enumerable,
    descriptor_configurable0 = desc1.descriptor_configurable;
  var descriptor_value1 = desc2.descriptor_value,
    descriptor_writable1 = desc2.descriptor_writable,
    descriptor_get1 = desc2.descriptor_get,
    descriptor_set1 = desc2.descriptor_set,
    descriptor_enumerable1 = desc2.descriptor_enumerable,
    descriptor_configurable1 = desc2.descriptor_configurable;
  return (
    (if_some_then_same_dec(descriptor_value0, descriptor_value1,
       function (u, v) { return (same_value_dec(u, v));})
    && (if_some_then_same_dec(descriptor_writable0, descriptor_writable1,
          function (u, v) { return (bool_eq(u, v));})
       && (if_some_then_same_dec(descriptor_get0, descriptor_get1,
             function (u, v) { return (same_value_dec(u, v));})
          && (if_some_then_same_dec(descriptor_set0, descriptor_set1,
                function (u, v) { return (same_value_dec(u, v));})
             && (if_some_then_same_dec(descriptor_enumerable0,
                   descriptor_enumerable1, function (u, v) {
                     return (bool_eq(u, v));})
                && if_some_then_same_dec(descriptor_configurable0,
                     descriptor_configurable1, function (u, v) {
                       return (bool_eq(u, v));})))))));
};

var descriptor_enumerable_not_same_dec = function (a, desc) {
  var o = desc.descriptor_enumerable;
  switch (o.tag) {
    case "Some":
      var b = o.value;
      return (!(bool_eq(b, attributes_enumerable(a))));
    case "None":
      return (false);
  }
  
};

var descriptor_value_not_same_dec = function (ad, desc) {
  var o = desc.descriptor_value;
  switch (o.tag) {
    case "Some":
      var v = o.value;
      return (!(same_value_dec(v, ad.attributes_data_value)));
    case "None":
      return (false);
  }
  
};

var descriptor_get_not_same_dec = function (aa, desc) {
  var o = desc.descriptor_get;
  switch (o.tag) {
    case "Some":
      var v = o.value;
      return (!(same_value_dec(v, aa.attributes_accessor_get)));
    case "None":
      return (false);
  }
  
};

var descriptor_set_not_same_dec = function (aa, desc) {
  var o = desc.descriptor_set;
  switch (o.tag) {
    case "Some":
      var v = o.value;
      return (!(same_value_dec(v, aa.attributes_accessor_set)));
    case "None":
      return (false);
  }
  
};

var attributes_change_enumerable_on_non_configurable_dec = function (a, desc) {
  return (
    (!(attributes_configurable(a))
    && (option_compare(bool_eq, desc.descriptor_configurable, Some(true))
       || descriptor_enumerable_not_same_dec(a, desc))));
};

var attributes_change_data_on_non_configurable_dec = function (ad, desc) {
  return (
    (!(attributes_configurable(Coq_attributes_data_of(ad)))
    && (!(ad.attributes_data_writable)
       && (option_compare(bool_eq, desc.descriptor_writable, Some(true))
          || descriptor_value_not_same_dec(ad, desc)))));
};

var attributes_change_accessor_on_non_configurable_dec = function (aa, desc) {
  return (
    (!(attributes_configurable(Coq_attributes_accessor_of(aa)))
    && (descriptor_get_not_same_dec(aa, desc)
       || descriptor_set_not_same_dec(aa, desc))));
};

var run_function_get_error_case = function (s, x, v) {
  switch (v.tag) {
    case "Coq_value_prim":
      var w = v.value;
      return (false);
    case "Coq_value_object":
      var l = v.value;
      return (
        ((function () {
          if (string_eq(x, "caller")) {
            return (true);
          } else {
            return (false);
          }}())
        && option_case(false, function (o) {
               return (
                 option_case(false, function (bd) {
                     return (funcbody_is_strict(bd));}, o.object_code_));},
             object_binds_pickable_option(s, l))));
  }
  
};

var spec_function_get_error_case_dec = function (s, x, v) {
  return (run_function_get_error_case(s, x, v));
};

var run_callable = function (s, v) {
  switch (v.tag) {
    case "Coq_value_prim":
      var w = v.value;
      return (Some(None()));
    case "Coq_value_object":
      var l = v.value;
      return (
        option_case(None(), function (o) { return (Some(o.object_call_));},
          object_binds_pickable_option(s, l)));
  }
  
};

var is_callable_dec = function (s, v) {
  return (
    option_case(false, function (o) {
        return (option_case(false, function (x) { return (true);}, o));},
      run_callable(s, v)));
};

var object_properties_keys_as_list_pickable_option = function (s, l) {
  return (
    map(function (props) { return (LibList.map(fst, HeapStr.to_list(props)));
      }, map(object_properties_, object_binds_pickable_option(s, l))));
};
}// end of with Datatypes
}// end of with JsCommon
}// end of with JsSyntax
}// end of with JsSyntaxAux
}// end of with LibList
}// end of with LibOption
}// end of with Shared

return {
  __: __, 
  if_some_then_same_dec: if_some_then_same_dec, 
  same_value_dec: same_value_dec, 
  attributes_data_compare: attributes_data_compare, 
  attributes_accessor_compare: attributes_accessor_compare, 
  attributes_compare: attributes_compare, 
  full_descriptor_compare: full_descriptor_compare, 
  ref_kind_comparable: ref_kind_comparable, 
  object_binds_pickable_option: object_binds_pickable_option, 
  env_record_binds_pickable_option: env_record_binds_pickable_option, 
  decl_env_record_pickable_option: decl_env_record_pickable_option, 
  descriptor_is_data_dec: descriptor_is_data_dec, 
  descriptor_is_accessor_dec: descriptor_is_accessor_dec, 
  descriptor_is_generic_dec: descriptor_is_generic_dec, 
  prepost_unary_op_dec: prepost_unary_op_dec, 
  attributes_is_data_dec: attributes_is_data_dec, 
  run_object_heap_map_properties: run_object_heap_map_properties, 
  object_heap_map_properties_pickable_option: object_heap_map_properties_pickable_option, 
  descriptor_contains_dec: descriptor_contains_dec, 
  descriptor_enumerable_not_same_dec: descriptor_enumerable_not_same_dec, 
  descriptor_value_not_same_dec: descriptor_value_not_same_dec, 
  descriptor_get_not_same_dec: descriptor_get_not_same_dec, 
  descriptor_set_not_same_dec: descriptor_set_not_same_dec, 
  attributes_change_enumerable_on_non_configurable_dec: attributes_change_enumerable_on_non_configurable_dec, 
  attributes_change_data_on_non_configurable_dec: attributes_change_data_on_non_configurable_dec, 
  attributes_change_accessor_on_non_configurable_dec: attributes_change_accessor_on_non_configurable_dec, 
  run_function_get_error_case: run_function_get_error_case, 
  spec_function_get_error_case_dec: spec_function_get_error_case_dec, 
  run_callable: run_callable, 
  is_callable_dec: is_callable_dec, 
  object_properties_keys_as_list_pickable_option: object_properties_keys_as_list_pickable_option};
})();

/* --------------------- tests/jsref/JsPreliminary.unlog.js --------------------- */

var JsPreliminary = (function() {



return {};
})();

/* --------------------- tests/jsref/JsInit.unlog.js --------------------- */

var JsInit = (function() {
with (JsCommon) {
with (JsSyntax) {
with (JsSyntaxAux) {

var string_of_native_error = function (_foo_) {
  switch (_foo_.tag) {
    case "Coq_native_error_eval":
      return ("EvalError");
    case "Coq_native_error_range":
      return ("RangeError");
    case "Coq_native_error_ref":
      return ("ReferenceError");
    case "Coq_native_error_syntax":
      return ("SyntaxError");
    case "Coq_native_error_type":
      return ("TypeError");
    case "Coq_native_error_uri":
      return ("URIError");
  }
  
};

var prop_attributes_for_global_object = function (v) {
  return (
    {
      attributes_data_value: v,
      attributes_data_writable: true,
      attributes_data_enumerable: false,
      attributes_data_configurable: true
    });
};

var attrib_constant = function (v) {
  return (
    {
      attributes_data_value: v,
      attributes_data_writable: false,
      attributes_data_enumerable: false,
      attributes_data_configurable: false
    });
};

var object_create_builtin = function (vproto, sclass, p) {
  return (object_create(vproto, sclass, true, p));
};

var object_create_prealloc_call_or_construct = function (length, p) {
  var sclass = "Function";
  var p$ = HeapStr.write(p, "length",
             Coq_attributes_data_of(attrib_constant(length)));
  return (
    object_create_builtin(
      Coq_value_object(
        Coq_object_loc_prealloc(Coq_prealloc_function_proto())), sclass, p$));
};

var object_create_prealloc_call = function (fprealloc, length, p) {
  var o = object_create_prealloc_call_or_construct(length, p);
  return (
    object_with_invokation(o, None(), Some(Coq_call_prealloc(fprealloc)),
      None()));
};

var object_create_prealloc_constructor = function (fprealloc, length, p) {
  var o = object_create_prealloc_call_or_construct(length, p);
  return (
    object_with_invokation(o, Some(Coq_construct_prealloc(fprealloc)),
      Some(Coq_call_prealloc(fprealloc)),
      Some(Coq_builtin_has_instance_function())));
};

var write_native = function (p, name, v) {
  return (
    HeapStr.write(p, name,
      Coq_attributes_data_of(prop_attributes_for_global_object(v))));
};

var write_constant = function (p, name, value0) {
  return (
    HeapStr.write(p, name, Coq_attributes_data_of(attrib_constant(value0))));
};

var object_prealloc_global_proto = Coq_value_prim(Coq_prim_null());

var object_prealloc_global_class = "GlobalClass";

var object_prealloc_global_properties = (function () {
  var p = write_constant(Heap.empty, "NaN",
            Coq_value_prim(Coq_prim_number(JsNumber.nan)));
  var p0 = write_constant(p, "Infinity",
             Coq_value_prim(Coq_prim_number(JsNumber.infinity)));
  var p1 = write_constant(p0, "undefined", Coq_value_prim(Coq_prim_undef()));
  var p2 = write_native(p1, "eval",
             Coq_value_object(
               Coq_object_loc_prealloc(Coq_prealloc_global_eval())));
  var p3 = write_native(p2, "parseInt",
             Coq_value_object(
               Coq_object_loc_prealloc(Coq_prealloc_global_parse_int())));
  var p4 = write_native(p3, "parseFloat",
             Coq_value_object(
               Coq_object_loc_prealloc(Coq_prealloc_global_parse_float())));
  var p5 = write_native(p4, "isNaN",
             Coq_value_object(
               Coq_object_loc_prealloc(Coq_prealloc_global_is_nan())));
  var p6 = write_native(p5, "isFinite",
             Coq_value_object(
               Coq_object_loc_prealloc(Coq_prealloc_global_is_finite())));
  var p7 = write_native(p6, "decodeURI",
             Coq_value_object(
               Coq_object_loc_prealloc(Coq_prealloc_global_decode_uri())));
  var p8 = write_native(p7, "decodeURIComponent",
             Coq_value_object(
               Coq_object_loc_prealloc(
                 Coq_prealloc_global_decode_uri_component())));
  var p9 = write_native(p8, "encodeURI",
             Coq_value_object(
               Coq_object_loc_prealloc(Coq_prealloc_global_encode_uri())));
  var p10 = write_native(p9, "encodeURIComponent",
              Coq_value_object(
                Coq_object_loc_prealloc(
                  Coq_prealloc_global_encode_uri_component())));
  var p11 = write_native(p10, "Object",
              Coq_value_object(
                Coq_object_loc_prealloc(Coq_prealloc_object())));
  var p12 = write_native(p11, "Function",
              Coq_value_object(
                Coq_object_loc_prealloc(Coq_prealloc_function())));
  var p13 = write_native(p12, "Array",
              Coq_value_object(Coq_object_loc_prealloc(Coq_prealloc_array())));
  var p14 = write_native(p13, "String",
              Coq_value_object(
                Coq_object_loc_prealloc(Coq_prealloc_string())));
  var p15 = write_native(p14, "Boolean",
              Coq_value_object(Coq_object_loc_prealloc(Coq_prealloc_bool())));
  var p16 = write_native(p15, "Number",
              Coq_value_object(
                Coq_object_loc_prealloc(Coq_prealloc_number())));
  var p17 = write_native(p16, "Math",
              Coq_value_object(Coq_object_loc_prealloc(Coq_prealloc_math())));
  var p18 = write_native(p17, "Date",
              Coq_value_object(Coq_object_loc_prealloc(Coq_prealloc_date())));
  var p19 = write_native(p18, "RegExp",
              Coq_value_object(
                Coq_object_loc_prealloc(Coq_prealloc_regexp())));
  var p20 = write_native(p19, "Error",
              Coq_value_object(Coq_object_loc_prealloc(Coq_prealloc_error())));
  var p21 = write_native(p20, "EvalError",
              Coq_value_object(
                Coq_object_loc_prealloc(
                  Coq_prealloc_native_error(Coq_native_error_eval()))));
  var p22 = write_native(p21, "RangeError",
              Coq_value_object(
                Coq_object_loc_prealloc(
                  Coq_prealloc_native_error(Coq_native_error_range()))));
  var p23 = write_native(p22, "ReferenceError",
              Coq_value_object(
                Coq_object_loc_prealloc(
                  Coq_prealloc_native_error(Coq_native_error_ref()))));
  var p24 = write_native(p23, "SyntaxError",
              Coq_value_object(
                Coq_object_loc_prealloc(
                  Coq_prealloc_native_error(Coq_native_error_syntax()))));
  var p25 = write_native(p24, "TypeError",
              Coq_value_object(
                Coq_object_loc_prealloc(
                  Coq_prealloc_native_error(Coq_native_error_type()))));
  var p26 = write_native(p25, "URIError",
              Coq_value_object(
                Coq_object_loc_prealloc(
                  Coq_prealloc_native_error(Coq_native_error_uri()))));
  return (
    write_native(p26, "JSON",
      Coq_value_object(Coq_object_loc_prealloc(Coq_prealloc_json()))));
}())
;

var object_prealloc_global = object_create_builtin(
                               object_prealloc_global_proto,
                               object_prealloc_global_class,
                               object_prealloc_global_properties);

var global_eval_function_object = object_create_prealloc_call(
                                    Coq_prealloc_global_eval(),
                                    Coq_value_prim(Coq_prim_number(1.0)),
                                    Heap.empty);

var global_parse_int_function_object = object_create_prealloc_call(
                                         Coq_prealloc_global_parse_int(),
                                         Coq_value_prim(Coq_prim_number(2.0)),
                                         Heap.empty);

var global_parse_float_function_object = object_create_prealloc_call(
                                           Coq_prealloc_global_parse_float(),
                                           Coq_value_prim(
                                             Coq_prim_number(1.0)),
                                           Heap.empty);

var global_is_nan_function_object = object_create_prealloc_call(
                                      Coq_prealloc_global_is_nan(),
                                      Coq_value_prim(Coq_prim_number(1.0)),
                                      Heap.empty);

var global_is_finite_function_object = object_create_prealloc_call(
                                         Coq_prealloc_global_is_finite(),
                                         Coq_value_prim(Coq_prim_number(1.0)),
                                         Heap.empty);

var global_decode_uri_function_object = object_create_prealloc_call(
                                          Coq_prealloc_global_decode_uri(),
                                          Coq_value_prim(
                                            Coq_prim_number(1.0)),
                                          Heap.empty);

var global_decode_uri_component_function_object = object_create_prealloc_call(
                                                    Coq_prealloc_global_decode_uri_component(
                                                      ),
                                                    Coq_value_prim(
                                                      Coq_prim_number(1.0)),
                                                    Heap.empty);

var global_encode_uri_function_object = object_create_prealloc_call(
                                          Coq_prealloc_global_encode_uri(),
                                          Coq_value_prim(
                                            Coq_prim_number(1.0)),
                                          Heap.empty);

var global_encode_uri_component_function_object = object_create_prealloc_call(
                                                    Coq_prealloc_global_encode_uri_component(
                                                      ),
                                                    Coq_value_prim(
                                                      Coq_prim_number(1.0)),
                                                    Heap.empty);

var object_prealloc_object = (function () {
  var p = write_constant(Heap.empty, "prototype",
            Coq_value_object(
              Coq_object_loc_prealloc(Coq_prealloc_object_proto())));
  var p0 = write_native(p, "getPrototypeOf",
             Coq_value_object(
               Coq_object_loc_prealloc(Coq_prealloc_object_get_proto_of())));
  var p1 = write_native(p0, "getOwnPropertyDescriptor",
             Coq_value_object(
               Coq_object_loc_prealloc(
                 Coq_prealloc_object_get_own_prop_descriptor())));
  var p2 = write_native(p1, "getOwnPropertyNames",
             Coq_value_object(
               Coq_object_loc_prealloc(
                 Coq_prealloc_object_get_own_prop_name())));
  var p3 = write_native(p2, "create",
             Coq_value_object(
               Coq_object_loc_prealloc(Coq_prealloc_object_create())));
  var p4 = write_native(p3, "defineProperty",
             Coq_value_object(
               Coq_object_loc_prealloc(Coq_prealloc_object_define_prop())));
  var p5 = write_native(p4, "defineProperties",
             Coq_value_object(
               Coq_object_loc_prealloc(Coq_prealloc_object_define_props())));
  var p6 = write_native(p5, "seal",
             Coq_value_object(
               Coq_object_loc_prealloc(Coq_prealloc_object_seal())));
  var p7 = write_native(p6, "freeze",
             Coq_value_object(
               Coq_object_loc_prealloc(Coq_prealloc_object_freeze())));
  var p8 = write_native(p7, "preventExtensions",
             Coq_value_object(
               Coq_object_loc_prealloc(
                 Coq_prealloc_object_prevent_extensions())));
  var p9 = write_native(p8, "isSealed",
             Coq_value_object(
               Coq_object_loc_prealloc(Coq_prealloc_object_is_sealed())));
  var p10 = write_native(p9, "isFrozen",
              Coq_value_object(
                Coq_object_loc_prealloc(Coq_prealloc_object_is_frozen())));
  var p11 = write_native(p10, "isExtensible",
              Coq_value_object(
                Coq_object_loc_prealloc(Coq_prealloc_object_is_extensible())));
  return (
    object_create_prealloc_constructor(Coq_prealloc_object(),
      Coq_value_prim(Coq_prim_number(1.0)), p11));
}())
;

var object_get_proto_of_function_object = object_create_prealloc_call(
                                            Coq_prealloc_object_get_proto_of(
                                              ),
                                            Coq_value_prim(
                                              Coq_prim_number(1.0)),
                                            Heap.empty);

var object_get_own_prop_descriptor_function_object = object_create_prealloc_call(
                                                       Coq_prealloc_object_get_own_prop_descriptor(
                                                         ),
                                                       Coq_value_prim(
                                                         Coq_prim_number(1.0)),
                                                       Heap.empty);

var object_get_own_prop_name_function_object = object_create_prealloc_call(
                                                 Coq_prealloc_object_get_own_prop_name(
                                                   ),
                                                 Coq_value_prim(
                                                   Coq_prim_number(1.0)),
                                                 Heap.empty);

var object_create_function_object = object_create_prealloc_call(
                                      Coq_prealloc_object_create(),
                                      Coq_value_prim(Coq_prim_number(2.0)),
                                      Heap.empty);

var object_define_prop_function_object = object_create_prealloc_call(
                                           Coq_prealloc_object_define_prop(),
                                           Coq_value_prim(
                                             Coq_prim_number(2.0)),
                                           Heap.empty);

var object_define_props_function_object = object_create_prealloc_call(
                                            Coq_prealloc_object_define_props(
                                              ),
                                            Coq_value_prim(
                                              Coq_prim_number(2.0)),
                                            Heap.empty);

var object_seal_function_object = object_create_prealloc_call(
                                    Coq_prealloc_object_seal(),
                                    Coq_value_prim(Coq_prim_number(1.0)),
                                    Heap.empty);

var object_freeze_function_object = object_create_prealloc_call(
                                      Coq_prealloc_object_freeze(),
                                      Coq_value_prim(Coq_prim_number(1.0)),
                                      Heap.empty);

var object_prevent_extensions_function_object = object_create_prealloc_call(
                                                  Coq_prealloc_object_prevent_extensions(
                                                    ),
                                                  Coq_value_prim(
                                                    Coq_prim_number(1.0)),
                                                  Heap.empty);

var object_is_sealed_function_object = object_create_prealloc_call(
                                         Coq_prealloc_object_is_sealed(),
                                         Coq_value_prim(Coq_prim_number(1.0)),
                                         Heap.empty);

var object_is_frozen_function_object = object_create_prealloc_call(
                                         Coq_prealloc_object_is_frozen(),
                                         Coq_value_prim(Coq_prim_number(1.0)),
                                         Heap.empty);

var object_is_extensible_function_object = object_create_prealloc_call(
                                             Coq_prealloc_object_is_extensible(
                                               ),
                                             Coq_value_prim(
                                               Coq_prim_number(1.0)),
                                             Heap.empty);

var object_prealloc_object_proto = (function () {
  var p = write_native(Heap.empty, "constructor",
            Coq_value_object(Coq_object_loc_prealloc(Coq_prealloc_object())));
  var p0 = write_native(p, "toString",
             Coq_value_object(
               Coq_object_loc_prealloc(Coq_prealloc_object_proto_to_string())));
  var p1 = write_native(p0, "valueOf",
             Coq_value_object(
               Coq_object_loc_prealloc(Coq_prealloc_object_proto_value_of())));
  var p2 = write_native(p1, "hasOwnProperty",
             Coq_value_object(
               Coq_object_loc_prealloc(
                 Coq_prealloc_object_proto_has_own_prop())));
  var p3 = write_native(p2, "isPrototypeOf",
             Coq_value_object(
               Coq_object_loc_prealloc(
                 Coq_prealloc_object_proto_is_prototype_of())));
  var p4 = write_native(p3, "propertyIsEnumerable",
             Coq_value_object(
               Coq_object_loc_prealloc(
                 Coq_prealloc_object_proto_prop_is_enumerable())));
  return (
    object_create_builtin(Coq_value_prim(Coq_prim_null()), "Object", p4));
}())
;

var object_proto_to_string_function_object = object_create_prealloc_call(
                                               Coq_prealloc_object_proto_to_string(
                                                 ),
                                               Coq_value_prim(
                                                 Coq_prim_number(0.0)),
                                               Heap.empty);

var object_proto_value_of_function_object = object_create_prealloc_call(
                                              Coq_prealloc_object_proto_value_of(
                                                ),
                                              Coq_value_prim(
                                                Coq_prim_number(0.0)),
                                              Heap.empty);

var object_proto_has_own_prop_function_object = object_create_prealloc_call(
                                                  Coq_prealloc_object_proto_has_own_prop(
                                                    ),
                                                  Coq_value_prim(
                                                    Coq_prim_number(0.0)),
                                                  Heap.empty);

var object_proto_is_prototype_of_function_object = object_create_prealloc_call(
                                                     Coq_prealloc_object_proto_is_prototype_of(
                                                       ),
                                                     Coq_value_prim(
                                                       Coq_prim_number(1.0)),
                                                     Heap.empty);

var object_proto_prop_is_enumerable_function_object = object_create_prealloc_call(
                                                        Coq_prealloc_object_proto_prop_is_enumerable(
                                                          ),
                                                        Coq_value_prim(
                                                          Coq_prim_number(
                                                            1.0)),
                                                        Heap.empty);

var object_prealloc_function = (function () {
  var p = write_constant(Heap.empty, "prototype",
            Coq_value_object(
              Coq_object_loc_prealloc(Coq_prealloc_function_proto())));
  return (
    object_create_prealloc_constructor(Coq_prealloc_function(),
      Coq_value_prim(Coq_prim_number(1.0)), p));
}())
;

var object_prealloc_function_proto = (function () {
  var p = write_native(Heap.empty, "constructor",
            Coq_value_object(
              Coq_object_loc_prealloc(Coq_prealloc_function())));
  var p0 = HeapStr.write(p, "length",
             Coq_attributes_data_of(
               attrib_constant(Coq_value_prim(Coq_prim_number(0.0)))));
  var p1 = write_native(p0, "toString",
             Coq_value_object(
               Coq_object_loc_prealloc(
                 Coq_prealloc_function_proto_to_string())));
  var p2 = write_native(p1, "apply",
             Coq_value_object(
               Coq_object_loc_prealloc(Coq_prealloc_function_proto_apply())));
  var p3 = write_native(p2, "call",
             Coq_value_object(
               Coq_object_loc_prealloc(Coq_prealloc_function_proto_call())));
  var p4 = write_native(p3, "bind",
             Coq_value_object(
               Coq_object_loc_prealloc(Coq_prealloc_function_proto_bind())));
  var o = object_create_builtin(
            Coq_value_object(
              Coq_object_loc_prealloc(Coq_prealloc_object_proto())),
            "Function", p4);
  return (
    object_with_invokation(o, None(),
      Some(Coq_call_prealloc(Coq_prealloc_function_proto())), None()));
}())
;

var function_proto_to_string_function_object = object_create_prealloc_call(
                                                 Coq_prealloc_function_proto_to_string(
                                                   ),
                                                 Coq_value_prim(
                                                   Coq_prim_number(0.0)),
                                                 Heap.empty);

var function_proto_call_function_object = object_create_prealloc_call(
                                            Coq_prealloc_function_proto_call(
                                              ),
                                            Coq_value_prim(
                                              Coq_prim_number(1.0)),
                                            Heap.empty);

var function_proto_bind_function_object = object_create_prealloc_call(
                                            Coq_prealloc_function_proto_bind(
                                              ),
                                            Coq_value_prim(
                                              Coq_prim_number(1.0)),
                                            Heap.empty);

var function_proto_apply_function_object = object_create_prealloc_call(
                                             Coq_prealloc_function_proto_apply(
                                               ),
                                             Coq_value_prim(
                                               Coq_prim_number(2.0)),
                                             Heap.empty);

var object_prealloc_number = (function () {
  var p = write_constant(Heap.empty, "prototype",
            Coq_value_object(
              Coq_object_loc_prealloc(Coq_prealloc_number_proto())));
  var p0 = write_constant(p, "NaN",
             Coq_value_prim(Coq_prim_number(JsNumber.nan)));
  var p1 = write_constant(p0, "NEGATIVE_INFINITY",
             Coq_value_prim(Coq_prim_number(JsNumber.neg_infinity)));
  var p2 = write_constant(p1, "POSITIVE_INFINITY",
             Coq_value_prim(Coq_prim_number(JsNumber.infinity)));
  var p3 = write_constant(p2, "MAX_VALUE",
             Coq_value_prim(Coq_prim_number(JsNumber.max_value)));
  var p4 = write_constant(p3, "MIN_VALUE",
             Coq_value_prim(Coq_prim_number(JsNumber.min_value)));
  return (
    object_create_prealloc_constructor(Coq_prealloc_number(),
      Coq_value_prim(Coq_prim_number(1.0)), p4));
}())
;

var object_prealloc_number_proto = (function () {
  var p = write_native(Heap.empty, "constructor",
            Coq_value_object(Coq_object_loc_prealloc(Coq_prealloc_number())));
  var p0 = write_native(p, "toString",
             Coq_value_object(
               Coq_object_loc_prealloc(Coq_prealloc_number_proto_to_string())));
  var p1 = write_native(p0, "valueOf",
             Coq_value_object(
               Coq_object_loc_prealloc(Coq_prealloc_number_proto_value_of())));
  var o = object_create_builtin(
            Coq_value_object(
              Coq_object_loc_prealloc(Coq_prealloc_object_proto())),
            "Number", p1);
  return (
    object_with_primitive_value(o,
      Coq_value_prim(Coq_prim_number(JsNumber.zero))));
}())
;

var number_proto_to_string_function_object = object_create_prealloc_call(
                                               Coq_prealloc_number_proto_to_string(
                                                 ),
                                               Coq_value_prim(
                                                 Coq_prim_number(0.0)),
                                               Heap.empty);

var number_proto_value_of_function_object = object_create_prealloc_call(
                                              Coq_prealloc_number_proto_value_of(
                                                ),
                                              Coq_value_prim(
                                                Coq_prim_number(0.0)),
                                              Heap.empty);

var object_prealloc_array = (function () {
  var p = write_constant(Heap.empty, "prototype",
            Coq_value_object(
              Coq_object_loc_prealloc(Coq_prealloc_array_proto())));
  var p0 = write_native(p, "isArray",
             Coq_value_object(
               Coq_object_loc_prealloc(Coq_prealloc_array_is_array())));
  var p1 = write_constant(p0, "length", Coq_value_prim(Coq_prim_number(1.0)));
  return (
    object_create_prealloc_constructor(Coq_prealloc_array(),
      Coq_value_prim(Coq_prim_number(1.0)), p1));
}())
;

var array_is_array_function_object = object_create_prealloc_call(
                                       Coq_prealloc_array_is_array(),
                                       Coq_value_prim(Coq_prim_number(1.0)),
                                       Heap.empty);

var object_prealloc_array_proto = (function () {
  var p = write_native(Heap.empty, "constructor",
            Coq_value_object(Coq_object_loc_prealloc(Coq_prealloc_array())));
  var p0 = write_native(p, "toString",
             Coq_value_object(
               Coq_object_loc_prealloc(Coq_prealloc_array_proto_to_string())));
  var p1 = write_native(p0, "join",
             Coq_value_object(
               Coq_object_loc_prealloc(Coq_prealloc_array_proto_join())));
  var p2 = write_native(p1, "pop",
             Coq_value_object(
               Coq_object_loc_prealloc(Coq_prealloc_array_proto_pop())));
  var p3 = write_native(p2, "push",
             Coq_value_object(
               Coq_object_loc_prealloc(Coq_prealloc_array_proto_push())));
  var p4 = write_constant(p3, "length", Coq_value_prim(Coq_prim_number(0.0)));
  return (
    object_create_builtin(
      Coq_value_object(Coq_object_loc_prealloc(Coq_prealloc_object_proto())),
      "Array", p4));
}())
;

var array_proto_pop_function_object = object_create_prealloc_call(
                                        Coq_prealloc_array_proto_pop(),
                                        Coq_value_prim(Coq_prim_number(0.0)),
                                        Heap.empty);

var array_proto_push_function_object = object_create_prealloc_call(
                                         Coq_prealloc_array_proto_push(),
                                         Coq_value_prim(Coq_prim_number(1.0)),
                                         Heap.empty);

var array_proto_to_string_function_object = object_create_prealloc_call(
                                              Coq_prealloc_array_proto_to_string(
                                                ),
                                              Coq_value_prim(
                                                Coq_prim_number(0.0)),
                                              Heap.empty);

var array_proto_join_function_object = object_create_prealloc_call(
                                         Coq_prealloc_array_proto_join(),
                                         Coq_value_prim(Coq_prim_number(1.0)),
                                         Heap.empty);

var object_prealloc_string = (function () {
  var p = write_constant(Heap.empty, "prototype",
            Coq_value_object(
              Coq_object_loc_prealloc(Coq_prealloc_string_proto())));
  return (
    object_create_prealloc_constructor(Coq_prealloc_string(),
      Coq_value_prim(Coq_prim_number(1.0)), p));
}())
;

var object_prealloc_string_proto = (function () {
  var p = write_native(Heap.empty, "constructor",
            Coq_value_object(Coq_object_loc_prealloc(Coq_prealloc_string())));
  var p0 = write_native(p, "toString",
             Coq_value_object(
               Coq_object_loc_prealloc(Coq_prealloc_string_proto_to_string())));
  var p1 = write_native(p0, "valueOf",
             Coq_value_object(
               Coq_object_loc_prealloc(Coq_prealloc_string_proto_value_of())));
  var o = object_create_builtin(
            Coq_value_object(
              Coq_object_loc_prealloc(Coq_prealloc_object_proto())),
            "String", p1);
  return (
    object_with_primitive_value(o, Coq_value_prim(Coq_prim_string(""))));
}())
;

var string_proto_to_string_function_object = object_create_prealloc_call(
                                               Coq_prealloc_string_proto_to_string(
                                                 ),
                                               Coq_value_prim(
                                                 Coq_prim_number(0.0)),
                                               Heap.empty);

var string_proto_value_of_function_object = object_create_prealloc_call(
                                              Coq_prealloc_string_proto_value_of(
                                                ),
                                              Coq_value_prim(
                                                Coq_prim_number(0.0)),
                                              Heap.empty);

var object_prealloc_bool = (function () {
  var p = write_constant(Heap.empty, "prototype",
            Coq_value_object(
              Coq_object_loc_prealloc(Coq_prealloc_bool_proto())));
  return (
    object_create_prealloc_constructor(Coq_prealloc_bool(),
      Coq_value_prim(Coq_prim_number(1.0)), p));
}())
;

var object_prealloc_bool_proto = (function () {
  var p = write_native(Heap.empty, "constructor",
            Coq_value_object(Coq_object_loc_prealloc(Coq_prealloc_bool())));
  var p0 = write_native(p, "toString",
             Coq_value_object(
               Coq_object_loc_prealloc(Coq_prealloc_bool_proto_to_string())));
  var p1 = write_native(p0, "valueOf",
             Coq_value_object(
               Coq_object_loc_prealloc(Coq_prealloc_bool_proto_value_of())));
  var o = object_create_builtin(
            Coq_value_object(
              Coq_object_loc_prealloc(Coq_prealloc_object_proto())),
            "Boolean", p1);
  return (
    object_with_primitive_value(o, Coq_value_prim(Coq_prim_bool(false))));
}())
;

var bool_proto_to_string_function_object = object_create_prealloc_call(
                                             Coq_prealloc_bool_proto_to_string(
                                               ),
                                             Coq_value_prim(
                                               Coq_prim_number(0.0)),
                                             Heap.empty);

var bool_proto_value_of_function_object = object_create_prealloc_call(
                                            Coq_prealloc_bool_proto_value_of(
                                              ),
                                            Coq_value_prim(
                                              Coq_prim_number(0.0)),
                                            Heap.empty);

var object_prealloc_math = (function () {
  var p = write_constant(Heap.empty, "PI",
            Coq_value_prim(Coq_prim_number(JsNumber.pi)));
  var p0 = write_constant(p, "E",
             Coq_value_prim(Coq_prim_number(JsNumber.e)));
  var p1 = write_constant(p0, "LN2",
             Coq_value_prim(Coq_prim_number(JsNumber.ln2)));
  return (
    object_create_builtin(
      Coq_value_object(Coq_object_loc_prealloc(Coq_prealloc_object_proto())),
      "Math", p1));
}())
;

var object_prealloc_date = object_create_prealloc_constructor(
                             Coq_prealloc_date(),
                             Coq_value_prim(Coq_prim_number(1.0)),
                             Heap.empty);

var object_prealloc_regexp = object_create_prealloc_constructor(
                               Coq_prealloc_regexp(),
                               Coq_value_prim(Coq_prim_number(1.0)),
                               Heap.empty);

var object_prealloc_error = (function () {
  var p = write_constant(Heap.empty, "prototype",
            Coq_value_object(
              Coq_object_loc_prealloc(Coq_prealloc_error_proto())));
  return (
    object_create_prealloc_constructor(Coq_prealloc_error(),
      Coq_value_prim(Coq_prim_number(1.0)), p));
}())
;

var object_prealloc_error_proto = (function () {
  var p = write_native(Heap.empty, "constructor",
            Coq_value_object(Coq_object_loc_prealloc(Coq_prealloc_error())));
  var p0 = write_native(p, "name", Coq_value_prim(Coq_prim_string("Error")));
  var p1 = write_native(p0, "message", Coq_value_prim(Coq_prim_string("")));
  var p2 = write_native(p1, "toString",
             Coq_value_object(
               Coq_object_loc_prealloc(Coq_prealloc_error_proto_to_string())));
  return (
    object_create_builtin(
      Coq_value_object(Coq_object_loc_prealloc(Coq_prealloc_object_proto())),
      "Error", p2));
}())
;

var error_proto_to_string_function_object = object_create_prealloc_call(
                                              Coq_prealloc_error_proto_to_string(
                                                ),
                                              Coq_value_prim(
                                                Coq_prim_number(0.0)),
                                              Heap.empty);

var object_prealloc_native_error = function (ne) {
  var p = write_constant(Heap.empty, "prototype",
            Coq_value_object(
              Coq_object_loc_prealloc(Coq_prealloc_native_error_proto(ne))));
  return (
    object_create_prealloc_constructor(Coq_prealloc_native_error(ne),
      Coq_value_prim(Coq_prim_number(1.0)), p));
};

var object_prealloc_native_error_proto = function (ne) {
  var p = write_native(Heap.empty, "constructor",
            Coq_value_object(
              Coq_object_loc_prealloc(Coq_prealloc_native_error(ne))));
  var p0 = write_native(p, "name",
             Coq_value_prim(Coq_prim_string(string_of_native_error(ne))));
  var p1 = write_native(p0, "message", Coq_value_prim(Coq_prim_string("")));
  return (
    object_create_builtin(
      Coq_value_object(Coq_object_loc_prealloc(Coq_prealloc_error_proto())),
      "Error", p1));
};

var object_prealloc_json = object_create_builtin(
                             Coq_value_object(
                               Coq_object_loc_prealloc(
                                 Coq_prealloc_object_proto())), "JSON",
                             Heap.empty);

var throw_type_error_object = (function () {
  var o = object_create_prealloc_call(Coq_prealloc_throw_type_error(),
            Coq_value_prim(Coq_prim_number(0.0)), Heap.empty);
  var o0 = object_with_scope(o, Some(lexical_env_initial));
  var o1 = object_with_formal_params(o0, Some(mk_nil()));
  return (object_set_extensible(o1, false));
}())
;

var object_heap_initial_function_objects_1 = function (h) {
  var h0 = HeapObj.write(h,
             Coq_object_loc_prealloc(Coq_prealloc_throw_type_error()),
             throw_type_error_object);
  var h1 = HeapObj.write(h0,
             Coq_object_loc_prealloc(Coq_prealloc_global_eval()),
             global_eval_function_object);
  var h2 = HeapObj.write(h1,
             Coq_object_loc_prealloc(Coq_prealloc_global_parse_int()),
             global_parse_int_function_object);
  var h3 = HeapObj.write(h2,
             Coq_object_loc_prealloc(Coq_prealloc_global_parse_float()),
             global_parse_float_function_object);
  var h4 = HeapObj.write(h3,
             Coq_object_loc_prealloc(Coq_prealloc_global_is_nan()),
             global_is_nan_function_object);
  var h5 = HeapObj.write(h4,
             Coq_object_loc_prealloc(Coq_prealloc_global_is_finite()),
             global_is_finite_function_object);
  var h6 = HeapObj.write(h5,
             Coq_object_loc_prealloc(Coq_prealloc_global_decode_uri()),
             global_decode_uri_function_object);
  var h7 = HeapObj.write(h6,
             Coq_object_loc_prealloc(
               Coq_prealloc_global_decode_uri_component()),
             global_decode_uri_component_function_object);
  var h8 = HeapObj.write(h7,
             Coq_object_loc_prealloc(Coq_prealloc_global_encode_uri()),
             global_encode_uri_function_object);
  return (
    HeapObj.write(h8,
      Coq_object_loc_prealloc(Coq_prealloc_global_encode_uri_component()),
      global_encode_uri_component_function_object));
};

var object_heap_initial_function_objects_2 = function (h) {
  var h0 = object_heap_initial_function_objects_1(h);
  var h1 = HeapObj.write(h0,
             Coq_object_loc_prealloc(Coq_prealloc_object_get_proto_of()),
             object_get_proto_of_function_object);
  var h2 = HeapObj.write(h1,
             Coq_object_loc_prealloc(
               Coq_prealloc_object_get_own_prop_descriptor()),
             object_get_own_prop_descriptor_function_object);
  var h3 = HeapObj.write(h2,
             Coq_object_loc_prealloc(Coq_prealloc_object_get_own_prop_name()),
             object_get_own_prop_name_function_object);
  var h4 = HeapObj.write(h3,
             Coq_object_loc_prealloc(Coq_prealloc_object_create()),
             object_create_function_object);
  var h5 = HeapObj.write(h4,
             Coq_object_loc_prealloc(Coq_prealloc_object_define_prop()),
             object_define_prop_function_object);
  var h6 = HeapObj.write(h5,
             Coq_object_loc_prealloc(Coq_prealloc_object_define_props()),
             object_define_props_function_object);
  var h7 = HeapObj.write(h6,
             Coq_object_loc_prealloc(Coq_prealloc_object_seal()),
             object_seal_function_object);
  var h8 = HeapObj.write(h7,
             Coq_object_loc_prealloc(Coq_prealloc_object_freeze()),
             object_freeze_function_object);
  var h9 = HeapObj.write(h8,
             Coq_object_loc_prealloc(
               Coq_prealloc_object_prevent_extensions()),
             object_prevent_extensions_function_object);
  var h10 = HeapObj.write(h9,
              Coq_object_loc_prealloc(Coq_prealloc_object_is_sealed()),
              object_is_sealed_function_object);
  var h11 = HeapObj.write(h10,
              Coq_object_loc_prealloc(Coq_prealloc_object_is_frozen()),
              object_is_frozen_function_object);
  return (
    HeapObj.write(h11,
      Coq_object_loc_prealloc(Coq_prealloc_object_is_extensible()),
      object_is_extensible_function_object));
};

var object_heap_initial_function_objects_3 = function (h) {
  var h0 = object_heap_initial_function_objects_2(h);
  var h1 = HeapObj.write(h0,
             Coq_object_loc_prealloc(Coq_prealloc_object_proto_to_string()),
             object_proto_to_string_function_object);
  var h2 = HeapObj.write(h1,
             Coq_object_loc_prealloc(Coq_prealloc_object_proto_value_of()),
             object_proto_value_of_function_object);
  var h3 = HeapObj.write(h2,
             Coq_object_loc_prealloc(
               Coq_prealloc_object_proto_has_own_prop()),
             object_proto_has_own_prop_function_object);
  var h4 = HeapObj.write(h3,
             Coq_object_loc_prealloc(
               Coq_prealloc_object_proto_is_prototype_of()),
             object_proto_is_prototype_of_function_object);
  var h5 = HeapObj.write(h4,
             Coq_object_loc_prealloc(
               Coq_prealloc_object_proto_prop_is_enumerable()),
             object_proto_prop_is_enumerable_function_object);
  var h6 = HeapObj.write(h5,
             Coq_object_loc_prealloc(Coq_prealloc_function_proto_to_string()),
             function_proto_to_string_function_object);
  var h7 = HeapObj.write(h6,
             Coq_object_loc_prealloc(Coq_prealloc_function_proto_call()),
             function_proto_call_function_object);
  var h8 = HeapObj.write(h7,
             Coq_object_loc_prealloc(Coq_prealloc_function_proto_bind()),
             function_proto_bind_function_object);
  return (
    HeapObj.write(h8,
      Coq_object_loc_prealloc(Coq_prealloc_function_proto_apply()),
      function_proto_apply_function_object));
};

var object_heap_initial_function_objects_4 = function (h) {
  var h0 = object_heap_initial_function_objects_3(h);
  var h1 = HeapObj.write(h0,
             Coq_object_loc_prealloc(Coq_prealloc_array_is_array()),
             array_is_array_function_object);
  var h2 = HeapObj.write(h1,
             Coq_object_loc_prealloc(Coq_prealloc_array_proto_to_string()),
             array_proto_to_string_function_object);
  var h3 = HeapObj.write(h2,
             Coq_object_loc_prealloc(Coq_prealloc_array_proto_join()),
             array_proto_join_function_object);
  var h4 = HeapObj.write(h3,
             Coq_object_loc_prealloc(Coq_prealloc_array_proto_pop()),
             array_proto_pop_function_object);
  var h5 = HeapObj.write(h4,
             Coq_object_loc_prealloc(Coq_prealloc_array_proto_push()),
             array_proto_push_function_object);
  var h6 = HeapObj.write(h5,
             Coq_object_loc_prealloc(Coq_prealloc_string_proto_to_string()),
             string_proto_to_string_function_object);
  var h7 = HeapObj.write(h6,
             Coq_object_loc_prealloc(Coq_prealloc_string_proto_value_of()),
             string_proto_value_of_function_object);
  var h8 = HeapObj.write(h7,
             Coq_object_loc_prealloc(Coq_prealloc_bool_proto_to_string()),
             bool_proto_to_string_function_object);
  return (
    HeapObj.write(h8,
      Coq_object_loc_prealloc(Coq_prealloc_bool_proto_value_of()),
      bool_proto_value_of_function_object));
};

var object_heap_initial_function_objects = function (h) {
  var h0 = object_heap_initial_function_objects_4(h);
  var h1 = HeapObj.write(h0,
             Coq_object_loc_prealloc(Coq_prealloc_number_proto_to_string()),
             number_proto_to_string_function_object);
  var h2 = HeapObj.write(h1,
             Coq_object_loc_prealloc(Coq_prealloc_number_proto_value_of()),
             number_proto_value_of_function_object);
  return (
    HeapObj.write(h2,
      Coq_object_loc_prealloc(Coq_prealloc_error_proto_to_string()),
      error_proto_to_string_function_object));
};

var object_heap_initial = (function () {
  var h = HeapObj.write(Heap.empty,
            Coq_object_loc_prealloc(Coq_prealloc_global()),
            object_prealloc_global);
  var h0 = HeapObj.write(h, Coq_object_loc_prealloc(Coq_prealloc_object()),
             object_prealloc_object);
  var h1 = HeapObj.write(h0,
             Coq_object_loc_prealloc(Coq_prealloc_object_proto()),
             object_prealloc_object_proto);
  var h2 = HeapObj.write(h1, Coq_object_loc_prealloc(Coq_prealloc_bool()),
             object_prealloc_bool);
  var h3 = HeapObj.write(h2,
             Coq_object_loc_prealloc(Coq_prealloc_bool_proto()),
             object_prealloc_bool_proto);
  var h4 = HeapObj.write(h3, Coq_object_loc_prealloc(Coq_prealloc_number()),
             object_prealloc_number);
  var h5 = HeapObj.write(h4,
             Coq_object_loc_prealloc(Coq_prealloc_number_proto()),
             object_prealloc_number_proto);
  var h6 = HeapObj.write(h5,
             Coq_object_loc_prealloc(Coq_prealloc_function()),
             object_prealloc_function);
  var h7 = HeapObj.write(h6,
             Coq_object_loc_prealloc(Coq_prealloc_function_proto()),
             object_prealloc_function_proto);
  var h8 = HeapObj.write(h7, Coq_object_loc_prealloc(Coq_prealloc_array()),
             object_prealloc_array);
  var h9 = HeapObj.write(h8,
             Coq_object_loc_prealloc(Coq_prealloc_array_proto()),
             object_prealloc_array_proto);
  var h10 = HeapObj.write(h9, Coq_object_loc_prealloc(Coq_prealloc_string()),
              object_prealloc_string);
  var h11 = HeapObj.write(h10,
              Coq_object_loc_prealloc(Coq_prealloc_string_proto()),
              object_prealloc_string_proto);
  var h12 = HeapObj.write(h11, Coq_object_loc_prealloc(Coq_prealloc_math()),
              object_prealloc_math);
  var h13 = HeapObj.write(h12, Coq_object_loc_prealloc(Coq_prealloc_date()),
              object_prealloc_date);
  var h14 = HeapObj.write(h13,
              Coq_object_loc_prealloc(Coq_prealloc_regexp()),
              object_prealloc_regexp);
  var h15 = HeapObj.write(h14,
              Coq_object_loc_prealloc(Coq_prealloc_error_proto()),
              object_prealloc_error_proto);
  var h16 = HeapObj.write(h15,
              Coq_object_loc_prealloc(
                Coq_prealloc_native_error_proto(Coq_native_error_eval())),
              object_prealloc_native_error_proto(Coq_native_error_eval()));
  var h17 = HeapObj.write(h16,
              Coq_object_loc_prealloc(
                Coq_prealloc_native_error_proto(Coq_native_error_range())),
              object_prealloc_native_error_proto(Coq_native_error_range()));
  var h18 = HeapObj.write(h17,
              Coq_object_loc_prealloc(
                Coq_prealloc_native_error_proto(Coq_native_error_ref())),
              object_prealloc_native_error_proto(Coq_native_error_ref()));
  var h19 = HeapObj.write(h18,
              Coq_object_loc_prealloc(
                Coq_prealloc_native_error_proto(Coq_native_error_syntax())),
              object_prealloc_native_error_proto(Coq_native_error_syntax()));
  var h20 = HeapObj.write(h19,
              Coq_object_loc_prealloc(
                Coq_prealloc_native_error_proto(Coq_native_error_type())),
              object_prealloc_native_error_proto(Coq_native_error_type()));
  var h21 = HeapObj.write(h20,
              Coq_object_loc_prealloc(
                Coq_prealloc_native_error_proto(Coq_native_error_uri())),
              object_prealloc_native_error_proto(Coq_native_error_uri()));
  var h22 = HeapObj.write(h21, Coq_object_loc_prealloc(Coq_prealloc_error()),
              object_prealloc_error);
  var h23 = HeapObj.write(h22,
              Coq_object_loc_prealloc(
                Coq_prealloc_native_error(Coq_native_error_eval())),
              object_prealloc_native_error(Coq_native_error_eval()));
  var h24 = HeapObj.write(h23,
              Coq_object_loc_prealloc(
                Coq_prealloc_native_error(Coq_native_error_range())),
              object_prealloc_native_error(Coq_native_error_range()));
  var h25 = HeapObj.write(h24,
              Coq_object_loc_prealloc(
                Coq_prealloc_native_error(Coq_native_error_ref())),
              object_prealloc_native_error(Coq_native_error_ref()));
  var h26 = HeapObj.write(h25,
              Coq_object_loc_prealloc(
                Coq_prealloc_native_error(Coq_native_error_syntax())),
              object_prealloc_native_error(Coq_native_error_syntax()));
  var h27 = HeapObj.write(h26,
              Coq_object_loc_prealloc(
                Coq_prealloc_native_error(Coq_native_error_type())),
              object_prealloc_native_error(Coq_native_error_type()));
  var h28 = HeapObj.write(h27,
              Coq_object_loc_prealloc(
                Coq_prealloc_native_error(Coq_native_error_uri())),
              object_prealloc_native_error(Coq_native_error_uri()));
  var h29 = HeapObj.write(h28, Coq_object_loc_prealloc(Coq_prealloc_json()),
              object_prealloc_json);
  return (object_heap_initial_function_objects(h29));
}())
;

var env_record_heap_initial = HeapInt.write(Heap.empty,
                                env_loc_global_env_record,
                                env_record_object_default(
                                  Coq_object_loc_prealloc(
                                    Coq_prealloc_global())));

var dummy_fresh_locations = 0;

var state_initial = {
  state_object_heap: object_heap_initial,
  state_env_record_heap: env_record_heap_initial,
  state_fresh_locations: dummy_fresh_locations
};
}// end of with JsCommon
}// end of with JsSyntax
}// end of with JsSyntaxAux

return {
  string_of_native_error: string_of_native_error, 
  prop_attributes_for_global_object: prop_attributes_for_global_object, 
  attrib_constant: attrib_constant, 
  object_create_builtin: object_create_builtin, 
  object_create_prealloc_call_or_construct: object_create_prealloc_call_or_construct, 
  object_create_prealloc_call: object_create_prealloc_call, 
  object_create_prealloc_constructor: object_create_prealloc_constructor, 
  write_native: write_native, 
  write_constant: write_constant, 
  object_prealloc_global_proto: object_prealloc_global_proto, 
  object_prealloc_global_class: object_prealloc_global_class, 
  object_prealloc_global_properties: object_prealloc_global_properties, 
  object_prealloc_global: object_prealloc_global, 
  global_eval_function_object: global_eval_function_object, 
  global_parse_int_function_object: global_parse_int_function_object, 
  global_parse_float_function_object: global_parse_float_function_object, 
  global_is_nan_function_object: global_is_nan_function_object, 
  global_is_finite_function_object: global_is_finite_function_object, 
  global_decode_uri_function_object: global_decode_uri_function_object, 
  global_decode_uri_component_function_object: global_decode_uri_component_function_object, 
  global_encode_uri_function_object: global_encode_uri_function_object, 
  global_encode_uri_component_function_object: global_encode_uri_component_function_object, 
  object_prealloc_object: object_prealloc_object, 
  object_get_proto_of_function_object: object_get_proto_of_function_object, 
  object_get_own_prop_descriptor_function_object: object_get_own_prop_descriptor_function_object, 
  object_get_own_prop_name_function_object: object_get_own_prop_name_function_object, 
  object_create_function_object: object_create_function_object, 
  object_define_prop_function_object: object_define_prop_function_object, 
  object_define_props_function_object: object_define_props_function_object, 
  object_seal_function_object: object_seal_function_object, 
  object_freeze_function_object: object_freeze_function_object, 
  object_prevent_extensions_function_object: object_prevent_extensions_function_object, 
  object_is_sealed_function_object: object_is_sealed_function_object, 
  object_is_frozen_function_object: object_is_frozen_function_object, 
  object_is_extensible_function_object: object_is_extensible_function_object, 
  object_prealloc_object_proto: object_prealloc_object_proto, 
  object_proto_to_string_function_object: object_proto_to_string_function_object, 
  object_proto_value_of_function_object: object_proto_value_of_function_object, 
  object_proto_has_own_prop_function_object: object_proto_has_own_prop_function_object, 
  object_proto_is_prototype_of_function_object: object_proto_is_prototype_of_function_object, 
  object_proto_prop_is_enumerable_function_object: object_proto_prop_is_enumerable_function_object, 
  object_prealloc_function: object_prealloc_function, 
  object_prealloc_function_proto: object_prealloc_function_proto, 
  function_proto_to_string_function_object: function_proto_to_string_function_object, 
  function_proto_call_function_object: function_proto_call_function_object, 
  function_proto_bind_function_object: function_proto_bind_function_object, 
  function_proto_apply_function_object: function_proto_apply_function_object, 
  object_prealloc_number: object_prealloc_number, 
  object_prealloc_number_proto: object_prealloc_number_proto, 
  number_proto_to_string_function_object: number_proto_to_string_function_object, 
  number_proto_value_of_function_object: number_proto_value_of_function_object, 
  object_prealloc_array: object_prealloc_array, 
  array_is_array_function_object: array_is_array_function_object, 
  object_prealloc_array_proto: object_prealloc_array_proto, 
  array_proto_pop_function_object: array_proto_pop_function_object, 
  array_proto_push_function_object: array_proto_push_function_object, 
  array_proto_to_string_function_object: array_proto_to_string_function_object, 
  array_proto_join_function_object: array_proto_join_function_object, 
  object_prealloc_string: object_prealloc_string, 
  object_prealloc_string_proto: object_prealloc_string_proto, 
  string_proto_to_string_function_object: string_proto_to_string_function_object, 
  string_proto_value_of_function_object: string_proto_value_of_function_object, 
  object_prealloc_bool: object_prealloc_bool, 
  object_prealloc_bool_proto: object_prealloc_bool_proto, 
  bool_proto_to_string_function_object: bool_proto_to_string_function_object, 
  bool_proto_value_of_function_object: bool_proto_value_of_function_object, 
  object_prealloc_math: object_prealloc_math, 
  object_prealloc_date: object_prealloc_date, 
  object_prealloc_regexp: object_prealloc_regexp, 
  object_prealloc_error: object_prealloc_error, 
  object_prealloc_error_proto: object_prealloc_error_proto, 
  error_proto_to_string_function_object: error_proto_to_string_function_object, 
  object_prealloc_native_error: object_prealloc_native_error, 
  object_prealloc_native_error_proto: object_prealloc_native_error_proto, 
  object_prealloc_json: object_prealloc_json, 
  throw_type_error_object: throw_type_error_object, 
  object_heap_initial_function_objects_1: object_heap_initial_function_objects_1, 
  object_heap_initial_function_objects_2: object_heap_initial_function_objects_2, 
  object_heap_initial_function_objects_3: object_heap_initial_function_objects_3, 
  object_heap_initial_function_objects_4: object_heap_initial_function_objects_4, 
  object_heap_initial_function_objects: object_heap_initial_function_objects, 
  object_heap_initial: object_heap_initial, 
  env_record_heap_initial: env_record_heap_initial, 
  dummy_fresh_locations: dummy_fresh_locations, 
  state_initial: state_initial};
})();

/* --------------------- tests/jsref/JsInterpreterMonads.unlog.js --------------------- */

var JsInterpreterMonads = (function() {
with (JsCommon) {
with (JsSyntax) {
with (JsSyntaxAux) {
with (LibList) {
with (LibOption) {
with (Shared) {

function Coq_result_some(value) { return {tag: "Coq_result_some", value: value}; }

function Coq_result_not_yet_implemented() { return {tag: "Coq_result_not_yet_implemented" }; }

function Coq_result_impossible() { return {tag: "Coq_result_impossible" }; }

function Coq_result_bottom(state) { return {tag: "Coq_result_bottom", state: state}; }



var res_out = function (o) {
  return (Coq_result_some(Coq_specret_out(o)));
};

var res_spec = function (s, a) {
  return (Coq_result_some(Coq_specret_val(s, a)));
};





var res_ter = function (s, r) {
  return (res_out(Coq_out_ter(s, r)));
};



var res_void = function (s) {
  return (res_out(out_void(s)));
};

var out_from_retn = function (_foo_) {
  switch (_foo_.tag) {
    case "Coq_specret_val":
      var s = _foo_.state;
      throw false;
    case "Coq_specret_out":
      var o = _foo_.out;
      return (o);
  }
  
};

var result_out = function (o) {
  return (res_out(o));
};

var get_arg = function (x, l) {
  return (nth_def(Coq_value_prim(Coq_prim_undef()), x, l));
};

var get_arg_first_and_rest = function (lv) {
  return (
    [get_arg(0, lv), (function () {
      switch (lv.tag) {
        case "[]":
          return (mk_nil());
        case "::":
          var v = lv.head, rest = lv.tail;
          return (rest);
      }
      
    }())
    ]);
};

var destr_list = function (l, d, f) {
  switch (l.tag) {
    case "[]":
      return (d);
    case "::":
      var a = l.head, l0 = l.tail;
      return (f(a));
  }
  
};

var if_empty_label = function (s, r, k) {
  if (label_compare(r.res_label, Coq_label_empty())) {
    return (k({}));
  } else {
    return (
      function (s, m) {
          Debug.impossible_with_heap_because(__LOC__, s, m);
          return (Coq_result_impossible());}(s,
        "[if_empty_label] received a normal result with non-empty label."));
  }
};

var if_some = function (op, k) {
  switch (op.tag) {
    case "Some":
      var a = op.value;
      return (k(a));
    case "None":
      return (
        function (s) {
            Debug.impossible_because(__LOC__, s);
            return (Coq_result_impossible());}(
          "[if_some] called with [None]."));
  }
  
};

var if_some_or_default = function (o, d, k) {
  return (option_case(d, k, o));
};

var if_result_some = function (w, k) {
  switch (w.tag) {
    case "Coq_result_some":
      var a = w.value;
      return (k(a));
    case "Coq_result_not_yet_implemented":
      return (Coq_result_not_yet_implemented());
    case "Coq_result_impossible":
      return (Coq_result_impossible());
    case "Coq_result_bottom":
      var s0 = w.state;
      return (Coq_result_bottom(s0));
  }
  
};

var if_out_some = function (w, k) {
  return (
    if_result_some(w, function (sp) { return (k(out_from_retn(sp)));}));
};

var throw_result = function (w) {
  return (if_out_some(w, function (o) { return (res_out(o));}));
};

var if_ter = function (w, k) {
  return (
    if_out_some(w, function (o) {
        switch (o.tag) {
          case "Coq_out_div":
            return (res_out(o));
          case "Coq_out_ter":
            var s0 = o.state, r = o.res;
            return (k(s0, r));
        }
        }));
};

var if_success_state = function (rv, w, k) {
  return (
    if_ter(w, function (s0, r) {
        var _switch_arg_1 = r.res_type;
        switch (_switch_arg_1.tag) {
          case "Coq_restype_normal":
            return (
              if_empty_label(s0, r, function (x) {
                  return (
                    k(s0, (function () {
                        if (resvalue_compare(r.res_value,
                              Coq_resvalue_empty())) {
                          return (rv);
                        } else {
                          return (r.res_value);
                        }}())));}));
          case "Coq_restype_throw":
            return (res_ter(s0, r));
          default:
            return (res_ter(s0, res_overwrite_value_if_empty(rv, r)));
        }
        }));
};

var if_success = function (w, k) {
  return (
    if_ter(w, function (s0, r) {
        var _switch_arg_2 = r.res_type;
        switch (_switch_arg_2.tag) {
          case "Coq_restype_normal":
            return (
              if_empty_label(s0, r, function (x) {
                  return (k(s0, r.res_value));}));
          case "Coq_restype_break":
            return (res_out(Coq_out_ter(s0, r)));
          case "Coq_restype_continue":
            return (res_out(Coq_out_ter(s0, r)));
          case "Coq_restype_return":
            return (res_out(Coq_out_ter(s0, r)));
          case "Coq_restype_throw":
            return (res_out(Coq_out_ter(s0, r)));
        }
        }));
};

var if_void = function (w, k) {
  return (
    if_success(w, function (s, rv) {
        switch (rv.tag) {
          case "Coq_resvalue_empty":
            return (k(s));
          case "Coq_resvalue_value":
            var v = rv.value;
            return (
              function (s, m) {
                  Debug.impossible_with_heap_because(__LOC__, s, m);
                  return (Coq_result_impossible());}(s,
                "[if_void called] with non-void result value."));
          case "Coq_resvalue_ref":
            var r = rv.ref;
            return (
              function (s, m) {
                  Debug.impossible_with_heap_because(__LOC__, s, m);
                  return (Coq_result_impossible());}(s,
                "[if_void called] with non-void result value."));
        }
        }));
};

var if_not_throw = function (w, k) {
  return (
    if_ter(w, function (s0, r) {
        var _switch_arg_3 = r.res_type;
        switch (_switch_arg_3.tag) {
          case "Coq_restype_normal":
            return (k(s0, r));
          case "Coq_restype_break":
            return (k(s0, r));
          case "Coq_restype_continue":
            return (k(s0, r));
          case "Coq_restype_return":
            return (k(s0, r));
          case "Coq_restype_throw":
            return (w);
        }
        }));
};

var if_any_or_throw = function (w, k1, k2) {
  return (
    if_ter(w, function (s, r) {
        var _switch_arg_4 = r.res_type;
        switch (_switch_arg_4.tag) {
          case "Coq_restype_normal":
            return (k1(s, r));
          case "Coq_restype_break":
            return (k1(s, r));
          case "Coq_restype_continue":
            return (k1(s, r));
          case "Coq_restype_return":
            return (k1(s, r));
          case "Coq_restype_throw":
            var _switch_arg_5 = r.res_value;
            switch (_switch_arg_5.tag) {
              case "Coq_resvalue_value":
                var v = _switch_arg_5.value;
                return (
                  if_empty_label(s, r, function (x) { return (k2(s, v));}));
              default:
                return (
                  function (s, m) {
                      Debug.impossible_with_heap_because(__LOC__, s, m);
                      return (Coq_result_impossible());}(s,
                    "[if_any_or_throw] called with a non-value result."));
            }
            
        }
        }));
};

var if_success_or_return = function (w, k1, k2) {
  return (
    if_ter(w, function (s, r) {
        var _switch_arg_6 = r.res_type;
        switch (_switch_arg_6.tag) {
          case "Coq_restype_normal":
            return (if_empty_label(s, r, function (x) { return (k1(s));}));
          case "Coq_restype_break":
            return (w);
          case "Coq_restype_continue":
            return (w);
          case "Coq_restype_return":
            return (
              if_empty_label(s, r, function (x) {
                  return (k2(s, r.res_value));}));
          case "Coq_restype_throw":
            return (w);
        }
        }));
};

var if_break = function (w, k) {
  return (
    if_ter(w, function (s, r) {
        var _switch_arg_7 = r.res_type;
        switch (_switch_arg_7.tag) {
          case "Coq_restype_normal":
            return (res_ter(s, r));
          case "Coq_restype_break":
            return (k(s, r));
          case "Coq_restype_continue":
            return (res_ter(s, r));
          case "Coq_restype_return":
            return (res_ter(s, r));
          case "Coq_restype_throw":
            return (res_ter(s, r));
        }
        }));
};

var if_value = function (w, k) {
  return (
    if_success(w, function (s, rv) {
        switch (rv.tag) {
          case "Coq_resvalue_empty":
            return (
              function (s, m) {
                  Debug.impossible_with_heap_because(__LOC__, s, m);
                  return (Coq_result_impossible());}(s,
                "[if_value] called with non-value."));
          case "Coq_resvalue_value":
            var v = rv.value;
            return (k(s, v));
          case "Coq_resvalue_ref":
            var r = rv.ref;
            return (
              function (s, m) {
                  Debug.impossible_with_heap_because(__LOC__, s, m);
                  return (Coq_result_impossible());}(s,
                "[if_value] called with non-value."));
        }
        }));
};

var if_bool = function (w, k) {
  return (
    if_value(w, function (s, v) {
        switch (v.tag) {
          case "Coq_value_prim":
            var p = v.value;
            switch (p.tag) {
              case "Coq_prim_undef":
                return (
                  function (s, m) {
                      Debug.impossible_with_heap_because(__LOC__, s, m);
                      return (Coq_result_impossible());}(s,
                    "[if_bool] called with non-boolean value."));
              case "Coq_prim_null":
                return (
                  function (s, m) {
                      Debug.impossible_with_heap_because(__LOC__, s, m);
                      return (Coq_result_impossible());}(s,
                    "[if_bool] called with non-boolean value."));
              case "Coq_prim_bool":
                var b = p.value;
                return (k(s, b));
              case "Coq_prim_number":
                var n = p.value;
                return (
                  function (s, m) {
                      Debug.impossible_with_heap_because(__LOC__, s, m);
                      return (Coq_result_impossible());}(s,
                    "[if_bool] called with non-boolean value."));
              case "Coq_prim_string":
                var s0 = p.value;
                return (
                  function (s, m) {
                      Debug.impossible_with_heap_because(__LOC__, s, m);
                      return (Coq_result_impossible());}(s,
                    "[if_bool] called with non-boolean value."));
            }
            
          case "Coq_value_object":
            var o = v.value;
            return (
              function (s, m) {
                  Debug.impossible_with_heap_because(__LOC__, s, m);
                  return (Coq_result_impossible());}(s,
                "[if_bool] called with non-boolean value."));
        }
        }));
};

var if_object = function (w, k) {
  return (
    if_value(w, function (s, v) {
        switch (v.tag) {
          case "Coq_value_prim":
            var p = v.value;
            return (
              function (s, m) {
                  Debug.impossible_with_heap_because(__LOC__, s, m);
                  return (Coq_result_impossible());}(s,
                "[if_object] called on a primitive."));
          case "Coq_value_object":
            var l = v.value;
            return (k(s, l));
        }
        }));
};

var if_string = function (w, k) {
  return (
    if_value(w, function (s, v) {
        switch (v.tag) {
          case "Coq_value_prim":
            var p = v.value;
            switch (p.tag) {
              case "Coq_prim_string":
                var s0 = p.value;
                return (k(s, s0));
              default:
                return (
                  function (s, m) {
                      Debug.impossible_with_heap_because(__LOC__, s, m);
                      return (Coq_result_impossible());}(s,
                    "[if_string] called on a non-string value."));
            }
            
          case "Coq_value_object":
            var o = v.value;
            return (
              function (s, m) {
                  Debug.impossible_with_heap_because(__LOC__, s, m);
                  return (Coq_result_impossible());}(s,
                "[if_string] called on a non-string value."));
        }
        }));
};

var if_number = function (w, k) {
  return (
    if_value(w, function (s, v) {
        switch (v.tag) {
          case "Coq_value_prim":
            var p = v.value;
            switch (p.tag) {
              case "Coq_prim_number":
                var n = p.value;
                return (k(s, n));
              default:
                return (
                  function (s, m) {
                      Debug.impossible_with_heap_because(__LOC__, s, m);
                      return (Coq_result_impossible());}(s,
                    "[if_number] called with non-number value."));
            }
            
          case "Coq_value_object":
            var o = v.value;
            return (
              function (s, m) {
                  Debug.impossible_with_heap_because(__LOC__, s, m);
                  return (Coq_result_impossible());}(s,
                "[if_number] called with non-number value."));
        }
        }));
};

var if_prim = function (w, k) {
  return (
    if_value(w, function (s, v) {
        switch (v.tag) {
          case "Coq_value_prim":
            var w0 = v.value;
            return (k(s, w0));
          case "Coq_value_object":
            var o = v.value;
            return (
              function (s, m) {
                  Debug.impossible_with_heap_because(__LOC__, s, m);
                  return (Coq_result_impossible());}(s,
                "[if_primitive] called on an object."));
        }
        }));
};

var convert_option_attributes = function (o) {
  return (map(function (a) { return (Coq_full_descriptor_some(a));}, o));
};

var if_abort = function (o, k) {
  switch (o.tag) {
    case "Coq_out_div":
      return (k({}));
    case "Coq_out_ter":
      var s0 = o.state, r = o.res;
      if (restype_compare(r.res_type, Coq_restype_normal())) {
        return (
          function (s, m) {
              Debug.impossible_with_heap_because(__LOC__, s, m);
              return (Coq_result_impossible());}(s0,
            "[if_abort] received a normal result!"));
      } else {
        return (k({}));
      }
  }
  
};

var if_spec = function (w, k) {
  return (
    if_result_some(w, function (sp) {
        switch (sp.tag) {
          case "Coq_specret_val":
            var s0 = sp.state, a = sp.res;
            return (k(s0, a));
          case "Coq_specret_out":
            var o = sp.out;
            return (if_abort(o, function (x) { return (res_out(o));}));
        }
        }));
};

var if_run = function (w, k) {
  return (if_spec(w, k));
};

var ifx_prim = function (w, k) {
  return (if_prim(w, k));
};

var ifx_number = function (w, k) {
  return (if_number(w, k));
};

var ifx_string = function (w, k) {
  return (if_string(w, k));
};

var ifx_success_state = function (a, b, c) {
  return (if_success_state(a, b, c));
};

var ifx_some_or_default = function (v, d, f) {
  return (if_some_or_default(v, d, f));
};

var ifx_success_or_return = function (a, b, c) {
  return (if_success_or_return(a, b, c));
};

var ifx_empty_label = function (a, b, c) {
  return (if_empty_label(a, b, c));
};

var ifx_any_or_throw = function (a, b, c) {
  return (if_any_or_throw(a, b, c));
};
}// end of with JsCommon
}// end of with JsSyntax
}// end of with JsSyntaxAux
}// end of with LibList
}// end of with LibOption
}// end of with Shared

return {
  Coq_result_some: Coq_result_some, 
  Coq_result_not_yet_implemented: Coq_result_not_yet_implemented, 
  Coq_result_impossible: Coq_result_impossible, 
  Coq_result_bottom: Coq_result_bottom, 
  res_out: res_out, 
  res_spec: res_spec, 
  res_ter: res_ter, 
  res_void: res_void, 
  out_from_retn: out_from_retn, 
  result_out: result_out, 
  get_arg: get_arg, 
  get_arg_first_and_rest: get_arg_first_and_rest, 
  destr_list: destr_list, 
  if_empty_label: if_empty_label, 
  if_some: if_some, 
  if_some_or_default: if_some_or_default, 
  if_result_some: if_result_some, 
  if_out_some: if_out_some, 
  throw_result: throw_result, 
  if_ter: if_ter, 
  if_success_state: if_success_state, 
  if_success: if_success, 
  if_void: if_void, 
  if_not_throw: if_not_throw, 
  if_any_or_throw: if_any_or_throw, 
  if_success_or_return: if_success_or_return, 
  if_break: if_break, 
  if_value: if_value, 
  if_bool: if_bool, 
  if_object: if_object, 
  if_string: if_string, 
  if_number: if_number, 
  if_prim: if_prim, 
  convert_option_attributes: convert_option_attributes, 
  if_abort: if_abort, 
  if_spec: if_spec, 
  if_run: if_run, 
  ifx_prim: ifx_prim, 
  ifx_number: ifx_number, 
  ifx_string: ifx_string, 
  ifx_success_state: ifx_success_state, 
  ifx_some_or_default: ifx_some_or_default, 
  ifx_success_or_return: ifx_success_or_return, 
  ifx_empty_label: ifx_empty_label, 
  ifx_any_or_throw: ifx_any_or_throw};
})();

/* --------------------- tests/jsref/JsInterpreter.unlog.js --------------------- */

var JsInterpreter = (function() {
with (Datatypes) {
with (JsCommon) {
with (JsCommonAux) {
with (JsInit) {
with (JsInterpreterMonads) {
with (JsPreliminary) {
with (JsSyntax) {
with (JsSyntaxAux) {
with (LibList) {
with (LibOption) {
with (LibProd) {
with (List0) {
with (Shared) {

var convert_number_to_bool = function (n) {
  if (((n === JsNumber.zero)
      || ((n === JsNumber.neg_zero) || (n === JsNumber.nan)))) {
    return (false);
  } else {
    return (true);
  }
};

var convert_string_to_bool = function (s) {
  if (string_eq(s, "")) {
    return (false);
  } else {
    return (true);
  }
};

var convert_prim_to_boolean = function (_foo_) {
  switch (_foo_.tag) {
    case "Coq_prim_undef":
      return (false);
    case "Coq_prim_null":
      return (false);
    case "Coq_prim_bool":
      var b = _foo_.value;
      return (b);
    case "Coq_prim_number":
      var n = _foo_.value;
      return (convert_number_to_bool(n));
    case "Coq_prim_string":
      var s = _foo_.value;
      return (convert_string_to_bool(s));
  }
  
};

var convert_value_to_boolean = function (_foo_) {
  switch (_foo_.tag) {
    case "Coq_value_prim":
      var p = _foo_.value;
      return (convert_prim_to_boolean(p));
    case "Coq_value_object":
      var o = _foo_.value;
      return (true);
  }
  
};

var convert_prim_to_number = function (_foo_) {
  switch (_foo_.tag) {
    case "Coq_prim_undef":
      return (JsNumber.nan);
    case "Coq_prim_null":
      return (JsNumber.zero);
    case "Coq_prim_bool":
      var b = _foo_.value;
      if (b) {
        return (JsNumber.one);
      } else {
        return (JsNumber.zero);
      }
    case "Coq_prim_number":
      var n = _foo_.value;
      return (n);
    case "Coq_prim_string":
      var s = _foo_.value;
      return (JsNumber.from_string(s));
  }
  
};

var convert_number_to_integer = function (n) {
  if ((n === JsNumber.nan)) {
    return (JsNumber.zero);
  } else {
    if (((n === JsNumber.zero)
        || ((n === JsNumber.neg_zero)
           || ((n === JsNumber.infinity) || (n === JsNumber.neg_infinity))))) {
      return (n);
    } else {
      return ((JsNumber.sign(n) * JsNumber.floor(JsNumber.absolute(n))));
    }
  }
};

var convert_bool_to_string = function (_foo_) {
  switch (_foo_) {
    case true:
      return ("true");
    case false:
      return ("false");
  }
  
};

var convert_prim_to_string = function (_foo_) {
  switch (_foo_.tag) {
    case "Coq_prim_undef":
      return ("undefined");
    case "Coq_prim_null":
      return ("null");
    case "Coq_prim_bool":
      var b = _foo_.value;
      return (convert_bool_to_string(b));
    case "Coq_prim_number":
      var n = _foo_.value;
      return (JsNumber.to_string(n));
    case "Coq_prim_string":
      var s = _foo_.value;
      return (s);
  }
  
};

var equality_test_for_same_type = function (ty, v1, v2) {
  switch (ty.tag) {
    case "Coq_type_undef":
      return (true);
    case "Coq_type_null":
      return (true);
    case "Coq_type_bool":
      return (value_compare(v1, v2));
    case "Coq_type_number":
      switch (v1.tag) {
        case "Coq_value_prim":
          var p = v1.value;
          switch (p.tag) {
            case "Coq_prim_undef":
              return (false);
            case "Coq_prim_null":
              return (false);
            case "Coq_prim_bool":
              var b = p.value;
              return (false);
            case "Coq_prim_number":
              var n1 = p.value;
              switch (v2.tag) {
                case "Coq_value_prim":
                  var p0 = v2.value;
                  switch (p0.tag) {
                    case "Coq_prim_undef":
                      return (false);
                    case "Coq_prim_null":
                      return (false);
                    case "Coq_prim_bool":
                      var b = p0.value;
                      return (false);
                    case "Coq_prim_number":
                      var n2 = p0.value;
                      if ((n1 === JsNumber.nan)) {
                        return (false);
                      } else {
                        if ((n2 === JsNumber.nan)) {
                          return (false);
                        } else {
                          if (((n1 === JsNumber.zero)
                              && (n2 === JsNumber.neg_zero))) {
                            return (true);
                          } else {
                            if (((n1 === JsNumber.neg_zero)
                                && (n2 === JsNumber.zero))) {
                              return (true);
                            } else {
                              return ((n1 === n2));
                            }
                          }
                        }
                      }
                    case "Coq_prim_string":
                      var s = p0.value;
                      return (false);
                  }
                  
                case "Coq_value_object":
                  var o = v2.value;
                  return (false);
              }
              
            case "Coq_prim_string":
              var s = p.value;
              return (false);
          }
          
        case "Coq_value_object":
          var o = v1.value;
          return (false);
      }
      
    case "Coq_type_string":
      return (value_compare(v1, v2));
    case "Coq_type_object":
      return (value_compare(v1, v2));
  }
  
};

var strict_equality_test = function (v1, v2) {
  var ty1 = type_of(v1);
  var ty2 = type_of(v2);
  if (type_compare(ty1, ty2)) {
    return (equality_test_for_same_type(ty1, v1, v2));
  } else {
    return (false);
  }
};

var inequality_test_number = function (n1, n2) {
  if (((n1 === JsNumber.nan) || (n2 === JsNumber.nan))) {
    return (Coq_prim_undef());
  } else {
    if ((n1 === n2)) {
      return (Coq_prim_bool(false));
    } else {
      if (((n1 === JsNumber.zero) && (n2 === JsNumber.neg_zero))) {
        return (Coq_prim_bool(false));
      } else {
        if (((n1 === JsNumber.neg_zero) && (n2 === JsNumber.zero))) {
          return (Coq_prim_bool(false));
        } else {
          if ((n1 === JsNumber.infinity)) {
            return (Coq_prim_bool(false));
          } else {
            if ((n2 === JsNumber.infinity)) {
              return (Coq_prim_bool(true));
            } else {
              if ((n2 === JsNumber.neg_infinity)) {
                return (Coq_prim_bool(false));
              } else {
                if ((n1 === JsNumber.neg_infinity)) {
                  return (Coq_prim_bool(true));
                } else {
                  return (Coq_prim_bool((n1 < n2)));
                }
              }
            }
          }
        }
      }
    }
  }
};

var inequality_test_string = function (s1, s2) {
  return (!(string_eq(s1, s2)));
};

var inequality_test_primitive = function (w1, w2) {
  switch (w1.tag) {
    case "Coq_prim_undef":
      return (
        inequality_test_number(convert_prim_to_number(w1),
          convert_prim_to_number(w2)));
    case "Coq_prim_null":
      return (
        inequality_test_number(convert_prim_to_number(w1),
          convert_prim_to_number(w2)));
    case "Coq_prim_bool":
      var b = w1.value;
      return (
        inequality_test_number(convert_prim_to_number(w1),
          convert_prim_to_number(w2)));
    case "Coq_prim_number":
      var n = w1.value;
      return (
        inequality_test_number(convert_prim_to_number(w1),
          convert_prim_to_number(w2)));
    case "Coq_prim_string":
      var s1 = w1.value;
      switch (w2.tag) {
        case "Coq_prim_undef":
          return (
            inequality_test_number(convert_prim_to_number(w1),
              convert_prim_to_number(w2)));
        case "Coq_prim_null":
          return (
            inequality_test_number(convert_prim_to_number(w1),
              convert_prim_to_number(w2)));
        case "Coq_prim_bool":
          var b = w2.value;
          return (
            inequality_test_number(convert_prim_to_number(w1),
              convert_prim_to_number(w2)));
        case "Coq_prim_number":
          var n = w2.value;
          return (
            inequality_test_number(convert_prim_to_number(w1),
              convert_prim_to_number(w2)));
        case "Coq_prim_string":
          var s2 = w2.value;
          return (Coq_prim_bool(inequality_test_string(s1, s2)));
      }
      
  }
  
};

var typeof_prim = function (_foo_) {
  switch (_foo_.tag) {
    case "Coq_prim_undef":
      return ("undefined");
    case "Coq_prim_null":
      return ("object");
    case "Coq_prim_bool":
      var b = _foo_.value;
      return ("boolean");
    case "Coq_prim_number":
      var n = _foo_.value;
      return ("number");
    case "Coq_prim_string":
      var s = _foo_.value;
      return ("string");
  }
  
};

var string_of_propname = function (_foo_) {
  switch (_foo_.tag) {
    case "Coq_propname_identifier":
      var s = _foo_.value;
      return (s);
    case "Coq_propname_string":
      var s = _foo_.value;
      return (s);
    case "Coq_propname_number":
      var n = _foo_.value;
      return (JsNumber.to_string(n));
  }
  
};

var build_error = function (s, vproto, vmsg) {
  var o = object_new(vproto, "Error");
  var _tuple_arg_1 = object_alloc(s, o);
  var l = _tuple_arg_1[0], s_2 = _tuple_arg_1[1];
  if (value_compare(vmsg, Coq_value_prim(Coq_prim_undef()))) {
    return (result_out(Coq_out_ter(s_2, res_val(Coq_value_object(l)))));
  } else {
    return (
      function (s) {
          Debug.not_yet_implemented_because(__LOC__, s);
          return (Coq_result_impossible());}(
        "Need [to_string] (this function shall be put in [runs_type].)"));
  }
};

var run_error = function (s, ne) {
  return (
    if_object(
      build_error(s,
        Coq_value_object(
          Coq_object_loc_prealloc(Coq_prealloc_native_error_proto(ne))),
        Coq_value_prim(Coq_prim_undef())), function(s_2, l) {
        
        return (
          Coq_result_some(
            Coq_specret_out(
              Coq_out_ter(s_2,
                res_throw(Coq_resvalue_value(Coq_value_object(l)))))));}));
};

var out_error_or_void = function (s, str, ne) {
  if (str) {
    return (run_error(s, ne));
  } else {
    return (result_out(out_void(s)));
  }
};

var out_error_or_cst = function (s, str, ne, v) {
  if (str) {
    return (run_error(s, ne));
  } else {
    return (result_out(Coq_out_ter(s, res_val(v))));
  }
};

var run_object_method = function (proj, s, l) {
  return (LibOption.map(proj, object_binds_pickable_option(s, l)));
};

var run_object_heap_set_extensible = function (b, s, l) {
  return (
    LibOption.map(function (o) {
        return (object_write(s, l, object_set_extensible(o, b)));},
      object_binds_pickable_option(s, l)));
};

var object_has_prop = function (s, c, l, x) {
  return (
    if_some(run_object_method(object_has_prop_, s, l), function(b) {
        
        switch (b.tag) {
          case "Coq_builtin_has_prop_default":
            return (
              if_run(run_object_get_prop(s, c, l, x), function(s1, d) {
                  
                  return (
                    res_ter(s1,
                      res_val(
                        Coq_value_prim(
                          Coq_prim_bool(
                            !(
                              full_descriptor_compare(d,
                                Coq_full_descriptor_undef())))))));}));
        }
        }));
};

var object_get_builtin = function (s, c, b, vthis, l, x) {
  var def = function (s0, l0) {
    return (
      if_run(run_object_get_prop(s0, c, l0, x), function(s1, d) {
          
          switch (d.tag) {
            case "Coq_full_descriptor_undef":
              return (
                res_ter(s1, res_val(Coq_value_prim(Coq_prim_undef()))));
            case "Coq_full_descriptor_some":
              var a = d.value;
              switch (a.tag) {
                case "Coq_attributes_data_of":
                  var ad = a.value;
                  return (res_ter(s1, res_val(ad.attributes_data_value)));
                case "Coq_attributes_accessor_of":
                  var aa = a.value;
                  var _switch_arg_2 = aa.attributes_accessor_get;
                  switch (_switch_arg_2.tag) {
                    case "Coq_value_prim":
                      var p = _switch_arg_2.value;
                      switch (p.tag) {
                        case "Coq_prim_undef":
                          return (
                            res_ter(s1,
                              res_val(Coq_value_prim(Coq_prim_undef()))));
                        case "Coq_prim_null":
                          return (Coq_result_impossible());
                        case "Coq_prim_bool":
                          var b0 = p.value;
                          return (Coq_result_impossible());
                        case "Coq_prim_number":
                          var n = p.value;
                          return (Coq_result_impossible());
                        case "Coq_prim_string":
                          var s2 = p.value;
                          return (Coq_result_impossible());
                      }
                      
                    case "Coq_value_object":
                      var lf = _switch_arg_2.value;
                      return (run_call(s1, c, lf, vthis, mk_nil()));
                  }
                  
              }
              
          }
          }));
  };
  var function0 = function (s0) {
    return (
      if_value(def(s0, l), function(s_2, v) {
          
          if (spec_function_get_error_case_dec(s_2, x, v)) {
            return (run_error(s_2, Coq_native_error_type()));
          } else {
            return (res_ter(s_2, res_val(v)));
          }}));
  };
  switch (b.tag) {
    case "Coq_builtin_get_default":
      return (def(s, l));
    case "Coq_builtin_get_function":
      return (function0(s));
    case "Coq_builtin_get_args_obj":
      return (
        if_some(run_object_method(object_parameter_map_, s, l),
          function(lmapo) {
            
            return (
              if_some(lmapo, function(lmap) {
                  
                  return (
                    if_run(run_object_get_own_prop(s, c, lmap, x),
                      function(s0, d) {
                        
                        switch (d.tag) {
                          case "Coq_full_descriptor_undef":
                            return (function0(s0));
                          case "Coq_full_descriptor_some":
                            var a = d.value;
                            return (run_object_get(s0, c, lmap, x));
                        }
                        }));}));}));
  }
  
};

var run_object_get = function (s, c, l, x) {
  return (
    if_some(run_object_method(object_get_, s, l), function(b) {
        
        return (object_get_builtin(s, c, b, Coq_value_object(l), l, x));}));
};

var run_object_get_prop = function (s, c, l, x) {
  return (
    if_some(run_object_method(object_get_prop_, s, l), function(b) {
        
        switch (b.tag) {
          case "Coq_builtin_get_prop_default":
            return (
              if_run(run_object_get_own_prop(s, c, l, x), function(s1, d) {
                  
                  if (full_descriptor_compare(d, Coq_full_descriptor_undef())) {
                    return (
                      if_some(run_object_method(object_proto_, s1, l),
                        function(proto) {
                          
                          switch (proto.tag) {
                            case "Coq_value_prim":
                              var p = proto.value;
                              switch (p.tag) {
                                case "Coq_prim_null":
                                  return (
                                    res_spec(s1, Coq_full_descriptor_undef()));
                                default:
                                  return (
                                    function (s, m) {
                                        Debug.impossible_with_heap_because(
                                          __LOC__, s, m);
                                        return (Coq_result_impossible());}(
                                      s1,
                                      "Found a non-null primitive value as a prototype in [run_object_get_prop]."));
                              }
                              
                            case "Coq_value_object":
                              var lproto = proto.value;
                              return (run_object_get_prop(s1, c, lproto, x));
                          }
                          }));
                  } else {
                    return (res_spec(s1, d));
                  }}));
        }
        }));
};

var object_proto_is_prototype_of = function (s, l0, l) {
  return (
    if_some(run_object_method(object_proto_, s, l), function(b) {
        
        switch (b.tag) {
          case "Coq_value_prim":
            var p = b.value;
            switch (p.tag) {
              case "Coq_prim_null":
                return (
                  result_out(
                    Coq_out_ter(s,
                      res_val(Coq_value_prim(Coq_prim_bool(false))))));
              default:
                return (
                  function (s, m) {
                      Debug.impossible_with_heap_because(__LOC__, s, m);
                      return (Coq_result_impossible());}(s,
                    "[run_object_method] returned a primitive in [object_proto_is_prototype_of_body]."));
            }
            
          case "Coq_value_object":
            var l_2 = b.value;
            if (object_loc_compare(l_2, l0)) {
              return (
                result_out(
                  Coq_out_ter(s,
                    res_val(Coq_value_prim(Coq_prim_bool(true))))));
            } else {
              return (object_proto_is_prototype_of(s, l0, l_2));
            }
        }
        }));
};

var object_default_value = function (s, c, l, prefo) {
  return (
    if_some(run_object_method(object_default_value_, s, l), function(b) {
        
        switch (b.tag) {
          case "Coq_builtin_default_value_default":
            var gpref = unsome_default(Coq_preftype_number(), prefo);
            var lpref = other_preftypes(gpref);
            var sub0 = function (s_2, x, k) {
              return (
                if_value(run_object_get(s_2, c, l, x), function(s1, vfo) {
                    
                    return (
                      if_some(run_callable(s1, vfo), function(co) {
                          
                          switch (co.tag) {
                            case "Some":
                              var b0 = co.value;
                              return (
                                if_object(
                                  result_out(Coq_out_ter(s1, res_val(vfo))),
                                  function(s2, lfunc) {
                                    
                                    return (
                                      if_value(
                                        run_call(s2, c, lfunc,
                                          Coq_value_object(l), mk_nil()),
                                        function(s3, v) {
                                          
                                          switch (v.tag) {
                                            case "Coq_value_prim":
                                              var w = v.value;
                                              return (
                                                result_out(
                                                  Coq_out_ter(s3,
                                                    res_val(
                                                      Coq_value_prim(w)))));
                                            case "Coq_value_object":
                                              var l0 = v.value;
                                              return (k(s3));
                                          }
                                          }));}));
                            case "None":
                              return (k(s1));
                          }
                          }));}));
            };
            var gmeth = method_of_preftype(gpref);
            return (
              sub0(s, gmeth, function (s_2) {
                  var lmeth = method_of_preftype(lpref);
                  return (
                    sub0(s_2, lmeth, function (s_3) {
                        return (run_error(s_3, Coq_native_error_type()));}));
                }));
        }
        }));
};

var to_primitive = function (s, c, v, prefo) {
  switch (v.tag) {
    case "Coq_value_prim":
      var w = v.value;
      return (result_out(Coq_out_ter(s, res_val(Coq_value_prim(w)))));
    case "Coq_value_object":
      var l = v.value;
      return (
        if_prim(object_default_value(s, c, l, prefo), function(s0, r) {
            
            return (res_ter(s0, res_val(Coq_value_prim(r))));}));
  }
  
};

var to_number = function (s, c, _foo_) {
  switch (_foo_.tag) {
    case "Coq_value_prim":
      var w = _foo_.value;
      return (
        result_out(
          Coq_out_ter(s,
            res_val(
              Coq_value_prim(Coq_prim_number(convert_prim_to_number(w)))))));
    case "Coq_value_object":
      var l = _foo_.value;
      return (
        if_prim(
          to_primitive(s, c, Coq_value_object(l),
            Some(Coq_preftype_number())), function(s1, w) {
            
            return (
              res_ter(s1,
                res_val(
                  Coq_value_prim(Coq_prim_number(convert_prim_to_number(w))))));
          }));
  }
  
};

var to_integer = function (s, c, v) {
  return (
    if_number(to_number(s, c, v), function(s1, n) {
        
        return (
          res_ter(s1,
            res_val(
              Coq_value_prim(Coq_prim_number(convert_number_to_integer(n))))));
      }));
};

var to_int32 = function (s, c, v) {
  return (
    if_number(to_number(s, c, v), function(s_2, n) {
        
        return (res_spec(s_2, JsNumber.to_int32(n)));}));
};

var to_uint32 = function (s, c, v) {
  return (
    if_number(to_number(s, c, v), function(s_2, n) {
        
        return (res_spec(s_2, JsNumber.to_uint32(n)));}));
};

var to_string = function (s, c, _foo_) {
  switch (_foo_.tag) {
    case "Coq_value_prim":
      var w = _foo_.value;
      return (
        result_out(
          Coq_out_ter(s,
            res_val(
              Coq_value_prim(Coq_prim_string(convert_prim_to_string(w)))))));
    case "Coq_value_object":
      var l = _foo_.value;
      return (
        if_prim(
          to_primitive(s, c, Coq_value_object(l),
            Some(Coq_preftype_string())), function(s1, w) {
            
            return (
              res_ter(s1,
                res_val(
                  Coq_value_prim(Coq_prim_string(convert_prim_to_string(w))))));
          }));
  }
  
};

var object_can_put = function (s, c, l, x) {
  return (
    if_some(run_object_method(object_can_put_, s, l), function(b) {
        
        switch (b.tag) {
          case "Coq_builtin_can_put_default":
            return (
              if_run(run_object_get_own_prop(s, c, l, x), function(s1, d) {
                  
                  switch (d.tag) {
                    case "Coq_full_descriptor_undef":
                      return (
                        if_some(run_object_method(object_proto_, s1, l),
                          function(vproto) {
                            
                            switch (vproto.tag) {
                              case "Coq_value_prim":
                                var p = vproto.value;
                                switch (p.tag) {
                                  case "Coq_prim_null":
                                    return (
                                      if_some(
                                        run_object_method(object_extensible_,
                                          s1, l), function(b0) {
                                          
                                          return (
                                            res_ter(s1,
                                              res_val(
                                                Coq_value_prim(
                                                  Coq_prim_bool(b0)))));}));
                                  default:
                                    return (
                                      function (s, m) {
                                          Debug.impossible_with_heap_because(
                                            __LOC__, s, m);
                                          return (Coq_result_impossible());}(
                                        s1,
                                        "Non-null primitive get as a prototype value in [object_can_put]."));
                                }
                                
                              case "Coq_value_object":
                                var lproto = vproto.value;
                                return (
                                  if_run(
                                    run_object_get_prop(s1, c, lproto, x),
                                    function(s2, d_2) {
                                      
                                      switch (d_2.tag) {
                                        case "Coq_full_descriptor_undef":
                                          return (
                                            if_some(
                                              run_object_method(
                                                object_extensible_, s2, l),
                                              function(b0) {
                                                
                                                return (
                                                  res_ter(s2,
                                                    res_val(
                                                      Coq_value_prim(
                                                        Coq_prim_bool(b0)))));
                                              }));
                                        case "Coq_full_descriptor_some":
                                          var a = d_2.value;
                                          switch (a.tag) {
                                            case "Coq_attributes_data_of":
                                              var ad = a.value;
                                              return (
                                                if_some(
                                                  run_object_method(
                                                    object_extensible_, s2,
                                                    l), function(ext) {
                                                    
                                                    return (
                                                      res_ter(s2,
                                                        (function () {
                                                          if (ext) {
                                                            return (
                                                              res_val(
                                                                Coq_value_prim(
                                                                  Coq_prim_bool(
                                                                    ad.attributes_data_writable))));
                                                          } else {
                                                            return (
                                                              res_val(
                                                                Coq_value_prim(
                                                                  Coq_prim_bool(
                                                                    false))));
                                                          }}())));}));
                                            case "Coq_attributes_accessor_of":
                                              var aa = a.value;
                                              return (
                                                res_ter(s2,
                                                  res_val(
                                                    Coq_value_prim(
                                                      Coq_prim_bool(
                                                        !(
                                                          value_compare(
                                                            aa.attributes_accessor_set,
                                                            Coq_value_prim(
                                                              Coq_prim_undef(
                                                                )))))))));
                                          }
                                          
                                      }
                                      }));
                            }
                            }));
                    case "Coq_full_descriptor_some":
                      var a = d.value;
                      switch (a.tag) {
                        case "Coq_attributes_data_of":
                          var ad = a.value;
                          return (
                            res_ter(s1,
                              res_val(
                                Coq_value_prim(
                                  Coq_prim_bool(ad.attributes_data_writable)))));
                        case "Coq_attributes_accessor_of":
                          var aa = a.value;
                          return (
                            res_ter(s1,
                              res_val(
                                Coq_value_prim(
                                  Coq_prim_bool(
                                    !(
                                      value_compare(
                                        aa.attributes_accessor_set,
                                        Coq_value_prim(Coq_prim_undef()))))))));
                      }
                      
                  }
                  }));
        }
        }));
};

var run_object_define_own_prop_array_loop = function (s, c, l, newLen, oldLen, newLenDesc, newWritable, throwcont, def) {
  if ((newLen < oldLen)) {
    var oldLen_2 = (oldLen - 1.);
    return (
      if_string(to_string(s, c, Coq_value_prim(Coq_prim_number(oldLen_2))),
        function(s0, slen) {
          
          return (
            if_bool(object_delete(s0, c, l, slen, false), function(s1,
              deleteSucceeded) {
                
                if (!(deleteSucceeded)) {
                  var newLenDesc0 = descriptor_with_value(newLenDesc,
                                      Some(
                                        Coq_value_prim(
                                          Coq_prim_number((oldLen_2 + 1.)))));
                  if (!(newWritable)) {
                    var newLenDesc1 = descriptor_with_writable(newLenDesc0,
                                        Some(false));
                  } else {
                    var newLenDesc1 = newLenDesc0;
                  }
                  return (
                    if_bool(def(s1, "length", newLenDesc1, false),
                      function(s2, x) {
                        
                        return (
                          out_error_or_cst(s2, throwcont,
                            Coq_native_error_type(),
                            Coq_value_prim(Coq_prim_bool(false))));}));
                } else {
                  return (
                    run_object_define_own_prop_array_loop(s1, c, l, newLen,
                      oldLen_2, newLenDesc, newWritable, throwcont, def));
                }}));}));
  } else {
    if (!(newWritable)) {
      return (
        def(s, "length", {
            descriptor_value: None(),
            descriptor_writable: Some(false),
            descriptor_get: None(),
            descriptor_set: None(),
            descriptor_enumerable: None(),
            descriptor_configurable: None()}, false));
    } else {
      return (res_ter(s, res_val(Coq_value_prim(Coq_prim_bool(true)))));
    }
  }
};

var object_define_own_prop = function (s, c, l, x, desc, throwcont) {
  var reject = function (s0, throwcont0) {
    return (
      out_error_or_cst(s0, throwcont0, Coq_native_error_type(),
        Coq_value_prim(Coq_prim_bool(false))));
  };
  var def = function (s0, x0, desc0, throwcont0) {
    return (
      if_run(run_object_get_own_prop(s0, c, l, x0), function(s1, d) {
          
          return (
            if_some(run_object_method(object_extensible_, s1, l),
              function(ext) {
                
                switch (d.tag) {
                  case "Coq_full_descriptor_undef":
                    if (ext) {
                      if ((descriptor_is_generic_dec(desc0)
                          || descriptor_is_data_dec(desc0))) {
                        var a = Coq_attributes_data_of(
                                  attributes_data_of_descriptor(desc0));
                      } else {
                        var a = Coq_attributes_accessor_of(
                                  attributes_accessor_of_descriptor(desc0));
                      }
                      return (
                        if_some(
                          object_heap_map_properties_pickable_option(s1, l,
                            function (p) { return (HeapStr.write(p, x0, a));
                            }), function(s2) {
                            
                            return (
                              res_ter(s2,
                                res_val(Coq_value_prim(Coq_prim_bool(true)))));
                          }));
                    } else {
                      return (reject(s1, throwcont0));
                    }
                  case "Coq_full_descriptor_some":
                    var a = d.value;
                    var object_define_own_prop_write = function (s2, a0) {
                      var a_2 = attributes_update(a0, desc0);
                      return (
                        if_some(
                          object_heap_map_properties_pickable_option(s2, l,
                            function (p) {
                              return (HeapStr.write(p, x0, a_2));}),
                          function(s3) {
                            
                            return (
                              res_ter(s3,
                                res_val(Coq_value_prim(Coq_prim_bool(true)))));
                          }));
                    };
                    if (descriptor_contains_dec(descriptor_of_attributes(a),
                          desc0)) {
                      return (
                        res_ter(s1,
                          res_val(Coq_value_prim(Coq_prim_bool(true)))));
                    } else {
                      if (attributes_change_enumerable_on_non_configurable_dec(
                            a, desc0)) {
                        return (reject(s1, throwcont0));
                      } else {
                        if (descriptor_is_generic_dec(desc0)) {
                          return (object_define_own_prop_write(s1, a));
                        } else {
                          if (!(
                                bool_eq(attributes_is_data_dec(a),
                                  descriptor_is_data_dec(desc0)))) {
                            if (attributes_configurable(a)) {
                              switch (a.tag) {
                                case "Coq_attributes_data_of":
                                  var ad = a.value;
                                  var a_2 = Coq_attributes_accessor_of(
                                              attributes_accessor_of_attributes_data(
                                                ad));
                                  break;
                                case "Coq_attributes_accessor_of":
                                  var aa = a.value;
                                  var a_2 = Coq_attributes_data_of(
                                              attributes_data_of_attributes_accessor(
                                                aa));
                                  break;
                              }
                              
                              return (
                                if_some(
                                  object_heap_map_properties_pickable_option(
                                    s1, l, function (p) {
                                      return (HeapStr.write(p, x0, a_2));}),
                                  function(s2) {
                                    
                                    return (
                                      object_define_own_prop_write(s2, a_2));
                                  }));
                            } else {
                              return (reject(s1, throwcont0));
                            }
                          } else {
                            if ((attributes_is_data_dec(a)
                                && descriptor_is_data_dec(desc0))) {
                              switch (a.tag) {
                                case "Coq_attributes_data_of":
                                  var ad = a.value;
                                  if (attributes_change_data_on_non_configurable_dec(
                                        ad, desc0)) {
                                    return (reject(s1, throwcont0));
                                  } else {
                                    return (
                                      object_define_own_prop_write(s1, a));
                                  }
                                case "Coq_attributes_accessor_of":
                                  var a0 = a.value;
                                  return (
                                    function (s, m) {
                                        Debug.impossible_with_heap_because(
                                          __LOC__, s, m);
                                        return (Coq_result_impossible());}(
                                      s0,
                                      "data is not accessor in [defineOwnProperty]"));
                              }
                              
                            } else {
                              if ((!(attributes_is_data_dec(a))
                                  && descriptor_is_accessor_dec(desc0))) {
                                switch (a.tag) {
                                  case "Coq_attributes_data_of":
                                    var a0 = a.value;
                                    return (
                                      function (s, m) {
                                          Debug.impossible_with_heap_because(
                                            __LOC__, s, m);
                                          return (Coq_result_impossible());}(
                                        s0,
                                        "accessor is not data in [defineOwnProperty]"));
                                  case "Coq_attributes_accessor_of":
                                    var aa = a.value;
                                    if (attributes_change_accessor_on_non_configurable_dec(
                                          aa, desc0)) {
                                      return (reject(s1, throwcont0));
                                    } else {
                                      return (
                                        object_define_own_prop_write(s1, a));
                                    }
                                }
                                
                              } else {
                                return (
                                  function (s, m) {
                                      Debug.impossible_with_heap_because(
                                        __LOC__, s, m);
                                      return (Coq_result_impossible());}(s0,
                                    "cases are mutually exclusives in [defineOwnProperty]"));
                              }
                            }
                          }
                        }
                      }
                    }
                }
                }));}));
  };
  return (
    if_some(run_object_method(object_define_own_prop_, s, l), function(b) {
        
        switch (b.tag) {
          case "Coq_builtin_define_own_prop_default":
            return (def(s, x, desc, throwcont));
          case "Coq_builtin_define_own_prop_array":
            return (
              if_run(run_object_get_own_prop(s, c, l, "length"), function(s0,
                d) {
                  
                  switch (d.tag) {
                    case "Coq_full_descriptor_undef":
                      return (
                        function (s, m) {
                            Debug.impossible_with_heap_because(__LOC__, s, m);
                            return (Coq_result_impossible());}(s0,
                          "Array length property descriptor cannot be undefined."));
                    case "Coq_full_descriptor_some":
                      var attr = d.value;
                      switch (attr.tag) {
                        case "Coq_attributes_data_of":
                          var a = attr.value;
                          var oldLen = a.attributes_data_value;
                          switch (oldLen.tag) {
                            case "Coq_value_prim":
                              var w = oldLen.value;
                              var oldLen0 = JsNumber.to_uint32(
                                              convert_prim_to_number(w));
                              var descValueOpt = desc.descriptor_value;
                              if (string_eq(x, "length")) {
                                switch (descValueOpt.tag) {
                                  case "Some":
                                    var descValue = descValueOpt.value;
                                    return (
                                      if_run(to_uint32(s0, c, descValue),
                                        function(s1, newLen) {
                                          
                                          return (
                                            if_number(
                                              to_number(s1, c, descValue),
                                              function(s2, newLenN) {
                                                
                                                if (!((newLen === newLenN))) {
                                                  return (
                                                    run_error(s2,
                                                      Coq_native_error_range(
                                                        )));
                                                } else {
                                                  var newLenDesc = descriptor_with_value(
                                                                    desc,
                                                                    Some(
                                                                    Coq_value_prim(
                                                                    Coq_prim_number(
                                                                    newLen))));
                                                  if (le_int_decidable(
                                                        oldLen0, newLen)) {
                                                    return (
                                                      def(s2, "length",
                                                        newLenDesc,
                                                        throwcont));
                                                  } else {
                                                    if (!(
                                                          a.attributes_data_writable)) {
                                                      return (
                                                        reject(s2, throwcont));
                                                    } else {
                                                      var _switch_arg_3 = newLenDesc.descriptor_writable;
                                                      switch (_switch_arg_3.tag) {
                                                        case "Some":
                                                          var b0 = _switch_arg_3.value;
                                                          if (b0) {
                                                            var newWritable = true;
                                                          } else {
                                                            var newWritable = false;
                                                          }
                                                          break;
                                                        case "None":
                                                          var newWritable = true;
                                                          break;
                                                      }
                                                      
                                                      if (!(newWritable)) {
                                                        var newLenDesc0 = 
                                                        descriptor_with_writable(
                                                          newLenDesc,
                                                          Some(true));
                                                      } else {
                                                        var newLenDesc0 = newLenDesc;
                                                      }
                                                      return (
                                                        if_bool(
                                                          def(s2, "length",
                                                            newLenDesc0,
                                                            throwcont),
                                                          function(s3,
                                                          succ) {
                                                            
                                                            if (!(succ)) {
                                                              return (
                                                                res_ter(s3,
                                                                  res_val(
                                                                    Coq_value_prim(
                                                                    Coq_prim_bool(
                                                                    false)))));
                                                            } else {
                                                              return (
                                                                run_object_define_own_prop_array_loop(
                                                                  s3, c, l,
                                                                  newLen,
                                                                  oldLen0,
                                                                  newLenDesc0,
                                                                  newWritable,
                                                                  throwcont,
                                                                  def));
                                                            }}));
                                                    }
                                                  }
                                                }}));}));
                                  case "None":
                                    return (
                                      def(s0, "length", desc, throwcont));
                                }
                                
                              } else {
                                return (
                                  if_run(
                                    to_uint32(s0, c,
                                      Coq_value_prim(Coq_prim_string(x))),
                                    function(s1, ilen) {
                                      
                                      return (
                                        if_string(
                                          to_string(s1, c,
                                            Coq_value_prim(
                                              Coq_prim_number(ilen))),
                                          function(s2, slen) {
                                            
                                            if ((string_eq(x, slen)
                                                && !((ilen == 4294967295.)))) {
                                              return (
                                                if_run(
                                                  to_uint32(s2, c,
                                                    Coq_value_prim(
                                                      Coq_prim_string(x))),
                                                  function(s3, index) {
                                                    
                                                    if ((le_int_decidable(
                                                           oldLen0, index)
                                                        && !(
                                                             a.attributes_data_writable))) {
                                                      return (
                                                        reject(s3, throwcont));
                                                    } else {
                                                      return (
                                                        if_bool(
                                                          def(s3, x, desc,
                                                            false),
                                                          function(s4, b0) {
                                                            
                                                            if (!(b0)) {
                                                              return (
                                                                reject(s4,
                                                                  throwcont));
                                                            } else {
                                                              if (le_int_decidable(
                                                                    oldLen0,
                                                                    index)) {
                                                                var a0 = 
                                                                descriptor_with_value(
                                                                  descriptor_of_attributes(
                                                                    Coq_attributes_data_of(
                                                                    a)),
                                                                  Some(
                                                                    Coq_value_prim(
                                                                    Coq_prim_number(
                                                                    (index
                                                                    + 1.)))));
                                                                return (
                                                                  def(s4,
                                                                    "length",
                                                                    a0,
                                                                    false));
                                                              } else {
                                                                return (
                                                                  res_ter(s4,
                                                                    res_val(
                                                                    Coq_value_prim(
                                                                    Coq_prim_bool(
                                                                    true)))));
                                                              }
                                                            }}));
                                                    }}));
                                            } else {
                                              return (
                                                def(s2, x, desc, throwcont));
                                            }}));}));
                              }
                            case "Coq_value_object":
                              var l0 = oldLen.value;
                              return (
                                function (s, m) {
                                    Debug.impossible_with_heap_because(
                                      __LOC__, s, m);
                                    return (Coq_result_impossible());}(s0,
                                  "Spec asserts length of array is number."));
                          }
                          
                        case "Coq_attributes_accessor_of":
                          var a = attr.value;
                          return (
                            function (s, m) {
                                Debug.impossible_with_heap_because(__LOC__,
                                  s, m);
                                return (Coq_result_impossible());}(s0,
                              "Array length property descriptor cannot be accessor."));
                      }
                      
                  }
                  }));
          case "Coq_builtin_define_own_prop_args_obj":
            return (
              if_some(run_object_method(object_parameter_map_, s, l),
                function(lmapo) {
                  
                  return (
                    if_some(lmapo, function(lmap) {
                        
                        return (
                          if_run(run_object_get_own_prop(s, c, lmap, x),
                            function(s0, d) {
                              
                              return (
                                if_bool(def(s0, x, desc, false), function(s1,
                                  b0) {
                                    
                                    if (b0) {
                                      var follow = function (s2) {
                                        return (
                                          res_ter(s2,
                                            res_val(
                                              Coq_value_prim(
                                                Coq_prim_bool(true)))));
                                      };
                                      switch (d.tag) {
                                        case "Coq_full_descriptor_undef":
                                          return (follow(s1));
                                        case "Coq_full_descriptor_some":
                                          var a = d.value;
                                          if (descriptor_is_accessor_dec(
                                                desc)) {
                                            return (
                                              if_bool(
                                                object_delete(s1, c, lmap, x,
                                                  false), function(s2, x0) {
                                                  
                                                  return (follow(s2));}));
                                          } else {
                                            var follow0 = function (s2) {
                                              if (option_compare(bool_eq,
                                                    desc.descriptor_writable,
                                                    Some(false))) {
                                                return (
                                                  if_bool(
                                                    object_delete(s2, c,
                                                      lmap, x, false),
                                                    function(s3, x0) {
                                                      
                                                      return (follow(s3));}));
                                              } else {
                                                return (follow(s2));
                                              }
                                            };
                                            var _switch_arg_4 = desc.descriptor_value;
                                            switch (_switch_arg_4.tag) {
                                              case "Some":
                                                var v = _switch_arg_4.value;
                                                return (
                                                  if_void(
                                                    object_put(s1, c, lmap,
                                                      x, v, throwcont),
                                                    function(s2) {
                                                      
                                                      return (follow0(s2));}));
                                              case "None":
                                                return (follow0(s1));
                                            }
                                            
                                          }
                                      }
                                      
                                    } else {
                                      return (reject(s1, throwcont));
                                    }}));}));}));}));
        }
        }));
};

var run_to_descriptor = function (s, c, _foo_) {
  switch (_foo_.tag) {
    case "Coq_value_prim":
      var p = _foo_.value;
      return (throw_result(run_error(s, Coq_native_error_type())));
    case "Coq_value_object":
      var l = _foo_.value;
      var sub0 = function (s0, desc, name, conv, k) {
        return (
          if_bool(object_has_prop(s0, c, l, name), function(s1, has) {
              
              if (!(has)) {
                return (k(s1, desc));
              } else {
                return (
                  if_value(run_object_get(s1, c, l, name), function(s2, v0) {
                      
                      return (
                        if_run(conv(s2, v0, desc), function(s3, r) {
                            
                            return (k(s3, r));}));}));
              }}));
      };
      return (
        sub0(s, descriptor_intro_empty, "enumerable",
          function (s1, v1, desc) {
            var b = convert_value_to_boolean(v1);
            return (res_spec(s1, descriptor_with_enumerable(desc, Some(b))));
          }, function (s1_2, desc) {
            return (
              sub0(s1_2, desc, "configurable", function (s2, v2, desc0) {
                  var b = convert_value_to_boolean(v2);
                  return (
                    res_spec(s2,
                      descriptor_with_configurable(desc0, Some(b))));},
                function (s2_2, desc0) {
                  return (
                    sub0(s2_2, desc0, "value", function (s3, v3, desc1) {
                        return (
                          res_spec(s3,
                            descriptor_with_value(desc1, Some(v3))));},
                      function (s3_2, desc1) {
                        return (
                          sub0(s3_2, desc1, "writable",
                            function (s4, v4, desc2) {
                              var b = convert_value_to_boolean(v4);
                              return (
                                res_spec(s4,
                                  descriptor_with_writable(desc2, Some(b))));
                            }, function (s4_2, desc2) {
                              return (
                                sub0(s4_2, desc2, "get",
                                  function (s5, v5, desc3) {
                                    if ((!(is_callable_dec(s5, v5))
                                        && !(
                                             value_compare(v5,
                                               Coq_value_prim(
                                                 Coq_prim_undef()))))) {
                                      return (
                                        throw_result(
                                          run_error(s5,
                                            Coq_native_error_type())));
                                    } else {
                                      return (
                                        res_spec(s5,
                                          descriptor_with_get(desc3,
                                            Some(v5))));
                                    }}, function (s5_2, desc3) {
                                    return (
                                      sub0(s5_2, desc3, "set",
                                        function (s6, v6, desc4) {
                                          if ((!(is_callable_dec(s6, v6))
                                              && !(
                                                   value_compare(v6,
                                                     Coq_value_prim(
                                                       Coq_prim_undef()))))) {
                                            return (
                                              throw_result(
                                                run_error(s6,
                                                  Coq_native_error_type())));
                                          } else {
                                            return (
                                              res_spec(s6,
                                                descriptor_with_set(desc4,
                                                  Some(v6))));
                                          }}, function (s7, desc4) {
                                          if (((!(
                                                  option_compare(
                                                    value_compare,
                                                    desc4.descriptor_get,
                                                    None()))
                                               || !(
                                                    option_compare(
                                                      value_compare,
                                                      desc4.descriptor_set,
                                                      None())))
                                              && (!(
                                                    option_compare(
                                                      value_compare,
                                                      desc4.descriptor_value,
                                                      None()))
                                                 || !(
                                                      option_compare(bool_eq,
                                                        desc4.descriptor_writable,
                                                        None()))))) {
                                            return (
                                              throw_result(
                                                run_error(s7,
                                                  Coq_native_error_type())));
                                          } else {
                                            return (res_spec(s7, desc4));
                                          }}));}));}));}));}));}));
  }
  
};

var prim_new_object = function (s, _foo_) {
  switch (_foo_.tag) {
    case "Coq_prim_bool":
      var b = _foo_.value;
      return (
        result_out((function () {
            var o1 = object_new(
                       Coq_value_object(
                         Coq_object_loc_prealloc(Coq_prealloc_bool_proto())),
                       "Boolean");
            var o = object_with_primitive_value(o1,
                      Coq_value_prim(Coq_prim_bool(b)));
            var _tuple_arg_5 = object_alloc(s, o);
            var l = _tuple_arg_5[0], s1 = _tuple_arg_5[1];
            return (Coq_out_ter(s1, res_val(Coq_value_object(l))));}())));
    case "Coq_prim_number":
      var n = _foo_.value;
      return (
        result_out((function () {
            var o1 = object_new(
                       Coq_value_object(
                         Coq_object_loc_prealloc(Coq_prealloc_number_proto())),
                       "Number");
            var o = object_with_primitive_value(o1,
                      Coq_value_prim(Coq_prim_number(n)));
            var _tuple_arg_6 = object_alloc(s, o);
            var l = _tuple_arg_6[0], s1 = _tuple_arg_6[1];
            return (Coq_out_ter(s1, res_val(Coq_value_object(l))));}())));
    case "Coq_prim_string":
      var s0 = _foo_.value;
      var o2 = object_new(
                 Coq_value_object(
                   Coq_object_loc_prealloc(Coq_prealloc_string_proto())),
                 "String");
      var o1 = object_with_get_own_property(o2,
                 Coq_builtin_get_own_prop_string());
      var o = object_with_primitive_value(o1,
                Coq_value_prim(Coq_prim_string(s0)));
      var _tuple_arg_7 = object_alloc(s, o);
      var l = _tuple_arg_7[0], s1 = _tuple_arg_7[1];
      return (
        if_some(
          object_heap_map_properties_pickable_option(s1, l, function (p) {
              return (
                HeapStr.write(p, "length",
                  Coq_attributes_data_of(
                    attributes_data_intro_constant(
                      Coq_value_prim(
                        Coq_prim_number(number_of_int(strlength(s0))))))));}),
          function(s_2) {
            
            return (res_ter(s_2, res_val(Coq_value_object(l))));}));
    default:
      return (
        function (s, m) {
            Debug.impossible_with_heap_because(__LOC__, s, m);
            return (Coq_result_impossible());}(s,
          "[prim_new_object] received an null or undef."));
  }
  
};

var to_object = function (s, _foo_) {
  switch (_foo_.tag) {
    case "Coq_value_prim":
      var w = _foo_.value;
      switch (w.tag) {
        case "Coq_prim_undef":
          return (run_error(s, Coq_native_error_type()));
        case "Coq_prim_null":
          return (run_error(s, Coq_native_error_type()));
        case "Coq_prim_bool":
          var b = w.value;
          return (prim_new_object(s, w));
        case "Coq_prim_number":
          var n = w.value;
          return (prim_new_object(s, w));
        case "Coq_prim_string":
          var s0 = w.value;
          return (prim_new_object(s, w));
      }
      
    case "Coq_value_object":
      var l = _foo_.value;
      return (result_out(Coq_out_ter(s, res_val(Coq_value_object(l)))));
  }
  
};

var run_object_prim_value = function (s, l) {
  return (
    if_some(run_object_method(object_prim_value_, s, l), function(ov) {
        
        return (
          if_some(ov, function(v) { 
                                    return (res_ter(s, res_val(v)));}));}));
};

var prim_value_get = function (s, c, v, x) {
  return (
    if_object(to_object(s, v), function(s_2, l) {
        
        return (
          object_get_builtin(s_2, c, Coq_builtin_get_default(), v, l, x));}));
};

var env_record_has_binding = function (s, c, l, x) {
  return (
    if_some(env_record_binds_pickable_option(s, l), function(e) {
        
        switch (e.tag) {
          case "Coq_env_record_decl":
            var ed = e.value;
            return (
              result_out(
                Coq_out_ter(s,
                  res_val(
                    Coq_value_prim(Coq_prim_bool(HeapStr.indom_dec(ed, x)))))));
          case "Coq_env_record_object":
            var l0 = e.value, pt = e.provide_this;
            return (object_has_prop(s, c, l0, x));
        }
        }));
};

var lexical_env_get_identifier_ref = function (s, c, x, x0, str) {
  switch (x.tag) {
    case "[]":
      return (
        res_spec(s,
          ref_create_value(Coq_value_prim(Coq_prim_undef()), x0, str)));
    case "::":
      var l = x.head, x_2 = x.tail;
      return (
        if_bool(env_record_has_binding(s, c, l, x0), function(s1, has) {
            
            if (has) {
              return (res_spec(s1, ref_create_env_loc(l, x0, str)));
            } else {
              return (lexical_env_get_identifier_ref(s1, c, x_2, x0, str));
            }}));
  }
  
};

var object_delete_default = function (s, c, l, x, str) {
  return (
    if_run(run_object_get_own_prop(s, c, l, x), function(s1, d) {
        
        switch (d.tag) {
          case "Coq_full_descriptor_undef":
            return (
              res_ter(s1, res_val(Coq_value_prim(Coq_prim_bool(true)))));
          case "Coq_full_descriptor_some":
            var a = d.value;
            if (attributes_configurable(a)) {
              return (
                if_some(
                  object_heap_map_properties_pickable_option(s1, l,
                    function (p) { return (HeapStr.rem(p, x));}),
                  function(s_2) {
                    
                    return (
                      res_ter(s_2,
                        res_val(Coq_value_prim(Coq_prim_bool(true)))));}));
            } else {
              return (
                out_error_or_cst(s1, str, Coq_native_error_type(),
                  Coq_value_prim(Coq_prim_bool(false))));
            }
        }
        }));
};

var object_delete = function (s, c, l, x, str) {
  return (
    if_some(run_object_method(object_delete_, s, l), function(b) {
        
        switch (b.tag) {
          case "Coq_builtin_delete_default":
            return (object_delete_default(s, c, l, x, str));
          case "Coq_builtin_delete_args_obj":
            return (
              if_some(run_object_method(object_parameter_map_, s, l),
                function(mo) {
                  
                  return (
                    if_some(mo, function(m) {
                        
                        return (
                          if_run(run_object_get_own_prop(s, c, m, x),
                            function(s1, d) {
                              
                              return (
                                if_bool(
                                  object_delete_default(s1, c, l, x, str),
                                  function(s2, b0) {
                                    
                                    if (b0) {
                                      switch (d.tag) {
                                        case "Coq_full_descriptor_undef":
                                          return (
                                            res_ter(s2,
                                              res_val(
                                                Coq_value_prim(
                                                  Coq_prim_bool(b0)))));
                                        case "Coq_full_descriptor_some":
                                          var a = d.value;
                                          return (
                                            if_bool(
                                              object_delete(s2, c, m, x,
                                                false), function(s3, b_2) {
                                                
                                                return (
                                                  res_ter(s3,
                                                    res_val(
                                                      Coq_value_prim(
                                                        Coq_prim_bool(b0)))));
                                              }));
                                      }
                                      
                                    } else {
                                      return (
                                        res_ter(s2,
                                          res_val(
                                            Coq_value_prim(Coq_prim_bool(b0)))));
                                    }}));}));}));}));
        }
        }));
};

var env_record_delete_binding = function (s, c, l, x) {
  return (
    if_some(env_record_binds_pickable_option(s, l), function(e) {
        
        switch (e.tag) {
          case "Coq_env_record_decl":
            var ed = e.value;
            var _switch_arg_8 = HeapStr.read_option(ed, x);
            switch (_switch_arg_8.tag) {
              case "Some":
                var p = _switch_arg_8.value;
                var mu = p[0], v = p[1];
                switch (mu.tag) {
                  case "Coq_mutability_uninitialized_immutable":
                    return (
                      result_out(
                        Coq_out_ter(s,
                          res_val(Coq_value_prim(Coq_prim_bool(false))))));
                  case "Coq_mutability_immutable":
                    return (
                      result_out(
                        Coq_out_ter(s,
                          res_val(Coq_value_prim(Coq_prim_bool(false))))));
                  case "Coq_mutability_nondeletable":
                    return (
                      result_out(
                        Coq_out_ter(s,
                          res_val(Coq_value_prim(Coq_prim_bool(false))))));
                  case "Coq_mutability_deletable":
                    var s_2 = env_record_write(s, l,
                                Coq_env_record_decl(
                                  decl_env_record_rem(ed, x)));
                    return (
                      result_out(
                        Coq_out_ter(s_2,
                          res_val(Coq_value_prim(Coq_prim_bool(true))))));
                }
                
              case "None":
                return (
                  result_out(
                    Coq_out_ter(s,
                      res_val(Coq_value_prim(Coq_prim_bool(true))))));
            }
            
          case "Coq_env_record_object":
            var l0 = e.value, pt = e.provide_this;
            return (object_delete(s, c, l0, x, throw_false));
        }
        }));
};

var env_record_implicit_this_value = function (s, l) {
  return (
    ifx_some_or_default(env_record_binds_pickable_option(s, l), None(),
      function (e) {
        return (
          Some((function () {
              switch (e.tag) {
                case "Coq_env_record_decl":
                  var ed = e.value;
                  return (Coq_value_prim(Coq_prim_undef()));
                case "Coq_env_record_object":
                  var l0 = e.value, provide_this = e.provide_this;
                  if (provide_this) {
                    return (Coq_value_object(l0));
                  } else {
                    return (Coq_value_prim(Coq_prim_undef()));
                  }
              }
              }())));}));
};

var identifier_resolution = function (s, c, x) {
  var x0 = c.execution_ctx_lexical_env;
  var str = c.execution_ctx_strict;
  return (lexical_env_get_identifier_ref(s, c, x0, x, str));
};

var env_record_get_binding_value = function (s, c, l, x, str) {
  return (
    if_some(env_record_binds_pickable_option(s, l), function(e) {
        
        switch (e.tag) {
          case "Coq_env_record_decl":
            var ed = e.value;
            return (
              if_some(HeapStr.read_option(ed, x), function(rm) {
                  
                  var mu = rm[0], v = rm[1];
                  if (mutability_compare(mu,
                        Coq_mutability_uninitialized_immutable())) {
                    return (
                      out_error_or_cst(s, str, Coq_native_error_ref(),
                        Coq_value_prim(Coq_prim_undef())));
                  } else {
                    return (res_ter(s, res_val(v)));
                  }}));
          case "Coq_env_record_object":
            var l0 = e.value, pt = e.provide_this;
            return (
              if_bool(object_has_prop(s, c, l0, x), function(s1, has) {
                  
                  if (has) {
                    return (run_object_get(s1, c, l0, x));
                  } else {
                    return (
                      out_error_or_cst(s1, str, Coq_native_error_ref(),
                        Coq_value_prim(Coq_prim_undef())));
                  }}));
        }
        }));
};

var ref_get_value = function (s, c, _foo_) {
  switch (_foo_.tag) {
    case "Coq_resvalue_empty":
      return (
        function (s, m) {
            Debug.impossible_with_heap_because(__LOC__, s, m);
            return (Coq_result_impossible());}(s,
          "[ref_get_value] received an empty result."));
    case "Coq_resvalue_value":
      var v = _foo_.value;
      return (res_spec(s, v));
    case "Coq_resvalue_ref":
      var r = _foo_.ref;
      var for_base_or_object = function (tt) {
        var _switch_arg_9 = r.ref_base;
        switch (_switch_arg_9.tag) {
          case "Coq_ref_base_type_value":
            var v = _switch_arg_9.value;
            if (ref_kind_comparable(ref_kind_of(r),
                  Coq_ref_kind_primitive_base())) {
              return (
                if_value(prim_value_get(s, c, v, r.ref_name), function(s2,
                  v) { 
                       return (res_spec(s2, v));}));
            } else {
              switch (v.tag) {
                case "Coq_value_prim":
                  var p = v.value;
                  return (
                    function (s, m) {
                        Debug.impossible_with_heap_because(__LOC__, s, m);
                        return (Coq_result_impossible());}(s,
                      "[ref_get_value] received a primitive value whose kind is not primitive."));
                case "Coq_value_object":
                  var l = v.value;
                  return (
                    if_value(run_object_get(s, c, l, r.ref_name),
                      function(s2, v) { 
                                        return (res_spec(s2, v));}));
              }
              
            }
          case "Coq_ref_base_type_env_loc":
            var l = _switch_arg_9.value;
            return (
              function (s, m) {
                  Debug.impossible_with_heap_because(__LOC__, s, m);
                  return (Coq_result_impossible());}(s,
                "[ref_get_value] received a reference to a value whose base type is an environnment record."));
        }
        
      };
      var _switch_arg_10 = ref_kind_of(r);
      switch (_switch_arg_10.tag) {
        case "Coq_ref_kind_null":
          return (
            function (s, m) {
                Debug.impossible_with_heap_because(__LOC__, s, m);
                return (Coq_result_impossible());}(s,
              "[ref_get_value] received a reference whose base is [null]."));
        case "Coq_ref_kind_undef":
          return (throw_result(run_error(s, Coq_native_error_ref())));
        case "Coq_ref_kind_primitive_base":
          return (for_base_or_object({}));
        case "Coq_ref_kind_object":
          return (for_base_or_object({}));
        case "Coq_ref_kind_env_record":
          var _switch_arg_11 = r.ref_base;
          switch (_switch_arg_11.tag) {
            case "Coq_ref_base_type_value":
              var v = _switch_arg_11.value;
              return (
                function (s, m) {
                    Debug.impossible_with_heap_because(__LOC__, s, m);
                    return (Coq_result_impossible());}(s,
                  "[ref_get_value] received a reference to an environnment record whose base type is a value."));
            case "Coq_ref_base_type_env_loc":
              var l = _switch_arg_11.value;
              return (
                if_value(
                  env_record_get_binding_value(s, c, l, r.ref_name,
                    r.ref_strict), function(s2, v) {
                    
                    return (res_spec(s2, v));}));
          }
          
      }
      
  }
  
};

var run_expr_get_value = function (s, c, e) {
  return (
    if_success(run_expr(s, c, e), function(s0, rv) {
        
        return (ref_get_value(s0, c, rv));}));
};

var object_put_complete = function (b, s, c, vthis, l, x, v, str) {
  switch (b.tag) {
    case "Coq_builtin_put_default":
      return (
        if_bool(object_can_put(s, c, l, x), function(s1, b0) {
            
            if (b0) {
              return (
                if_run(run_object_get_own_prop(s1, c, l, x), function(s2,
                  d) {
                    
                    var follow = function (x0) {
                      return (
                        if_run(run_object_get_prop(s2, c, l, x), function(s3,
                          d_2) {
                            
                            var follow_2 = function (x1) {
                              switch (vthis.tag) {
                                case "Coq_value_prim":
                                  var wthis = vthis.value;
                                  return (
                                    out_error_or_void(s3, str,
                                      Coq_native_error_type()));
                                case "Coq_value_object":
                                  var lthis = vthis.value;
                                  var desc = descriptor_intro_data(v, true,
                                               true, true);
                                  return (
                                    if_success(
                                      object_define_own_prop(s3, c, l, x,
                                        desc, str), function(s4, rv) {
                                        
                                        return (res_void(s4));}));
                              }
                              
                            };
                            switch (d_2.tag) {
                              case "Coq_full_descriptor_undef":
                                return (follow_2({}));
                              case "Coq_full_descriptor_some":
                                var a = d_2.value;
                                switch (a.tag) {
                                  case "Coq_attributes_data_of":
                                    var a0 = a.value;
                                    return (follow_2({}));
                                  case "Coq_attributes_accessor_of":
                                    var aa_2 = a.value;
                                    var _switch_arg_12 = aa_2.attributes_accessor_set;
                                    switch (_switch_arg_12.tag) {
                                      case "Coq_value_prim":
                                        var p = _switch_arg_12.value;
                                        return (
                                          function (s, m) {
                                              Debug.impossible_with_heap_because(
                                                __LOC__, s, m);
                                              return (
                                                Coq_result_impossible());}(
                                            s3,
                                            "[object_put_complete] found a primitive in an `set' accessor."));
                                      case "Coq_value_object":
                                        var lfsetter = _switch_arg_12.value;
                                        return (
                                          if_success(
                                            run_call(s3, c, lfsetter, vthis,
                                              mk_cons(v, mk_nil())),
                                            function(s4, rv) {
                                              
                                              return (res_void(s4));}));
                                    }
                                    
                                }
                                
                            }
                            }));
                    };
                    switch (d.tag) {
                      case "Coq_full_descriptor_undef":
                        return (follow({}));
                      case "Coq_full_descriptor_some":
                        var a = d.value;
                        switch (a.tag) {
                          case "Coq_attributes_data_of":
                            var ad = a.value;
                            switch (vthis.tag) {
                              case "Coq_value_prim":
                                var wthis = vthis.value;
                                return (
                                  out_error_or_void(s2, str,
                                    Coq_native_error_type()));
                              case "Coq_value_object":
                                var lthis = vthis.value;
                                var desc = {
                                  descriptor_value: Some(v),
                                  descriptor_writable: None(),
                                  descriptor_get: None(),
                                  descriptor_set: None(),
                                  descriptor_enumerable: None(),
                                  descriptor_configurable: None()
                                };
                                return (
                                  if_success(
                                    object_define_own_prop(s2, c, l, x, desc,
                                      str), function(s3, rv) {
                                      
                                      return (res_void(s3));}));
                            }
                            
                          case "Coq_attributes_accessor_of":
                            var a0 = a.value;
                            return (follow({}));
                        }
                        
                    }
                    }));
            } else {
              return (out_error_or_void(s1, str, Coq_native_error_type()));
            }}));
  }
  
};

var object_put = function (s, c, l, x, v, str) {
  return (
    if_some(run_object_method(object_put_, s, l), function(b) {
        
        return (
          object_put_complete(b, s, c, Coq_value_object(l), l, x, v, str));}));
};

var env_record_set_mutable_binding = function (s, c, l, x, v, str) {
  return (
    if_some(env_record_binds_pickable_option(s, l), function(e) {
        
        switch (e.tag) {
          case "Coq_env_record_decl":
            var ed = e.value;
            return (
              if_some(HeapStr.read_option(ed, x), function(rm) {
                  
                  var mu = rm[0], v_old = rm[1];
                  if (!(mutability_compare(mu, Coq_mutability_immutable()))) {
                    return (
                      res_void(env_record_write_decl_env(s, l, x, mu, v)));
                  } else {
                    return (
                      out_error_or_void(s, str, Coq_native_error_type()));
                  }}));
          case "Coq_env_record_object":
            var l0 = e.value, pt = e.provide_this;
            return (object_put(s, c, l0, x, v, str));
        }
        }));
};

var prim_value_put = function (s, c, w, x, v, str) {
  return (
    if_object(to_object(s, Coq_value_prim(w)), function(s1, l) {
        
        return (
          object_put_complete(Coq_builtin_put_default(), s1, c,
            Coq_value_prim(w), l, x, v, str));}));
};

var ref_put_value = function (s, c, rv, v) {
  switch (rv.tag) {
    case "Coq_resvalue_empty":
      return (
        function (s, m) {
            Debug.impossible_with_heap_because(__LOC__, s, m);
            return (Coq_result_impossible());}(s,
          "[ref_put_value] received an empty result."));
    case "Coq_resvalue_value":
      var v0 = rv.value;
      return (run_error(s, Coq_native_error_ref()));
    case "Coq_resvalue_ref":
      var r = rv.ref;
      if (ref_kind_comparable(ref_kind_of(r), Coq_ref_kind_undef())) {
        if (r.ref_strict) {
          return (run_error(s, Coq_native_error_ref()));
        } else {
          return (
            object_put(s, c, Coq_object_loc_prealloc(Coq_prealloc_global()),
              r.ref_name, v, throw_false));
        }
      } else {
        if ((ref_kind_comparable(ref_kind_of(r),
               Coq_ref_kind_primitive_base())
            || (ref_kind_comparable(ref_kind_of(r), Coq_ref_kind_null())
               || ref_kind_comparable(ref_kind_of(r), Coq_ref_kind_object())))) {
          var _switch_arg_14 = r.ref_base;
          switch (_switch_arg_14.tag) {
            case "Coq_ref_base_type_value":
              var v_2 = _switch_arg_14.value;
              if (ref_kind_comparable(ref_kind_of(r),
                    Coq_ref_kind_primitive_base())) {
                switch (v_2.tag) {
                  case "Coq_value_prim":
                    var w = v_2.value;
                    return (
                      prim_value_put(s, c, w, r.ref_name, v, r.ref_strict));
                  case "Coq_value_object":
                    var o = v_2.value;
                    return (
                      function (s, m) {
                          Debug.impossible_with_heap_because(__LOC__, s, m);
                          return (Coq_result_impossible());}(s,
                        "[ref_put_value] impossible case"));
                }
                
              } else {
                switch (v_2.tag) {
                  case "Coq_value_prim":
                    var p = v_2.value;
                    return (
                      function (s, m) {
                          Debug.impossible_with_heap_because(__LOC__, s, m);
                          return (Coq_result_impossible());}(s,
                        "[ref_put_value] impossible case"));
                  case "Coq_value_object":
                    var l = v_2.value;
                    return (
                      object_put(s, c, l, r.ref_name, v, r.ref_strict));
                }
                
              }
            case "Coq_ref_base_type_env_loc":
              var l = _switch_arg_14.value;
              return (
                function (s, m) {
                    Debug.impossible_with_heap_because(__LOC__, s, m);
                    return (Coq_result_impossible());}(s,
                  "[ref_put_value] contradicts ref_is_property"));
          }
          
        } else {
          var _switch_arg_13 = r.ref_base;
          switch (_switch_arg_13.tag) {
            case "Coq_ref_base_type_value":
              var v0 = _switch_arg_13.value;
              return (
                function (s, m) {
                    Debug.impossible_with_heap_because(__LOC__, s, m);
                    return (Coq_result_impossible());}(s,
                  "[ref_put_value] impossible spec"));
            case "Coq_ref_base_type_env_loc":
              var l = _switch_arg_13.value;
              return (
                env_record_set_mutable_binding(s, c, l, r.ref_name, v,
                  r.ref_strict));
          }
          
        }
      }
  }
  
};

var env_record_create_mutable_binding = function (s, c, l, x, deletable_opt) {
  var deletable = unsome_default(false, deletable_opt);
  return (
    if_some(env_record_binds_pickable_option(s, l), function(e) {
        
        switch (e.tag) {
          case "Coq_env_record_decl":
            var ed = e.value;
            if (HeapStr.indom_dec(ed, x)) {
              return (
                function (s, m) {
                    Debug.impossible_with_heap_because(__LOC__, s, m);
                    return (Coq_result_impossible());}(s,
                  "Already declared environnment record in [env_record_create_mutable_binding]."));
            } else {
              var s_2 = env_record_write_decl_env(s, l, x,
                          mutability_of_bool(deletable),
                          Coq_value_prim(Coq_prim_undef()));
              return (res_void(s_2));
            }
          case "Coq_env_record_object":
            var l0 = e.value, pt = e.provide_this;
            return (
              if_bool(object_has_prop(s, c, l0, x), function(s1, has) {
                  
                  if (has) {
                    return (
                      function (s, m) {
                          Debug.impossible_with_heap_because(__LOC__, s, m);
                          return (Coq_result_impossible());}(s1,
                        "Already declared binding in [env_record_create_mutable_binding]."));
                  } else {
                    var a = {
                      attributes_data_value: Coq_value_prim(Coq_prim_undef()),
                      attributes_data_writable: true,
                      attributes_data_enumerable: true,
                      attributes_data_configurable: deletable
                    };
                    return (
                      if_success(
                        object_define_own_prop(s1, c, l0, x,
                          descriptor_of_attributes(Coq_attributes_data_of(a)),
                          throw_true), function(s2, rv) {
                          
                          return (res_void(s2));}));
                  }}));
        }
        }));
};

var env_record_create_set_mutable_binding = function (s, c, l, x, deletable_opt, v, str) {
  return (
    if_void(env_record_create_mutable_binding(s, c, l, x, deletable_opt),
      function(s0) {
        
        return (env_record_set_mutable_binding(s0, c, l, x, v, str));}));
};

var env_record_create_immutable_binding = function (s, l, x) {
  return (
    if_some(env_record_binds_pickable_option(s, l), function(e) {
        
        switch (e.tag) {
          case "Coq_env_record_decl":
            var ed = e.value;
            if (HeapStr.indom_dec(ed, x)) {
              return (
                function (s, m) {
                    Debug.impossible_with_heap_because(__LOC__, s, m);
                    return (Coq_result_impossible());}(s,
                  "Already declared environnment record in [env_record_create_immutable_binding]."));
            } else {
              return (
                res_void(
                  env_record_write_decl_env(s, l, x,
                    Coq_mutability_uninitialized_immutable(),
                    Coq_value_prim(Coq_prim_undef()))));
            }
          case "Coq_env_record_object":
            var o = e.value, p = e.provide_this;
            return (
              function (s, m) {
                  Debug.impossible_with_heap_because(__LOC__, s, m);
                  return (Coq_result_impossible());}(s,
                "[env_record_create_immutable_binding] received an environnment record object."));
        }
        }));
};

var env_record_initialize_immutable_binding = function (s, l, x, v) {
  return (
    if_some(env_record_binds_pickable_option(s, l), function(e) {
        
        switch (e.tag) {
          case "Coq_env_record_decl":
            var ed = e.value;
            return (
              if_some(decl_env_record_pickable_option(ed, x), function(evs) {
                  
                  if (prod_compare(mutability_compare, value_compare, evs,
                        [Coq_mutability_uninitialized_immutable(), Coq_value_prim(
                                                                    Coq_prim_undef(
                                                                    ))])) {
                    var s_2 = env_record_write_decl_env(s, l, x,
                                Coq_mutability_immutable(), v);
                    return (res_void(s_2));
                  } else {
                    return (
                      function (s, m) {
                          Debug.impossible_with_heap_because(__LOC__, s, m);
                          return (Coq_result_impossible());}(s,
                        "Non suitable binding in [env_record_initialize_immutable_binding]."));
                  }}));
          case "Coq_env_record_object":
            var o = e.value, p = e.provide_this;
            return (
              function (s, m) {
                  Debug.impossible_with_heap_because(__LOC__, s, m);
                  return (Coq_result_impossible());}(s,
                "[env_record_initialize_immutable_binding] received an environnment record object."));
        }
        }));
};

var call_object_new = function (s, v) {
  var _switch_arg_15 = type_of(v);
  switch (_switch_arg_15.tag) {
    case "Coq_type_undef":
      return (
        result_out((function () {
            var o = object_new(
                      Coq_value_object(
                        Coq_object_loc_prealloc(Coq_prealloc_object_proto())),
                      "Object");
            var p = object_alloc(s, o);
            var l = p[0], s_2 = p[1];
            return (Coq_out_ter(s_2, res_val(Coq_value_object(l))));}())));
    case "Coq_type_null":
      return (
        result_out((function () {
            var o = object_new(
                      Coq_value_object(
                        Coq_object_loc_prealloc(Coq_prealloc_object_proto())),
                      "Object");
            var p = object_alloc(s, o);
            var l = p[0], s_2 = p[1];
            return (Coq_out_ter(s_2, res_val(Coq_value_object(l))));}())));
    case "Coq_type_bool":
      return (to_object(s, v));
    case "Coq_type_number":
      return (to_object(s, v));
    case "Coq_type_string":
      return (to_object(s, v));
    case "Coq_type_object":
      return (result_out(Coq_out_ter(s, res_val(v))));
  }
  
};

var array_args_map_loop = function (s, c, l, args, ind) {
  switch (args.tag) {
    case "[]":
      return (res_void(s));
    case "::":
      var h = args.head, rest = args.tail;
      return (
        if_some(
          object_heap_map_properties_pickable_option(s, l, function (p) {
              return (
                HeapStr.write(p, JsNumber.to_string(ind),
                  Coq_attributes_data_of(attributes_data_intro_all_true(h))));
            }), function(s_2) {
            
            return (array_args_map_loop(s_2, c, l, rest, (ind + 1.)));}));
  }
  
};

var string_of_prealloc = function (_foo_) {
  switch (_foo_.tag) {
    case "Coq_prealloc_global":
      return ("global");
    case "Coq_prealloc_global_eval":
      return ("global_eval");
    case "Coq_prealloc_global_parse_int":
      return ("global_parse_int");
    case "Coq_prealloc_global_parse_float":
      return ("global_parse_float");
    case "Coq_prealloc_global_is_finite":
      return ("global_is_finite");
    case "Coq_prealloc_global_is_nan":
      return ("global_is_nan");
    case "Coq_prealloc_global_decode_uri":
      return ("global_decode_uri");
    case "Coq_prealloc_global_decode_uri_component":
      return ("global_decode_uri_component");
    case "Coq_prealloc_global_encode_uri":
      return ("global_encode_uri");
    case "Coq_prealloc_global_encode_uri_component":
      return ("global_encode_uri_component");
    case "Coq_prealloc_object":
      return ("object");
    case "Coq_prealloc_object_get_proto_of":
      return ("object_get_proto_of");
    case "Coq_prealloc_object_get_own_prop_descriptor":
      return ("object_get_own_prop_descriptor");
    case "Coq_prealloc_object_get_own_prop_name":
      return ("object_get_own_prop_name");
    case "Coq_prealloc_object_create":
      return ("object_create");
    case "Coq_prealloc_object_define_prop":
      return ("object_define_prop");
    case "Coq_prealloc_object_define_props":
      return ("object_define_props");
    case "Coq_prealloc_object_seal":
      return ("object_seal");
    case "Coq_prealloc_object_freeze":
      return ("object_freeze");
    case "Coq_prealloc_object_prevent_extensions":
      return ("object_prevent_extensions");
    case "Coq_prealloc_object_is_sealed":
      return ("object_is_sealed");
    case "Coq_prealloc_object_is_frozen":
      return ("object_is_frozen");
    case "Coq_prealloc_object_is_extensible":
      return ("object_is_extensible");
    case "Coq_prealloc_object_keys":
      return ("object_keys");
    case "Coq_prealloc_object_keys_call":
      return ("object_keys_call");
    case "Coq_prealloc_object_proto":
      return ("object_proto_");
    case "Coq_prealloc_object_proto_to_string":
      return ("object_proto_to_string");
    case "Coq_prealloc_object_proto_value_of":
      return ("object_proto_value_of");
    case "Coq_prealloc_object_proto_has_own_prop":
      return ("object_proto_has_own_prop");
    case "Coq_prealloc_object_proto_is_prototype_of":
      return ("object_proto_is_prototype_of");
    case "Coq_prealloc_object_proto_prop_is_enumerable":
      return ("object_proto_prop_is_enumerable");
    case "Coq_prealloc_function":
      return ("function");
    case "Coq_prealloc_function_proto":
      return ("function_proto");
    case "Coq_prealloc_function_proto_to_string":
      return ("function_proto_to_string");
    case "Coq_prealloc_function_proto_apply":
      return ("function_proto_apply");
    case "Coq_prealloc_function_proto_call":
      return ("function_proto_call");
    case "Coq_prealloc_function_proto_bind":
      return ("function_proto_bind");
    case "Coq_prealloc_bool":
      return ("bool");
    case "Coq_prealloc_bool_proto":
      return ("bool_proto");
    case "Coq_prealloc_bool_proto_to_string":
      return ("bool_proto_to_string");
    case "Coq_prealloc_bool_proto_value_of":
      return ("bool_proto_value_of");
    case "Coq_prealloc_number":
      return ("number");
    case "Coq_prealloc_number_proto":
      return ("number_proto");
    case "Coq_prealloc_number_proto_to_string":
      return ("number_proto_to_string");
    case "Coq_prealloc_number_proto_value_of":
      return ("number_proto_value_of");
    case "Coq_prealloc_number_proto_to_fixed":
      return ("number_proto_to_fixed");
    case "Coq_prealloc_number_proto_to_exponential":
      return ("number_proto_to_exponential");
    case "Coq_prealloc_number_proto_to_precision":
      return ("number_proto_to_precision");
    case "Coq_prealloc_array":
      return ("array");
    case "Coq_prealloc_array_is_array":
      return ("array_is_array");
    case "Coq_prealloc_array_proto":
      return ("array_proto");
    case "Coq_prealloc_array_proto_to_string":
      return ("array_proto_to_string");
    case "Coq_prealloc_array_proto_join":
      return ("array_proto_join");
    case "Coq_prealloc_array_proto_pop":
      return ("array_proto_pop");
    case "Coq_prealloc_array_proto_push":
      return ("array_proto_push");
    case "Coq_prealloc_string":
      return ("string");
    case "Coq_prealloc_string_proto":
      return ("string_proto");
    case "Coq_prealloc_string_proto_to_string":
      return ("string_proto_to_string");
    case "Coq_prealloc_string_proto_value_of":
      return ("string_proto_value_of");
    case "Coq_prealloc_string_proto_char_at":
      return ("string_proto_char_at");
    case "Coq_prealloc_string_proto_char_code_at":
      return ("string_proto_char_code_at");
    case "Coq_prealloc_math":
      return ("math");
    case "Coq_prealloc_mathop":
      var m = _foo_.mathop;
      return ("mathop");
    case "Coq_prealloc_date":
      return ("date");
    case "Coq_prealloc_regexp":
      return ("regexp");
    case "Coq_prealloc_error":
      return ("error");
    case "Coq_prealloc_error_proto":
      return ("error_proto");
    case "Coq_prealloc_native_error":
      var n = _foo_.error;
      return ("native_error");
    case "Coq_prealloc_native_error_proto":
      var n = _foo_.error;
      return ("native_error_proto");
    case "Coq_prealloc_error_proto_to_string":
      return ("error_proto_to_string");
    case "Coq_prealloc_throw_type_error":
      return ("throw_type_error");
    case "Coq_prealloc_json":
      return ("json");
  }
  
};

var run_construct_prealloc = function (s, c, b, args) {
  switch (b.tag) {
    case "Coq_prealloc_object":
      var v = get_arg(0, args);
      return (call_object_new(s, v));
    case "Coq_prealloc_bool":
      return (
        result_out((function () {
            var v = get_arg(0, args);
            var b0 = convert_value_to_boolean(v);
            var o1 = object_new(
                       Coq_value_object(
                         Coq_object_loc_prealloc(Coq_prealloc_bool_proto())),
                       "Boolean");
            var o = object_with_primitive_value(o1,
                      Coq_value_prim(Coq_prim_bool(b0)));
            var p = object_alloc(s, o);
            var l = p[0], s_2 = p[1];
            return (Coq_out_ter(s_2, res_val(Coq_value_object(l))));}())));
    case "Coq_prealloc_number":
      var follow = function (s_2, v) {
        var o1 = object_new(
                   Coq_value_object(
                     Coq_object_loc_prealloc(Coq_prealloc_number_proto())),
                   "Number");
        var o = object_with_primitive_value(o1, v);
        var _tuple_arg_16 = object_alloc(s_2, o);
        var l = _tuple_arg_16[0], s1 = _tuple_arg_16[1];
        return (result_out(Coq_out_ter(s1, res_val(Coq_value_object(l)))));
      };
      if (list_eq_nil_decidable(args)) {
        return (follow(s, Coq_value_prim(Coq_prim_number(JsNumber.zero))));
      } else {
        var v = get_arg(0, args);
        return (
          if_number(to_number(s, c, v), function(x, x0) {
              
              return (follow(x, Coq_value_prim(Coq_prim_number(x0))));}));
      }
    case "Coq_prealloc_array":
      var o_2 = object_new(
                  Coq_value_object(
                    Coq_object_loc_prealloc(Coq_prealloc_array_proto())),
                  "Array");
      var o = object_for_array(o_2, Coq_builtin_define_own_prop_array());
      var p = object_alloc(s, o);
      var l = p[0], s_2 = p[1];
      var follow = function (s_3, length0) {
        return (
          if_some(
            object_heap_map_properties_pickable_option(s_3, l,
              function (p0) {
                return (
                  HeapStr.write(p0, "length",
                    Coq_attributes_data_of({
                        attributes_data_value: Coq_value_prim(
                                                 Coq_prim_number(length0)),
                        attributes_data_writable: true,
                        attributes_data_enumerable: false,
                        attributes_data_configurable: false})));}),
            function(s0) {
              
              return (res_ter(s0, res_val(Coq_value_object(l))));}));
      };
      var arg_len = LibList.length(args);
      if (nat_eq(arg_len, 1)) {
        var v = get_arg(0, args);
        switch (v.tag) {
          case "Coq_value_prim":
            var p0 = v.value;
            switch (p0.tag) {
              case "Coq_prim_undef":
                return (
                  if_some(
                    object_heap_map_properties_pickable_option(s_2, l,
                      function (p1) {
                        return (
                          HeapStr.write(p1, "0",
                            Coq_attributes_data_of(
                              attributes_data_intro_all_true(v))));}),
                    function(s0) { 
                                   return (follow(s0, 1.0));}));
              case "Coq_prim_null":
                return (
                  if_some(
                    object_heap_map_properties_pickable_option(s_2, l,
                      function (p1) {
                        return (
                          HeapStr.write(p1, "0",
                            Coq_attributes_data_of(
                              attributes_data_intro_all_true(v))));}),
                    function(s0) { 
                                   return (follow(s0, 1.0));}));
              case "Coq_prim_bool":
                var b0 = p0.value;
                return (
                  if_some(
                    object_heap_map_properties_pickable_option(s_2, l,
                      function (p1) {
                        return (
                          HeapStr.write(p1, "0",
                            Coq_attributes_data_of(
                              attributes_data_intro_all_true(v))));}),
                    function(s0) { 
                                   return (follow(s0, 1.0));}));
              case "Coq_prim_number":
                var vlen = p0.value;
                return (
                  if_run(
                    to_uint32(s_2, c, Coq_value_prim(Coq_prim_number(vlen))),
                    function(s0, ilen) {
                      
                      if ((ilen === vlen)) {
                        return (follow(s0, ilen));
                      } else {
                        return (run_error(s0, Coq_native_error_range()));
                      }}));
              case "Coq_prim_string":
                var s0 = p0.value;
                return (
                  if_some(
                    object_heap_map_properties_pickable_option(s_2, l,
                      function (p1) {
                        return (
                          HeapStr.write(p1, "0",
                            Coq_attributes_data_of(
                              attributes_data_intro_all_true(v))));}),
                    function(s1) { 
                                   return (follow(s1, 1.0));}));
            }
            
          case "Coq_value_object":
            var o0 = v.value;
            return (
              if_some(
                object_heap_map_properties_pickable_option(s_2, l,
                  function (p0) {
                    return (
                      HeapStr.write(p0, "0",
                        Coq_attributes_data_of(
                          attributes_data_intro_all_true(v))));}),
                function(s0) { 
                               return (follow(s0, 1.0));}));
        }
        
      } else {
        return (
          if_some(
            object_heap_map_properties_pickable_option(s_2, l,
              function (p0) {
                return (
                  HeapStr.write(p0, "length",
                    Coq_attributes_data_of({
                        attributes_data_value: Coq_value_prim(
                                                 Coq_prim_number(
                                                   number_of_int(arg_len))),
                        attributes_data_writable: true,
                        attributes_data_enumerable: false,
                        attributes_data_configurable: false})));}),
            function(s0) {
              
              return (
                if_void(array_args_map_loop(s0, c, l, args, 0.),
                  function(s1) {
                    
                    return (res_ter(s1, res_val(Coq_value_object(l))));}));}));
      }
    case "Coq_prealloc_string":
      var o2 = object_new(
                 Coq_value_object(
                   Coq_object_loc_prealloc(Coq_prealloc_string_proto())),
                 "String");
      var o1 = object_with_get_own_property(o2,
                 Coq_builtin_get_own_prop_string());
      var follow = function (s0, s1) {
        var o = object_with_primitive_value(o1,
                  Coq_value_prim(Coq_prim_string(s1)));
        var _tuple_arg_17 = object_alloc(s0, o);
        var l = _tuple_arg_17[0], s2 = _tuple_arg_17[1];
        var lenDesc = attributes_data_intro_constant(
                        Coq_value_prim(
                          Coq_prim_number(number_of_int(strlength(s1)))));
        return (
          if_some(
            object_heap_map_properties_pickable_option(s2, l, function (p) {
                return (
                  HeapStr.write(p, "length", Coq_attributes_data_of(lenDesc)));
              }), function(s_2) {
              
              return (res_ter(s_2, res_val(Coq_value_object(l))));}));
      };
      var arg_len = LibList.length(args);
      if (nat_eq(arg_len, 0)) {
        return (follow(s, ""));
      } else {
        var arg = get_arg(0, args);
        return (
          if_string(to_string(s, c, arg), function(s0, s1) {
              
              return (follow(s0, s1));}));
      }
    case "Coq_prealloc_error":
      var v = get_arg(0, args);
      return (
        build_error(s,
          Coq_value_object(
            Coq_object_loc_prealloc(Coq_prealloc_error_proto())), v));
    case "Coq_prealloc_native_error":
      var ne = b.error;
      var v = get_arg(0, args);
      return (
        build_error(s,
          Coq_value_object(
            Coq_object_loc_prealloc(Coq_prealloc_native_error_proto(ne))), v));
    default:
      return (
        function (s) {
            Debug.not_yet_implemented_because(__LOC__, s);
            return (Coq_result_impossible());}(
          strappend("Construct prealloc_",
            strappend(string_of_prealloc(b), " not yet implemented."))));
  }
  
};

var run_construct_default = function (s, c, l, args) {
  return (
    if_value(run_object_get(s, c, l, "prototype"), function(s1, v1) {
        
        if (type_compare(type_of(v1), Coq_type_object())) {
          var vproto = v1;
        } else {
          var vproto = Coq_value_object(
                         Coq_object_loc_prealloc(Coq_prealloc_object_proto()));
        }
        var o = object_new(vproto, "Object");
        var p = object_alloc(s1, o);
        var l_2 = p[0], s2 = p[1];
        return (
          if_value(run_call(s2, c, l, Coq_value_object(l_2), args),
            function(s3, v2) {
              
              if (type_compare(type_of(v2), Coq_type_object())) {
                var vr = v2;
              } else {
                var vr = Coq_value_object(l_2);
              }
              return (res_ter(s3, res_val(vr)));}));}));
};

var run_construct = function (s, c, co, l, args) {
  switch (co.tag) {
    case "Coq_construct_default":
      return (run_construct_default(s, c, l, args));
    case "Coq_construct_after_bind":
      return (
        if_some(run_object_method(object_target_function_, s, l),
          function(otrg) {
            
            return (
              if_some(otrg, function(target) {
                  
                  return (
                    if_some(run_object_method(object_construct_, s, target),
                      function(oco) {
                        
                        switch (oco.tag) {
                          case "Some":
                            var co0 = oco.value;
                            return (
                              if_some(
                                run_object_method(object_bound_args_, s, l),
                                function(oarg) {
                                  
                                  return (
                                    if_some(oarg, function(boundArgs) {
                                        
                                        var arguments_ = LibList.append(
                                                           boundArgs, args);
                                        return (
                                          run_construct(s, c, co0, target,
                                            arguments_));}));}));
                          case "None":
                            return (run_error(s, Coq_native_error_type()));
                        }
                        }));}));}));
    case "Coq_construct_prealloc":
      var b = co.prealloc;
      return (run_construct_prealloc(s, c, b, args));
  }
  
};

var run_call_default = function (s, c, lf) {
  var def = result_out(
              Coq_out_ter(s, res_val(Coq_value_prim(Coq_prim_undef()))));
  return (
    if_some(run_object_method(object_code_, s, lf), function(oC) {
        
        switch (oC.tag) {
          case "Some":
            var bd = oC.value;
            if (list_eq_nil_decidable(prog_elements(funcbody_prog(bd)))) {
              return (def);
            } else {
              return (
                ifx_success_or_return(run_prog(s, c, funcbody_prog(bd)),
                  function (s_2) {
                    return (
                      result_out(
                        Coq_out_ter(s_2,
                          res_val(Coq_value_prim(Coq_prim_undef())))));},
                  function (s_2, rv) {
                    return (result_out(Coq_out_ter(s_2, res_normal(rv))));}));
            }
          case "None":
            return (def);
        }
        }));
};

var creating_function_object_proto = function (s, c, l) {
  return (
    if_object(run_construct_prealloc(s, c, Coq_prealloc_object(), mk_nil()),
      function(s1, lproto) {
        
        var a1 = {
          attributes_data_value: Coq_value_object(l),
          attributes_data_writable: true,
          attributes_data_enumerable: false,
          attributes_data_configurable: true
        };
        return (
          if_bool(
            object_define_own_prop(s1, c, lproto, "constructor",
              descriptor_of_attributes(Coq_attributes_data_of(a1)), false),
            function(s2, b) {
              
              var a2 = {
                attributes_data_value: Coq_value_object(lproto),
                attributes_data_writable: true,
                attributes_data_enumerable: false,
                attributes_data_configurable: false
              };
              return (
                object_define_own_prop(s2, c, l, "prototype",
                  descriptor_of_attributes(Coq_attributes_data_of(a2)),
                  false));}));}));
};

var creating_function_object = function (s, c, names, bd, x, str) {
  var o = object_new(
            Coq_value_object(
              Coq_object_loc_prealloc(Coq_prealloc_function_proto())),
            "Function");
  var o1 = object_with_get(o, Coq_builtin_get_function());
  var o2 = object_with_invokation(o1, Some(Coq_construct_default()),
             Some(Coq_call_default()),
             Some(Coq_builtin_has_instance_function()));
  var o3 = object_with_details(o2, Some(x), Some(names), Some(bd), None(),
             None(), None(), None());
  var p = object_alloc(s, o3);
  var l = p[0], s1 = p[1];
  var a1 = {
    attributes_data_value: Coq_value_prim(
                             Coq_prim_number(
                               number_of_int(LibList.length(names)))),
    attributes_data_writable: false,
    attributes_data_enumerable: false,
    attributes_data_configurable: false
  };
  return (
    if_bool(
      object_define_own_prop(s1, c, l, "length",
        descriptor_of_attributes(Coq_attributes_data_of(a1)), false),
      function(s2, b2) {
        
        return (
          if_bool(creating_function_object_proto(s2, c, l), function(s3,
            b3) {
              
              if (!(str)) {
                return (res_ter(s3, res_val(Coq_value_object(l))));
              } else {
                var vthrower = Coq_value_object(
                                 Coq_object_loc_prealloc(
                                   Coq_prealloc_throw_type_error()));
                var a2 = {
                  attributes_accessor_get: vthrower,
                  attributes_accessor_set: vthrower,
                  attributes_accessor_enumerable: false,
                  attributes_accessor_configurable: false
                };
                return (
                  if_bool(
                    object_define_own_prop(s3, c, l, "caller",
                      descriptor_of_attributes(
                        Coq_attributes_accessor_of(a2)), false), function(s4,
                    b4) {
                      
                      return (
                        if_bool(
                          object_define_own_prop(s4, c, l, "arguments",
                            descriptor_of_attributes(
                              Coq_attributes_accessor_of(a2)), false),
                          function(s5, b5) {
                            
                            return (
                              res_ter(s5, res_val(Coq_value_object(l))));}));
                    }));
              }}));}));
};

var binding_inst_formal_params = function (s, c, l, args, names, str) {
  switch (names.tag) {
    case "[]":
      return (res_void(s));
    case "::":
      var argname = names.head, names_2 = names.tail;
      var v = hd(Coq_value_prim(Coq_prim_undef()), args);
      var args_2 = tl(args);
      return (
        if_bool(env_record_has_binding(s, c, l, argname), function(s1, hb) {
            
            var follow = function (s_2) {
              return (
                if_void(
                  env_record_set_mutable_binding(s_2, c, l, argname, v, str),
                  function(s_3) {
                    
                    return (
                      binding_inst_formal_params(s_3, c, l, args_2, names_2,
                        str));}));
            };
            if (hb) {
              return (follow(s1));
            } else {
              return (
                if_void(
                  env_record_create_mutable_binding(s1, c, l, argname,
                    None()), function(s2) { 
                                            return (follow(s2));}));
            }}));
  }
  
};

var binding_inst_function_decls = function (s, c, l, fds, str, bconfig) {
  switch (fds.tag) {
    case "[]":
      return (res_void(s));
    case "::":
      var fd = fds.head, fds_2 = fds.tail;
      var fbd = fd.funcdecl_body;
      var str_fd = funcbody_is_strict(fbd);
      var fparams = fd.funcdecl_parameters;
      var fname = fd.funcdecl_name;
      return (
        if_object(
          creating_function_object(s, c, fparams, fbd,
            c.execution_ctx_variable_env, str_fd), function(s1, fo) {
            
            var follow = function (s2) {
              return (
                if_void(
                  env_record_set_mutable_binding(s2, c, l, fname,
                    Coq_value_object(fo), str), function(s3) {
                    
                    return (
                      binding_inst_function_decls(s3, c, l, fds_2, str,
                        bconfig));}));
            };
            return (
              if_bool(env_record_has_binding(s1, c, l, fname), function(s2,
                has) {
                  
                  if (has) {
                    if (nat_eq(l, env_loc_global_env_record)) {
                      return (
                        if_run(
                          run_object_get_prop(s2, c,
                            Coq_object_loc_prealloc(Coq_prealloc_global()),
                            fname), function(s3, d) {
                            
                            switch (d.tag) {
                              case "Coq_full_descriptor_undef":
                                return (
                                  function (s, m) {
                                      Debug.impossible_with_heap_because(
                                        __LOC__, s, m);
                                      return (Coq_result_impossible());}(s3,
                                    "Undefined full descriptor in [binding_inst_function_decls]."));
                              case "Coq_full_descriptor_some":
                                var a = d.value;
                                if (attributes_configurable(a)) {
                                  var a_2 = {
                                    attributes_data_value: Coq_value_prim(
                                                             Coq_prim_undef()),
                                    attributes_data_writable: true,
                                    attributes_data_enumerable: true,
                                    attributes_data_configurable: bconfig
                                  };
                                  return (
                                    if_bool(
                                      object_define_own_prop(s3, c,
                                        Coq_object_loc_prealloc(
                                          Coq_prealloc_global()), fname,
                                        descriptor_of_attributes(
                                          Coq_attributes_data_of(a_2)), true),
                                      function(s0, x) { 
                                                        return (follow(s0));
                                      }));
                                } else {
                                  if ((descriptor_is_accessor_dec(
                                         descriptor_of_attributes(a))
                                      || (!(attributes_writable(a))
                                         || !(attributes_enumerable(a))))) {
                                    return (
                                      run_error(s3, Coq_native_error_type()));
                                  } else {
                                    return (follow(s3));
                                  }
                                }
                            }
                            }));
                    } else {
                      return (follow(s2));
                    }
                  } else {
                    return (
                      if_void(
                        env_record_create_mutable_binding(s2, c, l, fname,
                          Some(bconfig)), function(s3) { 
                                                         return (follow(s3));
                        }));
                  }}));}));
  }
  
};

var make_arg_getter = function (s, c, x, x0) {
  var xbd = strappend("return ", strappend(x, ";"));
  var bd = Coq_funcbody_intro(
             Coq_prog_intro(true,
               mk_cons(
                 Coq_element_stat(
                   Coq_stat_return(Some(Coq_expr_identifier(x)))), mk_nil())),
             xbd);
  return (creating_function_object(s, c, mk_nil(), bd, x0, true));
};

var make_arg_setter = function (s, c, x, x0) {
  var xparam = strappend(x, "_arg");
  var xbd = strappend(x, strappend(" = ", strappend(xparam, ";")));
  var bd = Coq_funcbody_intro(
             Coq_prog_intro(true,
               mk_cons(
                 Coq_element_stat(
                   Coq_stat_expr(
                     Coq_expr_assign(Coq_expr_identifier(x), None(),
                       Coq_expr_identifier(xparam)))), mk_nil())), xbd);
  return (
    creating_function_object(s, c, mk_cons(xparam, mk_nil()), bd, x0, true));
};

var arguments_object_map_loop = function (s, c, l, xs, len, args, x, str, lmap, xsmap) {
  return (
    function (fO, fS, n) {
        if (int_eq(n, 0)) {
          return (fO({}));
        } else {
          return (fS((n - 1)));
        }}(function (_pat_any_18) {
        if (list_eq_nil_decidable(xsmap)) {
          return (res_void(s));
        } else {
          return (
            if_some(object_binds_pickable_option(s, l), function(o) {
                
                var o_2 = object_for_args_object(o, lmap,
                            Coq_builtin_get_args_obj(),
                            Coq_builtin_get_own_prop_args_obj(),
                            Coq_builtin_define_own_prop_args_obj(),
                            Coq_builtin_delete_args_obj());
                return (res_void(object_write(s, l, o_2)));}));
        }}, function (len_2) {
        var tdl = take_drop_last(args);
        var rmlargs = tdl[0], largs = tdl[1];
        var arguments_object_map_loop_2 = function (s0, xsmap0) {
          return (
            arguments_object_map_loop(s0, c, l, xs, len_2, rmlargs, x, str,
              lmap, xsmap0));
        };
        var a = attributes_data_intro_all_true(largs);
        return (
          if_bool(
            object_define_own_prop(s, c, l,
              convert_prim_to_string(Coq_prim_number(number_of_int(len_2))),
              descriptor_of_attributes(Coq_attributes_data_of(a)), false),
            function(s1, b) {
              
              if (ge_nat_decidable(len_2, LibList.length(xs))) {
                return (arguments_object_map_loop_2(s1, xsmap));
              } else {
                var dummy = "";
                var x0 = nth_def(dummy, len_2, xs);
                if ((str || mem_decide(string_eq, x0, xsmap))) {
                  return (arguments_object_map_loop_2(s1, xsmap));
                } else {
                  return (
                    if_object(make_arg_getter(s1, c, x0, x), function(s2,
                      lgetter) {
                        
                        return (
                          if_object(make_arg_setter(s2, c, x0, x),
                            function(s3, lsetter) {
                              
                              var a_2 = {
                                attributes_accessor_get: Coq_value_object(
                                                           lgetter),
                                attributes_accessor_set: Coq_value_object(
                                                           lsetter),
                                attributes_accessor_enumerable: false,
                                attributes_accessor_configurable: true
                              };
                              return (
                                if_bool(
                                  object_define_own_prop(s3, c, lmap,
                                    convert_prim_to_string(
                                      Coq_prim_number(number_of_int(len_2))),
                                    descriptor_of_attributes(
                                      Coq_attributes_accessor_of(a_2)),
                                    false), function(s4, b_2) {
                                    
                                    return (
                                      arguments_object_map_loop_2(s4,
                                        mk_cons(x0, xsmap)));}));}));}));
                }
              }}));}, len));
};

var arguments_object_map = function (s, c, l, xs, args, x, str) {
  return (
    if_object(run_construct_prealloc(s, c, Coq_prealloc_object(), mk_nil()),
      function(s_2, lmap) {
        
        return (
          arguments_object_map_loop(s_2, c, l, xs, LibList.length(args),
            args, x, str, lmap, mk_nil()));}));
};

var create_arguments_object = function (s, c, lf, xs, args, x, str) {
  var o = object_create_builtin(
            Coq_value_object(
              Coq_object_loc_prealloc(Coq_prealloc_object_proto())),
            "Arguments", Heap.empty);
  var p = object_alloc(s, o);
  var l = p[0], s_2 = p[1];
  var a = {
    attributes_data_value: Coq_value_prim(
                             Coq_prim_number(
                               number_of_int(LibList.length(args)))),
    attributes_data_writable: true,
    attributes_data_enumerable: false,
    attributes_data_configurable: true
  };
  return (
    if_bool(
      object_define_own_prop(s_2, c, l, "length",
        descriptor_of_attributes(Coq_attributes_data_of(a)), false),
      function(s1, b) {
        
        return (
          if_void(arguments_object_map(s1, c, l, xs, args, x, str),
            function(s2) {
              
              if (str) {
                var vthrower = Coq_value_object(
                                 Coq_object_loc_prealloc(
                                   Coq_prealloc_throw_type_error()));
                var a0 = {
                  attributes_accessor_get: vthrower,
                  attributes_accessor_set: vthrower,
                  attributes_accessor_enumerable: false,
                  attributes_accessor_configurable: false
                };
                return (
                  if_bool(
                    object_define_own_prop(s2, c, l, "caller",
                      descriptor_of_attributes(
                        Coq_attributes_accessor_of(a0)), false), function(s3,
                    b_2) {
                      
                      return (
                        if_bool(
                          object_define_own_prop(s3, c, l, "callee",
                            descriptor_of_attributes(
                              Coq_attributes_accessor_of(a0)), false),
                          function(s4, b_3) {
                            
                            return (
                              res_ter(s4, res_val(Coq_value_object(l))));}));
                    }));
              } else {
                var a0 = {
                  attributes_data_value: Coq_value_object(lf),
                  attributes_data_writable: true,
                  attributes_data_enumerable: false,
                  attributes_data_configurable: true
                };
                return (
                  if_bool(
                    object_define_own_prop(s2, c, l, "callee",
                      descriptor_of_attributes(Coq_attributes_data_of(a0)),
                      false), function(s3, b_2) {
                      
                      return (res_ter(s3, res_val(Coq_value_object(l))));}));
              }}));}));
};

var binding_inst_arg_obj = function (s, c, lf, p, xs, args, l) {
  var arguments_ = "arguments";
  var str = prog_intro_strictness(p);
  return (
    if_object(
      create_arguments_object(s, c, lf, xs, args,
        c.execution_ctx_variable_env, str), function(s1, largs) {
        
        if (str) {
          return (
            if_void(env_record_create_immutable_binding(s1, l, arguments_),
              function(s2) {
                
                return (
                  env_record_initialize_immutable_binding(s2, l, arguments_,
                    Coq_value_object(largs)));}));
        } else {
          return (
            env_record_create_set_mutable_binding(s1, c, l, arguments_,
              None(), Coq_value_object(largs), false));
        }}));
};

var binding_inst_var_decls = function (s, c, l, vds, bconfig, str) {
  switch (vds.tag) {
    case "[]":
      return (res_void(s));
    case "::":
      var vd = vds.head, vds_2 = vds.tail;
      var bivd = function (s0) {
        return (binding_inst_var_decls(s0, c, l, vds_2, bconfig, str));
      };
      return (
        if_bool(env_record_has_binding(s, c, l, vd), function(s1, has) {
            
            if (has) {
              return (bivd(s1));
            } else {
              return (
                if_void(
                  env_record_create_set_mutable_binding(s1, c, l, vd,
                    Some(bconfig), Coq_value_prim(Coq_prim_undef()), str),
                  function(s2) { 
                                 return (bivd(s2));}));
            }}));
  }
  
};

var execution_ctx_binding_inst = function (s, c, ct, funco, p, args) {
  var _switch_arg_19 = c.execution_ctx_variable_env;
  switch (_switch_arg_19.tag) {
    case "[]":
      return (
        function (s, m) {
            Debug.impossible_with_heap_because(__LOC__, s, m);
            return (Coq_result_impossible());}(s,
          "Empty [execution_ctx_variable_env] in [execution_ctx_binding_inst]."));
    case "::":
      var l = _switch_arg_19.head, l0 = _switch_arg_19.tail;
      var str = prog_intro_strictness(p);
      var follow = function (s_2, names) {
        var bconfig = codetype_compare(ct, Coq_codetype_eval());
        var fds = prog_funcdecl(p);
        return (
          if_void(binding_inst_function_decls(s_2, c, l, fds, str, bconfig),
            function(s1) {
              
              return (
                if_bool(env_record_has_binding(s1, c, l, "arguments"),
                  function(s2, bdefined) {
                    
                    var follow2 = function (s10) {
                      var vds = prog_vardecl(p);
                      return (
                        binding_inst_var_decls(s10, c, l, vds, bconfig, str));
                    };
                    switch (ct.tag) {
                      case "Coq_codetype_func":
                        switch (funco.tag) {
                          case "Some":
                            var func = funco.value;
                            if (bdefined) {
                              return (follow2(s2));
                            } else {
                              return (
                                if_void(
                                  binding_inst_arg_obj(s2, c, func, p, names,
                                    args, l), function(s3) {
                                    
                                    return (follow2(s3));}));
                            }
                          case "None":
                            if (bdefined) {
                              return (follow2(s2));
                            } else {
                              return (
                                function (s, m) {
                                    Debug.impossible_with_heap_because(
                                      __LOC__, s, m);
                                    return (Coq_result_impossible());}(s2,
                                  "Weird `arguments' object in [execution_ctx_binding_inst]."));
                            }
                        }
                        
                      case "Coq_codetype_global":
                        return (follow2(s2));
                      case "Coq_codetype_eval":
                        return (follow2(s2));
                    }
                    }));}));
      };
      switch (ct.tag) {
        case "Coq_codetype_func":
          switch (funco.tag) {
            case "Some":
              var func = funco.value;
              return (
                if_some(
                  run_object_method(object_formal_parameters_, s, func),
                  function(nameso) {
                    
                    return (
                      if_some(nameso, function(names) {
                          
                          return (
                            if_void(
                              binding_inst_formal_params(s, c, l, args,
                                names, str), function(s_2) {
                                
                                return (follow(s_2, names));}));}));}));
            case "None":
              return (
                function (s, m) {
                    Debug.impossible_with_heap_because(__LOC__, s, m);
                    return (Coq_result_impossible());}(s,
                  "Non coherent functionnal code type in [execution_ctx_binding_inst]."));
          }
          
        case "Coq_codetype_global":
          switch (funco.tag) {
            case "Some":
              var o = funco.value;
              return (
                function (s, m) {
                    Debug.impossible_with_heap_because(__LOC__, s, m);
                    return (Coq_result_impossible());}(s,
                  "Non coherent non-functionnal code type in [execution_ctx_binding_inst]."));
            case "None":
              return (follow(s, mk_nil()));
          }
          
        case "Coq_codetype_eval":
          switch (funco.tag) {
            case "Some":
              var o = funco.value;
              return (
                function (s, m) {
                    Debug.impossible_with_heap_because(__LOC__, s, m);
                    return (Coq_result_impossible());}(s,
                  "Non coherent non-functionnal code type in [execution_ctx_binding_inst]."));
            case "None":
              return (follow(s, mk_nil()));
          }
          
      }
      
  }
  
};

var entering_func_code = function (s, c, lf, vthis, args) {
  return (
    if_some(run_object_method(object_code_, s, lf), function(bdo) {
        
        return (
          if_some(bdo, function(bd) {
              
              var str = funcbody_is_strict(bd);
              var follow = function (s_2, vthis_2) {
                return (
                  if_some(run_object_method(object_scope_, s_2, lf),
                    function(lexo) {
                      
                      return (
                        if_some(lexo, function(lex) {
                            
                            var p = lexical_env_alloc_decl(s_2, lex);
                            var lex_2 = p[0], s1 = p[1];
                            var c_2 = execution_ctx_intro_same(lex_2,
                                        vthis_2, str);
                            return (
                              if_void(
                                execution_ctx_binding_inst(s1, c_2,
                                  Coq_codetype_func(), Some(lf),
                                  funcbody_prog(bd), args), function(s2) {
                                  
                                  return (run_call_default(s2, c_2, lf));}));
                          }));}));
              };
              if (str) {
                return (follow(s, vthis));
              } else {
                switch (vthis.tag) {
                  case "Coq_value_prim":
                    var p = vthis.value;
                    switch (p.tag) {
                      case "Coq_prim_undef":
                        return (
                          follow(s,
                            Coq_value_object(
                              Coq_object_loc_prealloc(Coq_prealloc_global()))));
                      case "Coq_prim_null":
                        return (
                          follow(s,
                            Coq_value_object(
                              Coq_object_loc_prealloc(Coq_prealloc_global()))));
                      case "Coq_prim_bool":
                        var b = p.value;
                        return (
                          if_value(to_object(s, vthis), function(s2, v) {
                              
                              return (follow(s2, v));}));
                      case "Coq_prim_number":
                        var n = p.value;
                        return (
                          if_value(to_object(s, vthis), function(s2, v) {
                              
                              return (follow(s2, v));}));
                      case "Coq_prim_string":
                        var s0 = p.value;
                        return (
                          if_value(to_object(s, vthis), function(s2, v) {
                              
                              return (follow(s2, v));}));
                    }
                    
                  case "Coq_value_object":
                    var lthis = vthis.value;
                    return (follow(s, vthis));
                }
                
              }}));}));
};

var run_object_get_own_prop = function (s, c, l, x) {
  return (
    if_some(run_object_method(object_get_own_prop_, s, l), function(b) {
        
        var def = function (s_2) {
          return (
            if_some(run_object_method(object_properties_, s_2, l),
              function(p) {
                
                return (
                  res_spec(s_2,
                    ifx_some_or_default(
                      convert_option_attributes(HeapStr.read_option(p, x)),
                      Coq_full_descriptor_undef(), function (x) { return (x);
                      })));}));
        };
        switch (b.tag) {
          case "Coq_builtin_get_own_prop_default":
            return (def(s));
          case "Coq_builtin_get_own_prop_args_obj":
            return (
              if_run(def(s), function(s1, d) {
                  
                  switch (d.tag) {
                    case "Coq_full_descriptor_undef":
                      return (res_spec(s1, Coq_full_descriptor_undef()));
                    case "Coq_full_descriptor_some":
                      var a = d.value;
                      return (
                        if_some(
                          run_object_method(object_parameter_map_, s1, l),
                          function(lmapo) {
                            
                            return (
                              if_some(lmapo, function(lmap) {
                                  
                                  return (
                                    if_run(
                                      run_object_get_own_prop(s1, c, lmap, x),
                                      function(s2, d0) {
                                        
                                        var follow = function (s_2, a0) {
                                          return (
                                            res_spec(s_2,
                                              Coq_full_descriptor_some(a0)));
                                        };
                                        switch (d0.tag) {
                                          case "Coq_full_descriptor_undef":
                                            return (follow(s2, a));
                                          case "Coq_full_descriptor_some":
                                            var amap = d0.value;
                                            return (
                                              if_value(
                                                run_object_get(s2, c, lmap,
                                                  x), function(s3, v) {
                                                  
                                                  switch (a.tag) {
                                                    case "Coq_attributes_data_of":
                                                      var ad = a.value;
                                                      return (
                                                        follow(s3,
                                                          Coq_attributes_data_of(
                                                            attributes_data_with_value(
                                                              ad, v))));
                                                    case "Coq_attributes_accessor_of":
                                                      var aa = a.value;
                                                      return (
                                                        function (s, m) {
                                                            Debug.impossible_with_heap_because(
                                                              __LOC__, s, m);
                                                            return (
                                                              Coq_result_impossible(
                                                                ));}(s3,
                                                          "[run_object_get_own_prop]:  received an accessor property descriptor in a point where the specification suppose it never happens."));
                                                  }
                                                  }));
                                        }
                                        }));}));}));
                  }
                  }));
          case "Coq_builtin_get_own_prop_string":
            return (
              if_run(def(s), function(s0, d) {
                  
                  switch (d.tag) {
                    case "Coq_full_descriptor_undef":
                      return (
                        if_run(
                          to_int32(s0, c, Coq_value_prim(Coq_prim_string(x))),
                          function(s1, k) {
                            
                            return (
                              if_string(
                                to_string(s1, c,
                                  Coq_value_prim(
                                    Coq_prim_number(JsNumber.absolute(k)))),
                                function(s2, s3) {
                                  
                                  if (!(string_eq(x, s3))) {
                                    return (
                                      res_spec(s2,
                                        Coq_full_descriptor_undef()));
                                  } else {
                                    return (
                                      if_string(run_object_prim_value(s2, l),
                                        function(s4, str) {
                                          
                                          return (
                                            if_run(
                                              to_int32(s4, c,
                                                Coq_value_prim(
                                                  Coq_prim_string(x))),
                                              function(s5, k0) {
                                                
                                                var len = number_of_int(
                                                            strlength(str));
                                                if (le_int_decidable(len, k0)) {
                                                  return (
                                                    res_spec(s5,
                                                      Coq_full_descriptor_undef(
                                                        )));
                                                } else {
                                                  var resultStr = string_sub(
                                                                    str,
                                                                    int_of_number(
                                                                    k0), 1);
                                                  var a = {
                                                    attributes_data_value: 
                                                    Coq_value_prim(
                                                      Coq_prim_string(
                                                        resultStr)),
                                                    attributes_data_writable: false,
                                                    attributes_data_enumerable: true,
                                                    attributes_data_configurable: false
                                                  };
                                                  return (
                                                    res_spec(s5,
                                                      Coq_full_descriptor_some(
                                                        Coq_attributes_data_of(
                                                          a))));
                                                }}));}));
                                  }}));}));
                    case "Coq_full_descriptor_some":
                      var a = d.value;
                      return (res_spec(s0, d));
                  }
                  }));
        }
        }));
};

var run_function_has_instance = function (s, lv, _foo_) {
  switch (_foo_.tag) {
    case "Coq_value_prim":
      var p = _foo_.value;
      return (run_error(s, Coq_native_error_type()));
    case "Coq_value_object":
      var lo = _foo_.value;
      return (
        if_some(run_object_method(object_proto_, s, lv), function(vproto) {
            
            switch (vproto.tag) {
              case "Coq_value_prim":
                var p = vproto.value;
                switch (p.tag) {
                  case "Coq_prim_null":
                    return (
                      res_ter(s,
                        res_val(Coq_value_prim(Coq_prim_bool(false)))));
                  default:
                    return (
                      function (s, m) {
                          Debug.impossible_with_heap_because(__LOC__, s, m);
                          return (Coq_result_impossible());}(s,
                        "Primitive found in the prototype chain in [run_object_has_instance_loop]."));
                }
                
              case "Coq_value_object":
                var proto = vproto.value;
                if (object_loc_compare(proto, lo)) {
                  return (
                    res_ter(s, res_val(Coq_value_prim(Coq_prim_bool(true)))));
                } else {
                  return (
                    run_function_has_instance(s, proto, Coq_value_object(lo)));
                }
            }
            }));
  }
  
};

var run_object_has_instance = function (s, c, b, l, v) {
  switch (b.tag) {
    case "Coq_builtin_has_instance_function":
      switch (v.tag) {
        case "Coq_value_prim":
          var w = v.value;
          return (
            result_out(
              Coq_out_ter(s, res_val(Coq_value_prim(Coq_prim_bool(false))))));
        case "Coq_value_object":
          var lv = v.value;
          return (
            if_value(run_object_get(s, c, l, "prototype"), function(s1,
              vproto) {
                
                switch (vproto.tag) {
                  case "Coq_value_prim":
                    var p = vproto.value;
                    return (run_error(s1, Coq_native_error_type()));
                  case "Coq_value_object":
                    var lproto = vproto.value;
                    return (
                      run_function_has_instance(s1, lv,
                        Coq_value_object(lproto)));
                }
                }));
      }
      
    case "Coq_builtin_has_instance_after_bind":
      return (
        if_some(run_object_method(object_target_function_, s, l),
          function(ol) {
            
            return (
              if_some(ol, function(l0) {
                  
                  return (
                    if_some(run_object_method(object_has_instance_, s, l0),
                      function(ob) {
                        
                        switch (ob.tag) {
                          case "Some":
                            var b0 = ob.value;
                            return (
                              run_object_has_instance(s, c, b0, l0, v));
                          case "None":
                            return (run_error(s, Coq_native_error_type()));
                        }
                        }));}));}));
  }
  
};

var from_prop_descriptor = function (s, c, _foo_) {
  switch (_foo_.tag) {
    case "Coq_full_descriptor_undef":
      return (
        result_out(Coq_out_ter(s, res_val(Coq_value_prim(Coq_prim_undef())))));
    case "Coq_full_descriptor_some":
      var a = _foo_.value;
      return (
        if_object(
          run_construct_prealloc(s, c, Coq_prealloc_object(), mk_nil()),
          function(s1, l) {
            
            var follow = function (s0, x) {
              var a1 = attributes_data_intro_all_true(
                         Coq_value_prim(
                           Coq_prim_bool(attributes_enumerable(a))));
              return (
                if_bool(
                  object_define_own_prop(s0, c, l, "enumerable",
                    descriptor_of_attributes(Coq_attributes_data_of(a1)),
                    throw_false), function(s0_2, x0) {
                    
                    var a2 = attributes_data_intro_all_true(
                               Coq_value_prim(
                                 Coq_prim_bool(attributes_configurable(a))));
                    return (
                      if_bool(
                        object_define_own_prop(s0_2, c, l, "configurable",
                          descriptor_of_attributes(
                            Coq_attributes_data_of(a2)), throw_false),
                        function(s_2, x1) {
                          
                          return (
                            res_ter(s_2, res_val(Coq_value_object(l))));}));
                  }));
            };
            switch (a.tag) {
              case "Coq_attributes_data_of":
                var ad = a.value;
                var a1 = attributes_data_intro_all_true(
                           ad.attributes_data_value);
                return (
                  if_bool(
                    object_define_own_prop(s1, c, l, "value",
                      descriptor_of_attributes(Coq_attributes_data_of(a1)),
                      throw_false), function(s2, x) {
                      
                      var a2 = attributes_data_intro_all_true(
                                 Coq_value_prim(
                                   Coq_prim_bool(ad.attributes_data_writable)));
                      return (
                        if_bool(
                          object_define_own_prop(s2, c, l, "writable",
                            descriptor_of_attributes(
                              Coq_attributes_data_of(a2)), throw_false),
                          function(s3, v) { 
                                            return (follow(s3, v));}));}));
              case "Coq_attributes_accessor_of":
                var aa = a.value;
                var a1 = attributes_data_intro_all_true(
                           aa.attributes_accessor_get);
                return (
                  if_bool(
                    object_define_own_prop(s1, c, l, "get",
                      descriptor_of_attributes(Coq_attributes_data_of(a1)),
                      throw_false), function(s2, x) {
                      
                      var a2 = attributes_data_intro_all_true(
                                 aa.attributes_accessor_set);
                      return (
                        if_bool(
                          object_define_own_prop(s2, c, l, "set",
                            descriptor_of_attributes(
                              Coq_attributes_data_of(a2)), throw_false),
                          function(s3, v) { 
                                            return (follow(s3, v));}));}));
            }
            }));
  }
  
};

var run_equal = function (s, c, v1, v2) {
  var conv_number = function (s0, v) {
    return (to_number(s0, c, v));
  };
  var conv_primitive = function (s0, v) {
    return (to_primitive(s0, c, v, None()));
  };
  var checkTypesThen = function (s0, v3, v4, k) {
    var ty1 = type_of(v3);
    var ty2 = type_of(v4);
    if (type_compare(ty1, ty2)) {
      return (
        result_out(
          Coq_out_ter(s0,
            res_val(
              Coq_value_prim(
                Coq_prim_bool(equality_test_for_same_type(ty1, v3, v4)))))));
    } else {
      return (k(ty1, ty2));
    }
  };
  return (
    checkTypesThen(s, v1, v2, function (ty1, ty2) {
        var dc_conv = function (v3, f, v4) {
          return (
            if_value(f(s, v4), function(s0, v2_2) {
                
                return (run_equal(s0, c, v3, v2_2));}));
        };
        var so = function (b) {
          return (
            result_out(
              Coq_out_ter(s, res_val(Coq_value_prim(Coq_prim_bool(b))))));
        };
        if ((type_compare(ty1, Coq_type_null())
            && type_compare(ty2, Coq_type_undef()))) {
          return (so(true));
        } else {
          if ((type_compare(ty1, Coq_type_undef())
              && type_compare(ty2, Coq_type_null()))) {
            return (so(true));
          } else {
            if ((type_compare(ty1, Coq_type_number())
                && type_compare(ty2, Coq_type_string()))) {
              return (dc_conv(v1, conv_number, v2));
            } else {
              if ((type_compare(ty1, Coq_type_string())
                  && type_compare(ty2, Coq_type_number()))) {
                return (dc_conv(v2, conv_number, v1));
              } else {
                if (type_compare(ty1, Coq_type_bool())) {
                  return (dc_conv(v2, conv_number, v1));
                } else {
                  if (type_compare(ty2, Coq_type_bool())) {
                    return (dc_conv(v1, conv_number, v2));
                  } else {
                    if (((type_compare(ty1, Coq_type_string())
                         || type_compare(ty1, Coq_type_number()))
                        && type_compare(ty2, Coq_type_object()))) {
                      return (dc_conv(v1, conv_primitive, v2));
                    } else {
                      if ((type_compare(ty1, Coq_type_object())
                          && (type_compare(ty2, Coq_type_string())
                             || type_compare(ty2, Coq_type_number())))) {
                        return (dc_conv(v2, conv_primitive, v1));
                      } else {
                        return (so(false));
                      }
                    }
                  }
                }
              }
            }
          }
        }}));
};

var convert_twice = function (ifv, kC, s, v1, v2) {
  return (
    ifv(kC(s, v1), function (s1, vc1) {
        return (
          ifv(kC(s1, v2), function (s2, vc2) {
              return (res_spec(s2, [vc1, vc2]));}));}));
};

var convert_twice_primitive = function (s, c, v1, v2) {
  return (
    convert_twice(ifx_prim, function (s0, v) {
        return (to_primitive(s0, c, v, None()));}, s, v1, v2));
};

var convert_twice_number = function (s, c, v1, v2) {
  return (
    convert_twice(ifx_number, function (s0, v) {
        return (to_number(s0, c, v));}, s, v1, v2));
};

var convert_twice_string = function (s, c, v1, v2) {
  return (
    convert_twice(ifx_string, function (s0, v) {
        return (to_string(s0, c, v));}, s, v1, v2));
};

var issome = function (_foo_) {
  switch (_foo_.tag) {
    case "Some":
      var t = _foo_.value;
      return (true);
    case "None":
      return (false);
  }
  
};

var run_binary_op_add = function (s, c, v1, v2) {
  return (
    if_run(convert_twice_primitive(s, c, v1, v2), function(s1,
      _tuple_arg_22) {
        var w1 = _tuple_arg_22[0], w2 = _tuple_arg_22[1];
        
        if ((type_compare(type_of(Coq_value_prim(w1)), Coq_type_string())
            || type_compare(type_of(Coq_value_prim(w2)), Coq_type_string()))) {
          return (
            if_run(
              convert_twice_string(s1, c, Coq_value_prim(w1),
                Coq_value_prim(w2)), function(s2, _tuple_arg_21) {
                var str1 = _tuple_arg_21[0], str2 = _tuple_arg_21[1];
                
                return (
                  res_out(
                    Coq_out_ter(s2,
                      res_val(
                        Coq_value_prim(
                          Coq_prim_string(strappend(str1, str2)))))));}));
        } else {
          return (
            if_run(
              convert_twice_number(s1, c, Coq_value_prim(w1),
                Coq_value_prim(w2)), function(s2, _tuple_arg_20) {
                var n1 = _tuple_arg_20[0], n2 = _tuple_arg_20[1];
                
                return (
                  res_out(
                    Coq_out_ter(s2,
                      res_val(Coq_value_prim(Coq_prim_number((n1 + n2)))))));
              }));
        }}));
};

var run_binary_op_arith = function (mathop, s, c, v1, v2) {
  return (
    if_run(convert_twice_number(s, c, v1, v2), function(s1, nn) {
        
        var n1 = nn[0], n2 = nn[1];
        return (
          res_out(
            Coq_out_ter(s1,
              res_val(Coq_value_prim(Coq_prim_number(mathop(n1, n2)))))));}));
};

var run_binary_op_shift = function (b_unsigned, mathop, s, c, v1, v2) {
  if (b_unsigned) {
    var conv = to_uint32;
  } else {
    var conv = to_int32;
  }
  return (
    if_run(conv(s, c, v1), function(s1, k1) {
        
        return (
          if_run(to_uint32(s1, c, v2), function(s2, k2) {
              
              var k2_2 = JsNumber.modulo_32(k2);
              return (
                res_ter(s2,
                  res_val(Coq_value_prim(Coq_prim_number(mathop(k1, k2_2))))));
            }));}));
};

var run_binary_op_bitwise = function (mathop, s, c, v1, v2) {
  return (
    if_run(to_int32(s, c, v1), function(s1, k1) {
        
        return (
          if_run(to_int32(s1, c, v2), function(s2, k2) {
              
              return (
                res_ter(s2,
                  res_val(Coq_value_prim(Coq_prim_number(mathop(k1, k2))))));
            }));}));
};

var run_binary_op_compare = function (b_swap, b_neg, s, c, v1, v2) {
  return (
    if_run(convert_twice_primitive(s, c, v1, v2), function(s1, ww) {
        
        var w1 = ww[0], w2 = ww[1];
        if (b_swap) {
          var p = [w2, w1];
        } else {
          var p = [w1, w2];
        }
        var wa = p[0], wb = p[1];
        var wr = inequality_test_primitive(wa, wb);
        if (prim_compare(wr, Coq_prim_undef())) {
          return (
            res_out(
              Coq_out_ter(s1, res_val(Coq_value_prim(Coq_prim_bool(false))))));
        } else {
          if ((b_neg && prim_compare(wr, Coq_prim_bool(true)))) {
            return (
              res_out(
                Coq_out_ter(s1,
                  res_val(Coq_value_prim(Coq_prim_bool(false))))));
          } else {
            if ((b_neg && prim_compare(wr, Coq_prim_bool(false)))) {
              return (
                res_out(
                  Coq_out_ter(s1,
                    res_val(Coq_value_prim(Coq_prim_bool(true))))));
            } else {
              return (res_out(Coq_out_ter(s1, res_val(Coq_value_prim(wr)))));
            }
          }
        }}));
};

var run_binary_op_instanceof = function (s, c, v1, v2) {
  switch (v2.tag) {
    case "Coq_value_prim":
      var p = v2.value;
      return (run_error(s, Coq_native_error_type()));
    case "Coq_value_object":
      var l = v2.value;
      return (
        if_some(run_object_method(object_has_instance_, s, l), function(b) {
            
            switch (b.tag) {
              case "None":
                return (run_error(s, Coq_native_error_type()));
              case "Some":
                var has_instance_id = b.value;
                return (
                  run_object_has_instance(s, c, has_instance_id, l, v1));
            }
            }));
  }
  
};

var run_binary_op_in = function (s, c, v1, v2) {
  switch (v2.tag) {
    case "Coq_value_prim":
      var p = v2.value;
      return (run_error(s, Coq_native_error_type()));
    case "Coq_value_object":
      var l = v2.value;
      return (
        if_string(to_string(s, c, v1), function(s2, x) {
            
            return (object_has_prop(s2, c, l, x));}));
  }
  
};

var run_binary_op = function (s, c, op, v1, v2) {
  switch (op.tag) {
    case "Coq_binary_op_mult":
      return (
        run_binary_op_arith(function (x, y) { return ((x * y));}, s, c, v1,
          v2));
    case "Coq_binary_op_div":
      return (
        run_binary_op_arith(function (x, y) { return ((x / y));}, s, c, v1,
          v2));
    case "Coq_binary_op_mod":
      return (
        run_binary_op_arith(function (x, y) { return (JsNumber.fmod(x, y));},
          s, c, v1, v2));
    case "Coq_binary_op_sub":
      return (
        run_binary_op_arith(function (x, y) { return ((x - y));}, s, c, v1,
          v2));
    case "Coq_binary_op_lt":
      return (run_binary_op_compare(false, false, s, c, v1, v2));
    case "Coq_binary_op_gt":
      return (run_binary_op_compare(true, false, s, c, v1, v2));
    case "Coq_binary_op_le":
      return (run_binary_op_compare(true, true, s, c, v1, v2));
    case "Coq_binary_op_ge":
      return (run_binary_op_compare(false, true, s, c, v1, v2));
    case "Coq_binary_op_left_shift":
      return (
        run_binary_op_shift(false, JsNumber.int32_left_shift, s, c, v1, v2));
    case "Coq_binary_op_right_shift":
      return (
        run_binary_op_shift(false, JsNumber.int32_right_shift, s, c, v1, v2));
    case "Coq_binary_op_unsigned_right_shift":
      return (
        run_binary_op_shift(true, JsNumber.uint32_right_shift, s, c, v1, v2));
    case "Coq_binary_op_bitwise_and":
      return (
        run_binary_op_bitwise(JsNumber.int32_bitwise_and, s, c, v1, v2));
    case "Coq_binary_op_bitwise_or":
      return (
        run_binary_op_bitwise(JsNumber.int32_bitwise_or, s, c, v1, v2));
    case "Coq_binary_op_bitwise_xor":
      return (
        run_binary_op_bitwise(JsNumber.int32_bitwise_xor, s, c, v1, v2));
    case "Coq_binary_op_add":
      return (run_binary_op_add(s, c, v1, v2));
    case "Coq_binary_op_instanceof":
      return (run_binary_op_instanceof(s, c, v1, v2));
    case "Coq_binary_op_in":
      return (run_binary_op_in(s, c, v1, v2));
    case "Coq_binary_op_equal":
      return (run_equal(s, c, v1, v2));
    case "Coq_binary_op_disequal":
      return (
        if_bool(run_equal(s, c, v1, v2), function(s0, b0) {
            
            return (
              res_ter(s0, res_val(Coq_value_prim(Coq_prim_bool(!(b0))))));}));
    case "Coq_binary_op_strict_equal":
      return (
        result_out(
          Coq_out_ter(s,
            res_val(
              Coq_value_prim(Coq_prim_bool(strict_equality_test(v1, v2)))))));
    case "Coq_binary_op_strict_disequal":
      return (
        result_out(
          Coq_out_ter(s,
            res_val(
              Coq_value_prim(Coq_prim_bool(!(strict_equality_test(v1, v2))))))));
    case "Coq_binary_op_coma":
      return (result_out(Coq_out_ter(s, res_val(v2))));
    case "Coq_binary_op_and":
      return (Coq_result_impossible());
    case "Coq_binary_op_or":
      return (Coq_result_impossible());
  }
  
};

var run_prepost_op = function (_foo_) {
  switch (_foo_.tag) {
    case "Coq_unary_op_delete":
      return (None());
    case "Coq_unary_op_void":
      return (None());
    case "Coq_unary_op_typeof":
      return (None());
    case "Coq_unary_op_post_incr":
      return (Some([add_one, false]));
    case "Coq_unary_op_post_decr":
      return (Some([sub_one, false]));
    case "Coq_unary_op_pre_incr":
      return (Some([add_one, true]));
    case "Coq_unary_op_pre_decr":
      return (Some([sub_one, true]));
    case "Coq_unary_op_add":
      return (None());
    case "Coq_unary_op_neg":
      return (None());
    case "Coq_unary_op_bitwise_not":
      return (None());
    case "Coq_unary_op_not":
      return (None());
  }
  
};

var run_typeof_value = function (s, _foo_) {
  switch (_foo_.tag) {
    case "Coq_value_prim":
      var w = _foo_.value;
      return (typeof_prim(w));
    case "Coq_value_object":
      var l = _foo_.value;
      if (is_callable_dec(s, Coq_value_object(l))) {
        return ("function");
      } else {
        return ("object");
      }
  }
  
};

var run_unary_op = function (s, c, op, e) {
  if (prepost_unary_op_dec(op)) {
    return (
      if_success(run_expr(s, c, e), function(s1, rv1) {
          
          return (
            if_run(ref_get_value(s1, c, rv1), function(s2, v2) {
                
                return (
                  if_number(to_number(s2, c, v2), function(s3, n1) {
                      
                      return (
                        if_some(run_prepost_op(op), function(po) {
                            
                            var number_op = po[0], is_pre = po[1];
                            var n2 = number_op(n1);
                            var v = Coq_prim_number((function () {
                                        if (is_pre) {
                                          return (n2);
                                        } else {
                                          return (n1);
                                        }}()));
                            return (
                              if_void(
                                ref_put_value(s3, c, rv1,
                                  Coq_value_prim(Coq_prim_number(n2))),
                                function(s4) {
                                  
                                  return (
                                    result_out(
                                      Coq_out_ter(s4,
                                        res_val(Coq_value_prim(v)))));}));}));
                    }));}));}));
  } else {
    switch (op.tag) {
      case "Coq_unary_op_delete":
        return (
          if_success(run_expr(s, c, e), function(s0, rv) {
              
              switch (rv.tag) {
                case "Coq_resvalue_empty":
                  return (
                    res_ter(s0, res_val(Coq_value_prim(Coq_prim_bool(true)))));
                case "Coq_resvalue_value":
                  var v = rv.value;
                  return (
                    res_ter(s0, res_val(Coq_value_prim(Coq_prim_bool(true)))));
                case "Coq_resvalue_ref":
                  var r = rv.ref;
                  if (ref_kind_comparable(ref_kind_of(r),
                        Coq_ref_kind_undef())) {
                    if (r.ref_strict) {
                      return (run_error(s0, Coq_native_error_syntax()));
                    } else {
                      return (
                        res_ter(s0,
                          res_val(Coq_value_prim(Coq_prim_bool(true)))));
                    }
                  } else {
                    var _switch_arg_23 = r.ref_base;
                    switch (_switch_arg_23.tag) {
                      case "Coq_ref_base_type_value":
                        var v = _switch_arg_23.value;
                        return (
                          if_object(to_object(s0, v), function(s1, l) {
                              
                              return (
                                object_delete(s1, c, l, r.ref_name,
                                  r.ref_strict));}));
                      case "Coq_ref_base_type_env_loc":
                        var l = _switch_arg_23.value;
                        if (r.ref_strict) {
                          return (run_error(s0, Coq_native_error_syntax()));
                        } else {
                          return (
                            env_record_delete_binding(s0, c, l, r.ref_name));
                        }
                    }
                    
                  }
              }
              }));
      case "Coq_unary_op_typeof":
        return (
          if_success(run_expr(s, c, e), function(s1, rv) {
              
              switch (rv.tag) {
                case "Coq_resvalue_empty":
                  return (
                    function (s, m) {
                        Debug.impossible_with_heap_because(__LOC__, s, m);
                        return (Coq_result_impossible());}(s1,
                      "Empty result for a `typeof' in [run_unary_op]."));
                case "Coq_resvalue_value":
                  var v = rv.value;
                  return (
                    res_ter(s1,
                      res_val(
                        Coq_value_prim(
                          Coq_prim_string(run_typeof_value(s1, v))))));
                case "Coq_resvalue_ref":
                  var r = rv.ref;
                  if (ref_kind_comparable(ref_kind_of(r),
                        Coq_ref_kind_undef())) {
                    return (
                      res_ter(s1,
                        res_val(Coq_value_prim(Coq_prim_string("undefined")))));
                  } else {
                    return (
                      if_run(ref_get_value(s1, c, Coq_resvalue_ref(r)),
                        function(s2, v) {
                          
                          return (
                            res_ter(s2,
                              res_val(
                                Coq_value_prim(
                                  Coq_prim_string(run_typeof_value(s2, v))))));
                        }));
                  }
              }
              }));
      default:
        return (
          if_run(run_expr_get_value(s, c, e), function(s1, v) {
              
              switch (op.tag) {
                case "Coq_unary_op_void":
                  return (
                    res_ter(s1, res_val(Coq_value_prim(Coq_prim_undef()))));
                case "Coq_unary_op_add":
                  return (to_number(s1, c, v));
                case "Coq_unary_op_neg":
                  return (
                    if_number(to_number(s1, c, v), function(s2, n) {
                        
                        return (
                          res_ter(s2,
                            res_val(
                              Coq_value_prim(
                                Coq_prim_number(JsNumber.neg(n))))));}));
                case "Coq_unary_op_bitwise_not":
                  return (
                    if_run(to_int32(s1, c, v), function(s2, k) {
                        
                        return (
                          res_ter(s2,
                            res_val(
                              Coq_value_prim(
                                Coq_prim_number(
                                  JsNumber.int32_bitwise_not(k))))));}));
                case "Coq_unary_op_not":
                  return (
                    res_ter(s1,
                      res_val(
                        Coq_value_prim(
                          Coq_prim_bool(!(convert_value_to_boolean(v)))))));
                default:
                  return (
                    function (s, m) {
                        Debug.impossible_with_heap_because(__LOC__, s, m);
                        return (Coq_result_impossible());}(s1,
                      "Undealt regular operator in [run_unary_op]."));
              }
              }));
    }
    
  }
};

var create_new_function_in = function (s, c, args, bd) {
  return (
    creating_function_object(s, c, args, bd, c.execution_ctx_lexical_env,
      c.execution_ctx_strict));
};

var init_object = function (s, c, l, _foo_) {
  switch (_foo_.tag) {
    case "[]":
      return (result_out(Coq_out_ter(s, res_val(Coq_value_object(l)))));
    case "::":
      var p = _foo_.head, pds_2 = _foo_.tail;
      var pn = p[0], pb = p[1];
      var x = string_of_propname(pn);
      var follows = function (s1, desc) {
        return (
          if_success(object_define_own_prop(s1, c, l, x, desc, false),
            function(s2, rv) { 
                               return (init_object(s2, c, l, pds_2));}));
      };
      switch (pb.tag) {
        case "Coq_propbody_val":
          var e0 = pb.expr;
          return (
            if_run(run_expr_get_value(s, c, e0), function(s1, v0) {
                
                var desc = {
                  descriptor_value: Some(v0),
                  descriptor_writable: Some(true),
                  descriptor_get: None(),
                  descriptor_set: None(),
                  descriptor_enumerable: Some(true),
                  descriptor_configurable: Some(true)
                };
                return (follows(s1, desc));}));
        case "Coq_propbody_get":
          var bd = pb.body;
          return (
            if_value(create_new_function_in(s, c, mk_nil(), bd), function(s1,
              v0) {
                
                var desc = {
                  descriptor_value: None(),
                  descriptor_writable: None(),
                  descriptor_get: Some(v0),
                  descriptor_set: None(),
                  descriptor_enumerable: Some(true),
                  descriptor_configurable: Some(true)
                };
                return (follows(s1, desc));}));
        case "Coq_propbody_set":
          var args = pb.names, bd = pb.body;
          return (
            if_value(create_new_function_in(s, c, args, bd), function(s1,
              v0) {
                
                var desc = {
                  descriptor_value: None(),
                  descriptor_writable: None(),
                  descriptor_get: None(),
                  descriptor_set: Some(v0),
                  descriptor_enumerable: Some(true),
                  descriptor_configurable: Some(true)
                };
                return (follows(s1, desc));}));
      }
      
  }
  
};

var run_array_element_list = function (s, c, l, oes, n) {
  switch (oes.tag) {
    case "[]":
      return (result_out(Coq_out_ter(s, res_val(Coq_value_object(l)))));
    case "::":
      var o = oes.head, oes_2 = oes.tail;
      switch (o.tag) {
        case "Some":
          var e = o.value;
          var loop_result = function (s0) {
            return (run_array_element_list(s0, c, l, oes_2, 0.));
          };
          return (
            if_run(run_expr_get_value(s, c, e), function(s0, v) {
                
                return (
                  if_value(run_object_get(s0, c, l, "length"), function(s1,
                    vlen) {
                      
                      return (
                        if_run(to_uint32(s1, c, vlen), function(s2, ilen) {
                            
                            return (
                              if_string(
                                to_string(s2, c,
                                  Coq_value_prim(Coq_prim_number((ilen + n)))),
                                function(s3, slen) {
                                  
                                  var desc = {
                                    attributes_data_value: v,
                                    attributes_data_writable: true,
                                    attributes_data_enumerable: true,
                                    attributes_data_configurable: true
                                  };
                                  return (
                                    if_bool(
                                      object_define_own_prop(s3, c, l, slen,
                                        descriptor_of_attributes(
                                          Coq_attributes_data_of(desc)),
                                        false), function(s4, x) {
                                        
                                        return (
                                          if_object(loop_result(s4),
                                            function(s5, l0) {
                                              
                                              return (
                                                res_ter(s5,
                                                  res_val(
                                                    Coq_value_object(l0))));
                                            }));}));}));}));}));}));
        case "None":
          var firstIndex = elision_head_count(mk_cons(None(), oes_2));
          return (
            run_array_element_list(s, c, l,
              elision_head_remove(mk_cons(None(), oes_2)),
              number_of_int(firstIndex)));
      }
      
  }
  
};

var init_array = function (s, c, l, oes) {
  var elementList = elision_tail_remove(oes);
  var elisionLength = elision_tail_count(oes);
  return (
    if_object(run_array_element_list(s, c, l, elementList, 0.), function(s0,
      l0) {
        
        return (
          if_value(run_object_get(s0, c, l0, "length"), function(s1, vlen) {
              
              return (
                if_run(to_uint32(s1, c, vlen), function(s2, ilen) {
                    
                    return (
                      if_run(
                        to_uint32(s2, c,
                          Coq_value_prim(
                            Coq_prim_number(
                              (ilen + number_of_int(elisionLength))))),
                        function(s3, len) {
                          
                          return (
                            if_not_throw(
                              object_put(s3, c, l0, "length",
                                Coq_value_prim(Coq_prim_number(len)),
                                throw_false), function(s4, x) {
                                
                                return (
                                  result_out(
                                    Coq_out_ter(s4,
                                      res_val(Coq_value_object(l0)))));}));}));
                  }));}));}));
};

var run_var_decl_item = function (s, c, x, _foo_) {
  switch (_foo_.tag) {
    case "Some":
      var e = _foo_.value;
      return (
        if_run(identifier_resolution(s, c, x), function(s1, ir) {
            
            return (
              if_run(run_expr_get_value(s1, c, e), function(s2, v) {
                  
                  return (
                    if_void(ref_put_value(s2, c, Coq_resvalue_ref(ir), v),
                      function(s3) {
                        
                        return (
                          result_out(
                            Coq_out_ter(s3,
                              res_val(Coq_value_prim(Coq_prim_string(x))))));
                      }));}));}));
    case "None":
      return (
        result_out(
          Coq_out_ter(s, res_val(Coq_value_prim(Coq_prim_string(x))))));
  }
  
};

var run_var_decl = function (s, c, _foo_) {
  switch (_foo_.tag) {
    case "[]":
      return (result_out(Coq_out_ter(s, res_empty)));
    case "::":
      var y = _foo_.head, xeos_2 = _foo_.tail;
      var x = y[0], eo = y[1];
      return (
        if_value(run_var_decl_item(s, c, x, eo), function(s1, vname) {
            
            return (run_var_decl(s1, c, xeos_2));}));
  }
  
};

var run_list_expr = function (s1, c, vs, _foo_) {
  switch (_foo_.tag) {
    case "[]":
      return (res_spec(s1, rev(vs)));
    case "::":
      var e = _foo_.head, es_2 = _foo_.tail;
      return (
        if_run(run_expr_get_value(s1, c, e), function(s2, v) {
            
            return (run_list_expr(s2, c, mk_cons(v, vs), es_2));}));
  }
  
};

var run_block = function (s, c, _foo_) {
  switch (_foo_.tag) {
    case "[]":
      return (res_ter(s, res_normal(Coq_resvalue_empty())));
    case "::":
      var t = _foo_.head, ts_rev_2 = _foo_.tail;
      return (
        if_success(run_block(s, c, ts_rev_2), function(s0, rv0) {
            
            return (
              ifx_success_state(rv0, run_stat(s0, c, t), function (x, x0) {
                  return (result_out(Coq_out_ter(x, res_normal(x0))));}));}));
  }
  
};

var run_binary_op_and = function (s, c, e1, e2) {
  return (
    if_run(run_expr_get_value(s, c, e1), function(s1, v1) {
        
        var b1 = convert_value_to_boolean(v1);
        if (!(b1)) {
          return (res_ter(s1, res_val(v1)));
        } else {
          return (
            if_run(run_expr_get_value(s1, c, e2), function(s2, v) {
                
                return (res_ter(s2, res_val(v)));}));
        }}));
};

var run_binary_op_or = function (s, c, e1, e2) {
  return (
    if_run(run_expr_get_value(s, c, e1), function(s1, v1) {
        
        var b1 = convert_value_to_boolean(v1);
        if (b1) {
          return (res_ter(s1, res_val(v1)));
        } else {
          return (
            if_run(run_expr_get_value(s1, c, e2), function(s2, v) {
                
                return (res_ter(s2, res_val(v)));}));
        }}));
};

var run_expr_binary_op = function (s, c, op, e1, e2) {
  switch (op.tag) {
    case "Coq_binary_op_and":
      return (run_binary_op_and(s, c, e1, e2));
    case "Coq_binary_op_or":
      return (run_binary_op_or(s, c, e1, e2));
    default:
      return (
        if_run(run_expr_get_value(s, c, e1), function(s1, v1) {
            
            return (
              if_run(run_expr_get_value(s1, c, e2), function(s2, v2) {
                  
                  return (run_binary_op(s2, c, op, v1, v2));}));}));
  }
  
};

var run_expr_access = function (s, c, e1, e2) {
  return (
    if_run(run_expr_get_value(s, c, e1), function(s1, v1) {
        
        return (
          if_run(run_expr_get_value(s1, c, e2), function(s2, v2) {
              
              if ((value_compare(v1, Coq_value_prim(Coq_prim_undef()))
                  || value_compare(v1, Coq_value_prim(Coq_prim_null())))) {
                return (run_error(s2, Coq_native_error_type()));
              } else {
                return (
                  if_string(to_string(s2, c, v2), function(s3, x) {
                      
                      return (
                        res_ter(s3,
                          res_ref(
                            ref_create_value(v1, x, c.execution_ctx_strict))));
                    }));
              }}));}));
};

var run_expr_assign = function (s, c, opo, e1, e2) {
  return (
    if_success(run_expr(s, c, e1), function(s1, rv1) {
        
        var follow = function (s0, rv_2) {
          switch (rv_2.tag) {
            case "Coq_resvalue_empty":
              return (
                function (s, m) {
                    Debug.impossible_with_heap_because(__LOC__, s, m);
                    return (Coq_result_impossible());}(s0,
                  "Non-value result in [run_expr_assign]."));
            case "Coq_resvalue_value":
              var v = rv_2.value;
              return (
                if_void(ref_put_value(s0, c, rv1, v), function(s_2) {
                    
                    return (result_out(Coq_out_ter(s_2, res_val(v))));}));
            case "Coq_resvalue_ref":
              var r = rv_2.ref;
              return (
                function (s, m) {
                    Debug.impossible_with_heap_because(__LOC__, s, m);
                    return (Coq_result_impossible());}(s0,
                  "Non-value result in [run_expr_assign]."));
          }
          
        };
        switch (opo.tag) {
          case "Some":
            var op = opo.value;
            return (
              if_run(ref_get_value(s1, c, rv1), function(s2, v1) {
                  
                  return (
                    if_run(run_expr_get_value(s2, c, e2), function(s3, v2) {
                        
                        return (
                          if_success(run_binary_op(s3, c, op, v1, v2),
                            function(s4, v) { 
                                              return (follow(s4, v));}));}));
                }));
          case "None":
            return (
              if_run(run_expr_get_value(s1, c, e2), function(x, x0) {
                  
                  return (follow(x, Coq_resvalue_value(x0)));}));
        }
        }));
};

var run_expr_function = function (s, c, fo, args, bd) {
  switch (fo.tag) {
    case "Some":
      var fn = fo.value;
      var p = lexical_env_alloc_decl(s, c.execution_ctx_lexical_env);
      var lex_2 = p[0], s_2 = p[1];
      var follow = function (l) {
        return (
          if_some(env_record_binds_pickable_option(s_2, l), function(e) {
              
              return (
                if_void(env_record_create_immutable_binding(s_2, l, fn),
                  function(s1) {
                    
                    return (
                      if_object(
                        creating_function_object(s1, c, args, bd, lex_2,
                          funcbody_is_strict(bd)), function(s2, l0) {
                          
                          return (
                            if_void(
                              env_record_initialize_immutable_binding(s2, l,
                                fn, Coq_value_object(l0)), function(s3) {
                                
                                return (
                                  result_out(
                                    Coq_out_ter(s3,
                                      res_val(Coq_value_object(l0)))));}));}));
                  }));}));
      };
      return (
        destr_list(lex_2, function (x) {
            return (
              function (s, m) {
                  Debug.impossible_with_heap_because(__LOC__, s, m);
                  return (Coq_result_impossible());}(s_2,
                "Empty lexical environnment allocated in [run_expr_function]."));
          }, function (l, x) { return (follow(l));}, {}));
    case "None":
      var lex = c.execution_ctx_lexical_env;
      return (
        creating_function_object(s, c, args, bd, lex, funcbody_is_strict(bd)));
  }
  
};

var entering_eval_code = function (s, c, direct, bd, k) {
  var str = (funcbody_is_strict(bd) || (direct && c.execution_ctx_strict));
  if (direct) {
    var c_2 = c;
  } else {
    var c_2 = execution_ctx_initial(str);
  }
  if (str) {
    var p = lexical_env_alloc_decl(s, c_2.execution_ctx_lexical_env);
  } else {
    var p = [c_2.execution_ctx_lexical_env, s];
  }
  var lex = p[0], s_2 = p[1];
  if (str) {
    var c1 = execution_ctx_with_lex_same(c_2, lex);
  } else {
    var c1 = c_2;
  }
  var p0 = funcbody_prog(bd);
  return (
    if_void(
      execution_ctx_binding_inst(s_2, c1, Coq_codetype_eval(), None(), p0,
        mk_nil()), function(s1) { 
                                  return (k(s1, c1));}));
};

var run_eval = function (s, c, is_direct_call, vs) {
  var _switch_arg_24 = get_arg(0, vs);
  switch (_switch_arg_24.tag) {
    case "Coq_value_prim":
      var p = _switch_arg_24.value;
      switch (p.tag) {
        case "Coq_prim_undef":
          return (
            result_out(
              Coq_out_ter(s, res_val(Coq_value_prim(Coq_prim_undef())))));
        case "Coq_prim_null":
          return (
            result_out(
              Coq_out_ter(s, res_val(Coq_value_prim(Coq_prim_null())))));
        case "Coq_prim_bool":
          var b = p.value;
          return (
            result_out(
              Coq_out_ter(s, res_val(Coq_value_prim(Coq_prim_bool(b))))));
        case "Coq_prim_number":
          var n = p.value;
          return (
            result_out(
              Coq_out_ter(s, res_val(Coq_value_prim(Coq_prim_number(n))))));
        case "Coq_prim_string":
          var s0 = p.value;
          var str = (is_direct_call && c.execution_ctx_strict);
          var _switch_arg_25 = parse_pickable(s0, str);
          switch (_switch_arg_25.tag) {
            case "Some":
              var p0 = _switch_arg_25.value;
              return (
                entering_eval_code(s, c, is_direct_call,
                  Coq_funcbody_intro(p0, s0), function (s1, c_2) {
                    return (
                      if_ter(run_prog(s1, c_2, p0), function(s2, r) {
                          
                          var _switch_arg_26 = r.res_type;
                          switch (_switch_arg_26.tag) {
                            case "Coq_restype_normal":
                              return (
                                ifx_empty_label(s2, r, function (x) {
                                    var _switch_arg_27 = r.res_value;
                                    switch (_switch_arg_27.tag) {
                                      case "Coq_resvalue_empty":
                                        return (
                                          res_ter(s2,
                                            res_val(
                                              Coq_value_prim(
                                                Coq_prim_undef()))));
                                      case "Coq_resvalue_value":
                                        var v = _switch_arg_27.value;
                                        return (res_ter(s2, res_val(v)));
                                      case "Coq_resvalue_ref":
                                        var r0 = _switch_arg_27.ref;
                                        return (
                                          function (s, m) {
                                              Debug.impossible_with_heap_because(
                                                __LOC__, s, m);
                                              return (
                                                Coq_result_impossible());}(
                                            s2,
                                            "Reference found in the result of an `eval' in [run_eval]."));
                                    }
                                    }));
                            case "Coq_restype_throw":
                              return (res_ter(s2, res_throw(r.res_value)));
                            default:
                              return (
                                function (s, m) {
                                    Debug.impossible_with_heap_because(
                                      __LOC__, s, m);
                                    return (Coq_result_impossible());}(s2,
                                  "Forbidden result type returned by an `eval' in [run_eval]."));
                          }
                          }));}));
            case "None":
              return (run_error(s, Coq_native_error_syntax()));
          }
          
      }
      
    case "Coq_value_object":
      var o = _switch_arg_24.value;
      return (result_out(Coq_out_ter(s, res_val(Coq_value_object(o)))));
  }
  
};

var run_expr_call = function (s, c, e1, e2s) {
  var is_eval_direct = is_syntactic_eval(e1);
  return (
    if_success(run_expr(s, c, e1), function(s1, rv) {
        
        return (
          if_run(ref_get_value(s1, c, rv), function(s2, f) {
              
              return (
                if_run(run_list_expr(s2, c, mk_nil(), e2s), function(s3,
                  vs) {
                    
                    switch (f.tag) {
                      case "Coq_value_prim":
                        var p = f.value;
                        return (run_error(s3, Coq_native_error_type()));
                      case "Coq_value_object":
                        var l = f.value;
                        if (is_callable_dec(s3, Coq_value_object(l))) {
                          var follow = function (vthis) {
                            if (object_loc_compare(l,
                                  Coq_object_loc_prealloc(
                                    Coq_prealloc_global_eval()))) {
                              return (run_eval(s3, c, is_eval_direct, vs));
                            } else {
                              return (run_call(s3, c, l, vthis, vs));
                            }
                          };
                          switch (rv.tag) {
                            case "Coq_resvalue_empty":
                              return (
                                function (s, m) {
                                    Debug.impossible_with_heap_because(
                                      __LOC__, s, m);
                                    return (Coq_result_impossible());}(s3,
                                  "[run_expr_call] unable to call an  empty result."));
                            case "Coq_resvalue_value":
                              var v = rv.value;
                              return (
                                follow(Coq_value_prim(Coq_prim_undef())));
                            case "Coq_resvalue_ref":
                              var r = rv.ref;
                              var _switch_arg_28 = r.ref_base;
                              switch (_switch_arg_28.tag) {
                                case "Coq_ref_base_type_value":
                                  var v = _switch_arg_28.value;
                                  if ((ref_kind_comparable(ref_kind_of(r),
                                         Coq_ref_kind_primitive_base())
                                      || (ref_kind_comparable(ref_kind_of(r),
                                            Coq_ref_kind_null())
                                         || ref_kind_comparable(
                                              ref_kind_of(r),
                                              Coq_ref_kind_object())))) {
                                    return (follow(v));
                                  } else {
                                    return (
                                      function (s, m) {
                                          Debug.impossible_with_heap_because(
                                            __LOC__, s, m);
                                          return (Coq_result_impossible());}(
                                        s3,
                                        "[run_expr_call] unable to call a non-property function."));
                                  }
                                case "Coq_ref_base_type_env_loc":
                                  var l0 = _switch_arg_28.value;
                                  return (
                                    if_some(
                                      env_record_implicit_this_value(s3, l0),
                                      function(v) { 
                                                    return (follow(v));}));
                              }
                              
                          }
                          
                        } else {
                          return (run_error(s3, Coq_native_error_type()));
                        }
                    }
                    }));}));}));
};

var run_expr_conditionnal = function (s, c, e1, e2, e3) {
  return (
    if_run(run_expr_get_value(s, c, e1), function(s1, v1) {
        
        var b = convert_value_to_boolean(v1);
        if (b) {
          var e = e2;
        } else {
          var e = e3;
        }
        return (
          if_run(run_expr_get_value(s1, c, e), function(s0, r) {
              
              return (res_ter(s0, res_val(r)));}));}));
};

var run_expr_new = function (s, c, e1, e2s) {
  return (
    if_run(run_expr_get_value(s, c, e1), function(s1, v) {
        
        return (
          if_run(run_list_expr(s1, c, mk_nil(), e2s), function(s2, args) {
              
              switch (v.tag) {
                case "Coq_value_prim":
                  var p = v.value;
                  return (run_error(s2, Coq_native_error_type()));
                case "Coq_value_object":
                  var l = v.value;
                  return (
                    if_some(run_object_method(object_construct_, s2, l),
                      function(coo) {
                        
                        switch (coo.tag) {
                          case "Some":
                            var co = coo.value;
                            return (run_construct(s2, c, co, l, args));
                          case "None":
                            return (run_error(s2, Coq_native_error_type()));
                        }
                        }));
              }
              }));}));
};

var run_stat_label = function (s, c, lab, t) {
  return (
    if_break(run_stat(s, c, t), function(s1, r1) {
        
        return (
          result_out(
            Coq_out_ter(s1, (function () {
                if (label_compare(r1.res_label, lab)) {
                  return (res_normal(r1.res_value));
                } else {
                  return (r1);
                }}()))));}));
};

var run_stat_with = function (s, c, e1, t2) {
  return (
    if_run(run_expr_get_value(s, c, e1), function(s1, v1) {
        
        return (
          if_object(to_object(s1, v1), function(s2, l) {
              
              var lex = c.execution_ctx_lexical_env;
              var p = lexical_env_alloc_object(s2, lex, l, provide_this_true);
              var lex_2 = p[0], s3 = p[1];
              var c_2 = execution_ctx_with_lex(c, lex_2);
              return (run_stat(s3, c_2, t2));}));}));
};

var run_stat_if = function (s, c, e1, t2, to0) {
  return (
    if_run(run_expr_get_value(s, c, e1), function(s1, v1) {
        
        var b = convert_value_to_boolean(v1);
        if (b) {
          return (run_stat(s1, c, t2));
        } else {
          switch (to0.tag) {
            case "Some":
              var t3 = to0.value;
              return (run_stat(s1, c, t3));
            case "None":
              return (
                result_out(Coq_out_ter(s1, res_normal(Coq_resvalue_empty()))));
          }
          
        }}));
};

var run_stat_while = function (s, c, rv, labs, e1, t2) {
  return (
    if_run(run_expr_get_value(s, c, e1), function(s1, v1) {
        
        var b = convert_value_to_boolean(v1);
        if (b) {
          return (
            if_ter(run_stat(s1, c, t2), function(s2, r) {
                
                if (!(resvalue_compare(r.res_value, Coq_resvalue_empty()))) {
                  var rv_2 = r.res_value;
                } else {
                  var rv_2 = rv;
                }
                var loop = function (x) {
                  return (run_stat_while(s2, c, rv_2, labs, e1, t2));
                };
                if ((!(restype_compare(r.res_type, Coq_restype_continue()))
                    || !(res_label_in(r, labs)))) {
                  if ((restype_compare(r.res_type, Coq_restype_break())
                      && res_label_in(r, labs))) {
                    return (res_ter(s2, res_normal(rv_2)));
                  } else {
                    if (!(restype_compare(r.res_type, Coq_restype_normal()))) {
                      return (res_ter(s2, r));
                    } else {
                      return (loop({}));
                    }
                  }
                } else {
                  return (loop({}));
                }}));
        } else {
          return (res_ter(s1, res_normal(rv)));
        }}));
};

var run_stat_switch_end = function (s, c, rv, _foo_) {
  switch (_foo_.tag) {
    case "[]":
      return (result_out(Coq_out_ter(s, res_normal(rv))));
    case "::":
      var y = _foo_.head, scs_2 = _foo_.tail;
      switch (y.tag) {
        case "Coq_switchclause_intro":
          var e = y.arg, ts = y.stats;
          return (
            ifx_success_state(rv, run_block(s, c, rev(ts)),
              function (s1, rv1) {
                return (run_stat_switch_end(s1, c, rv1, scs_2));}));
      }
      
  }
  
};

var run_stat_switch_no_default = function (s, c, vi, rv, _foo_) {
  switch (_foo_.tag) {
    case "[]":
      return (result_out(Coq_out_ter(s, res_normal(rv))));
    case "::":
      var y = _foo_.head, scs_2 = _foo_.tail;
      switch (y.tag) {
        case "Coq_switchclause_intro":
          var e = y.arg, ts = y.stats;
          return (
            if_run(run_expr_get_value(s, c, e), function(s1, v1) {
                
                var b = strict_equality_test(v1, vi);
                if (b) {
                  return (
                    if_success(run_block(s1, c, rev(ts)), function(s2, rv2) {
                        
                        return (run_stat_switch_end(s2, c, rv2, scs_2));}));
                } else {
                  return (run_stat_switch_no_default(s1, c, vi, rv, scs_2));
                }}));
      }
      
  }
  
};

var run_stat_switch_with_default_default = function (s, c, ts, scs) {
  return (
    if_success(run_block(s, c, rev(ts)), function(s1, rv) {
        
        return (run_stat_switch_end(s1, c, rv, scs));}));
};

var run_stat_switch_with_default_B = function (s, c, vi, rv, ts0, scs) {
  switch (scs.tag) {
    case "[]":
      return (run_stat_switch_with_default_default(s, c, ts0, scs));
    case "::":
      var y = scs.head, scs_2 = scs.tail;
      switch (y.tag) {
        case "Coq_switchclause_intro":
          var e = y.arg, ts = y.stats;
          return (
            if_run(run_expr_get_value(s, c, e), function(s1, v1) {
                
                var b = strict_equality_test(v1, vi);
                if (b) {
                  return (
                    if_success(run_block(s1, c, rev(ts)), function(s2, rv2) {
                        
                        return (run_stat_switch_end(s2, c, rv2, scs_2));}));
                } else {
                  return (
                    run_stat_switch_with_default_B(s1, c, vi, rv, ts0, scs_2));
                }}));
      }
      
  }
  
};

var run_stat_switch_with_default_A = function (s, c, found, vi, rv, scs1, ts0, scs2) {
  switch (scs1.tag) {
    case "[]":
      if (found) {
        return (run_stat_switch_with_default_default(s, c, ts0, scs2));
      } else {
        return (run_stat_switch_with_default_B(s, c, vi, rv, ts0, scs2));
      }
    case "::":
      var y = scs1.head, scs_2 = scs1.tail;
      switch (y.tag) {
        case "Coq_switchclause_intro":
          var e = y.arg, ts = y.stats;
          var follow = function (s0) {
            return (
              ifx_success_state(rv, run_block(s0, c, rev(ts)),
                function (s1, rv0) {
                  return (
                    run_stat_switch_with_default_A(s1, c, true, vi, rv0,
                      scs_2, ts0, scs2));}));
          };
          if (found) {
            return (follow(s));
          } else {
            return (
              if_run(run_expr_get_value(s, c, e), function(s1, v1) {
                  
                  var b = strict_equality_test(v1, vi);
                  if (b) {
                    return (follow(s1));
                  } else {
                    return (
                      run_stat_switch_with_default_A(s1, c, false, vi, rv,
                        scs_2, ts0, scs2));
                  }}));
          }
      }
      
  }
  
};

var run_stat_switch = function (s, c, labs, e, sb) {
  return (
    if_run(run_expr_get_value(s, c, e), function(s1, vi) {
        
        var follow = function (w) {
          return (
            if_success(
              if_break(w, function(s2, r) {
                  
                  if (res_label_in(r, labs)) {
                    return (
                      result_out(Coq_out_ter(s2, res_normal(r.res_value))));
                  } else {
                    return (result_out(Coq_out_ter(s2, r)));
                  }}), function(s0, r) { 
                                         return (res_ter(s0, res_normal(r)));
              }));
        };
        switch (sb.tag) {
          case "Coq_switchbody_nodefault":
            var scs = sb.clauses;
            return (
              follow(
                run_stat_switch_no_default(s1, c, vi, Coq_resvalue_empty(),
                  scs)));
          case "Coq_switchbody_withdefault":
            var scs1 = sb.clauses_before, ts = sb.clause_default,
              scs2 = sb.clauses_after;
            return (
              follow(
                run_stat_switch_with_default_A(s1, c, false, vi,
                  Coq_resvalue_empty(), scs1, ts, scs2)));
        }
        }));
};

var run_stat_do_while = function (s, c, rv, labs, e1, t2) {
  return (
    if_ter(run_stat(s, c, t2), function(s1, r) {
        
        if (resvalue_compare(r.res_value, Coq_resvalue_empty())) {
          var rv_2 = rv;
        } else {
          var rv_2 = r.res_value;
        }
        var loop = function (x) {
          return (
            if_run(run_expr_get_value(s1, c, e1), function(s2, v1) {
                
                var b = convert_value_to_boolean(v1);
                if (b) {
                  return (run_stat_do_while(s2, c, rv_2, labs, e1, t2));
                } else {
                  return (res_ter(s2, res_normal(rv_2)));
                }}));
        };
        if ((restype_compare(r.res_type, Coq_restype_continue())
            && res_label_in(r, labs))) {
          return (loop({}));
        } else {
          if ((restype_compare(r.res_type, Coq_restype_break())
              && res_label_in(r, labs))) {
            return (res_ter(s1, res_normal(rv_2)));
          } else {
            if (!(restype_compare(r.res_type, Coq_restype_normal()))) {
              return (res_ter(s1, r));
            } else {
              return (loop({}));
            }
          }
        }}));
};

var run_stat_try = function (s, c, t1, t2o, t3o) {
  var finallycont = function (s1, r) {
    switch (t3o.tag) {
      case "Some":
        var t3 = t3o.value;
        return (
          if_success(run_stat(s1, c, t3), function(s2, rv_2) {
              
              return (res_ter(s2, r));}));
      case "None":
        return (res_ter(s1, r));
    }
    
  };
  return (
    ifx_any_or_throw(run_stat(s, c, t1), finallycont, function (s1, v) {
        switch (t2o.tag) {
          case "Some":
            var y = t2o.value;
            var x = y[0], t2 = y[1];
            var lex = c.execution_ctx_lexical_env;
            var p = lexical_env_alloc_decl(s1, lex);
            var lex_2 = p[0], s_2 = p[1];
            switch (lex_2.tag) {
              case "[]":
                return (
                  function (s, m) {
                      Debug.impossible_with_heap_because(__LOC__, s, m);
                      return (Coq_result_impossible());}(s_2,
                    "Empty lexical environnment in [run_stat_try]."));
              case "::":
                var l = lex_2.head, oldlex = lex_2.tail;
                return (
                  if_void(
                    env_record_create_set_mutable_binding(s_2, c, l, x,
                      None(), v, throw_irrelevant), function(s2) {
                      
                      var c_2 = execution_ctx_with_lex(c, lex_2);
                      return (
                        if_ter(run_stat(s2, c_2, t2), function(s3, r) {
                            
                            return (finallycont(s3, r));}));}));
            }
            
          case "None":
            return (finallycont(s1, res_throw(Coq_resvalue_value(v))));
        }
        }));
};

var run_stat_throw = function (s, c, e) {
  return (
    if_run(run_expr_get_value(s, c, e), function(s1, v1) {
        
        return (res_ter(s1, res_throw(Coq_resvalue_value(v1))));}));
};

var run_stat_return = function (s, c, _foo_) {
  switch (_foo_.tag) {
    case "Some":
      var e = _foo_.value;
      return (
        if_run(run_expr_get_value(s, c, e), function(s1, v1) {
            
            return (res_ter(s1, res_return(Coq_resvalue_value(v1))));}));
    case "None":
      return (
        result_out(
          Coq_out_ter(s,
            res_return(Coq_resvalue_value(Coq_value_prim(Coq_prim_undef()))))));
  }
  
};

var run_stat_for_loop = function (s, c, labs, rv, eo2, eo3, t) {
  var follows = function (s0) {
    return (
      if_ter(run_stat(s0, c, t), function(s1, r) {
          
          if (!(resvalue_compare(r.res_value, Coq_resvalue_empty()))) {
            var rv_2 = r.res_value;
          } else {
            var rv_2 = rv;
          }
          var loop = function (s2) {
            return (run_stat_for_loop(s2, c, labs, rv_2, eo2, eo3, t));
          };
          if ((restype_compare(r.res_type, Coq_restype_break())
              && res_label_in(r, labs))) {
            return (res_ter(s1, res_normal(rv_2)));
          } else {
            if ((restype_compare(r.res_type, Coq_restype_normal())
                || (restype_compare(r.res_type, Coq_restype_continue())
                   && res_label_in(r, labs)))) {
              switch (eo3.tag) {
                case "Some":
                  var e3 = eo3.value;
                  return (
                    if_run(run_expr_get_value(s1, c, e3), function(s2, v3) {
                        
                        return (loop(s2));}));
                case "None":
                  return (loop(s1));
              }
              
            } else {
              return (res_ter(s1, r));
            }
          }}));
  };
  switch (eo2.tag) {
    case "Some":
      var e2 = eo2.value;
      return (
        if_run(run_expr_get_value(s, c, e2), function(s0, v2) {
            
            var b = convert_value_to_boolean(v2);
            if (b) {
              return (follows(s0));
            } else {
              return (res_ter(s0, res_normal(rv)));
            }}));
    case "None":
      return (follows(s));
  }
  
};

var run_stat_for = function (s, c, labs, eo1, eo2, eo3, t) {
  var follows = function (s0) {
    return (
      run_stat_for_loop(s0, c, labs, Coq_resvalue_empty(), eo2, eo3, t));
  };
  switch (eo1.tag) {
    case "Some":
      var e1 = eo1.value;
      return (
        if_run(run_expr_get_value(s, c, e1), function(s0, v1) {
            
            return (follows(s0));}));
    case "None":
      return (follows(s));
  }
  
};

var run_stat_for_var = function (s, c, labs, ds, eo2, eo3, t) {
  return (
    if_ter(run_stat(s, c, Coq_stat_var_decl(ds)), function(s0, r) {
        
        return (
          run_stat_for_loop(s0, c, labs, Coq_resvalue_empty(), eo2, eo3, t));
      }));
};

var run_expr = function (s, c, _term_) {
  switch (_term_.tag) {
    case "Coq_expr_this":
      return (
        result_out(Coq_out_ter(s, res_val(c.execution_ctx_this_binding))));
    case "Coq_expr_identifier":
      var x = _term_.name;
      return (
        if_run(identifier_resolution(s, c, x), function(s0, r) {
            
            return (res_ter(s0, res_ref(r)));}));
    case "Coq_expr_literal":
      var i = _term_.value;
      return (
        result_out(
          Coq_out_ter(s, res_val(Coq_value_prim(convert_literal_to_prim(i))))));
    case "Coq_expr_object":
      var pds = _term_.fields;
      return (
        if_object(
          run_construct_prealloc(s, c, Coq_prealloc_object(), mk_nil()),
          function(s1, l) { 
                            return (init_object(s1, c, l, pds));}));
    case "Coq_expr_array":
      var oes = _term_.elements;
      return (
        if_object(
          run_construct_prealloc(s, c, Coq_prealloc_array(), mk_nil()),
          function(s1, l) { 
                            return (init_array(s1, c, l, oes));}));
    case "Coq_expr_function":
      var fo = _term_.func_name_opt, args = _term_.arg_names,
        bd = _term_.body;
      return (run_expr_function(s, c, fo, args, bd));
    case "Coq_expr_access":
      var e1 = _term_.obj, e2 = _term_.field;
      return (run_expr_access(s, c, e1, e2));
    case "Coq_expr_member":
      var e1 = _term_.obj, f = _term_.field_name;
      return (
        run_expr(s, c,
          Coq_expr_access(e1, Coq_expr_literal(Coq_literal_string(f)))));
    case "Coq_expr_new":
      var e1 = _term_.func, e2s = _term_.args;
      return (run_expr_new(s, c, e1, e2s));
    case "Coq_expr_call":
      var e1 = _term_.func, e2s = _term_.args;
      return (run_expr_call(s, c, e1, e2s));
    case "Coq_expr_unary_op":
      var op = _term_.op, e0 = _term_.arg;
      return (run_unary_op(s, c, op, e0));
    case "Coq_expr_binary_op":
      var e1 = _term_.arg1, op = _term_.op, e2 = _term_.arg2;
      return (run_expr_binary_op(s, c, op, e1, e2));
    case "Coq_expr_conditional":
      var e1 = _term_.cond, e2 = _term_.then_branch, e3 = _term_.else_branch;
      return (run_expr_conditionnal(s, c, e1, e2, e3));
    case "Coq_expr_assign":
      var e1 = _term_.left_expr, opo = _term_.op_opt, e2 = _term_.right_expr;
      return (run_expr_assign(s, c, opo, e1, e2));
  }
  
};

var run_stat = function (s, c, _term_) {
  switch (_term_.tag) {
    case "Coq_stat_expr":
      var e = _term_.expr;
      return (
        if_run(run_expr_get_value(s, c, e), function(s0, r) {
            
            return (res_ter(s0, res_val(r)));}));
    case "Coq_stat_label":
      var lab = _term_.label, t0 = _term_.stat;
      return (run_stat_label(s, c, Coq_label_string(lab), t0));
    case "Coq_stat_block":
      var ts = _term_.stats;
      return (run_block(s, c, rev(ts)));
    case "Coq_stat_var_decl":
      var xeos = _term_.decls;
      return (run_var_decl(s, c, xeos));
    case "Coq_stat_if":
      var e1 = _term_.cond, t2 = _term_.then_branch,
        to0 = _term_.else_branch;
      return (run_stat_if(s, c, e1, t2, to0));
    case "Coq_stat_do_while":
      var ls = _term_.labels, t1 = _term_.body, e2 = _term_.cond;
      return (run_stat_do_while(s, c, Coq_resvalue_empty(), ls, e2, t1));
    case "Coq_stat_while":
      var ls = _term_.labels, e1 = _term_.cond, t2 = _term_.body;
      return (run_stat_while(s, c, Coq_resvalue_empty(), ls, e1, t2));
    case "Coq_stat_with":
      var e1 = _term_.obj, t2 = _term_.stat;
      return (run_stat_with(s, c, e1, t2));
    case "Coq_stat_throw":
      var e = _term_.arg;
      return (run_stat_throw(s, c, e));
    case "Coq_stat_return":
      var eo = _term_.arg_opt;
      return (run_stat_return(s, c, eo));
    case "Coq_stat_break":
      var so = _term_.label;
      return (result_out(Coq_out_ter(s, res_break(so))));
    case "Coq_stat_continue":
      var so = _term_.label;
      return (result_out(Coq_out_ter(s, res_continue(so))));
    case "Coq_stat_try":
      var t1 = _term_.body, t2o = _term_.catch_stats_opt,
        t3o = _term_.finally_opt;
      return (run_stat_try(s, c, t1, t2o, t3o));
    case "Coq_stat_for":
      var ls = _term_.labels, eo1 = _term_.init, eo2 = _term_.cond,
        eo3 = _term_.step, s0 = _term_.body;
      return (run_stat_for(s, c, ls, eo1, eo2, eo3, s0));
    case "Coq_stat_for_var":
      var ls = _term_.labels, ds = _term_.init, eo2 = _term_.cond,
        eo3 = _term_.step, s0 = _term_.body;
      return (run_stat_for_var(s, c, ls, ds, eo2, eo3, s0));
    case "Coq_stat_for_in":
      var ls = _term_.labels, e1 = _term_.id, e2 = _term_.obj,
        s0 = _term_.body;
      return (
        function (s) {
            Debug.not_yet_implemented_because(__LOC__, s);
            return (Coq_result_impossible());}("stat_for_in"));
    case "Coq_stat_for_in_var":
      var ls = _term_.labels, x = _term_.id, e1o = _term_.init,
        e2 = _term_.obj, s0 = _term_.body;
      return (
        function (s) {
            Debug.not_yet_implemented_because(__LOC__, s);
            return (Coq_result_impossible());}("stat_for_in_var"));
    case "Coq_stat_debugger":
      return (result_out(Coq_out_ter(s, res_empty)));
    case "Coq_stat_switch":
      var labs = _term_.labels, e = _term_.arg, sb = _term_.body;
      return (run_stat_switch(s, c, labs, e, sb));
  }
  
};

var run_elements = function (s, c, _foo_) {
  switch (_foo_.tag) {
    case "[]":
      return (result_out(Coq_out_ter(s, res_normal(Coq_resvalue_empty()))));
    case "::":
      var el = _foo_.head, els_rev_2 = _foo_.tail;
      return (
        if_success(run_elements(s, c, els_rev_2), function(s0, rv0) {
            
            switch (el.tag) {
              case "Coq_element_stat":
                var t = el.stat;
                return (
                  if_ter(run_stat(s0, c, t), function(s1, r1) {
                      
                      var r2 = res_overwrite_value_if_empty(rv0, r1);
                      return (res_out(Coq_out_ter(s1, r2)));}));
              case "Coq_element_func_decl":
                var name = el.func_name, args = el.arg_names, bd = el.body;
                return (res_ter(s0, res_normal(rv0)));
            }
            }));
  }
  
};

var run_prog = function (s, c, _term_) {
  switch (_term_.tag) {
    case "Coq_prog_intro":
      var str = _term_.strictness, els = _term_.elements;
      return (run_elements(s, c, rev(els)));
  }
  
};

var push = function (s, c, l, args, ilen) {
  var vlen = ilen;
  switch (args.tag) {
    case "[]":
      return (
        if_not_throw(
          object_put(s, c, l, "length",
            Coq_value_prim(Coq_prim_number(vlen)), throw_true), function(s0,
          x) {
            
            return (
              result_out(
                Coq_out_ter(s0,
                  res_val(Coq_value_prim(Coq_prim_number(vlen))))));}));
    case "::":
      var v = args.head, vs = args.tail;
      return (
        if_string(to_string(s, c, Coq_value_prim(Coq_prim_number(vlen))),
          function(s0, slen) {
            
            return (
              if_not_throw(object_put(s0, c, l, slen, v, throw_true),
                function(s1, x) { 
                                  return (push(s1, c, l, vs, (ilen + 1.)));}));
          }));
  }
  
};

var run_object_is_sealed = function (s, c, l, _foo_) {
  switch (_foo_.tag) {
    case "[]":
      return (
        if_some(run_object_method(object_extensible_, s, l), function(ext) {
            
            return (
              res_ter(s, res_val(Coq_value_prim(Coq_prim_bool(!(ext))))));}));
    case "::":
      var x = _foo_.head, xs_2 = _foo_.tail;
      return (
        if_run(run_object_get_own_prop(s, c, l, x), function(s0, d) {
            
            switch (d.tag) {
              case "Coq_full_descriptor_undef":
                return (
                  function (s, m) {
                      Debug.impossible_with_heap_because(__LOC__, s, m);
                      return (Coq_result_impossible());}(s0,
                    "[run_object_is_sealed]:  Undefined descriptor found in a place where it shouldn't."));
              case "Coq_full_descriptor_some":
                var a = d.value;
                if (attributes_configurable(a)) {
                  return (
                    res_ter(s0,
                      res_val(Coq_value_prim(Coq_prim_bool(false)))));
                } else {
                  return (run_object_is_sealed(s0, c, l, xs_2));
                }
            }
            }));
  }
  
};

var run_object_seal = function (s, c, l, _foo_) {
  switch (_foo_.tag) {
    case "[]":
      return (
        if_some(run_object_heap_set_extensible(false, s, l), function(s0) {
            
            return (res_ter(s0, res_val(Coq_value_object(l))));}));
    case "::":
      var x = _foo_.head, xs_2 = _foo_.tail;
      return (
        if_run(run_object_get_own_prop(s, c, l, x), function(s0, d) {
            
            switch (d.tag) {
              case "Coq_full_descriptor_undef":
                return (
                  function (s, m) {
                      Debug.impossible_with_heap_because(__LOC__, s, m);
                      return (Coq_result_impossible());}(s0,
                    "[run_object_seal]:  Undefined descriptor found in a place where it shouldn't."));
              case "Coq_full_descriptor_some":
                var a = d.value;
                if (attributes_configurable(a)) {
                  var desc = {
                    descriptor_value: None(),
                    descriptor_writable: None(),
                    descriptor_get: None(),
                    descriptor_set: None(),
                    descriptor_enumerable: None(),
                    descriptor_configurable: Some(false)
                  };
                  var a_2 = attributes_update(a, desc);
                } else {
                  var a_2 = a;
                }
                return (
                  if_bool(
                    object_define_own_prop(s0, c, l, x,
                      descriptor_of_attributes(a_2), true), function(s1,
                    x0) { 
                          return (run_object_seal(s1, c, l, xs_2));}));
            }
            }));
  }
  
};

var run_object_freeze = function (s, c, l, _foo_) {
  switch (_foo_.tag) {
    case "[]":
      return (
        if_some(run_object_heap_set_extensible(false, s, l), function(s0) {
            
            return (res_ter(s0, res_val(Coq_value_object(l))));}));
    case "::":
      var x = _foo_.head, xs_2 = _foo_.tail;
      return (
        if_run(run_object_get_own_prop(s, c, l, x), function(s0, d) {
            
            switch (d.tag) {
              case "Coq_full_descriptor_undef":
                return (
                  function (s, m) {
                      Debug.impossible_with_heap_because(__LOC__, s, m);
                      return (Coq_result_impossible());}(s0,
                    "[run_object_freeze]:  Undefined descriptor found in a place where it shouldn't."));
              case "Coq_full_descriptor_some":
                var a = d.value;
                if ((attributes_is_data_dec(a) && attributes_writable(a))) {
                  var desc = {
                    descriptor_value: None(),
                    descriptor_writable: Some(false),
                    descriptor_get: None(),
                    descriptor_set: None(),
                    descriptor_enumerable: None(),
                    descriptor_configurable: None()
                  };
                  var a_2 = attributes_update(a, desc);
                } else {
                  var a_2 = a;
                }
                if (attributes_configurable(a_2)) {
                  var desc = {
                    descriptor_value: None(),
                    descriptor_writable: None(),
                    descriptor_get: None(),
                    descriptor_set: None(),
                    descriptor_enumerable: None(),
                    descriptor_configurable: Some(false)
                  };
                  var a_3 = attributes_update(a_2, desc);
                } else {
                  var a_3 = a_2;
                }
                return (
                  if_bool(
                    object_define_own_prop(s0, c, l, x,
                      descriptor_of_attributes(a_3), true), function(s1,
                    x0) { 
                          return (run_object_freeze(s1, c, l, xs_2));}));
            }
            }));
  }
  
};

var run_object_is_frozen = function (s, c, l, _foo_) {
  switch (_foo_.tag) {
    case "[]":
      return (
        if_some(run_object_method(object_extensible_, s, l), function(ext) {
            
            return (
              res_ter(s, res_val(Coq_value_prim(Coq_prim_bool(!(ext))))));}));
    case "::":
      var x = _foo_.head, xs_2 = _foo_.tail;
      return (
        if_run(run_object_get_own_prop(s, c, l, x), function(s0, d) {
            
            var check_configurable = function (a) {
              if (attributes_configurable(a)) {
                return (
                  res_ter(s0, res_val(Coq_value_prim(Coq_prim_bool(false)))));
              } else {
                return (run_object_is_frozen(s0, c, l, xs_2));
              }
            };
            switch (d.tag) {
              case "Coq_full_descriptor_undef":
                return (
                  function (s, m) {
                      Debug.impossible_with_heap_because(__LOC__, s, m);
                      return (Coq_result_impossible());}(s0,
                    "[run_object_is_frozen]:  Undefined descriptor found in a place where it shouldn't."));
              case "Coq_full_descriptor_some":
                var a = d.value;
                switch (a.tag) {
                  case "Coq_attributes_data_of":
                    var ad = a.value;
                    if (attributes_writable(Coq_attributes_data_of(ad))) {
                      return (
                        res_ter(s0,
                          res_val(Coq_value_prim(Coq_prim_bool(false)))));
                    } else {
                      return (
                        check_configurable(Coq_attributes_data_of(ad)));
                    }
                  case "Coq_attributes_accessor_of":
                    var aa = a.value;
                    return (
                      check_configurable(Coq_attributes_accessor_of(aa)));
                }
                
            }
            }));
  }
  
};

var run_get_args_for_apply = function (s, c, l, index, n) {
  if ((index < n)) {
    return (
      if_string(to_string(s, c, Coq_value_prim(Coq_prim_number(index))),
        function(s0, sindex) {
          
          return (
            if_value(run_object_get(s0, c, l, sindex), function(s1, v) {
                
                var tail_args = run_get_args_for_apply(s1, c, l,
                                  (index + 1.), n);
                return (
                  if_run(tail_args, function(s2, tail) {
                      
                      return (res_spec(s2, mk_cons(v, tail)));}));}));}));
  } else {
    return (res_spec(s, mk_nil()));
  }
};

var valueToStringForJoin = function (s, c, l, k) {
  return (
    if_string(to_string(s, c, Coq_value_prim(Coq_prim_number(k))),
      function(s0, prop) {
        
        return (
          if_value(run_object_get(s0, c, l, prop), function(s1, v) {
              
              switch (v.tag) {
                case "Coq_value_prim":
                  var p = v.value;
                  switch (p.tag) {
                    case "Coq_prim_undef":
                      return (res_spec(s1, ""));
                    case "Coq_prim_null":
                      return (res_spec(s1, ""));
                    case "Coq_prim_bool":
                      var b = p.value;
                      return (
                        if_string(to_string(s1, c, v), function(s2, s3) {
                            
                            return (res_spec(s2, s3));}));
                    case "Coq_prim_number":
                      var n = p.value;
                      return (
                        if_string(to_string(s1, c, v), function(s2, s3) {
                            
                            return (res_spec(s2, s3));}));
                    case "Coq_prim_string":
                      var s2 = p.value;
                      return (
                        if_string(to_string(s1, c, v), function(s3, s4) {
                            
                            return (res_spec(s3, s4));}));
                  }
                  
                case "Coq_value_object":
                  var o = v.value;
                  return (
                    if_string(to_string(s1, c, v), function(s2, s3) {
                        
                        return (res_spec(s2, s3));}));
              }
              }));}));
};

var run_array_join_elements = function (s, c, l, k, length0, sep, sR) {
  if ((k < length0)) {
    var ss = strappend(sR, sep);
    var sE = valueToStringForJoin(s, c, l, k);
    return (
      if_run(sE, function(s0, element) {
          
          var sR0 = strappend(ss, element);
          return (
            run_array_join_elements(s0, c, l, (k + 1.), length0, sep, sR0));
        }));
  } else {
    return (res_ter(s, res_val(Coq_value_prim(Coq_prim_string(sR)))));
  }
};

var run_call_prealloc = function (s, c, b, vthis, args) {
  switch (b.tag) {
    case "Coq_prealloc_global_is_finite":
      var v = get_arg(0, args);
      return (
        if_number(to_number(s, c, v), function(s0, n) {
            
            return (
              res_ter(s0,
                res_val(
                  Coq_value_prim(
                    Coq_prim_bool(
                      !(
                        ((n === JsNumber.nan)
                        || ((n === JsNumber.infinity)
                           || (n === JsNumber.neg_infinity)))))))));}));
    case "Coq_prealloc_global_is_nan":
      var v = get_arg(0, args);
      return (
        if_number(to_number(s, c, v), function(s0, n) {
            
            return (
              res_ter(s0,
                res_val(Coq_value_prim(Coq_prim_bool((n === JsNumber.nan))))));
          }));
    case "Coq_prealloc_object":
      var value0 = get_arg(0, args);
      switch (value0.tag) {
        case "Coq_value_prim":
          var p = value0.value;
          switch (p.tag) {
            case "Coq_prim_undef":
              return (run_construct_prealloc(s, c, b, args));
            case "Coq_prim_null":
              return (run_construct_prealloc(s, c, b, args));
            case "Coq_prim_bool":
              var b0 = p.value;
              return (to_object(s, value0));
            case "Coq_prim_number":
              var n = p.value;
              return (to_object(s, value0));
            case "Coq_prim_string":
              var s0 = p.value;
              return (to_object(s, value0));
          }
          
        case "Coq_value_object":
          var o = value0.value;
          return (to_object(s, value0));
      }
      
    case "Coq_prealloc_object_get_proto_of":
      var v = get_arg(0, args);
      switch (v.tag) {
        case "Coq_value_prim":
          var p = v.value;
          return (run_error(s, Coq_native_error_type()));
        case "Coq_value_object":
          var l = v.value;
          return (
            if_some(run_object_method(object_proto_, s, l), function(proto) {
                
                return (res_ter(s, res_val(proto)));}));
      }
      
    case "Coq_prealloc_object_get_own_prop_descriptor":
      var v = get_arg(0, args);
      switch (v.tag) {
        case "Coq_value_prim":
          var p = v.value;
          return (run_error(s, Coq_native_error_type()));
        case "Coq_value_object":
          var l = v.value;
          return (
            if_string(to_string(s, c, get_arg(1, args)), function(s1, x) {
                
                return (
                  if_run(run_object_get_own_prop(s1, c, l, x), function(s2,
                    d) { 
                         return (from_prop_descriptor(s2, c, d));}));}));
      }
      
    case "Coq_prealloc_object_define_prop":
      var o = get_arg(0, args);
      var p = get_arg(1, args);
      var attr = get_arg(2, args);
      switch (o.tag) {
        case "Coq_value_prim":
          var p0 = o.value;
          return (run_error(s, Coq_native_error_type()));
        case "Coq_value_object":
          var l = o.value;
          return (
            if_string(to_string(s, c, p), function(s1, name) {
                
                return (
                  if_run(run_to_descriptor(s1, c, attr), function(s2, desc) {
                      
                      return (
                        if_bool(
                          object_define_own_prop(s2, c, l, name, desc, true),
                          function(s3, x) {
                            
                            return (
                              res_ter(s3, res_val(Coq_value_object(l))));}));
                    }));}));
      }
      
    case "Coq_prealloc_object_seal":
      var v = get_arg(0, args);
      switch (v.tag) {
        case "Coq_value_prim":
          var p = v.value;
          return (run_error(s, Coq_native_error_type()));
        case "Coq_value_object":
          var l = v.value;
          return (
            if_some(object_properties_keys_as_list_pickable_option(s, l),
              function(_x_) { 
                              return (run_object_seal(s, c, l, _x_));}));
      }
      
    case "Coq_prealloc_object_freeze":
      var v = get_arg(0, args);
      switch (v.tag) {
        case "Coq_value_prim":
          var p = v.value;
          return (run_error(s, Coq_native_error_type()));
        case "Coq_value_object":
          var l = v.value;
          return (
            if_some(object_properties_keys_as_list_pickable_option(s, l),
              function(_x_) { 
                              return (run_object_freeze(s, c, l, _x_));}));
      }
      
    case "Coq_prealloc_object_prevent_extensions":
      var v = get_arg(0, args);
      switch (v.tag) {
        case "Coq_value_prim":
          var p = v.value;
          return (run_error(s, Coq_native_error_type()));
        case "Coq_value_object":
          var l = v.value;
          return (
            if_some(object_binds_pickable_option(s, l), function(o) {
                
                var o1 = object_with_extension(o, false);
                var s_2 = object_write(s, l, o1);
                return (res_ter(s_2, res_val(Coq_value_object(l))));}));
      }
      
    case "Coq_prealloc_object_is_sealed":
      var v = get_arg(0, args);
      switch (v.tag) {
        case "Coq_value_prim":
          var p = v.value;
          return (run_error(s, Coq_native_error_type()));
        case "Coq_value_object":
          var l = v.value;
          return (
            if_some(object_properties_keys_as_list_pickable_option(s, l),
              function(_x_) { 
                              return (run_object_is_sealed(s, c, l, _x_));}));
      }
      
    case "Coq_prealloc_object_is_frozen":
      var v = get_arg(0, args);
      switch (v.tag) {
        case "Coq_value_prim":
          var p = v.value;
          return (run_error(s, Coq_native_error_type()));
        case "Coq_value_object":
          var l = v.value;
          return (
            if_some(object_properties_keys_as_list_pickable_option(s, l),
              function(_x_) { 
                              return (run_object_is_frozen(s, c, l, _x_));}));
      }
      
    case "Coq_prealloc_object_is_extensible":
      var v = get_arg(0, args);
      switch (v.tag) {
        case "Coq_value_prim":
          var p = v.value;
          return (run_error(s, Coq_native_error_type()));
        case "Coq_value_object":
          var l = v.value;
          return (
            if_some(run_object_method(object_extensible_, s, l),
              function(r) {
                
                return (
                  res_ter(s, res_val(Coq_value_prim(Coq_prim_bool(r)))));}));
      }
      
    case "Coq_prealloc_object_proto_to_string":
      switch (vthis.tag) {
        case "Coq_value_prim":
          var p = vthis.value;
          switch (p.tag) {
            case "Coq_prim_undef":
              return (
                result_out(
                  Coq_out_ter(s,
                    res_val(
                      Coq_value_prim(Coq_prim_string("[object Undefined]"))))));
            case "Coq_prim_null":
              return (
                result_out(
                  Coq_out_ter(s,
                    res_val(Coq_value_prim(Coq_prim_string("[object Null]"))))));
            case "Coq_prim_bool":
              var b0 = p.value;
              return (
                if_object(to_object(s, vthis), function(s1, l) {
                    
                    return (
                      if_some(run_object_method(object_class_, s1, l),
                        function(s0) {
                          
                          return (
                            res_ter(s1,
                              res_val(
                                Coq_value_prim(
                                  Coq_prim_string(
                                    strappend("[object ", strappend(s0, "]")))))));
                        }));}));
            case "Coq_prim_number":
              var n = p.value;
              return (
                if_object(to_object(s, vthis), function(s1, l) {
                    
                    return (
                      if_some(run_object_method(object_class_, s1, l),
                        function(s0) {
                          
                          return (
                            res_ter(s1,
                              res_val(
                                Coq_value_prim(
                                  Coq_prim_string(
                                    strappend("[object ", strappend(s0, "]")))))));
                        }));}));
            case "Coq_prim_string":
              var s0 = p.value;
              return (
                if_object(to_object(s, vthis), function(s1, l) {
                    
                    return (
                      if_some(run_object_method(object_class_, s1, l),
                        function(s2) {
                          
                          return (
                            res_ter(s1,
                              res_val(
                                Coq_value_prim(
                                  Coq_prim_string(
                                    strappend("[object ", strappend(s2, "]")))))));
                        }));}));
          }
          
        case "Coq_value_object":
          var o = vthis.value;
          return (
            if_object(to_object(s, vthis), function(s1, l) {
                
                return (
                  if_some(run_object_method(object_class_, s1, l),
                    function(s0) {
                      
                      return (
                        res_ter(s1,
                          res_val(
                            Coq_value_prim(
                              Coq_prim_string(
                                strappend("[object ", strappend(s0, "]")))))));
                    }));}));
      }
      
    case "Coq_prealloc_object_proto_value_of":
      return (to_object(s, vthis));
    case "Coq_prealloc_object_proto_has_own_prop":
      var v = get_arg(0, args);
      return (
        if_string(to_string(s, c, v), function(s1, x) {
            
            return (
              if_object(to_object(s1, vthis), function(s2, l) {
                  
                  return (
                    if_run(run_object_get_own_prop(s2, c, l, x), function(s3,
                      d) {
                        
                        switch (d.tag) {
                          case "Coq_full_descriptor_undef":
                            return (
                              res_ter(s3,
                                res_val(Coq_value_prim(Coq_prim_bool(false)))));
                          case "Coq_full_descriptor_some":
                            var a = d.value;
                            return (
                              res_ter(s3,
                                res_val(Coq_value_prim(Coq_prim_bool(true)))));
                        }
                        }));}));}));
    case "Coq_prealloc_object_proto_is_prototype_of":
      var v = get_arg(0, args);
      switch (v.tag) {
        case "Coq_value_prim":
          var p = v.value;
          return (
            result_out(
              Coq_out_ter(s, res_val(Coq_value_prim(Coq_prim_bool(false))))));
        case "Coq_value_object":
          var l = v.value;
          return (
            if_object(to_object(s, vthis), function(s1, lo) {
                
                return (object_proto_is_prototype_of(s1, lo, l));}));
      }
      
    case "Coq_prealloc_object_proto_prop_is_enumerable":
      var v = get_arg(0, args);
      return (
        if_string(to_string(s, c, v), function(s1, x) {
            
            return (
              if_object(to_object(s1, vthis), function(s2, l) {
                  
                  return (
                    if_run(run_object_get_own_prop(s2, c, l, x), function(s3,
                      d) {
                        
                        switch (d.tag) {
                          case "Coq_full_descriptor_undef":
                            return (
                              res_ter(s3,
                                res_val(Coq_value_prim(Coq_prim_bool(false)))));
                          case "Coq_full_descriptor_some":
                            var a = d.value;
                            return (
                              res_ter(s3,
                                res_val(
                                  Coq_value_prim(
                                    Coq_prim_bool(attributes_enumerable(a))))));
                        }
                        }));}));}));
    case "Coq_prealloc_function_proto":
      return (
        result_out(Coq_out_ter(s, res_val(Coq_value_prim(Coq_prim_undef())))));
    case "Coq_prealloc_function_proto_to_string":
      if (is_callable_dec(s, vthis)) {
        return (
          function (s) {
              Debug.not_yet_implemented_because(__LOC__, s);
              return (Coq_result_impossible());}(
            "Function.prototype.toString() is implementation dependent."));
      } else {
        return (run_error(s, Coq_native_error_type()));
      }
    case "Coq_prealloc_function_proto_apply":
      var thisArg = get_arg(0, args);
      var argArray = get_arg(1, args);
      if (is_callable_dec(s, vthis)) {
        switch (vthis.tag) {
          case "Coq_value_prim":
            var p = vthis.value;
            return (
              function (s, m) {
                  Debug.impossible_with_heap_because(__LOC__, s, m);
                  return (Coq_result_impossible());}(s,
                "Value is callable, but isn't an object."));
          case "Coq_value_object":
            var thisobj = vthis.value;
            switch (argArray.tag) {
              case "Coq_value_prim":
                var p = argArray.value;
                switch (p.tag) {
                  case "Coq_prim_undef":
                    return (run_call(s, c, thisobj, thisArg, mk_nil()));
                  case "Coq_prim_null":
                    return (run_call(s, c, thisobj, thisArg, mk_nil()));
                  case "Coq_prim_bool":
                    var b0 = p.value;
                    return (run_error(s, Coq_native_error_type()));
                  case "Coq_prim_number":
                    var n = p.value;
                    return (run_error(s, Coq_native_error_type()));
                  case "Coq_prim_string":
                    var s0 = p.value;
                    return (run_error(s, Coq_native_error_type()));
                }
                
              case "Coq_value_object":
                var array = argArray.value;
                return (
                  if_value(run_object_get(s, c, array, "length"),
                    function(s0, v) {
                      
                      return (
                        if_run(to_uint32(s0, c, v), function(s1, ilen) {
                            
                            return (
                              if_run(
                                run_get_args_for_apply(s1, c, array, 0.,
                                  ilen), function(s2, arguments_) {
                                  
                                  return (
                                    run_call(s2, c, thisobj, thisArg,
                                      arguments_));}));}));}));
            }
            
        }
        
      } else {
        return (run_error(s, Coq_native_error_type()));
      }
    case "Coq_prealloc_function_proto_call":
      if (is_callable_dec(s, vthis)) {
        switch (vthis.tag) {
          case "Coq_value_prim":
            var p = vthis.value;
            return (
              function (s, m) {
                  Debug.impossible_with_heap_because(__LOC__, s, m);
                  return (Coq_result_impossible());}(s,
                "Value is callable, but isn't an object."));
          case "Coq_value_object":
            var thisobj = vthis.value;
            var _tuple_arg_29 = get_arg_first_and_rest(args);
            var thisArg = _tuple_arg_29[0], a = _tuple_arg_29[1];
            return (run_call(s, c, thisobj, thisArg, a));
        }
        
      } else {
        return (run_error(s, Coq_native_error_type()));
      }
    case "Coq_prealloc_function_proto_bind":
      if (is_callable_dec(s, vthis)) {
        switch (vthis.tag) {
          case "Coq_value_prim":
            var p = vthis.value;
            return (
              function (s, m) {
                  Debug.impossible_with_heap_because(__LOC__, s, m);
                  return (Coq_result_impossible());}(s,
                "Value is callable, but isn't an object."));
          case "Coq_value_object":
            var thisobj = vthis.value;
            var _tuple_arg_30 = get_arg_first_and_rest(args);
            var vthisArg = _tuple_arg_30[0], a = _tuple_arg_30[1];
            var o1 = object_new(
                       Coq_value_object(
                         Coq_object_loc_prealloc(Coq_prealloc_object_proto())),
                       "Object");
            var o2 = object_with_get(o1, Coq_builtin_get_function());
            var o3 = object_with_details(o2, None(), None(), None(),
                       Some(thisobj), Some(vthisArg), Some(a), None());
            var o4 = object_set_class(o3, "Function");
            var o5 = object_set_proto(o4,
                       Coq_value_object(
                         Coq_object_loc_prealloc(
                           Coq_prealloc_function_proto())));
            var o6 = object_with_invokation(o5,
                       Some(Coq_construct_after_bind()),
                       Some(Coq_call_after_bind()),
                       Some(Coq_builtin_has_instance_after_bind()));
            var o7 = object_set_extensible(o6, true);
            var _tuple_arg_31 = object_alloc(s, o7);
            var l = _tuple_arg_31[0], s_2 = _tuple_arg_31[1];
            var vlength = if_some(
                            run_object_method(object_class_, s_2, thisobj),
                            function(class0) {
                              
                              if (string_eq(class0, "Function")) {
                                return (
                                  if_number(
                                    run_object_get(s_2, c, thisobj, "length"),
                                    function(s10, n) {
                                      
                                      return (
                                        if_run(
                                          to_int32(s10, c,
                                            Coq_value_prim(
                                              Coq_prim_number(n))),
                                          function(s11, ilen) {
                                            
                                            if ((ilen
                                                < number_of_int(
                                                    LibList.length(a)))) {
                                              return (res_spec(s11, 0.));
                                            } else {
                                              return (
                                                res_spec(s11,
                                                  (ilen
                                                  - number_of_int(
                                                      LibList.length(a)))));
                                            }}));}));
                              } else {
                                return (res_spec(s_2, 0.));
                              }});
            return (
              if_run(vlength, function(s10, length0) {
                  
                  var a0 = {
                    attributes_data_value: Coq_value_prim(
                                             Coq_prim_number(length0)),
                    attributes_data_writable: false,
                    attributes_data_enumerable: false,
                    attributes_data_configurable: false
                  };
                  return (
                    if_some(
                      object_heap_map_properties_pickable_option(s10, l,
                        function (p) {
                          return (
                            HeapStr.write(p, "length",
                              Coq_attributes_data_of(a0)));}),
                      function(s11) {
                        
                        var vthrower = Coq_value_object(
                                         Coq_object_loc_prealloc(
                                           Coq_prealloc_throw_type_error()));
                        var a1 = {
                          attributes_accessor_get: vthrower,
                          attributes_accessor_set: vthrower,
                          attributes_accessor_enumerable: false,
                          attributes_accessor_configurable: false
                        };
                        return (
                          if_bool(
                            object_define_own_prop(s11, c, l, "caller",
                              descriptor_of_attributes(
                                Coq_attributes_accessor_of(a1)), false),
                            function(s12, x) {
                              
                              return (
                                if_bool(
                                  object_define_own_prop(s12, c, l,
                                    "arguments",
                                    descriptor_of_attributes(
                                      Coq_attributes_accessor_of(a1)), false),
                                  function(s13, x0) {
                                    
                                    return (
                                      res_ter(s13,
                                        res_val(Coq_value_object(l))));}));}));
                      }));}));
        }
        
      } else {
        return (run_error(s, Coq_native_error_type()));
      }
    case "Coq_prealloc_bool":
      return (
        result_out((function () {
            var v = get_arg(0, args);
            return (
              Coq_out_ter(s,
                res_val(
                  Coq_value_prim(Coq_prim_bool(convert_value_to_boolean(v))))));
          }())));
    case "Coq_prealloc_bool_proto_to_string":
      switch (vthis.tag) {
        case "Coq_value_prim":
          var p = vthis.value;
          switch (p.tag) {
            case "Coq_prim_undef":
              return (run_error(s, Coq_native_error_type()));
            case "Coq_prim_null":
              return (run_error(s, Coq_native_error_type()));
            case "Coq_prim_bool":
              var b0 = p.value;
              return (
                res_ter(s,
                  res_val(
                    Coq_value_prim(
                      Coq_prim_string(convert_bool_to_string(b0))))));
            case "Coq_prim_number":
              var n = p.value;
              return (run_error(s, Coq_native_error_type()));
            case "Coq_prim_string":
              var s0 = p.value;
              return (run_error(s, Coq_native_error_type()));
          }
          
        case "Coq_value_object":
          var l = vthis.value;
          return (
            ifx_some_or_default(run_object_method(object_class_, s, l),
              run_error(s, Coq_native_error_type()), function (s0) {
                if (string_eq(s0, "Boolean")) {
                  return (
                    ifx_some_or_default(
                      run_object_method(object_prim_value_, s, l),
                      run_error(s, Coq_native_error_type()), function (wo) {
                        switch (wo.tag) {
                          case "Some":
                            var v = wo.value;
                            switch (v.tag) {
                              case "Coq_value_prim":
                                var p = v.value;
                                switch (p.tag) {
                                  case "Coq_prim_undef":
                                    return (
                                      run_error(s, Coq_native_error_type()));
                                  case "Coq_prim_null":
                                    return (
                                      run_error(s, Coq_native_error_type()));
                                  case "Coq_prim_bool":
                                    var b0 = p.value;
                                    return (
                                      res_ter(s,
                                        res_val(
                                          Coq_value_prim(
                                            Coq_prim_string(
                                              convert_bool_to_string(b0))))));
                                  case "Coq_prim_number":
                                    var n = p.value;
                                    return (
                                      run_error(s, Coq_native_error_type()));
                                  case "Coq_prim_string":
                                    var s1 = p.value;
                                    return (
                                      run_error(s, Coq_native_error_type()));
                                }
                                
                              case "Coq_value_object":
                                var o = v.value;
                                return (
                                  run_error(s, Coq_native_error_type()));
                            }
                            
                          case "None":
                            return (run_error(s, Coq_native_error_type()));
                        }
                        }));
                } else {
                  return (run_error(s, Coq_native_error_type()));
                }}));
      }
      
    case "Coq_prealloc_bool_proto_value_of":
      switch (vthis.tag) {
        case "Coq_value_prim":
          var p = vthis.value;
          switch (p.tag) {
            case "Coq_prim_undef":
              return (run_error(s, Coq_native_error_type()));
            case "Coq_prim_null":
              return (run_error(s, Coq_native_error_type()));
            case "Coq_prim_bool":
              var b0 = p.value;
              return (
                res_ter(s, res_val(Coq_value_prim(Coq_prim_bool(b0)))));
            case "Coq_prim_number":
              var n = p.value;
              return (run_error(s, Coq_native_error_type()));
            case "Coq_prim_string":
              var s0 = p.value;
              return (run_error(s, Coq_native_error_type()));
          }
          
        case "Coq_value_object":
          var l = vthis.value;
          return (
            ifx_some_or_default(run_object_method(object_class_, s, l),
              run_error(s, Coq_native_error_type()), function (s0) {
                if (string_eq(s0, "Boolean")) {
                  return (
                    ifx_some_or_default(
                      run_object_method(object_prim_value_, s, l),
                      run_error(s, Coq_native_error_type()), function (wo) {
                        switch (wo.tag) {
                          case "Some":
                            var v = wo.value;
                            switch (v.tag) {
                              case "Coq_value_prim":
                                var p = v.value;
                                switch (p.tag) {
                                  case "Coq_prim_undef":
                                    return (
                                      run_error(s, Coq_native_error_type()));
                                  case "Coq_prim_null":
                                    return (
                                      run_error(s, Coq_native_error_type()));
                                  case "Coq_prim_bool":
                                    var b0 = p.value;
                                    return (
                                      res_ter(s,
                                        res_val(
                                          Coq_value_prim(Coq_prim_bool(b0)))));
                                  case "Coq_prim_number":
                                    var n = p.value;
                                    return (
                                      run_error(s, Coq_native_error_type()));
                                  case "Coq_prim_string":
                                    var s1 = p.value;
                                    return (
                                      run_error(s, Coq_native_error_type()));
                                }
                                
                              case "Coq_value_object":
                                var o = v.value;
                                return (
                                  run_error(s, Coq_native_error_type()));
                            }
                            
                          case "None":
                            return (run_error(s, Coq_native_error_type()));
                        }
                        }));
                } else {
                  return (run_error(s, Coq_native_error_type()));
                }}));
      }
      
    case "Coq_prealloc_number":
      if (list_eq_nil_decidable(args)) {
        return (
          result_out(
            Coq_out_ter(s,
              res_val(Coq_value_prim(Coq_prim_number(JsNumber.zero))))));
      } else {
        var v = get_arg(0, args);return (to_number(s, c, v));
      }
    case "Coq_prealloc_number_proto_value_of":
      switch (vthis.tag) {
        case "Coq_value_prim":
          var p = vthis.value;
          switch (p.tag) {
            case "Coq_prim_undef":
              return (run_error(s, Coq_native_error_type()));
            case "Coq_prim_null":
              return (run_error(s, Coq_native_error_type()));
            case "Coq_prim_bool":
              var b0 = p.value;
              return (run_error(s, Coq_native_error_type()));
            case "Coq_prim_number":
              var n = p.value;
              return (
                res_ter(s, res_val(Coq_value_prim(Coq_prim_number(n)))));
            case "Coq_prim_string":
              var s0 = p.value;
              return (run_error(s, Coq_native_error_type()));
          }
          
        case "Coq_value_object":
          var l = vthis.value;
          return (
            ifx_some_or_default(run_object_method(object_class_, s, l),
              run_error(s, Coq_native_error_type()), function (s0) {
                if (string_eq(s0, "Number")) {
                  return (
                    ifx_some_or_default(
                      run_object_method(object_prim_value_, s, l),
                      run_error(s, Coq_native_error_type()), function (wo) {
                        switch (wo.tag) {
                          case "Some":
                            var v = wo.value;
                            switch (v.tag) {
                              case "Coq_value_prim":
                                var p = v.value;
                                switch (p.tag) {
                                  case "Coq_prim_undef":
                                    return (
                                      run_error(s, Coq_native_error_type()));
                                  case "Coq_prim_null":
                                    return (
                                      run_error(s, Coq_native_error_type()));
                                  case "Coq_prim_bool":
                                    var b0 = p.value;
                                    return (
                                      run_error(s, Coq_native_error_type()));
                                  case "Coq_prim_number":
                                    var n = p.value;
                                    return (
                                      res_ter(s,
                                        res_val(
                                          Coq_value_prim(Coq_prim_number(n)))));
                                  case "Coq_prim_string":
                                    var s1 = p.value;
                                    return (
                                      run_error(s, Coq_native_error_type()));
                                }
                                
                              case "Coq_value_object":
                                var o = v.value;
                                return (
                                  run_error(s, Coq_native_error_type()));
                            }
                            
                          case "None":
                            return (run_error(s, Coq_native_error_type()));
                        }
                        }));
                } else {
                  return (run_error(s, Coq_native_error_type()));
                }}));
      }
      
    case "Coq_prealloc_array":
      return (run_construct_prealloc(s, c, Coq_prealloc_array(), args));
    case "Coq_prealloc_array_is_array":
      var arg = get_arg(0, args);
      switch (arg.tag) {
        case "Coq_value_prim":
          var p = arg.value;
          return (res_ter(s, res_val(Coq_value_prim(Coq_prim_bool(false)))));
        case "Coq_value_object":
          var arg0 = arg.value;
          return (
            if_some(run_object_method(object_class_, s, arg0),
              function(class0) {
                
                if (string_eq(class0, "Array")) {
                  return (
                    res_ter(s, res_val(Coq_value_prim(Coq_prim_bool(true)))));
                } else {
                  return (
                    res_ter(s, res_val(Coq_value_prim(Coq_prim_bool(false)))));
                }}));
      }
      
    case "Coq_prealloc_array_proto_to_string":
      return (
        if_object(to_object(s, vthis), function(s0, array) {
            
            return (
              if_value(run_object_get(s0, c, array, "join"), function(s1,
                vfunc) {
                  
                  if (is_callable_dec(s1, vfunc)) {
                    switch (vfunc.tag) {
                      case "Coq_value_prim":
                        var p = vfunc.value;
                        return (
                          function (s, m) {
                              Debug.impossible_with_heap_because(__LOC__, s,
                                m);
                              return (Coq_result_impossible());}(s1,
                            "Value is callable, but isn't an object."));
                      case "Coq_value_object":
                        var func = vfunc.value;
                        return (
                          run_call(s1, c, func, Coq_value_object(array),
                            mk_nil()));
                    }
                    
                  } else {
                    return (
                      run_call_prealloc(s1, c,
                        Coq_prealloc_object_proto_to_string(),
                        Coq_value_object(array), mk_nil()));
                  }}));}));
    case "Coq_prealloc_array_proto_join":
      var vsep = get_arg(0, args);
      return (
        if_object(to_object(s, vthis), function(s0, l) {
            
            return (
              if_value(run_object_get(s0, c, l, "length"), function(s1,
                vlen) {
                  
                  return (
                    if_run(to_uint32(s1, c, vlen), function(s2, ilen) {
                        
                        if (!(
                              value_compare(vsep,
                                Coq_value_prim(Coq_prim_undef())))) {
                          var rsep = vsep;
                        } else {
                          var rsep = Coq_value_prim(Coq_prim_string(","));
                        }
                        return (
                          if_string(to_string(s2, c, rsep), function(s3,
                            sep) {
                              
                              if ((ilen == 0.0)) {
                                return (
                                  res_ter(s3,
                                    res_val(
                                      Coq_value_prim(Coq_prim_string("")))));
                              } else {
                                var sR = valueToStringForJoin(s3, c, l, 0.);
                                return (
                                  if_run(sR, function(s4, sR0) {
                                      
                                      return (
                                        run_array_join_elements(s4, c, l, 1.,
                                          ilen, sep, sR0));}));
                              }}));}));}));}));
    case "Coq_prealloc_array_proto_pop":
      return (
        if_object(to_object(s, vthis), function(s0, l) {
            
            return (
              if_value(run_object_get(s0, c, l, "length"), function(s1,
                vlen) {
                  
                  return (
                    if_run(to_uint32(s1, c, vlen), function(s2, ilen) {
                        
                        if ((ilen == 0.0)) {
                          return (
                            if_not_throw(
                              object_put(s2, c, l, "length",
                                Coq_value_prim(
                                  Coq_prim_number(JsNumber.zero)),
                                throw_true), function(s3, x) {
                                
                                return (
                                  result_out(
                                    Coq_out_ter(s3,
                                      res_val(
                                        Coq_value_prim(Coq_prim_undef())))));
                              }));
                        } else {
                          return (
                            if_string(
                              to_string(s2, c,
                                Coq_value_prim(Coq_prim_number((ilen - 1.)))),
                              function(s3, sindx) {
                                
                                return (
                                  if_value(run_object_get(s3, c, l, sindx),
                                    function(s4, velem) {
                                      
                                      return (
                                        if_not_throw(
                                          object_delete_default(s4, c, l,
                                            sindx, throw_true), function(s5,
                                          x) {
                                            
                                            return (
                                              if_not_throw(
                                                object_put(s5, c, l,
                                                  "length",
                                                  Coq_value_prim(
                                                    Coq_prim_string(sindx)),
                                                  throw_true), function(s6,
                                                x0) {
                                                  
                                                  return (
                                                    result_out(
                                                      Coq_out_ter(s6,
                                                        res_val(velem))));}));
                                          }));}));}));
                        }}));}));}));
    case "Coq_prealloc_array_proto_push":
      return (
        if_object(to_object(s, vthis), function(s0, l) {
            
            return (
              if_value(run_object_get(s0, c, l, "length"), function(s1,
                vlen) {
                  
                  return (
                    if_run(to_uint32(s1, c, vlen), function(s2, ilen) {
                        
                        return (push(s2, c, l, args, ilen));}));}));}));
    case "Coq_prealloc_string":
      if (list_eq_nil_decidable(args)) {
        return (res_ter(s, res_val(Coq_value_prim(Coq_prim_string("")))));
      } else {
        var value0 = get_arg(0, args);
        return (
          if_string(to_string(s, c, value0), function(s0, s1) {
              
              return (
                res_ter(s0, res_val(Coq_value_prim(Coq_prim_string(s1)))));}));
      }
    case "Coq_prealloc_string_proto_to_string":
      switch (vthis.tag) {
        case "Coq_value_prim":
          var p = vthis.value;
          if (type_compare(type_of(vthis), Coq_type_string())) {
            return (res_ter(s, res_val(vthis)));
          } else {
            return (run_error(s, Coq_native_error_type()));
          }
        case "Coq_value_object":
          var l = vthis.value;
          return (
            if_some(run_object_method(object_class_, s, l), function(s0) {
                
                if (string_eq(s0, "String")) {
                  return (run_object_prim_value(s, l));
                } else {
                  return (run_error(s, Coq_native_error_type()));
                }}));
      }
      
    case "Coq_prealloc_string_proto_value_of":
      switch (vthis.tag) {
        case "Coq_value_prim":
          var p = vthis.value;
          if (type_compare(type_of(vthis), Coq_type_string())) {
            return (res_ter(s, res_val(vthis)));
          } else {
            return (run_error(s, Coq_native_error_type()));
          }
        case "Coq_value_object":
          var l = vthis.value;
          return (
            if_some(run_object_method(object_class_, s, l), function(s0) {
                
                if (string_eq(s0, "String")) {
                  return (run_object_prim_value(s, l));
                } else {
                  return (run_error(s, Coq_native_error_type()));
                }}));
      }
      
    case "Coq_prealloc_error":
      var v = get_arg(0, args);
      return (
        build_error(s,
          Coq_value_object(
            Coq_object_loc_prealloc(Coq_prealloc_error_proto())), v));
    case "Coq_prealloc_native_error":
      var ne = b.error;
      var v = get_arg(0, args);
      return (
        build_error(s,
          Coq_value_object(
            Coq_object_loc_prealloc(Coq_prealloc_native_error_proto(ne))), v));
    case "Coq_prealloc_throw_type_error":
      return (run_error(s, Coq_native_error_type()));
    default:
      return (
        function (s) {
            Debug.not_yet_implemented_because(__LOC__, s);
            return (Coq_result_impossible());}(
          strappend("Call prealloc_",
            strappend(string_of_prealloc(b), " not yet implemented"))));
  }
  
};

var run_call = function (s, c, l, vthis, args) {
  return (
    if_some(run_object_method(object_call_, s, l), function(co) {
        
        return (
          if_some(co, function(c0) {
              
              switch (c0.tag) {
                case "Coq_call_default":
                  return (entering_func_code(s, c, l, vthis, args));
                case "Coq_call_after_bind":
                  return (
                    if_some(run_object_method(object_bound_args_, s, l),
                      function(oarg) {
                        
                        return (
                          if_some(oarg, function(boundArgs) {
                              
                              return (
                                if_some(
                                  run_object_method(object_bound_this_, s, l),
                                  function(obnd) {
                                    
                                    return (
                                      if_some(obnd, function(boundThis) {
                                          
                                          return (
                                            if_some(
                                              run_object_method(
                                                object_target_function_, s,
                                                l), function(otrg) {
                                                
                                                return (
                                                  if_some(otrg,
                                                    function(target) {
                                                      
                                                      var arguments_ = 
                                                      LibList.append(
                                                        boundArgs, args);
                                                      return (
                                                        run_call(s, c,
                                                          target, boundThis,
                                                          arguments_));}));}));
                                        }));}));}));}));
                case "Coq_call_prealloc":
                  var b = c0.prealloc;
                  return (run_call_prealloc(s, c, b, vthis, args));
              }
              }));}));
};

var run_javascript_from_state = function (s, p) {
  var c = execution_ctx_initial(prog_intro_strictness(p));
  return (
    if_void(
      execution_ctx_binding_inst(s, c, Coq_codetype_global(), None(), p,
        mk_nil()), function(s_2) { 
                                   return (run_prog(s_2, c, p));}));
};

var run_javascript_from_result = function (w, p) {
  return (
    if_success(w, function(s, _pat_any_32) {
        
        return (run_javascript_from_state(s, p));}));
};

var run_javascript = function (p) {
  return (run_javascript_from_state(state_initial, p));
};
}// end of with Datatypes
}// end of with JsCommon
}// end of with JsCommonAux
}// end of with JsInit
}// end of with JsInterpreterMonads
}// end of with JsPreliminary
}// end of with JsSyntax
}// end of with JsSyntaxAux
}// end of with LibList
}// end of with LibOption
}// end of with LibProd
}// end of with List0
}// end of with Shared

return {
  convert_number_to_bool: convert_number_to_bool, 
  convert_string_to_bool: convert_string_to_bool, 
  convert_prim_to_boolean: convert_prim_to_boolean, 
  convert_value_to_boolean: convert_value_to_boolean, 
  convert_prim_to_number: convert_prim_to_number, 
  convert_number_to_integer: convert_number_to_integer, 
  convert_bool_to_string: convert_bool_to_string, 
  convert_prim_to_string: convert_prim_to_string, 
  equality_test_for_same_type: equality_test_for_same_type, 
  strict_equality_test: strict_equality_test, 
  inequality_test_number: inequality_test_number, 
  inequality_test_string: inequality_test_string, 
  inequality_test_primitive: inequality_test_primitive, 
  typeof_prim: typeof_prim, 
  string_of_propname: string_of_propname, 
  build_error: build_error, 
  run_error: run_error, 
  out_error_or_void: out_error_or_void, 
  out_error_or_cst: out_error_or_cst, 
  run_object_method: run_object_method, 
  run_object_heap_set_extensible: run_object_heap_set_extensible, 
  object_has_prop: object_has_prop, 
  object_get_builtin: object_get_builtin, 
  run_object_get: run_object_get, 
  run_object_get_prop: run_object_get_prop, 
  object_proto_is_prototype_of: object_proto_is_prototype_of, 
  object_default_value: object_default_value, 
  to_primitive: to_primitive, 
  to_number: to_number, 
  to_integer: to_integer, 
  to_int32: to_int32, 
  to_uint32: to_uint32, 
  to_string: to_string, 
  object_can_put: object_can_put, 
  run_object_define_own_prop_array_loop: run_object_define_own_prop_array_loop, 
  object_define_own_prop: object_define_own_prop, 
  run_to_descriptor: run_to_descriptor, 
  prim_new_object: prim_new_object, 
  to_object: to_object, 
  run_object_prim_value: run_object_prim_value, 
  prim_value_get: prim_value_get, 
  env_record_has_binding: env_record_has_binding, 
  lexical_env_get_identifier_ref: lexical_env_get_identifier_ref, 
  object_delete_default: object_delete_default, 
  object_delete: object_delete, 
  env_record_delete_binding: env_record_delete_binding, 
  env_record_implicit_this_value: env_record_implicit_this_value, 
  identifier_resolution: identifier_resolution, 
  env_record_get_binding_value: env_record_get_binding_value, 
  ref_get_value: ref_get_value, 
  run_expr_get_value: run_expr_get_value, 
  object_put_complete: object_put_complete, 
  object_put: object_put, 
  env_record_set_mutable_binding: env_record_set_mutable_binding, 
  prim_value_put: prim_value_put, 
  ref_put_value: ref_put_value, 
  env_record_create_mutable_binding: env_record_create_mutable_binding, 
  env_record_create_set_mutable_binding: env_record_create_set_mutable_binding, 
  env_record_create_immutable_binding: env_record_create_immutable_binding, 
  env_record_initialize_immutable_binding: env_record_initialize_immutable_binding, 
  call_object_new: call_object_new, 
  array_args_map_loop: array_args_map_loop, 
  string_of_prealloc: string_of_prealloc, 
  run_construct_prealloc: run_construct_prealloc, 
  run_construct_default: run_construct_default, 
  run_construct: run_construct, 
  run_call_default: run_call_default, 
  creating_function_object_proto: creating_function_object_proto, 
  creating_function_object: creating_function_object, 
  binding_inst_formal_params: binding_inst_formal_params, 
  binding_inst_function_decls: binding_inst_function_decls, 
  make_arg_getter: make_arg_getter, 
  make_arg_setter: make_arg_setter, 
  arguments_object_map_loop: arguments_object_map_loop, 
  arguments_object_map: arguments_object_map, 
  create_arguments_object: create_arguments_object, 
  binding_inst_arg_obj: binding_inst_arg_obj, 
  binding_inst_var_decls: binding_inst_var_decls, 
  execution_ctx_binding_inst: execution_ctx_binding_inst, 
  entering_func_code: entering_func_code, 
  run_object_get_own_prop: run_object_get_own_prop, 
  run_function_has_instance: run_function_has_instance, 
  run_object_has_instance: run_object_has_instance, 
  from_prop_descriptor: from_prop_descriptor, 
  run_equal: run_equal, 
  convert_twice: convert_twice, 
  convert_twice_primitive: convert_twice_primitive, 
  convert_twice_number: convert_twice_number, 
  convert_twice_string: convert_twice_string, 
  issome: issome, 
  run_binary_op_add: run_binary_op_add, 
  run_binary_op_arith: run_binary_op_arith, 
  run_binary_op_shift: run_binary_op_shift, 
  run_binary_op_bitwise: run_binary_op_bitwise, 
  run_binary_op_compare: run_binary_op_compare, 
  run_binary_op_instanceof: run_binary_op_instanceof, 
  run_binary_op_in: run_binary_op_in, 
  run_binary_op: run_binary_op, 
  run_prepost_op: run_prepost_op, 
  run_typeof_value: run_typeof_value, 
  run_unary_op: run_unary_op, 
  create_new_function_in: create_new_function_in, 
  init_object: init_object, 
  run_array_element_list: run_array_element_list, 
  init_array: init_array, 
  run_var_decl_item: run_var_decl_item, 
  run_var_decl: run_var_decl, 
  run_list_expr: run_list_expr, 
  run_block: run_block, 
  run_binary_op_and: run_binary_op_and, 
  run_binary_op_or: run_binary_op_or, 
  run_expr_binary_op: run_expr_binary_op, 
  run_expr_access: run_expr_access, 
  run_expr_assign: run_expr_assign, 
  run_expr_function: run_expr_function, 
  entering_eval_code: entering_eval_code, 
  run_eval: run_eval, 
  run_expr_call: run_expr_call, 
  run_expr_conditionnal: run_expr_conditionnal, 
  run_expr_new: run_expr_new, 
  run_stat_label: run_stat_label, 
  run_stat_with: run_stat_with, 
  run_stat_if: run_stat_if, 
  run_stat_while: run_stat_while, 
  run_stat_switch_end: run_stat_switch_end, 
  run_stat_switch_no_default: run_stat_switch_no_default, 
  run_stat_switch_with_default_default: run_stat_switch_with_default_default, 
  run_stat_switch_with_default_B: run_stat_switch_with_default_B, 
  run_stat_switch_with_default_A: run_stat_switch_with_default_A, 
  run_stat_switch: run_stat_switch, 
  run_stat_do_while: run_stat_do_while, 
  run_stat_try: run_stat_try, 
  run_stat_throw: run_stat_throw, 
  run_stat_return: run_stat_return, 
  run_stat_for_loop: run_stat_for_loop, 
  run_stat_for: run_stat_for, 
  run_stat_for_var: run_stat_for_var, 
  run_expr: run_expr, 
  run_stat: run_stat, 
  run_elements: run_elements, 
  run_prog: run_prog, 
  push: push, 
  run_object_is_sealed: run_object_is_sealed, 
  run_object_seal: run_object_seal, 
  run_object_freeze: run_object_freeze, 
  run_object_is_frozen: run_object_is_frozen, 
  run_get_args_for_apply: run_get_args_for_apply, 
  valueToStringForJoin: valueToStringForJoin, 
  run_array_join_elements: run_array_join_elements, 
  run_call_prealloc: run_call_prealloc, 
  run_call: run_call, 
  run_javascript_from_state: run_javascript_from_state, 
  run_javascript_from_result: run_javascript_from_result, 
  run_javascript: run_javascript};
})();

/* --------------------- tests/jsref/ModuleExport.js --------------------- */

// Export the JsInterpreter ML module as a NodeJS module
try {
  module.exports = JsInterpreter;
} catch (e) {}
