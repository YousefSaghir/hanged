import React from "react";
import { Link } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
export default function Win(props) {
  const { name, pharse, author, lang, dur } = props;
  return (
    <div className="d-flex flex-column">
      <div className="col-12">
        <Link
          to={`/player_only?name=${name}&lang=${lang}`}
          refresh="true"
          onClick={() => window.location.reload()}
        >
          <button type="submit" className="btn btn-block btn-outline-dark my-2">
            play again
          </button>
        </Link>
      </div>
      <h1 className="text-center text-capitalize container-header">{name}</h1>
      <p className="leader text-center">{dur}</p>
      <img
        src="img/win-01.jpg"
        alt="you win"
        className="img-fluid img-thumbnail"
      />
      <p className="lead my-3">{pharse}</p>
      <span className="col-6 col-md-4 col-lg-3 d-flex justify-content-between m-3">
        <i className="fas fa-quote-left"></i>
        {author}
        <i className="fas fa-quote-right"></i>
      </span>
    </div>
  );
}
