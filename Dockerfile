FROM node:slim

WORKDIR /usr/src/app

RUN chown node:node /usr/src/app

USER node

CMD [ -d "node_modules" ] && npm run dev || npm ci && npm run dev