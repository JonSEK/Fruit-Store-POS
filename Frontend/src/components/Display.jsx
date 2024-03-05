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
  const isEmpty = !selectedFruit && quantity === 0;
  const [areItemsButtons, setAreItemsButtons] = useState(false);
  const grandTotal = items.reduce(
    (total, item) => total + item.pricePerUnit * (item.quantity || 0),
    0
  );

  const change = collected - grandTotal;

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

  const Row = ({ id, name, pricePerUnit, quantity, selectedFruit }) => (
    <div className="flex justify-between text-xl">
      <div className="w-1/4 text-left">
        {areItemsButtons && id !== selectedFruit.id ? (
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
      <div className="w-1/4 text-center">{pricePerUnit.toFixed(2)}</div>
      <div className="w-1/4 text-right">
        {(pricePerUnit * (quantity || 0)).toFixed(2)}
      </div>
    </div>
  );

  return (
    <div className="bg-gray-800 text-white p-4 rounded-lg flex-grow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">JON&apos;S FRUIT STALL</h2>
        <button
          onClick={() => setAreItemsButtons(!areItemsButtons)}
          className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
        >
          {areItemsButtons ? "Save" : "Change Qty"}
        </button>
      </div>
      <div className="flex justify-between text-xl font-bold mb-2">
        <div className="w-1/4 text-left">Item</div>
        <div className="w-1/4 text-center pr-10">Quantity</div>
        <div className="w-1/4 text-center pr-10">Price</div>
        <div className="w-1/4 text-right pr-5">Total</div>
      </div>
      <div className="max-h-40 overflow-auto pr-5">
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

      <div className="text-xl font-bold">
        <div className="flex justify-end mb-2 mt-4">
          <div className="w-3/4 text-right pr-5 ">Grand Total</div>
          <div className="w-1/4 text-right pr-5 ">{grandTotal.toFixed(2)}</div>
        </div>
        <div className="flex justify-end mb-2 ">
          <div className="w-3/4 text-right pr-5">Collected</div>
          <div className="w-1/4 text-right pr-5">
            {collected ? collected.toFixed(2) : "0.00"}
          </div>
        </div>
        <div className="flex justify-end mb-2">
          <div className="w-3/4 text-right pr-5">Change</div>
          <div className="w-1/4 text-right pr-5">
            {change ? change.toFixed(2) : "0.00"}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Display;
