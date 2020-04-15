import React from "react";

import { Link } from "react-router-dom";
export default function WinPlayOnline({ duration, name, pharse }) {
  return (
    <div className="d-flex flex-column">
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
      <Link to={`/`} refresh="true">
        <button type="submit" className="btn btn-block btn-outline-dark my-2">
          play again
        </button>
      </Link>
    </div>
  );
}
