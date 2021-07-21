import React from "react";
import moment from "moment";
import {
  StyledListItem,
  ChatInfo,
  ChatName,
  MessageContent,
  MessageDate,
} from "../utils";

const Event = ({ event, onEventClick }) => {
  console.log("event", event);

  return (
    <StyledListItem
      key={event.id}
      data-testid="chat"
      button
      onClick={onEventClick}
    >
      <ChatInfo>
        <ChatName data-testid="name">{event.type}</ChatName>
        {event.type && (
          <React.Fragment>
            <MessageContent data-testid="content">
              {`Conversation Id: ${event.cid}`}
            </MessageContent>
            <MessageContent data-testid="content">
              {`From: ${event.from}`}
            </MessageContent>
            <MessageDate data-testid="date">
              {moment(event.timestamp.created).format("HH:mm")}
            </MessageDate>
          </React.Fragment>
        )}
      </ChatInfo>
      <MessageContent data-testid="content">
        {`Body: ${JSON.stringify(event.body)}`}
      </MessageContent>
    </StyledListItem>
  );
};

export default Event;
