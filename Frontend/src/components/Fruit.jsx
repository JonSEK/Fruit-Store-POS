import React from 'react';

function Fruit({ fruit, onFruitSelected }) {
  const handleFruitClick = () => {
    onFruitSelected(fruit); // Pass the entire fruit object
  };

  return (
    <div className="flex flex-col items-center m-2" onClick={handleFruitClick}>
      <button className="bg-blue-500 text-white px-4 py-2 rounded">
        {fruit.name}
      </button>
      <p className="text-center">$ {fruit.price}</p>
    </div>
  );
}

export default Fruit;