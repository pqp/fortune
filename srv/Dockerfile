from node:lts-buster

WORKDIR /app

COPY . .

RUN apt update \
    && apt -y install sendmail  
RUN npm install --production

CMD ["node", "index.js"]