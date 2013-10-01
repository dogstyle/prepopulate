PAGE.addConstructor("LocalStorage", function(parentName, options) {

	options = options || {}
	options.useCookie = options.useCookie || false

	var storeThis = {}

	var LocalStorage = function(){}
	, dog = LocalStorage.prototype = { }
	, puppy = new LocalStorage()

	puppy.data = storeThis
	puppy.name = parentName
	puppy.cookie = undefined

	var saveAll = dog.saveAll = function(callback) {
		if (!options.useCookie && typeof localStorage !== "object") return

		if (options.useCookie) {
				puppy.cookie.setCookie(parentName, JSON.stringify(storeThis), 99)
		} else {
			localStorage[parentName] = JSON.stringify(storeThis)
		}

		typeof callback === "function" && callback(dog)
	}

	var replaceAll = dog.replaceAll = function(replaceWith) {
		if (!replaceWith) return

		for (var y in storeThis) delete storeThis[y]

		for(var x in replaceWith) {
			storeThis[x] = replaceWith[x]
		}
		saveAll()
	}

	var addSaveProperty = dog.addSaveProperty = function(name, value, callback) {
		storeThis[name] = value
		saveAll(callback)
	}

	var loadAll = dog.loadAll = function(callback) {
		if (!options.useCookie && typeof localStorage !== "object") return

		var tempData

		if (options.useCookie) {
			tempData = puppy.cookie.getCookie(parentName)
		} else {
			tempData = localStorage[parentName]
		}

		if (tempData) {
			tempData = JSON.parse(tempData)

			for(var x in tempData) {
				storeThis[x] = tempData[x]
			}
		}
		typeof callback === "function" && callback(storeThis)
	}

	dog.deleteProperty = function(name, callback) {
		delete storeThis[name]
		saveAll(callback)
	}

	function init() {
		if (options.useCookie) {
			PAGE.wait("Modules.cookie", function(cookieMonster) {
				puppy.cookie = cookieMonster
				loadAll()
			})
		} else {
			loadAll()
		}
	}

	init()

	return puppy

})
