import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import EquipmentPage from './pages/Equipment/EquipmentPage';
import RentalsPage from './pages/Rentals/RentalsPage';
import ContactPage from './pages/Contact/ContactPage';
import PaymentPage from './pages/Payment/PaymentPage';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import ProfilePage from './pages/Profile/ProfilePage';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/equipment" element={<EquipmentPage />} />
            <Route path="/rentals" element={<RentalsPage />} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route 
              path="/profile" 
              element={
                <PrivateRoute>
                  <ProfilePage />
                </PrivateRoute>
              } 
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;