import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/auth/Login';
import SignUp from './pages/auth/SignUp';
import ForgotPassword from './pages/auth/ForgotPassword';
import VerifyEmail from './pages/auth/VerifyEmail';

// Placeholder components until they are implemented
const FlightSearch = () => <div>Flight Search Page</div>;
const Flights = () => <div>All Flights Page</div>;
const MyTickets = () => <div>My Tickets Page</div>;

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/flight-search" element={<FlightSearch />} />
        <Route path="/flights" element={<Flights />} />
        <Route path="/my-tickets" element={<MyTickets />} />
        
        {/* Authentication Routes */}
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/signup" element={<SignUp />} />
        <Route path="/auth/forgot-password" element={<ForgotPassword />} />
        <Route path="/auth/verify-email" element={<VerifyEmail />} />
      </Routes>
    </Router>
  );
}

export default App;
