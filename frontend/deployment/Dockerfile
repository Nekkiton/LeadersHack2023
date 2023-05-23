# Stage 1. Build dependencies
FROM node:18 AS builder

WORKDIR /application

COPY . /application

RUN yarn install --frozen-lockfile
RUN yarn build

# Stage 2. Prepare runtime
FROM node:18-alpine as runtime

WORKDIR /application

ENV NODE_ENV production

COPY --from=builder /application/package.json /application/package.json
COPY --from=builder /application/public /application/public
COPY --from=builder /application/.next/standalone /application
COPY --from=builder /application/.next/static /application/.next/static

EXPOSE 3000
CMD ["node", "server.js"]
