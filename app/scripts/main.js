'use strict';

(function(window, kouma){

	var remote,			// instance de la classe remote
		productsView,	// grille des produits
		cart,			// grille des produits
		cartView;		// grille des produits

	function initRemote() {
		// création de l'instance de remote
		remote = new kouma.Remote();
		remote.getProducts(getProductsSuccess, onRemoteError);
		// on peut aussi définir la callback dans une instance
		// autre (ici => grid ou error)
		//remote.getProducts(grid.getProductsSuccess, error.onRemoteError);
	}

	function getProductsSuccess(data) {
		console.log('getProductsSuccess', data);
		// instance de la grille de produits
		productsView = new kouma.ProductsView(data, $('div#products'));
		// on fait le rendu
		productsView.render();
	}

	function onRemoteError(jqXHR, textStatus, errorThrown) {
		console.log('onRemoteError', textStatus, errorThrown);
	}

	function initCart() {
		cartView = new kouma.CartView($('div#panier'));
		cart = new kouma.Cart(cartView.render);
		$('div#panier-wrapper').affix();

		// on écoute les ajouts de produits
		$('div#products').bind('addProduct', function(e, data) {
			cart.addProduct(data);
		});
		
	}

	function initApp() {
		initRemote();
		initCart();
	}

	//initApp();
	kouma.TemplateFactory.loadTemplates('cart products', initApp);


})(window, window.kouma);