import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Container from "./Container";
import Button from "../common/Button";
import UserMenu from "../user/UserMenu";
import authServices from "@/services/authServices";
import profileServices from "@/services/profileServices";
import toast from "react-hot-toast";
import { jwtDecode } from "jwt-decode";

const styles = `
  .header-gradient {
    background: linear-gradient(to right, rgba(186, 230, 253, 0.7), rgba(56, 189, 248, 0.7), rgba(37, 99, 235, 0.7));
  }
  
  .nav-link-hover {
    position: relative;
  }
  
  .nav-link-hover::after {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    bottom: -2px;
    left: 0;
    background: linear-gradient(to right, #bae6fd, #38bdf8, #2563eb);
    transition: width 0.3s ease;
  }
  
  .nav-link-hover:hover::after {
    width: 100%;
  }
`;

const Header: React.FC = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // TODO: Replace with actual auth state management
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [user, setUser] = useState({
    name: "User",
    email: "User@example.com",
    uuid: "sample-uuid-1234",
  });

  const [guest, setGuest] = useState({
    name: "Guest",
    email: "",
    uuid: "",
  });

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;
      try {
        const decoded: any = jwtDecode(token);
        if (decoded.role !== "guest") {
          const account = await profileServices.getAccount();
          if (account) {
            setUser({
              name: account.username || "User",
              email: account.email || "User@example.com",
              uuid: account.account_uuid || "",
            });
          }
        }
      } catch (error) {
        console.error("Error fetching user account:", error);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        if (decoded.role === "guest" && decoded.uuid) {
          setGuest({
            name: "Guest",
            email: "",
            uuid: decoded.uuid,
          });
        }
      } catch (error) {
        console.error("Error decoding token for guest:", error);
      }
    }
  }, []);

  const location = useLocation();
  const isAuthPage = location.pathname.startsWith("/auth");

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

  const navigationLinks = [
    { to: "/", label: "Home" },
    { to: "/flights", label: "All Flights" },
    { to: "/my-tickets", label: "My Tickets" },
  ];

  const handleSignOut = () => {
    // TODO: Implement actual sign out logic
    try {
      authServices.logout();
      toast.success("Successfully!");
      navigate("/auth/login");
    } catch (error) {
      console.error("Sign out failed:", error);
      toast.error("Sign out failed. Please try again.");
    }
    setIsLoggedIn(false);
  };

  const isActivePath = (path: string) => {
    return location.pathname === path;
  };

  return (
    <>
      <style>{styles}</style>
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/30 border-b border-white/30 shadow-lg">
        <Container size="xl">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="flex items-center space-x-2">
                <div className="text-sky-500">
                  <svg
                    className="h-8 w-8 transform transition-transform duration-300 hover:scale-110"
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
                <span className="text-xl font-bold bg-gradient-to-r from-sky-300 via-sky-500 to-blue-600 bg-clip-text text-transparent">QAirline</span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            {!isAuthPage && (
              <nav className="hidden md:flex flex-1 items-center justify-center space-x-8">
                {navigationLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`nav-link-hover transition-colors duration-200 ${
                      isActivePath(link.to)
                        ? "text-sky-500 font-medium"
                        : "text-gray-700 hover:text-sky-500"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            )}

            {/* Desktop Login Button or User Menu */}
            <div className="hidden md:flex items-center flex-shrink-0">
              {!isAuthPage && (
                <UserMenu
                  user={isGuest() ? guest : user}
                  onSignOut={handleSignOut}
                />
              )}
            </div>

            {/* Mobile Menu Button */}
            {!isAuthPage && (
              <div className="md:hidden">
                <button
                  type="button"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="inline-flex items-center justify-center p-2 rounded-md text-sky-500 hover:text-sky-600 hover:bg-sky-50/50 focus:outline-none focus:ring-2 focus:ring-sky-500"
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
            )}
          </div>

          {/* Mobile Menu */}
          <div
            className={`md:hidden transition-all duration-300 ease-in-out backdrop-blur-md bg-white/30 rounded-b-2xl ${
              isMobileMenuOpen
                ? "max-h-96 opacity-100 visible border-t border-white/30"
                : "max-h-0 opacity-0 invisible"
            }`}
          >
            <div className="py-3 space-y-1">
              {navigationLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`block px-3 py-2 text-base font-medium rounded-md transition-colors duration-200 ${
                    isActivePath(link.to)
                      ? "text-sky-500 bg-sky-50/50"
                      : "text-gray-700 hover:text-sky-500 hover:bg-sky-50/30"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-4 px-3 border-t border-white/30">
                {isLoggedIn ? (
                  <div className="space-y-1">
                    {!isGuest() && (
                      <Link
                        to="/profile"
                        className={`block px-3 py-2 text-base font-medium rounded-md ${
                          isActivePath("/profile")
                            ? "text-sky-500 bg-sky-50/50"
                            : "text-gray-700 hover:text-sky-500 hover:bg-sky-50/30"
                        }`}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        My Profile
                      </Link>
                    )}
                    <button
                      onClick={() => {
                        handleSignOut();
                        setIsMobileMenuOpen(false);
                      }}
                      className="block w-full text-left px-3 py-2 text-base font-medium text-red-500 hover:text-red-600 hover:bg-red-50/30 rounded-md"
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
                    <Button className="w-full justify-center bg-gradient-to-r from-sky-300 via-sky-500 to-blue-600 text-white hover:from-sky-400 hover:via-sky-600 hover:to-blue-700">
                      Start booking
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </Container>
      </header>
    </>
  );
};

export default Header;
