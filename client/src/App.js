import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Main from "./pages/MainPage";
import Lesson from "./pages/LessonPage";
import Profile from "./pages/ProfilePage";


function App() {
  return (
    <Router>
      <div>
        <Nav />
          <Route exact path="/" component={Main} />
          <Route exact path="/home" component={Main} />
          <Route exact path="/lesson" component={Lesson} />
          <Route exact path="/profile" component={Profile} />
      </div>
    </Router>
  );
}

export default App;