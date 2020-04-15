import React from "react";
import { Link } from "react-router-dom";
export default function WinTwoPlayers({ duration, msg, pharse, name, field }) {
  return (
    <div className="d-flex flex-column">
      {msg !== undefined ? (
        <div className="col-12 ">
          <Link
            to={`/two_players?name=${name}&field=${field}`}
            refresh="true"
            onClick={() => window.location.reload()}
          >
            <button
              type="submit"
              className="btn btn-outline-dark btn-block my-2"
            >
              play again
            </button>
          </Link>
        </div>
      ) : null}
      <div className="col-12   position-relative">
        <h3 className="text-center text-info">{` You Win in  ${duration}`}</h3>
        <img
          src="img/win-01.jpg"
          alt="you win"
          className="img-fluid img-thumbnail"
        />
        <h2 className="text-center text-danger text-uppercase">
          <br />
          the pharse is: {pharse}
        </h2>
      </div>
    </div>
  );
}
