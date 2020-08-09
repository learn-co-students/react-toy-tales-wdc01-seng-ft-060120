import React from 'react';

const ToyCard = ({ toy, handleToyDelete, handleLikesButton }) =>  {
  return (
    <div className="card">
      <h2>{toy.name}</h2>
      <img src={toy.image} alt={toy.name} className="toy-avatar" />
      <p>{toy.likes} Likes </p>
      <button
        onClick={ e => handleLikesButton( toy )}
        className="like-btn"
      >Like {'<3'}</button>
      <button
        onClick={ e => handleToyDelete( toy ) }
        className="del-btn"
      >Donate to GoodWill</button>
    </div>
  )
}

export default ToyCard;