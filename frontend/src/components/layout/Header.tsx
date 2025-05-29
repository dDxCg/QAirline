import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Container from './Container';
import Button from '../common/Button';
import UserMenu from '../user/UserMenu';

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // TODO: Replace with actual auth state management
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [user] = useState({
    name: 'Ta Lang',
    email: 'djtmemay@gmail.com',
  });

  const location = useLocation();

  const navigationLinks = [
    { to: '/', label: 'Home' },
    { to: '/flights', label: 'All Flights' },
    { to: '/my-tickets', label: 'My Tickets' },
  ];

  const handleSignOut = () => {
    // TODO: Implement actual sign out logic
    setIsLoggedIn(false);
  };

  const isActivePath = (path: string) => {
    return location.pathname === path;
  };

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
                className={`transition-colors duration-200 ${
                  isActivePath(link.to)
                    ? 'text-primary-600 font-medium'
                    : 'text-gray-700 hover:text-primary-600'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Login Button or User Menu */}
          <div className="hidden md:flex items-center flex-shrink-0">
            {isLoggedIn ? (
              <UserMenu user={user} onSignOut={handleSignOut} />
            ) : (
              <Link to="/auth/login">
                <Button size="sm">Start booking</Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <svg
                  className="block h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
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
                className={`block px-3 py-2 text-base font-medium rounded-md transition-colors duration-200 ${
                  isActivePath(link.to)
                    ? 'text-primary-600 bg-primary-50'
                    : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4 px-3 border-t border-gray-200">
              {isLoggedIn ? (
                <div className="space-y-1">
                  <Link
                    to="/profile"
                    className={`block px-3 py-2 text-base font-medium rounded-md ${
                      isActivePath('/profile')
                        ? 'text-primary-600 bg-primary-50'
                        : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    My Profile
                  </Link>
                  <button
                    onClick={() => {
                      handleSignOut();
                      setIsMobileMenuOpen(false);
                    }}
                    className="block w-full text-left px-3 py-2 text-base font-medium text-red-600 hover:text-red-700 hover:bg-gray-50 rounded-md"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <Link
                  to="/auth/login"
                  className="block"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Button className="w-full justify-center">
                    Start booking
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header; 