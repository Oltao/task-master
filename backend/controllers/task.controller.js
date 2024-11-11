import Task from "../models/task.model.js";

export const createTask = async (req, res) => {
  const { title, description, deadline, priority } = req.body;

  if (!title || !description || !deadline || !priority) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const task = await Task.create({
      user: req.user,
      title,
      description,
      deadline,
      priority,
    });

    console.log(task);

    if (!task) {
      return res
        .status(500)
        .json({ message: "Error occurred while creating task"});
    }

    return res.status(201).json(task);
  } catch (error) {
    if (error.name === "ValidationError") {
      return res
        .status(400)
        .json({ message: "Error validating task data", reason: error.message });
    }

    console.error(error);
    return res
      .status(500)
      .json({ message: "Server error", reason: error.message });
  }
};
export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();

    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Server error", reason: error.message });
  }
};
export const getTask = async (req, res) => {
  const { id } = req.params;

  try {
    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: "Server error", reason: error.message });
  }
};
export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, deadline, priority } = req.body;

    if (!title || !description || !deadline || !priority) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingTask = await Task.findById(id);

    if (!existingTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    existingTask.title = title;
    existingTask.description = description;
    existingTask.deadline = deadline;
    existingTask.priority = priority;

    await existingTask.save();

    return res.status(200).json(existingTask);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", reason: error.message });
  }
};
export const deleteTask = async (req, res) => {
  const { id: taskId } = req.params;

  try {
    const task = await Task.findByIdAndDelete(taskId);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", reason: error.message });
  }
};
