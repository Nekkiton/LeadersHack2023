# Stage 1. Build dependencies
FROM node:18 AS build

WORKDIR /application

COPY . /application

RUN yarn install
RUN yarn build

RUN rm -rf /application/node_modules
RUN yarn cache clean

ENV NODE_ENV production
RUN yarn install --production --frozen-lockfile
USER node

# Stage 2. Prepare runtime
FROM node:18-alpine as runtime

WORKDIR /application

COPY --from=build /application/node_modules /application/node_modules
COPY --from=build /application/dist /application/dist

EXPOSE 3000
CMD ["node", "dist/src/main.js"]
USER node

