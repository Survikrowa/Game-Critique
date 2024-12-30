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
FROM nginx:alpine AS runner
WORKDIR /app
COPY --from=installer /build/apps/web/dist /usr/share/nginx/html
COPY --from=installer /build/apps/web/nginx.conf /etc/nginx/nginx.conf
EXPOSE $PORT
CMD ["/bin/sh", "-c", "envsubst < /etc/nginx/nginx.conf.template > /etc/nginx/nginx.conf && nginx -g 'daemon off;'"]
# endregion