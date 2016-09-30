module.exports = function(rootURL) {
	return {
		getValue(selector) {
			return $(selector).val();
		},
		emptyForm(formElements) {
		  formElements.forEach(function(element) {
		    $(element).val('');
		  });
		},
		redirectToLogin() {
			window.location = rootURL;
		}
	};
};