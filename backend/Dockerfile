FROM node:16-alpine

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

RUN yarn global add typescript

RUN yarn global add pm2

COPY . .

RUN yarn build

EXPOSE 8000

CMD ["pm2-runtime", "build/index.js"]