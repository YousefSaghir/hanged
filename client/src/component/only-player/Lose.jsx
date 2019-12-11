import React from "react";
import { Link } from "react-router-dom";
export default function Lose(props) {
  const { name, pharse, author, lang, dur } = props;
  return (
    <div className="col-12  slide-lose">
      <img
        src="img/game-over.jpg"
        alt=""
        className=" position-absolute img-game"
      />
      <div className="col-12">
        <Link
          to={`/player_only?name=${name}&lang=${lang}`}
          refresh="true"
          onClick={() => window.location.reload()}
        >
          <button type="submit" className="btn btn-block mt-2 btn-again">
            Try Again
          </button>
        </Link>
      </div>
      <h1 className="text-center text-capitalize name">{name}</h1>
      <p className="text-center ledear">{dur}</p>
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
