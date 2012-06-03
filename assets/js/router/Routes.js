define(['views/BlogView','views/NewArticleView'],function(BlogView, NewArticleView) {
  return Backbone.Router.extend({
    routes: {
      "articles": "articles",    
      "newarticle": "newarticle"
    },
    initialize: function(param) {
      console.log("Route-init");
      this.blog = new BlogView;
      this.articles();
    },
    articles: function() {
      console.log("Route - articles");  
      $('#container').empty().append(this.blog.render().el);
      this.blog.load();
    },

    newarticle: function() {
      console.log("Route - newarticle");
      var newArticle = new NewArticleView({"collection":this.blog.articles,"router":this});
      var renderNewArticle = newArticle.render();
      $('#container').html(renderNewArticle.el);
    }
  });
});