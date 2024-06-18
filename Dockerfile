FROM node:20-slim

WORKDIR /starter
ENV NODE_ENV development

COPY .env.example /starter/.env.example
COPY . /starter
RUN apt-get update && apt-get install -y git
RUN git clone --depth=1 https://github.com/emscripten-core/emsdk.git emsdk
RUN cd emsdk
RUN ./emsdk install latest
RUN ./emsdk activate latest
RUN source ./emsdk_env.sh
RUN apt-get update && apt-get install -y python3
RUN npm install pm2 -g
RUN if [ "$NODE_ENV" = "production" ]; then \
    npm install --omit=dev; \
    else \
    npm install; \
    fi

CMD ["pm2-runtime","app.js"]

EXPOSE 8080
