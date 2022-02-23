import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";

import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import BoardUser from "./components/board-user.component";
import BoardModerator from "./components/board-moderator.component";
import BoardAdmin from "./components/board-admin.component";
import Proba from "./components/sajatosztalyok/Proba";
import Anyagtorles from "./components/sajatosztalyok/Anyagtorles";
import Felvitel from "./components/sajatosztalyok/Anyagfelvitel";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";


// import AuthVerify from "./common/auth-verify";
import EventBus from "./common/EventBus";

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }
    
    EventBus.on("logout", () => {
      this.logOut();
    });
  }

  componentWillUnmount() {
    EventBus.remove("logout");
  }

  logOut() {
    AuthService.logout();
    this.setState({
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    });
  }

  render() {
    const { currentUser, showModeratorBoard, showAdminBoard } = this.state;

    return (
      <div>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Navbar.Brand href="/home">
            <Link to={"/"} className="navbar-brand">
              ProFreshCash
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              {showModeratorBoard && ( <Nav.Link>
                  <Link to={"/mod"} className="nav-link">
                    Moderator oldal
                  </Link>
              </Nav.Link>)}
              {showAdminBoard && ( <Nav.Link>
                <Link to={"/admin"} className="nav-link">
                  Admin oldal
                </Link>
              </Nav.Link>)}

              {currentUser && ( <Nav.Link>
                <Link to={"/home"} className="nav-link">
                  Kezdőlap
                </Link>
              </Nav.Link>)}

              {currentUser && ( <Nav.Link>
                <Link to={"/user"} className="nav-link">
                  Felhasználó
                </Link>
              </Nav.Link>)}

              {currentUser && ( <Nav.Link>
                <Link to={"/Proba"} className="nav-link">
                  Próba
                </Link>
              </Nav.Link>)}
              
              {showAdminBoard && ( <Nav.Link>
                <Link to={"/Anyagtorles"} className="nav-link">
                  Anyagok Törlése
                </Link>
              </Nav.Link>)}

              {showAdminBoard && ( <Nav.Link>
                <Link to={"/Anyagfelvitel"} className="nav-link">
                  Új anyag felvitele
                </Link>
              </Nav.Link>)}


            </Nav>
              {currentUser ? (
                  <Nav>
                      <Nav.Link>
                      <Link to={"/profile"} className="nav-link">
                        {currentUser.username}
                      </Link>
                      </Nav.Link>
                    <Nav.Link>
                      <a href="/login" className="nav-link" onClick={this.logOut}>
                        Kijelentkezés
                      </a>
                    </Nav.Link>
                  </Nav>
              ) : (
                  <Nav>
                  <div className="navbar-nav ml-auto">
                    <Nav.Link>
                      <Link to={"/login"} className="nav-link">
                        Bejelentkezés
                      </Link>
                    </Nav.Link>

                    <Nav.Link>
                      <Link to={"/register"} className="nav-link">
                        Regisztráció
                      </Link>
                    </Nav.Link>
                  </div>
                  </Nav>
              )}
          </Navbar.Collapse>
        </Navbar>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/home"]} component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/profile" component={Profile} />
            <Route path="/user" component={BoardUser} />
            <Route path="/mod" component={BoardModerator} />
            <Route path="/admin" component={BoardAdmin} />
            <Route path="/Proba" component={Proba}/>
            <Route path="/Anyagtorles" component={Anyagtorles}/>
            <Route path="/Anyagfelvitel" component={Felvitel}/>
            
          </Switch>
        </div>

        { /*<AuthVerify logOut={this.logOut}/> */ }
      </div>
    );
  }
}

export default App;
