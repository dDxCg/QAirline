import React, { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import Container from "../../components/layout/Container";
import Card from "../../components/common/Card";
import Button from "../../components/common/Button";
import authServices from "@/services/authServices";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement login logic
    authServices
      .login({ email, password })
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.error("Login failed:", error);
        toast.error("Invalid email or password. Please try again.");
      });
  };

  const handleGuestLogin = () => {
    try {
      authServices.guest().then(() => {
        navigate("/");
      });
    } catch (error) {
      console.error("Guest login failed:", error);
      toast.error("Guest login failed. Please try again.");
    }
  };

  return (
    <Layout>
      <section className="min-h-screen flex items-center relative bg-gradient-to-b from-primary-50 to-white">
        <Container className="py-20">
          <div className="max-w-md mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                Welcome Back
              </h1>
              <p className="text-lg text-gray-600">
                Sign in to your QAirline account
              </p>
            </div>

            <Card className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Enter your email"
                  />
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Enter your password"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <label
                      htmlFor="remember-me"
                      className="ml-2 block text-sm text-gray-700"
                    >
                      Remember me
                    </label>
                  </div>

                  <Link
                    to="/auth/forgot-password"
                    className="text-sm font-medium text-primary-600 hover:text-primary-500"
                  >
                    Forgot password?
                  </Link>
                </div>

                <div className="flex justify-center">
                  <Button
                    type="submit"
                    variant="primary"
                    className="w-full py-3 text-lg font-bold"
                  >
                    Sign In
                  </Button>
                </div>

                <div className="flex justify-center">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full py-3 text-lg font-bold"
                    onClick={handleGuestLogin}
                  >
                    Sign in as Guest
                  </Button>
                </div>

                <div className="text-center mt-4">
                  <p className="text-lg text-gray-600">
                    Don't have an account?{" "}
                    <Link
                      to="/auth/signup"
                      className="font-medium text-primary-600 hover:text-primary-500 py-1 rounded focus:outline-none focus:ring-2 focus:ring-primary-300 inline-block cursor-pointer"
                      tabIndex={0}
                    >
                      Sign up now
                    </Link>
                  </p>
                </div>
              </form>
            </Card>
          </div>
        </Container>

        {/* Decorative bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
      </section>
    </Layout>
  );
};

export default Login;
