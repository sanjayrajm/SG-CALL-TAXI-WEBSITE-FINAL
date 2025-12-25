
import { GoogleGenAI } from "@google/genai";

const getApiKey = () => {
  const globalProcess = (window as any).process;
  const key = globalProcess?.env?.API_KEY || (typeof process !== 'undefined' ? process.env.API_KEY : '');
  return key || '';
};

export const getAI = () => new GoogleGenAI({ apiKey: getApiKey() });

export const SYSTEM_PROMPTS = {
  ROUTING: `You are the SG Call Taxi Neural Routing Engine. 
DIRECTIVE: Calculate the ROAD DRIVING DISTANCE (in KM) between two locations in Tamil Nadu, India.
Always prioritize actual road paths over straight-line distances.

RESPONSE FORMAT:
{
  "distanceKm": float,
  "durationMin": number,
  "routeDescription": "string"
}

If you cannot find exact data, provide your best professional estimate based on geographical knowledge.`
};
