
import React from 'react';
import './App.css';
import GameContainer from './GameContainer'
import API from "./API.js";


import { Route, Switch } from "react-router-dom";
import WelcomePage from "./WelcomePage";
import HighScoreContainer from './containers/HighScoreContainer';
//const cardsURL = "http://localhost:3000/api/v1/cards";
const cardsURL = "https://safe-anchorage-93805.herokuapp.com/api/v1/cards";

class App extends React.Component {
  state = {
    username: "",
    password: "",
    user: null,
    scores: {}
  }

  componentDidMount(){
    console.log("App has mounted")
    //this.setCurrentUserFromToken().then(data => this.fetchTotalScores())
    this.fetchTotalScores().then(data => this.setCurrentUserFromToken())
    //API.fetchTotalScores().then(scores => this.setState({scores}))
  }

  fetchTotalScores = () => {
    return API.fetchTotalScores().then(scores => this.setState({scores}))
  }

  clearUserState = () => {
    this.setState({
      username: "",
      password: "",
      user: null
    })
  }

  setCurrentUserFromToken = () => {
    let token = localStorage.token ? localStorage.token : null

    if (token){
      API.validateUser().then(user => {
        this.setState({user})
      })  
    }
  }

  handleFormChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  createUserOrSignIn = (showLogIn) => {

    console.log(showLogIn ? "Logging in..." : "Signing up...")
    let user = { username: this.state.username, password: this.state.password }
    if (showLogIn) {
      this.logIn(user)
    }
    else {
      this.createUser(user)
    }
  }

  createUser = user => {
    API.signUp(user).then(userData => this.setState({ user: userData }))
      .then(() => {
        console.log(this.props.history)
        this.props.history.push('/game')})
      .catch(errors => {
        this.setState({ errors })
        alert(errors)
      })
  }

  logIn = user => {
    API.logIn(user).then(userData => this.setState({ user: userData }))
      .then(() => this.props.history.push('/game'))
      .catch(errors => {
        this.setState({ errors })
        alert(errors)
      })
  };

  renderWelcomeOrWelcomeBack = (routerProps) => {
    
    return(
      <WelcomePage {...routerProps}
      handleFormChange={this.handleFormChange}
      username={this.state.username}
      password={this.state.password}
      createUserOrSignIn={this.createUserOrSignIn}
    />
    )
  }

  render() {
    console.log("APP HAS RENDERED")

  return (
      <div className="App">
        {/* {this.state.errors} //REMOVE? */}
        <header className="App-header">
          <React.Fragment>
            <Switch>
              <Route exact path="/test" render={() => <h1>Home!</h1>} />
             

             
              <Route exact path='/' render={routerProps =>
               {return this.renderWelcomeOrWelcomeBack(routerProps)}
              }
              />

              <Route exact path='/scores' render={routerProps =>
                <HighScoreContainer 
                  {...routerProps}  
                  scores={this.state.scores}
                  fetchTotalScores={this.fetchTotalScores}
                />        
              }
              />
              <Route exact path='/game' render={routerProps =>
                <GameContainer 
                  {...routerProps}
                  currentUser={this.state.username}
                  currentUserObj={this.state.user}
                  clearUserState={this.clearUserState} 
                  setCurrentUserFromToken={this.setCurrentUserFromToken}
                />        
              }
              />
            </Switch>
          </React.Fragment>
        </header>
      </div>
    );
  }
}
export default App;
