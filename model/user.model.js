import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        slackname: {
            type: String,
            required: [true, "slackname is needed"]
        },
        
        track: {
            type: String,
            required: [true, "track is needed"]
        },

        currentDay: {
            type: Date,
            default: Date.now // Set the default value to the current date and time
        },

        utcTime: {
            type: Date,
            default: Date.now // Set the default value to the current date and time
        },

        githubFileUrl: {
            type: String
        },
        githubRepo: {
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
