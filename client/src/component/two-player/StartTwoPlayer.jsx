import React, { Component } from "react";
import { Link } from "react-router-dom";
import LettersOfTwoPlayers from "./LettersOfTwoPlayers";
import LettersPuzzlTwoPlayers from "./LettersPuzzlTwoPlayers";
import FalseLetters from "./FalseLetters";
import { images } from "../../data.js";
import * as moment from "moment";
import HeaderTwoPLayers from "./HeaderTwoPLayers";
import "./StartTwoPlayer.css";
export default class StartTwoPlayer extends Component {
  state = {
    letters: [
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
      "J",
      "K",
      "L",
      "M",
      "N",
      "O",
      "P",
      "Q",
      "R",
      "S",
      "T",
      "U",
      "V",
      "W",
      "X",
      "Y",
      "Z",
      "à",
      "è",
      "é",
      "ù",
      "ò",
      "ì"
    ],
    letterToArray: [],
    booleanArray: [],
    trueLetters: [],
    errorLetter: [],
    imageGroup: [],
    falseLetters: [],
    lose: false,
    win: false,
    dateStart: {},
    dateEnd: {},
    dur: {}
  };
  componentDidMount() {
    const { bostTwo } = this.props;
    this.setState({
      dateStart: new Date()
    });

    let letterToArray = this.state.letterToArray;
    letterToArray = bostTwo
      .trim()
      .split("")
      .map(item => {
        return item === " " ? (item = "/") : item;
      });
    this.setState({ letterToArray });
    let booleanArray = this.state.booleanArray.slice();
    booleanArray = letterToArray.map(item => item === "/");
    this.setState({ booleanArray });
  }
  handleClick = (e, i) => {
    const { sendResult } = this.props;
    let dur = this.state.dur;
    let letters = this.state.letters.slice();
    let letterToArray = this.state.letterToArray.slice();
    let trueLetters = this.state.trueLetters;
    let num = letterToArray.findIndex(
      char => char.toLowerCase() === e.toLowerCase()
    );
    if (num >= 0) {
      trueLetters.push(letters[i]);
      letters.splice(i, 1);
      let val = this.checkChar(trueLetters, letterToArray);
      this.setState({ trueLetters, letters, booleanArray: val });
    } else {
      let falseLetters = this.state.falseLetters;
      falseLetters.push(e);
      letters.splice(i, 1);
      this.setState({
        letters,
        falseLetters
      });
      let imageGroup = this.state.imageGroup;
      let len = imageGroup.length;
      if (len < images.length) {
        imageGroup.push(images[len]);
        this.setState({ imageGroup });
      } else {
        this.setState({
          lose: true,
          dateEnd: new Date()
        });

        const a = moment(this.state.dateStart);
        const b = moment(this.state.dateEnd);
        dur = {
          time: `minutes: 0${b.diff(a, "minutes")}:${b.diff(a, "seconds") %
            60}`,
          msg: `${this.props.name} is lose in`
        };
        this.setState({ dur });
        sendResult(dur);
      }
    }
    let checkBooleanArray = this.checkChar(
      letters,
      letterToArray.filter(item => item !== "/")
    );

    if (checkBooleanArray.findIndex(it => it === true) < 0) {
      this.setState({
        win: true,
        dateEnd: new Date()
      });

      let a = moment(this.state.dateStart);
      let b = moment(this.state.dateEnd);
      dur = {
        time: `minutes: 0${b.diff(a, "minutes")}:${b.diff(a, "seconds") % 60}`,
        msg: `${this.props.name} is win in `
      };
      this.setState({ dur });
      sendResult(dur);
    }
  };

  checkChar = (a1, a2) => {
    let a = [];
    for (let i = 0; i < a1.length; i++) {
      for (let j = 0; j < a2.length; j++) {
        if (a1[i].toLowerCase() === a2[j].toLowerCase()) {
          a[j] = true;
        } else if (a[j] === true) {
          a[j] = true;
        } else {
          a[j] = false;
        }
      }
    }
    return a;
  };
  render() {
    return (
      <React.Fragment>
        <HeaderTwoPLayers
          players={this.props.players}
          result={this.props.result}
          name={this.props.name}
        />
        {this.state.letterToArray.length > 0 &&
        this.state.lose === false &&
        this.state.win === false ? (
          <React.Fragment>
            <FalseLetters falseLetters={this.state.falseLetters} />
            <LettersOfTwoPlayers
              letters={this.state.letters}
              handleClick={this.handleClick}
            />
            <div className="col-md-3 col-9 pt-3" id="container-img">
              <img src="img/base2.png" alt="" className="card-img-top" />
              {this.state.imageGroup.map(img => {
                return (
                  <React.Fragment key={img.id}>
                    <img
                      src={img.img}
                      className={img.name + "  position-absolute"}
                      alt={img.name}
                    />
                  </React.Fragment>
                );
              })}
            </div>
            <LettersPuzzlTwoPlayers
              booleanArray={this.state.booleanArray}
              letterToArray={this.state.letterToArray}
            />
          </React.Fragment>
        ) : this.state.lose === true ? (
          <div className="row finish">
            {this.props.result.msg !== undefined ? (
              <div className="col-12">
                <Link
                  to={`/two_players?name=${this.props.name}&field=${this.props.field}`}
                  refresh="true"
                  onClick={() => window.location.reload()}
                >
                  <button
                    type="submit"
                    className="btn btn-success btn-block mt-2"
                  >
                    play again
                  </button>
                </Link>
              </div>
            ) : null}
            <div className="col-12  position-relative">
              <h1 className="text-center text-danger  text-uppercase">
                {this.props.name} <br />
              </h1>
              <h3 className="text-center text-info">{` You Lose in  ${this.state.dur.time}`}</h3>
              <img src="img/lose.jpg" style={{ width: "100%" }} alt="you win" />
              <h2 className="text-center text-danger text-uppercase">
                <br />
                the pharse is: {this.props.bostTwo}
              </h2>
            </div>
          </div>
        ) : this.state.win === true ? (
          <div className="col-12 slide-win">
            {this.props.result.msg !== undefined ? (
              <div className="col-12 ">
                <Link
                  to={`/two_players?name=${this.props.name}&field=${this.props.field}`}
                  refresh="true"
                  onClick={() => window.location.reload()}
                >
                  <button
                    type="submit"
                    className="btn btn-success btn-block mt-2"
                  >
                    play again
                  </button>
                </Link>
              </div>
            ) : null}

            <div className="col-12  position-relative">
              <h1 className="text-center text-danger  text-uppercase name-two">
                {this.props.name} <br />
              </h1>
              <h3>{` You Win in  ${this.state.dur.time}`}</h3>
              <h2 className="text-center text-capitalize text-light shadow-win">
                You Won
              </h2>
              <h2 className="text-center text-danger text-uppercase">
                <br />
                the pharse is: {this.props.bostTwo}
              </h2>
            </div>
          </div>
        ) : null}
      </React.Fragment>
    );
  }
}
