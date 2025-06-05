import React from 'react';
import Layout from '../components/layout/Layout';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Container from '../components/layout/Container';
import SearchForm from '../components/search/SearchForm';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  const destinations = [
    {
      city: 'London',
      title: 'The Historic Capital',
      description: 'Explore the rich history, iconic landmarks, and diverse culture of England\'s capital.',
      image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad',
    },
    {
      city: 'Paris',
      title: 'City of Lights',
      description: 'Experience the romance, art, and culinary excellence of the French capital.',
      image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34',
    },
    {
      city: 'Tokyo',
      title: 'The Modern Metropolis',
      description: 'Immerse yourself in Japan\'s unique blend of tradition and cutting-edge technology.',
      image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf',
    },
  ];

  const services = [
    {
      title: 'Premium Lounges',
      description: 'Relax in our exclusive lounges with complimentary refreshments and Wi-Fi.',
      icon: (
        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-blue-500 flex items-center justify-center">
          <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        </div>
      ),
    },
    {
      title: 'In-Flight Entertainment',
      description: 'Enjoy the latest movies, TV shows, and music on your personal screen.',
      icon: (
        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-blue-500 flex items-center justify-center">
          <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        </div>
      ),
    },
    {
      title: 'Gourmet Dining',
      description: 'Savor delicious meals prepared by world-class chefs.',
      icon: (
        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-blue-500 flex items-center justify-center">
          <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
          </svg>
        </div>
      ),
    },
    {
      title: 'Extra Legroom',
      description: 'Stretch out and relax with our spacious seating options.',
      icon: (
        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-blue-500 flex items-center justify-center">
          <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        </div>
      ),
    },
    {
      title: 'Priority Boarding',
      description: 'Skip the lines and board first with our priority service.',
      icon: (
        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-blue-500 flex items-center justify-center">
          <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
          </svg>
        </div>
      ),
    },
    {
      title: 'Baggage Assistance',
      description: 'Hassle-free baggage handling from check-in to destination.',
      icon: (
        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-blue-500 flex items-center justify-center">
          <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
      ),
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="min-h-screen flex items-center relative bg-gradient-to-b from-primary-50 to-white">
        <Container className="py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Fly with <span className="text-primary-600">QAirline</span>
            </h1>
            <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
              Experience premium air travel with exceptional service, comfort, and reliability. Your journey begins here.
            </p>

            <Link 
              to="/flights" 
              className="inline-flex items-center justify-center px-8 py-3 mb-12 text-lg font-bold text-white bg-primary-600 rounded-full hover:bg-primary-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl group"
            >
              View All Flights
              <svg 
                className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-200" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M9 5l7 7-7 7" 
                />
              </svg>
            </Link>

            {/* Flight Search Form */}
            <Card className="max-w-4xl mx-auto">
              <SearchForm />
            </Card>
          </div>
        </Container>

        {/* Decorative bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      {/* Popular Destinations */}
      <section className="py-20">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Popular Destinations
            </h2>
            <p className="text-gray-600 text-lg">
              Discover amazing places around the world
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {destinations.map((destination) => (
              <div 
                key={destination.city}
                className="group relative h-[600px] rounded-2xl overflow-hidden cursor-pointer"
              >
                {/* Background Image */}
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{ 
                    backgroundImage: `url(${destination.image})`,
                    backgroundPosition: '50% 25%' // Position image higher up
                  }}
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />

                {/* Content */}
                <div className="absolute inset-x-0 bottom-0 p-8 text-white">
                  <div className="space-y-3">
                    <h3 className="text-3xl font-bold">{destination.city}</h3>
                    <p className="text-lg text-gray-200">{destination.title}</p>
                    <p className="text-base text-gray-300 line-clamp-2 mb-4 max-w-lg">
                      {destination.description}
                    </p>
                    <Link to="/auth/login" className="inline-flex items-center text-white font-medium text-lg group-hover:underline">
                      Book flights now
                      <svg 
                        className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-200" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M9 5l7 7-7 7" 
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Our Services */}
      <section className="py-20">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our Services
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need for a perfect journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {services.map((service) => (
              <div key={service.title} className="text-center">
                {service.icon}
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose QAirline?
            </h2>
            <p className="text-gray-600">
              Experience the difference with our premium services
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card variant="hover" className="text-center">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.618 5.984A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016zM12 9v2m0 4h.01" />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">Safety First</h3>
              <p className="text-gray-600">
                Our commitment to safety is unwavering, with the highest industry standards and regular maintenance.
              </p>
            </Card>

            <Card variant="hover" className="text-center">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">On-Time Performance</h3>
              <p className="text-gray-600">
                We pride ourselves on punctuality, ensuring you reach your destination as scheduled.
              </p>
            </Card>

            <Card variant="hover" className="text-center">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">Premium Service</h3>
              <p className="text-gray-600">
                Exceptional customer service and comfort that makes every journey memorable.
              </p>
            </Card>
          </div>
        </Container>
      </section>
    </Layout>
  );
};

export default Home; 