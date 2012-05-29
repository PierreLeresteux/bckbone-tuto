define(['views/NewArticleView'],function(NewArticleView) {
	return Backbone.View.extend({
		initialize: function() {
			console.log("init blog");
			var view = this;
			require(["text!templates/articleTemplate.html" ], function(t) {
				view.template = t;
			});
		},
		events: {
			'newArticleEvent':'addArticle'
		},
		render: function() {
			var line = $(this.template).find('#blog').html();
			var template = Handlebars.compile(line);
			$(this.el).html(template());
			this.addNewArticle();
			return this;
		},
		addNewArticle: function() {
			var newArticle = new NewArticleView;
        	var renderNewArticle = newArticle.render();
        	$(this.el).find('#newarticle').html(renderNewArticle.el);
		},
		addArticle: function(event) {
			console.log("addArticle Event");
			$(this.el).find('#blogarticles').append(new ArticleView({"title":event.title,"body":event.body,"category":event.category}).render().el);
		}

	});
});