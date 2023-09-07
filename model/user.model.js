import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        slack_name: {
            type: String,
            required: [true, "slackname is needed"]
        },
        
        track: {
            type: String,
            required: [true, "track is needed"]
        },

        current_day: {
            type: String, // Change the field type to String
            enum: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], // Use an enum to specify the days of the week
            required: [true, "currentDay is needed"]
        },

        utc_time: {
                type: Date,
                default: Date.now,
                get: (v) => v.toISOString() // Convert the Date to ISO8601 format
        },

        github_file_url: {
            type: String
        },
        github_repo: {
            type: String
        },
    },
    {
        timestamps: true,
        toJSON: { virtuals: true }
    }
);

const User = mongoose.model("User", userSchema);

export default User;
