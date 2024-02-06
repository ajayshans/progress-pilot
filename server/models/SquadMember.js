// Utilise mongoose ODM
const { Schema, model } = require("mongoose");

// Schema to create SquadMember model
const squadMemberSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
			unique: true,
			trim: true,
		},
        // Relation to goal owner
		relation: {
			type: String,
			required: true,
		},
        // 0-2 range, where 1 is average
		efficacyScore: {
			type: String,
			required: true,
		},
        // Time squad member is able to commit to goal
		weeklyHoursAvailable: {
			type: String,
			required: true,
		},
        // Owner of the goal
		owner: {
			type: String,
			required: true,
			trim: true
			// type: Schema.Types.ObjectId,
			// ref: "User",
		},
	},
	// Ensures availability of virtual properties
	{
		toJSON: {
			virtuals: true,
		},
	}
);

// Initialise SquadMember model
const SquadMember = model("SquadMember", squadMemberSchema);

module.exports = SquadMember;