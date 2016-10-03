
function createStyles (styles){
	return iterTab (styles, function (pair, str){
				return str + pair[0] + ": " + pair[1] + ";"
			}, false, "")
}

function googleSocial (lang, addr){
	if (addr !== "")
		applyNode ("g-social", function (d){
				d.setAttribute ("data-href", addr)
			})

	applyNode ("g-social-img", function (aimg){
			var img = document.createElement ("img")
			img.setAttribute ("src", "http://ssl.gstatic.com/images/icons/gplus-32.png")
			img.setAttribute ("alt", "Google+")
			img.setAttribute ("style", createStyles ([
						["border", "0"],
						["width", "32px"],
						["height", "32px"]
					]))
			aimg.appendChild (img)
		})

	window.___gcfg = { lang: lang }

	var po = document.createElement ("script")
	po.setAttribute ("type", "text/javascript")
	po.setAttribute ("async", true)
	po.setAttribute ("src", "https://apis.google.com/js/plusone.js")

	var s = document.getElementsByTagName ("script")[0]
	s.parentNode.insertBefore (po, s)
}

function twitterSocial (lang, addr){
	if (addr !== "")
		applyNode ("t-social", function (d){
				d.setAttribute ("data-url", addr)
				d.setAttribute ("data-lang", lang)
			})

	;

	(function (d, s, id){
		var js, fjs = d.getElementsByTagName (s)[0], t = window.twttr || {}
		if (d.getElementById (id)) return t
		js = d.createElement (s)
		js.setAttribute ("id", id)
		js.setAttribute ("src", "https://platform.twitter.com/widgets.js")
		fjs.parentNode.insertBefore (js, fjs)

        t._e = []
        t.ready = function (f){
            t._e.push (f)
        }

        return t
	} (document, "script", "twitter-wjs"))

	if (addr !== "")
		return function (lang){
				applyNode ("t-social", function (d){
						d.setAttribute ("data-lang", lang)
					})
			}
}

function facebookSocial (lang, addr){
	applyNode ("f-social", function (d){
			var f = document.createElement ("iframe")
			f.setAttribute ("scrolling", "no")
			f.setAttribute ("frameborder", "0")
			f.setAttribute ("style", createStyles ([
						["border", "none"],
						["overflow", "hidden"],
						["width", "65px"],
						["height", "65px"],
						["margin-top", "3px"]
					]))
			f.setAttribute ("allowTransparency", "true")

			var src = "http://www.facebook.com/plugins/like.php?layout=box_count&show_faces=true&width=65&action=like&font=arial&colorscheme=light&height=65"
			if (addr !== "") src += "&href=" + addr
			f.setAttribute ("src", src)

			d.appendChild (f)
		})
}

function lernuSocial (lang){
	return applyNode ("lernu-social", function (aimg){
			var img = document.createElement ("img")
			img.setAttribute ("src", "http://lernu.net/images/pages/esperanto/timeline_lernu.png")
			img.setAttribute ("alt", "Lernu!")
			img.setAttribute ("style", createStyles ([
						["height", "32px"]
					]))
			aimg.appendChild (img)

			var change = function (lang){
					aimg.setAttribute ("href", "http://lernu.net/" + lang)
				}

			change (lang)

			return change
		})
}

function hackerSocial (lang){
	applyNode ("hacker-social", function (aimg){
			var img = document.createElement ("img")
			img.setAttribute ("src", "http://upload.wikimedia.org/wikipedia/commons/4/45/Glider.svg")
			img.setAttribute ("alt", "Hacker culture")
			img.setAttribute ("style", createStyles ([
						["height", "32px"]
					]))
			aimg.appendChild (img)
			aimg.setAttribute ("href", (function (){
					switch (lang){
						case "fr":
							return "http://fr.wikipedia.org/wiki/Hacker_(universit%C3%A9)"
						case "eo":
						default:
						case "en":
							return "http://en.wikipedia.org/wiki/Hacker_(programmer_subculture)"
					}
				} ()))
		})
}

