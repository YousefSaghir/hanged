import React from "react";

export default function Header({ players, name }) {
  return (
    <div className="d-flex justify-content-center flex-wrap text-center container-header">
      {players ? (
        <React.Fragment>
          <span className="p-2 text-capitalize">
            {players[0].name === name ? "You" : players[0].name}
          </span>
          <span className="p-2 ">VS</span>
          <span className="p-2 text-capitalize">
            {players[1].name === name ? "You" : players[1].name}
          </span>{" "}
        </React.Fragment>
      ) : (
        <h2 className="text-center my-3 text-uppercase text-info">{name}</h2>
      )}
    </div>
  );
}
