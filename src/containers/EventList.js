import React from "react";
import { Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  Divider,
  Button
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Link } from "react-router-dom";

import { Container } from "../utils";

const useStyles = makeStyles((theme) => ({
  root: {
    gridColumn: 1,
    backgroundColor: theme.palette.background.paper,
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "10%",
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
    paddingLeft: "15px",
    paddingRight: "15px",
  },
  footer: {
    position: "fixed",
    left: 0,
    bottom: 0,
    width: "100%",
    "text-align": "left",
    "border-style": "solid",
    "border-color": "grey",
    "border-width": "medium",
  },
  clearButton: {
    width: "100%",
  },
  header: {
    position: "fixed",
    right: 5,
    top: 5,
    width: "30%",
    "text-align": "center",
    "border-width": "medium",
  },
  answerButton: {
    width: "48%",
    "background-color": "green",
  },
  rejectButton: {
    width: "48%",
    "background-color": "red",
  },
  hangupButton: {
    width: "100%",
    "background-color": "red",
  },
  span: {
    "margin-left": "2%",
  },
}));

const EventList = ({ nexmoApp, events, setEvents, incomingCall }) => {
  const classes = useStyles();

  if (!nexmoApp.me) {
    return <Redirect to="/" />;
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        {nexmoApp.me ? (
          `Hello ${nexmoApp.me.application.me.name}`
        ) : (
          <Link to="/">Login</Link>
        )}
      </Typography>

      {incomingCall && incomingCall.status !== "answered" ? (
        <div className={classes.header}>
          <Button
            onClick={() => incomingCall.answer()}
            className={classes.answerButton}
          >
            Answer Call
          </Button>
          <span className={classes.span}></span>
          <Button
            onClick={() => incomingCall.reject()}
            className={classes.rejectButton}
          >
            Reject Call
          </Button>
        </div>
      ) : (
        <div></div>
      )}

      {incomingCall && incomingCall.status === "answered" ? (
        <div className={classes.header}>
          <Button
            onClick={() => incomingCall.hangUp()}
            className={classes.hangupButton}
          >
            Hangup Call
          </Button>
        </div>
      ) : (
        <div></div>
      )}

      {events.map((event) => {
        return (
          <Accordion key={event.id + event.cid}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className={classes.heading}>{event.type}</Typography>
              <Typography className={classes.secondaryHeading}>
                From:{" "}
                {event?._embedded?.from_member?.id}
              </Typography>
              <Divider orientation="vertical" flexItem />
              <Typography className={classes.secondaryHeading}>
                Display name:{" "}
                {event?._embedded?.from_user?.display_name ??
                  event?._embedded?.from_user?.name}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{`Body: ${JSON.stringify(event)}`} </Typography>
            </AccordionDetails>
          </Accordion>
        );
      })}
      <div className={classes.footer}>
        <Button onClick={() => setEvents([])} className={classes.clearButton}>
          Clear Events
        </Button>
      </div>
    </Container>
  );
};

export default EventList;
