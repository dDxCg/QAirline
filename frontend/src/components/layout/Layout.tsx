import React from 'react';
import Header from './Header';
import Container from './Container';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        {children}
      </main>
      <footer className="bg-gray-900 text-white">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 py-12">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <div className="text-primary-500">
                  <svg
                    className="h-8 w-8"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 2L2 22" />
                    <path d="M14.5 9.5L19 5" />
                    <path d="M5 19L9.5 14.5" />
                    <path d="M3.34 7C5.66 4.68 8.83 3.36 12 3.36C15.17 3.36 18.34 4.68 20.66 7" />
                    <path d="M7 3.34C4.68 5.66 3.36 8.83 3.36 12C3.36 15.17 4.68 18.34 7 20.66" />
                  </svg>
                </div>
                <span className="text-xl font-bold">QAirline</span>
              </div>
              <p className="text-gray-400">
                Your trusted partner for safe, comfortable, and reliable air travel worldwide.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="/book-flights" className="text-gray-400 hover:text-white">Book Flights</a></li>
                <li><a href="/manage-booking" className="text-gray-400 hover:text-white">Manage Booking</a></li>
                <li><a href="/check-in" className="text-gray-400 hover:text-white">Check-in</a></li>
                <li><a href="/flight-status" className="text-gray-400 hover:text-white">Flight Status</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-4">Services</h3>
              <ul className="space-y-2">
                <li><a href="/premium-lounges" className="text-gray-400 hover:text-white">Premium Lounges</a></li>
                <li><a href="/extra-baggage" className="text-gray-400 hover:text-white">Extra Baggage</a></li>
                <li><a href="/seat-selection" className="text-gray-400 hover:text-white">Seat Selection</a></li>
                <li><a href="/special-assistance" className="text-gray-400 hover:text-white">Special Assistance</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-4">Contact</h3>
              <ul className="space-y-2">
                <li className="flex items-center space-x-2">
                  <span className="text-primary-500">📞</span>
                  <span className="text-gray-400">1-800-QAIRLINE</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-primary-500">✉️</span>
                  <span className="text-gray-400">support@qairline.com</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-primary-500">📍</span>
                  <span className="text-gray-400">123 Aviation Blvd, Sky City</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-primary-500">🕒</span>
                  <span className="text-gray-400">24/7 Customer Support</span>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Copyright */}
          <div className="border-t border-gray-800 py-6 text-center text-gray-400 text-sm">
            © {new Date().getFullYear()} QAirline. All rights reserved.
          </div>
        </Container>
      </footer>
    </div>
  );
};

export default Layout; 