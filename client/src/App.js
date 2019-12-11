import React from "react";
// import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Join from "./component/Join/Join";
import Players from "./component/play-online/Players";
import TwoPlayers from "./component/two-player/TwoPlayers";
import OnlyPlayer from "./component/only-player/OnlyPlayer";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Join} />
        <Route path="/players" exact component={Players} />
        <Route path="/two_players" component={TwoPlayers} />
        <Route path="/player_only" component={OnlyPlayer} />
      </Switch>
    </Router>
  );
}

export default App;
