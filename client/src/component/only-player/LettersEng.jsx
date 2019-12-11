import React from "react";

export default function LettersEng(props) {
  return (
    <div className="row">
      {props.lettersEn.map((item, index) => {
        return (
          <div
            className="col-2 btn btn-success m-2"
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
