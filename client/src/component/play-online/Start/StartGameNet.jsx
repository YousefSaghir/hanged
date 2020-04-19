import React, { Component } from "react";
import WinPlayOnline from "../WinPlayOnline";
import GameOver from "../GameOver";
import { images } from "../../../data.js";
import * as moment from "moment";
import AlphabetsEng from "../../alphabets/AlphabetsEng";
import AlphabetsPuzzle from "../../alphabetsPuzzle/AlphabetsPuzzle";
import ImgPuzzle from "../../imagePuzzle/ImgPuzzle";
import Header from "../../base/Header";
import { lettersIt } from "../../letters";
import Footer from "../../base/Footer";
export default class StartGameNet extends Component {
  state = {
    letters: lettersIt,
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
    dur: {},
  };

  componentDidMount() {
    let { myBost } = this.props;
    this.setState({
      dateStart: new Date(),
    });
    let newArray = this.state.newArray;
    newArray = myBost
      .trim()
      .split("")
      .map((item) => {
        return item === " " ? (item = "/") : item;
      });
    this.setState({ newArray });
    let booleanArray = this.state.booleanArray.slice();
    booleanArray = newArray.map((item) => item === "/");
    this.setState({ booleanArray });
  }
  handleClick = (e, ind) => {
    const { sendMsg } = this.props;
    let dur = this.state.dur;
    let letters = this.state.letters.slice();
    let newArray = this.state.newArray.slice();
    let num = newArray.findIndex(
      (char) => char.toLowerCase() === e.toLowerCase()
    );

    if (num >= 0) {
      let foundLetters = this.state.foundLetters;
      foundLetters.push(e);
      this.setState({
        foundLetters,
      });
      letters.splice(ind, 1);
      this.setState({
        letters,
      });

      let val = this.checkChar(this.state.foundLetters, this.state.newArray);

      this.setState({
        booleanArray: val,
      });
    } else {
      let errorLetter = this.state.errorLetter;
      errorLetter.push(e);
      letters.splice(ind, 1);
      this.setState({
        letters,
        errorLetter,
      });
      let imageGroup = this.state.imageGroup;
      let len = imageGroup.length;
      if (len < images.length) {
        imageGroup.push(images[len]);
        this.setState({ imageGroup });
      } else {
        this.setState({
          finish: true,
          dateEnd: new Date(),
        });

        let a = moment(this.state.dateStart);
        let b = moment(this.state.dateEnd);
        dur = {
          time: `minutes: 0${b.diff(a, "minutes")}:${
            b.diff(a, "seconds") % 60
          }`,
          msg: `${this.props.name} is lose in`,
        };
        this.setState({ dur });
        sendMsg(dur);
      }
    }
    let checkBooleanArray = this.checkChar(
      letters,
      newArray.filter((item) => item !== "/")
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
      <React.Fragment>
        <Header players={this.props.players} name={this.props.name} />

        {this.props.result.msg !== undefined ? (
          <p className="text-center text-danger text-capitalize">{`${this.props.result.msg} ${this.props.result.time}`}</p>
        ) : null}
        {this.props.leave.text ? (
          <p className="lead text-center text-danger text-capitalize">{`${this.props.leave.text}`}</p>
        ) : null}
        <hr />
        {this.state.newArray.length > 0 &&
        this.state.win === false &&
        this.state.finish === false ? (
          <div className="row my-md-5">
            <ImgPuzzle
              imageGroup={this.state.imageGroup}
              name={this.props.name}
            />

            <AlphabetsEng
              alphabets={this.state.letters}
              handleClick={this.handleClick}
            />

            <AlphabetsPuzzle
              pharse={this.state.newArray}
              booleanArray={this.state.booleanArray}
            />
          </div>
        ) : this.state.finish === true ? (
          <GameOver
            duration={this.state.dur.time}
            name={this.props.name}
            pharse={this.props.myBost}
          />
        ) : this.state.win === true ? (
          <WinPlayOnline
            duration={this.state.dur.time}
            name={this.props.name}
            pharse={this.props.myBost}
          />
        ) : null}
        <Footer />
      </React.Fragment>
    );
  }
}
