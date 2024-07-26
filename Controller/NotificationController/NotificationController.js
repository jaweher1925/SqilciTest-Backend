const SendNotificationModel = require("../../model/SendNotificationModel");

// Create a new notification
module.exports = {
  createNotification: async (userId, message, type) => {
    console.log("Creating notification for user:", userId);
    console.log("Notification details:", { message, type });
    
    try {
      const newNotification = new SendNotificationModel({
        userId,
        message,
        type,
        read: false, // Default value
        createdAt: new Date(),
      });
      const savedNotification = await newNotification.save();
      console.log("Notification created successfully:", savedNotification);
      return savedNotification;
    } catch (error) {
      console.error("Failed to create notification:", error);
      throw new Error("Failed to create notification");
    }
  },

// Get all notifications for a user
 getNotificationsByUser : async (req, res) => {
  const userId = req.params.userId; // Assuming userId is passed in the URL params
  try {
    const notifications = await SendNotificationModel.find({ userId });
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve notifications" });
  }
},


// Mark notification as read
markNotificationAsRead: async (req, res) => {
  const notificationId = req.params.notificationId;
  try {
    const notification = await SendNotificationModel.findByIdAndUpdate(
      notificationId,
      { read: true },
      { new: true }
    );
    if (!notification) {
      return res.status(404).json({ error: "Notification not found" });
    }
    res.json(notification);
  } catch (error) {
    res.status(500).json({ error: "Failed to mark notification as read" });
  }
},
// Backend: Add this to your controller
deleteNotification: async (req, res) => {
  const notificationId = req.params.notificationId;
  try {
    await SendNotificationModel.findByIdAndDelete(notificationId);
    res.json({ message: "Notification deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete notification" });
  }
}


};
