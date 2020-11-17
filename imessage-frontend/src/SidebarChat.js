import { Avatar } from "@material-ui/core";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setChat } from "./features/chatSlice";
import db from "./firebase";
import "./SidebarChat.css";
import { selectChatId} from "./features/chatSlice";

function SidebarChat({ id, chatName }) {
  const dispatch = useDispatch(); //for dispatching action into the data layer
  const [chatInfo, setChatInfo] = useState([]);
  const chatId = useSelector(selectChatId);

  useEffect(() => {
    db.collection("chats")
      .doc(id)
      .collection("messages")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setChatInfo(snapshot.docs.map((doc) => doc.data()));
      });
  }, [id]);
  return (
    <div
      onClick={() => {
        dispatch(
          setChat({
            chatId: id,
            chatName: chatName,
          })
        );
      }}
      className={`sidebarChat ${chatId === id && "sidebarChat__active"}`}
    >
      <Avatar src={chatInfo[0]?.photo} />
      <div className="sidebarChat__info">
        <h3>{chatName}</h3>
        <p>{chatInfo[0]?.message}</p>
        <small>
          {moment(new Date(chatInfo[0]?.timestamp?.toDate())).fromNow()}
        </small>
      </div>
    </div>
  );
}

export default SidebarChat;
