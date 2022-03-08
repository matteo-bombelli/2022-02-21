FROM node:14.18.1-alpine3.14 AS builder
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:14.18.1-alpine3.14 AS runner

ENV NODE_ENV production

WORKDIR /app

COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules

VOLUME ["/app/data"]

EXPOSE 3000

ENV PORT 3000

RUN ls -a /app/.next

CMD ["npm", "run", "start"]