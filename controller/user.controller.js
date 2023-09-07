import User from "../model/user.model.js";

export const createUser = async (req, res) => {
  const { slackname, track, currentDay, githubFileUrl, githubRepo, utcTime} = req.body;

  try {
    // Check if a user with the same slackname already exists
    const foundUser = await User.findOne({ slackname });

    if (foundUser) {
      return res.json({ message: "User already exists" });
    }

    // Create a new user
    const newUser = await User.create({
      slackname,
      track,
      currentDay,
      githubFileUrl,
      githubRepo,
      utcTime
    });

    res.status(201).json({
      status: "success",
      data: newUser,
    });
  } catch (error) {
    // Handle errors and provide a more informative response
    res.json({ message: error.message });
  }
};

export const getUserInfo = async (req, res) => {
    const { slackname, track } = req.query; // Retrieve values from query parameters
  
    try {
      // Create a query object with both conditions
      const query = {
        slackname,
        track,
      };
  
      // Find the user that matches both slackname and track criteria
      const user = await User.findOne(query);
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.status(200).json({
        status: "success",
        data: user,
      });
    } catch (error) {
      // Handle errors and provide a more informative response
      res.status(500).json({ message: error.message });
    }
  };
  