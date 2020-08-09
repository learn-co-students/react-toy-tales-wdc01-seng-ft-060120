import React, { Component } from 'react';

class ToyForm extends Component {
  state = {
    name: "",
    image: ""
  }
  handleNameChange = (name) => {
    this.setState({
      name
    })
  }

  handleImgChange = (image) => {
    this.setState({
      image
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    let toy = {
      name: this.state.name,
      image: this.state.image,
      likes: 0
    }
    this.props.createToy(toy)
  }

  render() {
    return (
      <div className="container">
        <form className="add-toy-form" onSubmit={(e) => this.handleSubmit(e)}>
          <h3>Create a toy!</h3>
          <input type="text" name="name" placeholder="Enter a toy's name..." className="input-text" value={this.state.name} onChange={(e) => this.handleNameChange(e.target.value)}/>
          <br/>
          <input type="text" name="image" placeholder="Enter a toy's image URL..." className="input-text" value={this.state.image} onChange={(e) => this.handleImgChange(e.target.value)}/>
          <br/>
          <input type="submit" name="submit" value="Create New Toy" className="submit"/>
        </form>
      </div>
    );
  }

}

export default ToyForm;
