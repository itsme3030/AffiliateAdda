import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "./pages/Auth"
import Home from "./pages/Home";
import AddProduct from "./pages/AddProduct";
import UserProfile from "./pages/UserProfile";
// import NotFound from "./pages/NotFound";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/home" element={<Home />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/user-profile" element={<UserProfile />} />
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
