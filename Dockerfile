# Tên file: Dockerfile
FROM node:20-alpine

WORKDIR /app

# Copy package.json để cài đặt thư viện
COPY package.json package-lock.json ./
RUN npm install

# Copy toàn bộ source frontend
COPY . .

EXPOSE 5173

# Chạy lệnh dev server của Vite
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "5173"]