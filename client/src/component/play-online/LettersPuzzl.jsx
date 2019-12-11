import React from "react";

export default function LettersPuzzl(props) {
  const { newArray, booleanArray } = props;
  let ph = ["'", ".", ",", "?", "!", "#", "@", "|", "&", "%", "$", "/"];
  return (
    <div className="col-12 pb-3 pt-3">
      {newArray.map((item, index) => {
        return (
          <span key={index}>
            {ph.map(i => i === item).findIndex(i => i === true) < 0 ? (
              <span className="col-1 text-center bg-primary text-uppercase text-light mr-1 border-bottom">
                {booleanArray[index] === true ? item : "   "}{" "}
              </span>
            ) : (
              <span className="col-1 text-center text-uppercase text-success mr-1 ">
                {item}
              </span>
            )}
          </span>
        );
      })}
    </div>
  );
}
