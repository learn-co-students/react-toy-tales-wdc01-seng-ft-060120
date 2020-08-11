import React, { Component } from 'react';

class ToyForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: "",
      image: ""
    };
    this.sendForm = this.props.sendForm;
  }
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.sendForm(this.state);
    this.setState({name: "", image: ""});
  }

  render() {
    return (
      <div className="container">
        <form onSubmit={(e) => this.handleSubmit(e)} className="add-toy-form">
          <h3>Create a toy!</h3>
          <input onChange={this.handleChange} type="text" name="name" placeholder="Enter a toy's name..." className="input-text" value={this.state.name} />
          <br/>
          <input onChange={this.handleChange} type="text" name="image" placeholder="Enter a toy's image URL..." className="input-text" value={this.state.image} />
          <br/>
          <input type="submit" name="submit" value="Create New Toy" className="submit"/>
        </form>
      </div>
    );
  }

}

export default ToyForm;
