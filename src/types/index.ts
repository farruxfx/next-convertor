export interface ProjectFile {
  path: string;
  name: string;
  content: string;
  language: 'typescript' | 'javascript' | 'html' | 'css' | 'json' | 'markdown';
}

export interface ConversionOptions {
  framework: 'nextjs' | 'vite';
  useTailwind: boolean;
  useTypescript: boolean;
  componentName: string;
  addFramerMotion: boolean;
  addLucideIcons: boolean;
}

export interface SampleTemplate {
  id: string;
  title: string;
  description: string;
  category: 'Portfolio' | 'Landing Page' | 'Dashboard' | 'Business' | 'Blog';
  html: string;
  css: string;
  js: string;
}

export interface DeploymentPlatform {
  id: 'vercel' | 'cloudrun' | 'netlify' | 'github';
  name: string;
  icon: string;
  description: string;
  steps: string[];
  command: string;
  configFile?: string;
  configContent?: string;
}

export interface FileTypeStat {
  name: string;
  count: number;
  lines: number;
  bytes: number;
  color: string;
}

export interface FileSizeStat {
  name: string;
  lines: number;
  bytes: number;
}

