
import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";
import { GroundingSource } from "../types";

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  }

  async performMarketResearch(prompt: string) {
    const response = await this.ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
        systemInstruction: "You are a professional market researcher. Provide up-to-date data, trends, and competitor insights. Use grounding to provide accurate links."
      },
    });

    const sources: GroundingSource[] = [];
    response.candidates?.[0]?.groundingMetadata?.groundingChunks?.forEach((chunk: any) => {
      if (chunk.web) {
        sources.push({
          title: chunk.web.title || 'Source',
          uri: chunk.web.uri
        });
      }
    });

    return {
      text: response.text || "No insights found.",
      sources
    };
  }

  async generateMarketingVisual(prompt: string) {
    const response = await this.ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          { text: `High-quality professional commercial photography for a business: ${prompt}` },
        ],
      },
      config: {
        imageConfig: {
          aspectRatio: "16:9",
        },
      },
    });

    let imageUrl = '';
    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        imageUrl = `data:image/png;base64,${part.inlineData.data}`;
        break;
      }
    }
    return imageUrl;
  }

  async analyzeStrategy(prompt: string) {
    const response = await this.ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: prompt,
      config: {
        thinkingConfig: { thinkingBudget: 4000 },
        systemInstruction: "You are a Chief Strategy Officer. Use deep reasoning to provide a SWOT analysis, financial projection, and clear milestones. Return your response in Markdown."
      }
    });
    return response.text;
  }
}

export const gemini = new GeminiService();
