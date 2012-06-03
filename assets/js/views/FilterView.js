define(function() {
	return Backbone.View.extend({
		initialize: function(param) {
			console.log("FilterView-init");
			var view = this;
			require(["text!templates/articleTemplate.html" ], function(t) {
				view.template = t;
			});
			this.blogView = param.blogView;
		},
		events: {
			'click .btn' : 'changeFilter'
		},
		render: function() {
			console.log("FilterView-render");
			var line = $(this.template).find('#filter').html();
			var template = Handlebars.compile(line);
			$(this.el).empty().append(template());
			return this;
		},
		changeFilter: function(event) {
			console.log("FilterView-changeFilter");
			var target = event.target ? event.target : event.srcElement;
			$(target).toggleClass('active');
			var actives = this.$('.btn').filter('.active');
			var categories = new Array();
			var cpt = 0;
			_.each(actives,function(a){
				categories[cpt] =  $(a).attr('id');
				cpt ++;
			});
			var collection = this.blogView.articles;
			var evens = _.filter(collection.toJSON(), function(article){ 
				return (_.indexOf(categories, article.category)>-1);				
			});
			this.blogView.changeFilter({"collection":evens});
		}
	});
});