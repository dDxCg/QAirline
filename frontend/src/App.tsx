import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';

// Placeholder components until they are implemented
const FlightSearch = () => <div>Flight Search Page</div>;
const Flights = () => <div>All Flights Page</div>;
const MyTickets = () => <div>My Tickets Page</div>;
const Login = () => <div>Login Page</div>;

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/flight-search" element={<FlightSearch />} />
        <Route path="/flights" element={<Flights />} />
        <Route path="/my-tickets" element={<MyTickets />} />
        <Route path="/login" element={<Login />} />
        {/* Add more routes as they are implemented */}
        {/* <Route path="/flights" element={<Flights />} /> */}
        {/* <Route path="/services" element={<Services />} /> */}
        {/* <Route path="/about" element={<About />} /> */}
        {/* <Route path="/contact" element={<Contact />} /> */}
        {/* <Route path="/bookings" element={<Bookings />} /> */}
        {/* <Route path="/admin" element={<Admin />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
