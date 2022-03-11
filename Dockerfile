FROM node:latest

WORKDIR /app

COPY package*.json ./

RUN apt update && apt install ffmpeg -y
RUN apt-get update
RUN apt-get install libreoffice -y

RUN npm install

COPY . .

EXPOSE 9094

CMD ["npm", "start"]
