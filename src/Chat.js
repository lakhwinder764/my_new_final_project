import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import "./Chat.css";
import { IoSendSharp } from "react-icons/io5";
import { GrMicrophone } from "react-icons/gr";
import { LuFan } from "react-icons/lu";
import db from "./Firebase";
import {
  Box,
  Typography,
  InputAdornment,
  TextField,
  IconButton,
} from "@mui/material";
const Chat = ({ mode }) => {
  const { roomId } = useParams();
  const [messages, setmessages] = useState([]);
  const [roomname, setroomname] = useState("");

  useEffect(() => {
    if (roomId) {
      db?.collection("rooms")
        ?.doc(roomId)
        ?.onSnapshot((snapshot) => {
          setroomname(snapshot?.data()?.name);
        });
    }

    db.collection("rooms")
      .doc(roomId)
      .collection("messages")
      .orderBy("timestamp", "asc")
      .onSnapshot((snapshot) => {
        setmessages(
          snapshot.docs.map((doc) => {
            return doc.data();
          })
        );
      });
  }, [roomId]);

  return (
    <div className={`chat${mode ? "_org" : ""}`}>
      <div className="chat_header">
        <div className={`chatheader_info${mode ? "_mode" : ""}`}>
          <h3>{roomname}</h3>
        </div>
      </div>
      <Box textAlign="center" display="flex" alignItems="center" px={5}>
        <Box width="100%" borderBottom="1px solid #88888b" />
        <Typography
          variant="h6"
          sx={{
            color: "#88888b",
          }}
        >
          Today
        </Typography>
        <Box width="100%" borderBottom="1px solid #88888b" />
      </Box>

      <div className="chat_body">
        {messages.map((message, index) => {
          return (
            <Box
              sx={{
                display: "flex",
                ...(index % 2 === 0 && {
                  justifyContent: { sm: "flex-end", xs: "flex-start" },
                }),
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexGrow: 1,
                  maxWidth: "40%",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-end",
                    justifyContent: "flex-end",
                    ...(index % 2 === 0
                      ? {
                          flexDirection: "row-reverse",
                        }
                      : {
                          flexDirection: "row",
                        }),
                  }}
                >
                  <div
                    style={{
                      borderRadius: "32px",
                      padding: "10px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "white",
                      ...(index % 2 === 0
                        ? {
                            marginBottom: "15px",
                            marginLeft: "10px",

                            background: "#2a2d3b",
                            maxWidth: "10%",
                            height: "4%",
                          }
                        : {
                            marginBottom: "15px",
                            marginRight: "10px",
                            ...(mode
                              ? {
                                  background: "#000000",
                                }
                              : {
                                  background: "#424d89",
                                }),
                          }),
                    }}
                  >
                    {index % 2 !== 0 ? (
                      <LuFan
                        className={`icon${mode ? "_mode" : ""}`}
                        style={{
                          fontSize: 20,
                        }}
                      />
                    ) : (
                      <p
                        style={{
                          fontSize: 20,
                        }}
                      />
                    )}
                  </div>
                  <div>
                    <p
                      className={`chat_message ${
                        index % 2 === 0
                          ? mode
                            ? `chat_mode_receiver`
                            : `chat_reciever`
                          : mode
                          ? "user_mode"
                          : ""
                      }`}
                    >
                      {message.message}
                    </p>
                  </div>
                </div>
              </div>
            </Box>
          );
        })}
      </div>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          p: 2,
        }}
      >
        <TextField
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: 2,
              "& fieldset": {
                border: "none",
              },
              ...(!mode
                ? {
                    color: "#ffffff",
                    background: "#393b48",
                  }
                : {
                    color: "#000000",
                    background: "#d8dae4",
                  }),
            },
            mr: 2,
          }}
          variant="outlined"
          placeholder="Type your message here... "
          fullWidth
          size="large"
          InputProps={{
            endAdornment: (
              <InputAdornment position="start">
                <IoSendSharp
                  style={{
                    ...(mode
                      ? {
                          color: "#9b9fb5",
                        }
                      : {
                          color: "#ffffff",
                        }),
                    fontSize: 20,
                  }}
                />
              </InputAdornment>
            ),
          }}
        />
        <IconButton
          sx={{
            borderRadius: 9,
            background: "#2e334f",
            padding: 2.5,
            ...(mode && {
              opacity: 0.6,
            }),
          }}
        >
          <GrMicrophone
            style={{
              color: "white",
              fontSize: 20,
            }}
          />
        </IconButton>
      </Box>
    </div>
  );
};
export default Chat;
