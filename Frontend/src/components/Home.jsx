import React, { useState } from "react";
import FruitList from "./FruitList";
import Display from "./Display";
import NumberPad from "./NumberPad";

function Home() {
  // Initialize state variables
  const [selectedFruit, setSelectedFruit] = useState("Select item");
  const [quantity, setQuantity] = useState(0);
  const [pricePerUnit, setPricePerUnit] = useState(0);
  const [items, setItems] = useState([]);

  // Handler for when a fruit is selected
  const handleFruitSelected = (fruitName, fruitPrice) => {
    setSelectedFruit(fruitName);
    setPricePerUnit(fruitPrice);
  };

  // Handler for when a quantity is selected
  const handleQuantitySelected = (quantity) => {
    setQuantity(quantity);
  };

  // Handler for when the confirm button is clicked
  const handleConfirm = () => {
    // Check if a fruit is selected and the quantity is greater than 0
    if (selectedFruit !== "Select item" && quantity > 0) {
      // If conditions are met, create a new item
      const newItem = {
        id: Date.now(),
        name: selectedFruit,
        quantity,
        pricePerUnit,
      };

      // Add the new item to the items array
      setItems((prevItems) => [...prevItems, newItem]);

      // Reset the selected fruit, quantity, and price per unit
      setSelectedFruit("Select item");
      setQuantity(0);
      setPricePerUnit(0);
    }
    // If conditions are not met, do nothing
  };

  // Handler for when the clear button is clicked
  const handleClear = () => {
    // Reset the selected fruit, quantity, and price per unit
    setSelectedFruit("Select item");
    setQuantity(0);
    setPricePerUnit(0);
  };

  const handleCancelTransaction = () => {
    setItems([]); // Clear all items
    setSelectedFruit("Select item");
    setQuantity(0);
    setPricePerUnit(0);
  };

  return (
    <div className="flex">
      <div className="flex-1">
        {/* Fruit selection component */}
        <FruitList onFruitSelected={handleFruitSelected} />
      </div>
      <div className="flex-1">
        {/* Display component for showing selected items */}
        <Display
          selectedFruit={selectedFruit}
          quantity={quantity}
          pricePerUnit={pricePerUnit}
          items={items}
          setItems={setItems} // Pass setItems as a prop
        />
        {/* Number pad for selecting quantity */}
        <NumberPad
          onQuantitySelected={handleQuantitySelected}
          onConfirm={handleConfirm}
          onClear={handleClear}
          onCancelTransaction={handleCancelTransaction}
        />
      </div>
    </div>
  );
}
export default Home;
