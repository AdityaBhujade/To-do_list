import { useState, useEffect } from 'react';
import axios from 'axios';

const EmailNotification = ({ todo }) => {
  const [notificationSent, setNotificationSent] = useState(false);

  const sendEmailNotification = async () => {
    try {
      await axios.post(`${apiurl}notifications.json`, {
        todoId: todo.id,
        title: todo.title,
        dueDate: todo.date,
        email: todo.userEmail,
        sentAt: new Date().toISOString()
      });
      setNotificationSent(true);
    } catch (error) {
      console.error('Error sending notification:', error);
    }
  };

  useEffect(() => {
    if (todo && !todo.done) {
      const dueDate = new Date(todo.date);
      const today = new Date();
      
      // Send notification if due date is today
      if (dueDate.toDateString() === today.toDateString()) {
        sendEmailNotification();
      }
    }
  }, [todo]);

  return null; // This is a utility component, no UI needed
};

export default EmailNotification; 