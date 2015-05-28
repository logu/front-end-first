'use strict';

var kouma = kouma || {};

(function(kouma) {

	function Remote() {
		// chemin par défaut vers nos scripts serveur
		//var remoteURL = 'http://localhost/jsa/exercices/AppPanier/';

		this.getProducts = function(successCB, errorCB) {

			$.ajax({
					url: 'data/json/fruits-et-legumes.json',
					success: successCB,
					error: errorCB
				});

		};

		this.updateProduct = function(data, successCB, errorCB) {

			$.ajax({
					url: 'updateProduct.php',
					data: data,
					success: successCB,
					error: errorCB
				});
		};
	}

	kouma.Remote = Remote;

})(kouma);