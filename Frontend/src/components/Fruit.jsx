function Fruit({ fruit, onFruitSelected }) {
  const handleFruitClick = () => {
    onFruitSelected(fruit);
  };

  return (
    <div className="flex flex-col items-center m-1" onClick={handleFruitClick}>
      <button className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded w-full text-center">
        {fruit.name}
      </button>
      <p className="text-center">${fruit.price.toFixed(2)}</p>
    </div>
  );
}

export default Fruit;
