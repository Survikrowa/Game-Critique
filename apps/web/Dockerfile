FROM node:22-alpine AS node

RUN apk add --no-cache libc6-compat

FROM node AS builder
ENV NODE_ENV=production
ARG VITE_AUTH0_DOMAIN
ARG VITE_AUTH0_CLIENT_ID
ARG VITE_AUTH0_AUDIENCE
ARG VITE_BASE_API_URL
WORKDIR /builder
COPY . .
RUN corepack enable
RUN corepack install
RUN yarn install
RUN yarn build

FROM nginx:alpine AS runner
WORKDIR /app
COPY --from=builder /builder/dist /usr/share/nginx/html