import React, { useState } from 'react';
import { Sparkles, Bot, ArrowRight, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';

interface GeminiRefinerProps {
  html: string;
  css: string;
  js: string;
  onApplyRefinedCode: (newHtml: string, newCss: string, newJs: string) => void;
}

export const GeminiRefiner: React.FC<GeminiRefinerProps> = ({
  html,
  css,
  js,
  onApplyRefinedCode,
}) => {
  const [instruction, setInstruction] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAiOptimize = async () => {
    if (!instruction.trim() && !html.trim()) {
      setError("Iltimos, qo'shimcha ko'rsatma yoki HTML kodni kiriting!");
      return;
    }

    setLoading(true);
    setError(null);
    setStatus("Gemini AI kodingizni tahlil qilmoqda va Next.js uchun optimallashtirmoqda...");

    try {
      const apiKey = process.env.GEMINI_API_KEY || (window as unknown as { GEMINI_API_KEY?: string }).GEMINI_API_KEY;
      
      const ai = new GoogleGenAI({ apiKey: apiKey || '' });

      const prompt = `
Siz professional Next.js va React muhandisisiz. 
Quyidagi HTML, CSS va JS kodlarini o'rganing va quyidagi talab bo'yicha optimallashtirib bering:
TALAB: ${instruction || "Design va accessibility sifatini oshir, zamonaviy Tailwind CSS va Next.js App Router standartlariga mosla"}

ORIGINAL HTML:
${html}

ORIGINAL CSS:
${css}

ORIGINAL JS:
${js}

Javobingizni quyidagi JSON formatida qaytaring:
{
  "html": "O'zgartirilgan toza HTML/JSX strukturasi",
  "css": "Tegishli CSS yoki Tailwind sinflari",
  "js": "Kompaniyaga moslashtirilgan JS/React mantig'i"
}
Strict format javobini ber, xech qanday ortiqcha matn yozma.
`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });

      const responseText = response.text || '';
      
      // Try parsing JSON response
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        if (parsed.html) {
          onApplyRefinedCode(parsed.html, parsed.css || '', parsed.js || '');
          setStatus("Muvaffaqiyatli! Gemini AI kodingizni Next.js standartlarida yangiladi.");
        }
      } else {
        setStatus("Javob olindi. Kod o'zgartirildi!");
      }
    } catch (err: unknown) {
      console.error(err);
      setError("Gemini API chaqiruvida xatolik yuz berdi. API kalit tekshirilishi va qaytadan urunib ko'rish mumkin.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl max-w-4xl mx-auto space-y-6">
      
      <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
        <div className="p-3 bg-purple-500/10 border border-purple-500/20 text-purple-400 rounded-xl">
          <Bot className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            Gemini AI Bilan Kodni Mukammallashtirish
          </h2>
          <p className="text-xs text-slate-400">
            HTML va CSS kodingizni zamonaviy Next.js komponenti, animatsiyalar va Tailwind v4 stillariga o'tkazish uchun Gemini AI dan foydalaning.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <label className="block text-xs font-semibold text-slate-300">
          AI uchun ko'rsatma yoki talabingizni yozing:
        </label>
        <textarea
          value={instruction}
          onChange={(e) => setInstruction(e.target.value)}
          placeholder="Masalan: 'Ushbu loyihaga qorong'u rejim dark mode qo'sh', 'Designni yanada zamonaviyroq va premium qil', 'Framer motion animatsiyalar qo'sh'..."
          className="w-full bg-slate-950 text-slate-100 p-4 rounded-xl border border-slate-800 focus:outline-none focus:border-purple-500/50 text-xs md:text-sm h-28 resize-none"
        />

        {error && (
          <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {status && !error && (
          <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{status}</span>
          </div>
        )}

        <button
          onClick={handleAiOptimize}
          disabled={loading}
          className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white font-bold text-sm shadow-xl flex items-center justify-center gap-2 transition-all disabled:opacity-50"
        >
          {loading ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>Gemini AI Ishlamoqda...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Gemini AI Orqali O'zgartirish va Optimallashtirish</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </div>

    </div>
  );
};
