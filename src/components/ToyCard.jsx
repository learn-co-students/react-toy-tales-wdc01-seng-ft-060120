import React, { Component } from 'react';

class ToyCard extends Component {
  constructor(props){
    super(props);
    this.handleDelete = this.props.handleDelete;
    this.handleLike = this.props.handleLike;
  }

  render() {
    return (
      <div className="card">
        <h2>{this.props.toy.name}</h2>
        <img src={this.props.toy.image} alt={this.props.toy.name} className="toy-avatar" />
        <p>{this.props.toy.likes} Likes </p>
        <button onClick={() => this.handleLike(this.props.toy)} className="like-btn">Like {'<3'}</button>
        <button onClick={() => this.handleDelete(this.props.toy)} className="del-btn">Donate to GoodWill</button>
      </div>
    );
  }

}

export default ToyCard;
