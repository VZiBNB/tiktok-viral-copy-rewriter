import React, { useState } from 'react';
import ScriptInput from './components/ScriptInput';
import ScriptOutput from './components/ScriptOutput';
import { generateScripts } from './services/geminiService';
import { RewrittenScript, AppStatus } from './types';

const App: React.FC = () => {
  const [sourceScript, setSourceScript] = useState('');
  const [targetNiche, setTargetNiche] = useState('');
  const [status, setStatus] = useState<AppStatus>(AppStatus.IDLE);
  const [scripts, setScripts] = useState<RewrittenScript[]>([]);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleGenerate = async () => {
    setStatus(AppStatus.LOADING);
    setErrorMsg(null);
    setScripts([]);

    try {
      const response = await generateScripts(sourceScript, targetNiche);
      setScripts(response.scripts);
      setStatus(AppStatus.SUCCESS);
    } catch (err: any) {
      console.error(err);
      setStatus(AppStatus.ERROR);
      setErrorMsg(err.message || "An unexpected error occurred while communicating with Gemini.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 selection:bg-purple-500/30">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/20">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </div>
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
              抖音爆款文案重塑器
            </h1>
          </div>
          <div className="text-xs font-mono text-slate-500 border border-slate-800 rounded px-2 py-1">
            Powered by Gemini 2.5 Flash
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Error Banner */}
        {errorMsg && (
          <div className="mb-6 bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl flex items-start gap-3">
            <svg className="w-5 h-5 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <div>
              <p className="font-semibold">Generation Failed</p>
              <p className="text-sm opacity-90">{errorMsg}</p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[calc(100vh-140px)]">
          {/* Left Column: Input */}
          <div className="flex flex-col h-full bg-slate-900 rounded-2xl p-6 border border-slate-800 shadow-2xl">
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-xs text-slate-400 border border-slate-700">1</span>
              输入设置
            </h2>
            <ScriptInput
              sourceScript={sourceScript}
              setSourceScript={setSourceScript}
              targetNiche={targetNiche}
              setTargetNiche={setTargetNiche}
              onGenerate={handleGenerate}
              isLoading={status === AppStatus.LOADING}
            />
          </div>

          {/* Right Column: Output */}
          <div className="flex flex-col h-full bg-slate-900 rounded-2xl p-6 border border-slate-800 shadow-2xl relative">
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-xs text-slate-400 border border-slate-700">2</span>
              生成结果
            </h2>
            <div className="flex-1 overflow-hidden">
               <ScriptOutput scripts={scripts} />
            </div>
            
            {/* Loading Overlay */}
            {status === AppStatus.LOADING && (
              <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm z-20 flex flex-col items-center justify-center rounded-2xl">
                <div className="relative w-20 h-20">
                   <div className="absolute top-0 left-0 w-full h-full border-4 border-purple-500/30 rounded-full"></div>
                   <div className="absolute top-0 left-0 w-full h-full border-4 border-t-purple-500 rounded-full animate-spin"></div>
                </div>
                <p className="mt-4 text-purple-300 font-medium animate-pulse">正在拆解逻辑结构...</p>
                <p className="text-slate-500 text-sm mt-1">AI 正在疯狂头脑风暴</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;