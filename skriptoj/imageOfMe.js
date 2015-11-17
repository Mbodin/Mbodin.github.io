
(function (){
	var images = new Array ()
	var visitedImages = new Array ()
	var prob_tot = 0

	add_image = function (name, prob, toBeSeenAtFirst){
		var src = "rimedoj/moi_" + name + ".jpg"

		var img = new Image ()

		var o = {
			img: img,
			src: src,
			prob: prob,
			first: toBeSeenAtFirst,
			loaded: false
		}

		img.onload = function (){ o.loaded = true }
		img.src = src

		images.push (o)

		prob_tot += prob
	}

	get_image = function (num){
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

	add_image ("Avranches", 4, true)
	add_image ("Ćȩstorowa", 5, false)
	add_image ("chevalier", 3, false)
	add_image ("Coliseum", 1, false)
	add_image ("gangster", 1, false)
	add_image ("Giverny", 8, true)
	add_image ("Grenoble", 1, false)
	add_image ("impro", 3, false)
	add_image ("Maastricht", 5, false)
	add_image ("Madrid", 7, true)
	add_image ("MJ", 2, false)
	add_image ("narrateur", 1, false)
	add_image ("pirate", 1, false)
	add_image ("Rome", 10, true)
	add_image ("San_Diego", 5, true)
	add_image ("台北", 5, true)
	add_image ("垦丁", 2, true)

    var updateMyImage

    applyNode ("imageOfMe", function (img){

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
        })

    if (updateMyImage)
        setInterval (updateMyImage (true), 20000)
}())

