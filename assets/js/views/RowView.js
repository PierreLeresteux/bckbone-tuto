	define(['views/TextView', 'views/ImageView', 'views/FormView'], function(TextView, ImageView, FormView) {
		return Backbone.View.extend({
			events: {
				'mouseenter': 'showTooltip',
				'mouseleave': 'hideTooltip',
				'click .icon-trash': 'deleteRow',
				'click .icon-retweet': 'editRow'
			},
			initialize: function() {
				var view = this;
				require(["text!templates/templates.html" ], function(templates) {
					view.templates = templates;
				});
			},
			render: function(columnOne, columnTwo, columnThree) {
				this.blocs = [];
				this.blocs.push(columnOne);
				this.blocs.push(columnTwo);
				this.blocs.push(columnThree);
				this.blocs = _.compact(this.blocs);

				var length = this.blocs.length;

				var line = $(this.templates).find('#'+ length +'-column-template').html();
				var context = {
					size1:columnOne.get('size'), 
					size2:columnTwo == undefined ? undefined : columnTwo.get('size'), 
					size3:columnThree == undefined ? undefined : columnThree.get('size')
				};
				var template = Handlebars.compile(line);

				$(this.el).html(template(context));
				this.addViewToSelector(columnOne, '.content-one');
				if(length > 1)
					this.addViewToSelector(columnTwo, '.content-two');
				if (length > 2)
					this.addViewToSelector(columnThree, '.content-three');

				return this;
			},
			addViewToSelector: function(column, selector) {
				var view;

				switch (column.get('type')) {
				case 'text':
					view = new TextView({model: column});
					break;
				case 'image':
					view = new ImageView({model: column});
					break;
				case 'form':
					view = new FormView({model: column});
					break;
				}
				this.$(selector).append(view.render().el);
			},
			deleteRow: function() {
				$(this.el).remove();
				var deleteARowEvent = $.Event("deleteARowEvent");
				deleteARowEvent.blocs = this.blocs;
				$('#editorContentPanel').trigger(deleteARowEvent);
			},
			editRow: function() {
				if (this.blocs.length == 2) {
					if (this.blocs[0].get("size") == 6){
						// Go 2/3 1/3
						this.blocs[0].set("size",8);
						this.blocs[1].set("size",4);
					} else if (this.blocs[0].get("size") == 8){
						// Go 1/3 2/3
						this.blocs[0].set("size",4);
						this.blocs[1].set("size",8);
					} else {
						// Go 1/2 1/2
						this.blocs[0].set("size",6);
						this.blocs[1].set("size",6);
					}
					this.render(this.blocs[0],this.blocs[1]);
				} 
			},
			showTooltip: function() {
				var sourceEditor = $(this.templates).find('#row-ed').html();
				var templateEditor = Handlebars.compile(sourceEditor);
				this.$('.rowEditor').html(templateEditor());
				this.$('.rowEditor').css('display', 'block');
				this.$('.rowEditor').css('cursor', 'move');
				this.$('.icon-retweet').css('cursor','pointer');
				this.$('.icon-trash').css('cursor','pointer');

				if (this.blocs.length != 2){
					this.$('.icon-retweet').css('display', 'none');
				}
			},
			hideTooltip: function() {
				this.$('.rowEditor').html('');
				this.$('.rowEditor').css('display', 'none');
			},
		});
	});