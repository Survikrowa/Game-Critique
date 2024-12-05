ENV YARN_VERSION 4.5.3

# https://github.com/vercel/turbo/blob/main/examples/with-docker/apps/web/Dockerfile
FROM node:18-alpine AS node
RUN corepack enable && corepack prepare yarn@${YARN_VERSION}

# region: Turborepo files
FROM node AS builder
RUN apk add --no-cache libc6-compat
RUN apk update
# Set working directory
WORKDIR /repo
RUN yarn global add turbo
COPY . .
RUN turbo prune web --docker
# endregion

# region: Install dependencies and build the project
FROM node AS installer
RUN apk add --no-cache libc6-compat
RUN apk update
WORKDIR /build
COPY .gitignore .gitignore
COPY --from=builder /repo/out/json/ .
COPY --from=builder /repo/out/yarn.lock ./yarn.lock
RUN yarn install
COPY --from=builder /repo/out/full/ .
COPY turbo.json turbo.json
RUN yarn turbo build --filter=web
# endregion

# region: Runtime image
FROM node AS runner
WORKDIR /app
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs
COPY --from=installer /build/apps/web/next.config.js .
COPY --from=installer /build/apps/web/package.json .
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=installer --chown=nextjs:nodejs /build/apps/web/.next/standalone ./
COPY --from=installer --chown=nextjs:nodejs /build/apps/web/.next/static ./apps/web/.next/static
# endregion

CMD ["node", "apps/web/server.js"]