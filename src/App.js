import React from 'react';
import './App.css';

import Header from './components/Header'
import ToyForm from './components/ToyForm'
import ToyContainer from './components/ToyContainer'

import data from './data'


class App extends React.Component{

  state = {
    toys: [],
    display: false
  }

  componentDidMount() {
    fetch('http://localhost:3000/toys')
    .then(resp => resp.json())
    .then(toys => {
      this.setState({
        toys
      })
    })
  }

  handleClick = () => {
    let newBoolean = !this.state.display
    this.setState({
      display: newBoolean
    })
  }

  addToy = (toyData) => {
    fetch('http://localhost:3000/toys', {
      method: 'POST',
      headers: {
        'Content-Type' : "application/json"
      },
      body: JSON.stringify({
        name: toyData.name, 
        image: toyData.image,
        likes: 0
      })
    })
    .then(resp => resp.json())
    .then(newToy => {
      this.setState({
        toys: [...this.state.toys, newToy]
      })
    })
  }

  deleteToy = (toyData) => {
    fetch(`http://localhost:3000/toys/${toyData.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(resp => resp.json())
    .then(() => this.removeToy(toyData))
  }

  removeToy = (donateToy) => {
    const toys = this.state.toys.filter(toy => toy.id !== donateToy.id)
    this.setState({
      toys: toys
    })
  }

  addLike = (toy) => {
    fetch(`http://localhost:3000/toys/${toy.id}`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({likes: toy.likes + 1})
    } )
    .then(resp => resp.json())
    .then(likedToy => {
      this.setState({
        toys: this.state.toys.map(toy => toy.id === likedToy.id ? likedToy : toy)
      })
    })
  }

  render(){
    return (
      <>
        <Header/>
        { this.state.display
            ?
          <ToyForm addToy={this.addToy}/>
            :
          null
        }
        <div className="buttonContainer">
          <button onClick={this.handleClick}> Add a Toy </button>
        </div>
        <ToyContainer toys={this.state.toys} deleteToy={this.deleteToy} addLike={this.addLike} />
      </>
    );
  }

}

export default App;
