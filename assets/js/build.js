define(['views/BlogView'], 
    function(BlogView) {
    return {
        initialize: function() {
        	var view = this;
        	var blog = new BlogView;
        	$('#container').html(blog.render().el);
        }
    };
});