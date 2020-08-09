import React, { Component } from 'react';

class ToyForm extends Component {

  addNewToy = (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const image = event.target.image.value;

    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        image: image,
        likes: 0
      })
    }

    fetch('http://localhost:3000/toys', options)
    .then(response => response.json())
    .then(toyData => this.props.updateToyStateAdd(toyData))
    
    event.target.reset();
  }

  render() {
    return (
      <div className="container">
        <form className="add-toy-form" onSubmit={(event) => this.addNewToy(event)}>
          <h3>Create a toy!</h3>
          <input type="text" name="name" placeholder="Enter a toy's name..." className="input-text"/>
          <br/>
          <input type="text" name="image" placeholder="Enter a toy's image URL..." className="input-text"/>
          <br/>
          <input type="submit" name="submit" value="Create New Toy" className="submit"/>
        </form>
      </div>
    );
  }

}

export default ToyForm;
