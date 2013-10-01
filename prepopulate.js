PAGE.add$("Constructors.Prepopulate", function(pageName) {
	var dog = {
		establishBase : function() { return this }
		, populate : function() { return this }
		, localStorage : undefined /* LocalStorage("prepopulate") */
		, data : {}
	}

	dog.establishBase = function() {
		$("form :input").each(function() {
			var key = $(this).attr("name")
				, value = $(this).val()
			dog.data[key] = value
			dog.localStorage.replaceAll(dog.data)
		})
	}

	dog.populate = function() {
		dog.data = dog.localStorage.data
		$.each(dog.data, function(index, value) {
			var $input = $(":input[name='" + index + "']").not(":checkbox").not(":radio").val(value)
				, $checkbox = $(":input[name='" + index + "'][type='checkbox']")
				, $radio = $(":input[name='" + index + "'][type='radio']")

			if ($checkbox.length > 0) {
				$checkbox.filter("[value='" + value + "']").attr("checked","checked")
			}

			if ($radio.length > 0) {
				$radio.filter("[value='" + value + "']").attr("checked","checked")
			}

		})
	}

	function init() {
		PAGE.wait("Constructors.LocalStorage", function(LocalStorage) {
			dog.localStorage = LocalStorage(pageName)
		})
	}

	init()

	return dog
})
