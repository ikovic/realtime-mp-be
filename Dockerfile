FROM node:9.6.1-alpine

WORKDIR /user/src/app/backend
COPY . .

RUN npm install
EXPOSE 5000

CMD ["npm", "run", "start"]
