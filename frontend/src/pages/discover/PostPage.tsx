import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Container from '@/components/layout/Container';
import type { Post } from '@/components/discover/PostCard';
import Layout from '@/components/layout/Layout';

// In a real app, this would be fetched from an API
import { samplePosts } from './DiscoverPage';

const PostPage: React.FC = () => {
  const { category, id } = useParams<{ category: string; id: string }>();
  const navigate = useNavigate();
  
  const post = samplePosts.find((p: Post) => p.id === id && p.category === category);
  
  if (!post) {
    return (
      <Layout>
        <Container>
          <div className="py-8 text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Post not found</h1>
            <button
              onClick={() => navigate('/discover')}
              className="text-sky-600 hover:text-sky-700"
            >
              Back to Discover
            </button>
          </div>
        </Container>
      </Layout>
    );
  }

  return (
    <Layout>
      <Container>
        <div className="py-8">
          <button
            onClick={() => navigate('/discover')}
            className="text-sky-600 hover:text-sky-700 mb-6 flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-1"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
            Back to Discover
          </button>

          <article className="prose prose-sky max-w-none">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{post.title}</h1>
            <p className="text-gray-600 mb-6">
              {new Date(post.date).toLocaleDateString()}
            </p>
            
            <div className="relative aspect-video mb-8 rounded-lg overflow-hidden">
              <img
                src={post.image}
                alt={post.title}
                className="h-full w-full object-cover"
              />
            </div>
            
            <div className="text-gray-800 leading-relaxed">
              {post.content}
            </div>
          </article>
        </div>
      </Container>
    </Layout>
  );
};

export default PostPage; 