import React from "react";
import { createContext, useState, useEffect, useCallback } from "react";
import { getAllNotifications, markAsRead } from "../services/notifications";

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchNotifications = useCallback(async () => {
    if (!localStorage.getItem("token")) return;

    setLoading(true);
    try {
      const result = await getAllNotifications();
      if (result.success) {
        setNotifications(result.data);
        setUnreadCount(result.data.filter((n) => !n.read).length);
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNotifications();

    // Set up polling to check for new notifications
    const interval = setInterval(fetchNotifications, 60000); // Every minute

    return () => clearInterval(interval);
  }, [fetchNotifications]);

  const handleMarkAsRead = async (id) => {
    try {
      await markAsRead(id);
      setNotifications(
        notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
      );
      setUnreadCount((prev) => Math.max(0, prev - 1));
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      const ids = notifications.filter((n) => !n.read).map((n) => n.id);
      await Promise.all(ids.map((id) => markAsRead(id)));
      setNotifications(notifications.map((n) => ({ ...n, read: true })));
      setUnreadCount(0);
    } catch (error) {
      console.error("Error marking all notifications as read:", error);
    }
  };

  const value = {
    notifications,
    unreadCount,
    loading,
    markAsRead: handleMarkAsRead,
    markAllAsRead: handleMarkAllAsRead,
    setUnreadCount,
    setNotifications,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};
