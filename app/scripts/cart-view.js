'use strict';

var kouma = kouma || {};

(function($, kouma) {

	function CartView(wrapper) {

		this.$wrapper = $(wrapper);

		var self = this;

		this.render = function(data){
			var html = kouma.TemplateFactory.get('cart', {cart:data});
			self.$wrapper.html(html);
		};
	}

	kouma.CartView = CartView;

})(jQuery, kouma);