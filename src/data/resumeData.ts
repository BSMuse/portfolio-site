import { ExperienceItem, EducationItem, CertificationItem, SkillCategory, Profile } from '../types';

export const profile: Profile = {
  text: `Self-driven full-stack developer and AI data annotator with a passion for building scalable applications and improving AI systems. Strong background in web development, CRM optimization, and AI model evaluation. Skilled at delivering results in both team-based and independent settings. Constantly learning and refining a systematic, user-focused approach to problem solving.`
};

export const skills: SkillCategory[] = [
  {
    category: 'Languages & Testing',
    items: ['JavaScript', 'TypeScript', 'C#', 'Python', 'Ruby', 'HTML', 'CSS', 'Jest', 'Mocha', 'Chai', 'Cypress']
  },
  {
    category: 'Frameworks & Libraries',
    items: ['ReactJS', 'NodeJS', '.NET', 'Express', 'EJS', 'AJAX', 'jQuery', 'SCSS', 'Tailwind', 'Bootstrap']
  },
  {
    category: 'Databases & Systems',
    items: ['PostgreSQL', 'SQL', 'Supabase', 'Active Record', 'GIT']
  },
  {
    category: 'AI & Evaluation',
    items: ['Prompt engineering', 'Rubric design', 'Model evaluation', 'Data annotation pipelines', 'Cursor', 'ChatGPT', 'Gemini']
  },
  {
    category: 'Design & Marketing',
    items: ['Figma', 'Canva', 'ZOHO', 'Salesforce', 'ActiveCampaign']
  }
];

export const experience: ExperienceItem[] = [
  {
    title: 'AI Data Annotator & Model Evaluator',
    company: 'Data Annotation Tech (Contract)',
    period: '2025 – Present',
    description:
      'Evaluate and improve AI model outputs across diverse domains using detailed rubrics and prompt engineering. Perform edge-case analysis and contribute to improving annotation guidelines and training data quality. Maintain quality and efficiency within a high-volume annotation pipeline.'
  },
  {
    title: 'Admin & Web Developer',
    company: 'Infill Development in Edmonton Association',
    period: '2023 – 2024',
    description:
      'Developed new web pages and features with HTML/CSS/JavaScript. Improved CRM workflows for membership tracking, invoicing, and onboarding automation. Enhanced productivity through process optimization and CRM automation.'
  },
  {
    title: 'Mortgage Associate',
    company: 'Dominion Mortgage Pros',
    period: '2019 – 2022',
    description:
      'Managed mortgage transactions for over 150 clients. Customized ZOHO CRM with SMS campaign/inbox integration. Automated marketing for client refinancing opportunities. Built marketing automations to generate personalized mortgage reports and identify refinancing opportunities.'
  }
];

export const education: EducationItem[] = [
  {
    degree: 'Bachelor of Science in Software Engineering',
    institution: 'Western Governors University',
    period: '2025'
  },
  {
    degree: 'Diploma in Web Development',
    institution: 'Lighthouse Labs'
  },
  {
    degree: 'Bachelor of Business Administration',
    institution: 'NAIT',
    period: '2019'
  }
];

export const certifications: CertificationItem[] = [
  {
    title: 'AWS Cloud Practitioner',
    year: '2024',
    issuer: 'Amazon Web Services'
  },
  {
    title: 'ITIL v4 Foundations',
    year: '2024',
    issuer: 'AXELOS / PeopleCert'
  }
];