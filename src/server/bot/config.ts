import { bot } from '.';

// Check bot
await bot.init();

// Installing a webhook
await bot.api.setWebhook('https://numio-one.vercel.app/api/bot/update');
