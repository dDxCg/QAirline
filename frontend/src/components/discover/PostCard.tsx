import React from 'react';
import { Link } from 'react-router-dom';

export interface Post {
  id: string;
  title: string;
  image: string;
  content: string;
  category: 'news' | 'about';
  date: string;
}

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
    <Link 
      to={`/discover/${post.category}/${post.id}`}
      className="group flex flex-col h-full overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md"
    >
      <div className="relative aspect-[16/9] overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      
      <div className="flex flex-1 flex-col p-4">
        <h3 className="mb-2 text-lg font-semibold text-gray-800 group-hover:text-sky-600 line-clamp-2">
          {post.title}
        </h3>
        <p className="mb-4 text-sm text-gray-600 line-clamp-3">
          {post.content}
        </p>
        <div className="mt-auto">
          <p className="text-sm text-gray-500">
            {new Date(post.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default PostCard; 