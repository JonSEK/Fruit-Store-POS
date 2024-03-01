import { useState, useEffect } from "react";
import axios from "axios";
import AddFruitForm from "./AddFruitForm";

function Inventory() {
  const [inventory, setInventory] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);

  // Fetch inventory from server when component mounts
  useEffect(() => {
    axios
      .get("http://localhost:3001/api/fruits")
      .then((res) => {
        console.log(res.data);
        setInventory(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleDelete = (_id) => {
    axios
      .delete(`http://localhost:3001/api/fruits/${_id}`)
      .then((res) => {
        console.log(res.data);
        // Update local inventory state
        setInventory((prevInventory) =>
          prevInventory.filter((item) => item._id !== _id)
        );
      })
      .catch((err) => console.error(err));
  };

  const handleNameChange = (newName, _id) => {
    setInventory((prevInventory) =>
      prevInventory.map((fruit) =>
        fruit._id === _id ? { ...fruit, name: newName } : fruit
      )
    );
  };

  const handlePriceChange = (newPrice, _id) => {
    setInventory((prevInventory) =>
      prevInventory.map((fruit) =>
        fruit._id === _id ? { ...fruit, price: newPrice } : fruit
      )
    );
  };

  const handleSaveAll = () => {
    inventory.forEach((fruit) => {
      const updatedFruit = {
        name: fruit.name,
        price: Number(fruit.price),
      };

      axios
        .put(`http://localhost:3001/api/fruits/${fruit._id}`, updatedFruit)
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => console.error(err));
    });

    setIsEditMode(false);
  };

  return (
    <div className="w-full max-w-md mx-auto mt-6">
      <AddFruitForm setInventory={setInventory} />
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="flex justify-between items-center">
          <h2 className="mb-6 text-2xl font-bold">
            Current Inventory
          </h2>
          <button
            onClick={isEditMode ? handleSaveAll : () => setIsEditMode(true)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
          >
            {isEditMode ? "Save" : "Edit"}
          </button>
        </div>
        <table className="w-full mt-4 text-center">
          <thead>
            <tr>
              <th className="w-1/3">Name</th>
              <th className="w-1/3">Price</th>
              <th className="w-1/3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {inventory.map((fruit) => (
              <tr key={fruit._id}>
                <td>
                  {isEditMode ? (
                    <input
                      type="text"
                      value={fruit.name}
                      onChange={(e) =>
                        handleNameChange(e.target.value, fruit._id)
                      }
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  ) : (
                    fruit.name
                  )}
                </td>
                <td>
                  {isEditMode ? (
                    <input
                      type="number"
                      value={fruit.price}
                      onChange={(e) =>
                        handlePriceChange(e.target.value, fruit._id)
                      }
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  ) : (
                    fruit.price
                  )}
                </td>
                <td>
                  <button
                    onClick={() => handleDelete(fruit._id)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Inventory;