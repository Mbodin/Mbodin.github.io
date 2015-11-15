
function iterTab (t, f, backward, start){
	var step = backward ? -1 : 1
	var compare = backward ?
		function (i){ return i >= 0 }
		: function (i){ return i < t.length }

	var current = start // This can also be used as a fold function.

	for (var i = backward ? t.length - 1 : 0; compare (i); i += step)
		current = f (t[i], current)

	return current
}

function removeNodeId (id){
	removeNode (document.getElementById (id))
}

function applyNode (id, f){
	var node = document.getElementById (id)

	if (node)
		return f (node)
}

var siteRootURL = "http://people.irisa.fr/Martin.Bodin/"

;

(function (){
	try { pathToRoot } catch (_){
		pathToRoot = undefined }

	if(!pathToRoot)
		pathToRoot = ""

	try { pathFromRoot } catch (_){
		pathFromRoot = undefined }

	if(!pathFromRoot)
		pathFromRoot = ""
}())

function getContent (node){
	return node.childNodes[0].nodeValue
}

function appendChilds (dest, node, clone){
	var childs = node.childNodes

	iterTab (childs, function (child){
			var n = clone ? child.cloneNode (true) : child
			dest.appendChild (n)
		})
}

function clearNode (node){
	var childs = node.childNodes

	for (var i = childs.length - 1; i >= 0; i--)
		node.removeChild (childs[i])
}

function removeNode (node){
	if (!node)
		return

	if (node.parentNode)
		node.parentNode.removeChild (node)
}

function addComment (node, message){
	node.appendChild (document.createComment (" " + message + " "))
}

function getURLAttribute (attribute, continuation){
	var url = document.location.href

	var reg = new RegExp ("(\\?|&|^)" + attribute + "=([^&#]*)([#&]|$)")
	var matches = url.match (reg)

	if (matches && matches[2] !== undefined){
		var variable = decodeURIComponent(matches[2]).replace(/\+/g, ' ')
		continuation (variable)
	}
}

function getPageName (complete){
	var url = document.location.href

	var reg = new RegExp (".*/\([^/]*\)\.html")
	var matches = url.match (reg)

	if (matches && matches[1] !== undefined)
		return matches[1] + ((complete && matches[1]) ? ".html" : "")
	else return ""
}

function getPathFromRoot (){ // TODO:  Do this function by parsing the URL of the current page.
	return pathFromRoot
}

function getPathToRoot (){ // TODO:  Use the function getPathFromRoot above instead.
	return pathToRoot
}

function correctURL (url){
	var correctPage = /^([a-zA-Z0-9_-]+([\/.#&?=])?)*$/
	var goodCharacters = correctPage.test (url)

	return goodCharacters;
}

function dependingOnCurrentPage (continuation /* : pageName × target × arguments → any */ ){
	var url = document.location.href

	var reg = new RegExp (".*/([^.]*)\\.html\\??([^#]*)#?([^#]*)")
	var matches = url.match (reg)

	if (matches && matches[3] !== undefined)
		return continuation (matches[1], matches[3], matches[2])
}

function addIfNotEmpty (str, add, after){ // Default:  before.
	if (str === "") return ""
	else if (after) return str + add
	else return add + str
}


function makeADoNothing (node){
	node.setAttribute ("href", "javascript: void 42")
}

function newDummyNode (textMode){
	var node = document.createElement (
		textMode ? "span" : "div")

	node.setAttribute ("class", "invisible")

	return node
}

function removeNodeAndReput (node){
	// This function removes a node of the DOM and returns a function that reput it we called.
	if (!node)
		return function (){ }

	var dummy = newDummyNode ()
	var pNode = node.parentNode
	if (!pNode)
		return function (){ }

	pNode.insertBefore (dummy, node)

	removeNode (node)

	return function (){
			if (dummy.parentNode !== pNode)
				return

			pNode.insertBefore (node, dummy)

			removeNode (dummy)
		}
}

function nodeIsClass (node, className){
	var reg = new RegExp ("( |^)" + className + "( |$)")
	var matches = node.className.match (reg)

	return !!matches
}

function setPassingArgument (name, value, override){
	if (document.getElementsByClassName){
		var internalLinks = document.getElementsByClassName ("internalLink")

		for (var i = 0 ; i < internalLinks.length ; i++){
			var link = internalLinks[i]

			if (!link.hasAttribute ("href"))
				continue

			var url = link.getAttribute ("href")

			var base, attrs, target
			{
				var m = url.match (/([^?#]*)/)

				if (m && m[1] !== undefined)
					base = m[1]
				else base = ""
			}
			if (url.indexOf ("?") === -1)
				attrs = ""
			else {
				m = url.match (/[^?]*\?([^#]*)#?[^#]*/)

				if (m && m[1] !== undefined)
					attrs = m[1]
			}
			if (url.indexOf ("#") === -1)
				target = ""
			else {
				m = url.match (/[^#]*#([^#]*)/)

				if (m && m[1] !== undefined)
					target = m[1]
			}

			var reg = new RegExp ("(^|&)" + name + "=[^&]*", "g")
			if (attrs.match (reg)){
			   	if (!override)
					continue

				attrs = attrs.replace (reg, "")
			}

			if (attrs === "")
				attrs = name + "=" + value
			else attrs += "&" + name + "=" + value

			link.setAttribute ("href", base + "?" + attrs +
					(target === "" ? "" : ("#" + target)))
		}
	}
}

function declarePassingArgument (name){
	getURLAttribute (name, function (value){
			setPassingArgument (name, value)
		})
}


function randInt (i){
	return Math.floor (Math.random () * i)
}

