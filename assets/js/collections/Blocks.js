define(['models/Block'], function(Block) {
	return Backbone.Collection.extend({
		model: Block,
		initialize: function(type, id, callback) {
			this.callback = callback;
			this.type = type;
			if(type == 'page')
                this.setFromPage(id);
            else
                this.setFromTemplate(id);
		},
 		setFromTemplate: function(id) {
            this.url = this.baseUrl() + '/lpagesapi/template/'+id+'?datenocache='+new Date().getTime();
 	    },
 	    setFromPage: function(id) {
			this.url = this.baseUrl() + '/lpagesapi/page/'+id+'?blocks=true&datenocache='+new Date().getTime();
			this.pageId = id;
 	    },
 	    parse: function(response) {
 	    	if(this.type == 'page') {
 	    		this.callback(response.name, response.status == 'INACTIVE');
 	    		$('#nameInput').val(response.name);
 	    	} else {
 	    		this.callback("", true);
 	    		$('#nameInput').val('');
 	    	}
 	    	return response.blocks;
		},
		isNew: function() {
			return this.pageId == undefined;
		},
		setSaved: function(pageId) {
			this.pageId = pageId;
		},
        baseUrl: function() {
        	// delete this shit when a real integration platform will be delivered to us...
			var url = '';
			if ($(location).attr('href').toLowerCase().indexOf('/r1/') > 0) {
				url += "/r1";
			}
			return url;
        }
	});
});