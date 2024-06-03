const Team = require("../modules/teamModule");
const { validateTeam } = require("../utils/validation");

teamFunction = async (req, res) => {
  const { name, players, captain, viceCaptain } = req.body;

  // Validate team entry
  const validationError = validateTeam(name, players, captain, viceCaptain);
  if (validationError) {
    return res.status(400).json({ error: validationError });
  }

  // Create and save the team entry
  const team = new Team({ name, players, captain, viceCaptain });
  try {
    await team.save();
    res.status(201).json({ message: "Team added successfully" });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { teamFunction };
