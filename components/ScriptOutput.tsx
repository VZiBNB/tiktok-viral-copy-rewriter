import React, { useState } from 'react';
import { RewrittenScript } from '../types';

interface ScriptOutputProps {
  scripts: RewrittenScript[];
}

const ScriptCard: React.FC<{ script: RewrittenScript; index: number }> = ({ script, index }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(script.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden shadow-xl mb-6 last:mb-0 transition-all duration-300 hover:border-purple-500/50">
      <div className="bg-slate-900/50 px-6 py-4 border-b border-slate-700 flex justify-between items-center">
        <div>
          <h3 className="text-purple-400 font-bold text-lg">
            方案 {index + 1}: {script.variantName}
          </h3>
          <p className="text-slate-500 text-xs mt-1 font-mono">
            Structure: {script.structureAnalysis}
          </p>
        </div>
        <button
          onClick={handleCopy}
          className={`
            px-3 py-1.5 rounded-lg text-sm font-medium transition-colors duration-200
            ${copied 
              ? 'bg-green-500/20 text-green-400' 
              : 'bg-slate-700 text-slate-300 hover:bg-slate-600 hover:text-white'
            }
          `}
        >
          {copied ? '已复制!' : '复制文案'}
        </button>
      </div>
      <div className="p-6">
        <div className="prose prose-invert prose-p:text-slate-300 max-w-none whitespace-pre-line leading-relaxed">
          {script.content}
        </div>
      </div>
    </div>
  );
};

const ScriptOutput: React.FC<ScriptOutputProps> = ({ scripts }) => {
  if (scripts.length === 0) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-slate-500 border-2 border-dashed border-slate-700 rounded-xl p-8 bg-slate-800/20">
        <svg className="w-16 h-16 mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
        <p className="text-lg">准备就绪</p>
        <p className="text-sm mt-2 opacity-70">在左侧输入参考文案和目标领域，AI 将为您重写。</p>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto pr-2 custom-scrollbar">
      {scripts.map((script, idx) => (
        <ScriptCard key={idx} script={script} index={idx} />
      ))}
    </div>
  );
};

export default ScriptOutput;