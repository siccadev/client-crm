import React, { useState } from 'react';

const EmailNotificationForm = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const sendEmailNotification = async () => {
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:3001/send-email-notification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, message }),
      });

      const data = await response.json(); // Parse response body as JSON

      if (!response.ok) {
        throw new Error(data.message); // Throw error with server error message
      }

      setStatusMessage(data.message); // Show success message from server
    } catch (error) {
      setStatusMessage('Error: ' + error.message); // Show detailed error message
    }

    setIsLoading(false);
  };

  return (
    <div>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Recipient Email"
      />
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Message"
      ></textarea>
      <button onClick={sendEmailNotification} disabled={isLoading}>
        {isLoading ? 'Sending...' : 'Send Email Notification'}
      </button>
      {statusMessage && <p>{statusMessage}</p>}
    </div>
  );
};

export default EmailNotificationForm;
