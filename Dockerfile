FROM node:18 as development

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

RUN yarn build


FROM node:18 as production

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN yarn install --production

COPY --from=development /usr/src/app/dist/ /usr/src/app/dist/

CMD [ "node", "./dist/main.js" ]
