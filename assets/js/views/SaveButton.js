define([], function() {
    return Backbone.View.extend({
		el: '#buttonSave',
        events: {
            'click': 'save'
        },
        save: function() {
        	if (this.valid()) {
	            var saveEvent = $.Event("savethelandingpage");
	            saveEvent.pageName = $('#nameInput').val();
	            saveEvent.callback = function() {};
	            $('#editorContentPanel').trigger(saveEvent);
            }
        },
        valid: function() {
        	var valid = true;
        	var val = $('#nameInput').val();
        	if (_.isEmpty(val) || _.isNull(val) || _.isUndefined(val)) {
				valid = false;
				$('#nameInput').css('border-color', 'red');
        	} else {
        		$('#nameInput').css('border-color', 'initial');
        	}
        	return valid;
        }
	});
});