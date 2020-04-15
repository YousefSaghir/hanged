import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Join.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
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
          Player Online
        </span>
        <span
          className={
            sliderNumber === 1
              ? "nav-item text-center text-uppercase py-3 px-4 nav-active"
              : "nav-item text-center text-uppercase py-3 px-4"
          }
          onClick={() => setSliderNumber(1)}
        >
          Two Player
        </span>
        <span
          className={
            sliderNumber === 2
              ? "nav-item text-center text-uppercase py-3 px-4 nav-active"
              : "nav-item text-center text-uppercase py-3 px-4"
          }
          onClick={() => setSliderNumber(2)}
        >
          One Player
        </span>
      </div>
      <div className="join-container">
        <div
          className={
            sliderNumber === 0
              ? "d-flex join-container-item"
              : sliderNumber === 1
              ? "d-flex join-container-item active"
              : "d-flex join-container-item active1"
          }
        >
          <div className="slide-join py-5">
            <h1 className="text-uppercase text-center">Play online</h1>
            <p className="text-capitalize lead pt-5 pb-5">
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
                  <i className="fas fa-gamepad"></i>
                  <i className="fas fa-wifi"></i>
                </button>
              </Link>
            </form>
          </div>
          <div className="slide-join py-5">
            <h1 className="card-title text-center text-uppercase">
              two player
            </h1>
            <p className="lead text-capitalize pt-2">
              Insert your name and the name of the field <br /> what you and
              your friend have chosen and you play together.
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
                  <i className="fas fa-gamepad"></i>{" "}
                  <i className="fas fa-gamepad"></i>
                </button>{" "}
              </Link>
            </form>
          </div>
          <div className="slide-join py-5">
            <h1 className="text-center text-uppercase">one player</h1>
            <p className="lead text-capitalize pt-5 pb-5">
              Insert your name, choose the language and start the challenge.
            </p>
            <form>
              <input
                className="form-control "
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
                  <i className="fas fa-gamepad"></i>
                </button>
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
