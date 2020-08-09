import React, { Component } from 'react';

class ToyCard extends Component {

  constructor(props) {
    super(props)
    this.state = {
      likes: this.props.toy.likes
    }
  }

  addOneLike = () => {
    const options = {
      method: 'PATCH',
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        likes: parseInt(this.state.likes, 10) + 1
      })
    }

    fetch(`http://localhost:3000/toys/${this.props.toy.id}`, options)
    .then(response => response.json())
    .then(toyData => this.setState({likes: toyData.likes}))
    .catch(error => alert(error))
  }

  deleteToy = () => {
    const options = {
      method: 'DELETE',
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json'
      }
    }

    fetch(`http://localhost:3000/toys/${this.props.toy.id}`, options)
    .then(response => response.json())
    .then(toyData => this.setState({likes: toyData.likes}))
    .catch(error => alert(error))
  }

  render() {
    return (
      <div className="card">
        <h2>{this.props.toy.name}</h2>
        <img src={this.props.toy.image} alt={this.props.toy.name} className="toy-avatar" />
        <p>{this.state.likes} Likes </p>
        <button className="like-btn" onClick={() => this.addOneLike()}>Like {'<3'}</button>
        <button className="del-btn" onClick={() => this.deleteToy()}>Donate to GoodWill</button>
      </div>
    );
  }

}

export default ToyCard;
