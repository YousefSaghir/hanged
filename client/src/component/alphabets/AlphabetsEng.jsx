import React from "react";

export default function AlphabetsEng({ handleClick, alphabets }) {
  return (
    <div className="col-md-6 offset-md-3 col-12 pt-3">
      <div className="container">
        <div className="row">
          {alphabets.map((item, index) => {
            return (
              <div
                onClick={(e) => handleClick(e.target.textContent, index)}
                className="col-1 px-0 btn btn-outline-dark m-2"
                key={index}
              >
                {item.toUpperCase()}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
