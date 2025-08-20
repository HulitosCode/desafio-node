FROM node:22-alpine
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

EXPOSE 3333
CMD ["sh", "-c", "npm run db:migrate && node src/server.ts"]
