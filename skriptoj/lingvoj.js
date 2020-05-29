// @license magnet:?xt=urn:btih:90dc5c0be029de84e523b9b3922520e79e0e6f08&dn=cc0.txt CC0

var allLanguages = ["eo", "fr", "en"]

function iterLanguages (f, start){
	return iterTab (allLanguages, f, false, start)
}

function iterOnLangNode (id, f, start, sep){
	if (sep === undefined)
		sep = "_"

	return iterLanguages (function (lang, current){
			var currentId = id + addIfNotEmpty (lang, sep)

			return applyNode (currentId, function (node){
				return f (node, lang, current) })
		}, start)
}

function applyNodeCurrentLanguage (id, f){
	var lang = getPageLang ()

	var currentId = id + addIfNotEmpty (lang, "_")

	return applyNode (currentId, function (node){
		return f (node, lang) })
}

var alreadyComplainsAgainstWrongLanguages = false
var currentLanguage

var allLanguageTextInfos = [] // Contains the key/message correspondance, in every languages.
var allLanguageNodeInfos = [] // Contains the key/node correspondance, in every languages.
var allLanguageFunctions = { beforeSwitching: [], afterSwitching: [] } // Contains every functions to be executing when switching languages (returning true when they want to be removed from the function pool).

function addLanguageFunction (f /* : newLang × oldLang → bool */,
		beforeSwitching){
	var field = beforeSwitching ? "beforeSwitching" : "afterSwitching"

	allLanguageFunctions[field].push (f)
}

function addLanguage (tab){
	return function (id, value, lang){
		if (lang === undefined)
			lang = getPageLang ()
		if (lang === undefined)
			return true

		if (!tab[id])
			tab[id] = {}

		tab[id][lang] = value
	}
}

var addTextLanguage = addLanguage (allLanguageTextInfos)
var addNodeLanguage = addLanguage (allLanguageNodeInfos)

function getLanguage (tab){
	return function (id, lang){
		if (lang === undefined)
			lang = getPageLang ()

		if (!tab[id])
			return

		return tab[id][lang]
	}
}

var getText = getLanguage (allLanguageTextInfos)
var getNode = getLanguage (allLanguageNodeInfos)

function fetchNodesLang (id){
	iterOnLangNode (id, function (node, lang){
			var nodewid = node.cloneNode (true)
			nodewid.removeAttribute ("id")

			addNodeLanguage (id, nodewid, lang)

			removeNode (node)
		})
}

function fetchTextLang (id){
	iterOnLangNode (id, function (node, lang){
			addTextLanguage (id, getContent (node), lang)

			removeNode (node)
		})
}

function appendNodeLanguage (dest, id, lang, toBeCalledAtChange){
	if (lang === undefined)
		lang = getPageLang ()
	if (lang === undefined)
		return

	var node = getNode (id, lang)

	if (node){
		node = node.cloneNode (true)

		dest.appendChild (node)

		if (node.toBeCalledAfterInsertion)
			node.toBeCalledAfterInsertion (lang)

		addLanguageFunction (function (newLang){
				if (!node.parentNode) // This means the node is now independent of the DOM.
					return true

				var newNode = getNode (id)

				if (!newNode)
					newNode = newDummyNode ()

				newNode = newNode.cloneNode (true)

				dest.insertBefore (newNode, node)
				dest.removeChild (node)

				node = newNode

				if (toBeCalledAtChange)
					toBeCalledAtChange.call (node, lang)

				if (node.toBeCalledAfterInsertion)
					node.toBeCalledAfterInsertion (newLang)
			})

		return node
	}
}

function switchLanguage (newLang, firstTime){
	if (!newLang)
		return

	var oldLang = currentLanguage
	var toBeRemoved = []

	if (!firstTime){
		var t = allLanguageFunctions.beforeSwitching
		iterTab (t, function (f){
				if (f (newLang, oldLang))
					toBeRemoved.push (i)
			})

		iterTab (toBeRemoved, function (i){
				t.splice (i, 1)
			}, true)

		toBeRemoved = []
	}

	currentLanguage = newLang

	{
		t = allLanguageFunctions.afterSwitching
		for (var i = 0; i < t.length; i++)
			if (t[i] (newLang, oldLang))
				toBeRemoved.push (i)

		iterTab (toBeRemoved, function (i){
				t.splice (i, 1)
			}, true)
	}
}

(function (){
	declarePassingArgument ("lang")

	iterTab ([
			"wrongLang",
            "badJS",
			"errorInSocial"
		], fetchNodesLang)

	iterTab ([
			"titlePage",
            "readMore",
            "hideMessage"
		], fetchTextLang)
} ())

function addErrorMsgKey (key, details, lang, toBeCalledAtChange){
	if (lang === undefined)
		lang = getPageLang ()
	if (lang === undefined)
		return

	return applyNode ("messages", function (messagesNode){
			var node = appendNodeLanguage (messagesNode, key, lang, function (lang){
                    if (globalObject ().messageStyle)
                        messageStyle (this)
                    if (toBeCalledAtChange)
                        toBeCalledAtChange.call (this, lang)
                })
			if (details)
				addComment (messagesNode, details)
            return node
		})
}

