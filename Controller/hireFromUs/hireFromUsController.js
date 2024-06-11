const HireTalent = require("../../model/HireFromUsModel");

// Create a new hiretalentfromus
exports.createHireTalentFromUs = async (req, res) => {
  try {
    const hiretalentfromus = new HireTalent(req.body);
    await hiretalentfromus.save();
    res.status(201).json(hiretalentfromus);
  } catch (error) {
    res.status(500).json({ error: "Failed to create hiretalentfromus" });
  }
};

// Get all hiretalentfromus
exports.getAllHireTalentsFromUs = async (req, res) => {
  try {
    const hiretalentsfromus = await HireTalent.find();
    res.json(hiretalentsfromus);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve hiretalentsfromus" });
  }
};

// Get a specific hiretalentfromus by ID
exports.getHireTalentFromUsById = async (req, res) => {
  try {
    const hiretalentfromus = await HireTalent.findById(req.params.id);
    if (!hiretalentfromus) {
      return res.status(404).json({ error: "HireTalentFromUs not found" });
    }
    res.json(hiretalentfromus);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve hiretalentfromus" });
  }
};

// Update a hiretalentfromus
exports.updateHireTalentFromUs = async (req, res) => {
  try {
    const hiretalentfromus = await HireTalent.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!hiretalentfromus) {
      return res.status(404).json({ error: "HireTalentFromUs not found" });
    }
    res.json(hiretalentfromus);
  } catch (error) {
    res.status(500).json({ error: "Failed to update hiretalentfromus" });
  }
};

// Delete a hiretalentfromus
exports.deleteHireTalentFromUs = async (req, res) => {
  try {
    const hiretalentfromus = await HireTalent.findByIdAndDelete(req.params.id);
    if (!hiretalentfromus) {
      return res.status(404).json({ error: "HireTalentFromUs not found" });
    }
    res.json({ message: "HireTalentFromUs deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete hiretalentfromus" });
  }
};
