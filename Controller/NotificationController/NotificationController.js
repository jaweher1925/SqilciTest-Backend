const SendNotificationModel = require("../../model/SendNotificationModel");

// Create a new notification
module.exports = {
createNotification : async (userId, message, type) => {
  try {
    const newNotification = new SendNotificationModel({
      userId,
      message,
      type,
      read: false, // By default, notifications are unread
      createdAt: new Date(),
    });
    await newNotification.save();
    return newNotification;
  } catch (error) {
    throw Error("Failed to create notification");
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
markNotificationAsRead : async (req, res) => {
  const notificationId = req.params.notificationId; // Assuming notificationId is passed in the URL params
  try {
    const notification = await Notification.findByIdAndUpdate(
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
}

};
