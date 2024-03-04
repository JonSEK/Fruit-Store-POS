import React, { useState, useEffect } from "react";

// The NumberPad component is a numeric keypad that allows the user to input a quantity.
// It takes three props: onQuantitySelected, onClear, and onConfirm, which are callback functions that are called when the user inputs a quantity, clears the input, and confirms the input, respectively.
function NumberPad({
  onQuantitySelected,
  onClear,
  onConfirm,
  onCancelTransaction,
  onPayment,
  onNextTransaction,
}) {
  // input state stores the current input of the user
  const [input, setInput] = useState("");

  // Whenever the input state changes, the onQuantitySelected callback is called with the new input as an argument
  useEffect(() => {
    if (input) {
      onQuantitySelected(parseFloat(input));
    }
  }, [input, onQuantitySelected]);

  // handleButtonClick is called when a number button is clicked. It appends the value of the clicked button to the input state
  const handleButtonClick = ({ target: { value } }) => {
    setInput((prevInput) => prevInput + value);
  };

  // handleBackspaceClick is called when the backspace button is clicked. It removes the last character from the input state
  const handleBackspaceClick = () =>
    setInput((prevInput) => prevInput.slice(0, -1) || "0");

  // handleClearClick is called when the clear button is clicked. It resets the input state and calls the onClear callback
  const handleClearClick = () => {
    onClear();
    setInput("");
  };

  // handleConfirmClick is called when the confirm button is clicked. It resets the input state and calls the onConfirm callback
  const handleConfirmClick = () => {
    onConfirm();
    setInput("");
  };

  const handleCancelTransactionClick = () => {
    onCancelTransaction();
    setInput("");
  };

  // handlePaymentClick is called when the "Payment" button is clicked
  const handlePaymentClick = () => {
    onPayment();
    setInput("");
  };

  // handleNextTransactionClick is called when the "Next Transaction" button is clicked
  const handleNextTransactionClick = () => {
    onNextTransaction();
    setInput("");
  };

  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      {/* Render number buttons from 1 to 9 */}
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
      {/* Render backspace button */}
      <button
        onClick={handleBackspaceClick}
        className="bg-yellow-500 text-white w-full h-12 rounded"
      >
        Backspace
      </button>
      {/* Render clear button */}
      <button
        onClick={handleClearClick}
        className="bg-red-500 text-white w-full h-12 rounded"
      >
        Clear
      </button>
      {/* Render confirm button */}
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
      {/* Render "Payment" button */}
      <button
        onClick={handlePaymentClick}
        className="bg-green-500 text-white w-full h-12 rounded"
      >
        Payment
      </button>
      {/* Render "Next Transaction" button */}
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
