import React from 'react';

interface NotificationProps {
  message: string;
  onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({ message, onClose }) => {
  return (
    <div className="fixed bottom-4 right-4 bg-green-500 text-white p-4 rounded-md shadow-lg">
      <p>{message}</p>
      <button onClick={onClose} className="absolute top-1 right-1 text-xl">&times;</button>
    </div>
  );
};

export default Notification;
