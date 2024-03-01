import { useEffect, useState } from "react";
import axios from "axios";
import Fruit from "./Fruit";

function FruitList() {
  const [fruits, setFruits] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/api/fruits").then((response) => {
      setFruits(response.data);
    });
  }, []);

  return (
    <ul className="flex flex-wrap justify-center">
      {fruits.map((fruit, index) => (
        <Fruit key={index} name={fruit.name} price={fruit.price} />
      ))}
    </ul>
  );
}

export default FruitList;
