const express = require("express");
const fs = require("fs");
const path = require("path");
const Team = require("../modules/teamModule");
const { calculatePoints } = require("../utils/points");

processResult = async (req, res) => {
  const matchData = JSON.parse(
    fs.readFileSync(path.resolve(__dirname, "../data/match.json"))
  );

  try {
    const teams = await Team.find();

    for (const team of teams) {
      let teamPoints = 0;

      for (const playerName of team.players) {
        const playerPoints = calculatePoints(playerName, matchData);
        teamPoints += playerPoints;

        if (playerName === team.captain) {
          teamPoints += playerPoints; // double points
        } else if (playerName === team.viceCaptain) {
          teamPoints += playerPoints * 0.5; // 1.5x points
        }
      }

      team.points = teamPoints;
      await team.save();
    }

    res.status(200).json({ message: "Results processed successfully" });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { processResult };
