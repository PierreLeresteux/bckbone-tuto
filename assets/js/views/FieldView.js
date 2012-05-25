define(function() {
	return Backbone.View.extend({
		initialize: function(params) {
			this.editor = params.editor;
			this.model = params.model;
			this.model.on('change', this.renderOnUpdate, this);
			this.model.on('destroy', this.destroy, this);

			var view = this;
			require(["text!templates/forms.html" ], function(formsbuilder) {
				view.formsbuilder = formsbuilder;
			});
		},
		events: {
			'mouseenter': 'mouseenter',
			'mouseleave': 'mouseleave',
			'click .icon-pencil': 'showEditor'
		},
		destroy: function() {
			this.remove();
		},
		mouseleave: function(event) {
			var target = event.target ? event.target : event.srcElement;
			var classOut = $(target).attr('class');
			if (classOut == undefined || classOut.indexOf('subtype') < 0)
				this.beginTimeout();
		},
		mouseenter: function() {
			clearTimeout(this.timer);

			this.showTooltip();
		},
		showTooltip: function() {
			var sourceEditor = $(this.formsbuilder).find('#line-ed').html();
			var templateEditor = Handlebars.compile(sourceEditor);
			this.$('.lineEditor').html(templateEditor());
			this.$('.lineEditor').css('display', 'block');
			this.$('.lineEditor').css('cursor', 'move');
			this.$('.icon-pencil').css('cursor','pointer');
		},
		hideTooltip: function() {
			this.$('.lineEditor').html('');
			this.$('.lineEditor').css('display', 'none');
		},
		showEditor: function() {
			var position = $(this.el).offset();
			this.editor.setModel(this.model);
			this.editor.setField(this);
			this.editor.show(position);
		},
		hideEditor: function() {
            this.editor.hide();
		},
		beginTimeout: function() {
			var view = this;
			view.timer = setTimeout(function() {
				view.hideEditor();
            	view.hideTooltip();
            }, 30);
		},
		template: function (context) {
			var source = $(this.formsbuilder).find('#form-tmpl-'+this.model.get('type')).html();
			var template = Handlebars.compile(source);
			return template(context);
		},
		renderOnUpdate: function() {
			this.render();
			this.showTooltip();
		},
		render: function() {
			$(this.el).html(this.template(this.model.toJSON()));
			this.renderValidation();
			this.renderChoices();
			return this;
		},
		renderValidation: function() {
			var validation = this.model.get('validation');
			if(validation != undefined) {
				this.$('.field').attr('data-validation',validation);
				if (validation.startsWith('date')){
					if (!this.model.get('datestart')){
						var reg = new RegExp("(mm)", "g");
						var format = this.model.get('format');
						format = format.replace(reg,"MM");
						var datef = Date.today().toString(format);
						this.model.set({datestart: datef});
					}
				}
			}
		},
		renderChoices: function() {
			var view = this;

			var choices = this.model.get('choices');
			if (choices) {
				choices = choices.split(',');
				var type = this.model.get("type");
				if (type == 'select'){
					view.$('option').remove();
					$.each(choices, function(key,value) { 
						view.$('select').append("<option>"+$.trim(value)+"</option>");
					});
				} else if (type == 'choice') {
					var multiple = this.model.get("multiple");
					var label = this.model.get("label");
					view.$('.choice').remove();
					$.each(choices, function(key,value) { 
						if (multiple==true){
							view.$('.fieldContent').append('<label class="checkbox choice"><input name="'+label+'" type="checkbox" class="field canBeRequired" value="'+$.trim(value)+'">'+$.trim(value)+'</label>');
						}else{
							view.$('.fieldContent').append('<label class="radio choice"><input name="'+label+'" type="radio" class="field canBeRequired" value="'+$.trim(value)+'">' +$.trim(value)+'</label>');
						}
					});
				}
			}
		}
	});
});