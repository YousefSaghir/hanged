import React from "react";

export default function FasleLetters(props) {
  const { falseLetters } = props;
  console.log(falseLetters);

  return falseLetters.length > 0 ? (
    <div className="col-12">
      <h3 className="text-center text-capitalize text-danger">letters false</h3>
      {falseLetters.map((item, index) => {
        return (
          <div className="col-1 btn btn-danger m-2" key={index}>
            {item}
          </div>
        );
      })}
      <hr />
      <hr />
    </div>
  ) : null;
}
