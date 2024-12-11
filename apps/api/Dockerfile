# https://github.com/vercel/turbo/blob/main/examples/with-docker/apps/web/Dockerfile
FROM node:18-alpine3.20 AS node
ENV YARN_VERSION 4.5.3
RUN corepack enable && corepack prepare yarn@${YARN_VERSION}

# Installs latest Chromium package.
RUN apk upgrade --no-cache --available \
    && apk add --no-cache \
      chromium-swiftshader \
      ttf-freefont \
      font-noto-emoji \
    && apk add --no-cache \
      --repository=https://dl-cdn.alpinelinux.org/alpine/edge/community \
      font-wqy-zenhei

ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true

# region: Turborepo files
FROM node AS builder
RUN apk add --no-cache libc6-compat
RUN apk update
# Set working directory
WORKDIR /repo
RUN yarn global add turbo
COPY . .
RUN turbo prune api --docker
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
RUN yarn turbo build --filter=api
# endregion

# region: Runtime image
FROM node AS runner
WORKDIR /app
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nestjs
USER nestjs
COPY --from=installer --chown=nestjs:nodejs /build/apps/api/dist .
COPY --from=installer --chown=nestjs:nodejs /build/apps/api/prisma ./prisma
COPY --from=installer --chown=nestjs:nodejs /build/node_modules ./node_modules
COPY --from=installer --chown=nestjs:nodejs /build/apps/api/package.json .
RUN yarn run prisma-generate
# endregion

CMD ["node", "src/main.js"]
