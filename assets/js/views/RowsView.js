define(['views/RowView'], function(RowView) {
	return Backbone.View.extend({
		el: '#editorContentPanel',
		events: {
			"click #plus": "addOne",
			"addOneEvent": "addOneHandler",
			"deleteARowEvent": "deleteRowHandler",
			'sortstart': 'sortstart',
			'sortstop': 'sortstop'
		},
		initialize: function() {
			var view = this;
			this.blockPerLine = [];

			var size = 0, items = [];
            this.collection.each(function(block) {
                size += block.get('size');
                if(size <= 12)
                    items.push(block);
                
                if(size == 12) {
					view.addOne(items[0], items[1], items[2]);
                    size = 0, items = [];
                }
            });
		},
		updateInnerRepresentation: function() {
			var view = this;
			this.blockPerLine = [];

			var size = 0, items = [];
			this.collection.each(function(block) {
				size += block.get('size');
                if(size <= 12)
                    items.push(block);
                
                if(size == 12) {
					view.blockPerLine.push(items.length);
                    size = 0, items = [];
                }
			});
		},
		addOne: function(one, two, three) {
			var count = 0;
			count += this.hasContent(one);
			count += this.hasContent(two);
			count += this.hasContent(three);
			this.blockPerLine.push(count);

			var view = new RowView;
			var content = view.render(one, two, three).el;

			$('#rows').append(content);
			$('#rows').sortable({handle: '.rowEditor'});
		},
		addOneHandler: function(event) {
			var row = event.row;
			this.addOne(row[0], row[1], row[2]);
			this.collection.add(row);
		},
		hasContent: function(model) {
			return model != undefined;
		},
		deleteRowHandler: function(event) {
			var collection = this.collection;
			_.each(event.blocs, function(bloc){
				if (bloc != undefined) {
					collection.remove(bloc);
				}
			});
			this.updateInnerRepresentation();
		},
		sortstart: function(event, ui) {
			this.oldPosition = ui.item.index();
		},
		sortstop: function(event, ui) {
			this.newPosition = ui.item.index();

			if(this.oldPosition != this.newPosition)
				this.switchRowAndInnerRepresentation();
		},
		switchRowAndInnerRepresentation: function() {
			this.switchRow();
			this.switchInnerRepresentation();
		},
		switchRow: function() {
			var nbBlocks = this.blockPerLine[this.oldPosition];

			if(this.oldPosition < this.newPosition) {
				var from = this.blocksWithout(this.oldPosition);
				var to = this.blocksWith(this.newPosition) - 1;
			} else {
				var from = this.blocksWithout(this.oldPosition) + nbBlocks - 1;
				var to = this.blocksWithout(this.newPosition);
			}
			for(var i = 0; i < nbBlocks; i++) {
				var toMove = this.collection.at(from);
				this.collection.remove(toMove);
				this.collection.add(toMove, {at: to});
			}
		},
		switchInnerRepresentation: function() {
			if(this.oldPosition < this.newPosition) {
				for(var i = this.oldPosition; i < this.newPosition; i++) {
					var tmp = this.blockPerLine[i];
					this.blockPerLine[i] = this.blockPerLine[i+1];
					this.blockPerLine[i+1] = tmp;
				}
			} else {
				for(var i = this.oldPosition; i > this.newPosition; i--) {
					var tmp = this.blockPerLine[i];
					this.blockPerLine[i] = this.blockPerLine[i-1];
					this.blockPerLine[i-1] = tmp;
				}
			}
		},
		blocksWithout: function(row) {
			var position = 0;
			for(var i = 0; i < row; i++)
				position += this.blockPerLine[i];
			return position;
		},
		blocksWith: function(row) {
			var position = 0;
			for(var i = 0; i <= row; i++)
				position += this.blockPerLine[i];
			return position;
		}
	});
});