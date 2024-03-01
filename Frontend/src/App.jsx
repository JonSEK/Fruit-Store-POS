import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import FruitList from "./components/FruitList";
import Header from "./components/Header";
import Inventory from "./components/Inventory";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<FruitList />} />
        <Route path="/inventory" element={<Inventory />} />
      </Routes>
    </Router>
  );
}

export default App;
