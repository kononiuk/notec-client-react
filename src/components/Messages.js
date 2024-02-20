import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeMessage, clearMessages } from '../redux/reducers/messagesSlice';
import { useLocation } from 'react-router-dom';

const Messages = () => {
  const location = useLocation();
  const messages = useSelector(state => state.messages);
  const dispatch = useDispatch();

  const messageColors = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    info: 'bg-yellow-500',
  };

  useEffect(() => {
    dispatch(clearMessages());
  }, [location, dispatch]);

  return (
    <div>
      {messages.map((message, index) => (
        <div key={index} className={`${messageColors[message.type]} p-2 flex justify-between items-center`}>
          {message.text}
          <button className="bg-transparent border-none shadow-none text-black hover:bg-transparent hover:border-none hover:shadow-none" onClick={() => dispatch(removeMessage(index))}>X</button>
        </div>
      ))}
    </div>
  );
};

export default Messages;