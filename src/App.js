import React from 'react';
import './App.css';

import Header from './components/Header'
import ToyForm from './components/ToyForm'
import ToyContainer from './components/ToyContainer'

import data from './data'

const URL = "http://localhost:3000/toys/" 

class App extends React.Component{

  state = {
    display: false,
    toys: []
  }

  handleDonate = (id) =>
  {
    fetch(URL + id, {method: "DELETE"})
    .then(() => this.removeFromState(id))
  }

  removeFromState = (id) =>
  {
    const toys = [...this.state.toys].filter(toy => toy.id != id)
    this.setState({toys})
  }

  handleSubmit = (toy) =>
  {
    fetch(URL,this.newToyFetchConfig(toy))
    .then(r => r.json())
    .then(this.pushToyState)
  }

  pushToyState = (toy) =>
  {
    this.setState({toys: [toy,...this.state.toys]})
  }

  handleClick = () => {
    let newBoolean = !this.state.display
    this.setState({
      display: newBoolean
    })
  }

  //patch given toys likes + 1 then update state
  handleLike = (toy) =>
  {
    fetch(URL + toy.id,this.incrementLikeFetchConfig(toy))
    .then(r => r.json())
    .then(toy => this.updateToy(toy))
  }

  updateToy = (nextToy) =>
  {
    const newToys = this.state.toys.map(toy => {
      return (nextToy.id === toy.id) ? nextToy : toy
    })
    this.setState({toys: newToys})
  }
  
  newToyFetchConfig = (data) =>
  {
    data.likes = 0;
    return this.generateConfigObject(data,"POST")
  }

  incrementLikeFetchConfig = (data) =>
  {
    const likes = data.likes + 1
    return this.generateConfigObject({likes},"PATCH")
  }

  generateConfigObject = (data,method) =>
  {
    return {
      method,
      headers:
      {
        "Content-Type": "application/json",
        "accept":       "application/json"
      },
      body: JSON.stringify(data)
    }
  }

  render(){
    return (
      <>
        <Header/>
        { this.state.display
            ?
          <ToyForm onSubmit={this.handleSubmit}/>
            :
          null
        }
        <div className="buttonContainer">
          <button onClick={this.handleClick}> Add a Toy </button>
        </div>
        <ToyContainer toys={this.state.toys}
                      handleLike={this.handleLike}
                      handleDelete={this.handleDonate}
        />
      </>
    );
  }

  componentDidMount()
  {
    fetch(URL)
    .then(r => r.json())
    .then(toys => this.setState({toys}))
  }

}

export default App;
