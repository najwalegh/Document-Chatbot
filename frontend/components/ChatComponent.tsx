// MainComponent.jsx
import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_MESSAGES } from './messages'; // Définissez votre requête GraphQL
import { ChatMessageType } from '../../backend/src/shared/message/models';

const ChatComponent = () => {
    
  const { loading, error, data } = useQuery(GET_MESSAGES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
// Remplacez 'ChatMessageType' par le type réel de votre message
const messages: ChatMessageType[] = data.getMessages;

return (
  <div>
    {messages.map((message: ChatMessageType) => (
      <div >
        <p>Question: {message.question}</p>
        <p>Response: {message.response}</p>
      </div>
    ))}
  </div>
);
    }
export default ChatComponent;
