# add the Node.js docker image
FROM node:18-alpine

# Create directory that runs the app on docker
WORKDIR /app

# COPY package.json file
COPY package*.json ./

# COPY
COPY prisma ./prisma/

# COPY ENV variable
COPY .env ./

# COPY tsconfig.json file
COPY tsconfig.json ./

# COPY
COPY . .

RUN apk add --no-cache --repository=http://dl-cdn.alpinelinux.org/alpine/edge/testing openssl1.1-compat

#RUN apk add --no-cache --update openssl1.1-compat

# Install package.json dependencies
RUN npm install

# Generate prisma client
RUN npx prisma generate

# Run and expose the server on port 3333
EXPOSE 3333

ARG DATABASE_URL
ENV DATABASE_URL "$DATABASE_URL"

RUN npm install

CMD ["npm", "run", "dev"]