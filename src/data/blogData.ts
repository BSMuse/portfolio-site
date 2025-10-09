import { BlogPost } from '../types';

// Import individual blog posts
import { buildingModernWebApps } from '../blog-posts/building-modern-web-applications-react-typescript';
import { futureOfAIWebDev } from '../blog-posts/future-ai-web-development';
import { masteringCSSGridFlexbox } from '../blog-posts/mastering-css-grid-flexbox-layouts';
import { gettingStartedWithNextJS } from '../blog-posts/getting-started-with-nextjs';

// Export all blog posts as an array
// To add a new blog post:
// 1. Create a new file in src/blog-posts/ following the TEMPLATE.ts
// 2. Import it above
// 3. Add it to the array below
export const blogPosts: BlogPost[] = [
  buildingModernWebApps,
  futureOfAIWebDev,
  masteringCSSGridFlexbox,
  gettingStartedWithNextJS,
];
