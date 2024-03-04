import React, { useState } from "react";

function Display({ selectedFruit, quantity, pricePerUnit, items, setItems }) {
  // Check if the selected fruit and quantity are empty
  const isEmpty = !selectedFruit && quantity === 0;
  const [areItemsButtons, setAreItemsButtons] = useState(false);
  // Calculate the grand total
  const grandTotal = items.reduce(
    (total, item) => total + item.pricePerUnit * (item.quantity || 0),
    0
  );

  const handleItemClick = (id) => {
    const newQuantity = parseInt(prompt("Enter new quantity:"), 10);
    if (!isNaN(newQuantity)) {
      setItems(
        (prevItems) =>
          prevItems
            .map((item) =>
              item.id === id ? { ...item, quantity: newQuantity } : item
            )
            .filter((item) => item.quantity !== 0) // Filter out items with quantity 0
      );
    }
  };

  // Define a reusable Row component to avoid repetition
  const Row = ({ id, name, pricePerUnit, quantity }) => (
    <div className="flex justify-between text-xl">
      <div className="w-1/4 text-left">
        {areItemsButtons && name !== selectedFruit ? (
          <button
            onClick={() => handleItemClick(id)}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            {name}
          </button>
        ) : (
          name
        )}
      </div>
      <div className="w-1/4 text-center">{quantity || 0}</div>
      <div className="w-1/4 text-center">{pricePerUnit}</div>
      <div className="w-1/4 text-right">{pricePerUnit * (quantity || 0)}</div>
    </div>
  );

  return (
    <div className="bg-gray-800 text-white p-4 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Point of Sale System</h2>
        <button
          onClick={() => setAreItemsButtons(!areItemsButtons)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          {areItemsButtons ? "Save" : "Change Qty"}
        </button>
      </div>
      <div className="flex justify-between text-xl font-bold mb-2">
        <div className="w-1/4 text-left">Item</div>
        <div className="w-1/4 text-center">Quantity</div>
        <div className="w-1/4 text-center">Price</div>
        <div className="w-1/4 text-right">Total</div>
      </div>
      {/* Render the rows for the items */}
      {isEmpty ? (
        <Row name="" pricePerUnit={0} quantity={0} />
      ) : (
        items
          .filter((item) => item.name)
          .map((item, index) => <Row key={index} {...item} />)
      )}
      {/* Render the row for the selected fruit */}
      {selectedFruit && (
        <Row
          name={selectedFruit}
          pricePerUnit={pricePerUnit}
          quantity={quantity}
        />
      )}
      <div className="flex justify-between text-xl font-bold">
        <div className="w-3/4 text-right">Grand Total</div>
        <div className="w-1/4 text-right">{grandTotal}</div>
      </div>
    </div>
  );
}

export default Display;
