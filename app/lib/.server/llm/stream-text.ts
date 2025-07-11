import { streamText as _streamText, convertToCoreMessages } from 'ai';
import { getAPIKey } from '~/lib/.server/llm/api-key';
import { getGeminiModel } from '~/lib/.server/llm/model';
import { MAX_TOKENS } from './constants';
import { getSystemPrompt } from './prompts';

interface ToolResult<Name extends string, Args, Result> {
  toolCallId: string;
  toolName: Name;
  args: Args;
  result: Result;
}
export type Messages = Array<{
  role: 'user' | 'assistant';
  content: string;
  toolInvocations?: ToolResult<string, unknown, unknown>[];
}>;

export type StreamingOptions = Omit<Parameters<typeof _streamText>[0], 'model'>;
export function streamText(messages: Messages, options?: StreamingOptions) {
  const apiKey = getAPIKey() ?? '';
  return _streamText({
    model: getGeminiModel(apiKey),
    system: getSystemPrompt(),
    maxTokens: MAX_TOKENS,
    messages: convertToCoreMessages(messages),
    ...options,
  });
}
