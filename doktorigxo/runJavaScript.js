
function shineRespond (respondNode){
    if (!respondNode) return

    if (respondNode.timeout !== undefined)
        clearTimeout (respondNode.RespondTimeout)

    respondNode.setAttribute ("class", "programResult")
    respondNode.RespondTimeout = setTimeout (function (){
            respondNode.setAttribute ("class", "program")
        }, 1000)
}

var javaScriptInterpreter

var JavaScriptResultsToBeUpdated = []

;

function clearJavaScriptResultsToBeUpdated (){
    iterTab (JavaScriptResultsToBeUpdated, function (n){
            clearNode (n) // To avoid putting unexpected things in the second argument.
        })

    JavaScriptResultsToBeUpdated = []
}

function chooseEvalInterpreter (){
    var aNode = document.getElementById ("chooseEval")
    if (aNode) aNode.setAttribute ("class", "invisible")
    clearJavaScriptResultsToBeUpdated ()

    javaScriptInterpreter = function (prog, log){
            with ({ console: { log: log } }){
                return eval (prog)
            }
        }

    aNode = document.getElementById ("chooseJSRef")
    if (aNode) aNode.setAttribute ("class", "")
}

function prepareTheLoadOfJSRef (cont){
    var respondNode = document.getElementById ("jsrefrespond")

    fetchPage (respondNode, "jsref.js", function (file){
            try {
                eval.call (globalObject (), file)
                loadJSRef (undefined, cont)
            } catch (_){
                setContent (respondNode, "An error occurred during the loading of JSRef.")
                shineRespond (respondNode)
            }
        })
}

function chooseJSRef (){
    var aNode = document.getElementById ("chooseJSRef")
    if (aNode) aNode.setAttribute ("class", "invisible")
    clearJavaScriptResultsToBeUpdated ()

    try {
        javaScriptInterpreter = JSRefPersistant

        aNode = document.getElementById ("chooseEval")
        if (aNode) aNode.setAttribute ("class", "")
    } catch (_){
        // The variable does not exist, we have to first load JSRef.
        prepareTheLoadOfJSRef (function (){
                javaScriptInterpreter = JSRefPersistant

                aNode = document.getElementById ("chooseEval")
                if (aNode) aNode.setAttribute ("class", "")
            })
    }
}

chooseEvalInterpreter ()

;

function runJavaScript (prog){
    try {
        var logs = []
        var result
        result = javaScriptInterpreter (prog, function (v){
                console.log (v)
                logs.push (v)
            })
        if (logs.length === 0)
            return "Run successful. Result: " + result
        else if (logs.length === 1)
            return "Run successful with the following log: “" + logs[0] + "”. Result: " + result
        else {
            var str = "Run successful with the following logs: “" + logs[0] +"”"
            for (var i = 1; i < logs.length - 1; i++)
                str += ", “" + logs[i] + "”"
            return str + ", and “" + logs[logs.length - 1] + "”. Result: " + result
        }
    } catch (e){
        return "Run resulted in an exception: " + e
    }
}

function fetchPage (respondNode, filename, cont){
    setContent (respondNode, "Fetching " + filename + "…")

    var xhttp = new XMLHttpRequest ()
    xhttp.overrideMimeType ('text/plain')
    xhttp.onreadystatechange = function (){
        if (xhttp.readyState === 4){
            if (xhttp.status === 200){
                cont (xhttp.responseText)
            } else {
                setContent (respondNode,
                    "Sorry, an error happened when fetching " + filename + ".")
                shineRespond (respondNode)
            }
        }
    }
    xhttp.open ("GET", filename, true)
    xhttp.send ()
}

function downloadAndRunJavaScript (prog, dest){
    dest = dest || prog

    var respondNode = document.getElementById (dest)

    if (!respondNode) return

    JavaScriptResultsToBeUpdated.push (respondNode)

    var filename = prog + ".js"

    fetchPage (respondNode, filename, function (prog){
            setContent (respondNode, runJavaScript (prog))
            shineRespond (respondNode)
        })
}

function readAndRunAnalyser (analyser, before){
    return function (prog, dest, rem){
        dest = dest || (prog + "output")

        var respondNode = document.getElementById (dest)

        if (!respondNode) return

        if (before) before (respondNode)

        var input = document.getElementById (prog)

        if (!input)
            setContent (respondNode, "Input not found, sorry.")
        else {
            try {
                setContent (respondNode, analyser (input.value))
            } catch (_){
                setContent (respondNode, "The execution resulted in an error (probably a parsing error).")
            }
            var check = document.getElementById (rem)
            if (!check || check.checked) input.value = ""
        }
        shineRespond (respondNode)
    }
}

function readAndRunExternalAnalyser (analyser, analyserName, smallStep, oracle, fuel){
    var execute = function (prog, dest, rem){
            dest = dest || (prog + "output")

            var respondNode = document.getElementById (dest)

            if (!respondNode) return

            fetchPage (respondNode, analyser, function (file){
                    try {
                        eval.call (globalObject (), file)
                        var analyserParam = globalObject () [analyserName]
                        execute =
                            readAndRunAnalyser (function (prog){
                                    var analyserInstance = analyserParam

                                    var smallStepNode = document.getElementById (smallStep)

                                    analyserInstance = analyserInstance (!smallStepNode || smallStepNode.checked)

                                    var oracleNode = document.getElementById (oracle)

                                    analyserInstance = analyserInstance (oracleNode ? +oracleNode.value : 0)

                                    var fuelNode = document.getElementById (fuel)

                                    analyserInstance = analyserInstance (fuelNode ? +fuelNode.value : 42)

                                    return analyserInstance (prog)
                                })

                        return execute (prog, dest, rem)
                    } catch (_){
                        setContent (respondNode, "An error occurred during the loading of " + analyser + ".")
                        shineRespond (respondNode)
                    }
                })
        }

    return function (prog, dest, rem){
            // This eta-conversion is needed to always check
            // the value of the local variable “execute”, whose aim is to be updated.
            return execute (prog, dest, rem)
        }
}

var readAndRunJavaScript =
    readAndRunAnalyser (runJavaScript, function (respondNode){
            JavaScriptResultsToBeUpdated.push (respondNode)
        })

var readAndRunWhileFlat =
    readAndRunExternalAnalyser ("while_js_flat.js", "whileFlat", "small_step_while_flat_en", "oracles_while_flat_en", "fuel_while_flat_en")

var readAndRunWhileSign =
    readAndRunExternalAnalyser ("while_js_sign.js", "whileSign", "small_step_while_sign_en", "oracles_while_sign_en", "fuel_while_sign_en")

var readAndRunOWhileFlat =
    readAndRunExternalAnalyser ("owhile_js_flat.js", "owhileFlat", "small_step_owhile_flat_en", "oracles_owhile_flat_en", "fuel_owhile_flat_en")

;

function getExample (prefix, console, list, output){
    var inputNode = document.getElementById (console)

    if (!inputNode) return

    var node = document.getElementById (list)

    if (!node || node.value === "example") return

    var file = prefix + "_" + node.value

    var respondNode = document.getElementById (output)

    fetchPage (respondNode, file, function (text){
            setContent (inputNode, text)
            setContent (respondNode, "")
            node.value = "example"
            shineRespond (inputNode)
        })
}

