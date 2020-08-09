import React from 'react';
import './App.css';

import Header from './components/Header'
import ToyForm from './components/ToyForm'
import ToyContainer from './components/ToyContainer'

// import data from './data'

const toyURL = 'http://localhost:3000/toys/'


class App extends React.Component{

  state = {
    display: false,
    toyList: [],
    newToy: {
      name: '',
      image: '',
      likes: 0
    }
  }

  updateNewToyName = event =>{
    this.setState({
      newToy: {
        ...this.state.newToy,
        name: event.target.value
      }
    })
  }

  updateNewToyImageUrl = event =>{
    this.setState({
      newToy: {
        ...this.state.newToy,
        image: event.target.value
      }
    })
  }

  handleNewToySubmit = event => {
    event.preventDefault()
    event.target.reset()
    this.handleClick()
    
    const postRequest = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accepts': 'application/json'
      },
      body: JSON.stringify(this.state.newToy)
    }

    fetch(toyURL, postRequest)
      .then( resp => resp.json() )
      .then( newToy => {
        this.setState({
          toyList: this.state.toyList.concat(newToy)
        })
      })
  }

  handleToyDelete = toy => {
    fetch(toyURL + toy.id, {method: 'DELETE'})
      .then( resp => resp.json() )
      .then( () => {
        const toyList = this.state.toyList.filter( t => t !== toy)
        this.setState({ toyList })
      } )
  }

  handleLikesButton = toy => {
    const patchRequest = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accepts': 'application/json',
      },
      body: JSON.stringify({
        likes: toy.likes + 1
      })
    }

    fetch(toyURL + toy.id, patchRequest)
      .then( resp => resp.json() )
      .then( patchedToy => {
        const toyList = this.state.toyList.map( t  => t === toy ? patchedToy : t )
        this.setState({ toyList })
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
          <ToyForm
            updateNewToyName={this.updateNewToyName}
            updateNewToyImageUrl={this.updateNewToyImageUrl}
            handleNewToySubmit={this.handleNewToySubmit}
          />
            :
          null
        }
        <div className="buttonContainer">
          <button onClick={this.handleClick}> Add a Toy </button>
        </div>
        <ToyContainer
          toyList={this.state.toyList}
          handleToyDelete={this.handleToyDelete}
          handleLikesButton={this.handleLikesButton}
        />
      </>
    );
  }

  componentDidMount() {
    fetch(toyURL)
      .then( resp => resp.json() )
      .then( toyList => this.setState({ toyList }))
  }

}

export default App;
