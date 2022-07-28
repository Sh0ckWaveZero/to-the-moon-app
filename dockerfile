# base image
FROM node:lts-alpine
# set working directory
WORKDIR '/app'

COPY package.json .
RUN yarn install

COPY . .

CMD ["yarn", "run", "dev"]
