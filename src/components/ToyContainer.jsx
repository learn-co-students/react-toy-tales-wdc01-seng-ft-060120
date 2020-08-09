import React from 'react';
import ToyCard from './ToyCard'

const ToyContainer = props => {
  return(
    <div id="toy-collection">
      {props.toyList.map( ( toy, idx )=>
        <ToyCard
          key={idx}
          toy={toy}
          handleToyDelete={props.handleToyDelete}
          handleLikesButton={props.handleLikesButton}
        /> 
      )}
    </div>
  );
}

export default ToyContainer