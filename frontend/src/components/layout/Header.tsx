import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Container from './Container';
import Button from '../common/Button';

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationLinks = [
    { to: '/flight-search', label: 'Flight Search' },
    { to: '/flights', label: 'All Flights' },
    { to: '/my-tickets', label: 'My Tickets' },
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <Container size="xl">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="text-primary-600">
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
              <span className="text-xl font-bold text-gray-900">QAirline</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex flex-1 items-center justify-center space-x-8">
            {navigationLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-gray-700 hover:text-primary-600 transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Login Button */}
          <div className="hidden md:flex items-center flex-shrink-0">
            <Link to="/auth/login">
              <Button size="sm">
                Start booking
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="md:hidden p-2 rounded-md text-gray-700 hover:text-primary-600 hover:bg-gray-100"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span className="sr-only">Open main menu</span>
            {!isMobileMenuOpen ? (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen
              ? 'max-h-96 opacity-100 visible'
              : 'max-h-0 opacity-0 invisible'
          }`}
        >
          <div className="py-3 space-y-1">
            {navigationLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-md transition-colors duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4 px-3 border-t border-gray-200">
              <Link
                to="/auth/login"
                className="block"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Button className="w-full justify-center">
                  Start booking
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header; 