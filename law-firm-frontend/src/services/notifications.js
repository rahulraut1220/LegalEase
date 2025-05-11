// services/notifications.js
import api from './api';

export const getAllNotifications = async (params = {}) => {
  try {
    const response = await api.get('/notifications', { params });
    return { success: true, data: response.data };
  } catch (error) {
    return { 
      success: false, 
      error: error.response?.data?.message || 'Failed to fetch notifications' 
    };
  }
};

export const markAsRead = async (notificationId) => {
  try {
    const response = await api.put(`/notifications/${notificationId}/read`);
    return { success: true, data: response.data };
  } catch (error) {
    return { 
      success: false, 
      error: error.response?.data?.message || 'Failed to mark notification as read' 
    };
  }
};

export const markAllAsRead = async () => {
  try {
    const response = await api.put('/notifications/read-all');
    return { success: true, data: response.data };
  } catch (error) {
    return { 
      success: false, 
      error: error.response?.data?.message || 'Failed to mark all notifications as read' 
    };
  }
};

export const deleteNotification = async (notificationId) => {
  try {
    await api.delete(`/notifications/${notificationId}`);
    return { success: true };
  } catch (error) {
    return { 
      success: false, 
      error: error.response?.data?.message || 'Failed to delete notification' 
    };
  }
};

export const updateNotificationPreferences = async (preferences) => {
  try {
    const response = await api.put('/notifications/preferences', preferences);
    return { success: true, data: response.data };
  } catch (error) {
    return { 
      success: false, 
      error: error.response?.data?.message || 'Failed to update notification preferences' 
    };
  }
};

export const getUnreadCount = async () => {
  try {
    const response = await api.get('/notifications/unread-count');
    return { success: true, data: response.data.count };
  } catch (error) {
    return { 
      success: false, 
      error: error.response?.data?.message || 'Failed to get unread count',
      data: 0
    };
  }
};