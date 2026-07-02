import fastifyHtml from 'fastify-html';
import { buildPortfolioShell } from './templates/layouts/portfolio.js';

export default async function appPlugin(fastify) {
  await fastify.register(fastifyHtml);

  fastify.addLayout((inner, reply) => {
    const meta = reply.request.templateMeta ?? {};
    return buildPortfolioShell({ content: inner, meta });
  }, { skipOnHeader: 'hx-request' });

  await fastify.register(import('./routes/public.routes.js'));
}
