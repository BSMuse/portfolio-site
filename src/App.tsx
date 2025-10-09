import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Resume from './components/Resume';
import Projects from './components/Projects';
import Blog from './components/Blog';
import BlogPostDetail from './components/BlogPostDetail';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import Chatbox from './components/Chatbox';
import { BlogPost } from './types';
import { blogPosts } from './data/blogData';

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  (import.meta.env.MODE === 'production'
    ? 'https://portfolio-site-rsgh.onrender.com'
    : 'http://localhost:3001');

const App: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentView, setCurrentView] = useState<'home' | 'blog' | 'blog-post'>('home');
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  useEffect(() => {
    setIsLoaded(true);
    // Warm up backend on mount
    fetch(`${API_BASE_URL}/api/health`).catch(() => {});
  }, []);

  // Handle hash-based routing
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.substring(1);
      if (hash === 'blog') {
        setCurrentView('blog');
      } else if (hash.startsWith('blog/')) {
        const slug = hash.split('/')[1];
        const post = blogPosts.find(p => p.slug === slug);
        if (post) {
          setSelectedPost(post);
          setCurrentView('blog-post');
        } else {
          setCurrentView('blog');
        }
      } else {
        setCurrentView('home');
      }
    };

    // Initial check
    handleHashChange();

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleBlogPostClick = (post: BlogPost) => {
    setSelectedPost(post);
    setCurrentView('blog-post');
    window.location.hash = `blog/${post.slug}`;
  };

  const handleBackToBlog = () => {
    setCurrentView('blog');
    setSelectedPost(null);
    window.location.hash = 'blog';
  };

  const handleBackToHome = () => {
    setCurrentView('home');
    setSelectedPost(null);
    window.location.hash = '';
  };

  const renderContent = () => {
    switch (currentView) {
      case 'blog':
        return <Blog onPostClick={handleBlogPostClick} />;
      case 'blog-post':
        return selectedPost ? (
          <BlogPostDetail post={selectedPost} onBack={handleBackToBlog} />
        ) : (
          <Blog onPostClick={handleBlogPostClick} />
        );
      default:
        return (
          <>
            <Hero />
            <About />
            <Resume />
            <Projects />
            <Contact />
          </>
        );
    }
  };

  return (
    <div className={`min-h-screen transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      <CustomCursor />
      <Chatbox />
      <Header onNavigate={handleBackToHome} />
      <main>
        {renderContent()}
      </main>
      <Footer />
    </div>
  );
};

export default App;