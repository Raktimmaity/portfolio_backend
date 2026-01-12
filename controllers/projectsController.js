const Project = require("../models/Project");

const getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const getPublicProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const createProject = async (req, res) => {
  try {
    const { title, imageUrl, projectLink, githubLink, projectType, skills, cost, description } =
      req.body;
    if (!title) return res.status(400).json({ message: "Project title is required" });
    const project = await Project.create({
      title,
      imageUrl: imageUrl || "",
      projectLink: projectLink || "",
      githubLink: githubLink || "",
      projectType: projectType || "Minor",
      skills: Array.isArray(skills) ? skills : [],
      cost: cost || "Free",
      description: description || "",
    });
    res.status(201).json(project);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const updateProject = async (req, res) => {
  try {
    const { title, imageUrl, projectLink, githubLink, projectType, skills, cost, description } =
      req.body;
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      {
        title,
        imageUrl: imageUrl || "",
        projectLink: projectLink || "",
        githubLink: githubLink || "",
        projectType: projectType || "Minor",
        skills: Array.isArray(skills) ? skills : [],
        cost: cost || "Free",
        description: description || "",
      },
      { new: true }
    );
    if (!project) return res.status(404).json({ message: "Project not found" });
    res.json(project);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const deleteProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found" });
    res.json({ message: "Project deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getProjects, getPublicProjects, createProject, updateProject, deleteProject };
