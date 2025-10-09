import { BlogPost } from '../types';

// Template for creating new blog posts
// Copy this file and rename it to match your blog post slug
// Update all the fields below with your content

export const yourBlogPostSlug: BlogPost = {
  id: 4, // Increment this number for each new post
  title: 'Your Blog Post Title Here',
  excerpt: 'Write a brief, compelling description of your blog post that will appear on the blog listing page.',
  content: `# Your Blog Post Title Here

Write your blog post content here using Markdown syntax.

## Subheading Example

You can use various Markdown features:

### Code Examples
\`\`\`typescript
const example = "This is a code block";
\`\`\`

### Lists
- Bullet point 1
- Bullet point 2
- Bullet point 3

### Numbered Lists
1. First item
2. Second item
3. Third item

### Bold and *Italic* Text
You can make text **bold** or *italic*.

### Links
[Link to external site](https://example.com)

### Blockquotes
> This is a blockquote for highlighting important information.

## Conclusion

Wrap up your blog post with a conclusion that summarizes your main points.`,
  author: 'Alexander DaCosta', // Your name
  publishedAt: '2024-01-20', // Format: YYYY-MM-DD
  readTime: '5 min read', // Estimated reading time
  tags: ['Tag1', 'Tag2', 'Tag3'], // Array of relevant tags
  featured: false, // Set to true if this should be a featured post
  slug: 'your-blog-post-slug' // URL-friendly version of your title (lowercase, hyphens instead of spaces)
};

// Instructions for adding a new blog post:
// 1. Copy this template file
// 2. Rename it to match your slug (e.g., "my-awesome-post.ts")
// 3. Update all the fields above with your content
// 4. Add the import and export to blogData.ts
// 5. Update the id number to be unique
// 6. Save the file and your new post will appear on the blog!
