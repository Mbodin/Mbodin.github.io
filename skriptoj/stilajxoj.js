
function getPositionLeft (obj){
	var cur = 0

	if (obj.offsetParent)
		do cur += obj.offsetLeft
		while (obj = obj.offsetParent)

	return cur
}

function getPositionTop (obj){
	var cur = 0

	if (obj.offsetParent)
		do cur += obj.offsetTop
		while (obj = obj.offsetParent)

	return cur
}


var currentTocTimer = 0

function tocHover (){
	var toc = document.getElementById ("toc")

	if (toc != null)
		toc.setAttribute ("class", "tocHover")
}

function tocUnhover (){
	var toc = document.getElementById ("toc")

	if (toc != null)
		toc.setAttribute ("class", "toc")
}

function tocClick (time){
	tocHover ()

	clearTimeout (currentTocTimer)
	currentTocTimer = setTimeout (tocUnhover, time)
}

(function (){
	var toc = document.getElementById ("toc")

	if (toc){
		toc.onclick = function (){ tocClick (30000) }

		var allLinks = toc.getElementsByTagName ("a")

		if (allLinks != null){
			for (var i = 0 ; i < allLinks.length ; i++){
				var link = allLinks[i]

				link.onfocus = tocHover
				link.onblur = tocUnhover
			}
		}
	}
} ())


var idOfSetIntervalOfcheckExplainedItem = 0
var needResizingExplainItem = false
var currentExplainedItemWidth = 30

function checkExplainedItem (){ // TODO:  I think there is now something in CSS3 that allows to do multicolons easily and without such tricks.
	if (document.getElementsByClassName){
		var elements = document.getElementsByClassName ("explainitem")
		var leftPos = 0, nextNeedResizingExplainItem = false

		if (needResizingExplainItem)
			currentExplainedItemWidth--

		for (var i = 0 ; i < elements.length ; i++){
			var element = elements[i]

			if (i === 0)
				leftPos = getPositionLeft (element)

			var currentPos = getPositionLeft (element)

			if (needResizingExplainItem){
				element.style.width = currentExplainedItemWidth + "%"
			} else {
				if (currentPos === leftPos && i % 3 != 0)
					nextNeedResizingExplainItem = true
			}
		}

		needResizingExplainItem = nextNeedResizingExplainItem
	} else
		clearInterval (idOfSetIntervalOfcheckExplainedItem)
}

idOfSetIntervalOfcheckExplainedItem = setInterval (checkExplainedItem, 800)


function getEMail (mailto, first, name, department, university, country){
	return mailto + first + name + "@" + department + "." + university + "." + country
}

(function (){
	if (document.getElementsByClassName){
		var elements = document.getElementsByClassName ("contactme")
		
		var mailto = "mailto:", first = "m", name = "bodin", department = "dim", university = "uchile", country = "cl"
		var href = getEMail (mailto, first, name, department, university, country)

		for (var i = 0 ; i < elements.length ; i++){
			var element = elements[i], par = element.parentNode

			if (element.nodeName.toLowerCase () === "a"){
				element.setAttribute ("href", href)
				continue
			}

			var aNode = document.createElement ("a")
			aNode.setAttribute ("href", href)

			appendChilds (aNode, element, false)
			element.appendChild (aNode)
		}
	}
} ())


function addValidity (p, id, url){
	var tn = getNode (id)

	if (tn != null){
		var pageName = "index"
		dependingOnCurrentPage (function (page){
				pageName = page
			})

		var a = document.createElement ("a")
		var checkingURL = url + siteRootURL + getPathFromRoot () + pageName + ".html"
		a.setAttribute ("href", checkingURL)

		appendChilds (a, tn, true)
		p.appendChild (a)
	}
}

(function (){
	iterTab ([
			"val_HTML5",
			"val_CSS3"
		], function (id){
			fetchNodesLang (id)
		})

	var CSSHTMLValid = document.getElementById ("CSSHTMLValid")

	if (CSSHTMLValid != null){
		var updateValidity = function (){
				var p = document.createElement ("p")
				p.setAttribute ("class", "footbar")

				CSSHTMLValid.parentNode.insertBefore (p, CSSHTMLValid)

				addValidity (p, "val_HTML5", "http://validator.w3.org/check?uri=")
				p.appendChild (document.createTextNode ("	—	"))
				addValidity (p, "val_CSS3", "http://jigsaw.w3.org/css-validator/validator?uri=")

				addLanguageFunction (function (){
						removeNode (p)
						return true
					}, true)
			}

		updateValidity ()

		addLanguageFunction (updateValidity)
	}
} ())

;

(function (){
	// TODO:  Check into the "nolanguagedetected" class to change every link so that all the additionnal arguments (and target) are kept in internal links.

	markSwitchLanguage ()

	removeWrongLanguageBlock ()
} ())


function messageStyle (messageNode){
    // Adds dynamic features to the messages.
    var childs = messageNode.childNodes

    // First check whether this node has already been treated by looking for a hide button.
    var dejavu = false
    iterTab (childs, function (child){
            if (child.getAttribute && child.getAttribute ("class") === "hide")
                dejavu = true
        })
    if (dejavu) return

    var hideButton = document.createElement ("p")
    if (hideButton){
        hideButton.setAttribute ("class", "messageButton")
        var hideButtonLink = document.createElement ("a")
        if (hideButtonLink){
            hideButtonLink.setAttribute ("href", "#")
            hideButton.appendChild (hideButtonLink)
            setContentTextNodeToNode ("hideMessage", hideButtonLink)
            hideButtonLink.onclick = function (){
                removeNode (messageNode)
            }
            messageNode.appendChild (hideButton)
        }
    }

    var explanations = []

    iterTab (childs, function (child){
            if (child.getAttribute && child.getAttribute ("class") === "explanation")
                explanations.push (removeNodeAndReput (child))
        })

    var readMore = function (readMoreNode){
            readMoreNode.setAttribute ("class", "messageButton")
            var readMoreLink = document.createElement ("a")
            if (readMoreLink){
                readMoreNode.appendChild (readMoreLink)
                setContentTextNodeToNode ("readMore", readMoreLink)
                readMoreLink.setAttribute ("href", "#")
                readMoreLink.onclick = function (){
                        iterTab (explanations, function (appear){
                                appear ()
                            })
                        removeNode (readMoreNode)
                    }
            }
        }

    iterTab (childs, function (child){
            if (child.getAttribute && child.getAttribute ("class") === "readMore")
                readMore (child)

            // They can hides in deeper levels.
            cs = child.childNodes
            iterTab (cs, function (child){
                    if (child.getAttribute && child.getAttribute ("class") === "readMore")
                        readMore (child)
                })
        })
}

(function (){
	if (document.getElementsByClassName){
        var nodes = document.getElementsByClassName ("message")

		for (var i = 0; i < nodes.length; i++)
            messageStyle (nodes[i])
    }
} ())

