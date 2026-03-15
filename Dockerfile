# Stage 1: Build
FROM node:lts-slim AS builder

WORKDIR /app

RUN apt-get update && apt-get install -y python3 make g++ && rm -rf /var/lib/apt/lists/*

RUN rm -rf node_modules package-lock.json

COPY package*.json ./

RUN npm install --legacy-peer-deps

COPY . .

ENV NODE_OPTIONS="--max-old-space-size=4096"

RUN npx vite build

# Stage 2: Serve with Nginx
FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder /app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]