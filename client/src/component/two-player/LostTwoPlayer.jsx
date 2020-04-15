import React from "react";
import { Link } from "react-router-dom";
export default function LostTwoPlayer({ duration, msg, pharse, name, field }) {
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
        <h3 className="text-center text-info">{` You Lose in  ${duration}`}</h3>
        <img
          src="img/game-over.jpg"
          alt="you lose"
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
