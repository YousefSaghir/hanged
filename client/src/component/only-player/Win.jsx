import React from "react";
import { Link } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
export default function Win(props) {
  const { name, pharse, author, lang, dur } = props;
  return (
    <div className="col-12  slide-win">
      <div className="col-12">
        <Link
          to={`/player_only?name=${name}&lang=${lang}`}
          refresh="true"
          onClick={() => window.location.reload()}
        >
          <button type="submit" className="btn btn-block mt-2 btn-again">
            play again
          </button>
        </Link>
      </div>
      <h1 className="text-center text-capitalize name">{name}</h1>
      <p className="leader text-center">{dur}</p>
      <h2 className="text-center text-capitalize text-light shadow-win">
        You Won
      </h2>
      <p className="leader">{pharse}</p>
      <span>
        <i className="fas fa-quote-left"></i>
        {author}
        <i className="fas fa-quote-right"></i>
      </span>
    </div>
  );
}
