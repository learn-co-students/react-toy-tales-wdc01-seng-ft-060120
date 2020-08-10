import React from 'react';
import ToyCard from './ToyCard'

const ToyContainer = (props) => {
  return(
    <div id="toy-collection">
      {props.toyData.map(toy => <ToyCard toy={toy} />)}
    </div>
  );
}

export default ToyContainer;
