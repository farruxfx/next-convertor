import React, { useState } from 'react';
import { ProjectFile, ConversionOptions } from '../types';
import { SAMPLE_TEMPLATES } from '../utils/samples';
import { generateNextjsProject } from '../utils/converter';
import { Code, Check, Copy, FileText, Settings, Layers, Play, Sparkles, FolderTree, Terminal } from 'lucide-react';

interface HtmlConverterToolProps {
  html: string;
  setHtml: (val: string) => void;
  css: string;
  setCss: (val: string) => void;
  js: string;
  setJs: (val: string) => void;
  files: ProjectFile[];
  setFiles: (files: ProjectFile[]) => void;
  onSelectSample: (id: string) => void;
  onOpenPreview: () => void;
}

export const HtmlConverterTool: React.FC<HtmlConverterToolProps> = ({
  html,
  setHtml,
  css,
  setCss,
  js,
  setJs,
  files,
  setFiles,
  onSelectSample,
  onOpenPreview,
}) => {
  const [activeCodeTab, setActiveCodeTab] = useState<'html' | 'css' | 'js'>('html');
  const [selectedFileIndex, setSelectedFileIndex] = useState<number>(0);
  const [copiedFile, setCopiedFile] = useState<boolean>(false);

  const [options, setOptions] = useState<ConversionOptions>({
    framework: 'nextjs',
    useTailwind: true,
    useTypescript: true,
    componentName: 'ConvertedWebsite',
    addFramerMotion: true,
    addLucideIcons: true,
  });

  const handleOptionChange = (key: keyof ConversionOptions, val: boolean | string) => {
    const updated = { ...options, [key]: val };
    setOptions(updated);
    const generated = generateNextjsProject(html, css, js, updated);
    setFiles(generated);
  };

  const handleCodeChange = (type: 'html' | 'css' | 'js', value: string) => {
    if (type === 'html') setHtml(value);
    if (type === 'css') setCss(value);
    if (type === 'js') setJs(value);

    const newHtml = type === 'html' ? value : html;
    const newCss = type === 'css' ? value : css;
    const newJs = type === 'js' ? value : js;

    const generated = generateNextjsProject(newHtml, newCss, newJs, options);
    setFiles(generated);
  };

  const handleCopyCode = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedFile(true);
    setTimeout(() => setCopiedFile(false), 2000);
  };

  const currentFile = files[selectedFileIndex] || files[0];

  return (
    <div className="space-y-6">
      
      {/* Top Banner & Sample Selector */}
      <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-5 shadow-xl">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-semibold border border-cyan-500/20">
                1-Klik Tayyorlash
              </span>
              <h2 className="text-lg font-bold text-white">HTML, CSS va JS Kodini Kiriting Yoki Namuna Tanlang</h2>
            </div>
            <p className="text-slate-400 text-xs md:text-sm">
              Oddiy HTML/CSS saytingizni zamonaviy Next.js App Router (React 19, TypeScript, Tailwind CSS) loyihasiga o'tkazing.
            </p>
          </div>

          <div className="flex items-center gap-2 w-full lg:w-auto">
            <span className="text-xs text-slate-400 whitespace-nowrap font-medium">Namunalar:</span>
            <div className="flex gap-2 overflow-x-auto pb-1 lg:pb-0">
              {SAMPLE_TEMPLATES.map((sample) => (
                <button
                  key={sample.id}
                  onClick={() => onSelectSample(sample.id)}
                  className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-cyan-300 transition-all hover:scale-105 whitespace-nowrap"
                >
                  ⚡ {sample.title}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Workspace Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Panel: HTML/CSS/JS Input Editor */}
        <div className="lg:col-span-6 bg-slate-900 border border-slate-800 rounded-2xl flex flex-col overflow-hidden shadow-2xl">
          
          {/* Editor Header */}
          <div className="bg-slate-950 px-4 py-3 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setActiveCodeTab('html')}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                  activeCodeTab === 'html'
                    ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                index.html
              </button>
              <button
                onClick={() => setActiveCodeTab('css')}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                  activeCodeTab === 'css'
                    ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                style.css
              </button>
              <button
                onClick={() => setActiveCodeTab('js')}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                  activeCodeTab === 'js'
                    ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                script.js
              </button>
            </div>

            <button
              onClick={onOpenPreview}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-bold transition-all shadow-md active:scale-95"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Natijani Ko'rish</span>
            </button>
          </div>

          {/* Textarea Input */}
          <div className="p-4 flex-1 flex flex-col min-h-[420px]">
            {activeCodeTab === 'html' && (
              <textarea
                value={html}
                onChange={(e) => handleCodeChange('html', e.target.value)}
                placeholder="HTML kodingizni bu yerga qo'ying (<header>, <section>, <div>...)"
                className="w-full flex-1 bg-slate-950 text-slate-100 p-4 font-mono text-xs md:text-sm rounded-xl border border-slate-800 focus:outline-none focus:border-cyan-500/50 resize-none leading-relaxed"
                spellCheck={false}
              />
            )}

            {activeCodeTab === 'css' && (
              <textarea
                value={css}
                onChange={(e) => handleCodeChange('css', e.target.value)}
                placeholder="CSS stilingizni bu yerga kiriting (.class-name { color: red; }...)"
                className="w-full flex-1 bg-slate-950 text-slate-100 p-4 font-mono text-xs md:text-sm rounded-xl border border-slate-800 focus:outline-none focus:border-blue-500/50 resize-none leading-relaxed"
                spellCheck={false}
              />
            )}

            {activeCodeTab === 'js' && (
              <textarea
                value={js}
                onChange={(e) => handleCodeChange('js', e.target.value)}
                placeholder="JavaScript kodlaringizni kiriting (document.querySelector...)"
                className="w-full flex-1 bg-slate-950 text-slate-100 p-4 font-mono text-xs md:text-sm rounded-xl border border-slate-800 focus:outline-none focus:border-yellow-500/50 resize-none leading-relaxed"
                spellCheck={false}
              />
            )}
          </div>

          {/* Settings Bar */}
          <div className="bg-slate-950 px-4 py-3 border-t border-slate-800 flex flex-wrap items-center gap-4 text-xs text-slate-300">
            <span className="font-semibold text-slate-400 flex items-center gap-1">
              <Settings className="w-3.5 h-3.5" /> Platforma:
            </span>

            {/* Framework Switcher */}
            <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-lg border border-slate-800">
              <button
                onClick={() => handleOptionChange('framework', 'nextjs')}
                className={`px-2.5 py-1 rounded text-[11px] font-bold transition-all ${
                  options.framework === 'nextjs'
                    ? 'bg-cyan-500 text-slate-950 shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                🚀 Next.js 15
              </button>
              <button
                onClick={() => handleOptionChange('framework', 'vite')}
                className={`px-2.5 py-1 rounded text-[11px] font-bold transition-all ${
                  options.framework === 'vite'
                    ? 'bg-purple-500 text-white shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                ⚡ Vite + React
              </button>
            </div>

            <label className="flex items-center gap-1.5 cursor-pointer">
              <input
                type="checkbox"
                checked={options.useTailwind}
                onChange={(e) => handleOptionChange('useTailwind', e.target.checked)}
                className="rounded accent-cyan-500"
              />
              <span>Tailwind v4</span>
            </label>
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input
                type="checkbox"
                checked={options.useTypescript}
                onChange={(e) => handleOptionChange('useTypescript', e.target.checked)}
                className="rounded accent-cyan-500"
              />
              <span>TypeScript</span>
            </label>
          </div>

        </div>

        {/* Right Panel: Generated Next.js App Router Structure */}
        <div className="lg:col-span-6 bg-slate-900 border border-slate-800 rounded-2xl flex flex-col overflow-hidden shadow-2xl">
          
          {/* File Explorer Navigation */}
          <div className="bg-slate-950 px-4 py-3 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FolderTree className="w-4 h-4 text-cyan-400" />
              <h3 className="text-xs md:text-sm font-bold text-white">Generatsiya Qilingan Next.js Loyiha Fayllari</h3>
            </div>

            {currentFile && (
              <button
                onClick={() => handleCopyCode(currentFile.content)}
                className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-cyan-300 transition-all border border-slate-700"
              >
                {copiedFile ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedFile ? "Nusxalandi!" : "Kodni Nusxalash"}</span>
              </button>
            )}
          </div>

          {/* File Tabs List */}
          <div className="bg-slate-950/60 border-b border-slate-800 px-3 py-2 flex gap-1 overflow-x-auto">
            {files.map((file, idx) => (
              <button
                key={file.path}
                onClick={() => setSelectedFileIndex(idx)}
                className={`px-3 py-1 rounded-md text-xs font-mono font-medium whitespace-nowrap transition-all ${
                  selectedFileIndex === idx
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                📄 {file.name}
              </button>
            ))}
          </div>

          {/* File Code Display */}
          <div className="p-4 flex-1 flex flex-col bg-slate-950">
            {currentFile ? (
              <div className="relative flex-1">
                <div className="absolute top-2 right-2 text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
                  {currentFile.path}
                </div>
                <textarea
                  readOnly
                  value={currentFile.content}
                  className="w-full h-full min-h-[380px] bg-slate-950 text-emerald-400 font-mono text-xs rounded-xl p-4 border border-slate-800/80 focus:outline-none resize-none leading-relaxed"
                />
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-slate-500 text-xs">
                Fayl tanlanmagan
              </div>
            )}
          </div>

          {/* Footer info */}
          <div className="bg-slate-950 px-4 py-2.5 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <span className="flex items-center gap-1">
              <Terminal className="w-3.5 h-3.5 text-emerald-400" /> Vercel & Cloud Run uchun Next.js standalone rejimi tayyor.
            </span>
            <span className="text-[11px] text-slate-500 font-mono">Total {files.length} fayl</span>
          </div>

        </div>

      </div>

    </div>
  );
};
