define(['views/BlogView','views/NewArticleView'],function(BlogView, NewArticleView) {
  return Backbone.Router.extend({
    routes: {
      "articles": "articles",    
      "newarticle": "newarticle"
    },
    initialize: function(param) {
      console.log("Route-init");
      this.blog = new BlogView;
    },
    articles: function() {
      console.log("Route - articles");  
      $('#container').html(this.blog.render().el);
      this.blog.load();
    },

    newarticle: function() {
      console.log("Route - newarticle");
      var newArticle = new NewArticleView({"collection":this.blog.articles});
      var renderNewArticle = newArticle.render();
      $('#container').html(renderNewArticle.el);
    }
  });
});