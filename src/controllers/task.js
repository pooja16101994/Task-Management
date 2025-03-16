const Task = require("../models/task");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const express = require("express");

// function to create task(post)
async function createTask(req, res) {
  try {
    const { title, description, status } = req.body;

    if (!title) {
      return res.status(400).json({ msg: "Title is required" });
    }

    const task = new Task({
      title,
      description,
      status: status || "pending",
      user: req.user.id,
    });
    console.log("req.user", req.user);

    await task.save();
    res.status(201).json(task);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal server error" });
  }
}

// function to get all task (admin) / get user task(GET)
async function allTasks(req, res) {
  try {
    const tasks = await Task.find({ user: req.user.id });
    res.send(tasks);
  } catch (error) {
    res.status(500).send(error);
  }
}

// function to get specific task by id (GET)
async function getTaskById(req, res) {
  const _id = req.params.id;

  try {
    const task = await Task.findOne({ id, user: req.user.id });

    if (!task) {
      return res.status(404).json({ msg: "No task found" });
    }
    res.send(task);
  } catch (error) {
    res.status(500).send(error);
  }
}

// function to update task (only owner or admin) (PUT)
async function updateTaskById(req, res) {
  try {
    const updates = object.keys(req.body);
    const allowedUpdates = ["description", "status"];
    const isValidOperation = updates.every((update) =>
      allowedUpdates.includes(update)
    );

    if (!isValidOperation) {
      return res.status(400).send({ error: "Invalid updates!" });
    }

    const task = await Task.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!task) {
      return res.status(404).json({ msg: "No Tasks found!!!" });
    }

    updates.forEach((update) => (task[update] = req.body[update]));
    await task.save();
    res.send(task);
  } catch (error) {
    res.status(400).send(e);
  }
}

// function to delete task by owner / admin (DELETE)
async function deleteTask(req, res) {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!task) {
      return res.status(404).json({ msg: "No task found" });
    }

    res.send(task);
  } catch (e) {
    res.status(500).send(e);
  }
}

module.exports = {
  createTask,
  allTasks,
  getTaskById,
  updateTaskById,
  deleteTask,
};
