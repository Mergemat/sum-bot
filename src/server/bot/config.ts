import { bot } from ".";

// Check bot
await bot.init();

// Installing a webhook
await bot.api.setWebhook("https://sum-bot.vercel.app/api/update");
