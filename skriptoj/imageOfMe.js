// @license magnet:?xt=urn:btih:90dc5c0be029de84e523b9b3922520e79e0e6f08&dn=cc0.txt CC0

(function (){
	var images = new Array ()
	var visitedImages = new Array ()
	var prob_tot = 0

	var add_image = function (name, prob, toBeSeenAtFirst){
		var src = "rimedoj/moi_" + name + ".jpg"

		var load = function () {
				var img = new Image ()

				var image = {
					img: img,
					src: src,
					prob: prob,
					first: toBeSeenAtFirst,
					loaded: false
				}

				img.onload = function (){ image.loaded = true }
				img.src = src

				images.push (image)

				prob_tot += prob
			}

		if (toBeSeenAtFirst) load ()
		else setTimeout (load, 200 * images.length)
	}

	/* Return the corresponding image given a number representing probabilities. */
	var get_image = function (num){
		var count = 0
		for (var i = 0; i < images.length; i++){
			count += images[i].prob
			if (count > num){
				var ret = images[i]

				visitedImages.push (images[i])
				prob_tot -= images[i].prob
				images.splice (i, 1)

				if (prob_tot <= 0){
					images = visitedImages
					visitedImages = new Array ()
					iterTab (images, function (image){
							prob_tot += image.prob
						})
				}

				return ret
			}
		}
		return ""
	}

	add_image ("3×4", 15, true)
	add_image ("Avranches", 2, false)
	add_image ("Ćȩstorowa", 5, false)
	// add_image ("chevalier", 3, false)
	// add_image ("Coliseum", 1, false)
	// add_image ("gangster", 1, false)
	add_image ("Giverny", 2, true)
	add_image ("Grenoble", 1, false)
	// add_image ("impro", 2, false)
	add_image ("Maastricht", 5, false)
	add_image ("Madrid", 3, false)
	// add_image ("MJ", 1, false)
	// add_image ("narrateur", 1, false)
	// add_image ("pirate", 1, false)
	add_image ("Rome", 5, false)
	add_image ("San_Diego", 1, false)
	add_image ("台北", 2, false)
	add_image ("垦丁", 2, false)
	add_image ("Cambridge", 7, true)
	add_image ("London", 9, true)
	add_image ("Valdivia", 4, false)
	add_image ("lac", 5, true)
	add_image ("montagne", 1, false)

	var updateMyImage

	var update_image = function (img){

			updateMyImage = function (first){
					return function (){
						var tries = 0
						var maxTriesLoaded = 42
						var maxTries = 84

						do {
							tries++
							var i = get_image (randInt (prob_tot))
						} while (tries < maxTries && (
							(first && !i.first)
							|| (tries < maxTriesLoaded && !i.loaded)
						))

						img.setAttribute ("src", i.src)
					}
				}

			img.parentNode.onclick = updateMyImage (false)

			updateMyImage (true)()
		}

	applyNode ("imageOfMe", update_image)

	if (updateMyImage)
		setInterval (updateMyImage (true), 60000)
	else /* The image has been removed, high probably because of the language interaction. */
		addLanguageFunction (function (){
			if (!updateMyImage)
				applyNode ("imageOfMe", update_image)

			if (updateMyImage){
				setInterval (updateMyImage (true), 60000)
				return true
			}
		})

} ())

// @license-end

