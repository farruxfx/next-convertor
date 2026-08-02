import { ProjectFile, ConversionOptions } from '../types';

/**
 * Converts standard HTML code to valid React/Next.js JSX
 */
export function convertHtmlToJsx(html: string): string {
  if (!html.trim()) return '<div>Standard content</div>';

  let jsx = html;

  // 1. Replace class= with className=
  jsx = jsx.replace(/\bclass\s*=\s*"/g, 'className="');
  jsx = jsx.replace(/\bclass\s*=\s*'/g, "className='");

  // 2. Replace for= with htmlFor=
  jsx = jsx.replace(/\bfor\s*=\s*"/g, 'htmlFor="');
  jsx = jsx.replace(/\bfor\s*=\s*'/g, "htmlFor='");

  // 3. Replace onclick, onchange, etc.
  jsx = jsx.replace(/\bonclick\s*=/gi, 'onClick=');
  jsx = jsx.replace(/\bonchange\s*=/gi, 'onChange=');
  jsx = jsx.replace(/\bonsubmit\s*=/gi, 'onSubmit=');

  // 4. Close self-closing tags if not closed
  const voidTags = ['img', 'input', 'br', 'hr', 'meta', 'link', 'area', 'base', 'col', 'embed', 'param', 'source', 'track', 'wbr'];
  voidTags.forEach(tag => {
    // Regex for unclosed void tags: <tag ... > without ending with />
    const regex = new RegExp(`<${tag}([^>]*?)(?<!\\/)>`, 'gi');
    jsx = jsx.replace(regex, `<${tag}$1 />`);
  });

  // 5. Convert inline style="..." to React style object roughly or comment out
  jsx = jsx.replace(/style="([^"]*)"/gi, (match, styleString) => {
    try {
      const styleObj: Record<string, string> = {};
      styleString.split(';').forEach((rule: string) => {
        const [prop, val] = rule.split(':');
        if (prop && val) {
          const camelProp = prop.trim().replace(/-([a-z])/g, (_, g) => g.toUpperCase());
          styleObj[camelProp] = val.trim();
        }
      });
      return `style={${JSON.stringify(styleObj)}}`;
    } catch {
      return `/* style="${styleString}" */`;
    }
  });

  // 6. Fix HTML comments <!-- comment --> to JSX comments {/* comment */}
  jsx = jsx.replace(/<!--([\s\S]*?)-->/g, '{/* $1 */}');

  return jsx;
}

/**
 * Generates complete project structure files based on framework selection (Next.js or Vite)
 */
export function generateNextjsProject(
  html: string,
  css: string,
  js: string,
  options: ConversionOptions
): ProjectFile[] {
  const convertedJsx = convertHtmlToJsx(html);
  const compName = options.componentName || 'ConvertedWebsite';
  const isVite = options.framework === 'vite';

  if (isVite) {
    // Vite + React + Tailwind + TypeScript Vercel-ready Project
    const appTsx = `import React, { useEffect } from 'react';

export default function App() {
  useEffect(() => {
    try {
      ${js ? js : '// Interactive behaviors initialized'}
    } catch (err) {
      console.error('Script error:', err);
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 antialiased">
      ${convertedJsx}
    </div>
  );
}
`;

    const mainTsx = `import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
`;

    const indexCss = `@import "tailwindcss";

/* Extracted custom CSS styles */
${css}
`;

    const indexHtml = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${compName} - Vite React App</title>
  </head>
  <body class="bg-slate-900 text-slate-100">
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
`;

    const viteConfig = `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 3000,
  },
  build: {
    outDir: 'dist',
  }
});
`;

    const packageJson = JSON.stringify(
      {
        name: 'my-vite-react-app',
        private: true,
        version: '1.0.0',
        type: 'module',
        scripts: {
          dev: 'vite',
          build: 'tsc && vite build',
          lint: 'eslint .',
          preview: 'vite preview'
        },
        dependencies: {
          react: '^19.0.0',
          'react-dom': '^19.0.0',
          'lucide-react': '^0.470.0',
          motion: '^12.0.0'
        },
        devDependencies: {
          '@tailwindcss/vite': '^4.0.0',
          '@types/react': '^19.0.0',
          '@types/react-dom': '^19.0.0',
          '@vitejs/plugin-react': '^4.3.0',
          tailwindcss: '^4.0.0',
          typescript: '^5.7.0',
          vite: '^6.0.0'
        }
      },
      null,
      2
    );

    const vercelJson = JSON.stringify(
      {
        version: 2,
        buildCommand: 'npm run build',
        outputDirectory: 'dist',
        framework: 'vite',
        rewrites: [{ source: '/(.*)', destination: '/index.html' }]
      },
      null,
      2
    );

    const readme = `# Vite + React + Tailwind Vercel Project

Ushbu Vite loyihasi HTML/CSS/JS kodidan avtomatik o'tkazildi va Vercel platformasiga 1-klikda deploy qilishga tayyor.

## 🚀 Vercel-ga deploy qilish:

