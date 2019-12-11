import React, { Component } from "react";
import PharsesItaly from "../../pharses/PharsesItaly.json";
import PharsesEnglish from "../../pharses/PharsesEnglish.json";
import queryString from "query-string";
import { images } from "../../data.js";
import PuzzleOnlyPlayer from "./PuzzleOnlyPlayer";
import LettersEng from "./LettersEng";
import LettersIt from "./LettersIt";
import Win from "./Win";
import * as moment from "moment";
import "./OnlyPlayer.css";
import Lose from "./Lose.jsx";
export default class OnlyPlayer extends Component {
  state = {
    lettersIt: [
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
    lettersEn: [
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
      "Z"
    ],
    pharse: [],
    name: "",
    author: "",
    myLang: "",
    imageGroup: [],
    booleanArray: [],
    dateStart: {},
    dateEnd: {},
    falseLetters: [],
    trueLetters: [],
    herePharse: "",
    lose: false,
    win: false,
    dur: ""
  };

  componentDidMount() {
    const { name, lang } = queryString.parse(this.props.location.search);
    let num = Math.floor(Math.random() * PharsesItaly.length);
    let pharse = this.state.pharse;
    let author = this.state.author;
    let myLang = this.state.myLang;
    let booleanArray = this.state.booleanArray.slice();
    let herePharse = this.state.herePharse;

    myLang = lang;
    this.setState({ dateStart: new Date() });
    if (lang === "EN") {
      author = PharsesEnglish[num].author;
      herePharse = PharsesEnglish[num].ph;
      pharse = PharsesEnglish[num].ph
        .trim()
        .split("")
        .map(item => {
          return item === " " ? (item = "/") : item;
        });
      booleanArray = pharse.map(item => item === "/");
      this.setState({ pharse, name, author, myLang, booleanArray, herePharse });
    } else {
      author = PharsesItaly[num].author;
      herePharse = PharsesItaly[num].ph;
      pharse = PharsesItaly[num].ph
        .trim()
        .split("")
        .map(item => {
          return item === " " ? (item = "/") : item;
        });
      booleanArray = pharse.map(item => item === "/");
      this.setState({ pharse, name, author, myLang, booleanArray, herePharse });
    }
  }

  handleClick = (e, i) => {
    let lettersEn = this.state.lettersEn.slice();
    let lettersIt = this.state.lettersIt.slice();
    let trueLetters = this.state.trueLetters.slice();
    let pharse = this.state.pharse.slice();
    let booleanArray = this.state.booleanArray.slice();
    let falseLetters = this.state.falseLetters.slice();
    let imageGroup = this.state.imageGroup;
    let dur = this.state.dur;
    const num = pharse.findIndex(
      letter => letter.toLowerCase() === e.toLowerCase()
    );
    if (num >= 0) {
      trueLetters.push(e);
      this.setState({ trueLetters });

      if (this.state.myLang === "EN") {
        lettersEn.splice(i, 1);
        this.setState({ lettersEn });
        let val = this.checkChar(trueLetters, pharse);
        booleanArray = val;
        this.setState({ booleanArray });
      } else {
        lettersIt.splice(i, 1);
        this.setState({ lettersIt });
        let val = this.checkChar(trueLetters, pharse);
        booleanArray = val;
        this.setState({ booleanArray });
      }
    } else {
      falseLetters.push(e);
      this.setState({ falseLetters });
      if (this.state.myLang === "EN") {
        lettersEn.splice(i, 1);
        this.setState({ lettersEn });
      } else {
        lettersIt.splice(i, 1);
        this.setState({ lettersIt });
      }
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
        dur = `You Lost in minutes: 0${b.diff(a, "minutes")}:${b.diff(
          a,
          "seconds"
        ) % 60}`;
        this.setState({ dur });
      }
    }
    let checkBooleanArray = [];
    if (this.state.myLang === "EN") {
      checkBooleanArray = this.checkChar(
        lettersEn,
        pharse.filter(item => item !== "/")
      );
    } else {
      checkBooleanArray = this.checkChar(
        lettersIt,
        pharse.filter(item => item !== "/")
      );
    }

    if (checkBooleanArray.findIndex(it => it === true) < 0) {
      this.setState({
        win: true,
        dateEnd: new Date()
      });

      let a = moment(this.state.dateStart);
      let b = moment(this.state.dateEnd);
      dur = `You Won in minutes: 0${b.diff(a, "minutes") % 60}:${b.diff(
        a,
        "seconds"
      ) % 60}`;
      this.setState({ dur });
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
      <div className="container-fluid">
        <div className="row row-player-only">
          {this.state.win === false && this.state.lose === false ? (
            <React.Fragment>
              <div className="col-12">
                <h2 className="text-center text-uppercase text-info">
                  {this.state.name}
                </h2>
                <div className="container">
                  <div className="row">
                    {this.state.falseLetters.length > 0
                      ? this.state.falseLetters.map((item, index) => {
                          return (
                            <div className="col-1 btn-danger" key={index}>
                              {item}
                            </div>
                          );
                        })
                      : null}
                  </div>
                </div>
              </div>

              <div className="col-md-8 col-12 pt-3">
                <div className="container">
                  {this.state.myLang === "EN" ? (
                    <LettersEng
                      lettersEn={this.state.lettersEn}
                      handleClick={this.handleClick}
                    />
                  ) : (
                    <LettersIt
                      lettersIt={this.state.lettersIt}
                      handleClick={this.handleClick}
                    />
                  )}
                </div>
              </div>

              <div className="col-md-3 col-9 pt-3" id="container-img">
                <img src="img/base2.png" alt="" className="card-img-top" />
                {this.state.imageGroup.map(img => {
                  return (
                    <React.Fragment key={img.id}>
                      {img.id === 7 ? (
                        <span className="position-absolute text-capitalize careful text-danger">
                          {`hello ${this.state.name} `} <br />
                          careful you are losing{" "}
                        </span>
                      ) : null}
                      <img
                        src={img.img}
                        className={img.name + "  position-absolute"}
                        alt={img.name}
                      />
                    </React.Fragment>
                  );
                })}
              </div>

              <div className="col-12 pt-3 pb-3">
                <div className="container">
                  <PuzzleOnlyPlayer
                    pharse={this.state.pharse}
                    booleanArray={this.state.booleanArray}
                  />
                </div>
              </div>
            </React.Fragment>
          ) : this.state.win === true && this.state.lose === false ? (
            <React.Fragment>
              <Win
                name={this.state.name}
                pharse={this.state.herePharse}
                author={this.state.author}
                lang={this.state.myLang}
                dur={this.state.dur}
              />
            </React.Fragment>
          ) : this.state.win === false && this.state.lose === true ? (
            <React.Fragment>
              <Lose
                name={this.state.name}
                pharse={this.state.herePharse}
                author={this.state.author}
                lang={this.state.myLang}
                dur={this.state.dur}
              />
            </React.Fragment>
          ) : null}
        </div>
      </div>
    );
  }
}
