FROM node:20.10.0

WORKDIR /app

COPY package.json /app/package.json

RUN npm install

EXPOSE 5000

COPY . /app

CMD ["node", "."]
