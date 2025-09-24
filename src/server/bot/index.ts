import { Bot } from 'grammy';
import Groq from 'groq-sdk';

import { env } from '~/env';

export const { TELEGRAM_BOT_TOKEN: token } = env;
export const secretToken = String(token).split(':').pop();

// Default grammY bot instance
export const bot = new Bot(token);

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function getGroqChatCompletion(text: string) {
  return groq.chat.completions.create({
    messages: [
      {
        role: 'system',
        content:
          'You are a helpful assistant that summarizes text. User will send you a transcript of a voice message and you will summarize it. Answer in Russian language only',
      },
      {
        role: 'user',

        content: text,
      },
    ],

    model: 'openai/gpt-oss-120b',
  });
}

bot.on('message:voice', async (ctx) => {
  await ctx.replyWithChatAction('typing');
  const file = await ctx.getFile();
  const url = `https://api.telegram.org/file/bot${token}/${file.file_path}`;

  const result = await groq.audio.transcriptions.create({
    url,
    model: 'whisper-large-v3-turbo',
  });

  const summary = await getGroqChatCompletion(result.text);

  await ctx.reply(summary.choices[0]?.message.content ?? '', {
    parse_mode: 'Markdown',
  });
});

// Sample handler for a simple echo bot
bot.command('start', async (ctx) => {
  const mes = await ctx.reply('Пришли мне гс и я его сокращу');
  console.log(mes);
});
