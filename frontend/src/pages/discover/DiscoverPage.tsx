import React from 'react';
import * as Tabs from '@radix-ui/react-tabs';
import Container from '@/components/layout/Container';
import PostCard from '@/components/discover/PostCard';
import type { Post } from '@/components/discover/PostCard';
import Layout from '@/components/layout/Layout';

// Sample data - In a real app, this would come from an API
export const samplePosts: Post[] = [
  // News Posts
  {
    id: '1',
    title: 'QAirline Launches New International Routes',
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05',
    content: `We are excited to announce new international routes connecting major cities across Asia and Europe. Starting from next month, we will be operating direct flights between Singapore and Paris, Tokyo and London, and Seoul and Frankfurt. These new routes represent our commitment to expanding our global network and providing more travel options for our customers.`,
    category: 'news',
    date: '2024-03-15'
  },
  {
    id: '2',
    title: 'Introducing Our New Airbus A350 Fleet',
    image: 'https://images.unsplash.com/photo-1556388158-158ea5ccacbd',
    content: `QAirline is proud to introduce our new state-of-the-art Airbus A350 fleet. These aircraft feature enhanced fuel efficiency, reduced environmental impact, and superior passenger comfort. The cabins are equipped with the latest entertainment systems and offer more personal space in all classes.`,
    category: 'news',
    date: '2024-03-10'
  },
  {
    id: '3',
    title: 'QAirline Achieves 5-Star Safety Rating',
    image: 'https://images.unsplash.com/photo-1474302770737-173ee21bab63',
    content: `We are proud to announce that QAirline has received a 5-star safety rating from the International Air Transport Association (IATA). This recognition reflects our unwavering commitment to maintaining the highest safety standards in all aspects of our operations.`,
    category: 'news',
    date: '2024-03-05'
  },
  {
    id: '4',
    title: 'New Premium Lounge Opens at Singapore Hub',
    image: 'https://images.unsplash.com/photo-1513759565286-20e9c5fad06b',
    content: `We are delighted to announce the opening of our new premium lounge at Singapore Changi Airport. The lounge features local and international cuisine, private work spaces, shower suites, and a wellness area. This new facility represents our commitment to providing exceptional service to our premium passengers.`,
    category: 'news',
    date: '2024-02-28'
  },
  {
    id: '5',
    title: 'QAirline Partners with Leading Hotels Worldwide',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945',
    content: `We are excited to announce our new partnership with Leading Hotels Worldwide. This collaboration will offer our frequent flyers exclusive benefits and privileges at luxury hotels across the globe, enhancing the travel experience beyond the flight.`,
    category: 'news',
    date: '2024-02-20'
  },
  {
    id: '6',
    title: 'Mobile App Update: New Features Released',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c',
    content: `Our mobile app has been updated with new features including real-time flight tracking, automated check-in, and personalized travel recommendations. The update also introduces a more intuitive interface and faster booking process.`,
    category: 'news',
    date: '2024-02-15'
  },
  {
    id: '7',
    title: 'QAirline Introduces Carbon Offset Program',
    image: 'https://images.unsplash.com/photo-1497436072909-60f360e1d4b1',
    content: `As part of our commitment to environmental sustainability, we are launching a carbon offset program. Passengers can now calculate and offset their flight's carbon footprint through verified environmental projects.`,
    category: 'news',
    date: '2024-02-10'
  },
  {
    id: '8',
    title: 'New Seasonal Menu by Celebrity Chefs',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0',
    content: `We are introducing a new seasonal menu created in collaboration with renowned international chefs. The menu features locally-sourced ingredients and dishes inspired by our destinations.`,
    category: 'news',
    date: '2024-02-05'
  },
  {
    id: '9',
    title: 'QAirline Wins Best Customer Service Award',
    image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216',
    content: `We are honored to receive the Best Customer Service Award at the 2024 Aviation Excellence Awards. This recognition reflects our team's dedication to providing exceptional service to all our passengers.`,
    category: 'news',
    date: '2024-01-30'
  },
  {
    id: '10',
    title: 'Special Anniversary Promotion Announced',
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30',
    content: `To celebrate our anniversary, we are launching a special promotion with discounted fares on all routes. Members of our loyalty program will receive additional benefits and bonus miles.`,
    category: 'news',
    date: '2024-01-25'
  },

  // About Posts
  {
    id: '11',
    title: 'Our Story: The Journey of QAirline',
    image: 'https://images.unsplash.com/photo-1521727857535-28d2047314ac',
    content: `Founded in 2020, QAirline has grown from a small regional carrier to a major international airline. Our journey has been marked by continuous innovation, unwavering commitment to safety, and dedication to customer service.`,
    category: 'about',
    date: '2024-01-01'
  },
  {
    id: '12',
    title: 'Our Commitment to Sustainability',
    image: 'https://images.unsplash.com/photo-1542296332-2e4473faf563',
    content: `At QAirline, environmental responsibility is a core value. Learn about our initiatives to reduce our carbon footprint, including fleet modernization, sustainable aviation fuel, and waste reduction programs.`,
    category: 'about',
    date: '2024-02-01'
  },
  {
    id: '13',
    title: 'Meet Our Leadership Team',
    image: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902',
    content: `Get to know the experienced professionals who guide our airline's strategic direction and ensure we maintain our high standards of service and safety.`,
    category: 'about',
    date: '2024-01-15'
  },
  {
    id: '15',
    title: 'Safety First: Our Top Priority',
    image: 'https://images.unsplash.com/photo-1587019158091-1a103c5dd17f',
    content: `Safety is at the heart of everything we do. Learn about our comprehensive safety management system, training programs, and maintenance procedures.`,
    category: 'about',
    date: '2024-02-05'
  },
  {
    id: '16',
    title: 'Community Engagement Programs',
    image: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a',
    content: `We believe in giving back to the communities we serve. Explore our various community initiatives, charitable partnerships, and social responsibility programs.`,
    category: 'about',
    date: '2024-02-10'
  },
  {
    id: '17',
    title: 'Innovation at QAirline',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa',
    content: `Innovation drives our growth. From digital solutions to operational improvements, discover how we are shaping the future of air travel.`,
    category: 'about',
    date: '2024-02-15'
  },
  {
    id: '18',
    title: 'Our Service Philosophy',
    image: 'https://images.unsplash.com/photo-1530062845289-9109b2c9c868',
    content: `Learn about our customer-first approach and how we strive to make every journey memorable. Our service philosophy is built on understanding and exceeding passenger expectations.`,
    category: 'about',
    date: '2024-02-20'
  },
  {
    id: '19',
    title: 'Training Excellence',
    image: 'https://images.unsplash.com/photo-1606761568499-6d2451b23c66',
    content: `Our training programs ensure that every team member maintains the highest standards of professionalism and expertise. Discover how we invest in our people.`,
    category: 'about',
    date: '2024-02-25'
  },
  {
    id: '20',
    title: 'Awards and Recognition',
    image: 'https://images.unsplash.com/photo-1579548122080-c35fd6820ecb',
    content: `QAirline has received numerous industry awards for service excellence, safety, and innovation. View our achievements and what they mean for our passengers.`,
    category: 'about',
    date: '2024-03-01'
  }
];

const DiscoverPage: React.FC = () => {
  const newsPosts = samplePosts.filter(post => post.category === 'news');
  const aboutPosts = samplePosts.filter(post => post.category === 'about');

  return (
    <Layout>
      <Container>
        <div className="py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Discover QAirline</h1>
          
          <Tabs.Root defaultValue="news" className="w-full">
            <Tabs.List className="flex space-x-4 border-b border-gray-200 mb-6">
              <Tabs.Trigger
                value="news"
                className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-sky-600 border-b-2 border-transparent data-[state=active]:border-sky-500 data-[state=active]:text-sky-600"
              >
                News
              </Tabs.Trigger>
              <Tabs.Trigger
                value="about"
                className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-sky-600 border-b-2 border-transparent data-[state=active]:border-sky-500 data-[state=active]:text-sky-600"
              >
                About QAirline
              </Tabs.Trigger>
            </Tabs.List>

            <Tabs.Content value="news" className="focus:outline-none">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {newsPosts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            </Tabs.Content>

            <Tabs.Content value="about" className="focus:outline-none">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {aboutPosts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            </Tabs.Content>
          </Tabs.Root>
        </div>
      </Container>
    </Layout>
  );
};

export default DiscoverPage; 