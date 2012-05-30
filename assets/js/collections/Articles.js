define(['models/Article'], function(Article) {
	return Backbone.Collection.extend({
		model: Article,
		localStorage: new Store("blogbackbone")
	});
});