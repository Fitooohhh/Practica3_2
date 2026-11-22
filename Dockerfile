FROM node:20-alpine AS frontend-build
WORKDIR /app
COPY package.json ./
COPY frontend/package.json frontend/package.json
COPY backend/package.json backend/package.json
RUN npm install
COPY frontend frontend
RUN npm run build --workspace frontend

FROM node:20-alpine AS production
ENV NODE_ENV=production
WORKDIR /app
COPY package.json ./
COPY frontend/package.json frontend/package.json
COPY backend/package.json backend/package.json
RUN npm install --omit=dev && npm cache clean --force
COPY backend backend
COPY --from=frontend-build /app/frontend/dist frontend/dist
EXPOSE 3000
CMD ["npm", "run", "start", "--workspace", "backend"]
