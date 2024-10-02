# https://github.com/vercel/turbo/blob/main/examples/with-docker/apps/api/Dockerfile
FROM node:18-alpine AS node

# We don't need the standalone Chromium
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true

# Install Google Chrome Stable and fonts
# Note: this installs the necessary libs to make the browser work with Puppeteer.
RUN apk update && apk add curl gnupg -y \
  && curl --location --silent https://dl-ssl.google.com/linux/linux_signing_key.pub | apk add - \
  && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
  && apk update \
  && apk add google-chrome-stable -y --no-install-recommends \
  && rm -rf /var/lib/apt/lists/*

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
