import Home from './screens/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './screens/Login';
import About from './screens/About';
import Register from './screens/Register';
import Contact from './screens/Contact';
import { CartProvider } from './components/ContextReducer';
import MyOrders from './screens/MyOrders';

function App() {
  return (
    <div className="">
    <CartProvider>
      <Router>
        <div>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/contact" element={<Contact />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/myOrders" element={<MyOrders />} />
          </Routes>
        </div>
      </Router>
      </CartProvider>
    </div>
  );
}

export default App;
