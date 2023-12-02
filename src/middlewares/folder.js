const express = require("express");
const path = require("path");
const fs = require("fs");

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
function checkFolderExists(req, res, next) {
  const { id } = req.params;
  if (id) {
    const folderPath = path.join(__dirname, `../../uploads/${id}`);
    if (fs.existsSync(folderPath)) {
      console.log("Folder exists for" + id);
      next();
    } else {
      res.status(400).json({ error: "Folder does not exist or created" });
    }
  } else {
    res.status(400).json({ error: "Folder id is required" });
  }
}

module.exports = checkFolderExists;
