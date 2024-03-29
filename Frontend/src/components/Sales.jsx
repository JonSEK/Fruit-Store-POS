import { useEffect, useState } from "react";
import axios from "axios";

function Sales() {
  const [items, setItems] = useState([]);

  // Fetch purchases from API and flatten into items on component mount
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_APP_API_URL}/api/purchases`)
      .then((response) => {
        // Map each purchase into its items, adding purchase details to each item
        const items = response.data.flatMap((purchase) =>
          purchase.items.map((item) => ({
            ...item,
            totalPrice: purchase.totalPrice,
            purchaseDate: purchase.purchaseDate,
            staffName: purchase.staffName,
          }))
        );
        setItems(items);
      })
      .catch((error) => {
        console.error("Error fetching purchases:", error);
      });
  }, []);

  // Calculate total sales
  const total = items.reduce(
    (sum, item) => sum + item.quantity * item.pricePerUnit,
    0
  );

  // Render sales log
  return (
    <div>
      <h1 className="px-4 pb-4 text-2xl font-bold text-center">SALES LOG</h1>
      <table className="table-auto w-full text-left">
        <thead>
          <tr>
            <th className="px-4">Purchase Date</th>
            <th className="px-4">Item</th>
            <th className="px-4 text-right">Quantity</th>
            <th className="px-4 text-right">Price per Unit</th>
            <th className="px-4 text-right">Sub Total</th>
            <th className="px-4">Staff Name</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index}>
              <td className="px-4">
                {new Date(item.purchaseDate).toLocaleString()}
              </td>
              <td className="px-4">{item.name}</td>
              <td className="px-4 text-right">{item.quantity}</td>
              <td className="px-4 text-right">
                {item.pricePerUnit.toFixed(2)}
              </td>
              <td className="px-4 text-right">
                {(item.quantity * item.pricePerUnit).toFixed(2)}
              </td>
              <td className="px-4">{item.staffName}</td>
            </tr>
          ))}
          <tr>
            <td className="px-4 text-right pt-5 font-bold" colSpan="4">
              Total
            </td>
            <td className="px-4 text-right pt-5 font-bold">
              {total.toFixed(2)}
            </td>
            <td className="px-4"></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Sales;
