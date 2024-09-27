# Используем Node.js для сборки фронтенд-приложения
FROM node:18 AS build

# Устанавливаем рабочую директорию внутри контейнера
WORKDIR /src

# Копируем package.json и package-lock.json для установки зависимостей
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем остальные файлы проекта
COPY . .

# Собираем приложение
RUN npm run build

# Используем Nginx для сервировки готового фронтенд-приложения
FROM nginx:alpine

# Копируем скомпилированные файлы фронтенда из предыдущего этапа
COPY --from=build /src/dist /usr/share/nginx/html

# Экспонируем порт, чтобы Nginx мог обслуживать приложение
EXPOSE 80

# Запускаем Nginx
CMD ["nginx", "-g", "daemon off;"]
