import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Join.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Footer from "../base/Footer";
export default function Join() {
  const [name, setName] = useState("");
  const [field, setField] = useState("");
  const [lang, setLang] = useState("EN");
  const [sliderNumber, setSliderNumber] = useState(0);
  console.log(lang);
  const handleChange = (val) => {
    let valueName = val.split("");
    let yuorName = valueName.map((name) => {
      return name !== " " ? name : "_";
    });
    setName(yuorName.join(""));
  };

  return (
    <div className="container">
      <div className="nav-join d-flex flex-row justify-content-between">
        <span
          className={
            sliderNumber === 0
              ? "nav-item text-center text-uppercase py-3 nav-active px-4"
              : "nav-item text-center text-uppercase py-3 px-4"
          }
          onClick={() => setSliderNumber(0)}
        >
          Play Online
        </span>
        <span
          className={
            sliderNumber === 1
              ? "nav-item text-center text-uppercase py-3 px-4 nav-active"
              : "nav-item text-center text-uppercase py-3 px-4"
          }
          onClick={() => setSliderNumber(1)}
        >
          Two Players
        </span>
        <span
          className={
            sliderNumber === 2
              ? "nav-item text-center text-uppercase py-3 px-4 nav-active"
              : "nav-item text-center text-uppercase py-3 px-4"
          }
          onClick={() => setSliderNumber(2)}
        >
          single Player
        </span>
      </div>
      <div className="join-container my-3 my-xl-5 py-xl-2">
        <div
          className={
            sliderNumber === 0
              ? "d-flex join-container-item"
              : sliderNumber === 1
              ? "d-flex join-container-item active"
              : "d-flex join-container-item active1"
          }
        >
          <div className="slide-join px-2 my-xl-4">
            <h1 className="text-uppercase mb-4 text-center">Play online</h1>
            <p className="text-capitalize my-3 lead py-5">
              enter your name Then Play online <br /> with random player
            </p>
            <form>
              <input
                className="form-control"
                type="text"
                placeholder="Write Your Name"
                onChange={(e) => handleChange(e.target.value.toLowerCase())}
                onKeyPress={(e) =>
                  e.Key === "Enter" && !name ? e.preventDefault() : null
                }
              />{" "}
              <Link
                to={`/players?name=${name}`}
                onClick={(e) => (!name ? e.preventDefault() : null)}
              >
                <button
                  type="submit"
                  className="btn btn-success btn-block mt-2"
                >
                  <i className="fas mx-2 fa-gamepad"></i>
                  <i className="fas mx-2 fa-wifi"></i>
                </button>
              </Link>
            </form>
          </div>
          <div className="slide-join px-2 my-xl-4">
            <h1 className="mb-4 text-center text-uppercase">two players</h1>
            <h5 className="my-1 text-center text-capitalize">
              play with friends
            </h5>
            <p className="lead my-2 my-xl-4 text-capitalize py-xl-4 py-2">
              Insert your name and the name of the field <br /> that you and
              your friend have chosen and you play together.
            </p>
            <form>
              <input
                className="form-control my-1"
                type="text"
                placeholder="Write Your Name"
                onChange={(e) => handleChange(e.target.value.toLowerCase())}
                onKeyPress={(e) =>
                  e.Key === "Enter" && !name ? e.preventDefault() : null
                }
              />
              <input
                className="form-control"
                type="text"
                placeholder="Write name the field"
                onChange={(e) => setField(e.target.value.toLowerCase())}
                onKeyPress={(e) =>
                  e.Key === "Enter" && !field ? e.preventDefault() : null
                }
              />
              <Link
                to={`/two_players?name=${name}&field=${field}`}
                onClick={(e) => (!name ? e.preventDefault() : null)}
              >
                <button
                  type="submit"
                  className="btn btn-success btn-block mt-2"
                >
                  {" "}
                  <i className="fas mx-2 fa-gamepad"></i>{" "}
                  <i className="fas mx-2 fa-gamepad"></i>
                </button>{" "}
              </Link>
            </form>
          </div>
          <div className="slide-join px-2 my-xl-4">
            <h1 className="text-center mb-4 text-uppercase">single player</h1>
            <h5 className="text-center my-1 text-capitalize">
              play by yourself
            </h5>
            <p className="lead text-capitalize my-3 py-5">
              Insert your name, choose the language and start the challenge.
            </p>
            <form>
              <input
                className="form-control my-1"
                type="text"
                placeholder="Write Your Name"
                onChange={(e) => handleChange(e.target.value.toLowerCase())}
                onKeyPress={(e) =>
                  e.Key === "Enter" && !name ? e.preventDefault() : null
                }
              />
              <select
                name="lan"
                className="custom-select"
                id="inputGroupSelect01"
                onChange={(e) => setLang(e.target.value)}
              >
                <option defaultValue>Choose Lang</option>
                <option value="EN">ENGLISH</option>
                <option value="IT">ITALY</option>
              </select>{" "}
              <Link
                to={`/player_only?name=${name}&lang=${lang}`}
                onClick={(e) => (!name ? e.preventDefault() : null)}
              >
                <button
                  type="submit"
                  className="btn btn-success btn-block mt-2"
                >
                  <i className="fas  fa-gamepad"></i>
                </button>
              </Link>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
