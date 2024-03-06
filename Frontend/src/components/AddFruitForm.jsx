import { useState } from "react";
import axios from "axios";

// Custom hook for form inputs
// This hook manages the state of an input field
function useFormInput(initialValue) {
  // Initialize state with the initial value
  const [value, setValue] = useState(initialValue);

  // Handle changes to the input field
  function handleChange(e) {
    // Update state with the new value
    setValue(e.target.value);
  }

  // Return the current value and the change handler
  return {
    value,
    onChange: handleChange,
  };
}

// Component for adding a new fruit
function AddFruitForm({ setInventory }) {
  // Use the custom hook for the name and price inputs
  const name = useFormInput("");
  const price = useFormInput("");

  // Handle form submission
  const handleSubmit = (event) => {
    // Prevent the default form submission behavior
    event.preventDefault();

    // Create a new fruit object
    const fruit = {
      name: name.value,
      price: Number(price.value),
    };

    // Send a POST request to the server
    axios
      .post("http://localhost:3001/api/fruits", fruit)
      .then((res) => {
        // Update the inventory with the new fruit
        setInventory((prevInventory) => [...prevInventory, res.data]);
        // Reset the form fields
        name.onChange({ target: { value: "" } });
        price.onChange({ target: { value: "" } });
      })
      .catch((err) => {
        // Log any errors to the console
        console.error(err);
      });
  };

  // Render the form
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
            {...name}
            required
          />
        </div>
        <div>
          <label className="block font-bold mb-2" htmlFor="price">
            Price
          </label>
          <input
            className="shadow appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="price"
            type="number"
            {...price}
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

// Export the component
export default AddFruitForm;
