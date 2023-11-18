FROM node:16
WORKDIR /yusra-test
COPY package.json ./
COPY package-lock.json ./
RUN npm install
COPY . .
RUN npm run build
RUN ls -lhtr
RUN ls -lhtr /yusra-test/dist/
EXPOSE 3000
ENTRYPOINT [ "/bin/bash", "-c", "npm run migration:run && npm run start:prod" ]
