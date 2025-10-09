import { BlogPost } from '../types';

export const gettingStartedWithNextJS: BlogPost = {
  id: 4,
  title: 'Getting Started with Next.js: A Complete Guide',
  excerpt: 'Learn the fundamentals of Next.js, the React framework for production. This guide covers everything from setup to deployment.',
  content: `# Getting Started with Next.js: A Complete Guide

Next.js has become one of the most popular React frameworks for building production-ready applications. It provides powerful features like server-side rendering, static site generation, and API routes out of the box.

## What is Next.js?

Next.js is a React framework that enables you to build full-stack web applications. It extends React with additional features and optimizations for production use.

### Key Features:

- **Server-Side Rendering (SSR)**: Render pages on the server for better SEO and performance
- **Static Site Generation (SSG)**: Pre-render pages at build time
- **API Routes**: Build API endpoints within your Next.js application
- **Automatic Code Splitting**: Optimize bundle sizes automatically
- **Built-in CSS Support**: Support for CSS modules, Sass, and styled-jsx

## Installation and Setup

Create a new Next.js project:

\`\`\`bash
npx create-next-app@latest my-nextjs-app
cd my-nextjs-app
npm run dev
\`\`\`

## Project Structure

A typical Next.js project structure looks like this:

\`\`\`
my-nextjs-app/
├── pages/
│   ├── api/
│   ├── _app.js
│   └── index.js
├── public/
├── styles/
└── package.json
\`\`\`

## Creating Your First Page

Pages in Next.js are created by adding files to the \`pages\` directory:

\`\`\`javascript
// pages/about.js
export default function About() {
  return (
    <div>
      <h1>About Page</h1>
      <p>This is the about page!</p>
    </div>
  );
}
\`\`\`

## API Routes

Create API endpoints in the \`pages/api\` directory:

\`\`\`javascript
// pages/api/hello.js
export default function handler(req, res) {
  res.status(200).json({ message: 'Hello from Next.js API!' });
}
\`\`\`

## Deployment

Deploy your Next.js app easily with Vercel:

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy with one click!

## Conclusion

Next.js makes it easy to build fast, SEO-friendly React applications. Start with the basics and gradually explore advanced features as your needs grow.

Happy coding!`,
  author: 'Alexander DaCosta',
  publishedAt: '2024-01-25',
  readTime: '6 min read',
  tags: ['Next.js', 'React', 'Web Development', 'Full Stack'],
  featured: false,
  slug: 'getting-started-with-nextjs'
};
