import { GoogleGenAI, Type } from "@google/genai";
import { GenerateResponse } from "../types";

const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;

// Use gemini-2.5-flash for fast, effective text generation
const MODEL_NAME = "gemini-2.5-flash";

export const generateScripts = async (sourceScript: string, targetNiche: string): Promise<GenerateResponse> => {
  if (!apiKey) {
    throw new Error("API Key is missing. Please check your environment configuration.");
  }

  const ai = new GoogleGenAI({ apiKey });

  const systemInstruction = `
    你是一个抖音/TikTok爆款文案专家。你的任务是拆解用户提供的“参考文案”的逻辑结构（通常遵循：黄金3秒Hook -> 痛点挖掘 -> 情绪升级 -> 解决方案/神反转）。
    
    请严格遵守以下规则：
    1. 保持参考文案的逻辑结构完全不变。
    2. 将内容完全重写，适配到用户的“目标领域/产品”。
    3. 语气必须极其口语化、接地气，使用短句，适合短视频快节奏。
    4. 生成 2 个不同版本的变体（例如：一个偏情绪共鸣，一个偏干货硬核，或者一种幽默一种严肃，视具体情况而定）。
    5. 同时简要分析你保留了什么逻辑结构。
  `;

  const prompt = `
    参考文案 (Source Script):
    """
    ${sourceScript}
    """

    目标领域/产品 (Target Niche):
    "${targetNiche}"
  `;

  try {
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            scripts: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  variantName: {
                    type: Type.STRING,
                    description: "Name of the variant (e.g., 'Emotion Focused', 'Hard Hitting')",
                  },
                  structureAnalysis: {
                    type: Type.STRING,
                    description: "A brief analysis of the logic structure used (e.g., Hook -> Pain -> Solution).",
                  },
                  content: {
                    type: Type.STRING,
                    description: "The full rewritten script content.",
                  },
                },
                required: ["variantName", "content", "structureAnalysis"],
              },
            },
          },
        },
      },
    });

    const responseText = response.text;
    if (!responseText) {
      throw new Error("No response received from Gemini.");
    }

    return JSON.parse(responseText) as GenerateResponse;

  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};
