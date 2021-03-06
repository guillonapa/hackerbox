FROM node:15 as hackerbox

# set the working dir
WORKDIR /usr/src/app

# copy all files into workdir
COPY . .

# install all dependencies
RUN npm install

# run the react build
RUN npm run build

# expose the port for heroku
EXPOSE 3080

# run the express app
CMD [ "node", "./localbox/db.js" ]