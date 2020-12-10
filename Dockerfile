FROM node:15 as hackerbox

WORKDIR /usr/src/app

COPY . .

RUN npm install

RUN npm run build

EXPOSE 3080

CMD [ "node", "./localbox/db.js" ]