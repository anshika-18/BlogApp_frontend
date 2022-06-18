import React, { Component } from "react";
import AppNavbar from "./components/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import Main from "./components/main";
import axios from "axios";
import { BrowserRouter, Route } from "react-router-dom";
import MyBlog from "./components/MyBlog";
import SingleBlog from "./components/singleBlog";
import Update from "./components/Update";
import CreateBlog from "./components/create";
import "./App.css";

class App extends Component {
  state = {
    name: "",
    email: null,
    isAuthenticated: false,
    token: null,
  };

  componentDidMount() {
    const token = localStorage.getItem("token");
    if (token) {
      const config = {
        headers: {
          "x-auth-token": token,
        },
      };
      axios
        .get(
          "https://blogapp-backend-anshika.herokuapp.com/api/auth/user",
          config
        )
        .then((user) => {
          //console.log(user.data.name)
          this.handleAuthentication(true);
          this.setUser(user.data.name);
          this.setEmail(user.data.email);
        })
        .catch((err) => console.log(err.response.data));
    }
  }

  handleAuthentication = (value) => {
    this.setState({ isAuthenticated: value });
  };

  setUser = (name) => {
    this.setState({ name: name });
  };

  setEmail = (email) => {
    this.setState({ email: email });
  };

  setToken = (token) => {
    this.setState({ token: token });
  };

  render() {
    //console.log("anshika");
    //console.log(this.state.name)
    return (
      <div className="App">
        <BrowserRouter>
          <AppNavbar
            passed={this.state}
            handleAuthentication={this.handleAuthentication}
            setEmail={this.setEmail}
            setUser={this.setUser}
            setToken={this.setToken}
          />
          <Route
            exact
            path="/"
            render={() => <Main passed={this.state}></Main>}
          ></Route>
          <Route
            path="/myBlogs"
            render={() => <MyBlog passed={this.state}></MyBlog>}
          ></Route>
          <Route
            path="/blog/:id"
            render={(props) => <SingleBlog {...props}></SingleBlog>}
          ></Route>
          <Route
            path="/update/:id"
            render={(props) => <Update {...props}></Update>}
          ></Route>
          <Route
            path="/create"
            render={(props) => <CreateBlog {...props}></CreateBlog>}
          ></Route>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
