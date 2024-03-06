import { useEffect, useState } from "react";
import axios from "axios";
import Fruit from "./Fruit";

function FruitList({ onFruitSelected }) {
  const [fruits, setFruits] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/api/fruits").then((response) => {
      setFruits(response.data);
    });
  }, []);

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

export default FruitList;
