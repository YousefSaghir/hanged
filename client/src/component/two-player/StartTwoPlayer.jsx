import React, { Component } from "react";
import { images } from "../../data.js";
import * as moment from "moment";
import HeaderTwoPLayers from "./HeaderTwoPLayers";
import LostTwoPlayer from "./LostTwoPlayer";
import WinTwoPlayers from "./WinTwoPlayers";
import AlphabetsEng from "../alphabets/AlphabetsEng";
import AlphabetsPuzzle from "../alphabetsPuzzle/AlphabetsPuzzle";
import ImgPuzzle from "../imagePuzzle/ImgPuzzle.jsx";
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
      "ì",
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
    dur: {},
  };
  componentDidMount() {
    const { bostTwo } = this.props;
    this.setState({
      dateStart: new Date(),
    });

    let letterToArray = this.state.letterToArray;
    letterToArray = bostTwo
      .trim()
      .split("")
      .map((item) => {
        return item === " " ? (item = "/") : item;
      });
    this.setState({ letterToArray });
    let booleanArray = this.state.booleanArray.slice();
    booleanArray = letterToArray.map((item) => item === "/");
    this.setState({ booleanArray });
  }
  handleClick = (e, i) => {
    const { sendResult } = this.props;
    let dur = this.state.dur;
    let letters = this.state.letters.slice();
    let letterToArray = this.state.letterToArray.slice();
    let trueLetters = this.state.trueLetters;
    let num = letterToArray.findIndex(
      (char) => char.toLowerCase() === e.toLowerCase()
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
        falseLetters,
      });
      let imageGroup = this.state.imageGroup;
      let len = imageGroup.length;
      if (len < images.length) {
        imageGroup.push(images[len]);
        this.setState({ imageGroup });
      } else {
        this.setState({
          lose: true,
          dateEnd: new Date(),
        });

        const a = moment(this.state.dateStart);
        const b = moment(this.state.dateEnd);
        dur = {
          time: `minutes: 0${b.diff(a, "minutes")}:${
            b.diff(a, "seconds") % 60
          }`,
          msg: `${this.props.name} is lose in`,
        };
        this.setState({ dur });
        sendResult(dur);
      }
    }
    let checkBooleanArray = this.checkChar(
      letters,
      letterToArray.filter((item) => item !== "/")
    );

    if (checkBooleanArray.findIndex((it) => it === true) < 0) {
      this.setState({
        win: true,
        dateEnd: new Date(),
      });

      let a = moment(this.state.dateStart);
      let b = moment(this.state.dateEnd);
      dur = {
        time: `minutes: 0${b.diff(a, "minutes")}:${b.diff(a, "seconds") % 60}`,
        msg: `${this.props.name} is win in `,
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
        {this.props.result.msg !== undefined ? (
          <p className="text-center text-danger text-capitalize">{`${this.props.result.msg} ${this.state.dur.time}`}</p>
        ) : null}
        {this.state.letterToArray.length > 0 &&
        this.state.lose === false &&
        this.state.win === false ? (
          <React.Fragment>
            <div className="row">
              

              <ImgPuzzle
                  imageGroup={this.state.imageGroup}
                  name={this.props.name}
              />

              <AlphabetsEng
                alphabets={this.state.letters}
                handleClick={this.handleClick}
              />
            </div>
            <AlphabetsPuzzle
                booleanArray={this.state.booleanArray}
                pharse={this.state.letterToArray}
            />
          </React.Fragment>
        ) : this.state.lose === true ? (
          <LostTwoPlayer
            duration={this.state.dur.time}
            msg={this.props.result.msg}
            pharse={this.props.bostTwo}
            name={this.props.name}
            field={this.props.field}
          />
        ) : this.state.win === true ? (
          <WinTwoPlayers
            duration={this.state.dur.time}
            msg={this.props.result.msg}
            pharse={this.props.bostTwo}
            name={this.props.name}
            field={this.props.field}
          />
        ) : null}
      </React.Fragment>
    );
  }
}
