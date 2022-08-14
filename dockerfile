# base image
FROM node:lts-alpine@sha256:d39ab4712a8395d0b399dea44d9cb8b34ac942411b6a380449ebdb9d321136a3

ENV NODE_ENV production
# set working directory
WORKDIR '/app'

COPY package.json .
RUN yarn install --ignore-platform

COPY . .
# RUN npm ci --only=production

CMD ["yarn", "run", "build"]


# 2nd Stage
FROM nginx:1.23.1-alpine@sha256:2959a35e1b1e61e2419c01e0e457f75497e02d039360a658b66ff2d4caab19c4

COPY --from=0 /app/dist /usr/share/nginx/html
WORKDIR /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]