const HireTalent = require("../../model/HireFromUsModel");

module.exports = {
  createHireTalentFromUs: async (req, res) => {
    try {
      const hiretalentfromus = new HireTalent(req.body);
      await hiretalentfromus.save();
      res.status(201).json(hiretalentfromus);
    } catch (error) {
      res.status(500).json({ error: "Failed to create hire talent from us" });
    }
  },

  getAllHireTalentsFromUs: async (req, res) => {
    try {
      const hiretalentsfromus = await HireTalent.find();
      res.json(hiretalentsfromus);
    } catch (error) {
      res.status(500).json({ error: "Failed to retrieve hire talents from us" });
    }
  },

  getHireTalentFromUsById: async (req, res) => {
    try {
      const hiretalentfromus = await HireTalent.findById(req.params.id);
      if (!hiretalentfromus) {
        return res.status(404).json({ error: "Hire talent from us not found" });
      }
      res.json(hiretalentfromus);
    } catch (error) {
      res.status(500).json({ error: "Failed to retrieve hire talent from us" });
    }
  },

  updateHireTalentFromUs: async (req, res) => {
    try {
      const hiretalentfromus = await HireTalent.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!hiretalentfromus) {
        return res.status(404).json({ error: "Hire talent from us not found" });
      }
      res.json(hiretalentfromus);
    } catch (error) {
      res.status(500).json({ error: "Failed to update hire talent from us" });
    }
  },

  deleteHireTalentFromUs: async (req, res) => {
    try {
      const hiretalentfromus = await HireTalent.findByIdAndDelete(req.params.id);
      if (!hiretalentfromus) {
        return res.status(404).json({ error: "Hire talent from us not found" });
      }
      res.json({ message: "Hire talent from us deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete hire talent from us" });
    }
  },

  approveHireTalent: async (req, res) => {
    try {
      const hireTalent = await HireTalent.findByIdAndUpdate(
        req.params.id,
        { status: "approved" }, // Assuming 'status' is a field in your model to track approval status
        { new: true }
      );

      if (!hireTalent) {
        return res.status(404).json({ error: "HireTalent not found" });
      }

      // Send notification to user who submitted the idea (example using Axios)
      const userId = hireTalent.userId; // Adjust according to your model structure
      await axios.post(`http://localhost:5000/api/send-notification/${userId}`, {
        message: "Your hiring talent request has been approved.",
      });

      res.json(hireTalent);
    } catch (error) {
      console.error("Error approving hire talent:", error);
      res.status(500).json({ error: "Failed to approve hire talent" });
    }
  },

  rejectHireTalent: async (req, res) => {
    try {
      const hireTalent = await HireTalent.findByIdAndUpdate(
        req.params.id,
        { status: "rejected" }, // Assuming 'status' is a field in your model to track rejection status
        { new: true }
      );

      if (!hireTalent) {
        return res.status(404).json({ error: "HireTalent not found" });
      }

      // Send notification to user who submitted the idea (example using Axios)
      const userId = hireTalent.userId; // Adjust according to your model structure
      await axios.post(`http://localhost:5000/api/send-notification/${userId}`, {
        message: "Your hiring talent request has been rejected.",
      });

      res.json(hireTalent);
    } catch (error) {
      console.error("Error rejecting hire talent:", error);
      res.status(500).json({ error: "Failed to reject hire talent" });
    }
  },
};
