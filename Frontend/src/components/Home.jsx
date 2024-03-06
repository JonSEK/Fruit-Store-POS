import { useState } from "react";
import FruitList from "./FruitList";
import Display from "./Display";
import NumberPad from "./NumberPad";
import axios from "axios";

function Home({ staffName }) {
  const [selectedFruit, setSelectedFruit] = useState("Select item");
  const [quantity, setQuantity] = useState(0);
  const [pricePerUnit, setPricePerUnit] = useState(0);
  const [selectedFruitId, setSelectedFruitId] = useState(null);
  const [items, setItems] = useState([]);
  const [collected, setCollected] = useState(0);
  const [isPaymentClicked, setIsPaymentClicked] = useState(false);

  const handleFruitSelected = (fruit) => {
    setSelectedFruit(fruit.name);
    setPricePerUnit(fruit.price);
    setSelectedFruitId(fruit._id);
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
        _id: selectedFruitId,
      };
      setItems((prevItems) => [...prevItems, newItem]);
      setSelectedFruit("Select item");
      setSelectedFruitId(null);
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
    setIsPaymentClicked(false);
    setCollected(0);
  };

  const handleCollectedChange = (newCollected) => {
    setCollected(newCollected);
  };

  const handleNextTransaction = async () => {
    const totalPrice = items.reduce(
      (total, item) => total + item.quantity * item.pricePerUnit,
      0
    );
    try {
      const response = await axios.post("http://localhost:3001/api/purchases", {
        items: items,
        totalPrice: totalPrice,
        purchaseDate: new Date(),
        staffName: staffName,
      });

      if (response.status === 201) {
        console.log("Purchase saved successfully");
      }
    } catch (error) {
      console.error("Error saving purchase:", error);
    }
    handleCancelTransaction();
  };

  return (
    <div className="flex flex-1">
      <div className="flex-1">
        <Display
          selectedFruit={selectedFruit}
          quantity={quantity}
          pricePerUnit={pricePerUnit}
          items={items}
          setItems={setItems}
          collected={collected}
          isPaymentClicked={isPaymentClicked}
          setIsPaymentClicked={setIsPaymentClicked}
        />
      </div>
      <div className="flex flex-1 flex-col justify-between">
        <FruitList onFruitSelected={handleFruitSelected} />
        <NumberPad
          onQuantitySelected={handleQuantitySelected}
          onConfirm={handleConfirm}
          onClear={handleClear}
          onCancelTransaction={handleCancelTransaction}
          setIsPaymentClicked={setIsPaymentClicked}
          isPaymentClicked={isPaymentClicked}
          onCollectedChange={handleCollectedChange}
          onNextTransaction={handleNextTransaction}
        />
      </div>
    </div>
  );
}
export default Home;
