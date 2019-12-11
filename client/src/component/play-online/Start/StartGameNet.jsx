import React, { Component } from "react";
import ErrorLetters from "../ErrorLetters";
import Letters from "../Letters";
import "./StartGameNet.css";
import { images } from "../../../data.js";
import LettersPuzzl from "../LettersPuzzl";
import * as moment from "moment";
export default class StartGameNet extends Component {
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
    newArray: [],
    booleanArray: [],
    foundLetters: [],
    imageGroup: [],
    finish: false,
    errorLetter: [],
    win: false,
    resLettre: [],
    dateStart: {},
    dateEnd: {},
    dur: {}
  };

  componentDidMount() {
    let { myBost } = this.props;
    this.setState({
      dateStart: new Date()
    });
    let newArray = this.state.newArray;
    newArray = myBost
      .trim()
      .split("")
      .map(item => {
        return item === " " ? (item = "/") : item;
      });
    this.setState({ newArray });
    let booleanArray = this.state.booleanArray.slice();
    booleanArray = newArray.map(item => item === "/");
    this.setState({ booleanArray });
  }
  handleClick = (e, ind) => {
    const { sendMsg } = this.props;
    let dur = this.state.dur;
    let letters = this.state.letters.slice();
    let newArray = this.state.newArray.slice();
    let num = newArray.findIndex(
      char => char.toLowerCase() === e.toLowerCase()
    );

    if (num >= 0) {
      let foundLetters = this.state.foundLetters;
      foundLetters.push(e);
      this.setState({
        foundLetters
      });
      letters.splice(ind, 1);
      this.setState({
        letters
      });

      let val = this.checkChar(this.state.foundLetters, this.state.newArray);

      this.setState({
        booleanArray: val
      });
    } else {
      let errorLetter = this.state.errorLetter;
      errorLetter.push(e);
      letters.splice(ind, 1);
      this.setState({
        letters,
        errorLetter
      });
      let imageGroup = this.state.imageGroup;
      let len = imageGroup.length;
      if (len < images.length) {
        imageGroup.push(images[len]);
        this.setState({ imageGroup });
      } else {
        this.setState({
          finish: true,
          dateEnd: new Date()
        });

        let a = moment(this.state.dateStart);
        let b = moment(this.state.dateEnd);
        dur = {
          time: `minutes: 0${b.diff(a, "minutes")}:${b.diff(a, "seconds") % 60}`,
          msg: `${this.props.name} is lose in`
        };
        this.setState({ dur });
        sendMsg(dur);
      }
    }
    let checkBooleanArray = this.checkChar(
      letters,
      newArray.filter(item => item !== "/")
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
      sendMsg(dur);
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
      <div className="row">
        <div className="col-12 text-center">
          <span className="p-3 text-primary">
            {this.props.players[0].name === this.props.name
              ? "You"
              : this.props.players[0].name}
          </span>
          <span className="p-3 text-danger">VS</span>
          <span className="p-3 text-primary">
            {this.props.players[1].name === this.props.name
              ? "You"
              : this.props.players[1].name}
          </span>
          {this.props.result.msg !== undefined ? (
            <p>{`${this.props.result.msg} ${this.props.result.time}`}</p>
          ) : null}
        </div>
        {this.state.newArray.length > 0 &&
        this.state.win === false &&
        this.state.finish === false ? (
          <div className="row pt-5">
            <ErrorLetters errorLetter={this.state.errorLetter} />
            <Letters
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
            <LettersPuzzl
              newArray={this.state.newArray}
              booleanArray={this.state.booleanArray}
            />
          </div>
        ) : this.state.finish === true ? (
          <div className="row finish">
            <div className="col-12  position-relative">
              <h1 className="text-center text-danger  text-uppercase">
                {this.props.name} <br />
              </h1>
              <h3 className="text-center text-info">{` You Lose in  ${this.state.dur.time}`}</h3>
              <img src="img/lose.jpg" style={{ width: "100%" }} alt="you win" />
              <h2 className="text-center text-danger text-uppercase">
                <br />
                the pharse is: {this.props.myBost}
              </h2>
            </div>
          </div>
        ) : this.state.win === true ? (
          <div className="row win">
            <div className="col-12  position-relative">
              <h1 className="text-center text-danger  text-uppercase">
                {this.props.name} <br />
              </h1>
              <h3>{` You Win in  ${this.state.dur.time}`}</h3>
              <img
                src="img/win-01.jpg"
                style={{ width: "100%" }}
                alt="you win"
              />
              <h2 className="text-center text-danger text-uppercase">
                <br />
                the pharse is: {this.props.myBost}
              </h2>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}
