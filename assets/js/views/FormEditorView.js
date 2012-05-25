define(function() {
	return Backbone.View.extend({
		initialize: function() {
			var view = this;
			require(["text!templates/forms.html" ], function(formsbuilder) {
				view.formsbuilder = formsbuilder;
			});
		},
		render: function() {
			$(this.el).css('position', 'absolute').css('display', 'none');
			return this;
		},
		setModel: function(model) {
			this.model = model;
		},
		setField: function(field) {
			this.field = field;
		},
		template: function (context) {
			var source = $(this.formsbuilder).find('#form-tmpl-ed-'+this.model.get('type')).html();
			var template = Handlebars.compile(source);
			return template(context);
		},
		events: {
			'keyup input[type=text].labelEd': 'change',
			'change input[type=checkbox].requiredCheck': 'required',
			'change input[type=text].choiceEd': 'choices',
			'change input[name=multiple]': 'multiple',
			'change select[name=validation]': 'validation',
			'change select[name=dateformat]': 'changeDateFormat',
			'click .trash': 'deleteField',
			'mouseenter': 'mouseenter',
			'mouseleave': 'mouseleave'
		},
		deleteField: function() {
			this.model.destroy();
			this.hide();
		},
		change: function(event) {
			var target = event.target ? event.target : event.srcElement;
			this.model.set('label', target.value);
		},
		changeDateFormat: function(event) {
			var target = event.target ? event.target : event.srcElement;
			var datef = $.trim(target.value);
			this.model.set('format', datef);
		},
		validation: function(event) {
			var view = this;
			var target = event.target ? event.target : event.srcElement;
			var valid = target.options[target.selectedIndex].value;
			if (valid.startsWith('date')) {
				var dateformat = 'mm/dd/yyyy';
				if(valid == 'date-fr')
					dateformat = 'dd/mm/yyyy';

				this.model.set('format', dateformat);
			}
			this.model.set('validation', valid);
		},
		required: function(event) {
			var target = event.target ? event.target : event.srcElement;
			var isChecked = $(target).is(':checked');
			this.model.set('required', isChecked);
		},
		choices: function(event) {
			var target = event.target ? event.target : event.srcElement;
			this.model.set('choices', target.value);
		},
		multiple: function(event) {
			var target = event.target ? event.target : event.srcElement;
			var checked = $(target).is(':checked');
			this.model.set('multiple', checked);
		},
		show: function(position) {
			$(this.el).empty();
			var tools = this.template(this.model.toJSON());
			$(this.el).html(tools);
			$(this.el).show();
            $(this.el).animate({'top': position.top - $(this.el).height(), 'left': position.left + 6}, {queue: false, duration: 0});
		},
		hide: function() {
			$(this.el).hide();
		},
		mouseenter: function() {
           	clearTimeout(this.field.timer);
		},
		mouseleave: function() {
            this.field.beginTimeout();
		}
	});
});