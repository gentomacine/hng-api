import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    slack_name: {
      type: String,
      required: [true, "slackname is needed"],
    },

    track: {
      type: String,
      required: [true, "track is needed"],
    },

    current_day: {
      type: String,
      enum: [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      required: [true, "currentDay is needed"],
    },
    utc_time: {
        type: Date,
        default: Date.now,
        get: function () {
          const date = new Date(this.createdAt);
          return new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString().slice(0, -5) + "Z";
        },
      },

    github_file_url: {
      type: String,
    },
    github_repo_url: {
      type: String,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
);

const User = mongoose.model("User", userSchema);

export default User;
