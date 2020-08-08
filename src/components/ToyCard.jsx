import React, { Component } from 'react';

class ToyCard extends Component {

    state = {
      likes: this.props.toy.likes
    }



  url = `http://localhost:3000/toys/${this.props.toy.id}`

  handleLikes = () => {
    const toyObj = {
      likes: this.props.toy.likes + 1
    }
    const toyConfig = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(toyObj)
    }
    fetch(this.url, toyConfig)
    .then(resp => resp.json())
    .then(toy => {
      this.setState({
        likes: toy.likes
      })
    })
  }

  render() {
    const { name, image } = this.props.toy
    return (
      <div className="card">
        <h2>{ name }</h2>
        <img src={ image } alt={ name } className="toy-avatar" />
        <p>{ this.state.likes } Likes </p>
        <button className="like-btn" onClick={this.handleLikes}>Like {'<3'}</button>
        <button className="del-btn" onClick={this.handleDelete}>Donate to GoodWill</button>
      </div>
    );
  }

}

export default ToyCard;
