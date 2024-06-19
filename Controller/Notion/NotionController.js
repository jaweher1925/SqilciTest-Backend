const NotionModel = require('../../model/NotionModel');

module.exports = {
   createTask : async (req, res) => {
        try {
          const task = new NotionModel(req.body);
          const savedTask = await task.save();
          return res.status(201).json({ message: 'Task created successfully', data: savedTask });
        } catch (err) {
          return res.status(500).json({ message: 'Error creating task', error: err.message });
        }
      },
      
    getAllTasks :async (req, res) => {
        try {
          const tasks = await NotionModel.find();
          return res.status(200).json({ data: tasks });
        } catch (err) {
          return res.status(500).json({ message: 'Error fetching tasks', error: err.message });
        }
      },



    // Get a task by ID
    getTaskById: async (req, res) => {
        try {
            const task = await NotionModel.findById(req.params.id);
            if (!task) {
                return res.status(404).json({ message: 'Task not found' });
            }
            return res.status(200).json({ data: task });
        } catch (err) {
            return res.status(500).json({ message: 'Error fetching task', error: err.message });
        }
    },

    // Update a task by ID
    updateTask: async (req, res) => {
        try {
            const { task, desc, folder } = req.body; 
            if (!task || !desc || !folder) {
                return res.status(400).json({ message: 'Task, desc, and folder are required fields' });
            }
            
            const updatedTask = await NotionModel.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true }
            );
            if (!updatedTask) {
                return res.status(404).json({ message: 'Task not found' });
            }
            return res.status(200).json({ message: 'Task updated successfully', data: updatedTask });
        } catch (err) {
            return res.status(500).json({ message: 'Error updating task', error: err.message });
        }
    },

    // Delete a task by ID
    deleteTask: async (req, res) => {
        try {
            const deletedTask = await NotionModel.findByIdAndDelete(req.params.id);
            if (!deletedTask) {
                return res.status(404).json({ message: 'Task not found' });
            }
            return res.status(200).json({ message: 'Task deleted successfully' });
        } catch (err) {
            return res.status(500).json({ message: 'Error deleting task', error: err.message });
        }
    }
};
