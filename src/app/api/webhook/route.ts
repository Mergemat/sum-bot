import { setWebhookCallback } from 'vercel-grammy';

import { bot, secretToken } from '~/server/bot';

// export default setWebhookCallback(bot, {
//   path: 'api/update',
//   onError: 'return',
//   secretToken,
// });
