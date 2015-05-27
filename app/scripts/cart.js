'use strict';

var kouma = kouma || {};

(function($, kouma) {

	function Cart(changeCallBack) {
		var products = [];

		this.addProduct = function(product) {

			if (typeof(product.id) === 'undefined') {
				throw new Error('Product must have an id !');
			}

			/*
			products = [
				{id:1, name:"ail", quantity:1},
				{id:1, name:"ail", quantity:1}
			]
			 */

			// on cherche si le produit est présent dans la liste
			for (var i = 0; i < products.length; i++) {
				var p = products[i];
				// si il est déjà présent, on augmente la quantité
				if (p.id === product.id) {
					p.quantity++;
					changeCallBack(products);
					return;
				}
			}

			product.quantity = 1;
			products.push(product);
			changeCallBack(products);
		};

		this.removeProduct = function (productId) {
			var lng = products.length;
			for (var i = 0; i < lng; i++) {
				var p = products[i];
				if (p.id === productId) {
					products.splice(i, 1);
				}
			}
			changeCallBack(products);
		};

		this.getAllProducts = function () {
			return products;
		};
	}

	kouma.Cart = Cart;
	

})(jQuery, kouma);