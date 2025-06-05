import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "../common/Button";
import { jwtDecode } from "jwt-decode";

interface UserMenuProps {
  user: {
    name: string;
    email: string;
    uuid: string;
  };
  onSignOut: () => void;
}

const UserMenu: React.FC<UserMenuProps> = ({ user, onSignOut }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSignOut = () => {
    onSignOut();
    setIsOpen(false);
  };

  const isGuest = (): boolean => {
    const token = localStorage.getItem("token");
    if (!token) return false;
    try {
      const decoded: any = jwtDecode(token);
      return decoded.role === "guest";
    } catch (error) {
      console.error("Error decoding token:", error);
      return false;
    }
  };

  return (
    <div className="relative" ref={menuRef}>
      <Button
        variant="outline"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2"
      >
        <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center">
          <span className="text-primary-700 font-medium text-sm">
            {user.name.charAt(0).toUpperCase()}
          </span>
        </div>
        <span className="hidden md:inline">{user.name}</span>
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${
            isOpen ? "transform rotate-180" : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </Button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-50">
          <div className="px-4 py-2 border-b border-gray-100">
            <p className="text-sm font-medium text-gray-900">
              {isGuest() ? "Guest" : user.name}
            </p>
            <p className="text-xs text-gray-500">
              {isGuest() ? user.uuid : user.email}
            </p>
          </div>

          {!isGuest() && (
            <Link
              to="/profile"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
              onClick={() => setIsOpen(false)}
            >
              My Profile
            </Link>
          )}

          {!isGuest() && (
            <Link
              to="/my-tickets"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
              onClick={() => setIsOpen(false)}
            >
              My Tickets
            </Link>
          )}

          {isGuest() ? (
            <button
              className="block w-full text-left px-4 py-2 text-sm text-primary-600 hover:bg-gray-50 font-bold"
              onClick={handleSignOut}
            >
              Sign In
            </button>
          ) : (
            <button
              onClick={handleSignOut}
              className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50 font-bold"
            >
              Sign Out
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default UserMenu;
