import { useState, useEffect } from "react";

function NumberPad({
  onQuantitySelected,
  onClear,
  onConfirm,
  onCancelTransaction,
  onNextTransaction,
  isPaymentClicked,
  setIsPaymentClicked,
  onCollectedChange,
}) {
  const [input, setInput] = useState("");

  useEffect(() => {
    if (input) {
      onQuantitySelected(parseFloat(input));
    }
  }, [input, onQuantitySelected]);

  const handleButtonClick = ({ target: { value } }) => {
    setInput((prevInput) => {
      const newInput = prevInput + value;
      return newInput;
    });
  };

  useEffect(() => {
    if (isPaymentClicked) {
      onCollectedChange(parseFloat(input));
    }
  }, [input, isPaymentClicked, onCollectedChange]);

  const handleBackspaceClick = () =>
    setInput((prevInput) => prevInput.slice(0, -1) || "0");

  const handleClearClick = () => {
    onClear();
    setInput("");
  };

  const handleConfirmClick = () => {
    onConfirm();
    setInput("");
  };

  const handleCancelTransactionClick = () => {
    onCancelTransaction();
    setInput("");
  };

  const handlePaymentClick = () => {
    setInput("");
    setIsPaymentClicked(!isPaymentClicked);
  };

  const handleNextTransactionClick = async () => {
    onNextTransaction();
    setInput("");
  };

  return (
    <div className="bg-slate-300 flex flex-col items-start rounded-lg ">
      <div className="grid grid-cols-3 gap-2 p-4 w-full">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0, "."].map((number) => (
          <button
            key={number}
            value={number}
            onClick={handleButtonClick}
            className="bg-slate-800 hover:bg-blue-700 text-white h-12 rounded text-xl"
          >
            {number}
          </button>
        ))}
        <button
          onClick={handleBackspaceClick}
          className="bg-yellow-500 hover:bg-yellow-700 text-white h-12 rounded text-xl"
        >
          Backspace
        </button>
        <button
          onClick={handleClearClick}
          className="bg-red-500 hover:bg-red-700 text-white h-12 rounded text-xl"
        >
          Clear
        </button>
        <button
          onClick={handleConfirmClick}
          disabled={isPaymentClicked}
          className={`bg-green-500 hover:bg-green-700 text-white h-12 rounded text-xl ${
            isPaymentClicked ? "bg-gray-500" : ""
          }`}
        >
          Confirm
        </button>
        <button
          onClick={handlePaymentClick}
          className={`bg-green-500 hover:bg-green-700 text-white h-12 rounded text-xl ${
            isPaymentClicked ? "clicked-class" : ""
          }`}
        >
          Payment
        </button>
      </div>
      <div className="flex gap-2 p-4 justify-start w-full">
        <button
          onClick={handleCancelTransactionClick}
          className="bg-red-300 hover:bg-red-500 text-red-800 h-12 rounded flex-grow text-xl"
        >
          Cancel Transaction
        </button>

        <button
          onClick={handleNextTransactionClick}
          className="bg-blue-500 hover:bg-blue-700 text-white h-12 rounded flex-grow text-xl"
        >
          Next Transaction
        </button>
      </div>
    </div>
  );
}

export default NumberPad;
