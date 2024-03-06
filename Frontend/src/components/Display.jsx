import { useState } from "react";

function Display({
  selectedFruit,
  quantity,
  pricePerUnit,
  items,
  setItems,
  collected,
  isPaymentClicked,
}) {
  // State to toggle item buttons
  const [areItemsButtons, setAreItemsButtons] = useState(false);

  // Check if no fruit is selected and quantity is zero
  const isEmpty = !selectedFruit && quantity === 0;

  // Calculate grand total of all items
  const grandTotal = items.reduce(
    (total, item) => total + item.pricePerUnit * (item.quantity || 0),
    0
  );

  // Calculate change to be given
  const change = collected - grandTotal;

  // Handle click on item, prompts for new quantity
  const handleItemClick = (id) => {
    const newQuantity = parseInt(prompt("Enter new quantity:"), 10);
    if (!isNaN(newQuantity)) {
      setItems((prevItems) =>
        prevItems
          .map((item) =>
            item.id === id && item.name !== selectedFruit
              ? { ...item, quantity: newQuantity }
              : item
          )
          .filter((item) => item.quantity !== 0)
      );
    }
  };

  // Calculate total price for an item
  const calculateTotal = (pricePerUnit, quantity) =>
    (pricePerUnit * (quantity || 0)).toFixed(2);

  // Render a field with a given value and CSS class
  const renderField = (value, className) => (
    <div className={className}>{value}</div>
  );

  // Render a total field with a label and value
  const renderTotalField = (label, value) => (
    <div className="flex justify-end mb-2">
      {renderField(label, "w-3/4 text-right pr-5")}
      {renderField(value ? value.toFixed(2) : "0.00", "w-1/4 text-right pr-5")}
    </div>
  );

  // Component to render a row in the table
  const Row = ({ id, name, pricePerUnit, quantity, selectedFruit }) => (
    <div className="flex justify-between text-xl">
      {renderField(
        areItemsButtons && id !== selectedFruit.id ? (
          <button
            onClick={() => handleItemClick(id)}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            {name}
          </button>
        ) : (
          name
        ),
        "w-1/4 text-left"
      )}
      {renderField(quantity || 0, "w-1/4 text-center")}
      {renderField(pricePerUnit.toFixed(2), "w-1/4 text-center")}
      {renderField(calculateTotal(pricePerUnit, quantity), "w-1/4 text-right")}
    </div>
  );

  // Render the main component
  return (
    <div className="bg-gray-800 text-white p-4 rounded-lg h-full flex flex-col justify-between">
      <div className="">
        <div className="flex justify-between items-center mb-4 ">
          <h2 className="text-2xl font-bold">JON&apos;S FRUIT STALL</h2>
          <button
            onClick={() => setAreItemsButtons(!areItemsButtons)}
            className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded "
          >
            {areItemsButtons ? "Save" : "Change Qty"}
          </button>
        </div>
        <div className="flex justify-between text-xl font-bold mb-2 ">
          <div className="w-1/4 text-left">Item</div>
          <div className="w-1/4 text-center pr-10">Quantity</div>
          <div className="w-1/4 text-center pr-10">Price</div>
          <div className="w-1/4 text-right pr-5">Total</div>
        </div>
        <div className="pr-5 overflow-auto max-h-[600px]">
          {isEmpty ? (
            <Row name="" pricePerUnit={0} quantity={0} />
          ) : (
            items
              .filter((item) => item.name)
              .map((item) => (
                <Row key={item.id} {...item} selectedFruit={selectedFruit} />
              ))
          )}
          {!isPaymentClicked && selectedFruit && (
            <Row
              name={selectedFruit}
              pricePerUnit={pricePerUnit}
              quantity={quantity}
              selectedFruit={selectedFruit}
            />
          )}
        </div>
      </div>
      <div className="text-xl font-bold">
        {renderTotalField("Grand Total", grandTotal)}
        {renderTotalField("Collected", collected)}
        {renderTotalField("Change", change)}
      </div>
    </div>
  );
}

export default Display;
