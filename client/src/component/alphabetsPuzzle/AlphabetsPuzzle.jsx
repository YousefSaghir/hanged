import React from "react";

export default function AlphabetsPuzzle({ pharse, booleanArray }) {
  let ph = ["'", ".", ",", "?", "!", "#", "@", "|", "&", "%", "$", "/"];
  return (
    <div className="d-flex flex-wrap py-4 px-2">
      {pharse.map((item, index) => {
        return (
          <span key={index}>
            {ph.map((i) => i === item).findIndex((i) => i === true) < 0 ? (
              <span className="col-2 text-center bg-dark text-uppercase text-light mr-1 ">
                {booleanArray[index] === true ? item : "   "}{" "}
              </span>
            ) : (
              <span className="col-2 text-center text-uppercase text-success mx-1 ">
                {item}
              </span>
            )}
          </span>
        );
      })}
    </div>
  );
}
