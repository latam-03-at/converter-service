FROM node:latest

WORKDIR /app

COPY package*.json ./

RUN apt update && apt install ffmpeg -y
RUN apt install libreoffice

RUN npm install

COPY . .

EXPOSE 9090

CMD ["npm", "start"]
