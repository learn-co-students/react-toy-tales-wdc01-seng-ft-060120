import React from 'react';
import './App.css';

import Header from './components/Header'
import ToyForm from './components/ToyForm'
import ToyContainer from './components/ToyContainer'

class App extends React.Component{

  state = {
    display: false,
    toys: []
  }

  componentDidMount() {
    fetch('http://localhost:3000/toys')
    .then(response => response.json())
    .then(toysData => this.setState({toys: toysData}))
  }

  handleClick = () => {
    let newBoolean = !this.state.display
    this.setState({
      display: newBoolean
    })
  }

  updateToyStateAdd = (toy) => {
    this.setState({
      toys: [...this.state.toys, toy],
      display: !this.state.display
    })
  }

  updateToyStateDelete = (toy) => {
    this.setState({
      toys: [this.state.toys.filter((t) => {return t !== toy})]
    })
  }

  render(){
    return (
      <>
        <Header/>
        {this.state.display ? <ToyForm updateToyStateAdd={this.updateToyStateAdd} /> : null}
        <div className="buttonContainer">
          <button onClick={this.handleClick}> Add a Toy </button>
        </div>
        <ToyContainer toys={this.state.toys} />
      </>
    );
  }

}

export default App;
