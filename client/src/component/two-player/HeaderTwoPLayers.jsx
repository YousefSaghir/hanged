import React from "react";

export default function HeaderTwoPLayers(props) {
  return (
    <div className="col-12 text-center">
      <span className="p-3 text-center text-capitalize name-two">
        {props.players[0].name === props.name ? "You" : props.players[0].name}
      </span>
      <span className="p-3 text-center text-capitalize name-two">VS</span>
      <span className="p-3 text-center text-capitalize name-two">
        {props.players[1].name === props.name ? "You" : props.players[1].name}
      </span>
      {props.result.msg !== undefined ? (
        <p>{`${props.result.msg} ${props.result.time}`}</p>
      ) : null}
    </div>
  );
}
