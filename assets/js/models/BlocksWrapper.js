define(function() {
	return Backbone.Model.extend({
		initialize: function(blocks) {
			this.name = "";
			this.blocks = blocks;
			this.on('sync', function() {
				if (this.id)
		        	blocks.setSaved(this.id);
		    });
		},
		isNew: function() {
			return this.blocks.isNew();
		},
		url: function() {
			if(this.isNew())
				return this.baseUrl() + '/lpagesapi/page?datenocache='+new Date().getTime();
            else
                return this.baseUrl() + '/lpagesapi/page/' + this.blocks.pageId + "?blocks=true&datenocache="+new Date().getTime();
		},
        toJSON: function() {
        	return {
    			name: this.name, 
    			blocks: this.blocks.toJSON()
    		};
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