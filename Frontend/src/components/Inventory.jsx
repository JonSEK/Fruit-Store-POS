import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Inventory() {
  const [inventory, setInventory] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
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

  const handleSubmit = (event) => {
    event.preventDefault();

    const fruit = {
      name,
      price: Number(price), // Convert price to number
    };

    axios
      .post("http://localhost:3001/api/fruits", fruit)
      .then((res) => {
        console.log(res.data);
        // Update local inventory state
        setInventory((prevInventory) => [...prevInventory, fruit]);
      })
      .catch((err) => console.error(err));

    setName("");
    setPrice("");
  };

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
    <div>
      <h2>Add a new fruit</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <label>
          Price:
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </label>
        <button type="submit">Add Fruit</button>
      </form>
      <h2>Current Inventory</h2>
      <button
        onClick={isEditMode ? handleSaveAll : () => setIsEditMode(true)}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        {isEditMode ? "Save All" : "Edit All"}
      </button>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Actions</th>
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
      <div>
        <Link to="/">
          {" "}
          {/* Add this line */}
          <button>Go Back</button>
        </Link>
        {/* ... rest of your component */}
      </div>
    </div>
  );
}

export default Inventory;
