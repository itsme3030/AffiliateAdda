import { BrowserRouter, Routes, Route } from "react-router-dom";
import GoogleAuthentication from './components/GoogleAuthentication'
import Logout from "./components/Logout";
import Home from "./pages/Home";
import AddProduct from "./pages/AddProduct";
import UserProfile from "./components/UserProfile";
import Header from "./components/Header"
// import NotFound from "./pages/NotFound";


function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Authenticate" element={<GoogleAuthentication />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/user-profile" element={<UserProfile />} />
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
