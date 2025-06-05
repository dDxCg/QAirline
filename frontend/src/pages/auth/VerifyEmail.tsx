import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Layout from '../../components/layout/Layout';
import Container from '../../components/layout/Container';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';

const VerifyEmail: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [verificationStatus, setVerificationStatus] = useState<'loading' | 'success' | 'error'>('loading');
  
  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const token = searchParams.get('token');
        if (!token) {
          setVerificationStatus('error');
          return;
        }

        // TODO: Implement email verification logic with the token
        // For now, simulate success after 1.5 seconds
        await new Promise(resolve => setTimeout(resolve, 1500));
        setVerificationStatus('success');
      } catch (error) {
        setVerificationStatus('error');
      }
    };

    verifyEmail();
  }, [searchParams]);

  const renderContent = () => {
    switch (verificationStatus) {
      case 'loading':
        return (
          <div className="text-center py-8">
            <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Verifying Your Email
            </h3>
            <p className="text-gray-600">
              Please wait while we verify your email address...
            </p>
          </div>
        );

      case 'success':
        return (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Email Verified Successfully
            </h3>
            <p className="text-gray-600 mb-6">
              Your email has been verified. You can now access all features of your account.
            </p>
            <Link to="/auth/login">
              <Button variant="primary" className="px-8 py-2">
                Continue to Login
              </Button>
            </Link>
          </div>
        );

      case 'error':
        return (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Verification Failed
            </h3>
            <p className="text-gray-600 mb-6">
              We couldn't verify your email. The link may be invalid or expired.
            </p>
            <Link to="/auth/login">
              <Button variant="primary" className="px-8 py-2">
                Back to Login
              </Button>
            </Link>
          </div>
        );
    }
  };

  return (
    <Layout>
      <section className="min-h-screen flex items-center relative bg-gradient-to-b from-primary-50 to-white">
        <Container className="py-20">
          <div className="max-w-md mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                Email Verification
              </h1>
              <p className="text-lg text-gray-600">
                Verifying your email address
              </p>
            </div>

            <Card className="p-8">
              {renderContent()}
            </Card>
          </div>
        </Container>

        {/* Decorative bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
      </section>
    </Layout>
  );
};

export default VerifyEmail; 