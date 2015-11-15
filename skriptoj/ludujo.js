
function appendTranslation (dest, id){
	try {
		appendChilds (dest, document.getElementById (id), true)
	} catch (_){}
}

function translationP (id){
	var node = document.createElement ("p")
	appendTranslation (node, id)
	return node
}

function runOnURL (url, continuation, errcont){
	if(errcont === undefined)
		errcont = (function (){})

	if (window.XMLHttpRequest)
		(function (){
			requestObj = new XMLHttpRequest()

			requestObj.onreadystatechange = function(){
				if (requestObj.readyState === 4){
					if (requestObj.status === 200)
						continuation (requestObj.responseXML)
					else errcont ()
				}
			}

			try {
				requestObj.open ("get", url, true)
				requestObj.send (null)
			} catch (_){
				errcont ()
			}
		}())
	else errcont ()
}

function getContentXML (node){
	return node.childNodes[0].nodeValue
}

function generateGameItem (item){
	var div = document.createElement ("div")
	div.setAttribute ("class", "englobingProjectItem")

	var divDescr = document.createElement ("div")
	divDescr.setAttribute ("class", "englobingProjectItemDescription")

	div.appendChild (divDescr)

	var name = document.createElement ("span")
	name.setAttribute ("class", "name")

	name.appendChild (document.createTextNode (getContentXML (item.getElementsByTagName ("name")[0])))

	var title = document.createElement ("h3")
	title.appendChild (name)

	divDescr.appendChild (title)

	function ifDescription (name, id){
		var tags = item.getElementsByTagName (name)

		if (tags.length > 0){
			var p = document.createElement ("p")
			p.setAttribute ("class", "projectDescription")
			var text = document.getElementById (id).childNodes
			for (var i = 0 ; i < text.length ; i++){
				p.appendChild (text.item (i).cloneNode (true))
			}
			divDescr.appendChild (p)
		}
	}

	ifDescription ("favourite", "L_favourite")
	ifDescription ("good", "L_good")
	ifDescription ("impro", "L_impro")
	ifDescription ("rpfun", "L_roleplayerfunny")
	ifDescription ("murder", "L_murder")

	var ul = document.createElement ("ul")
	ul.setAttribute ("class", "projectLinks")

	var nav = document.createElement ("nav")
	nav.setAttribute ("class", "englobingProjectLinks")

	nav.appendChild (ul)
	div.appendChild (nav)

	function ifDefined (name, url, id){
		var tags = item.getElementsByTagName (name)

		if (tags.length > 0){
			var a = document.createElement ("a")
			a.setAttribute ("href", url (getContentXML (tags[0])))
			var linkT = document.getElementById (id).childNodes
			for (var i = 0 ; i < linkT.length ; i++){
				a.appendChild (linkT.item (i).cloneNode (true))
			}
			var li = document.createElement ("li")
			li.appendChild (a)
			ul.appendChild (li)
		}
	}

	ifDefined ("trictrac", function (n){
		return "http://www.trictrac.net/index.php3?id=jeux&rub=detail&inf=detail&jeu=" + n
	}, "L_trictrac")

	ifDefined ("boardgamegeek", function (n){
		return "http://boardgamegeek.com/boardgame/" + n + "/"
	}, "L_boardgamegeek")

	return div
}

function generateLudujo (globalNode, lastNode){
	var err = function (){
		globalNode.insertBefore (translationP ("L_error"), lastNode)

		globalNode.removeChild (lastNode)
	}

	if (document.getElementsByTagName)
		runOnURL ("ressources/ludujo.xml", function (dom){
			var allChilds = dom.documentElement.childNodes

			for (var i = 0 ; i < allChilds.length ; i++){
				var current = allChilds.item (i)
			
				try {
					if (current.nodeType === 1 && current.nodeName === "item")
						globalNode.insertBefore (generateGameItem (current), lastNode)
				} catch (_) {}
			}

			globalNode.removeChild (lastNode)
		}, err)
	else err ()
}


(function (){
	var ludujoNode = document.getElementById ("Ludujo")
	var loadingNode = translationP ("L_computing")

	ludujoNode.appendChild (loadingNode)

	generateLudujo (ludujoNode, loadingNode)
}())

