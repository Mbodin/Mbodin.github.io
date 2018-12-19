
function loadJSRef (dest, cont){
    dest = dest || "jsrefrespond"
    cont = cont || function (){}

    var respondNode = document.getElementById (dest)

    var libraries = [
            "assembly.js", // "http://ajacs.inria.fr/jsexplain/generator/tests/jsref/assembly.js",
            "esprima-to-ast.js", // "http://ajacs.inria.fr/jsexplain/esprima-to-ast.js",
            "esprima.js" // "http://ajacs.inria.fr/jsexplain/node_modules/esprima/esprima.js"
        ]

    var load = function (){
            if (libraries.length === 0){
                setContent (respondNode, "JSRef successfully loaded")
                shineRespond (respondNode)
                cont ()
                return
            }

            var currentFile = libraries.pop ()

            fetchPage (respondNode, currentFile, function (file){
                    try {
                        eval.call (globalObject (), file)
                        load ()
                    } catch (e){
                        setContent (respondNode, "An error occurred during the loading of the library " + currentFile + "…")
                        shineRespond (respondNode)
                    }
                })
        }

    load ()
}

function JSParse (source, name){
    return esprimaToAST (esprima.parse (source, {loc: true, range: true}), source, name)
}

function JSRef (source, log){
    return CoqToValue (JsInterpreter.run_javascript (JSParse (source)), log)
}

var persistantJSResult = null

function JSRefPersistant (source, log){
    var initialisingProgram =
        "var console = { _logs: [], log: function (a){ this._logs.push (a) } }"

    if (!persistantJSResult)
        persistantJSResult =
            JsInterpreter.run_javascript (JSParse (initialisingProgram))

    persistantJSResult =
        JsInterpreter.run_javascript_from_result (persistantJSResult, JSParse (source))

    var v = CoqToValue (persistantJSResult)

    convertToANormalResultAndSimulateLogs (persistantJSResult, log)

    return v
}

function simulateLogs (log){
    function isEmptyLog (){
        return getCompletionTripleValue (
            JsInterpreter.run_javascript_from_result (persistantJSResult,
                JSParse ("console._logs.length !== 0")), true) !== "false"
    }

    while (isEmptyLog ()){
        persistantJSResult =
            JsInterpreter.run_javascript_from_result (persistantJSResult,
                JSParse ("console._logs.pop ()"))
    
        log (getCompletionTripleValue (persistantJSResult, true))
    }
}

function CoqToValue (r){
    if (r.tag === "Coq_result_some" && r.value !== undefined){
        r = r.value
        if (r.tag === "Coq_specret_val")
            return "<Specret_val>"
        else if (r.tag === "Coq_specret_out" && r.out !== undefined){
            r = r.out
            if (r.tag === "Coq_out_ter" && r.res !== undefined){
                r = r.res
                var t = "<Unknown kind>"
                if (r.res_type.tag === "Coq_restype_normal") t = "Normal"
                else if (r.res_type.tag === "Coq_restype_break") t = "Break"
                else if (r.res_type.tag === "Coq_restype_continue") t = "Continue"
                else if (r.res_type.tag === "Coq_restype_return") t = "Return"
                else if (r.res_type.tag === "Coq_restype_throw") t = "Throw"
                var v = "<Unknown value>"
                if (r.res_value.tag === "Coq_resvalue_value" && r.res_value.value !== undefined){
                    if (r.res_value.value.tag === "Coq_value_prim" && r.res_value.value.value !== undefined)
                        v = "Value: " + JsInterpreter.convert_prim_to_string (r.res_value.value.value)
                    else if (r.res_value.value.tag === "Coq_value_object") v = "<Location>"
                } else if (r.res_value.tag === "Coq_resvalue_empty") v = "<Empty>"
                else if (r.res_value.tag === "Coq_resvalue_ref") v = "<ref>"
                var l = "<Unknown label>"
                if (r.res_label.tag === "Coq_label_empty") l = "<Empty>"
                else if (r.res_label.tag === "Coq_label_string") l = '"' + r.res_label.value + '"'
                return "Completion triple: (" + t + ", " + v + ", " + l + ")"
            }
        }
    } else if (r.tag === "Coq_result_not_yet_implemented")
        return "<Not yet implemented in JSRef>"
    else if (r.tag === "Coq_result_impossible")
        return "<Internal invariant have been broken, this should be impossible>"
    else if (r.tag === "Coq_result_bottom")
        return "<Out of fuel>"
    return "Unknown kind of result: " + JSON.stringify (r)
}

function convertToANormalResultAndSimulateLogs (r, log){
    if (r.tag === "Coq_result_some" && r.value !== undefined){
        r = r.value
        if (r.tag === "Coq_specret_out" && r.out !== undefined){
            r = r.out
            if (r.tag === "Coq_out_ter" && r.res !== undefined){
                r = r.res
                r.res_type.tag = "Coq_restype_normal" // This is a hack. Thanks to this, the variable persistantJSResult will not conserve flow-control-breaking behaviours.
                simulateLogs (log)
            }
        }
    }
}

function getCompletionTripleValue (r, simple){
    if (r.tag === "Coq_result_some" && r.value !== undefined){
        r = r.value
        if (r.tag === "Coq_specret_out" && r.out !== undefined){
            r = r.out
            if (r.tag === "Coq_out_ter" && r.res !== undefined){
                r = r.res
                if (r.res_value.tag === "Coq_resvalue_value" && r.res_value.value !== undefined){
                    if (r.res_value.value.tag === "Coq_value_prim" && r.res_value.value.value !== undefined)
                        return (simple ? "" : "Value: ") + JsInterpreter.convert_prim_to_string (r.res_value.value.value)
                    else if (r.res_value.value.tag === "Coq_value_object")
                       return  "<Location>"
                } else if (r.res_value.tag === "Coq_resvalue_empty")
                    return "<Empty>"
                else if (r.res_value.tag === "Coq_resvalue_ref")
                    return "<ref>"
                return "<Unknown value>"
            }
        }
    }
    return "<Not a value, this should not happen>"
}

function runJSRef (){
    var respondNode = document.getElementById ("jsrefrespond")

    if (!respondNode) return

    var input = document.getElementById ("jsrefinput")

    if (!input){
        setContent (respondNode, "Input not found, sorry.")
    } else {

        try {
            var ret = JSRef (input.value)
            setContent (respondNode, "Evaluation success with result: " + ret)
        } catch (e){
            setContent (respondNode, "An error occurred during the evaluation: " + e)
        }

    }
    shineRespond (respondNode)
}

loadJSRef ()

