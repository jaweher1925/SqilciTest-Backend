
const ProjectModel = require('../../model/project/projectModel');

module.exports = {
  createProject: async (req, res) => {
    try {
      const project = new ProjectModel(req.body);
      const savedProject = await project.save();
      return res.status(201).json({ message: "success", data: savedProject });
    } catch (err) {
      return res.status(500).json({ message: "error", err });
    }
  },
  createBulkProject: async (req, res) => {
    try {
      const projects = req.body;
      const createBulkProject = await ProjectModel.insertMany(projects);
      return res
        .status(201)
        .json({ message: "success", data: createBulkProject });
    } catch (err) {
      return res.status(500).json({ message: "error", err });
    }
  },
  getProjects: async (req, res) => {
    try {
      const projects = await ProjectModel.find();
      return res.status(200).json({ data: projects });
    } catch (err) {
      return res.status(500).json({ message: "error", err });
    }
  },

  getProjectsId: async (req, res) => {
    try {
      const project = await ProjectModel.findById(req.params.id);
      if (!project) {
        return res.status(404).json({ message: "project not found" });
      }
      return res.status(200).json({ data: project });
    } catch (err) {
      return res.status(500).json({ message: "error", err });
    }
  },
  updateProject: async (req, res) => {
    try {
      const { id } = req.params;
      const updateData = req.body;
      console.log("Update data:", updateData); // Log the update data
  
      const updatedProject = await ProjectModel.findByIdAndUpdate(id, updateData, { new: true });
      if (!updatedProject) {
        return res.status(404).json({ message: "Project not found" });
      }
      return res.status(200).json({ message: "success", data: updatedProject });
    } catch (err) {
      console.error("Error updating project:", err);
      return res.status(500).json({ message: "Error updating project", error: err.message });
    }
  },  
  

  deleteProject: async (req, res) => {
    try {
      const deleteProject = await ProjectModel.findByIdAndDelete(req.params.id);
      if (!deleteProject) {
        return res.status(404).json({ message: "Project not found" });
      }
      return res.status(200).json({ message: "Project deleted successfully" });
    } catch (err) {
      return res.status(500).json({ message: "error", err });
    }
  },
  patchProjectStudents: async (req, res) => {
    try {
      const { id } = req.params;
      const update = req.body;

      const updatedProject = await ProjectModel.findByIdAndUpdate(id, update, {
        new: true,
        runValidators: true,
      });

      if (!updatedProject) {
        return res.status(404).json({ message: "Project not found" });
      }

      return res.status(200).json({ message: "success", data: updatedProject });
    } catch (err) {
      console.error("Error updating project students:", err);
      return res
        .status(500)
        .json({
          message: "Error updating project students",
          error: err.message,
        });
    }
  },
};