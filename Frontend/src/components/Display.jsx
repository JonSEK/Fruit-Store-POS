import React from "react";

// Define a reusable Row component to avoid repetition
const Row = ({ name, pricePerUnit, quantity }) => (
  <div className="flex justify-between text-xl">
    <div className="w-1/4 text-left">{name}</div>
    <div className="w-1/4 text-center">{pricePerUnit}</div>
    <div className="w-1/4 text-center">{quantity || 0}</div>
    <div className="w-1/4 text-right">{pricePerUnit * (quantity || 0)}</div>
  </div>
);

function Display({ selectedFruit, quantity, pricePerUnit, items }) {
  // Check if the selected fruit and quantity are empty
  const isEmpty = !selectedFruit && quantity === 0;

  // Calculate the grand total
  const grandTotal = items.reduce(
    (total, item) => total + item.pricePerUnit * (item.quantity || 0),
    0
  );

  return (
    <div className="bg-gray-800 text-white p-4 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Point of Sale System</h2>
      <div className="flex justify-between text-xl font-bold mb-2">
        <div className="w-1/4 text-left">Item</div>
        <div className="w-1/4 text-center">Price</div>
        <div className="w-1/4 text-center">Quantity</div>
        <div className="w-1/4 text-right">Total</div>
      </div>
      {/* Render the rows for the items */}
      {isEmpty
        ? <Row name="" pricePerUnit={0} quantity={0} />
        : items.filter((item) => item.name).map((item, index) => <Row key={index} {...item} />)}
      {/* Render the row for the selected fruit */}
      {selectedFruit && <Row name={selectedFruit} pricePerUnit={pricePerUnit} quantity={quantity} />}
      <div className="flex justify-between text-xl font-bold">
        <div className="w-3/4 text-right">Grand Total</div>
        <div className="w-1/4 text-right">{grandTotal}</div>
      </div>
    </div>
  );
}

export default Display;