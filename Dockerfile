FROM node:carbon

WORKDIR /user/src/app/backend
COPY . .

RUN npm install
EXPOSE 5000

CMD ["npm", "run", "start"]
