import { Bot } from 'grammy';
import Groq from 'groq-sdk';

import { env } from '~/env';

export const { TELEGRAM_BOT_TOKEN: token } = env;
export const secretToken = String(token).split(':').pop();

// Default grammY bot instance
export const bot = new Bot(token, {
  client: {
    environment: env.NODE_ENV === 'development' ? 'test' : 'prod',
  },
});

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

bot.on('message:voice', async (ctx) => {
  const file = await ctx.getFile();
  const url = `https://api.telegram.org/file/bot${token}/${file.file_path}`;

  const result = await groq.audio.transcriptions.create({
    url,
    model: 'whisper-large-v3-turbo',
  });

  await ctx.reply(result.text);
});

// Sample handler for a simple echo bot
bot.command('start', async (ctx) => {
  const mes = await ctx.reply(
    `Привет! Совместимы ли вы в отношениях? 📊 Подходите ли вы друг другу в бизнесе?\n
Никакой магии — только расчёт. Начнем?`,
    {
      parse_mode: 'Markdown',
      reply_markup: {
        inline_keyboard: [
          [
            {
              web_app: { url: 'https://numio-one.vercel.app/' },
              text: '🔢 Открыть приложение',
            },
            ...(env.NODE_ENV === 'development'
              ? [
                  {
                    web_app: { url: 'http://127.0.0.1:3000' },
                    text: 'Start bot',
                  },
                ]
              : []),
          ],
        ],
      },
    },
  );
  console.log(mes);
});

bot.start();
