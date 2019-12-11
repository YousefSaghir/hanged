import React from "react";

export default function Letters(props) {
  const { letters, handleClick } = props;
  return (
    <div className="col-md-8 col-12 pt-3">
      <div className="container">
        <div className="row">
          {letters.map((item, index) => {
            return (
              <div
                onClick={e => handleClick(e.target.textContent, index)}
                className="col-2 btn btn-success m-2"
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
