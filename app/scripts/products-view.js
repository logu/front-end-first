'use strict';

var kouma = kouma || {};

(function($, kouma) {

	/**
	 * constructeur de la classe ProductsView
	 * @param {Object} data    Objet de données JSON
	 * @param {DOMElement} wrapper Element DOM dans lequel sera insérée la grille
	 */
	function ProductsView(data, wrapper) {
		this.data = data;
		this.$wrapper = $(wrapper);
		this.numColumns = 4;
	}

	/**
	 * construction de la grille
	 * @return {[type]} [description]
	 */
	ProductsView.prototype.render = function() {

		var html = kouma.TemplateFactory.get('products', this.data);
		
		var $html = $(html);

		var $modele = $('<div class="row-fluid"></div>');
		var lng = $html.length;
		var $row = $modele.clone();

		var self = this;

		$html.each(function(index, item) {
			$(item).find('a').data(self.data.products[index]);

			$row.append(item);

			// si on est en bout de colonne OU en fin de liste
			if ((index+1)%self.numColumns === 0 || index === lng-1) {
				self.$wrapper.append($row);
				$row = $modele.clone();
			}

		});

		this.$wrapper.find('.item a').bind('click', function(e) {
			e.preventDefault();
			var data = $(e.currentTarget).data();
			self.$wrapper.trigger('addProduct', [data]);
		});

	};

	kouma.ProductsView = ProductsView;

})(jQuery, kouma);