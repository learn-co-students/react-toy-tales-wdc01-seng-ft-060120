import React from 'react';
import ToyCard from './ToyCard'

const ToyContainer = (props) => {

  const generateToys = () => {
    return props.toys.map(toy => 
      <ToyCard toy={toy} increaseLikes={props.increaseLikes} deleteToy={props.deleteToy}/>
    )
  }

  return(
    <div id="toy-collection">
      {generateToys()}
    </div>
  );
}

export default ToyContainer;
