import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Register from './pages/Register';
import About from './pages/About';
import ThaliBuilder from './pages/ThaliBuilder';
import GroupOrder from './pages/GroupOrder';
import TrackTrain from './pages/TrackTrain';

import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="flex flex-col min-h-screen relative">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/about" element={<About />} />
              <Route path="/thali-builder" element={<ThaliBuilder />} />
              <Route path="/group-order" element={<GroupOrder />} />
              <Route path="/group/:groupId" element={<GroupOrder />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/track-train" element={<TrackTrain />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
