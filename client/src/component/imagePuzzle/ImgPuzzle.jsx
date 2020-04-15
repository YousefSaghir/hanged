import React from "react";

export default function ImgPuzzle({ imageGroup, name }) {
  return (
    <div className="col-6 col-md-3" id="container-img">
      <img src="img/base2.png" alt="" className="img-fluid" />
      {imageGroup.map((img) => {
        return (
          <React.Fragment key={img.id}>
            {img.id === 7 ? (
              <span className="position-absolute text-capitalize careful text-danger">
                {`hello ${name} `} <br />
                careful you are losing{" "}
              </span>
            ) : null}
            <img
              src={img.img}
              className={
                img.name + " mx-sm-2 mx-md-0 mx-lg-1 mx-xl-2  position-absolute"
              }
              alt={img.name}
            />
          </React.Fragment>
        );
      })}
    </div>
  );
}
