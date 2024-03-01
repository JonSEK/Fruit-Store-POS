function Fruit({ name, price }) {
  return (
    <div className="flex flex-col items-center m-2">
      <button className="bg-blue-500 text-white px-4 py-2 rounded">
        {name}
      </button>
      <p className="text-center">$ {price}</p>
    </div>
  );
}

export default Fruit;
