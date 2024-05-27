import { useState, useEffect } from 'react';
import { db, collection, addDoc, serverTimestamp, onSnapshot, query, orderBy } from '../Firebase/firebase';
import { myperfil } from '../api/auth';

const ChatGlobal = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [usuario, setUsuario] = useState('');

  const obtenerPerfil = async () => {
    try {
      const response = await myperfil.get('/ver');
      const nombreUsuario = response.data.nombrePerfil;
      setUsuario(nombreUsuario);
    } catch (error) {
      console.error('Error al obtener el nombre del perfil', error);
    }
  };

  useEffect(() => {
    obtenerPerfil();
    const unsubscribe = onSnapshot(
      query(collection(db, 'messages'), orderBy('timestamp')),
      (snapshot) => {
        const updatedMessages = snapshot.docs.map((doc) => doc.data());
        setMessages(updatedMessages);
      }
    );

    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newMessage.trim() !== '') {
      await addDoc(collection(db, 'messages'), {
        text: newMessage,
        sender: usuario,
        timestamp: serverTimestamp(),
      });
      setNewMessage('');
    }
  };

  return (
    <div
      className="bg-white rounded-lg shadow-md p-4 max-w-80"
      style={{ maxHeight: '300px', overflowY: 'auto' }}
    >
      <div className="chat-messages">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${message.sender === usuario ? 'sent' : 'received'}`}
            style={{ maxWidth: '80%' }}
          >
            <div className="message-content">
              <span className="message-sender text-orange-500">{message.sender}:</span> {message.text}
            </div>
            {message.timestamp && (
              <div className="message-timestamp text-xs mt-1 ml-2">
                {new Intl.DateTimeFormat('es-ES', {
                  hour: 'numeric',
                  minute: 'numeric',
                }).format(message.timestamp.toDate())}
              </div>
            )}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="chat-form mt-4">
        <input
          type="text"
          placeholder="Escribe un mensaje..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="w-full p-2 border rounded"
          style={{ maxWidth: '80%' }}
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mt-2"
        >
          Enviar
        </button>
      </form>
    </div>
  );
};

export default ChatGlobal;
