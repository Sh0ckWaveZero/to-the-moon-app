# base image
FROM node:lts-buster
# set working directory
WORKDIR '/app'

COPY package.json .
RUN yarn install

COPY . .

CMD ["yarn", "run", "build"]