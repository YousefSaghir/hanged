import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Join.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
export default function Join() {
  const [name, setName] = useState("");
  const [field, setField] = useState("");
  const [lang, setLang] = useState("EN");
  console.log(lang);

  return (
    <div
      className="container-fluid container-join bg-primary "
      style={{ height: "100vh" }}
    >
      <div className="row ">
        <div className="col-md-4 d-flex justify-content-center">
          <div className="card" style={{ width: "18rem" }}>
            <div className="card-body">
              <h5 className="card-title text-uppercase">Play online</h5>
              {/* <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6> */}
              <p className="card-text text-capitalize pt-5 pb-5">
                enter your name games with another online player
              </p>
              <hr />
              <input
                className="form-control"
                type="text"
                placeholder="Write Your Name"
                onChange={e => setName(e.target.value.toLowerCase())}
                onKeyPress={e =>
                  e.Key === "Enter" && !name ? e.preventDefault() : null
                }
              />
              <Link
                to={`/players?name=${name}`}
                onClick={e => (!name ? e.preventDefault() : null)}
              >
                <button
                  type="submit"
                  className="btn btn-success btn-block mt-2"
                >
                  <i className="fas fa-gamepad"></i>
                  <i className="fas fa-wifi"></i>
                </button>
              </Link>
            </div>
          </div>
        </div>

        <div className="col-md-4 d-flex  justify-content-center">
          <div className="card" style={{ width: "18rem" }}>
            <div className="card-body">
              <h5 className="card-title text-uppercase">two player</h5>
              {/* <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6> */}
              <p className="card-text text-capitalize pt-2">
                Insert your name and the name of the field what you and your
                friend have chosen e play together.
              </p>
              <hr />
              <input
                className="form-control"
                type="text"
                placeholder="Write Your Name"
                onChange={e => setName(e.target.value.toLowerCase())}
                onKeyPress={e =>
                  e.Key === "Enter" && !name ? e.preventDefault() : null
                }
              />
              <input
                className="form-control"
                type="text"
                placeholder="Write name the field"
                onChange={e => setField(e.target.value.toLowerCase())}
                onKeyPress={e =>
                  e.Key === "Enter" && !field ? e.preventDefault() : null
                }
              />
              <Link
                to={`/two_players?name=${name}&field=${field}`}
                onClick={e => (!name ? e.preventDefault() : null)}
              >
                <button
                  type="submit"
                  className="btn btn-success btn-block mt-2"
                >
                  <i className="fas fa-gamepad"></i>
                  <i className="fas fa-gamepad"></i>
                </button>
              </Link>
            </div>
          </div>
        </div>

        <div className="col-md-4 d-flex justify-content-center">
          <div className="card" style={{ width: "18rem" }}>
            <div className="card-body">
              <h5 className="card-title text-uppercase">one player</h5>
              {/* <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6> */}
              <p className="card-text text-capitalize pt-5 pb-5">
                Insert your name and start the challenge.
              </p>
              <hr />
              <input
                className="form-control "
                type="text"
                placeholder="Write Your Name"
                onChange={e => setName(e.target.value.toLowerCase())}
                onKeyPress={e =>
                  e.Key === "Enter" && !name ? e.preventDefault() : null
                }
              />
              <select
                name="lan"
                className="custom-select"
                id="inputGroupSelect01"
                onChange={e => setLang(e.target.value)}
              >
                <option defaultValue>Choose Lang</option>
                <option value="EN">ENGLISH</option>
                <option value="IT">ITALY</option>
              </select>
              <Link
                to={`/player_only?name=${name}&lang=${lang}`}
                onClick={e => (!name ? e.preventDefault() : null)}
              >
                <button
                  type="submit"
                  className="btn btn-success btn-block mt-2"
                >
                  <i className="fas fa-gamepad"></i>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
