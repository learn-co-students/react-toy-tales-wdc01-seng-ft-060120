import React from 'react';
import ToyCard from './ToyCard'

const ToyContainer = (props) => {
  
  let { toys } = props

  const renderToys = () => {
    return toys.map((toy, index) => <ToyCard toy={toy} key={index} handleLikes={props.handleLikes} handleDelete ={props.handleDelete}/>)
  }
  return(
    <div id="toy-collection">
      {renderToys()}
    </div>
  );
}

export default ToyContainer;
