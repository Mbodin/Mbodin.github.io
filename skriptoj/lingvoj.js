
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
			"errorInSocial"
		], fetchNodesLang)

	iterTab ([
			"titlePage"
		], fetchTextLang)
}())

function addErrorMsgKey (key, details, lang, toBeCalledAtChange){
	if (lang === undefined)
		lang = getPageLang ()
	if (lang === undefined)
		return

	applyNode ("messages", function (messagesNode){
			appendNodeLanguage (messagesNode, key, lang, toBeCalledAtChange)
			if (details)
				addComment (messagesNode, details)
		})
}

function getPageLang (){
	if (currentLanguage !== undefined)
		return currentLanguage

	var format = function (str){
		return iterLanguages (function (lg, old){
				if (old !== undefined)
					return old

				if (str.indexOf (lg) > -1)
					return lg
			})
	}
	var lang

	try {
		lang = navigator.language
	} catch (_) {
		lang = ""
	}

	lang = format (lang)

	getURLAttribute ("lang", function (langset){
		langset = format (langset)
		lang = langset || lang
	})

	// The target property has priority on everything else:  have better not to conflict with any CSS visibilty property…
	dependingOnCurrentPage (function (_, target){
		iterLanguages (function (lg){
				if (target === lg){
					if (lang !== lg && lang !== undefined && !alreadyComplainsAgainstWrongLanguages){
						alreadyComplainsAgainstWrongLanguages = true
						addErrorMsgKey ("wrongLang", false, lang, function (){
								removeNode (this) // This message should be removed when switching language.
							})
					}

					lang = lg
				}
			})
	})

	currentLanguage = lang
	return lang
}

function setContentTextNode (idNode, idText){
	applyNode (idNode, function (node){
			var text = getText (idText)

			if (!text)
				return

			clearNode (node)

			node.appendChild (
				document.createTextNode (text))

			addLanguageFunction (function (newLang){
					if (!node.parentNode) // This means the node is no longer in the DOM.
						return true

					var text = getText (idText)

					if (!text)
						return true

					clearNode (node)

					node.appendChild (
						document.createTextNode (text))
				})
		})
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
}())

