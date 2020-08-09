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



  handleLikes = (id, likes) => {
    let url = `http://localhost:3000/toys/${id}`
    let toyArray = [...this.state.toys]
    const toyObj = {
      likes: likes + 1
    }
    const toyConfig = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(toyObj)
    }
    fetch(url, toyConfig)
    .then(resp => resp.json())
    .then(toy => {
      this.setState({
        toys: toyArray.map(oldToy => {
          if(oldToy.id === id){
            return toy
          }
          return oldToy
        } )
      })
    })
  }

  handleDelete = (id) => {
    let url = `http://localhost:3000/toys/${id}`
    let toyArray = [...this.state.toys]
    const toyConfig = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      }
    }
    fetch(url, toyConfig)
    .then(resp => resp.json())
    .then(toy => {
      let newArray = toyArray.filter(toy => toy.id !== id)
      this.setState({
        toys: newArray
      })
    })
  }

  createToy = (toy) => {
    const toyConfig = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(toy)
    }
    fetch('http://localhost:3000/toys', toyConfig)
    .then(resp => resp.json())
    .then(toy => {
      let toyArray = [...this.state.toys, toy]
      this.setState({
        toys: toyArray
      })
      this.handleClick()
    })

  }


  componentDidMount(){
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

  render(){
    return (
      <>
        <Header/>
        { this.state.display
            ?
          <ToyForm createToy={this.createToy}/>
            :
          null
        }
        <div className="buttonContainer">
          <button onClick={this.handleClick}> Add a Toy </button>
        </div>
        <ToyContainer toys={this.state.toys} handleLikes={this.handleLikes} handleDelete={this.handleDelete}/>
      </>
    );
  }

}

export default App;
