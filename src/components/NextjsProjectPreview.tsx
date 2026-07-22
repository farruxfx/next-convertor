import React, { useState } from 'react';
import { Monitor, Tablet, Smartphone, RefreshCw, ExternalLink, ShieldCheck, Sparkles } from 'lucide-react';

interface NextjsProjectPreviewProps {
  html: string;
  css: string;
  js: string;
}

export const NextjsProjectPreview: React.FC<NextjsProjectPreviewProps> = ({ html, css, js }) => {
  const [device, setDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [key, setKey] = useState(0);

  const deviceWidths = {
    desktop: 'w-full max-w-full',
    tablet: 'w-[768px] mx-auto',
    mobile: 'w-[375px] mx-auto',
  };

  // Generate complete HTML document for sandbox srcDoc iframe
  const fullHtmlDoc = `
    <!DOCTYPE html>
    <html lang="uz">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <script src="https://cdn.tailwindcss.com"></script>
      <style>
        ${css}
      </style>
    </head>
    <body className="bg-slate-900 text-slate-100">
      ${html}
      <script>
        try {
          ${js}
        } catch (e) {
          console.error("Preview script error:", e);
        }
      </script>
    </body>
    </html>
  `;

  return (
    <div className="space-y-4">
      {/* Top Device Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Next.js App Router Live Prevyu</span>
          </div>
        </div>

        {/* Device Switcher */}
        <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setDevice('desktop')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              device === 'desktop' ? 'bg-cyan-500 text-slate-950 shadow-md font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Monitor className="w-4 h-4" />
            <span>Desktop</span>
          </button>

          <button
            onClick={() => setDevice('tablet')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              device === 'tablet' ? 'bg-cyan-500 text-slate-950 shadow-md font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Tablet className="w-4 h-4" />
            <span>Planshet (768px)</span>
          </button>

          <button
            onClick={() => setDevice('mobile')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              device === 'mobile' ? 'bg-cyan-500 text-slate-950 shadow-md font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Smartphone className="w-4 h-4" />
            <span>Telefon (375px)</span>
          </button>
        </div>

        {/* Refresh button */}
        <button
          onClick={() => setKey(prev => prev + 1)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-all active:scale-95"
        >
          <RefreshCw className="w-3.5 h-3.5 text-cyan-400" />
          <span>Qaytadan Yuklash</span>
        </button>
      </div>

      {/* Frame Container */}
      <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 min-h-[600px] flex justify-center items-start overflow-auto shadow-2xl">
        <div className={`transition-all duration-300 bg-slate-900 rounded-xl overflow-hidden border border-slate-800 shadow-2xl ${deviceWidths[device]} h-[700px]`}>
          <iframe
            key={key}
            srcDoc={fullHtmlDoc}
            title="Next.js App Preview"
            className="w-full h-full border-0 bg-slate-900"
            sandbox="allow-scripts allow-modals allow-same-origin"
          />
        </div>
      </div>
    </div>
  );
};
