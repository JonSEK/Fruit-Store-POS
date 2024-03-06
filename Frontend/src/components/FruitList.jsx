import { useEffect, useState } from "react";
import axios from "axios";
import Fruit from "./Fruit";

function FruitList({ onFruitSelected }) {
  const [fruits, setFruits] = useState([]);

  // Fetch fruits data from API on component mount
  useEffect(() => {
    const fetchFruits = async () => {
      const response = await axios.get("http://localhost:3001/api/fruits");
      setFruits(response.data);
    };
    fetchFruits();
  }, []);

  // Render a grid of Fruit components
  return (
    <div className="bg-slate-500 rounded-lg h-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
      {fruits.map((fruit) => (
        <Fruit
          key={fruit._id}
          fruit={fruit}
          onFruitSelected={onFruitSelected}
        />
      ))}
    </div>
  );
}

// Export FruitList component
export default FruitList;
