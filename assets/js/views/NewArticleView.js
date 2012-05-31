define(['views/ArticleView','models/Article','router/Routes'],function(ArticleView,Article,Routes) {
	return Backbone.View.extend({
		initialize: function(param) {
			console.log("NewArticleView-init");
			this.articles = param.collection;
			this.router = param.router;
			var view = this;
			require(["text!templates/articleTemplate.html" ], function(t) {
				view.template = t;
			});
		},
		events: {
			'click .btn': 'publish'
		},
		render: function() {
			console.log("NewArticleView-render");
			var line = $(this.template).find('#new-article').html();
				
			var template = Handlebars.compile(line);
			$(this.el).html(template());
			this.$('.alert').hide();
			return this;
		},
		publish: function(event) {
			console.log("NewArticleView-publish");
			event.preventDefault();
			
			var view = this;
			$(view.el).find('.form-actions').hide();
			
			var title = $(view.el).find('input[name=title]').val();
			var body = $(view.el).find('textarea[name=body]').val();
			var category = $(view.el).find('select[name=category]').val();	
			this.articles.create({"title":title,"body":body,"category":category});
			this.$('.alert').show("slow");
			var t = setTimeout(function(){
				view.render();
			},4000);
		}
	});
});