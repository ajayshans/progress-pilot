const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

// Schema to create User model
const userSchema = new Schema(
	{
		username: {
			type: String,
			required: true,
			unique: true,
			trim: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
			// Regex email validation
			match: [
				/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
				"Please use a valid email address.",
			],
		},
		password: {
			type: String,
			required: true,
		},
		// Array of ids of goals created by a user
		goals: [
			{
				type: Schema.Types.ObjectId,
				ref: "Goal",
			},
		],
		// Array of ids of people in a user/goal owner's squad
		squadMembers: [
			{
				type: Schema.Types.ObjectId,
				ref: "SquadMember",
			},
		],
	},
	// Ensures availability of virtual properties
	{
		toJSON: {
			virtuals: true,
		},
	}
);

// Hash user's password
userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// Custom method to compare and validate password when user logs in
userSchema.methods.isCorrectPassword = async function (password) {
	return bcrypt.compare(password, this.password);
};

// Create a virtual property "goalCount" that gets the number of goals a user/goal owner has
userSchema.virtual("goalCount").get(function () {
	return this.goals.length;
});

// Create a virtual property "squadCount" that gets the number of people in a user/goal owner's squad
userSchema.virtual("squadCount").get(function () {
	return this.squadMembers.length;
});

// Initialise User model
const User = model("User", userSchema);

module.exports = User;