export type ToolCategory = 'Career' | 'Business' | 'Creator' | 'Productivity' | 'Education';

export interface ToolDefinition {
  id: string;
  name: string;
  description: string;
  category: ToolCategory;
  icon: string;
  href?: string;
  priceStars?: number;
  available: boolean;
  creditCost: number;
}

export const toolCategories: ToolCategory[] = [
  'Career',
  'Business',
  'Creator',
  'Productivity',
  'Education',
];

export const tools: ToolDefinition[] = [
  {
    id: 'doerforge-resume-builder',
    name: 'AI Resume Builder',
    description: 'Create a polished, ATS-ready resume from your experience.',
    category: 'Career',
    icon: 'CV',
    href: '/dashboard/resume/new',
    available: true,
    creditCost: 2,
  },
  {
    id: 'cover-letter',
    name: 'Cover Letter Writer',
    description: 'Generate a tailored cover letter for any job application.',
    category: 'Career',
    icon: 'CL',
    href: '/dashboard/cover-letter/new',
    available: true,
    creditCost: 4,
  },
  {
    id: 'ats-check',
    name: 'ATS Score Checker',
    description: 'Find the keywords and formatting issues holding your resume back.',
    category: 'Career',
    icon: 'AT',
    href: '/dashboard/resume/list',
    available: true,
    creditCost: 2,
  },
  {
    id: 'business-plan',
    name: 'Business Plan Builder',
    description: 'Turn an idea into a structured plan with goals and projections.',
    category: 'Business',
    icon: 'BP',
    href: '/dashboard/tools/business-plan',
    priceStars: 25,
    available: true,
    creditCost: 8,
  },
  {
    id: 'invoice-maker',
    name: 'Invoice Maker',
    description: 'Create clean invoices and share them with your clients.',
    category: 'Business',
    icon: 'IN',
    href: '/dashboard/tools/invoice-maker',
    priceStars: 10,
    available: true,
    creditCost: 3,
  },
  {
    id: 'social-caption',
    name: 'Social Caption Studio',
    description: 'Create platform-ready captions, hooks, and content ideas.',
    category: 'Creator',
    icon: 'SC',
    href: '/dashboard/tools/social-caption',
    priceStars: 10,
    available: true,
    creditCost: 3,
  },
  {
    id: 'content-calendar',
    name: 'Content Calendar',
    description: 'Plan a month of consistent content around your audience.',
    category: 'Creator',
    icon: 'CC',
    href: '/dashboard/tools/content-calendar',
    priceStars: 15,
    available: true,
    creditCost: 8,
  },
  {
    id: 'email-writer',
    name: 'Email Writer',
    description: 'Draft clear professional emails in the right tone.',
    category: 'Productivity',
    icon: 'EM',
    href: '/dashboard/tools/email-writer',
    priceStars: 10,
    available: true,
    creditCost: 3,
  },
  {
    id: 'meeting-notes',
    name: 'Meeting Notes',
    description: 'Transform rough notes into decisions, tasks, and next steps.',
    category: 'Productivity',
    icon: 'MN',
    href: '/dashboard/tools/meeting-notes',
    priceStars: 10,
    available: true,
    creditCost: 4,
  },
  {
    id: 'study-planner',
    name: 'Study Planner',
    description: 'Build a realistic study schedule around your deadlines.',
    category: 'Education',
    icon: 'SP',
    href: '/dashboard/tools/study-planner',
    priceStars: 15,
    available: true,
    creditCost: 5,
  },
  {
    id: 'quiz-maker',
    name: 'Quiz Maker',
    description: 'Turn a topic or document into practice questions.',
    category: 'Education',
    icon: 'QM',
    href: '/dashboard/tools/quiz-maker',
    priceStars: 15,
    available: true,
    creditCost: 4,
  },
];

export const toolInstructions: Record<string, string> = {
  'business-plan': 'Create a concise business plan with problem, target customer, solution, business model, marketing, operations, risks, and a 90-day action plan.',
  'invoice-maker': 'Create a professional invoice in plain text with seller details, client details, invoice number placeholder, line items, totals, payment terms, and notes.',
  'social-caption': 'Create five platform-ready social captions with hooks, captions, calls to action, and relevant hashtag suggestions.',
  'content-calendar': 'Create a practical 30-day content calendar with date, topic, format, hook, call to action, and platform for each entry.',
  'email-writer': 'Write a clear, polished email. Include a useful subject line and the email body. Match the requested tone and purpose.',
  'meeting-notes': 'Turn the supplied meeting notes into a structured summary with decisions, open questions, owners, deadlines, and next steps.',
  'study-planner': 'Create a realistic study plan with sessions, topics, duration, review blocks, and milestone checkpoints based on the supplied deadline and availability.',
  'quiz-maker': 'Create a study quiz from the supplied material with a mix of question types, an answer key, and short explanations.',
};