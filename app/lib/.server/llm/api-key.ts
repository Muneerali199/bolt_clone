import { env } from 'node:process';

export function getAPIKey() {
  // always use the direct Gemini API key from the environment
  return env.GEMINI_API_KEY;
}
