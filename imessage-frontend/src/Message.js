import { Avatar } from "@material-ui/core";
import React, { forwardRef, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "./features/userSlice";
import "./Message.css";
import moment from "moment";

const Message = forwardRef(
  (
    { id, contents: { timestamp, displayName, uid, photo, email, message } },
    ref
  ) => {
    const user = useSelector(selectUser);
    const [messageInfo, serMessageInfo] = useState([]);



    return (
      <div
        className={`message ${user.email === email && "message__sender"}`}
        ref={ref}
      >
        {/* checks whether user email is equal to email that comes in
     as props who inserted the message if so then sets classname to message__sender */}
        <Avatar className="message__photo" src={photo} />
        <p>{message}</p>
        <small>{moment(new Date(timestamp?.toDate())).fromNow()}</small>
      </div>
    );
  }
);

export default Message;
