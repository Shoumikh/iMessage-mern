import React, { useEffect, useState } from "react";
import "./Chat.css";
import MicIcon from "@material-ui/icons/Mic";
import { IconButton } from "@material-ui/core";
import Message from "./Message";
import db from "./firebase";
import { useSelector } from "react-redux";
import { selectChatId, selectChatName } from "./features/chatSlice";
import firebase from "firebase";
import { selectUser } from "./features/userSlice";
import FlipMove from "react-flip-move";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";

function Chat() {
  const [input, setInput] = useState(); //takes what msg user enters
  const [messages, setMessages] = useState([]); //local state array for messages
  const chatName = useSelector(selectChatName); //seclects chat name from chat slice
  const chatId = useSelector(selectChatId); //selects chat Id from chat slice
  const user = useSelector(selectUser);
  let [emojiSwitch, setEmojiSwitch] = useState(false);

  //only triggers when chatId changes
  //for setting msg to database and listen
  //for any changes in the messages state
  useEffect(() => {
    //if there is a chatID
    //it will go to chats db which is previously created
    //grab the chatId from chats db
    //as we click on the chat room chatId changes and useEffect
    //loads based on chatId changes
    //it will create db based on chat id
    //create message db and order it by timestamp desc
    //then on any chages inside the message db
    //it will store it message array state
    //the id of the msg in db and data
    if (chatId) {
      db.collection("chats")
        .doc(chatId)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          setMessages(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          );
        });
    }
  }, [chatId]);

  //fires in whenever user hits enter after typing a message
  const sendMessage = (e) => {
    e.preventDefault(); //prevents from reloading the page
    //firebase works
    //tells to go to the collection of chats in firebase db
    //then go to based on current chatId
    //for that particular chatId goto the db of messages
    //then add column
    db.collection("chats").doc(chatId).collection("messages").add({
      //this provides the time of actual server where is no problem for different country time
      timestamp: firebase.firestore?.FieldValue.serverTimestamp(),
      message: input, //collected from input state
      //all 4 below are colleted from user slice redux
      uid: user.uid,
      photo: user.photo,
      displayName: user.displayName,
      email: user.email,
    });

    setInput(""); //set the input to nothing after sending message
  };

  //emoji api function
  const addEmoji = (e) => {
    let emoji = e.native;
    setInput(input + emoji);
  };

  return (
    <div className="chat">
      {/* for the chat header section */}
      <div className="chat__header">
        <h4>
          To: <span className="chat__channelName">{chatName}</span>
        </h4>
        <strong>Details</strong>
      </div>

      {/* for chat messages section */}
      <div className="chat__messages">
        <FlipMove className="chat__flipMove">
          {messages.map(({ id, data }) => (
            <Message key={id} contents={data} />
          ))}
        </FlipMove>
      </div>

      {/* for the chat input section */}
      <div className="chat__input">
        <form>
          <input
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
            }}
            placeholder="iMessage"
            type="text"
          />
          <button onClick={sendMessage}>Send Message</button>
        </form>
        <IconButton
          onClick={() => {
            setEmojiSwitch(!emojiSwitch);
          }}
        >
          <InsertEmoticonIcon></InsertEmoticonIcon>
        </IconButton>

        {emojiSwitch ? (
          <span className="chat__inputEmojiPicker">
            <Picker onSelect={addEmoji} />
          </span>
        ) : (
          ""
        )}

        <IconButton>
          <MicIcon className="chat__mic" />
        </IconButton>
      </div>
    </div>
  );
}

export default Chat;
