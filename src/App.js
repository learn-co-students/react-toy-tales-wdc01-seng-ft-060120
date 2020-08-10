import React from 'react';
import './App.css';

import Header from './components/Header'
import ToyForm from './components/ToyForm'
import ToyContainer from './components/ToyContainer'

// import data from './data'

const url = 'http://localhost:3000/toys/'


class App extends React.Component{

  state = {
    display: false,
    toys: []
  }

  handleClick = () => {
    let newBoolean = !this.state.display
    this.setState({
      display: newBoolean
    })
  }

  componentDidMount(){
    fetch(url)
    .then(resp => resp.json())
    .then(toys => this.setToys(toys))
  }

  setToys = (toys) => {
    this.setState({
      toys: toys
    })
  }

  increaseLikes = (clickedToy) => {
    // debugger
    let id = clickedToy.id

    this.setState({
      toys: this.state.toys.map(toy => {
        if(toy === clickedToy){
          return {...toy, likes: toy.likes + 1}
        }
        return toy
      })
    })
    // patch fetch request
    fetch(url + id, {
      method: 'PATCH', 
      headers: {
        'Content-type': 'application/json',
        'accept': 'application/json'
      },
      body: JSON.stringify({
        likes: clickedToy.likes + 1
      })
    })
    .then(resp => resp.json())

  }

  deleteToy = (clickedToy) => {
    // debugger
    let id = clickedToy.id
    this.setState({
      toys: this.state.toys.filter(toy => 
        toy !== clickedToy
        //  remove clicked Toy from array
      )
    })
    // delete fetch Request
    return fetch(url + id , {
      method: 'delete'
    })
    .then(resp => resp.json());
  }

  addToy = (newToy) => {
    console.log(newToy)
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'accepts': 'application/json'
      },
      body: JSON.stringify({
        name: newToy.name,
        image: newToy.image,
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
        <ToyContainer toys={this.state.toys} increaseLikes={this.increaseLikes} deleteToy={this.deleteToy}/>
      </>
    );
  }

}

export default App;
