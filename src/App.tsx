import React, { useState, useEffect } from 'react';
import JSZip from 'jszip';
import { Header } from './components/Header';
import { HtmlConverterTool } from './components/HtmlConverterTool';
import { NextjsProjectPreview } from './components/NextjsProjectPreview';
import { DeploymentGuide } from './components/DeploymentGuide';
import { GeminiRefiner } from './components/GeminiRefiner';
import { SAMPLE_TEMPLATES } from './utils/samples';
import { generateNextjsProject } from './utils/converter';
import { ProjectFile } from './types';
import { CheckCircle2, Sparkles, FolderDown, Terminal, Layers } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'converter' | 'preview' | 'guide' | 'ai'>('converter');
  
  // Default to initial template
  const initialSample = SAMPLE_TEMPLATES[0];
  const [html, setHtml] = useState<string>(initialSample.html);
  const [css, setCss] = useState<string>(initialSample.css);
  const [js, setJs] = useState<string>(initialSample.js);

  const [files, setFiles] = useState<ProjectFile[]>([]);
  const [downloadSuccess, setDownloadSuccess] = useState<boolean>(false);

  // Initialize generated project files on mount
  useEffect(() => {
    const generated = generateNextjsProject(html, css, js, {
      useTailwind: true,
      useTypescript: true,
      componentName: 'ConvertedWebsite',
      addFramerMotion: true,
      addLucideIcons: true,
    });
    setFiles(generated);
  }, []);

  const handleSelectSample = (id: string) => {
    const found = SAMPLE_TEMPLATES.find(s => s.id === id);
    if (found) {
      setHtml(found.html);
      setCss(found.css);
      setJs(found.js);

      const generated = generateNextjsProject(found.html, found.css, found.js, {
        useTailwind: true,
        useTypescript: true,
        componentName: 'ConvertedWebsite',
        addFramerMotion: true,
        addLucideIcons: true,
      });
      setFiles(generated);
    }
  };

  const handleExportZip = async () => {
    try {
      const zip = new JSZip();

      files.forEach((file) => {
        zip.file(file.path, file.content);
      });

      const blob = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'nextjs-app-router-project.zip';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3000);
    } catch (err) {
      console.error('ZIP generation error:', err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-slate-950">
      
      {/* Top Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onExportZip={handleExportZip}
      />

      {/* Download Success Banner Notification */}
      {downloadSuccess && (
        <div className="bg-emerald-500 text-slate-950 px-4 py-2 text-center text-xs font-bold flex items-center justify-center gap-2 shadow-lg animate-bounce">
          <CheckCircle2 className="w-4 h-4" />
          <span>Next.js loyiha fayllari ZIP formatida muvaffaqiyatli yuklab olindi! (Deploy qilishga tayyor)</span>
        </div>
      )}

      {/* Main Content Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 lg:p-8 space-y-8">
        
        {activeTab === 'converter' && (
          <HtmlConverterTool
            html={html}
            setHtml={setHtml}
            css={css}
            setCss={setCss}
            js={js}
            setJs={setJs}
            files={files}
            setFiles={setFiles}
            onSelectSample={handleSelectSample}
            onOpenPreview={() => setActiveTab('preview')}
          />
        )}

        {activeTab === 'preview' && (
          <NextjsProjectPreview
            html={html}
            css={css}
            js={js}
          />
        )}

        {activeTab === 'guide' && (
          <DeploymentGuide />
        )}

        {activeTab === 'ai' && (
          <GeminiRefiner
            html={html}
            css={css}
            js={js}
            onApplyRefinedCode={(newHtml, newCss, newJs) => {
              setHtml(newHtml);
              setCss(newCss);
              setJs(newJs);
              const generated = generateNextjsProject(newHtml, newCss, newJs, {
                useTailwind: true,
                useTypescript: true,
                componentName: 'ConvertedWebsite',
                addFramerMotion: true,
                addLucideIcons: true,
              });
              setFiles(generated);
              setActiveTab('converter');
            }}
          />
        )}

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 px-4 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="flex items-center gap-1.5">
            <span>Next.js App Router v15 & React 19 Bilan Tayyorlangan</span>
          </p>
          <div className="flex items-center gap-4 text-slate-400">
            <button onClick={() => setActiveTab('converter')} className="hover:text-cyan-400 transition-colors">
              HTML2Next
            </button>
            <button onClick={() => setActiveTab('guide')} className="hover:text-cyan-400 transition-colors">
              Deploying Guide
            </button>
            <button onClick={handleExportZip} className="hover:text-cyan-400 transition-colors flex items-center gap-1">
              <FolderDown className="w-3.5 h-3.5" />
              <span>ZIP Export</span>
            </button>
          </div>
        </div>
      </footer>

    </div>
  );
}
