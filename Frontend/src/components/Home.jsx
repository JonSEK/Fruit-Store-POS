import { useState } from "react";
import FruitList from "./FruitList";
import Display from "./Display";
import NumberPad from "./NumberPad";
import axios from "axios";

function Home({ staffName }) {
  // State variables for selected fruit, quantity, price per unit, selected fruit ID, items in the cart, collected amount, and payment status
  const [selectedFruit, setSelectedFruit] = useState("Select item");
  const [quantity, setQuantity] = useState(0);
  const [pricePerUnit, setPricePerUnit] = useState(0);
  const [selectedFruitId, setSelectedFruitId] = useState(null);
  const [items, setItems] = useState([]);
  const [collected, setCollected] = useState(0);
  const [isPaymentClicked, setIsPaymentClicked] = useState(false);

  // Handler for when a fruit is selected
  const handleFruitSelected = (fruit) => {
    setSelectedFruit(fruit.name);
    setPricePerUnit(fruit.price);
    setSelectedFruitId(fruit._id);
  };

  // Handler for when a quantity is selected
  const handleQuantitySelected = (quantity) => {
    setQuantity(quantity);
  };

  // Handler for when the confirm button is clicked
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

  // Handler for when the clear button is clicked
  const handleClear = () => {
    setSelectedFruit("Select item");
    setQuantity(0);
    setPricePerUnit(0);
  };

  // Handler for when the cancel transaction button is clicked
  const handleCancelTransaction = () => {
    setItems([]);
    setSelectedFruit("Select item");
    setQuantity(0);
    setPricePerUnit(0);
    setIsPaymentClicked(false);
    setCollected(0);
  };

  // Handler for when the collected amount changes
  const handleCollectedChange = (newCollected) => {
    setCollected(newCollected);
  };

  // Handler for when the next transaction button is clicked
  const handleNextTransaction = async () => {
    const totalPrice = items.reduce(
      (total, item) => total + item.quantity * item.pricePerUnit,
      0
    );
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_API_URL}/api/purchases`,
        {
          items: items,
          totalPrice: totalPrice,
          purchaseDate: new Date(),
          staffName: staffName,
        }
      );

      if (response.status === 201) {
        console.log("Purchase saved successfully");
      }
    } catch (error) {
      console.error("Error saving purchase:", error);
    }
    handleCancelTransaction();
  };

  // Render Display, FruitList, and NumberPad components
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
