import React from 'react';
import logo from './logo.svg';
import './App.css';
import CardContainer from './CardContainer'
// import API from './API.js'

class App extends React.Component {

  state = {
    currentUser: '',
    cards: []
  }

  componentDidMount(){
    // API.cards()
    // .then(data => console.log(data))   

    const cardsURL = 'http://localhost:3000/api/v1/cards'
    fetch(cardsURL).then(resp => resp.json()).then(data => this.setState({cards: data}, console.log(data)))
  }

  render(){

    const allCards = this.state.cards
    return (
      <>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          
          <CardContainer allCards={allCards}/>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
      </>
    );
  }
}


export default App;