function togetherJSSocial (lang){
	applyNode ("tjs-social", function (div){
			var script = document.createElement ("script")
			script.setAttribute ("src", "https://togetherjs.com/togetherjs-min.js")
			div.appendChild (script)
		})

	var apply = function (lang){
			applyNode ("TogetherJSButton-" + lang, function (button){
					button.onclick = function (){
							TogetherJS (this)
							return false
						}

					button.setAttribute ("style", createStyles ([
								["background", "#49ba7c"],
								["border-color", "#2aa08b"],
								["color", "#ffffff"],
								["display", "inline-block"],
								["padding", "6px 12px"],
								["margin-bottom", "0"],
								["font-size", "14px"],
								["font-weight", "bold"],
								["text-align", "center"],
								["white-space", "nowrap"],
								["vertical-align", "middle"],
								["cursor", "pointer"],
								["border", "1px solid transparent"],
								["border-radius", "4px"]
							]))
				})
		}

	apply (lang)

	return apply
}

function analyticsSocial (){
	(function(i, s, o, g, r, a, m){
		i.GoogleAnalyticsObject = r
		i[r] = i[r] || function (){
				(i[r].q = i[r].q || []).push(arguments)
			}, i[r].l = 1 * new Date()
		a = s.createElement (o),
	    m = s.getElementsByTagName (o)[0]
		a.async = 1
		a.src = g
		m.parentNode.insertBefore (a, m)
	}) (window, document, "script", "//www.google-analytics.com/analytics.js", "ga");

	ga ("create", "UA-51323998-1", "irisa.fr")
	ga ("require", "displayfeatures")
	ga ("send", "pageview")
}

var permanentSocialsActions = []

function permanentSocials (){
	setPassingArgument ("social", "yes")

	iterTab (permanentSocialsActions, function (f) { f () })
}

function messageSocial (lang){
	applyNode ("social-messages", function (container){
			appendNodeLanguage (container, "spyingSocials")

			var alreadySocial = false

			getURLAttribute ("social", function (response){
					if (response === "yes")
						alreadySocial = true
				})

			if (!alreadySocial)
				(function (node){
					permanentSocialsActions.push (function (){
							removeNode (node)
						})
				} (appendNodeLanguage (container, "permanentSocials", undefined, function (){
						var node = this
						permanentSocialsActions.push (function (){
								removeNode (node)
							})
					})))
		})
}

function performsSocial (lang){
	var addr = siteRootURL + getPathFromRoot () + getPageName (true)

	var allFunctions = [
			["TogetherJS", togetherJSSocial],
			["Lernu", lernuSocial],
			["Hacker", hackerSocial],
			["Google", googleSocial],
			["Twitter", twitterSocial],
			["Facebook", facebookSocial],
			["Analytics", analyticsSocial],
			["Messages", messageSocial]
		]

	iterTab (allFunctions, function (f){
			try {
				var r = f[1] (lang, addr)
				if (r) addLanguageFunction (r)
			} catch (e){
				addErrorMsgKey ("errorInSocial",
					"Error in module “" + f[0] + "”: " +
					("message" in e ? e.message : "No error message!") +
					("fileName" in e ? " file: " + e.fileName : "") +
					("lineNumber" in e ? " line: " + e.lineNumber : ""))
			}})

	iterOnLangNode ("social", removeNode, 42, "-")

	applyNode ("socials", function (ps){
			ps.setAttribute ("class", "center")
		})
}

function checkLang (lang){
	applyNode ("social-" + lang, function (p){
			var node = document.createElement ("a")
			makeADoNothing (node)
			node.onclick = function (){ performsSocial (lang) }

			node.appendChild (p.childNodes[0])

			p.appendChild (node)
		})
}

(function (){
	iterTab ([
			"spyingSocials",
			"permanentSocials"
		], fetchNodesLang)

    applyNode ("social-button-activation", function (node){
            node.setAttribute ("class", "")
        })

    iterLanguages (checkLang)

	declarePassingArgument ("social")

	getURLAttribute ("social", function (response){
			if (response === "yes")
				performsSocial (getPageLang ())
			else if (response === "no")
				iterLanguages (function (lang){
						removeNodeId ("social-" + lang)
					})
		}, "no")
} ()) // TODO:  Update using “lingvoj”.

