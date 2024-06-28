FROM node:lts-alpine3.20 as builder
WORKDIR /app
COPY .env ./
COPY package*.json .
RUN npm install
ADD ./ .
RUN npm run build

FROM nginx:1.25-alpine-slim as production-stage
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD [ "nginx", "-g", "daemon off;" ]