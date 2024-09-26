# Используем официальный образ Node.js для backend
FROM node:18

# Устанавливаем рабочую директорию внутри контейнера
WORKDIR /src

# Копируем package.json и package-lock.json для установки зависимостей
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем остальные файлы проекта
COPY . .

# Компилируем TypeScript код (создаст папку dist)
RUN npm run build

# Указываем порт, на котором будет работать сервер
EXPOSE 5000

# Запускаем сервер, используя скомпилированные файлы
CMD ["node", "dist/server.js"]
