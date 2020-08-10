import React, { Component } from 'react';

class ToyForm extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
          name: '',
          image: ''
    }
  }
  

  handleNameChange = (event) => {
    this.setState({
        name: event.target.value
    })
  }

  handleImgChange = (event) => {
    this.setState({
        image: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.props.addToy(this.state)
    // event.target.reset() does not work
  }

  render() {
    return (
      <div className="container">
        <form className="add-toy-form" onSubmit={this.handleSubmit}>
          <h3>Create a toy!</h3>
          <input type="text" name="name" placeholder="Enter a toy's name..." className="input-text" value={this.state.name} onChange={this.handleNameChange}/>
          <br/>
          <input type="text" name="image" placeholder="Enter a toy's image URL..." className="input-text" value={this.state.image} onChange={this.handleImgChange}/>
          <br/>
          <input type="submit" name="submit" value="Create New Toy" className="submit"/>
        </form>
      </div>
    );
  }

}

export default ToyForm;
