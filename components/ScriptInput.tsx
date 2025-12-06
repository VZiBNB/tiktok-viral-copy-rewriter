import React from 'react';

interface ScriptInputProps {
  sourceScript: string;
  setSourceScript: (val: string) => void;
  targetNiche: string;
  setTargetNiche: (val: string) => void;
  onGenerate: () => void;
  isLoading: boolean;
}

const ScriptInput: React.FC<ScriptInputProps> = ({
  sourceScript,
  setSourceScript,
  targetNiche,
  setTargetNiche,
  onGenerate,
  isLoading,
}) => {
  return (
    <div className="flex flex-col h-full space-y-6">
      <div className="flex-1 flex flex-col min-h-[300px]">
        <label htmlFor="source-script" className="block text-sm font-medium text-slate-400 mb-2">
          参考文案 (Source Script)
        </label>
        <textarea
          id="source-script"
          className="flex-1 w-full bg-slate-800 border border-slate-700 rounded-xl p-4 text-slate-200 placeholder-slate-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none resize-none transition-all duration-200"
          placeholder="在此粘贴爆款文案...&#10;例如：&#10;你以为你累了，其实你只是缺乏... (粘贴完整脚本)"
          value={sourceScript}
          onChange={(e) => setSourceScript(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="target-niche" className="block text-sm font-medium text-slate-400 mb-2">
          目标领域/产品 (Target Niche)
        </label>
        <input
          type="text"
          id="target-niche"
          className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-slate-200 placeholder-slate-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-200"
          placeholder="例如：卖二手车、教人炒币、减肥私教..."
          value={targetNiche}
          onChange={(e) => setTargetNiche(e.target.value)}
        />
      </div>

      <button
        onClick={onGenerate}
        disabled={isLoading || !sourceScript.trim() || !targetNiche.trim()}
        className={`
          w-full py-4 rounded-xl font-bold text-lg shadow-lg transform transition-all duration-200
          ${isLoading 
            ? 'bg-slate-700 text-slate-400 cursor-not-allowed' 
            : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white hover:scale-[1.02] hover:shadow-purple-500/25'
          }
        `}
      >
        {isLoading ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Generating...
          </span>
        ) : (
          "⚡ 生成爆款文案"
        )}
      </button>
    </div>
  );
};

export default ScriptInput;