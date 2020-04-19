import React, { useState, useEffect } from "react";
import StartGameNet from "./Start/StartGameNet";
import queryString from "query-string";
import io from "socket.io-client";
let socket;
export default function Players({ location }) {
  const [name, setName] = useState("");
  const [even, seteven] = useState(false);
  const [pharse, setPharse] = useState("");
  const [bost, setBost] = useState("Hello World");
  const [result, setResult] = useState({});
  const [leave, setLeave] = useState({});
  const [count, setCount] = useState(0);
  const [secondCount, setSecondCount] = useState(60);
  const [players, setPlayers] = useState([]);
  const POINT = "http://localhost:3200/";

  useEffect(() => {
    const { name } = queryString.parse(location.search);
    console.log(name);
    setName(name);
    socket = io(POINT);

    socket.emit("new player", name, (err) => {
      if (err) alert(err);
    });
    socket.on("welcome", (message, isTrue) => {
      console.log(message);

      if (isTrue) {
        timeOut();
      }
      seteven(isTrue);
    });

    socket.on("fieldData", (fieldPlayer) => {
      setPlayers(fieldPlayer.players);
    });
  }, [POINT, location.search]);
  useEffect(() => {
    socket.on("pharse", (newPharse) => {
      setBost(newPharse);
    });

    socket.on("result", (result) => {
      setResult(result);
    });
  }, [pharse, result]);
  const sendPharse = (e) => {
    e.preventDefault();
    socket.emit("put pharse", pharse, () => setPharse(""));
  };
  const sendMsg = (result) => {
    console.log(result);

    socket.emit("send result", result);
  };

  const timeOut = () => {
    let n = 20;
    setInterval(() => {
      n--;
      setSecondCount(n);
    }, 1000);

    setTimeout(() => {
      setCount(1);
    }, 20000);
  };

  useEffect(() => {
    socket.on("leaved", (leavedMsg) => {
      setLeave(leavedMsg);
    });
    console.log(leave);
  }, [leave]);

  return !even ? (
    <div className="d-flex justify-content-center">
      <h3 className="text-center text-info p-10 text-uppercase">
        you have to wait until another player joins
      </h3>
      <div
        className="spinner-grow"
        style={{ width: "4rem", height: "4rem" }}
        role="status"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  ) : (
    <div className="container">
      {count === 1 ? (
        <StartGameNet
          myBost={bost}
          name={name}
          sendMsg={sendMsg}
          result={result}
          players={players}
          leave={leave}
        />
      ) : (
        <form>
          <div className="form-group">
            <label>Your Pharse</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter a Pharse"
              onChange={(e) => setPharse(e.target.value)}
              value={pharse}
            />
            <small className="form-text text-muted">
              You have <span className="text-danger">{secondCount}</span>{" "}
              Seconds for write your pharse
            </small>
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            onClick={(e) => sendPharse(e)}
          >
            Submit
          </button>
        </form>
      )}
    </div>
  );
}
