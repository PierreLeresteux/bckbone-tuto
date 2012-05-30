define(function() {
  return Backbone.Router.extend({
    routes: {
      "articles": "articles",    
      "newarticle": "newarticle"
    },
    initialize: function(param) {
      console.log("Route-init");
    },
    articles: function() {
      console.log("Route - articles");  
    },

    newarticle: function() {
      console.log("Route - newarticle");
    }
  });
});