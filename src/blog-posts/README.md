# Blog Posts Directory

This directory contains individual blog post files for easy editing and management.

## How to Add a New Blog Post

### Step 1: Create a New File
1. Copy the `TEMPLATE.ts` file
2. Rename it to match your blog post slug (e.g., `my-awesome-post.ts`)
3. The filename should be lowercase with hyphens instead of spaces

### Step 2: Edit the Content
Open your new file and update all the fields:

```typescript
export const yourBlogPostSlug: BlogPost = {
  id: 4, // Increment this number for each new post
  title: 'Your Blog Post Title Here',
  excerpt: 'Brief description that appears on the blog listing page',
  content: `# Your Blog Post Title Here
  
Write your content using Markdown syntax...`,
  author: 'Alexander DaCosta',
  publishedAt: '2024-01-20', // Format: YYYY-MM-DD
  readTime: '5 min read',
  tags: ['Tag1', 'Tag2', 'Tag3'],
  featured: false, // Set to true for featured posts
  slug: 'your-blog-post-slug'
};
```

### Step 3: Update blogData.ts
1. Open `src/data/blogData.ts`
2. Add an import for your new blog post:
   ```typescript
   import { yourBlogPostSlug } from '../blog-posts/your-blog-post-slug';
   ```
3. Add it to the `blogPosts` array:
   ```typescript
   export const blogPosts: BlogPost[] = [
     buildingModernWebApps,
     futureOfAIWebDev,
     masteringCSSGridFlexbox,
     yourBlogPostSlug, // Add your new post here
   ];
   ```

### Step 4: Save and Test
Save all files and your new blog post will appear on the website!

## File Naming Convention
- Use lowercase letters
- Use hyphens instead of spaces
- Match the slug field in your blog post
- Examples: `my-awesome-post.ts`, `react-tips-and-tricks.ts`

## Content Guidelines
- Use Markdown syntax for rich formatting
- Include code examples with proper syntax highlighting
- Keep excerpts concise but compelling
- Use relevant tags for better categorization
- Set `featured: true` for important posts

## Benefits of This System
- ✅ Easy to edit individual posts
- ✅ Version control friendly
- ✅ No database required
- ✅ Fast loading
- ✅ Type-safe with TypeScript
- ✅ Markdown support for rich content
