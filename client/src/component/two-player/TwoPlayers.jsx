import React, { useState, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import StartTwoPlayer from "./StartTwoPlayer";
import queryString from "query-string";
import io from "socket.io-client";
let socket;
export default function Players({ location }) {
  const [name, setName] = useState("");
  const [field, setField] = useState("");
  const [pharse, setPharse] = useState("");
  const [bost, setBost] = useState("");
  const [error, setError] = useState(false);
  const [number, setNumber] = useState(0);
  const [players, setPlayers] = useState({});
  const [result, setResult] = useState({});

  const POINT = "localhost:3200";

  useEffect(() => {
    const { name, field } = queryString.parse(location.search);

    setName(name);
    setField(field);
    console.log(name, field);

    socket = io(POINT);

    socket.emit("two players", { name, field }, err => {
      if (err) {
        alert("Sorry this Field had two players");
        setError(true);
      }
    });

    socket.on("welcome two players", message => {
      console.log(message);
    });
  }, [POINT, location.search]);

  useEffect(() => {
    socket.on("twoPlayers pharse", newPharse => {
      setBost(newPharse);
    });

    socket.on("twoPlayerFieldData", ({ players }) => {
      setPlayers(players);
    });

    socket.on("resultTwoPlayers", result => {
      setResult(result);
    });

    return () => {
      socket.emit("disconnect");
      socket.off();
    };
  }, [pharse]);

  const sendPharse = e => {
    e.preventDefault();
    if (pharse) {
      socket.emit("twoPlayers put pharse", pharse, () => setPharse(""));

      setNumber(1);
    }
  };

  const sendResult = result => {
    socket.emit("send resultTwoPlayers", result);
  };

  return (
    <div className="container">
      {error ? (
        <div className="col-12">
          <Route exact path="/two_players">
            <Redirect to="/" />
          </Route>
        </div>
      ) : number > 0 && bost ? (
        <div className="row">
          <StartTwoPlayer
            bostTwo={bost}
            name={name}
            field={field}
            sendResult={sendResult}
            players={players}
            result={result}
          />
        </div>
      ) : (
        <div className="col-12">
          <form>
            <div className="form-group">
              <label>Your Pharse</label>
              <input
                type="text"
                className="form-control input-block"
                placeholder="Enter a Pharse"
                onChange={e => setPharse(e.target.value)}
                value={pharse}
              />
              <small className="form-text text-muted">
                You have{" "}
                <span className="text-danger">
                  {/* {minuteCount} : {secondCount} */}1 minute
                </span>{" "}
                for write your pharse
              </small>
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              onClick={e => sendPharse(e)}
            >
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
