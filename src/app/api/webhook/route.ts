import { setWebhookCallback } from 'vercel-grammy';

import { bot, secretToken } from '~/server/bot';

// Handler to set webhook url based on request headers
// export default setWebhookCallback(bot, {
//   path: 'api/update',
//   onError: 'return',
//   secretToken,
// });
