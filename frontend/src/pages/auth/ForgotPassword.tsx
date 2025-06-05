import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../../components/layout/Layout';
import Container from '../../components/layout/Container';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    // TODO: Implement password reset logic
  };

  return (
    <Layout>
      <section className="min-h-screen flex items-center relative bg-gradient-to-b from-primary-50 to-white">
        <Container className="py-20">
          <div className="max-w-md mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                Reset Password
              </h1>
              <p className="text-lg text-gray-600">
                Enter your email to receive password reset instructions
              </p>
            </div>

            <Card className="p-8">
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
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

                  <Button
                    type="submit"
                    variant="primary"
                    className="w-full py-3 text-lg font-bold"
                  >
                    Send Reset Link
                  </Button>

                  <div className="text-center mt-4">
                    <p className="text-sm text-gray-600">
                      Remember your password?{' '}
                      <Link
                        to="/auth/login"
                        className="font-medium text-primary-600 hover:text-primary-500"
                      >
                        Back to login
                      </Link>
                    </p>
                  </div>
                </form>
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Check Your Email
                  </h3>
                  <p className="text-gray-600 mb-6">
                    We've sent password reset instructions to your email address.
                  </p>
                  <Link
                    to="/auth/login"
                    className="text-primary-600 hover:text-primary-500 font-medium"
                  >
                    Back to login
                  </Link>
                </div>
              )}
            </Card>
          </div>
        </Container>

        {/* Decorative bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
      </section>
    </Layout>
  );
};

export default ForgotPassword; 