# Бэкенд
FROM node:18 AS backend
WORKDIR /src/backend
COPY backend/package*.json ./
RUN npm install
COPY backend ./
RUN npm run build

# Фронтенд
FROM node:18 AS frontend
WORKDIR /src/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend ./
RUN npm run build

# Сервировка фронтенда с помощью Nginx
FROM nginx:alpine
COPY --from=frontend /src/frontend/dist /usr/share/nginx/html
COPY --from=backend /src/backend/dist /usr/share/nginx/html/api
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
