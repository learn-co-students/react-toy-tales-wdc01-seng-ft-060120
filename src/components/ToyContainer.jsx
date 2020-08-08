import React from 'react';
import ToyCard from './ToyCard'

const ToyContainer = (props) => {
  
  let { toys } = props

  const renderToys = () => {
    return toys.map(toy => <ToyCard toy={toy} key={toy.id}/>)
  }
  return(
    <div id="toy-collection">
      {renderToys()}
    </div>
  );
}

export default ToyContainer;
