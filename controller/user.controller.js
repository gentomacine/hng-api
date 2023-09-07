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
  const userId = req.params.userId;

  try {
    // Find the user by their _id
    const user = await User.findById(userId);

    // Send the user's slackname and track in the response
    res.status(200).json({
      slackname: user.slackname,
      track: user.track,
      currentDay: user.currentDay,
      githubFileUrl: user.githubFileUrl,
      githubRepo: user.githubRepo,
      utcTime: user.utcTime
    });
  } catch (error) {
    // Handle errors and provide a more informative response
    res.status(500).json({ message: error.message });
  }
};
