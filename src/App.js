import { MessageList, Input, Button } from "react-chat-elements";
import React, { useState, useReducer } from "react";
import { postMessage } from "./services/chatService";

function App() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [, forceUpdate] = useReducer((x) => x + 1, 0);
  const [arrayMessages] = useState([]);

  // funcion to send and show the message and answer
  const handleSendMessage = async () => {
    // init loading to disabled button
    setLoading(true)
    //push message to array
    arrayMessages.push({
      position: "left",
      type: "text",
      text: message,
      date: new Date(),
    });

    //set body to api
    const body = {
      message: message,
    };

    //make the request
    await postMessage(body)
      .then((resp) => {
        arrayMessages.push({
          position: "right",
          type: "text",
          text: resp.data.answer,
          date: new Date(),
        });
      })
      .catch((err) => {
        arrayMessages.push({
          position: "center",
          type: "system",
          text: "There was an error processing and replying to the message. Try again later.",
          date: new Date(),
        });
      });
    //update page
    forceUpdate();
    //set loading false
    setLoading(false)
  };

  return (
    <div>
      <MessageList
        className="message-list"
        lockable={true}
        toBottomHeight={"100%"}
        dataSource={arrayMessages}
      />
      <div>
        <Input
          placeholder="Type here..."
          multiline={true}
          onChange={(e) => setMessage(e.target.value)}
          defaultValue={message}
          rightButtons={
            <Button
              color="white"
              backgroundColor="black"
              text="Send"
              onClick={() => handleSendMessage()}
              disabled={!message || loading}
            />
          }
        />
      </div>
    </div>
  );
}

export default App;
