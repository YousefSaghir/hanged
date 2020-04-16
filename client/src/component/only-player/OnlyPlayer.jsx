import React, { Component } from "react";
import PharsesItaly from "../../pharses/PharsesItaly.json";
import PharsesEnglish from "../../pharses/PharsesEnglish.json";
import queryString from "query-string";
import { images } from "../../data.js";
import Win from "./Win";
import * as moment from "moment";
import Lose from "./Lose.jsx";
import AlphabetsEng from "../alphabets/AlphabetsEng";
import AlphabetsIt from "../alphabets/AlphabetsIt";
import AlphabetsPuzzle from "../alphabetsPuzzle/AlphabetsPuzzle";
import ImgPuzzle from "../imagePuzzle/ImgPuzzle";
import Header from "../base/Header";
import { lettersEn, lettersIt } from "../letters";
import Footer from "../base/Footer";
export default class OnlyPlayer extends Component {
  state = {
    lettersIt: lettersIt,
    lettersEn: lettersEn,
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
    dur: "",
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
        .map((item) => {
          return item === " " ? (item = "/") : item;
        });
      booleanArray = pharse.map((item) => item === "/");
      this.setState({ pharse, name, author, myLang, booleanArray, herePharse });
    } else {
      author = PharsesItaly[num].author;
      herePharse = PharsesItaly[num].ph;
      pharse = PharsesItaly[num].ph
        .trim()
        .split("")
        .map((item) => {
          return item === " " ? (item = "/") : item;
        });
      booleanArray = pharse.map((item) => item === "/");
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
      (letter) => letter.toLowerCase() === e.toLowerCase()
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
          dateEnd: new Date(),
        });

        const a = moment(this.state.dateStart);
        const b = moment(this.state.dateEnd);
        dur = `You Lost in minutes: 0${b.diff(a, "minutes")}:${
          b.diff(a, "seconds") % 60
        }`;
        this.setState({ dur });
      }
    }
    let checkBooleanArray = [];
    if (this.state.myLang === "EN") {
      checkBooleanArray = this.checkChar(
        lettersEn,
        pharse.filter((item) => item !== "/")
      );
    } else {
      checkBooleanArray = this.checkChar(
        lettersIt,
        pharse.filter((item) => item !== "/")
      );
    }

    if (checkBooleanArray.findIndex((it) => it === true) < 0) {
      this.setState({
        win: true,
        dateEnd: new Date(),
      });

      let a = moment(this.state.dateStart);
      let b = moment(this.state.dateEnd);
      dur = `You Won in minutes: 0${b.diff(a, "minutes") % 60}:${
        b.diff(a, "seconds") % 60
      }`;
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
      <div className="container">
        {this.state.win === false && this.state.lose === false ? (
          <React.Fragment>
            <Header name={this.state.name} />

            <hr />
            <div className="row my-md-5">
              <ImgPuzzle
                imageGroup={this.state.imageGroup}
                name={this.state.name}
              />

              {this.state.myLang === "EN" ? (
                <AlphabetsEng
                  alphabets={this.state.lettersEn}
                  handleClick={this.handleClick}
                />
              ) : (
                <AlphabetsIt
                  alphabets={this.state.lettersIt}
                  handleClick={this.handleClick}
                />
              )}
            </div>

            <AlphabetsPuzzle
              pharse={this.state.pharse}
              booleanArray={this.state.booleanArray}
            />
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
        <Footer />
      </div>
    );
  }
}
