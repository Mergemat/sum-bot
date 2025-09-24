import { webhookCallback } from 'grammy';

import { bot } from '~/server/bot';

export const GET = () => {
  bot.start();
};

export const POST = webhookCallback(bot, 'std/http');