function getPageLang (){
	if (currentLanguage !== undefined)
		return currentLanguage

	var possibleLanguage = function (str){
		var lg =
			iterLanguages (function (lg, old){
					if (old !== undefined)
						return old

					if (str.indexOf (lg) > -1)
						return lg
				})

		if (currentLanguage !== lg
				&& currentLanguage !== undefined && lg !== undefined
				&& !alreadyComplainsAgainstWrongLanguages){
			alreadyComplainsAgainstWrongLanguages = true
			addErrorMsgKey ("wrongLang", false, lang, function (){
					removeNode (this) // This message should be removed when switching language.
				})
		}

		currentLanguage = currentLanguage || lg
	}
	var lang

	// The target property has priority on everything else:  have better not to conflict with any CSS visibility property…
	dependingOnCurrentPage (function (_, target){
		iterLanguages (function (lg){
				if (target === lg) possibleLanguage (lg)
			})
	})

	// Second, we check the “lang” argument.
	getURLAttribute ("lang", possibleLanguage)

	// Third, trying the navigator’s settings.
	try {
		possibleLanguage (navigator.language)
	} catch (_) {}

	// Lastly, trying to fetch the HTTP accept headers.
	// We only try if we don’t already have a language, to avoid creating too many connections.
	if (!currentLanguage){
		var request = new XMLHttpRequest ()
		request.open ("GET", document.location, false)
		request.send (null)
		if (request.status === 200){
			request.getAllResponseHeaders ().toLowerCase ().trim ().split (/[\r\n]+/).forEach (function (line){
					line = line.split (": ")
					if (line[0] === "accept-language"){
						line[1].split (/[,; ]/).forEach (function (str){
								if (str === "*")
									iterLanguages (possibleLanguage)
								else possibleLanguage (str.split ("-")[0])
							})
					}
				})
		}
	}

	return currentLanguage
}

function setContentTextNodeToNode (idText, node){
    var text = getText (idText)
    
    if (!text)
    	return
    
    setContent (node, text)
    
    addLanguageFunction (function (newLang){
    		if (!node.parentNode) // This means the node is no longer in the DOM (note that this is not checked immediately but only when changing language).
    			return true
    
    		var text = getText (idText)
    
    		if (!text)
    			return true
    
            setContent (node, text)
    	})
}

function setContentTextNode (idNode, idText){
	applyNode (idNode, setContentTextNodeToNode.bind (undefined, idText))
}

function markSwitchLanguage (){
	if (document.getElementsByClassName)
		iterLanguages (function (lang){
				var currentTag = "switchLanguage" + addIfNotEmpty (lang, "_")
				var aNodes = document.getElementsByClassName (currentTag)

				for (var i = 0; i < aNodes.length; i++)
					aNodes[i].onclick = function (){
							switchLanguage (lang)

							return true
						}
			})
}

function removeNoLanguageDetected (){
	if (document.getElementsByClassName){
		var elements = document.getElementsByClassName ("nolanguagedetected")

		for (var n = elements.length - 1; n >= 0; n--)
			removeNode (elements[n])
	}
}

function displayNeedLang (){
	if (document.getElementsByClassName){
		var canNowBeShown = document.getElementsByClassName ("needlang")

		for (var n = 0; n < canNowBeShown.length; n++)
			canNowBeShown[n].style.display = "block"
	}
}

function removeWrongLanguageBlock (){
	var lang = getPageLang ()

	if (lang === undefined)
		addLanguageFunction (removeNoLanguageDetected, true)
	else {
		removeNoLanguageDetected ()
		displayNeedLang ()
	}

	iterLanguages (function (lang){
			var langcont = lang
			var langdiv = "lang" + lang

			if (document.getElementsByClassName){
				var elements = document.getElementsByClassName (langdiv)

				for (var n = elements.length - 1; n >= 0; n--)
					(function (node){
						var reput = function (){ }

						var whenHere = function (lg){
								if (lang !== lg){
									reput = removeNodeAndReput (node)

									addLanguageFunction (whenNotHere)

									return true
								}
							}
						var whenNotHere = function (lg){
								if (lang === lg){
									reput ()
									reput = function (){ }

									addLanguageFunction (whenHere)

									return true
								}
							}

						if (lang === getPageLang ())
							addLanguageFunction (whenHere)
						else {
							reput = removeNodeAndReput (node)

							addLanguageFunction (whenNotHere)
						}

						node.style.display = "block"
					} (elements[n]))
			}
		})

	if (!lang){
		if (document.getElementsByClassName){
			var elements = document.getElementsByClassName ("needlang")

			for (var n = elements.length - 1; n >= 0; n--){
				var currentNode = elements[n]

				var reput = removeNodeAndReput (currentNode)

				addLanguageFunction (function (){
						reput ()

						currentNode.style.display = "block"
					}, true)
			}
		}
	}
}

(function (){
	setContentTextNode ("documentTitle", "titlePage")

	addLanguageFunction (function (lang){
			setPassingArgument ("lang", lang)
		})
} ())

// @license-end

