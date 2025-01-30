import { BrowserRouter, Routes, Route } from "react-router-dom";
import Product from "./components/Product";
import Home from "./components/Home";

function App() {
  
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<Product />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
