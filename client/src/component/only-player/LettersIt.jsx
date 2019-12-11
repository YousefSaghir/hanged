import React from "react";

export default function LettersIt(props) {
  return (
    <div className="row ">
      {props.lettersIt.map((item, index) => {
        return (
          <div
            className="col-2  btn btn-success m-2"
            key={index}
            onClick={e => props.handleClick(e.target.textContent, index)}
          >
            {item}
          </div>
        );
      })}
    </div>
  );
}
