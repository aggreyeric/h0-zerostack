# ZeroDeploy (h0-zerostack) — multi-stage Node image
# Stage 1: build the TypeScript into dist/
# Stage 2: runtime image with prod deps only
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/public ./public
EXPOSE 3001
CMD ["node", "dist/index.js"]
