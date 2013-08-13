if (Meteor.isClient) {
	Template.ingredients.ingredients = function() {
		return Ingredients.find({}, { sort: { name: 1} }).fetch();
	}
	Template['edit-ingredient'].props = templateProps;

	Template.ingredients.propNames = function() {
		return props;
	}

	Template.ingredients.props = function() {
		var prop, propObj, out = '';
		// TODO, escape

		for (var i=0; i < props.length; i++) {
			prop = props[i];
			out += '<td>';
			if (this.props && this.props[prop]) {
				propObj = this.props[props[i]];
				out += '<span title="x">' + propObj.status + '</span>';
				if (propObj.source)
					out += ' <a target="_blank" href="' + propObj.source + '">(?)</a>';
			}
			out += '</td>\n';
		}
		return new Handlebars.SafeString(out);
	}

	Template.ingredients.rendered = function() {
		$('#ingredients span[title]').tooltip();
	}

	Template.ingredients.events({
		'click a.edit': function() {
			var mTpl = Template['edit-ingredient'];
			mTpl.ingredient = new Ingredient(this._id);
			var editableSuccessTpl = _.partial(editableSuccess, mTpl.ingredient);

			modal({
				title: 'Edit Ingredient',
				body: new Handlebars.SafeString(mTpl())
			});

			$('#edit-ingredient span[data-id="status"]').editable({
				source: allStatuses, emptytext: 'Unset', success: editableSuccessTpl
			});

			// anything that doesn't already have one
			$('#edit-ingredient span').editable({ success: editableSuccessTpl });

			$('#modalStandard .btn-primary').click(function() {
			  mTpl.ingredient.save();
			});
		}
	});

}