\`\`\`bash
npm i -g vercel
vercel
\`\`\`

Build katalogi: \`dist\`
`;

    return [
      { path: 'src/App.tsx', name: 'App.tsx', content: appTsx, language: 'typescript' },
      { path: 'src/main.tsx', name: 'main.tsx', content: mainTsx, language: 'typescript' },
      { path: 'src/index.css', name: 'index.css', content: indexCss, language: 'css' },
      { path: 'index.html', name: 'index.html', content: indexHtml, language: 'html' },
      { path: 'vite.config.ts', name: 'vite.config.ts', content: viteConfig, language: 'typescript' },
      { path: 'package.json', name: 'package.json', content: packageJson, language: 'json' },
      { path: 'vercel.json', name: 'vercel.json', content: vercelJson, language: 'json' },
      { path: 'README.md', name: 'README.md', content: readme, language: 'markdown' }
    ];
  }

  // Otherwise, Next.js 15 App Router Project
  // 1. app/components/ConvertedWebsite.tsx
  const componentContent = `'use client';

import React, { useEffect } from 'react';

export default function ${compName}() {
  useEffect(() => {
    // Custom JS behavior extracted from original HTML/JS
    try {
      ${js ? js : '// Interactive behaviors initialized'}
    } catch (err) {
      console.error('Script initialization:', err);
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 antialiased">
      ${convertedJsx}
    </div>
  );
}
`;

  // 2. app/page.tsx
  const pageContent = `import ${compName} from '@/app/components/${compName}';

export const metadata = {
  title: 'Next.js Deployed App',
  description: 'Converted from HTML/CSS/JS and ready for instant deployment.',
};

export default function Home() {
  return (
    <main>
      <${compName} />
    </main>
  );
}
`;

  // 3. app/layout.tsx
  const layoutContent = `import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Next.js App Router Project',
  description: 'Generated ready for deployment on Vercel or Cloud Run',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
`;

  // 4. app/globals.css
  const globalsCss = `@import "tailwindcss";

/* Extracted custom CSS styles from original website */
${css}
`;

  // 5. package.json
  const packageJson = JSON.stringify(
    {
      name: 'my-nextjs-app',
      version: '1.0.0',
      private: true,
      scripts: {
        dev: 'next dev --port 3000',
        build: 'next build',
        start: 'next start -p 3000',
        lint: 'next lint'
      },
      dependencies: {
        next: '^15.1.0',
        react: '^19.0.0',
        'react-dom': '^19.0.0',
        'lucide-react': '^0.470.0',
        motion: '^12.0.0',
        tailwindcss: '^4.0.0',
        '@tailwindcss/postcss': '^4.0.0'
      },
      devDependencies: {
        typescript: '^5.7.0',
        '@types/node': '^22.0.0',
        '@types/react': '^19.0.0',
        '@types/react-dom': '^19.0.0'
      }
    },
    null,
    2
  );

  // 6. next.config.mjs
  const nextConfig = `/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone', // Optimized for Cloud Run & Docker deployment
};

export default nextConfig;
`;

  // 7. Dockerfile
  const dockerfile = `FROM node:20-alpine AS base

FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED 1
RUN npm run build

FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT 3000

CMD ["node", "server.js"]
`;

  // 8. vercel.json
  const vercelJson = JSON.stringify(
    {
      version: 2,
      buildCommand: 'npm run build',
      outputDirectory: '.next',
      framework: 'nextjs'
    },
    null,
    2
  );

  // 9. README.md
  const readme = `# Next.js Deployment Ready Project

Ushbu Next.js App Router loyihasi avtomatik tarzda HTML/CSS/JS kodidan o'tkazildi va foydalanishga tayyor.

## 🚀 Qanday qilib deploy qilinadi?

### 1. Vercel platformasiga (Tavsiya etiladi - 1 daqiqa):
\`\`\`bash
npm i -g vercel
vercel
\`\`\`

### 2. Cloud Run / Docker orqali:
\`\`\`bash
docker build -t my-next-app .
docker run -p 3000:3000 my-next-app
\`\`\`
`;

  return [
    { path: `app/components/${compName}.tsx`, name: `${compName}.tsx`, content: componentContent, language: 'typescript' },
    { path: 'app/page.tsx', name: 'page.tsx', content: pageContent, language: 'typescript' },
    { path: 'app/layout.tsx', name: 'layout.tsx', content: layoutContent, language: 'typescript' },
    { path: 'app/globals.css', name: 'globals.css', content: globalsCss, language: 'css' },
    { path: 'package.json', name: 'package.json', content: packageJson, language: 'json' },
    { path: 'next.config.mjs', name: 'next.config.mjs', content: nextConfig, language: 'javascript' },
    { path: 'Dockerfile', name: 'Dockerfile', content: dockerfile, language: 'markdown' },
    { path: 'vercel.json', name: 'vercel.json', content: vercelJson, language: 'json' },
    { path: 'README.md', name: 'README.md', content: readme, language: 'markdown' }
  ];
}
