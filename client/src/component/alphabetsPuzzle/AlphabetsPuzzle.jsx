import React from "react";

export default function AlphabetsPuzzle({ pharse, booleanArray }) {
  let ph = ["'", ".", ",", "?", "!", "#", "@", "|", "&", "%", "$", "/", "’"];

  return (
    <div className="col-12 d-flex flex-wrap py-2 px-2 mb-xl-3 justify-content-center">
      {pharse.map((item, index) => {
        return (
          <React.Fragment key={index}>
            {ph.map((i) => i === item).findIndex((i) => i === true) < 0 ? (
              <span className="text-center  text-uppercase text-light mr-1 my-1 span-puzzle">
                {booleanArray[index] === true ? item : "   "}{" "}
              </span>
            ) : (
              <span className="text-center text-success mx-1 span-slash">
                {item}
              </span>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
