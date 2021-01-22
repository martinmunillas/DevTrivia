FROM node:14

COPY ["package.json", "/usr/src/"]

WORKDIR /usr/src

RUN yarn

COPY [".", "/usr/src/"]

RUN ["yarn", "type"]

RUN ["yarn", "build"]

EXPOSE 4000

ENV NODE_ENV=production

CMD ["yarn", "start"]