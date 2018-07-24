// @license magnet:?xt=urn:btih:90dc5c0be029de84e523b9b3922520e79e0e6f08&dn=cc0.txt CC0

var languageBool = true
var currentTimer = 0

function languageOff (){
	if (languageBool) {
		if (document.getElementsByClassName){
			var aNodes = document.getElementsByClassName ("divflag")
			for (var i = 0; i < aNodes.length; i++)
				aNodes[i].style.display = "none"
		}
		applyNodeCurrentLanguage ("flag_list_alt", function (node){
			node.style.display = "inline" })
		languageBool = false
	}
}

function languageOn (time){
	if (!languageBool) {
		applyNodeCurrentLanguage ("flag_list_alt", function (node){
			node.style.display = "none" })
		if (document.getElementsByClassName){
			var aNodes = document.getElementsByClassName ("divflag")
			for (var i = 0; i < aNodes.length; i++){
				if (!nodeIsClass (aNodes[i], "flag" + addIfNotEmpty (getPageLang (), "_")))
					aNodes[i].style.display = "inline"
				else
					aNodes[i].style.display = "none"
			}
		}
		languageBool = true
	}
	clearTimeout (currentTimer)
	currentTimer = setTimeout (languageOff, time)
}

(function (){
	languageOff ()

	iterOnLangNode ("flag_list_alt", function (node){
			node.onclick = function (){ languageOn (60000) }
			node.onmouseover = function (){ languageOn (5000) }
			node.onmousemove = function (){ languageOn (3000) }
		})

	addLanguageFunction (function (){ languageOn () })
} ())

// @license-end

