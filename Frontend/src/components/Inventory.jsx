import { useState, useEffect } from "react";
import axios from "axios";
import AddFruitForm from "./AddFruitForm";

function Inventory() {
  // State variables for inventory and edit mode
  const [inventory, setInventory] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);

  // Fetch inventory from API when component mounts
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_APP_API_URL}/api/fruits`)
      .then((res) => setInventory(res.data))
      .catch((err) => console.error(err));
  }, []);

  // Handler for deleting a fruit
  const handleDelete = (id) => {
    axios
      .delete(`${import.meta.env.VITE_APP_API_URL}/api/fruits/${id}`)
      .then(() =>
        setInventory((prev) => prev.filter((fruit) => fruit._id !== id))
      )
      .catch((err) => console.error(err));
  };

  // Handler for updating a fruit
  const handleUpdate = (id, updatedFruit) => {
    axios
      .put(`${import.meta.env.VITE_APP_API_URL}/api/fruits/${id}`, updatedFruit)
      .then((res) =>
        setInventory((prev) =>
          prev.map((fruit) => (fruit._id === id ? res.data : fruit))
        )
      )
      .catch((err) => console.error(err));
  };

  // Handler for saving all changes
  const handleSaveAll = () => {
    inventory.forEach((fruit) => handleUpdate(fruit._id, fruit));
    setIsEditMode(false);
  };

  // Render AddFruitForm and inventory table
  return (
    <div className="w-full max-w-md mx-auto mt-6">
      <AddFruitForm setInventory={setInventory} />
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="flex justify-between items-center">
          <h2 className="mb-6 text-2xl font-bold">Current Inventory</h2>
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
                        handleUpdate(fruit._id, {
                          ...fruit,
                          name: e.target.value,
                        })
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
                        handleUpdate(fruit._id, {
                          ...fruit,
                          price: e.target.value,
                        })
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
