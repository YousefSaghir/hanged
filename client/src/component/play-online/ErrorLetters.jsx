import React from "react";

export default function ErrorLetters(props) {
  const { errorLetter } = props;

  return errorLetter.length > 0 ? (
    <div className="col-12">
      <h3 className="text-center text-capitalize text-danger">letters false</h3>
      {errorLetter.map((item, index) => {
        return (
          <div className="col-2 btn btn-danger m-2" key={index}>
            {item}
          </div>
        );
      })}
      <hr />
      <hr />
    </div>
  ) : null;
}
