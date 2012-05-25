define(['collections/Fields','views/FieldView','views/FormEditorView','models/Field'], function(Fields,FieldView,FormEditorView,Field) {
	return Backbone.View.extend({
		initialize: function() {
			var view = this;
			view.fields = new Fields;
			this.editor = new FormEditorView;
			$('body').append(this.editor.render().el);

			require(["text!templates/forms.html" ], function(formsbuilder) {
				view.formsbuilder = formsbuilder;
			});
		},
		events: {
			'click .addfield': 'addField',
			'mousedown .editable': 'editableClick',
			'mouseenter': 'addButtons',
			'mouseleave': 'hideButtons',
			'submit .content': 'submit',
			'sortstart': 'sortstart',
			'sortstop': 'sortstop'
		},
		render: function() {
			$(this.el).html(this.model.get('html'));

			this.removeFormFieldsFromHtml();

			var formFields = this.model.get('formFields');
			this.attachFormFieldsWithListener(formFields);

			this.$('form').sortable({handle: '.lineEditor'});
			return this;
		},
		removeFormFieldsFromHtml: function() {
			$(this.el).find('form').children('*').remove();
		},
		attachFormFieldsWithListener: function(formFields) {
			if(formFields == undefined || formFields.length ==0 ) {
				this.addFieldFromType('text');
				this.addFieldFromType('submit');
			} else {
				var view = this;
				$.each(formFields, function(index, item) {
					var fieldModel = new Field(item);
					view.addFieldFromModel(fieldModel);
				});
			}
		},
		addFieldFromType: function(type) {
			var fieldModel = this.defaultModelByType(type);
			this.addFieldFromModel(fieldModel);
		},
		addFieldFromModel: function(fieldModel) {
			this.fields.add(fieldModel);

			var field = new FieldView({model: fieldModel, editor: this.editor});
			fieldModel.on('change', this.save, this);
			fieldModel.on('remove', this.save, this);
			this.$('.content').append(field.render().el);

			this.save();
		},
		addField: function(event) {
			event.preventDefault();
			var target = event.target ? event.target : event.srcElement;
			var type = target.getAttribute("data-field");
			this.addFieldFromType(type);
		},
		save: function() {
			this.model.set('html', this.formHtmlWithoutControl());
			this.model.set('formFields', this.fields.toJSON());
		},
		formHtmlWithoutControl: function() {
			var $clone = $(this.el).clone();
			$clone.find('.dropdown').remove();
			$clone.find('.lineEditor').remove();
			return $clone.html();
		},
		addButtons: function() {
			if(this.$('.dropdown').html() != '') {
				this.$('.dropdown').show();	
			} else {
				var sourceDropdown = $(this.formsbuilder).find('#form-dropdown').html();
				var templateDropdown = Handlebars.compile(sourceDropdown);
				this.$('.dropdown').html(templateDropdown());
			}
		},
		hideButtons: function() {
			this.$('.dropdown').hide();
		},
		sortstart: function(event, ui) {
			this.oldPosition = ui.item.index();
			this.editor.hide();
		},
		sortstop: function(event, ui) {
			this.newPosition = ui.item.index();

			if(this.oldPosition != this.newPosition) {
				var toMove = this.fields.at(this.oldPosition);
				this.fields.remove(toMove);
				this.fields.add(toMove, {at: this.newPosition});
			}

			this.save();
		},
		submit: function(event) {
			event.preventDefault();
		},
		defaultModelByType: function(type) {
			switch(type) {
				case 'text'  : return new Field({type:'text', validation:'text'});
				case 'submit': return new Field({type:'submit', label:'Submit'});
				case 'choice': return new Field({type:'choice', choices: 'Blue,Yellow', multiple: true});
				case 'select': return new Field({type:'select', choices: 'Mister,Miss'});
			}
		},
		editableClick: etch.editableInit
	});
});