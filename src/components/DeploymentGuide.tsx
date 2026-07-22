import React, { useState } from 'react';
import { Rocket, Terminal, Cloud, Github, CheckCircle2, Copy, Check, ExternalLink, HelpCircle } from 'lucide-react';

export const DeploymentGuide: React.FC = () => {
  const [selectedPlatform, setSelectedPlatform] = useState<'vercel' | 'cloudrun' | 'netlify' | 'github'>('vercel');
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCmd(id);
    setTimeout(() => setCopiedCmd(null), 2000);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      
      {/* Header Info */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-indigo-950/80 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2.5 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 rounded-xl">
            <Rocket className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Next.js Saytni Vebga Bepul Deploy Qilish Qo'llanmasi</h2>
            <p className="text-slate-400 text-xs md:text-sm">
              HTML/CSS loyiha Next.js ga o'tkazilgach, uni Vercel, Google Cloud Run yoki Netlify serverlariga 1 daqiqada joylashtirish tartibi.
            </p>
          </div>
        </div>
      </div>

      {/* Platform Selector Tabs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <button
          onClick={() => setSelectedPlatform('vercel')}
          className={`p-4 rounded-xl border text-left transition-all ${
            selectedPlatform === 'vercel'
              ? 'bg-cyan-500/10 border-cyan-500 text-white shadow-lg shadow-cyan-500/10'
              : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="font-bold text-sm text-cyan-400">Vercel</span>
            <Rocket className="w-4 h-4 text-cyan-400" />
          </div>
          <p className="text-xs text-slate-400">Next.js uchun rasmiy va eng tez platforma (1-Click)</p>
        </button>

        <button
          onClick={() => setSelectedPlatform('cloudrun')}
          className={`p-4 rounded-xl border text-left transition-all ${
            selectedPlatform === 'cloudrun'
              ? 'bg-blue-500/10 border-blue-500 text-white shadow-lg shadow-blue-500/10'
              : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="font-bold text-sm text-blue-400">Google Cloud Run</span>
            <Cloud className="w-4 h-4 text-blue-400" />
          </div>
          <p className="text-xs text-slate-400">Docker va Containerlar orqali deploy qilish</p>
        </button>

        <button
          onClick={() => setSelectedPlatform('netlify')}
          className={`p-4 rounded-xl border text-left transition-all ${
            selectedPlatform === 'netlify'
              ? 'bg-teal-500/10 border-teal-500 text-white shadow-lg shadow-teal-500/10'
              : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="font-bold text-sm text-teal-400">Netlify</span>
            <Terminal className="w-4 h-4 text-teal-400" />
          </div>
          <p className="text-xs text-slate-400">GitHub repozitoriyasidan avtomatik build</p>
        </button>

        <button
          onClick={() => setSelectedPlatform('github')}
          className={`p-4 rounded-xl border text-left transition-all ${
            selectedPlatform === 'github'
              ? 'bg-purple-500/10 border-purple-500 text-white shadow-lg shadow-purple-500/10'
              : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="font-bold text-sm text-purple-400">GitHub Pages</span>
            <Github className="w-4 h-4 text-purple-400" />
          </div>
          <p className="text-xs text-slate-400">Statik HTML/CSS export bilan bepul xosting</p>
        </button>
      </div>

      {/* Detailed Steps Content */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-6">
        
        {selectedPlatform === 'vercel' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-cyan-400" /> Vercel orqali Next.js deploy qilish
              </h3>
              <a
                href="https://vercel.com/new"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 text-xs text-cyan-400 hover:underline font-semibold"
              >
                Vercel Dashboard Ochish <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="space-y-4 text-sm text-slate-300">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <span className="text-xs font-bold text-slate-400 block mb-2">1-Usul: Terminal CLI orqali (Tavsiya etiladi)</span>
                <p className="text-xs text-slate-400 mb-3">Loyihangiz papkasida terminalni oching va quyidagi buyruqlarni ketma-ket bajaring:</p>
                <div className="relative bg-slate-900 p-3 rounded-lg font-mono text-xs text-emerald-400 flex items-center justify-between border border-slate-800">
                  <code>npm install -g vercel && vercel</code>
                  <button
                    onClick={() => copyToClipboard('npm install -g vercel && vercel', 'v1')}
                    className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300"
                  >
                    {copiedCmd === 'v1' ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <span className="text-xs font-bold text-slate-400 block mb-2">2-Usul: GitHub orqali Avtomatik Deploy</span>
                <ol className="list-decimal list-inside text-xs text-slate-300 space-y-2 leading-relaxed">
                  <li>Yuklab olingan Next.js loyiha fayllarini o'zingizning GitHub repozitoriyangizga push qiling.</li>
                  <li><strong className="text-white">Vercel.com</strong> saytiga kiring va "Add New Project" tugmasini bosing.</li>
                  <li>GitHub repozitoriyangizni tanlang. Vercel avtomatik tarzda Next.js sozlamalarini aniqlaydi va 1-klikda Deploy qiladi!</li>
                </ol>
              </div>
            </div>
          </div>
        )}

        {selectedPlatform === 'cloudrun' && (
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Cloud className="w-5 h-5 text-blue-400" /> Google Cloud Run & Docker Deploy
            </h3>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
              <span className="text-xs font-bold text-slate-400 block">Dockerfile containerini hosil qilish va yuklash:</span>
              <p className="text-xs text-slate-400">Loyihangiz ichidagi Dockerfile tayyorlangan. Docker orqali build va run qiling:</p>
              
              <div className="bg-slate-900 p-3 rounded-lg font-mono text-xs text-emerald-400 space-y-2 border border-slate-800">
                <div># 1. Docker imidjini yig'ish</div>
                <div className="flex justify-between items-center">
                  <code>docker build -t my-next-app .</code>
                  <button onClick={() => copyToClipboard('docker build -t my-next-app .', 'c1')} className="p-1 rounded bg-slate-800">
                    {copiedCmd === 'c1' ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5 text-slate-300" />}
                  </button>
                </div>
                <div># 2. Port 3000 da ishga tushirish</div>
                <div className="flex justify-between items-center">
                  <code>docker run -p 3000:3000 my-next-app</code>
                  <button onClick={() => copyToClipboard('docker run -p 3000:3000 my-next-app', 'c2')} className="p-1 rounded bg-slate-800">
                    {copiedCmd === 'c2' ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5 text-slate-300" />}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {selectedPlatform === 'netlify' && (
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Terminal className="w-5 h-5 text-teal-400" /> Netlify Deploy Qo'llanmasi
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Netlify ham Next.js App Routerni to'liq qo'llab-quvvatlaydi.
            </p>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs text-emerald-400">
              <code>npm i -g netlify-cli && netlify deploy --build</code>
            </div>
          </div>
        )}

        {selectedPlatform === 'github' && (
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Github className="w-5 h-5 text-purple-400" /> GitHub Pages Statik Export
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Agar siz doimiy backend server talab qilmaydigan statik xosting xohlasangiz, <code className="text-cyan-400">next.config.mjs</code> fayliga <code className="text-amber-400">output: 'export'</code> qo'shasiz va <code className="text-emerald-400">npm run build</code> bajarasiz. Paydo bo'lgan <code className="text-white">out/</code> papkasini GitHub Pages ga yuklaysiz.
            </p>
          </div>
        )}

      </div>

    </div>
  );
};
