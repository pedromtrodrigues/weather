FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci
COPY . .

# --localize para criar pastas para cada idioma pt-PT e en-US
RUN npm run build -- --localize

FROM nginx:alpine AS runner
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /app/dist/altice-challenge/browser/ /usr/share/nginx/html/
EXPOSE 80


CMD ["nginx", "-g", "daemon off;"]