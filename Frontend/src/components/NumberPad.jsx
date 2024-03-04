import React, { useState, useEffect } from "react";

function NumberPad({
  onQuantitySelected,
  onClear,
  onConfirm,
  onCancelTransaction,
  onPayment,
  onNextTransaction,
}) {
  const [input, setInput] = useState("");

  useEffect(() => {
    if (input) {
      onQuantitySelected(parseFloat(input));
    }
  }, [input, onQuantitySelected]);

  const handleButtonClick = ({ target: { value } }) => {
    setInput((prevInput) => prevInput + value);
  };

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
    onPayment();
    setInput("");
  };

  const handleNextTransactionClick = () => {
    onNextTransaction();
    setInput("");
  };

  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0, "."].map((number) => (
        <button
          key={number}
          value={number}
          onClick={handleButtonClick}
          className="bg-blue-500 text-white w-full h-12 rounded"
        >
          {number}
        </button>
      ))}
      <button
        onClick={handleBackspaceClick}
        className="bg-yellow-500 text-white w-full h-12 rounded"
      >
        Backspace
      </button>
      <button
        onClick={handleClearClick}
        className="bg-red-500 text-white w-full h-12 rounded"
      >
        Clear
      </button>
      <button
        onClick={handleConfirmClick}
        className="bg-green-500 text-white w-full h-12 rounded col-span-2"
      >
        Confirm
      </button>
      <button
        onClick={handleCancelTransactionClick}
        className="bg-red-500 text-white w-full h-12 rounded"
      >
        Cancel Transaction
      </button>
      <button
        onClick={handlePaymentClick}
        className="bg-green-500 text-white w-full h-12 rounded"
      >
        Payment
      </button>
      <button
        onClick={handleNextTransactionClick}
        className="bg-blue-500 text-white w-full h-12 rounded"
      >
        Next Transaction
      </button>
    </div>
  );
}

export default NumberPad;
