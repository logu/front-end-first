'use strict';

var kouma = kouma || {};

(function(kouma, $, Mustache){

	kouma.TemplateFactory = (function() {
		// private var
		// Object contenant nos templates
		// sous la forme :
		// {
		// 		nomTemplate: 'template',
		// 		
		// }
		var templates = {};

		return {

			/**
			 * chargement des templates du dossier tpl
			 * @param  {String}   names    Les noms des templates séparés par une virgule
			 * @param  {Function} callback callback exécutée lorsque les tpls sont chargés
			 * @return {[type]}            [description]
			 */
			loadTemplates: function(names, callback) {
				// liste des noms des tpls
				names = names.split(' ');

				var loadTemplate = function(index) {
					var name = names[index];
					console.log('Loading Template ' + name);
					// chargement
					$.get('templates/' + name + '.html', function(data) {
						templates[name] = data;
						index++;
						// si il reste des tpl à charger
						if (index < names.length) {
							loadTemplate(index);
						} else { // sinon, on exécute la callback
							callback();
						}
					});
				}; 

				// on lance le chargement du premier
				loadTemplate(0);

			},

			get: function(templateName, data) {
				data = data || {};
				var tpl = templates[templateName];
				if (typeof(tpl) === 'undefined') {
					throw new Error(templateName + ' introuvable : vérifiez le nom');
				}
				/* jshint ignore:start */
				return Mustache.render(tpl, data);
				/* jshint ignore:end */
			}

		};

	})();

})(kouma, jQuery, window.Mustache);