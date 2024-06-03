const Team = require("../modules/teamModule");

teamResult = async (req, res) => {
  try {
    const teams = await Team.find().sort({ points: -1 });
    const topPoints = teams[0].points;
    const winners = teams.filter((team) => team.points === topPoints);

    res.status(200).json({
      message: "Team results",
      results: teams,
      winners: winners.map((w) => w.name),
    });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { teamResult };
