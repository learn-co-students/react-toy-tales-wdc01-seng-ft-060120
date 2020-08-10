import React from 'react';
import ToyCard from './ToyCard'

const ToyContainer = (props) => {
  return(
    <div id="toy-collection">
      {mapToys(props)}
    </div>
  );
}

const mapToys = (props) =>
{
  return props.toys.map(toy => <ToyCard toy={toy} key={toy.id} 
                                        handleLike={props.handleLike}
                                        handleDelete={props.handleDelete}  
                                        />)
}

export default ToyContainer;
