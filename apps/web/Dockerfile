# https://github.com/vercel/turbo/blob/main/examples/with-docker/apps/web/Dockerfile
FROM node:18-alpine AS node
ENV YARN_VERSION 4.5.3

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
RUN adduser --system --uid 1001 reactweb
USER reactweb
COPY --from=installer /build/apps/web/package.json .
COPY --from=installer /build/apps/web/vite.config.ts .
COPY --from=installer /build/apps/web/dist ./dist
# endregion

CMD ["npx", "vite", "preview"]