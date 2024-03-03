import React from "react";

// The Display component is responsible for displaying the selected items and their details.
function Display({ selectedFruit, quantity, pricePerUnit, items }) {
  // Check if no fruit is selected and quantity is 0
  const isEmpty = !selectedFruit && quantity === 0;

  // Calculate the grand total by multiplying the price per unit and quantity for each item
  const grandTotal = items.reduce(
    (total, item) => total + item.pricePerUnit * (item.quantity || 0),
    0
  );

  // Function to render a row for an item
  const renderRow = (item, key) => (
    <div key={key} className="flex justify-between text-xl">
      <div>{item.name}</div>
      <div>{item.pricePerUnit}</div>
      <div>{item.quantity || 0}</div>
      <div>{item.pricePerUnit * (item.quantity || 0)}</div>
    </div>
  );

  return (
    <div className="bg-gray-800 text-white p-4 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Point of Sale System</h2>
      <div className="flex justify-between text-xl font-bold mb-2">
        <div>Item</div>
        <div>Price</div>
        <div>Quantity</div>
        <div>Total</div>
      </div>
      {isEmpty
        ? renderRow({ name: "", pricePerUnit: 0, quantity: 0 }, 0)
        : items.filter((item) => item.name).map(renderRow)}
      {selectedFruit &&
        renderRow({ name: selectedFruit, pricePerUnit, quantity }, items.length)}
      <div className="flex justify-between text-xl font-bold">
        <div>Grand Total</div>
        <div>{grandTotal}</div>
      </div>
    </div>
  );
}

export default Display;