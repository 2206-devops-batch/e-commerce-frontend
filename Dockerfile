# Development Environment
FROM node:18-bullseye-slim as build
ENV PATH /app/node_modules/.bin:$PATH
WORKDIR /app
COPY . ./
# RUN npm ci --silent
RUN npm run build

# Broduction Environment
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
