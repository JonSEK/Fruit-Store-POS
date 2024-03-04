import React, { useState } from "react";
import FruitList from "./FruitList";
import Display from "./Display";
import NumberPad from "./NumberPad";

function Home() {
  const [selectedFruit, setSelectedFruit] = useState("Select item");
  const [quantity, setQuantity] = useState(0);
  const [pricePerUnit, setPricePerUnit] = useState(0);
  const [items, setItems] = useState([]);
  const [collected, setCollected] = useState(0);
  const [change, setChange] = useState(0);
  const [isPaymentClicked, setIsPaymentClicked] = useState(false);

  const handleFruitSelected = (fruitName, fruitPrice) => {
    setSelectedFruit(fruitName);
    setPricePerUnit(fruitPrice);
  };

  const handleQuantitySelected = (quantity) => {
    setQuantity(quantity);
  };

  const handleConfirm = () => {
    if (selectedFruit !== "Select item" && quantity > 0) {
      const newItem = {
        id: Date.now(),
        name: selectedFruit,
        quantity,
        pricePerUnit,
      };
      setItems((prevItems) => [...prevItems, newItem]);
      setSelectedFruit("Select item");
      setQuantity(0);
      setPricePerUnit(0);
    }
  };

  const handleClear = () => {
    setSelectedFruit("Select item");
    setQuantity(0);
    setPricePerUnit(0);
  };

  const handleCancelTransaction = () => {
    setItems([]);
    setSelectedFruit("Select item");
    setQuantity(0);
    setPricePerUnit(0);
  };

  return (
    <div className="flex">
      <div className="flex-1">
        <FruitList onFruitSelected={handleFruitSelected} />
      </div>
      <div className="flex-1">
        <Display
          selectedFruit={selectedFruit}
          quantity={quantity}
          pricePerUnit={pricePerUnit}
          items={items}
          setItems={setItems}
          collected={collected}
          change={change}
          isPaymentClicked={isPaymentClicked}
          setIsPaymentClicked={setIsPaymentClicked}
        />
        <NumberPad
          onQuantitySelected={handleQuantitySelected}
          onConfirm={handleConfirm}
          onClear={handleClear}
          onCancelTransaction={handleCancelTransaction}
          setIsPaymentClicked={setIsPaymentClicked}
          isPaymentClicked={isPaymentClicked}
        />
      </div>
    </div>
  );
}
export default Home;
