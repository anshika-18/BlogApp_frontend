import React, { Component, Fragment } from "react";
import {
  Navbar,
  Container,
  NavbarToggler,
  Nav,
  Collapse,
  NavLink,
} from "reactstrap";
import Login from "./Login";
import { Link } from "react-router-dom";
import Register from "./Register";

class AppNavbar extends Component {
  state = {
    isOpen: false,
  };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };

  logout = () => {
    this.props.handleAuthentication(false);
    this.props.setUser("");
    localStorage.removeItem("token");
    this.props.setEmail(null);
    window.location.reload();
  };

  render() {
    //console.log(this.props.passed.user)
    //console.log(this.props.passed.isAuthenticated)
    return (
      <div>
        <Navbar color="dark" dark expand="sm" className="mb-5">
          <Container>
            <div>
              <Link
                to="/"
                style={{
                  textDecoration: "none",
                  fontWeight: "700",
                  color: "cyan",
                }}
                className="link"
              >
                Blog App
              </Link>
              <Link
                to="/myBlogs"
                style={{
                  marginLeft: "20px",
                  textDecoration: "none",
                  fontWeight: "700",
                  color: "cyan",
                }}
              >
                My Blogs
              </Link>
              <Link
                to="/create"
                style={{
                  marginLeft: "20px",
                  textDecoration: "none",
                  fontWeight: "700",
                  color: "cyan",
                }}
              >
                Create
              </Link>
            </div>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                {this.props.passed.isAuthenticated ? (
                  <Fragment>
                    <span style={{ color: "white", marginTop: "4%" }}>
                      {" "}
                      Welcome {this.props.passed.name}
                    </span>
                    <Fragment>
                      <NavLink
                        className="logout"
                        onClick={() => this.logout()}
                        href="/"
                      >
                        LOGOUT
                      </NavLink>
                    </Fragment>
                  </Fragment>
                ) : (
                  <Fragment>
                    <Login
                      handleAuthentication={this.props.handleAuthentication}
                      setEmail={this.props.setEmail}
                      setUser={this.props.setUser}
                      setToken={this.props.setToken}
                    ></Login>
                    <Register
                      handleAuthentication={this.props.handleAuthentication}
                      setEmail={this.props.setEmail}
                      setUser={this.props.setUser}
                      setToken={this.props.setToken}
                    ></Register>
                  </Fragment>
                )}
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
      </div>
    );
  }
}

export default AppNavbar;
