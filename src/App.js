import React from 'react';
import './App.css';
import Header from './components/Header'
import ToyForm from './components/ToyForm'
import ToyContainer from './components/ToyContainer'

import data from './data'


class App extends React.Component{

  state = {
    display: false,
    toys: [],
    displayToys: []
  }

  componentDidMount() {
    fetch("http://localhost:3000/toys")
    .then(resp => resp.json())
    .then(toys => this.setState({
      toys: toys,
      displayToys: toys
    }))
  }

  handleClick = () => {
    let newBoolean = !this.state.display
    this.setState({
      display: newBoolean
    })
  }

  render(){
    return (
      <>
        <Header/>
        { this.state.display
            ?
          <ToyForm sendForm={this.sendForm} />
            :
          null
        }
        <div className="buttonContainer">
          <button onClick={this.handleClick}> Add a Toy </button>
        </div>
        <ToyContainer toys={this.state.displayToys} handleLike={this.handleLike} handleDelete={this.handleDelete}/>
      </>
    );
  }

  sendForm = (formData) => {
    const postRequest = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({...formData, likes: 0 })
    }
    fetch("http://localhost:3000/toys", postRequest)
    .then(resp => resp.json())
    .then(toy => this.setState({
      toys: [...this.state.toys, toy],
      displayToys: [...this.state.displayToys, toy]
    }))
  }

  handleLike = (toy) => {
    const patchRequest = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({likes: toy.likes + 1 })
    }
    fetch(`http://localhost:3000/toys/${toy.id}`, patchRequest)
    .then(resp => resp.json())
    .then(likedToy => this.setState({
      toys: this.state.toys.map(toy => toy.id === likedToy.id ? likedToy : toy),
      displayToys: this.state.toys.map(toy => toy.id === likedToy.id ? likedToy : toy)
    }))
  }

  handleDelete = (toy) => {
    const deleteRequest = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    }
    fetch(`http://localhost:3000/toys/${toy.id}`, deleteRequest)
    .then(resp => resp.json())
    .then(() => this.removeToy(toy))
  }

  removeToy = (oldToy) => {
    
    const toys = this.state.toys.filter(toy => toy.id !== oldToy.id)
    const displayToys = this.state.displayToys.filter(toy => toy.id !== oldToy.id)
    this.setState({
      toys: toys,
      displayToys: displayToys
    })
  }

}

export default App;
