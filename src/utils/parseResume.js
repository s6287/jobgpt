import * as pdfjsLib from 'pdfjs-dist'

// Set worker path
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`

// Common tech skills to match against
const SKILLS_LIST = [
  // Frontend
  'react', 'angular', 'vue', 'javascript', 'typescript', 'html', 'css', 'tailwind',
  'next.js', 'nextjs', 'redux', 'jquery', 'bootstrap', 'sass', 'webpack', 'vite',
  // Backend
  'node.js', 'nodejs', 'express', 'python', 'django', 'flask', 'java', 'spring',
  'php', 'laravel', 'ruby', 'rails', 'golang', 'go', 'rust', 'c#', '.net',
  // Database
  'sql', 'mysql', 'postgresql', 'mongodb', 'firebase', 'supabase', 'redis', 'dynamodb',
  // Cloud & DevOps
  'aws', 'azure', 'gcp', 'docker', 'kubernetes', 'jenkins', 'ci/cd', 'linux', 'git',
  // Mobile
  'react native', 'flutter', 'swift', 'kotlin', 'android', 'ios',
  // Data & AI
  'machine learning', 'deep learning', 'tensorflow', 'pytorch', 'pandas', 'numpy',
  'data science', 'data analysis', 'power bi', 'tableau',
  // Other
  'graphql', 'rest api', 'api', 'figma', 'agile', 'scrum', 'jira',
]

// Job titles to detect
const JOB_TITLES = [
  'software engineer', 'software developer', 'web developer', 'frontend developer',
  'front-end developer', 'backend developer', 'back-end developer', 'full stack developer',
  'fullstack developer', 'react developer', 'node developer', 'python developer',
  'java developer', 'data scientist', 'data analyst', 'data engineer',
  'devops engineer', 'cloud engineer', 'mobile developer', 'ios developer',
  'android developer', 'ui/ux designer', 'product manager', 'project manager',
  'machine learning engineer', 'qa engineer', 'test engineer',
]

// Experience patterns
const EXPERIENCE_PATTERNS = [
  /(\d+)\+?\s*(?:years?|yrs?)\s*(?:of)?\s*(?:experience|exp)/gi,
  /experience\s*(?:of)?\s*(\d+)\+?\s*(?:years?|yrs?)/gi,
  /(\d+)\+?\s*(?:years?|yrs?)\s*(?:in|of|working)/gi,
]

// 1. Extract text from PDF
export async function extractTextFromPDF(file) {
  const arrayBuffer = await file.arrayBuffer()
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise

  let fullText = ''
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i)
    const textContent = await page.getTextContent()
    const pageText = textContent.items.map(item => item.str).join(' ')
    fullText += pageText + '\n'
  }

  return fullText
}

// 2. Extract skills from text
export function extractSkills(text) {
  const lowerText = text.toLowerCase()
  const foundSkills = []

  for (const skill of SKILLS_LIST) {
    // Match whole word (not partial matches)
    const regex = new RegExp(`\\b${skill.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i')
    if (regex.test(lowerText)) {
      // Capitalize first letter for display
      foundSkills.push(skill.charAt(0).toUpperCase() + skill.slice(1))
    }
  }

  return [...new Set(foundSkills)] // Remove duplicates
}

// 3. Extract experience years
export function extractExperience(text) {
  for (const pattern of EXPERIENCE_PATTERNS) {
    const match = pattern.exec(text)
    if (match) {
      return parseInt(match[1])
    }
  }
  return null
}

// 4. Detect job title
export function detectJobTitle(text) {
  const lowerText = text.toLowerCase()

  for (const title of JOB_TITLES) {
    if (lowerText.includes(title)) {
      return title.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
    }
  }
  return null
}

// 5. Full parse - combines everything
export async function parseResume(file) {
  const text = await extractTextFromPDF(file)
  const skills = extractSkills(text)
  const experience = extractExperience(text)
  const jobTitle = detectJobTitle(text)

  return {
    text,
    skills,
    experience,
    jobTitle,
  }
}
