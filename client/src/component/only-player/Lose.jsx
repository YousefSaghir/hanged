import React from "react";
import { Link } from "react-router-dom";
export default function Lose(props) {
  const { name, pharse, author, lang, dur } = props;
  return (
    <div className="d-flex flex-column">
      <div className="col-12">
        <Link
          to={`/player_only?name=${name}&lang=${lang}`}
          refresh="true"
          onClick={() => window.location.reload()}
        >
          <button type="submit" className="btn btn-block my-3 btn-outline-dark">
            Try Again
          </button>
        </Link>
      </div>
      <h1 className="text-center text-capitalize container-header">{name}</h1>
      <p className="text-center ledear">{dur}</p>
      <img
        src="img/game-over.jpg"
        alt="you lose"
        className="img-fluid img-thumbnail"
      />
      <div className="col-md-4 col-12 offset-md-8 container-pharse">
        <p className="text-light">{pharse}</p>
        <p className="text-light">
          <i className="fas fa-quote-left"></i>
          <span> {author} </span>
          <i className="fas fa-quote-right"></i>
        </p>
      </div>
    </div>
  );
}
