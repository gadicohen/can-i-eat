/* Server-side only model related code */

function allowIfLoggedIn(user_id) { return !!user_id; }

Products.allow({
	insert: allowIfLoggedIn,
	update: allowIfLoggedIn
});

Products.deny({
	insert: defaultInsertDeny,
	update: defaultUpdateDeny
});
Products.deny({
	insert: function(user_id, doc) {
		Meteor.users.update(user_id, { $inc: { addCount: 1 } });
		return false;
	},
	update: function(user_id, doc) {
		Meteor.users.update(user_id, { $inc: { editCount: 1 } });
		return false;		
	}
});

Companies.allow({
	insert: allowIfLoggedIn,
	//update: allowIfLoggedIn
});

Companies.deny({
	insert: defaultInsertDeny
});

Categories.allow({
	insert: allowIfLoggedIn,
	//update: allowIfLoggedIn
});

Categories.deny({
	insert: defaultInsertDeny
});

Ingredients.allow({
	insert: allowIfLoggedIn,
	update: allowIfLoggedIn
});

Ingredients.deny({
	insert: defaultInsertDeny,
	update: defaultUpdateDeny
});