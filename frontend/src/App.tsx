import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';

import Login from './pages/auth/Login';
import SignUp from './pages/auth/SignUp';
import ForgotPassword from './pages/auth/ForgotPassword';
import VerifyEmail from './pages/auth/VerifyEmail';
import Profile from './pages/Profile';
import Flights from './pages/Flights';
import MyTickets from './pages/MyTickets';
import PassengerDetails from './pages/booking/PassengerDetails';
import Payment from './pages/booking/Payment';
import Confirmation from './pages/booking/Confirmation';
import AdminPage from './pages/AdminPage';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/flights" element={<Flights />} />
        <Route path="/my-tickets" element={<MyTickets />} />
        <Route path="/profile" element={<Profile />} />
        
        {/* Authentication Routes */}
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/signup" element={<SignUp />} />
        <Route path="/auth/forgot-password" element={<ForgotPassword />} />
        <Route path="/auth/verify-email" element={<VerifyEmail />} />

        {/* Booking Routes */}
        <Route path="/booking/passenger-details" element={<PassengerDetails />} />
        <Route path="/booking/payment" element={<Payment />} />
        <Route path="/booking/confirmation" element={<Confirmation />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </Router>
  );
}

export default App;
