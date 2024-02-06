// Utilise mongoose ODM
const { Schema, model } = require("mongoose");
const taskSchema = require("./Task");

// Format date via helper function
const dateFormat = require("../utils/dateFormat");

// Schema to create Goal model
const goalSchema = new Schema(
	{
		goalName: {
			type: String,
			required: "Your goal needs a name.",
			trim: true,
		},
		goalDescription: {
			type: String,
			required: "Your goal needs a description.",
			minlength: 1,
			maxlength: 280,
			trim: true,
		},
		goalOwner: {
			type: String,
			required: true,
			trim: true,
		  },
		goalReward: {
			type: String,
			required: "Your goal needs a reward.",
			minlength: 1,
			maxlength: 280,
			trim: true,
		},
		createdAt: {
			type: Date,
			default: Date.now,
			get: (timestamp) => dateFormat(timestamp),
		  },
		// Array of task subdocuments
		tasks: [taskSchema],
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

// Create a virtual property "taskCount" that gets the number of tasks assigned to the goal
taskSchema.virtual("taskCount").get(function () {
	return this.tasks.length;
});

// Create a virtual property "taskProgress" that gets the percentage of total tasks assigned to a goal that have been completed
taskSchema.virtual("taskProgress").get(function () {
    if (this.tasks.length == 0) {
        return 0;
    } else {
        let completedTaskCount = 0;
        for (let i = 0; i < this.tasks.length; i++) {
            if (this.tasks[i].taskComplete) {
                completedTaskCount++;
            }
        }
        return (completedTaskCount/this.tasks.length) * 100;
    }
});

// Initialise Goal model
const Goal = model("Goal", goalSchema);

module.exports = Goal;