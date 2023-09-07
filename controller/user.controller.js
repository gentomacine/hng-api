import User from "../model/user.model.js";

export const createUser = async (req, res) => {
    const { slack_name, track, current_day, github_file_url, github_repo_url, utc_time } = req.body;
  
    try {
      // Check if a user with the same slackname and track already exists
      const foundUser = await User.findOne({ slack_name, track });
  
      if (foundUser) {
        return res.status(409).json({ message: "User already exists" });
      }
  
      // Create a new user
      const newUser = await User.create({
        slack_name,
        track,
        current_day,
        github_file_url,
        github_repo_url,
        utc_time,
      });
  
      res.status(201).json({
        status: "success",
        data: newUser,
      });
    } catch (error) {
      // Handle errors and provide a more informative response
      res.status(500).json({ message: error.message });
    }
  };
  
  export const getUserInfo = async (req, res) => {
    const { slack_name, track } = req.query; // Retrieve values from query parameters
  
    try {
      // Find the user that matches both slackname and track criteria
      const user = await User.findOne({ slack_name, track });
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.status(200).json({
        slack_name: user.slack_name,
        track: user.track,
        current_day: user.current_day,
        github_file_url: user.github_file_url,
        github_repo_url: user.github_repo_url,
        utc_time: user.utc_time,
        status_code: 200,
      });
    } catch (error) {
      // Handle errors and provide a more informative response
      res.status(500).json({ message: error.message });
    }
  };