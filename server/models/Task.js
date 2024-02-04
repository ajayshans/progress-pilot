// Import mongoose ODM
const { Schema } = require("mongoose");

// Format date via helper function
const dateFormat = require("../utils/dateFormat");

// Schema used for tasks field (array of task subdocuments) used in Goal model
const taskSchema = new Schema(
	{
		taskName: {
			type: String,
			required: "Your task needs a name.",
			trim: true,
		},
		taskDescription: {
			type: String,
			required: "Your task needs a description.",
			minlength: 1,
			maxlength: 280,
			trim: true,
		},
		taskAssignee: {
			type: Schema.Types.ObjectId,
			ref: "SquadMember",
		},
		taskCreatedAt: {
			type: Date,
			default: Date.now,
			get: (timestamp) => dateFormat(timestamp),
		},
        taskComplete: {
            type: Boolean,
            required: true,
            default: false
        },
	},
	// Ensures availability of virtual properties
	{
		toJSON: {
			virtuals: true,
		},
	}
);

module.exports = taskSchema;