function Fruit({ fruit, onFruitSelected }) {
  // Calls 'onFruitSelected' when fruit is clicked
  const handleFruitClick = () => {
    onFruitSelected(fruit);
  };

  // Returns a div with a button (fruit name) and a paragraph (fruit price)
  return (
    <div className="flex flex-col items-center m-1 " onClick={handleFruitClick}>
      <button className="bg-yellow-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-full text-xl text-center shadow-2xl">
        {fruit.name}
      </button>
      <p className="text-center text-white-800">${fruit.price.toFixed(2)}</p>
    </div>
  );
}

export default Fruit;
