import React from 'react'

const ToyForm = props => {
  return (
    <div className="container">
      <form className="add-toy-form" onSubmit={ event => props.handleNewToySubmit( event ) }>
        <h3>Create a toy!</h3>
        <input
          onChange={ event => props.updateNewToyName( event ) }
          type="text"
          name="name"
          placeholder="Enter a toy's name..."
          className="input-text"/>
        <br/>
        <input
          onChange={ event => props.updateNewToyImageUrl( event ) }
          type="text" name="image"
          placeholder="Enter a toy's image URL..."
          className="input-text"/>
        <br/>
        <input
          type="submit"
          name="submit"
          value="Create New Toy"
          className="submit"/>
      </form>
    </div>
  )
}

export default ToyForm