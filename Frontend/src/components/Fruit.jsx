import React from 'react';

function Fruit({ name, price, onFruitSelected }) {
  const handleFruitClick = () => {
    onFruitSelected(name, price);
  };

  return (
    <div className="flex flex-col items-center m-2" onClick={handleFruitClick}>
      <button className="bg-blue-500 text-white px-4 py-2 rounded">
        {name}
      </button>
      <p className="text-center">$ {price}</p>
    </div>
  );
}

export default Fruit;