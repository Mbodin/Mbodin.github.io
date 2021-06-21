// @license magnet:?xt=urn:btih:90dc5c0be029de84e523b9b3922520e79e0e6f08&dn=cc0.txt CC0

// TODO:  Track language change:  those variables have to be reloaded each time the language is changed…

var tocCommand = "tocCommand_"
var applyFunctionOnAll = new Array ()
var numberOfDisplayedSection = 0, totalNumberOfSection = 0

;

(function (){
	iterTab ([
			"toc_link",
			"toc_dismiss",
			"toc_undismiss",
			"toc_dismiss_all",
			"toc_undismiss_all"
		], fetchTextLang)

    // All the strings have been fetched:  we can remove their container (in case there is no CSS).
    removeNodeId ("tocLangContents")
} ())

function createTocCommand (label){
	var myId = tocCommand + label ;
	var node = document.createElement ("a")
	node.setAttribute ("class", "toc_command")
	node.setAttribute ("id", myId)

	applyFunctionOnAll.push (function (f){ f (label, myId) })

	makeADoNothing (node)
	node.onclick = function (){ switchStateToc (label, myId) }

    setContentTextNodeToNode ("toc_dismiss", node)

	return node
}

function createTocCommandAll (hide){
	var node = document.createElement ("a")
	node.setAttribute ("class", "toc_command")

	makeADoNothing (node)
	node.onclick = hide ? dismissAll : undismissAll

	node.setAttribute ("id", "TOC_" + (hide ? "hide" : "show") + "_all")
	node.style.display = hide ? "inline" : "none"

    setContentTextNodeToNode (hide ? "toc_dismiss_all" : "toc_undismiss_all", node)

	return node
}

function numberOfDisplayedSectionChanged (){
	var ha = document.getElementById ("TOC_hide_all")
	var sa = document.getElementById ("TOC_show_all")

	if (numberOfDisplayedSection === 0){
		ha.style.display = "none"
		sa.style.display = "inline"
		tocHover ()
	} else if (numberOfDisplayedSection === totalNumberOfSection){
		ha.style.display = "inline"
		sa.style.display = "none"
	} else {
		ha.style.display = "inline"
		sa.style.display = "inline"
	}
}

function switchStateToc (label, idCommand){
	var container = document.getElementById (label).parentNode
	var command = document.getElementById (idCommand)

	if (container.style.display === "none") {
		container.style.display = "inline"
		setContentTextNodeToNode ("toc_dismiss", command)

		numberOfDisplayedSection++
	} else {
		container.style.display = "none"
        setContentTextNodeToNode ("toc_undismiss", command)

		numberOfDisplayedSection--
	}

	numberOfDisplayedSectionChanged ()
}

function displayTocTitle (label, idCommand){
	var container = document.getElementById (label).parentNode
	var command = document.getElementById (idCommand)

	if (container.style.display != "inline") {
		container.style.display = "inline"
        setContentTextNodeToNode ("toc_dismiss", command)

		numberOfDisplayedSection++
		numberOfDisplayedSectionChanged ()
	}
}

function undismissAll (){
    iterTab (applyFunctionOnAll, function (f){
            f (displayTocTitle)
        })

	numberOfDisplayedSection = totalNumberOfSection
	numberOfDisplayedSectionChanged ()
}

function dismissAll (){
    iterTab (applyFunctionOnAll, function (f){
            f (displayTocTitle)
            f (switchStateToc)
        })

	numberOfDisplayedSection = 0
	numberOfDisplayedSectionChanged ()
}


(function (){
	var tocBox = document.getElementById ("toc")
	var hs = document.getElementsByTagName ("h2")
	var langclass = "lang" + getPageLang ()

	if (hs != null && tocBox != null)
		(function (){
			var toc, i = 0, localP, localA, linkA, txt, label

			{
				toc = document.createElement ("ul")
				toc.setAttribute ("class", "tocMain")
				tocBox.appendChild (toc)
			}

			totalNumberOfSection = numberOfDisplayedSection = hs.length

			iterTab (hs, function (h){
                    if (h.getAttribute ("class") !== langclass) return

                    label = "titleWhoseAutomaticallyGeneratedNumberIs" + ++i

                    if (h.hasAttribute ("id"))
                        label = h.getAttribute ("id")
                    else h.setAttribute ("id", label)

                    localA = document.createElement ("a")
                    appendChilds (localA, h, true)
                    localA.setAttribute ("href", "#" + label)
                    localA.onclick = function (l){
                        return function (){
                            displayTocTitle (l, tocCommand + l)
                        }} (label)

                    localP = document.createElement ("li")
                    localP.appendChild (localA)
                    localP.appendChild (createTocCommand (label))
                    toc.appendChild (localP)

                    h.appendChild (createTocCommand (label))

                    linkA = document.createElement ("a")
                    linkA.setAttribute ("class", "toc_command")
                    linkA.setAttribute ("href", siteRootURL + pathFromRoot + getPageName (true) + "#" + label)
                    setContentTextNodeToNode ("toc_link", linkA)

                    h.appendChild (linkA)
                })

			tocBox.setAttribute ("class", "toc") // To only display the box when the table of content has been computed.

			{
				var tocAll = document.createElement ("div")
				tocAll.setAttribute ("class", "tocAll")
				var localUl = document.createElement ("ul")
                var addLocalP = function (b){
                        localP = document.createElement ("li")
                        localP.appendChild (createTocCommandAll (b))
                        localUl.appendChild (localP)
                    }
                addLocalP (false)
                addLocalP (true)
				tocAll.appendChild (localUl)
				tocBox.appendChild (tocAll)
			}
		} ())
} ())

// @license-end

