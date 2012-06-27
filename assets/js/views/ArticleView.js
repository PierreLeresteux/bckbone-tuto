define(function() {
	return Backbone.View.extend({
		initialize: function(model) {
			console.log("ArticleView-init");
			this.model = model;
			var view = this;
			require(["text!templates/articleTemplate.html" ], function(t) {
				view.template = t;
			});
		},
		events: {
			'click .close': 'clear'
		},
		render: function() {
			console.log("ArticleView-render");
			var line = $(this.template).find('#article').html();
			var template = Handlebars.compile(line);
			$(this.el).empty().append(template(this.model.toJSON()));
			return this;
		},
		publish: function(event) {
			console.log("ArticleView-publish");
			var title = $(this.el).find('input[name=title]').val();
			var body = $(this.el).find('textarea[name=body]').val();
			var category = $(this.el).find('select[name=category]').val();
			new ArticleView(title,body,category);
			event.preventDefault();
		},
		clear: function() {
			console.log("ArticleView-clear");
			var view = this;
			$(this.el).hide("slow");
			var t = setTimeout(function(){
				$.publish("deleteEvents",[view.model]);
			},500);
	    }
	});
});