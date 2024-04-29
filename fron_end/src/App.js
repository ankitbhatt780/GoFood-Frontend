import './App.css';
import Home from './Components/Screens/Home';
import { BrowserRouter, Routes, Route } from "react-router-dom"

import "../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css"
import "../node_modules/bootstrap/dist/js/bootstrap.bundle"
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"
import Signup from './Components/Signup.jsx';
import Login from './Components/Login.jsx';
import CartProvider from './Components/ContextReducer.jsx';
import Cart from './Components/Screens/Cart.jsx';
import MyOrder from './Components/Screens/MyOrder.jsx';
function App() {
  return (
    <>
      <CartProvider>
        <BrowserRouter>
          <div>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/login' element={<Login />} />
              <Route path='/signup' element={<Signup />} />
              <Route path='/mycart' element={<Cart />} />
              <Route exact path="/myorder" element={<MyOrder />} />
            </Routes>
          </div>
        </BrowserRouter>

      </CartProvider>
    </>
  );
}

export default App;
