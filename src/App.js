import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import $ from "jquery";
import "./App.scss";
import Header from "./components/Header";
import Footer from "./components/Footer";
import About from "./components/About";
import Home from "./components/Home";
import Contact from "./components/Contact";

class App extends Component {

  constructor(props) {
    super();
    this.state = {
      foo: "bar",
      resumeData: {},
      sharedData: {},
    };
  }

  componentDidMount = () => {
    this.loadSharedData();
    this.loadResumeFromPath(`res_primaryLanguage.json`);
  }

  loadResumeFromPath = (path) => {
    $.ajax({
      url: path,
      dataType: "json",
      cache: false,
      success: function (data) {
        this.setState({ resumeData: data });
      }.bind(this),
      error: function (xhr, status, err) {
        alert(err);
      },
    });
  }

  loadSharedData = () => {
    $.ajax({
      url: `portfolio_shared_data.json`,
      dataType: "json",
      cache: false,
      success: function (data) {
        this.setState({ sharedData: data });
        document.title = `${this.state.sharedData.basic_info.name}`;
      }.bind(this),
      error: function (xhr, status, err) {
        alert(err);
      },
    });
  }

  render() {
    return (
      <Router>
        <Header sharedData={this.state.sharedData.basic_info} />
        <Switch>
          <Route exact path="/">
            <Home
              resumeData={this.state.resumeData}
              sharedData={this.state.sharedData}
            />
          </Route>
          <Route path="/about">
            <About
              resumeBasicInfo={this.state.resumeData.basic_info}
              sharedBasicInfo={this.state.sharedData.basic_info}
            />
          </Route>
          <Router path="/contact">
            <Contact />
          </Router>
        </Switch>
        <Footer 
          sharedBasicInfo={this.state.sharedData.basic_info}
        />  
      </Router>
    );
  }
}

export default App;
