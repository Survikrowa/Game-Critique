FROM node:22-alpine AS node
ENV YARN_VERSION 4.5.3
RUN corepack enable && corepack prepare yarn@${YARN_VERSION}

# region: Turborepo files
FROM node AS builder
RUN apk add --no-cache libc6-compat
RUN apk update
WORKDIR /repo
RUN yarn global add turbo
COPY . .
RUN turbo prune web --docker
# endregion

# region: Install dependencies and build the project
FROM node AS installer
ARG VITE_AUTH0_DOMAIN
ARG VITE_AUTH0_CLIENT_ID
ARG VITE_AUTH0_AUDIENCE
ARG VITE_BASE_API_URL
RUN apk add --no-cache libc6-compat
RUN apk update
WORKDIR /build
COPY .gitignore .gitignore
COPY --from=builder /repo/out/json/ .
COPY --from=builder /repo/out/yarn.lock ./yarn.lock
RUN yarn install
COPY --from=builder /repo/out/full/ .
COPY turbo.json turbo.json
ENV NODE_ENV=production
RUN yarn turbo build --filter=web
# endregion

# region: Runtime image
FROM nginx:alpine AS runner
WORKDIR /app
COPY --from=installer /build/apps/web/dist /usr/share/nginx/html
# endregion
