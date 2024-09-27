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

# Экспонируем порт, чтобы приложение было доступно
EXPOSE 80

# Запускаем Vite preview вместо Nginx
CMD ["npm", "run", "preview", "--", "--port", "80"]
