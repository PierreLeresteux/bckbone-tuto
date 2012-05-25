define(function() {
	return Backbone.View.extend({
		initialize: function() {
			var language = window.navigator.userLanguage || window.navigator.language;
			this.setDirection(language);
			this.setLanguage(language);
		},
		setDirection: function(language) {
			var dir = "ltr";
			var contentdir = $('contentdir').html();
			if (language == 'he') {
				dir = 'rtl';
			}
			$('body').css('direction', dir);
			$('#content').css('direction', contentdir);
		},
		setLanguage: function(language) {
			if (!_.include(['en','he', 'fr'], language)) {
				language = 'en';
			}
			this.selectDictionary(language);
			this.registerTranslator();
		},
		selectDictionary: function(language) {
			if (language == 'he') {
				$.i18n.setDictionary(this.dico_he);
			} else if (language == 'fr') {
				$.i18n.setDictionary(this.dico_fr);
			} else {
				$.i18n.setDictionary(this.dico_en);
			}
		},
		registerTranslator: function() {
			Handlebars.registerHelper('i18n', function(key, options) {
				return $.i18n._(key, options);
			});
		},
		dico_en: {
			'landingpage.title': 'Landing Pages',
			'landingpage.savebutton': 'Save & Publish',
			'landingpage.edit': 'Edit',
			'landingpage.url': 'Enter a URL',
			'landingpage.encoding': 'Encoding',
			'landingpage.templatedir': 'Template direction',
			'landingpage.required' : 'Required',
			'landingpage.multiple' : 'Multiple',
			'landingpage.choice' : 'Choices',
			'landingpage.addform' : 'Add field',
			'landingpage.field.type' : 'Type',
			'landingpage.field.text' : 'Simple text',
			'landingpage.field.select' : 'Select box',
			'landingpage.field.choice' : 'List of choices',
			'landingpage.field.address' : 'Address',
			'landingpage.field.name' : 'Full name',
			'landingpage.field.submit' : 'Submit button',
			'landingpage.field.dateformat' : 'Date format'
		},
		dico_fr: {
			'landingpage.title': 'Landing Pages',
			'landingpage.savebutton': 'Sauvegarder & Publier',
			'landingpage.edit': 'Modifier',
			'landingpage.url': 'Saisir une URL',
			'landingpage.encoding': 'Encodage',
			'landingpage.templatedir': 'Direction du template',
			'landingpage.required' : 'Requis',
			'landingpage.multiple' : 'Multiple',
			'landingpage.choice' : 'Choix',
			'landingpage.addform' : 'Ajouter un champ',
			'landingpage.field.type' : 'Type',
			'landingpage.field.text' : 'Champ libre',
			'landingpage.field.select' : 'Boite de sélection',
			'landingpage.field.choice' : 'Liste de choix',
			'landingpage.field.address' : 'Adresse',
			'landingpage.field.name' : 'Nom complet',
			'landingpage.field.submit' : 'Bouton d\'envoi de formulaire',
			'landingpage.field.dateformat' : 'Format de la date'
		},
		dico_he: {
			'landingpage.title': 'דפי הנחיתה',
			'landingpage.savebutton': ' סוג',
			'landingpage.edit': 'לערוך',
			'landingpage.url': 'הזן כתובת אתר',
			'landingpage.encoding': 'קידוד',
			'landingpage.templatedir': 'התבנית כיוון',
			'landingpage.required' : 'Required',
			'landingpage.multiple' : 'Multiple',
			'landingpage.choice' : 'Choices',
			'landingpage.addform' : 'Add field',
			'landingpage.field.type' : 'Type',
			'landingpage.field.text' : 'Simple text',
			'landingpage.field.select' : 'Select box',
			'landingpage.field.choice' : 'List of choices',
			'landingpage.field.address' : 'Address',
			'landingpage.field.name' : 'Full name',
			'landingpage.field.submit' : 'Submit button',
			'landingpage.field.dateformat' : 'Date format'
		}
	});
});
