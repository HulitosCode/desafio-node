FROM node:22-alpine
WORKDIR /app

COPY . ./
RUN npm ci

COPY . .

EXPOSE 3333
CMD ["node", "npm run db:migrate", "src/server.ts"]