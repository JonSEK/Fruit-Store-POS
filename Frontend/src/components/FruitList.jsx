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
    <ul>
      {fruits.map((fruit, index) => (
        <Fruit key={index} name={fruit.name} />
      ))}
    </ul>
  );
}

export default FruitList;
