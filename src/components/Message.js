//  I try my best to unable JWT token But Their is Some Issue  in my code SO i Left that part and Connected  Message clipboard  
 import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Input, Button, message, Space } from 'antd';
import { CopyOutlined, DeleteOutlined,EditOutlined} from '@ant-design/icons';
const Message = () => {
 const [messages, setMessages] = useState([]);
 const [newMessage, setNewMessage] = useState('');

// Assuming the timestamp or date property of the message object is called 'timestamp'

useEffect(() => {
  // Fetch messages from the backend
  axios.get('https://clipboard-backend-qhel.onrender.com/api/messages')
    .then(response => {
      // Sort the messages array in descending order of their timestamp or date
      const sortedMessages = response.data.sort((a, b) => {
        if (a.timestamp < b.timestamp) {
          return 1;
        }
        if (a.timestamp > b.timestamp) {
          return -1;
        }
        return 0;
      });
      setMessages(sortedMessages);
    })
    .catch(error => console.error('Error fetching messages:', error));
}, []);

 const handleInputChange = (e) => {
    setNewMessage(e.target.value);
 };

 const handlePostMessage = () => {
    if (newMessage.trim() !== '') {
      // Post new message to the backend
      axios.post('https://clipboard-backend-qhel.onrender.com/api/messages', { content: newMessage })
        .then(response => {
          setMessages([...messages, response.data,]);
          setNewMessage('');
        })
        .catch(error => console.error('Error posting message:', error));
    }
 };

 const handleDeleteMessage = (id) => {
    // Delete message from the backend
    axios.delete(`https://clipboard-backend-qhel.onrender.com/api/messages/${id}`)
      .then(() => {
        setMessages(messages.filter(message => message._id !== id));
      })
      .catch(error => console.error('Error deleting message:', error));
 };

 const handleCopyMessage = (message) => {
    // Copy message text to clipboard
    navigator.clipboard.writeText(message)
      .then(() => {
        alert('Message copied to clipboard!');
      })
      .catch(error => console.error('Error copying message:', error));
 };
 const handleEditMessage = (id) => {
  // Get the updated message text from the user
  const updatedMessage = prompt('Enter the updated message text:');
 
  if (updatedMessage) {
     // Update the message on the backend
     axios.put(`https://clipboard-backend-qhel.onrender.com/api/messages/${id}`, { content: updatedMessage })
       .then(() => {
         setMessages(messages.map(message => message._id === id ? { ...message, content: updatedMessage } : message));
       })
       .catch(error => console.error('Error updating message:', error));
  }
 };
 return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold mb-4">Message Board</h1>
      <div className="flex-row">
        <textarea
          rows="4"
          cols="50"
          placeholder="Type your message here..."
          value={newMessage}
          onChange={handleInputChange}
          className="border-2 rounded p-2 w-full float-center mr-4"
        /><div class=" flex items-center justify-center bg-white-100">
        <button onClick={handlePostMessage} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                 Post Message
               </button>
               </div>
      
      </div>
      <div className="mt-8 flex">
        <h2 className="text-2xl font-bold mb-4">Messages</h2>
       </div>
       <span><div className=' size-auto flex-wrap'>
        <ul>
        
          {messages.map(message => (
            <li key={message._id} className="border-2 border-gray-300 rounded p-2 mb-2 flex justify-between">
             
            <div className='flex-col'>
            <span>{message.content}</span>
            </div>
            <Space >
        <Button
          type="link"
          onClick={() => handleDeleteMessage(message._id)}
          icon={<DeleteOutlined />}
        />
        <Button
          type="link"
          onClick={() => handleCopyMessage(message.content)}
          icon={<CopyOutlined />}
        />
         <Button
    type="link"
    onClick={() => handleEditMessage(message._id)}
    icon={<EditOutlined />}
 />
      </Space>
            </li>
          ))}
        </ul>
      </div>
      </span>
    </div>
 );
};

export default Message;
