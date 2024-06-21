
const ProjectModel = require('../../model/project/projectModel');

module.exports ={
  createProject:async(req ,res)=>{
    try{
      const project = new ProjectModel(req.body);
      const savedProject = await project.save();
      return res.status(201).json({message:'success',data: savedProject });

    }catch(err){
      return res.status(500).json({message: 'error',err});
    }
  },
  createBulkProject:async(req ,res)=>{
    try{
      const projects = req.body;
      const createBulkProject = await ProjectModel.insertMany(projects);
      return res.status(201).json({message:'success',data: createBulkProject});

    }catch(err){
      return res.status(500).json({message: 'error',err});
  }
  },
  getProjects: async(req ,res)=>{
    try{
      const projects = await ProjectModel.find();
      return res.status(200).json({data: projects});
    } catch (err){
      return res.status(500).json({message:'error', err });
    }
  },

  getProjectsId: async(req,res)=>{
    try{
      const project = await ProjectModel.findById(req.params.id);
      if(!project){
        return res.status(404).json({message: 'project not found'});
      }
      return res.status(200).json({data:project});
    }catch(err){
      return res.status(500).json({message:'error',err})
    }
  },

  updateProject: async (req, res) => {
    try {
      const { id } = req.params;
      const updateData = req.body;
  
      // Validate updateData against the Mongoose schema
      const { error } = ProjectModel.validate(updateData); // Assuming you have a validate method in your Mongoose model
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }
  
      // Proceed with updating the project if data is valid
      const updatedProject = await ProjectModel.findByIdAndUpdate(id, updateData, { new: true });
      if (!updatedProject) {
        return res.status(404).json({ message: 'Project not found' });
      }
      return res.status(200).json({ message: 'success', data: updatedProject });
    } catch (err) {
      console.error('Error updating project:', err);
      return res.status(500).json({ message: 'Error updating project' });
    }
  },
  
  

  deleteProject : async (req,res)=>{
    try{
      const deleteProject = await ProjectModel.findByIdAndDelete(req.params.id);
      if(!deleteProject){
        return res.status(404).json({message:'Project not found'});
      }
      return res.status(200).json({message:'Project deleted successfully'});
    } catch(err){
      return res.status(500).json({message:'error',err})
    }
  }
}