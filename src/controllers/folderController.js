const express = require("express");
const Folder = require("../models/Folder");
const fs = require("fs");
const path = require("path");

function createPath(id) {
  return path.join(__dirname, `../../uploads/${id}`);
}

/**
 * POST /api/folders
 * Create a folder
 * @param {express.Request} req
 * @param {express.Response} res
 */
async function createFolder(req, res) {
  const { name } = req.body;
  try {
    if (name) {
      const folder = new Folder({ name: name });
      await folder.save();
      fs.mkdirSync(createPath(folder._id));
      const payload = {
        message: "Folder created successfully",
        data: folder._id,
      };
      res.status(201).json(payload);
    } else {
      res.status(400).json({ error: "Folder name is missing in body" });
    }
  } catch (e) {
    res.status(500).json({ error: "Internal Server Error:->" + e.message });
  }
}

/**
 * PUT /api/folders/:id
 * Rename a folder
 * @param {express.Request} req
 * @param {express.Response} res
 */
async function reNameFolder(req, res) {
  const { name } = req.body;
  const { id } = req.params;
  try {
    if (name && id) {
      await Folder.findByIdAndUpdate(id, { name: name });
      res.status(201).json({ message: "Folder renamed successfully" });
    } else {
      res.status(400).json({ error: "Folder name & id is required" });
    }
  } catch (e) {
    res.status(500).json({ error: "Internal Server Error:->" + e.message });
  }
}

/**
 * POST /api/folders/:id/upload
 * Upload a file to a folder
 * @param {express.Request} req
 * @param {express.Response} res
 */
function uploadFile(req, res) {
  try {
    res.status(201).json({ message: "File uploaded successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

/**
 * DELETE /api/folders/:id
 * Delete a folder
 * @param {express.Request} req
 * @param {express.Response} res
 */
async function deleteFolder(req, res) {
  const { id } = req.params;
  try {
    if (id) {
      const result = await Folder.findByIdAndDelete(id);
      if (!result) {
        return res.status(404).json({ error: "Folder not found" });
      }
      fs.unlinkSync(createPath(id));
      res.status(201).json({ message: "Folder deleted successfully" });
    } else {
      res.status(400).json({ error: "Folder id is required" });
    }
  } catch (e) {
    res.status(500).json({ error: "Internal Server Error:->" + e.message });
  }
}

module.exports = {
  createFolder,
  reNameFolder,
  uploadFile,
  deleteFolder,
};
