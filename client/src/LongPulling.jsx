import { useEffect, useState } from "react";
import axios from "axios";

const LongPulling = () => {
  const [messages, setMessages] = useState([]);
  const [value, setValue] = useState("");
  const sendMessage = async () => {
    await axios.post("http://localhost:5000/new-messages", {
      messages: value,
      id: Date.now(),
    });
  };
  useEffect(() => {
    subscribe();
  }, []);

  const subscribe = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/get-messages");
      setMessages((prev) => [data, ...prev]);
      await subscribe();
    } catch (error) {
      setTimeout(() => subscribe(), 500);
    }
  };
  return (
    <div className="center">
      <div>
        <div className="form">
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <button onClick={sendMessage}>Send</button>
        </div>
        <div className="messages">
          {messages.map((message) => (
            <div className="message" key={message.id}>
              {message.messages}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LongPulling;
