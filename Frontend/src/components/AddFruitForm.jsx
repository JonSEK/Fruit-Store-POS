import { useState } from "react";
import axios from "axios";

function AddFruitForm({ setInventory }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    // Create fruit object
    const fruit = {
      name,
      price: Number(price), // Convert price to number
    };

    // Send POST request to server
    axios
      .post("http://localhost:3001/api/fruits", fruit)
      .then((res) => {
        // Update local inventory state
        setInventory((prevInventory) => [...prevInventory, res.data]);

        // Clear form fields
        setName("");
        setPrice("");
      })
      .catch((err) => console.error(err));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md mx-auto mt-6 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col items-center space-y-4"
    >
      <h2 className="mb-2 text-2xl font-bold">Add a new fruit</h2>
      <div className="w-full flex items-end justify-between space-x-4">
        <div>
          <label className="block font-bold mb-2" htmlFor="name">
            Name
          </label>
          <input
            className="shadow appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label
            className="block font-bold mb-2"
            htmlFor="price"
          >
            Price
          </label>
          <input
            className="shadow appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="price"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline h-10"
          type="submit"
        >
          Add
        </button>
      </div>
    </form>
  );
}

export default AddFruitForm;
