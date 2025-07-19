import { Project } from '../types';

export const projects: Project[] = [
  {
    id: 1,
    title: 'ArtsSpace',
    description:
      'Full-stack web app for managing art studio memberships and space reservations. Features real-time database interactions and role-based access using Supabase and PostgreSQL. Designed responsive UI for mobile and desktop use.',
    image: '/images/ArtsSpace/Arts_space_home.png',
    images: [
      { src: '/images/ArtsSpace/Arts_space_home.png', label: 'Login Page', type: 'image' },
      { src: '/images/ArtsSpace/Arts_space_1.mp4', label: 'User Dashboard', type: 'video' },
      { src: '/images/ArtsSpace/Arts_space_2.mp4', label: 'User Application Search', type: 'video' },
      { src: '/images/ArtsSpace/Arts_space_3.mp4', label: 'Space Application', type: 'video' }, 
      { src: '/images/ArtsSpace/Arts_space_4.mp4', label: 'Admin Dashboard & Search', type: 'video' },
      { src: '/images/ArtsSpace/Arts_space_5.mp4', label: 'First Review & Result', type: 'video' },
      { src: '/images/ArtsSpace/Arts_space_6.mp4', label: 'Email Templating & Approved', type: 'video' },
    ],
    tags: ['Web Development', 'React', 'TypeScript', 'Supabase', 'PostgreSQL', 'Tailwind CSS'],
    demoUrl: 'https://artspaces.netlify.app/login',
    codeUrl: 'https://github.com/BSMuse/ArtSpace'
  },
  {
    id: 2,
    title: 'Muttly',
    description:
      'AI-powered app to create custom "Mutts" by blending two dogs and generating stat cards. Integrates Gemini and Replicate APIs with React and Node. Allows saving and sharing creations.',
    image: 'https://images.pexels.com/photos/2004161/pexels-photo-2004161.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    images: [
      { src: '/images/Muttly/muttly_home.png', label: 'Home Dashboard', type: 'image' },
      { src: '/images/Muttly/muttly_video.mp4', label: 'Generation Example', type: 'video' },
      { src: '/images/Muttly/muttly_card_1.png', label: 'Australian Cattle Dog & Rottweiler', type: 'image' },
      { src: '/images/Muttly/muttly_card_2.png', label: 'Border Collie & Doberman Pinscher', type: 'image' },
      { src: '/images/Muttly/muttly_card_3.png', label: 'Alaskan Malamute & Pembroke Welsh Corgi', type: 'image' },
      { src: '/images/Muttly/muttly_card_4.png', label: 'Shiba Inu & Pug', type: 'image' },
      { src: '/images/Muttly/muttly_card_5.png', label: 'Scottish Terrier & Akita', type: 'image' }
    ],
    tags: ['AI/ML', 'React', 'Node.js', 'PostgreSQL', 'Gemini API', 'Replicate API'],
    demoUrl: 'https://muttly.onrender.com',
    codeUrl: 'https://github.com/BSMuse/Muttly'
  },
  {
    id: 3,
    title: 'Boolebots',
    description:
      'Educational game teaching Boolean logic gates. Developed collaboratively using Agile/Scrum practices. Designed to help students visualize and experiment with logic gate behavior.',
    image: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    images: [
      { src: '/images/Boolebots/boolebots_home.png', label: 'Home', type: 'image' },
      { src: '/images/Boolebots/boolebots_plays.png', label: 'The Battle Begins...', type: 'image' },
      { src: '/images/Boolebots/boolebots_win.png', label: 'Megatron Wins', type: 'image' }
    ],
    tags: ['Web Development', 'React','SCSS'],
    demoUrl: 'https://boolebotapp.netlify.app',
    codeUrl: 'https://github.com/BSMuse/boolebots'
  },
  {
    id: 4,
    title: 'Quizzical',
    description:
      'Fun quiz app pulling randomized questions from an API across a wide range of topics. Users can challenge themselves on a variety of subjects in an engaging interface.',
    image: 'https://images.pexels.com/photos/196645/pexels-photo-196645.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    images: [
      { src: '/images/Quizzical/quizzical_home.png', label: 'Home', type: 'image' },
      { src: '/images/Quizzical/quizzical_quiz.png', label: 'A Quiz', type: 'image' },
      { src: '/images/Quizzical/quiz_results.png', label: 'Results Screen', type: 'image' }
    ],
    tags: ['Web Development', 'React', 'API', 'CSS'],
    demoUrl: 'https://quizdomquiz.netlify.app',
    codeUrl: 'https://github.com/BSMuse/quizzical'
  },
];