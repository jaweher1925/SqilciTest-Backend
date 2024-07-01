const { default: axios } = require("axios");
const HireTalent = require("../../model/HireFromUsModel");
const { createNotification } = require("../NotificationController/NotificationController");

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
      res
        .status(500)
        .json({ error: "Failed to retrieve hire talents from us" });
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
      const hiretalentfromus = await HireTalent.findByIdAndDelete(
        req.params.id
      );
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
        { status: "approved" },
        { new: true }
      );
      if (!hireTalent) {
        return res.status(404).json({ error: "HireTalent not found" });
      }
      // Create notification
      await createNotification(
        hireTalent.userId,
        "Your hiring talent request has been approved.",
        "hire-talent"
      );
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
        { status: "rejected" },
        { new: true }
      );
      if (!hireTalent) {
        return res.status(404).json({ error: "HireTalent not found" });
      }
      // Create notification
      await createNotification(
        hireTalent.userId,
        "Your hiring talent request has been rejected.",
        "hire-talent"
      );
      res.json(hireTalent);
    } catch (error) {
      console.error("Error rejecting hire talent:", error);
      res.status(500).json({ error: "Failed to reject hire talent" });
    }
  },
};
